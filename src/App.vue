<script setup lang="ts">
import { onMounted, onUnmounted, provide, ref } from 'vue'
import SiteNav from './components/SiteNav.vue'
import HeroSection from './components/HeroSection.vue'
import MarqueeStrip from './components/MarqueeStrip.vue'
import AboutSection from './components/AboutSection.vue'
import WorldsSplit from './components/WorldsSplit.vue'
import DevSection from './components/DevSection.vue'
import PaddockSection from './components/PaddockSection.vue'
import JourneySection from './components/JourneySection.vue'
import CertsSection from './components/CertsSection.vue'
import VolunteerSection from './components/VolunteerSection.vue'
import EducationSection from './components/EducationSection.vue'
import ContactSection from './components/ContactSection.vue'
import SiteFooter from './components/SiteFooter.vue'

type Theme = 'dark' | 'light'

const theme = ref<Theme>('dark')

function applyTheme(t: Theme) {
  theme.value = t
  document.documentElement.setAttribute('data-theme', t)
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', t === 'dark' ? '#07090f' : '#f5f6fa')
  try {
    localStorage.setItem('theme', t)
  } catch {}
}

function toggleTheme() {
  applyTheme(theme.value === 'dark' ? 'light' : 'dark')
}

provide('theme', theme)
provide('toggleTheme', toggleTheme)

/* Scroll progress + back-to-top */
const progress = ref(0)
const showTop = ref(false)

function onScroll() {
  const doc = document.documentElement
  const max = doc.scrollHeight - doc.clientHeight
  progress.value = max > 0 ? (doc.scrollTop / max) * 100 : 0
  showTop.value = doc.scrollTop > 900
}

function toTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  let saved: string | null = null
  try {
    saved = localStorage.getItem('theme')
  } catch {}
  if (saved === 'light' || saved === 'dark') applyTheme(saved)
  else applyTheme(window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')

  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <div class="app">
    <div class="progress" aria-hidden="true">
      <div class="progress__bar" :style="{ width: progress + '%' }"></div>
    </div>

    <SiteNav />

    <main>
      <HeroSection />
      <MarqueeStrip />
      <AboutSection />
      <WorldsSplit />
      <DevSection />
      <PaddockSection />
      <JourneySection />
      <CertsSection />
      <VolunteerSection />
      <EducationSection />
      <ContactSection />
    </main>

    <SiteFooter />

    <transition name="fade">
      <button v-if="showTop" class="to-top" :aria-label="$t('a11y.toTop')" @click="toTop">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
    </transition>
  </div>
</template>

<style scoped>
.progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  z-index: 200;
  background: transparent;
}

.progress__bar {
  height: 100%;
  background: var(--grad-brand);
  border-radius: 0 4px 4px 0;
  transition: width 0.1s linear;
}

.to-top {
  position: fixed;
  right: 24px;
  bottom: 24px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: var(--surface-2);
  border: 1px solid var(--border-strong);
  color: var(--text);
  backdrop-filter: blur(12px);
  z-index: 90;
  transition: transform 0.3s var(--ease-out), border-color 0.3s ease;
}

.to-top:hover {
  transform: translateY(-4px);
  border-color: var(--brand-2);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
