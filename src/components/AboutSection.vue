<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm, rt } = useI18n()
const facts = computed<{ k: string; v: string }[]>(() =>
  (tm('about.facts') as any[]).map(f => ({ k: rt(f.k), v: rt(f.v) }))
)
</script>

<template>
  <section id="about" class="section">
    <div class="container about">
      <div class="about__main">
        <p class="sec-label" v-reveal>{{ t('about.label') }}</p>
        <h2 class="sec-title" v-reveal="{ delay: 60 }">{{ t('about.title') }}</h2>
        <p class="about__p" v-reveal="{ delay: 120 }">{{ t('about.p1') }}</p>
        <p class="about__p about__p--muted" v-reveal="{ delay: 180 }">{{ t('about.p2') }}</p>
      </div>

      <div class="about__facts">
        <div v-for="(f, i) in facts" :key="f.k" class="card about__fact" v-reveal="{ delay: 120 + i * 70 }">
          <span class="about__fact-k">{{ f.k }}</span>
          <span class="about__fact-v">{{ f.v }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 64px;
  align-items: start;
}

.about__p {
  font-size: 1.08rem;
  color: var(--text);
  margin-bottom: 18px;
  max-width: 580px;
}

.about__p--muted {
  color: var(--text-2);
  font-size: 1rem;
}

.about__facts {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.about__fact {
  padding: 18px 22px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.about__fact-k {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--text-3);
}

.about__fact-v {
  font-weight: 600;
  font-size: 0.98rem;
}

@media (max-width: 920px) {
  .about {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}
</style>
