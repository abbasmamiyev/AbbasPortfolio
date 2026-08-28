import type { Directive } from 'vue'

// v-reveal / v-reveal="{ delay: 120 }" — fades elements in when they enter the viewport.
const observer =
  typeof IntersectionObserver !== 'undefined'
    ? new IntersectionObserver(
        entries => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-revealed')
              observer!.unobserve(entry.target)
            }
          }
        },
        { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
      )
    : null

export const reveal: Directive<HTMLElement, { delay?: number } | undefined> = {
  mounted(el, binding) {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !observer) {
      el.classList.add('is-revealed')
      return
    }
    el.classList.add('reveal')
    const delay = binding.value?.delay ?? 0
    if (delay) el.style.transitionDelay = `${delay}ms`
    observer.observe(el)
  },
  unmounted(el) {
    observer?.unobserve(el)
  }
}
