<script setup lang="ts">
import { inject, onMounted, onUnmounted, ref, type Ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { LOCALES, setLocale, type Locale } from '../i18n'

const { locale } = useI18n()
const theme = inject<Ref<'dark' | 'light'>>('theme')!
const toggleTheme = inject<() => void>('toggleTheme')!

const scrolled = ref(false)
const menuOpen = ref(false)
const active = ref('')

const links = [
  { id: 'about', key: 'nav.about' },
  { id: 'dev', key: 'nav.dev' },
  { id: 'paddock', key: 'nav.paddock' },
  { id: 'journey', key: 'nav.journey' },
  { id: 'certs', key: 'nav.extras' },
  { id: 'contact', key: 'nav.contact' }
]

function onScroll() {
  scrolled.value = window.scrollY > 30
}

let sectionObserver: IntersectionObserver | null = null

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
  sectionObserver = new IntersectionObserver(
    entries => {
      for (const e of entries) {
        if (e.isIntersecting) active.value = e.target.id
      }
    },
    { rootMargin: '-40% 0px -55% 0px' }
  )
  for (const l of links) {
    const el = document.getElementById(l.id)
    if (el) sectionObserver.observe(el)
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  sectionObserver?.disconnect()
})

function pick(code: Locale) {
  setLocale(code)
}

function go(id: string) {
  menuOpen.value = false
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <header class="nav" :class="{ 'nav--scrolled': scrolled }">
    <div class="nav__inner container">
      <a class="nav__logo" href="#" @click.prevent="go('hero')">
        <span class="nav__mark">AM</span>
        <span class="nav__logo-dot"></span>
      </a>

      <nav class="nav__links" aria-label="Main">
        <a
          v-for="l in links"
          :key="l.id"
          :href="'#' + l.id"
          class="nav__link"
          :class="{ 'nav__link--active': active === l.id }"
          @click.prevent="go(l.id)"
        >
          {{ $t(l.key) }}
        </a>
      </nav>

      <div class="nav__actions">
        <div class="lang" role="group" aria-label="Language">
          <button
            v-for="l in LOCALES"
            :key="l.code"
            class="lang__btn"
            :class="{ 'lang__btn--on': locale === l.code }"
            @click="pick(l.code)"
          >
            {{ l.label }}
          </button>
        </div>

        <button class="theme-btn" :aria-label="$t('a11y.theme')" @click="toggleTheme">
          <svg v-if="theme === 'dark'" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <circle cx="12" cy="12" r="4.2" />
            <path d="M12 2v2.2M12 19.8V22M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M2 12h2.2M19.8 12H22M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6" />
          </svg>
          <svg v-else width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
          </svg>
        </button>

        <button class="burger" :class="{ 'burger--open': menuOpen }" :aria-label="$t('a11y.menu')" @click="menuOpen = !menuOpen">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>

    <transition name="menu">
      <div v-if="menuOpen" class="mobile-menu">
        <a
          v-for="(l, i) in links"
          :key="l.id"
          :href="'#' + l.id"
          class="mobile-menu__link"
          :style="{ transitionDelay: i * 40 + 'ms' }"
          @click.prevent="go(l.id)"
        >
          <span class="mobile-menu__num">0{{ i + 1 }}</span>
          {{ $t(l.key) }}
        </a>
      </div>
    </transition>
  </header>
</template>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transition: background-color 0.35s ease, border-color 0.35s ease, backdrop-filter 0.35s ease;
  border-bottom: 1px solid transparent;
}

.nav--scrolled {
  background: var(--nav-bg);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom-color: var(--border);
}

.nav__inner {
  height: var(--nav-h);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.nav__logo {
  display: inline-flex;
  align-items: baseline;
  gap: 4px;
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 1.25rem;
  letter-spacing: -0.02em;
}

.nav__mark {
  background: var(--grad-brand);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nav__logo-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--dev-1);
  align-self: flex-end;
  margin-bottom: 6px;
}

.nav__links {
  display: flex;
  gap: 4px;
}

.nav__link {
  font-size: 0.88rem;
  font-weight: 500;
  color: var(--text-2);
  padding: 8px 13px;
  border-radius: 999px;
  transition: color 0.25s ease, background-color 0.25s ease;
}

.nav__link:hover {
  color: var(--text);
}

.nav__link--active {
  color: var(--text);
  background: var(--surface-2);
}

.nav__actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.lang {
  display: flex;
  border: 1px solid var(--border);
  border-radius: 999px;
  padding: 3px;
  background: var(--surface);
}

.lang__btn {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  font-weight: 600;
  padding: 5px 10px;
  border-radius: 999px;
  color: var(--text-3);
  transition: color 0.25s ease, background-color 0.25s ease;
}

.lang__btn--on {
  color: #fff;
  background: var(--grad-brand);
}

.theme-btn {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-2);
  transition: color 0.25s ease, border-color 0.25s ease, transform 0.4s var(--ease-out);
}

.theme-btn:hover {
  color: var(--text);
  border-color: var(--border-strong);
  transform: rotate(40deg);
}

.burger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 38px;
  height: 38px;
  align-items: center;
}

.burger span {
  display: block;
  width: 20px;
  height: 2px;
  border-radius: 2px;
  background: var(--text);
  transition: transform 0.3s var(--ease-out), opacity 0.2s ease;
}

.burger--open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.burger--open span:nth-child(2) {
  opacity: 0;
}
.burger--open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

.mobile-menu {
  display: none;
  flex-direction: column;
  padding: 12px 24px 28px;
  background: var(--nav-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--border);
}

.mobile-menu__link {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 4px;
  font-size: 1.15rem;
  font-weight: 600;
  border-bottom: 1px solid var(--border);
}

.mobile-menu__num {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--text-3);
}

.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (max-width: 920px) {
  .nav__links {
    display: none;
  }
  .burger {
    display: flex;
  }
  .mobile-menu {
    display: flex;
  }
}

@media (max-width: 480px) {
  .lang__btn {
    padding: 4px 7px;
  }
}
</style>
