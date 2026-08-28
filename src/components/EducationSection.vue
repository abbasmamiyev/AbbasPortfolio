<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm, rt } = useI18n()

const langs = computed<{ name: string; level: string }[]>(() =>
  (tm('edu.langs') as any[]).map(l => ({ name: rt(l.name), level: rt(l.level) }))
)
</script>

<template>
  <section id="edu" class="section">
    <div class="container">
      <p class="sec-label" v-reveal>{{ t('edu.label') }}</p>
      <h2 class="sec-title" v-reveal="{ delay: 60 }">{{ t('edu.title') }}</h2>

      <div class="edu__grid">
        <article class="card edu__item" v-reveal="{ delay: 100 }">
          <div class="edu__icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 9 12 4 2 9l10 5 10-5zM6 11.5V17c0 1.5 2.7 3 6 3s6-1.5 6-3v-5.5" />
            </svg>
          </div>
          <span class="edu__period">{{ t('edu.uni.period') }}</span>
          <h3 class="edu__name">{{ t('edu.uni.name') }}</h3>
          <p class="edu__degree">{{ t('edu.uni.degree') }}</p>
          <p class="edu__desc">{{ t('edu.uni.desc') }}</p>
        </article>

        <article class="card edu__item" v-reveal="{ delay: 170 }">
          <div class="edu__icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 19.5V6a2 2 0 0 1 2-2h14v14H6.5a2.5 2.5 0 0 0 0 5H20" />
            </svg>
          </div>
          <span class="edu__period">{{ t('edu.school.period') }}</span>
          <h3 class="edu__name">{{ t('edu.school.name') }}</h3>
          <p class="edu__degree">{{ t('edu.school.degree') }}</p>
          <p class="edu__desc">{{ t('edu.school.desc') }}</p>
        </article>

        <article class="card edu__item edu__langs" v-reveal="{ delay: 240 }">
          <div class="edu__icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
            </svg>
          </div>
          <h3 class="edu__name">{{ t('edu.langsTitle') }}</h3>
          <div class="edu__lang" v-for="l in langs" :key="l.name">
            <div class="edu__lang-row">
              <span class="edu__lang-name">{{ l.name }}</span>
              <span class="edu__lang-level">{{ l.level }}</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.edu__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 44px;
}

.edu__item {
  padding: 28px;
  display: flex;
  flex-direction: column;
}

.edu__icon {
  width: 50px;
  height: 50px;
  border-radius: 14px;
  display: grid;
  place-items: center;
  color: var(--brand-2);
  background: rgba(34, 211, 238, 0.08);
  border: 1px solid rgba(34, 211, 238, 0.22);
  margin-bottom: 18px;
}

.edu__period {
  font-family: var(--font-mono);
  font-size: 0.74rem;
  font-weight: 600;
  color: var(--text-3);
  margin-bottom: 6px;
}

.edu__name {
  font-size: 1.05rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  margin-bottom: 6px;
}

.edu__degree {
  font-weight: 600;
  font-size: 0.9rem;
  color: var(--text-2);
  margin-bottom: 10px;
}

.edu__desc {
  font-size: 0.88rem;
  color: var(--text-3);
}

.edu__lang {
  margin-top: 14px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--border);
}

.edu__lang:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.edu__lang-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
}

.edu__lang-name {
  font-weight: 600;
  font-size: 0.94rem;
}

.edu__lang-level {
  font-family: var(--font-mono);
  font-size: 0.76rem;
  color: var(--text-3);
}

@media (max-width: 920px) {
  .edu__grid {
    grid-template-columns: 1fr;
  }
}
</style>
