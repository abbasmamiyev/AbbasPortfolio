<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { tm, rt } = useI18n()
const items = computed<string[]>(() => (tm('marquee') as unknown[]).map(i => rt(i as any)))
</script>

<template>
  <div class="marquee" aria-hidden="true">
    <div class="marquee__track">
      <template v-for="n in 2" :key="n">
        <span v-for="item in items" :key="n + item" class="marquee__item">
          {{ item }}
          <span class="marquee__star">✦</span>
        </span>
      </template>
    </div>
  </div>
</template>

<style scoped>
.marquee {
  border-block: 1px solid var(--border);
  background: var(--bg-2);
  overflow: hidden;
  padding-block: 18px;
  position: relative;
}

.marquee::before,
.marquee::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 120px;
  z-index: 2;
  pointer-events: none;
}

.marquee::before {
  left: 0;
  background: linear-gradient(90deg, var(--bg-2), transparent);
}

.marquee::after {
  right: 0;
  background: linear-gradient(-90deg, var(--bg-2), transparent);
}

.marquee__track {
  display: flex;
  width: max-content;
  animation: marquee 30s linear infinite;
}

.marquee:hover .marquee__track {
  animation-play-state: paused;
}

.marquee__item {
  display: inline-flex;
  align-items: center;
  gap: 26px;
  padding-right: 26px;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  color: var(--text-3);
  white-space: nowrap;
}

.marquee__star {
  color: var(--brand-2);
  font-size: 0.7rem;
}
</style>
