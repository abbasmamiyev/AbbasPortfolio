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

function detectLocale(): Locale {
  try {
    const saved = localStorage.getItem('locale')
    if (saved === 'az' || saved === 'en' || saved === 'ru') return saved
  } catch {}
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

export function setLocale(locale: Locale) {
  i18n.global.locale.value = locale
  document.documentElement.lang = locale
  try {
    localStorage.setItem('locale', locale)
  } catch {}
}
