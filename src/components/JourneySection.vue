<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm, rt } = useI18n()

type Cat = 'dev' | 'sec' | 'soc'

interface Item {
  period: string
  role: string
  org: string
  cat: Cat
  desc: string
}

const items = computed<Item[]>(() =>
  (tm('journey.items') as any[]).map(i => ({
    period: rt(i.period),
    role: rt(i.role),
    org: rt(i.org),
    cat: rt(i.cat) as Cat,
    desc: rt(i.desc)
  }))
)

const filter = ref<Cat | 'all'>('all')

const visible = computed(() => (filter.value === 'all' ? items.value : items.value.filter(i => i.cat === filter.value)))

const cats: { id: Cat; key: string }[] = [
  { id: 'dev', key: 'journey.cats.dev' },
  { id: 'sec', key: 'journey.cats.sec' },
  { id: 'soc', key: 'journey.cats.soc' }
]
</script>

<template>
  <section id="journey" class="section section-alt">
    <div class="container">
      <p class="sec-label" v-reveal>{{ t('journey.label') }}</p>
      <h2 class="sec-title" v-reveal="{ delay: 60 }">{{ t('journey.title') }}</h2>
      <p class="sec-intro" v-reveal="{ delay: 120 }">{{ t('journey.intro') }}</p>

      <div class="jr__filters" v-reveal="{ delay: 160 }">
        <button class="jr__filter" :class="{ 'jr__filter--on': filter === 'all' }" @click="filter = 'all'">
          <span class="jr__dot jr__dot--all"></span>ALL
        </button>
        <button
          v-for="c in cats"
          :key="c.id"
          class="jr__filter"
          :class="{ 'jr__filter--on': filter === c.id }"
          @click="filter = filter === c.id ? 'all' : c.id"
        >
          <span class="jr__dot" :class="'jr__dot--' + c.id"></span>{{ t(c.key) }}
        </button>
      </div>

      <div class="jr__timeline">
        <transition-group name="jr-list">
          <article v-for="item in visible" :key="item.role + item.org" class="jr__item" :class="'jr__item--' + item.cat">
            <div class="jr__marker">
              <span class="jr__marker-dot"></span>
            </div>
            <div class="card jr__card">
              <div class="jr__card-top">
                <span class="jr__period">{{ item.period }}</span>
                <span class="jr__cat">{{ t('journey.cats.' + item.cat) }}</span>
              </div>
              <h3 class="jr__role">{{ item.role }}</h3>
              <p class="jr__org">{{ item.org }}</p>
              <p class="jr__desc">{{ item.desc }}</p>
            </div>
          </article>
        </transition-group>
      </div>
    </div>
  </section>
</template>

<style scoped>
.jr__filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 34px 0 44px;
}

.jr__filter {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  font-family: var(--font-mono);
  font-size: 0.76rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  padding: 9px 16px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-2);
  transition: border-color 0.25s ease, color 0.25s ease, background-color 0.25s ease;
}

.jr__filter:hover {
  border-color: var(--border-strong);
  color: var(--text);
}

.jr__filter--on {
  border-color: var(--text-2);
  color: var(--text);
  background: var(--surface-2);
}

.jr__dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
}

.jr__dot--all {
  background: linear-gradient(120deg, var(--dev-1), var(--pad-1));
}
.jr__dot--dev {
  background: var(--dev-1);
}
.jr__dot--sec {
  background: var(--pad-1);
}
.jr__dot--soc {
  background: var(--brand-2);
}

/* Timeline */
.jr__timeline {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-left: 34px;
}

.jr__timeline::before {
  content: '';
  position: absolute;
  left: 8px;
  top: 8px;
  bottom: 8px;
  width: 2px;
  background: linear-gradient(180deg, var(--dev-1), var(--brand-1), var(--pad-1));
  opacity: 0.35;
  border-radius: 2px;
}

.jr__item {
  position: relative;
}

.jr__marker {
  position: absolute;
  left: -34px;
  top: 26px;
  width: 18px;
  display: flex;
  justify-content: center;
}

.jr__marker-dot {
  width: 13px;
  height: 13px;
  border-radius: 50%;
  border: 3px solid var(--bg-2);
}

.jr__item--dev .jr__marker-dot {
  background: var(--dev-1);
}
.jr__item--sec .jr__marker-dot {
  background: var(--pad-1);
}
.jr__item--soc .jr__marker-dot {
  background: var(--brand-2);
}

.jr__card {
  padding: 22px 26px;
}

.jr__card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
  flex-wrap: wrap;
}

.jr__period {
  font-family: var(--font-mono);
  font-size: 0.76rem;
  font-weight: 600;
  color: var(--text-2);
}

.jr__cat {
  font-family: var(--font-mono);
  font-size: 0.68rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  padding: 3px 10px;
  border-radius: 999px;
  border: 1px solid var(--border);
  color: var(--text-3);
}

.jr__item--dev .jr__cat {
  color: var(--dev-1);
  border-color: rgba(0, 220, 130, 0.3);
}
.jr__item--sec .jr__cat {
  color: var(--pad-1);
  border-color: rgba(255, 30, 0, 0.35);
}
.jr__item--soc .jr__cat {
  color: var(--brand-2);
  border-color: rgba(34, 211, 238, 0.3);
}

.jr__role {
  font-size: 1.06rem;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.jr__org {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-2);
  margin-bottom: 6px;
}

.jr__desc {
  font-size: 0.88rem;
  color: var(--text-3);
}

/* list transition */
.jr-list-enter-active,
.jr-list-leave-active,
.jr-list-move {
  transition: opacity 0.35s ease, transform 0.35s var(--ease-out);
}

.jr-list-enter-from,
.jr-list-leave-to {
  opacity: 0;
  transform: translateY(14px);
}

.jr-list-leave-active {
  position: absolute;
  width: calc(100% - 34px);
}
</style>
