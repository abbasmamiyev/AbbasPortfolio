<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm, rt } = useI18n()

const duties = computed<{ title: string; desc: string }[]>(() =>
  (tm('paddock.duties') as any[]).map(d => ({ title: rt(d.title), desc: rt(d.desc) }))
)

const history = computed<{ period: string; title: string; desc: string }[]>(() =>
  (tm('paddock.history') as any[]).map(h => ({ period: rt(h.period), title: rt(h.title), desc: rt(h.desc) }))
)

const dutyIcons = [
  // shield
  'M12 2l8 4v6c0 5-3.4 8.4-8 10-4.6-1.6-8-5-8-10V6l8-4z',
  // car / permit
  'M5 11l2-5h10l2 5M4 16h16M6 16v2M18 16v2M3 11h18v5H3z',
  // clipboard
  'M9 4h6v3H9zM7 5H5v16h14V5h-2M9 11h6M9 15h4',
  // radio waves
  'M12 12m-2 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0M7.5 7.5a7 7 0 0 0 0 9M16.5 7.5a7 7 0 0 1 0 9M4.6 4.6a11 11 0 0 0 0 14.8M19.4 4.6a11 11 0 0 1 0 14.8'
]
</script>

<template>
  <section id="paddock" class="section pad">
    <div class="pad__texture" aria-hidden="true"></div>
    <div class="container pad__inner">
      <p class="sec-label pad__label" v-reveal>{{ t('paddock.label') }}</p>
      <h2 class="sec-title" v-reveal="{ delay: 60 }">
        <span class="grad-text-pad">{{ t('paddock.title') }}</span>
      </h2>

      <div class="pad__rolecard" v-reveal="{ delay: 110 }">
        <div class="pad__rolecard-flag" aria-hidden="true"></div>
        <div>
          <p class="pad__subtitle">{{ t('paddock.subtitle') }}</p>
          <p class="pad__period">{{ t('paddock.period') }}</p>
        </div>
      </div>

      <p class="sec-intro pad__intro" v-reveal="{ delay: 150 }">{{ t('paddock.intro') }}</p>

      <h3 class="pad__h3" v-reveal>{{ t('paddock.dutiesTitle') }}</h3>
      <div class="pad__duties">
        <article v-for="(d, i) in duties" :key="d.title" class="card pad__duty" v-reveal="{ delay: 80 + i * 90 }">
          <div class="pad__duty-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
              <path :d="dutyIcons[i]" />
            </svg>
          </div>
          <h4 class="pad__duty-title">{{ d.title }}</h4>
          <p class="pad__duty-desc">{{ d.desc }}</p>
        </article>
      </div>

      <div class="pad__track-wrap card" v-reveal>
        <div class="pad__track-head">
          <h3 class="pad__h3 pad__h3--tight">{{ t('paddock.trackTitle') }}</h3>
          <span class="pad__track-note">{{ t('paddock.trackNote') }}</span>
        </div>

        <svg class="pad__track" viewBox="0 0 700 340" role="img" :aria-label="t('paddock.trackTitle')">
          <!-- track base -->
          <path
            class="pad__track-road"
            d="M 230 290 L 570 290 Q 602 290 602 258 L 602 152 Q 602 120 570 120 L 500 120 Q 468 120 468 92 Q 468 64 436 64 L 364 64 C 350 64 346 78 334 78 C 320 78 318 62 304 62 C 290 62 288 76 274 76 L 230 76 Q 198 76 198 108 L 198 136 Q 198 168 166 168 Q 134 168 134 200 L 134 258 Q 134 290 166 290 Z"
          />
          <!-- animated racing line -->
          <path
            class="pad__track-line"
            d="M 230 290 L 570 290 Q 602 290 602 258 L 602 152 Q 602 120 570 120 L 500 120 Q 468 120 468 92 Q 468 64 436 64 L 364 64 C 350 64 346 78 334 78 C 320 78 318 62 304 62 C 290 62 288 76 274 76 L 230 76 Q 198 76 198 108 L 198 136 Q 198 168 166 168 Q 134 168 134 200 L 134 258 Q 134 290 166 290 Z"
          />

          <!-- start / finish -->
          <g transform="translate(392 279)">
            <rect x="0" y="0" width="7" height="7" fill="var(--text)" />
            <rect x="7" y="7" width="7" height="7" fill="var(--text)" />
            <rect x="7" y="0" width="7" height="7" fill="var(--bg-3)" />
            <rect x="0" y="7" width="7" height="7" fill="var(--bg-3)" />
            <rect x="0" y="14" width="7" height="7" fill="var(--text)" />
            <rect x="7" y="21" width="7" height="7" fill="var(--text)" />
            <rect x="7" y="14" width="7" height="7" fill="var(--bg-3)" />
            <rect x="0" y="21" width="7" height="7" fill="var(--bg-3)" />
          </g>
          <text x="416" y="278" class="pad__track-sf">{{ t('paddock.startFinish') }}</text>

          <!-- posts -->
          <g class="pad__post pad__post--vsa">
            <circle cx="240" cy="290" r="7" />
            <circle cx="240" cy="290" r="13" class="pad__post-ring" />
            <text x="240" y="320" text-anchor="middle">VSA 5</text>
          </g>
          <g class="pad__post pad__post--vsa" style="animation-delay: -0.7s">
            <circle cx="602" cy="205" r="7" />
            <circle cx="602" cy="205" r="13" class="pad__post-ring" />
            <text x="602" y="180" text-anchor="middle">VSA 6</text>
          </g>
          <g class="pad__post pad__post--psa" style="animation-delay: -1.2s">
            <circle cx="304" cy="62" r="7" />
            <circle cx="304" cy="62" r="13" class="pad__post-ring" />
            <text x="304" y="38" text-anchor="middle">PSA 11</text>
          </g>
          <g class="pad__post pad__post--psa" style="animation-delay: -1.8s">
            <circle cx="535" cy="120" r="7" />
            <circle cx="535" cy="120" r="13" class="pad__post-ring" />
            <text x="535" y="150" text-anchor="middle">PSA 12</text>
          </g>
        </svg>

        <div class="pad__legend">
          <span class="pad__legend-item"><span class="pad__legend-dot pad__legend-dot--v"></span>{{ t('paddock.postLegendV') }}</span>
          <span class="pad__legend-item"><span class="pad__legend-dot pad__legend-dot--p"></span>{{ t('paddock.postLegendP') }}</span>
        </div>
      </div>

      <h3 class="pad__h3" v-reveal>{{ t('paddock.historyTitle') }}</h3>
      <div class="pad__history">
        <div v-for="(h, i) in history" :key="h.title" class="pad__step" v-reveal="{ delay: 80 + i * 110 }">
          <div class="pad__step-track">
            <span class="pad__step-dot"></span>
            <span v-if="i < history.length - 1" class="pad__step-line"></span>
          </div>
          <div class="card pad__step-card">
            <span class="pad__step-period">{{ h.period }}</span>
            <h4 class="pad__step-title">{{ h.title }}</h4>
            <p class="pad__step-desc">{{ h.desc }}</p>
          </div>
        </div>
      </div>

      <div class="pad__bottom">
        <div class="card pad__honor" v-reveal>
          <div class="pad__honor-icon">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 12m-2 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0M7.5 7.5a7 7 0 0 0 0 9M16.5 7.5a7 7 0 0 1 0 9M4.6 4.6a11 11 0 0 0 0 14.8M19.4 4.6a11 11 0 0 1 0 14.8" />
            </svg>
          </div>
          <h4 class="pad__honor-title">{{ t('paddock.honorTitle') }}</h4>
          <p class="pad__honor-desc">{{ t('paddock.honorDesc') }}</p>
        </div>

        <figure class="card pad__quote" v-reveal="{ delay: 120 }">
          <blockquote>{{ t('paddock.quote') }}</blockquote>
          <figcaption>— {{ t('paddock.quoteSrc') }}</figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pad {
  background: var(--carbon);
  color: #eef1f7;
  overflow: hidden;
}

.pad :deep(.sec-intro),
.pad__duty-desc,
.pad__step-desc,
.pad__honor-desc {
  color: #9aa3b8;
}

.pad__texture {
  position: absolute;
  inset: 0;
  background-image: repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.02) 0 2px, transparent 2px 6px),
    repeating-linear-gradient(-45deg, rgba(255, 255, 255, 0.015) 0 2px, transparent 2px 6px);
  pointer-events: none;
}

.pad__inner {
  position: relative;
  z-index: 1;
}

.pad__label {
  color: #6b7690;
}

.pad__rolecard {
  display: flex;
  align-items: center;
  gap: 18px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.04);
  border-radius: var(--radius-m);
  padding: 18px 24px;
  margin: 10px 0 22px;
  max-width: 640px;
}

.pad__rolecard-flag {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  flex-shrink: 0;
  background-image: repeating-conic-gradient(#0000 0% 25%, rgba(255, 255, 255, 0.85) 0% 50%);
  background-size: 14px 14px;
  background-color: #1a1e2b;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.pad__subtitle {
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: -0.01em;
}

.pad__period {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--pad-2);
  margin-top: 2px;
}

.pad__intro {
  margin-bottom: 60px;
}

.pad__h3 {
  font-size: 1.15rem;
  font-weight: 700;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.pad__h3::before {
  content: '';
  width: 22px;
  height: 3px;
  border-radius: 2px;
  background: var(--grad-pad);
}

.pad__h3--tight {
  margin-bottom: 0;
}

/* Duties */
.pad__duties {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
  margin-bottom: 60px;
}

.pad__duty {
  background: rgba(255, 255, 255, 0.035);
  border-color: rgba(255, 255, 255, 0.1);
  padding: 24px 22px;
}

.pad__duty:hover {
  border-color: rgba(255, 30, 0, 0.45);
}

.pad__duty-icon {
  width: 46px;
  height: 46px;
  border-radius: 13px;
  display: grid;
  place-items: center;
  color: var(--pad-2);
  background: rgba(255, 184, 0, 0.08);
  border: 1px solid rgba(255, 184, 0, 0.22);
  margin-bottom: 16px;
}

.pad__duty-title {
  font-size: 0.99rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.pad__duty-desc {
  font-size: 0.86rem;
}

/* Track */
.pad__track-wrap {
  background: rgba(255, 255, 255, 0.03);
  border-color: rgba(255, 255, 255, 0.1);
  padding: 28px 28px 22px;
  margin-bottom: 60px;
}

.pad__track-wrap:hover {
  transform: none;
}

.pad__track-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 8px;
}

.pad__track-note {
  font-family: var(--font-mono);
  font-size: 0.76rem;
  color: #6b7690;
  letter-spacing: 0.08em;
}

.pad__track {
  width: 100%;
  height: auto;
  display: block;
}

.pad__track-road {
  fill: none;
  stroke: rgba(255, 255, 255, 0.13);
  stroke-width: 14;
  stroke-linejoin: round;
}

.pad__track-line {
  fill: none;
  stroke: var(--pad-1);
  stroke-width: 2.5;
  stroke-dasharray: 14 10;
  stroke-linejoin: round;
  animation: dash-flow 6s linear infinite;
  filter: drop-shadow(0 0 6px rgba(255, 30, 0, 0.6));
}

.pad__track-sf {
  font-family: var(--font-mono);
  font-size: 11px;
  fill: #6b7690;
}

.pad__post circle {
  fill: currentColor;
}

.pad__post-ring {
  fill: none !important;
  stroke: currentColor;
  stroke-width: 1.5;
  opacity: 0.5;
}

.pad__post text {
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 700;
  fill: currentColor;
}

.pad__post--vsa {
  color: var(--pad-1);
}

.pad__post--psa {
  color: var(--pad-2);
}

.pad__legend {
  display: flex;
  flex-wrap: wrap;
  gap: 12px 28px;
  margin-top: 10px;
}

.pad__legend-item {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  font-size: 0.82rem;
  color: #9aa3b8;
}

.pad__legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.pad__legend-dot--v {
  background: var(--pad-1);
}

.pad__legend-dot--p {
  background: var(--pad-2);
}

/* History steps */
.pad__history {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
  margin-bottom: 60px;
}

.pad__step {
  display: flex;
  flex-direction: column;
}

.pad__step-track {
  display: flex;
  align-items: center;
  margin-bottom: 14px;
}

.pad__step-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--pad-1);
  box-shadow: 0 0 0 0 rgba(255, 30, 0, 0.5);
  animation: pulse-dot 2.4s infinite;
  flex-shrink: 0;
}

.pad__step-line {
  height: 2px;
  flex: 1;
  margin-left: 10px;
  background: linear-gradient(90deg, rgba(255, 30, 0, 0.6), rgba(255, 184, 0, 0.15));
}

.pad__step-card {
  background: rgba(255, 255, 255, 0.035);
  border-color: rgba(255, 255, 255, 0.1);
  padding: 22px;
  flex: 1;
}

.pad__step-period {
  font-family: var(--font-mono);
  font-size: 0.74rem;
  font-weight: 600;
  color: var(--pad-2);
}

.pad__step-title {
  font-size: 1.02rem;
  font-weight: 700;
  margin: 8px 0 8px;
}

.pad__step-desc {
  font-size: 0.88rem;
}

/* Bottom: honor + quote */
.pad__bottom {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 18px;
}

.pad__honor {
  background: rgba(255, 184, 0, 0.05);
  border-color: rgba(255, 184, 0, 0.25);
  padding: 28px;
}

.pad__honor-icon {
  width: 50px;
  height: 50px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  color: var(--pad-2);
  background: rgba(255, 184, 0, 0.1);
  margin-bottom: 16px;
}

.pad__honor-title {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.pad__quote {
  padding: 28px 30px;
  background: rgba(255, 255, 255, 0.035);
  border-color: rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.pad__quote blockquote {
  font-size: 1.02rem;
  font-style: italic;
  color: #cdd4e4;
  margin-bottom: 14px;
  line-height: 1.7;
}

.pad__quote figcaption {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--pad-2);
}

@media (max-width: 1020px) {
  .pad__duties {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 820px) {
  .pad__history {
    grid-template-columns: 1fr;
  }
  .pad__step-line {
    display: none;
  }
  .pad__bottom {
    grid-template-columns: 1fr;
  }
  .pad__track-wrap {
    padding: 20px 14px 16px;
  }
}

@media (max-width: 560px) {
  .pad__duties {
    grid-template-columns: 1fr;
  }
}
</style>
