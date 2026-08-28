<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { t, tm, rt, locale } = useI18n()

const roles = computed<string[]>(() => (tm('hero.roles') as unknown[]).map(r => rt(r as any)))
const stats = computed<{ n: string; l: string }[]>(() =>
  (tm('hero.stats') as any[]).map(s => ({ n: rt(s.n), l: rt(s.l) }))
)

/* Typewriter */
const typed = ref('')
let roleIdx = 0
let charIdx = 0
let deleting = false
let timer: number | undefined

function tick() {
  const list = roles.value
  if (!list.length) return
  const current = list[roleIdx % list.length]
  if (!deleting) {
    charIdx++
    typed.value = current.slice(0, charIdx)
    if (charIdx >= current.length) {
      deleting = true
      timer = window.setTimeout(tick, 2200)
      return
    }
    timer = window.setTimeout(tick, 55)
  } else {
    charIdx--
    typed.value = current.slice(0, charIdx)
    if (charIdx <= 0) {
      deleting = false
      roleIdx++
      timer = window.setTimeout(tick, 350)
      return
    }
    timer = window.setTimeout(tick, 28)
  }
}

watch(locale, () => {
  window.clearTimeout(timer)
  roleIdx = 0
  charIdx = 0
  deleting = false
  typed.value = ''
  tick()
})

/* Subtle parallax on the photo card */
const tilt = ref({ x: 0, y: 0 })

function onMove(e: MouseEvent) {
  const w = window.innerWidth
  const h = window.innerHeight
  tilt.value = { x: (e.clientX / w - 0.5) * 8, y: (e.clientY / h - 0.5) * -8 }
}

onMounted(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!reduced) {
    tick()
    window.addEventListener('mousemove', onMove, { passive: true })
  } else {
    typed.value = roles.value[0] ?? ''
  }
})

onUnmounted(() => {
  window.clearTimeout(timer)
  window.removeEventListener('mousemove', onMove)
})

function go(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section id="hero" class="hero">
    <div class="bg-grid"></div>
    <div class="aurora aurora--1"></div>
    <div class="aurora aurora--2"></div>
    <div class="aurora aurora--3"></div>

    <div class="container hero__grid">
      <div class="hero__text">
        <p class="hero__badge" v-reveal>
          <span class="hero__badge-dot"></span>
          {{ t('hero.openTo') }}
        </p>

        <p class="hero__hello" v-reveal="{ delay: 80 }">{{ t('hero.hello') }}</p>

        <h1 class="hero__name" v-reveal="{ delay: 140 }">
          {{ t('hero.name') }}<span class="grad-text">.</span>
        </h1>

        <div class="hero__role" v-reveal="{ delay: 200 }">
          <span class="hero__role-typed grad-text">{{ typed }}</span><span class="hero__caret" aria-hidden="true"></span>
        </div>

        <p class="hero__tagline" v-reveal="{ delay: 260 }">{{ t('hero.tagline') }}</p>

        <div class="hero__cta" v-reveal="{ delay: 320 }">
          <button class="btn btn-primary" @click="go('contact')">
            {{ t('hero.ctaContact') }}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
          <a class="btn btn-ghost" href="https://www.linkedin.com/in/vahidoghlu/" target="_blank" rel="noopener">
            {{ t('hero.ctaLinkedin') }}
          </a>
        </div>

        <div class="hero__stats" v-reveal="{ delay: 400 }">
          <div v-for="s in stats" :key="s.l" class="hero__stat">
            <span class="hero__stat-n grad-text">{{ s.n }}</span>
            <span class="hero__stat-l">{{ s.l }}</span>
          </div>
        </div>
      </div>

      <div class="hero__visual" v-reveal="{ delay: 220 }">
        <div class="hero__photo-wrap" :style="{ transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)` }">
          <div class="hero__photo-glow"></div>
          <div class="hero__photo">
            <picture>
              <source srcset="/images/abbas.webp" type="image/webp" />
              <img src="/images/abbas.jpg" alt="Abbas Məmiyev — Frontend Developer" width="900" height="900" fetchpriority="high" />
            </picture>
          </div>

          <div class="hero__chip hero__chip--vue">
            <svg width="18" height="18" viewBox="0 0 256 221"><path fill="#41B883" d="M204.8 0H256L128 220.8 0 0h97.92L128 51.2 157.44 0h47.36Z"/><path fill="#35495E" d="m0 0 128 220.8L256 0h-51.2L128 132.48 50.56 0H0Z" opacity=".55"/></svg>
            Vue.js
          </div>
          <div class="hero__chip hero__chip--nuxt">
            <svg width="18" height="18" viewBox="0 0 256 168"><path fill="#00DC82" d="M143.6 167.3h97.8c3.1 0 6.2-.8 8.8-2.4a17.6 17.6 0 0 0 6.5-6.4c1.6-2.7 2.4-5.8 2.4-8.9 0-3.1-.9-6.2-2.4-8.8L191 26.6a17.6 17.6 0 0 0-6.4-6.4 17.7 17.7 0 0 0-17.7 0 17.6 17.6 0 0 0-6.5 6.4l-16.8 29-32.9-56.9a17.6 17.6 0 0 0-6.4-6.4 17.7 17.7 0 0 0-17.7 0c-2.7 1.5-4.9 3.8-6.5 6.4L2.4 140.8A17.7 17.7 0 0 0 0 149.6c0 3.1.8 6.2 2.4 8.9a17.6 17.6 0 0 0 6.5 6.4c2.7 1.6 5.7 2.4 8.8 2.4h61.4c24.3 0 42.3-10.7 54.6-31.6l30-51.9 16-27.7 48.2 83.3h-64.3l-20 28.9Zm-65.5-29L35.6 138 99.2 28.2l31.8 55-21.3 36.9c-8.1 13.4-17.3 18.2-31.6 18.2Z"/></svg>
            Nuxt
          </div>
          <div class="hero__chip hero__chip--f1">🏁 Formula 1</div>
          <div class="hero__chip hero__chip--loc">📍 {{ t('hero.location') }}</div>
        </div>
      </div>
    </div>

    <button class="hero__scroll" @click="go('about')">
      <span class="hero__scroll-mouse"><span></span></span>
      {{ t('hero.scroll') }}
    </button>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: center;
  padding-top: calc(var(--nav-h) + 40px);
  padding-bottom: 90px;
  overflow: hidden;
}

.aurora--1 {
  width: 520px;
  height: 520px;
  top: -140px;
  left: -120px;
  background: var(--brand-1);
}

.aurora--2 {
  width: 460px;
  height: 460px;
  bottom: -160px;
  right: -100px;
  background: var(--brand-2);
  animation-delay: -6s;
}

.aurora--3 {
  width: 320px;
  height: 320px;
  top: 30%;
  right: 26%;
  background: var(--dev-1);
  opacity: calc(var(--glow-opacity) * 0.5);
  animation-delay: -11s;
}

.hero__grid {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  align-items: center;
  gap: 48px;
  position: relative;
  z-index: 2;
}

.hero__badge {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  font-family: var(--font-mono);
  font-size: 0.78rem;
  font-weight: 500;
  color: var(--text-2);
  border: 1px solid var(--border);
  background: var(--surface);
  padding: 7px 15px;
  border-radius: 999px;
  margin-bottom: 26px;
}

.hero__badge-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--dev-1);
  box-shadow: 0 0 0 0 rgba(0, 220, 130, 0.5);
  animation: pulse-dot 2.2s infinite;
}

.hero__hello {
  font-size: 1.1rem;
  color: var(--text-2);
  margin-bottom: 6px;
}

.hero__name {
  font-size: clamp(2.6rem, 6.5vw, 4.6rem);
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 1.04;
  margin-bottom: 14px;
}

.hero__role {
  font-family: var(--font-mono);
  font-size: clamp(1.05rem, 2.4vw, 1.5rem);
  font-weight: 600;
  min-height: 2.2em;
  display: flex;
  align-items: center;
  margin-bottom: 18px;
}

.hero__caret {
  display: inline-block;
  width: 3px;
  height: 1.25em;
  margin-left: 4px;
  background: var(--brand-2);
  animation: blink 1.1s step-end infinite;
}

.hero__tagline {
  color: var(--text-2);
  font-size: 1.06rem;
  max-width: 540px;
  margin-bottom: 34px;
}

.hero__cta {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 48px;
}

.hero__stats {
  display: grid;
  grid-template-columns: repeat(4, auto);
  gap: 34px;
  justify-content: start;
}

.hero__stat {
  display: flex;
  flex-direction: column;
}

.hero__stat-n {
  font-size: 1.9rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.1;
}

.hero__stat-l {
  font-size: 0.8rem;
  color: var(--text-3);
  max-width: 120px;
}

/* Visual */
.hero__visual {
  display: flex;
  justify-content: center;
  perspective: 1000px;
}

.hero__photo-wrap {
  position: relative;
  transition: transform 0.25s ease-out;
  transform-style: preserve-3d;
}

.hero__photo-glow {
  position: absolute;
  inset: -8%;
  border-radius: 36px;
  background: conic-gradient(from 180deg, var(--brand-1), var(--brand-2), var(--dev-1), var(--pad-1), var(--brand-1));
  filter: blur(42px);
  opacity: calc(var(--glow-opacity) * 0.9);
  animation: spin-slow 14s linear infinite;
}

.hero__photo {
  position: relative;
  width: min(380px, 78vw);
  aspect-ratio: 1;
  border-radius: 32px;
  overflow: hidden;
  border: 1px solid var(--border-strong);
  background: var(--bg-3);
  box-shadow: var(--shadow);
}

.hero__photo picture {
  display: block;
  width: 100%;
  height: 100%;
}

.hero__photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.92) contrast(1.04);
}

.hero__photo::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(200deg, rgba(99, 102, 241, 0.16), transparent 45%, rgba(34, 211, 238, 0.1));
  mix-blend-mode: screen;
  pointer-events: none;
}

.hero__chip {
  position: absolute;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  font-weight: 600;
  padding: 9px 15px;
  border-radius: 14px;
  background: var(--nav-bg);
  border: 1px solid var(--border-strong);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  box-shadow: var(--shadow);
  animation: floaty 5.5s ease-in-out infinite;
  white-space: nowrap;
}

.hero__chip--vue {
  top: 6%;
  left: -13%;
  color: #41b883;
}

.hero__chip--nuxt {
  bottom: 22%;
  right: -14%;
  color: var(--dev-1);
  animation-delay: -1.6s;
}

.hero__chip--f1 {
  top: 26%;
  right: -10%;
  color: var(--pad-2);
  animation-delay: -3.2s;
}

.hero__chip--loc {
  bottom: -4%;
  left: 6%;
  color: var(--text-2);
  animation-delay: -4.4s;
}

/* Scroll hint */
.hero__scroll {
  position: absolute;
  left: 50%;
  bottom: 26px;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 9px;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--text-3);
  z-index: 2;
  transition: color 0.3s ease;
}

.hero__scroll:hover {
  color: var(--text-2);
}

.hero__scroll-mouse {
  width: 24px;
  height: 38px;
  border: 1.5px solid currentColor;
  border-radius: 14px;
  display: flex;
  justify-content: center;
  padding-top: 7px;
}

.hero__scroll-mouse span {
  width: 3px;
  height: 8px;
  border-radius: 3px;
  background: currentColor;
  animation: floaty 1.6s ease-in-out infinite;
}

@media (max-width: 920px) {
  .hero__grid {
    grid-template-columns: 1fr;
    gap: 64px;
  }
  .hero__visual {
    order: -1;
    margin-top: 10px;
  }
  .hero__stats {
    grid-template-columns: repeat(2, auto);
    gap: 22px 44px;
  }
  .hero__chip--vue {
    left: -4%;
  }
  .hero__chip--nuxt {
    right: -4%;
  }
  .hero__chip--f1 {
    right: -2%;
  }
  .hero__scroll {
    display: none;
  }
}
</style>
