# Abbas Məmiyev — Portfolio

Şəxsi portfolio saytı: **Frontend Developer (Vue / Nuxt) × F1 Paddock Security Specialist**.

3 dil (AZ / EN / RU) · Dark / Light mode · Vue 3 + Vite + TypeScript + vue-i18n

## İşə salmaq

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build → dist/
npm run preview    # build-i lokal yoxla
```

## Netlify-a yükləmək

**Variant 1 — Git ilə (tövsiyə olunur):**
1. Layihəni GitHub-a push et.
2. Netlify → "Add new site" → "Import an existing project" → repo-nu seç.
3. Build ayarları avtomatik `netlify.toml`-dan götürülür (build: `npm run build`, publish: `dist`). Heç nə dəyişməyə ehtiyac yoxdur.

**Variant 2 — Drag & Drop:**
1. `npm run build` işlət.
2. `dist` qovluğunu [app.netlify.com/drop](https://app.netlify.com/drop) səhifəsinə sürüklə.

## Məzmunu redaktə etmək

Bütün mətnlər üç faylda saxlanılır — dizaynla işin yoxdur, sadəcə mətni dəyiş:

| Fayl | Dil |
|---|---|
| `src/i18n/az.ts` | Azərbaycan |
| `src/i18n/en.ts` | İngilis |
| `src/i18n/ru.ts` | Rus |

Digər tez-tez lazım olanlar:
- **Foto:** `public/images/abbas.jpg` faylını əvəz et (kvadrat şəkil ideal olar).
- **E-poçt / LinkedIn:** `src/components/ContactSection.vue` faylının yuxarısındakı `EMAIL` və `LINKEDIN` sabitləri.
- **Rənglər / şriftlər:** `src/styles/main.css` faylının əvvəlindəki CSS dəyişənləri (`--brand-1`, `--dev-1`, `--pad-1` və s.).
- **SEO başlıq / təsvir:** `index.html`.

## Struktur

```
src/
├── components/      # Hər bölmə ayrıca komponent
│   ├── HeroSection.vue      # Giriş: ad, yazı effekti, foto
│   ├── WorldsSplit.vue      # "İki dünya" — Developer × Paddock
│   ├── DevSection.vue       # Texnologiyalar + dev iş təcrübəsi
│   ├── PaddockSection.vue   # F1: postlar xəritəsi, vəzifələr
│   ├── JourneySection.vue   # Tam karyera xronologiyası (filtrli)
│   └── ...
├── i18n/            # 3 dildə bütün mətnlər
├── styles/main.css  # Dizayn sistemi (tokenlər, dark/light)
└── directives/      # v-reveal scroll animasiyası
```

## SEO

Sayt tam SEO hazırlığı ilə gəlir: canonical, hreflang (az/en/ru), Open Graph + Twitter kartları, JSON-LD Person schema, `robots.txt`, `sitemap.xml`, `site.webmanifest`, WebP şəkillər, dinamik title/description (dilə görə dəyişir), `?lang=` parametrli paylaşıla bilən dil linkləri.

**Deploy-dan sonra MÜTLƏQ:** `abbasmamiyev.netlify.app` placeholder domenini real ünvanınla əvəz et — 3 faylda:
1. `index.html` (canonical, hreflang, og:url, og:image, JSON-LD)
2. `public/robots.txt` (Sitemap sətri)
3. `public/sitemap.xml` (bütün URL-lər)

Sonra:
1. [Google Search Console](https://search.google.com/search-console)-a saytı əlavə et (domen təsdiqi Netlify DNS-dən asan olur)
2. Sitemap göndər: `https://SENIN-DOMENIN/sitemap.xml`
3. LinkedIn və GitHub profilinə sayt linkini qoy (ən güclü backlink mənbəyi)

## Qeydlər

- Rus dili səviyyəsi («Danışıq»), ingilis dili səviyyəsi («İş səviyyəsi») və hərbi xidmət dövrü (2019–2020) təxmini yazılıb — `src/i18n/*.ts` fayllarında dəqiqləşdirə bilərsən.
- Əlaqə e-poçtu hazırda iş ünvanındır (`abbas.mamiyev@newmedia.az`) — şəxsi e-poçtla əvəz etmək istəsən `ContactSection.vue`-da dəyiş.
