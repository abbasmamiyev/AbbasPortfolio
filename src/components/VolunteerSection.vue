<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm, rt } = useI18n()

const items = computed<{ year: string; role: string; event: string }[]>(() =>
  (tm('volunteer.items') as any[]).map(v => ({ year: rt(v.year), role: rt(v.role), event: rt(v.event) }))
)
</script>

<template>
  <section id="volunteer" class="section section-alt">
    <div class="container">
      <p class="sec-label" v-reveal>{{ t('volunteer.label') }}</p>
      <h2 class="sec-title" v-reveal="{ delay: 60 }">{{ t('volunteer.title') }}</h2>
      <p class="sec-intro" v-reveal="{ delay: 120 }">{{ t('volunteer.intro') }}</p>

      <div class="vol__grid">
        <article v-for="(v, i) in items" :key="v.event" class="vol__pass card" v-reveal="{ delay: 80 + (i % 3) * 90 }">
          <div class="vol__pass-hole" aria-hidden="true"></div>
          <span class="vol__pass-label">{{ t('volunteer.badge') }} · {{ v.year }}</span>
          <div class="vol__pass-stripe" aria-hidden="true"></div>
          <h3 class="vol__pass-event">{{ v.event }}</h3>
          <p class="vol__pass-role">{{ v.role }}</p>
          <div class="vol__pass-barcode" aria-hidden="true">
            <span v-for="n in 24" :key="n" :style="{ width: (n * 7) % 3 + 1 + 'px' }"></span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.vol__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 44px;
}

.vol__pass {
  position: relative;
  padding: 34px 26px 24px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.vol__pass:hover {
  transform: translateY(-6px) rotate(-1deg);
}

.vol__pass-hole {
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  width: 44px;
  height: 9px;
  border-radius: 6px;
  background: var(--bg);
  border: 1px solid var(--border-strong);
}

.vol__pass-label {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--text-3);
  text-align: center;
  margin-bottom: 16px;
}

.vol__pass-stripe {
  height: 4px;
  border-radius: 3px;
  background: var(--grad-brand);
  margin-bottom: 18px;
}

.vol__pass-event {
  font-size: 1.02rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  margin-bottom: 6px;
  flex: 1;
}

.vol__pass-role {
  font-size: 0.86rem;
  color: var(--text-2);
  margin-bottom: 20px;
}

.vol__pass-barcode {
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 26px;
  opacity: 0.45;
}

.vol__pass-barcode span {
  display: block;
  height: 100%;
  background: var(--text);
}

@media (max-width: 920px) {
  .vol__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 560px) {
  .vol__grid {
    grid-template-columns: 1fr;
  }
}
</style>
