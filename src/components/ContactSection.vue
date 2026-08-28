<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const EMAIL = 'abbas.mamiyev@newmedia.az'
const LINKEDIN = 'https://www.linkedin.com/in/vahidoghlu/'
</script>

<template>
  <section id="contact" class="section contact">
    <div class="aurora contact__aurora-1"></div>
    <div class="aurora contact__aurora-2"></div>
    <div class="container contact__inner">
      <p class="sec-label" v-reveal>{{ t('contact.label') }}</p>
      <h2 class="contact__title" v-reveal="{ delay: 60 }">
        {{ t('contact.title') }}<span class="grad-text">.</span>
      </h2>
      <p class="contact__desc" v-reveal="{ delay: 120 }">{{ t('contact.desc') }}</p>

      <div class="contact__actions" v-reveal="{ delay: 180 }">
        <a class="btn btn-primary contact__btn" :href="'mailto:' + EMAIL">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3 7 9 6 9-6" />
          </svg>
          {{ t('contact.emailLabel') }}
        </a>
        <a class="btn btn-ghost contact__btn" :href="LINKEDIN" target="_blank" rel="noopener">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8.1h4.56V23H.22V8.1zM8.34 8.1h4.37v2.03h.06c.61-1.15 2.1-2.37 4.32-2.37 4.62 0 5.47 3.04 5.47 7v8.24h-4.55v-7.3c0-1.74-.03-3.98-2.43-3.98-2.43 0-2.8 1.9-2.8 3.86V23H8.34V8.1z" />
          </svg>
          {{ t('contact.linkedinLabel') }}
        </a>
      </div>

      <div class="contact__meta" v-reveal="{ delay: 240 }">
        <span class="contact__meta-item">
          <span class="contact__pulse"></span>
          {{ t('contact.open') }}
        </span>
        <span class="contact__meta-item">📍 {{ t('contact.location') }}</span>
        <a class="contact__meta-item contact__email" :href="'mailto:' + EMAIL">{{ EMAIL }}</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact {
  overflow: hidden;
  text-align: center;
  background: var(--bg-2);
}

.contact__inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.contact__aurora-1 {
  width: 480px;
  height: 480px;
  left: -160px;
  bottom: -200px;
  background: var(--brand-1);
}

.contact__aurora-2 {
  width: 420px;
  height: 420px;
  right: -140px;
  top: -160px;
  background: var(--brand-2);
  animation-delay: -8s;
}

.contact .sec-label::before {
  display: none;
}

.contact__title {
  font-size: clamp(2.3rem, 6vw, 4rem);
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 1.08;
  margin-bottom: 20px;
  max-width: 760px;
}

.contact__desc {
  color: var(--text-2);
  font-size: 1.08rem;
  max-width: 520px;
  margin-bottom: 40px;
}

.contact__actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
  margin-bottom: 46px;
}

.contact__btn {
  padding: 16px 32px;
  font-size: 1rem;
}

.contact__meta {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 14px 34px;
}

.contact__meta-item {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  font-size: 0.9rem;
  color: var(--text-2);
}

.contact__pulse {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--dev-1);
  animation: pulse-dot 2.2s infinite;
}

.contact__email {
  font-family: var(--font-mono);
  font-size: 0.84rem;
  transition: color 0.25s ease;
}

.contact__email:hover {
  color: var(--brand-2);
}
</style>
