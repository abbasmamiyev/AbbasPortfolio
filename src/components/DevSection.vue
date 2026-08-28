<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm, rt } = useI18n()

const groups = computed<{ name: string; items: string[] }[]>(() =>
  (tm('dev.groups') as any[]).map(g => ({
    name: rt(g.name),
    items: (g.items as unknown[]).map(i => rt(i as any))
  }))
)

interface Job {
  role: string
  company: string
  period: string
  mode: string
  desc: string
  tags: string[]
}

const jobs = computed<Job[]>(() =>
  (tm('dev.jobs') as any[]).map(j => ({
    role: rt(j.role),
    company: rt(j.company),
    period: rt(j.period),
    mode: rt(j.mode),
    desc: rt(j.desc),
    tags: (j.tags as unknown[]).map(x => rt(x as any))
  }))
)

const codeLines = [
  { html: '<span class="c-key">const</span> <span class="c-var">developer</span> <span class="c-op">=</span> {' },
  { html: '  name: <span class="c-str">&#39;Abbas Məmiyev&#39;</span>,' },
  { html: '  stack: [<span class="c-str">&#39;Vue 3&#39;</span>, <span class="c-str">&#39;Nuxt 3&#39;</span>, <span class="c-str">&#39;TypeScript&#39;</span>],' },
  { html: '  base: <span class="c-str">&#39;Baku 🇦🇿&#39;</span>,' },
  { html: '  raceWeek: <span class="c-str">&#39;F1 Paddock Security&#39;</span>,' },
  { html: '  motto: <span class="c-str">&#39;simplify the complex&#39;</span>' },
  { html: '}' },
  { html: '' },
  { html: '<span class="c-key">export default</span> <span class="c-fn">defineDeveloper</span>(<span class="c-var">developer</span>) <span class="c-cmt">// ✓ ready</span>' }
]
</script>

<template>
  <section id="dev" class="section dev">
    <div class="aurora dev__aurora"></div>
    <div class="container">
      <p class="sec-label" v-reveal>{{ t('dev.label') }}</p>
      <h2 class="sec-title" v-reveal="{ delay: 60 }">
        <span class="grad-text-dev">{{ t('dev.title') }}</span>
      </h2>
      <p class="sec-intro" v-reveal="{ delay: 120 }">{{ t('dev.intro') }}</p>

      <div class="dev__grid">
        <div class="dev__code card" v-reveal="{ delay: 160 }">
          <div class="dev__code-bar">
            <span class="dev__dot" style="background: #ff5f57"></span>
            <span class="dev__dot" style="background: #febc2e"></span>
            <span class="dev__dot" style="background: #28c840"></span>
            <span class="dev__code-file">{{ t('dev.codeFile') }}</span>
          </div>
          <pre class="dev__code-body"><code><span
            v-for="(line, i) in codeLines"
            :key="i"
            class="dev__code-line"
            :style="{ animationDelay: 0.15 + i * 0.12 + 's' }"
          ><span class="dev__code-num">{{ i + 1 }}</span><span v-html="line.html"></span>
</span></code></pre>
        </div>

        <div class="dev__stack">
          <h3 class="dev__stack-title" v-reveal>{{ t('dev.stackTitle') }}</h3>
          <div class="dev__groups">
            <div v-for="(g, gi) in groups" :key="g.name" class="card dev__group" v-reveal="{ delay: 100 + gi * 80 }">
              <span class="dev__group-name">{{ g.name }}</span>
              <div class="dev__group-chips">
                <span v-for="item in g.items" :key="item" class="chip chip--dev">{{ item }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h3 class="dev__exp-title" v-reveal>{{ t('dev.expTitle') }}</h3>
      <div class="dev__jobs">
        <article v-for="(job, i) in jobs" :key="job.company + job.period" class="card dev__job" v-reveal="{ delay: 80 + (i % 3) * 90 }">
          <div class="dev__job-head">
            <span class="dev__job-period">{{ job.period }}</span>
            <span class="dev__job-mode">{{ job.mode }}</span>
          </div>
          <h4 class="dev__job-role">{{ job.role }}</h4>
          <p class="dev__job-company grad-text-dev">{{ job.company }}</p>
          <p class="dev__job-desc">{{ job.desc }}</p>
          <div class="dev__job-tags">
            <span v-for="tag in job.tags" :key="tag" class="chip">{{ tag }}</span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.dev {
  overflow: hidden;
}

.dev__aurora {
  width: 480px;
  height: 480px;
  top: 60px;
  right: -180px;
  background: var(--dev-1);
  opacity: calc(var(--glow-opacity) * 0.35);
}

.dev__grid {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 26px;
  margin-top: 48px;
  margin-bottom: 80px;
  align-items: start;
}

/* Code window */
.dev__code {
  background: var(--code-bg);
  border-color: rgba(255, 255, 255, 0.12);
  overflow: hidden;
  font-size: 0.88rem;
}

.dev__code:hover {
  transform: none;
}

.dev__code-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 18px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.dev__dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.dev__code-file {
  margin-left: 10px;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: #8b93a7;
}

.dev__code-body {
  padding: 22px 20px 26px;
  font-family: var(--font-mono);
  line-height: 1.75;
  overflow-x: auto;
  color: #d6deeb;
}

.dev__code-line {
  display: block;
  white-space: pre;
  opacity: 0;
  transform: translateX(-8px);
  animation: code-in 0.5s var(--ease-out) forwards;
}

.dev__code-num {
  display: inline-block;
  width: 2em;
  color: #3d4663;
  user-select: none;
}

@keyframes code-in {
  to {
    opacity: 1;
    transform: none;
  }
}

.dev__code-body :deep(.c-key) {
  color: #c792ea;
}
.dev__code-body :deep(.c-var) {
  color: #82aaff;
}
.dev__code-body :deep(.c-str) {
  color: #c3e88d;
}
.dev__code-body :deep(.c-op) {
  color: #89ddff;
}
.dev__code-body :deep(.c-fn) {
  color: #ffcb6b;
}
.dev__code-body :deep(.c-cmt) {
  color: #546e7a;
}

/* Stack */
.dev__stack-title,
.dev__exp-title {
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.dev__stack-title::before,
.dev__exp-title::before {
  content: '';
  width: 22px;
  height: 3px;
  border-radius: 2px;
  background: var(--grad-dev);
}

.dev__groups {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.dev__group {
  padding: 18px 20px;
}

.dev__group-name {
  display: block;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--text-3);
  margin-bottom: 12px;
}

.dev__group-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.chip--dev:hover {
  border-color: rgba(0, 220, 130, 0.55);
  color: var(--dev-1);
}

/* Jobs */
.dev__jobs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 30px;
}

.dev__job {
  padding: 26px 26px 24px;
  display: flex;
  flex-direction: column;
}

.dev__job-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}

.dev__job-period {
  font-family: var(--font-mono);
  font-size: 0.74rem;
  font-weight: 600;
  color: var(--dev-1);
  background: rgba(0, 220, 130, 0.09);
  border: 1px solid rgba(0, 220, 130, 0.25);
  padding: 4px 10px;
  border-radius: 999px;
  white-space: nowrap;
}

.dev__job-mode {
  font-size: 0.76rem;
  color: var(--text-3);
  text-align: right;
}

.dev__job-role {
  font-size: 1.08rem;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.dev__job-company {
  font-weight: 600;
  font-size: 0.92rem;
  margin-bottom: 12px;
}

.dev__job-desc {
  color: var(--text-2);
  font-size: 0.9rem;
  flex: 1;
  margin-bottom: 18px;
}

.dev__job-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}

@media (max-width: 1020px) {
  .dev__jobs {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 920px) {
  .dev__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .dev__jobs {
    grid-template-columns: 1fr;
  }
}
</style>
