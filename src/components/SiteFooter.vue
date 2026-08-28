<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="checkers footer__checkers" aria-hidden="true"></div>
    <div class="container footer__inner">
      <div class="footer__brand">
        <span class="footer__mark"><span class="footer__tag">&lt;</span>abbas<span class="footer__tag">/&gt;</span></span>
        <span class="footer__name">Abbas Məmiyev</span>
      </div>
      <p class="footer__made">
        {{ t('footer.made') }}
        <svg width="15" height="15" viewBox="0 0 256 221" style="vertical-align: -2px">
          <path fill="#41B883" d="M204.8 0H256L128 220.8 0 0h97.92L128 51.2 157.44 0h47.36Z" />
          <path fill="#35495E" d="m0 0 128 220.8L256 0h-51.2L128 132.48 50.56 0H0Z" opacity=".55" />
        </svg>
      </p>
      <p class="footer__copy">© {{ year }} Abbas Məmiyev — {{ t('footer.rights') }} · AZ · EN · RU</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--border);
  padding: 0 0 36px;
  background: var(--bg);
}

.footer__checkers {
  border-radius: 0;
  opacity: 0.15;
}

.footer__inner {
  padding-top: 34px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  text-align: center;
}

.footer__brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.footer__mark {
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 1.05rem;
  background: var(--grad-brand);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.footer__tag {
  -webkit-text-fill-color: var(--text-3);
  font-weight: 500;
}

.footer__name {
  font-weight: 700;
  letter-spacing: -0.01em;
}

.footer__made {
  font-size: 0.86rem;
  color: var(--text-2);
  display: inline-flex;
  align-items: center;
  gap: 7px;
}

.footer__copy {
  font-family: var(--font-mono);
  font-size: 0.74rem;
  color: var(--text-3);
}
</style>
