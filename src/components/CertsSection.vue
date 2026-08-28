<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm, rt } = useI18n()

const items = computed<{ name: string; org: string; year: string }[]>(() =>
  (tm('certs.items') as any[]).map(c => ({ name: rt(c.name), org: rt(c.org), year: rt(c.year) }))
)
</script>

<template>
  <section id="certs" class="section">
    <div class="container">
      <p class="sec-label" v-reveal>{{ t('certs.label') }}</p>
      <h2 class="sec-title" v-reveal="{ delay: 60 }">{{ t('certs.title') }}</h2>

      <div class="card certs__honor" v-reveal="{ delay: 120 }">
        <div class="certs__honor-medal" aria-hidden="true">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="9" r="6" />
            <path d="M8.5 14.5 6 22l6-3 6 3-2.5-7.5" />
          </svg>
        </div>
        <div class="certs__honor-body">
          <span class="certs__honor-badge">{{ t('certs.honor.badge') }} · {{ t('certs.honor.year') }}</span>
          <h3 class="certs__honor-title">{{ t('certs.honor.title') }}</h3>
          <p class="certs__honor-org">{{ t('certs.honor.org') }}</p>
          <p class="certs__honor-desc">{{ t('certs.honor.desc') }}</p>
        </div>
      </div>

      <div class="certs__grid">
        <article v-for="(c, i) in items" :key="c.name + c.year" class="card certs__item" v-reveal="{ delay: 60 + (i % 4) * 60 }">
          <span class="certs__year">{{ c.year }}</span>
          <h4 class="certs__name">{{ c.name }}</h4>
          <p class="certs__org">{{ c.org }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.certs__honor {
  display: flex;
  gap: 24px;
  align-items: flex-start;
  padding: 30px 32px;
  margin: 36px 0 30px;
  background: linear-gradient(120deg, rgba(255, 184, 0, 0.07), transparent 60%);
  border-color: rgba(255, 184, 0, 0.3);
}

.certs__honor-medal {
  width: 60px;
  height: 60px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  color: var(--pad-2);
  background: rgba(255, 184, 0, 0.1);
  border: 1px solid rgba(255, 184, 0, 0.3);
}

.certs__honor-badge {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--pad-2);
}

.certs__honor-title {
  font-size: 1.35rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  margin: 6px 0 2px;
}

.certs__honor-org {
  font-weight: 600;
  font-size: 0.92rem;
  color: var(--text-2);
  margin-bottom: 8px;
}

.certs__honor-desc {
  font-size: 0.9rem;
  color: var(--text-3);
}

.certs__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.certs__item {
  padding: 20px 22px;
  display: flex;
  flex-direction: column;
}

.certs__year {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--brand-2);
  margin-bottom: 10px;
}

.certs__name {
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  margin-bottom: 6px;
  flex: 1;
}

.certs__org {
  font-size: 0.8rem;
  color: var(--text-3);
}

@media (max-width: 1020px) {
  .certs__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 780px) {
  .certs__grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .certs__honor {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .certs__grid {
    grid-template-columns: 1fr;
  }
}
</style>
