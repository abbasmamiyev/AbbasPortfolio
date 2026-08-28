<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

function go(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section class="section section-alt worlds-sec">
    <div class="container">
      <p class="sec-label" v-reveal>{{ t('worlds.label') }}</p>
      <h2 class="sec-title" v-reveal="{ delay: 60 }">
        {{ t('worlds.title') }}
      </h2>
      <p class="sec-intro" v-reveal="{ delay: 120 }">{{ t('worlds.intro') }}</p>

      <div class="worlds">
        <button class="world world--dev" v-reveal="{ delay: 160 }" @click="go('dev')">
          <div class="world__glow"></div>
          <span class="world__tag">&lt;/&gt;</span>
          <h3 class="world__title">{{ t('worlds.dev.title') }}</h3>
          <p class="world__desc">{{ t('worlds.dev.desc') }}</p>
          <span class="world__cta">
            {{ t('worlds.dev.cta') }}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
          <div class="world__lines" aria-hidden="true">
            <span v-for="n in 5" :key="n" class="world__line" :style="{ width: 30 + ((n * 37) % 55) + '%' }"></span>
          </div>
        </button>

        <button class="world world--pad" v-reveal="{ delay: 240 }" @click="go('paddock')">
          <div class="world__glow"></div>
          <span class="world__tag">P1</span>
          <h3 class="world__title">{{ t('worlds.pad.title') }}</h3>
          <p class="world__desc">{{ t('worlds.pad.desc') }}</p>
          <span class="world__cta">
            {{ t('worlds.pad.cta') }}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
          <div class="world__flag" aria-hidden="true"></div>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.worlds {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 22px;
  margin-top: 48px;
}

.world {
  position: relative;
  text-align: left;
  padding: 42px 38px 46px;
  border-radius: var(--radius-l);
  border: 1px solid var(--border);
  background: var(--surface);
  overflow: hidden;
  min-height: 320px;
  display: flex;
  flex-direction: column;
  transition: transform 0.4s var(--ease-out), border-color 0.4s ease, box-shadow 0.4s ease;
}

.world:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow);
}

.world--dev:hover {
  border-color: rgba(0, 220, 130, 0.5);
}

.world--pad:hover {
  border-color: rgba(255, 30, 0, 0.5);
}

.world__glow {
  position: absolute;
  width: 340px;
  height: 340px;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
}

.world--dev .world__glow {
  background: var(--dev-1);
  top: -120px;
  right: -100px;
}

.world--pad .world__glow {
  background: var(--pad-1);
  top: -120px;
  right: -100px;
}

.world:hover .world__glow {
  opacity: 0.22;
}

.world__tag {
  font-family: var(--font-mono);
  font-size: 0.9rem;
  font-weight: 700;
  padding: 7px 13px;
  border-radius: 10px;
  margin-bottom: 22px;
  align-self: flex-start;
  border: 1px solid var(--border-strong);
}

.world--dev .world__tag {
  color: var(--dev-1);
  background: rgba(0, 220, 130, 0.08);
}

.world--pad .world__tag {
  color: var(--pad-1);
  background: rgba(255, 30, 0, 0.08);
}

.world__title {
  font-size: clamp(1.7rem, 3vw, 2.3rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  margin-bottom: 12px;
}

.world--dev .world__title {
  background: var(--grad-dev);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.world--pad .world__title {
  background: var(--grad-pad);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.world__desc {
  color: var(--text-2);
  font-size: 0.99rem;
  max-width: 400px;
  margin-bottom: 28px;
  flex: 1;
}

.world__cta {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  font-weight: 600;
  font-size: 0.94rem;
  color: var(--text);
  transition: gap 0.3s var(--ease-out);
}

.world:hover .world__cta {
  gap: 14px;
}

/* Code lines décor */
.world__lines {
  position: absolute;
  right: 34px;
  bottom: 32px;
  display: flex;
  flex-direction: column;
  gap: 7px;
  width: 130px;
  opacity: 0.5;
}

.world__line {
  height: 5px;
  border-radius: 3px;
  background: linear-gradient(90deg, rgba(0, 220, 130, 0.55), rgba(54, 228, 218, 0.25));
}

/* Checkered flag décor */
.world__flag {
  position: absolute;
  right: -12px;
  bottom: -12px;
  width: 150px;
  height: 100px;
  background-image: repeating-conic-gradient(transparent 0% 25%, rgba(255, 30, 0, 0.28) 0% 50%);
  background-size: 24px 24px;
  border-radius: 14px;
  transform: rotate(-8deg);
  opacity: 0.6;
}

@media (max-width: 820px) {
  .worlds {
    grid-template-columns: 1fr;
  }
}
</style>
