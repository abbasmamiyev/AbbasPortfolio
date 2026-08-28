import { createI18n } from 'vue-i18n'
import az from './az'
import en from './en'
import ru from './ru'

export type Locale = 'az' | 'en' | 'ru'
export const LOCALES: { code: Locale; label: string }[] = [
  { code: 'az', label: 'AZ' },
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'RU' }
]

function isLocale(v: unknown): v is Locale {
  return v === 'az' || v === 'en' || v === 'ru'
}

function detectLocale(): Locale {
  // 1. URL param (?lang=az|en|ru) — shareable, SEO-crawlable language variants
  try {
    const param = new URLSearchParams(window.location.search).get('lang')
    if (isLocale(param)) return param
  } catch {}
  // 2. saved preference
  try {
    const saved = localStorage.getItem('locale')
    if (isLocale(saved)) return saved
  } catch {}
  // 3. browser language
  const nav = (navigator.language || 'en').toLowerCase()
  if (nav.startsWith('az')) return 'az'
  if (nav.startsWith('ru')) return 'ru'
  return 'en'
}

export const i18n = createI18n({
  legacy: false,
  locale: detectLocale(),
  fallbackLocale: 'en',
  messages: { az, en, ru }
})

/* Keep <html lang>, <title> and meta description in sync with the active locale */
function syncMeta(locale: Locale) {
  document.documentElement.lang = locale
  document.title = i18n.global.t('meta.title')
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute('content', i18n.global.t('meta.description'))
}

export function setLocale(locale: Locale, updateUrl = true) {
  i18n.global.locale.value = locale
  syncMeta(locale)
  try {
    localStorage.setItem('locale', locale)
  } catch {}
  if (updateUrl) {
    try {
      const url = new URL(window.location.href)
      url.searchParams.set('lang', locale)
      history.replaceState(null, '', url)
    } catch {}
  }
}

export function initLocaleMeta() {
  syncMeta(i18n.global.locale.value as Locale)
}
