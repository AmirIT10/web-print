# Home Page — Design Specification

## 1. وضعیت و Gate

**Status:** Design Deliverable v1.0 — آماده بررسی PM

این سند Design Spec اجرایی Home Page است و باید برای پیاده‌سازی Frontend بدون نیاز به حدس طراحی استفاده شود. داده‌ها در این مرحله Mock/Static هستند و هیچ اتصال اجرایی به Vendure یا Axelor وجود ندارد.

---

## 2. هدف و UX Flow

هدف Home معرفی سریع برند، نمایش مسیرهای اصلی محصول و هدایت کاربر به Product Detail است.

**Primary flow:** `Home → Category/Product → Product Detail → شروع سفارش`

**Primary CTA:** `مشاهده محصولات`

**Secondary CTA:** `دسته‌بندی محصولات`

---

## 3. Information Architecture

ترتیب عمودی صفحه:

1. `Header`
2. `HeroSection`
3. `CategorySection`
4. `FeaturedProductsSection`
5. `ServicesSection`
6. `PrimaryCTASection`
7. `Footer`

در Mobile همین ترتیب حفظ می‌شود؛ هیچ Section اصلی حذف نمی‌شود.

---

## 4. Wireframe

```text
┌──────────────────────────────────────────────┐
│ Header: Logo | Navigation | Search | Action │
├──────────────────────────────────────────────┤
│ HERO                                         │
│ Eyebrow                                      │
│ Heading + short description                  │
│ [مشاهده محصولات] [دسته‌بندی‌ها]              │
│                         Visual / Product     │
├──────────────────────────────────────────────┤
│ دسته‌بندی محصولات                            │
│ [Card] [Card] [Card] [Card]                  │
├──────────────────────────────────────────────┤
│ محصولات منتخب                               │
│ [Product] [Product] [Product] [Product]      │
├──────────────────────────────────────────────┤
│ خدمات و مزایا                                │
│ [Icon + title + text] × 3/4                  │
├──────────────────────────────────────────────┤
│ CTA Banner                                   │
│ متن کوتاه + [مشاهده محصولات]                 │
├──────────────────────────────────────────────┤
│ Footer                                       │
└──────────────────────────────────────────────┘
```

---

## 5. Component Specification

### 5.1 Header
**نوع:** layout/component
**فایل:** `src/components/home/Header.tsx`

| Prop | Type | Required | توضیح |
|---|---|---:|---|
| logo | string | ✅ | مسیر asset لوگو |
| navItems | NavItem[] | ✅ | لینک‌های اصلی |
| ctaLabel | string | ❌ | متن CTA هدر |

**Desktop (>1024):** ارتفاع 72px، container حداکثر 1200px، navigation افقی، CTA در سمت انتهایی. در RTL ترتیب بصری با جهت RTL هماهنگ باشد.

**Tablet (768–1024):** ارتفاع 68px، navigation اصلی به منوی فشرده تبدیل شود.

**Mobile (<768):** ارتفاع 64px؛ لوگو + menu trigger + CTA کوتاه. منوی بازشونده تمام عرض با backdrop نمایش داده شود.

**States:** default / menu-open / sticky.

### 5.2 HeroSection
**فایل:** `src/components/home/HeroSection.tsx`

| Prop | Type | Required | توضیح |
|---|---|---:|---|
| eyebrow | string | ❌ | برچسب کوتاه |
| title | string | ✅ | H1 |
| description | string | ✅ | توضیح حداکثر 2–3 خط Desktop |
| primaryAction | CTA | ✅ | CTA اصلی |
| secondaryAction | CTA | ❌ | CTA ثانویه |
| image | string | ✅ | تصویر/visual اصلی |

**Desktop:** grid دو ستونه 52/48، حداقل ارتفاع 560px، gap برابر 48px. H1 حداکثر 2 خط.

**Tablet:** دو ستون 55/45، حداقل ارتفاع 500px.

**Mobile:** تک‌ستونه؛ متن قبل از تصویر، padding افقی 20px، H1 حداکثر 3 خط، تصویر زیر CTAها.

**States:** image-loading skeleton؛ image-error با placeholder نسبت 4:3.

### 5.3 CategorySection
**فایل:** `src/components/home/CategorySection.tsx`

| Prop | Type | Required | توضیح |
|---|---|---:|---|
| title | string | ✅ | عنوان Section |
| categories | CategoryCardData[] | ✅ | حداقل 1 مورد |
| viewAllHref | string | ❌ | مسیر همه دسته‌ها |

**Desktop:** چهار کارت در یک ردیف، gap 20px.
**Tablet:** دو کارت در هر ردیف، gap 16px.
**Mobile:** دو کارت در هر ردیف؛ اگر بیش از 6 کارت وجود داشت فقط 6 مورد اول + «مشاهده همه».

Card: aspect image 4:3، radius 16px، عنوان در پایین کارت، کل کارت clickable.

**Empty:** Section به‌طور کامل مخفی نمی‌شود؛ عنوان و یک empty message کوتاه نمایش داده شود.
**Loading:** 4 skeleton card.
**Error:** پیام خطای inline + retry.

### 5.4 FeaturedProductsSection
**فایل:** `src/components/home/FeaturedProductsSection.tsx`

| Prop | Type | Required | توضیح |
|---|---|---:|---|
| title | string | ✅ | عنوان |
| products | ProductCardData[] | ✅ | محصولات منتخب |
| viewAllHref | string | ❌ | مسیر محصولات |

**Desktop:** 4 کارت؛ Tablet: 3 کارت؛ Mobile: horizontal scroll با snap و حداقل عرض card برابر 260px.

Product Card شامل image، نام، short description و CTA `مشاهده محصول` است. قیمت در این فاز نمایش داده نمی‌شود.

**Empty:** Section با پیام `محصول منتخب برای نمایش وجود ندارد.` و بدون فضای خالی بزرگ.
**Loading:** skeleton برابر تعداد مورد انتظار viewport.
**Error:** inline error + retry.

### 5.5 ServicesSection
**فایل:** `src/components/home/ServicesSection.tsx`

سه یا چهار service item. هر item شامل icon 32px، title و توضیح حداکثر 2 خط.

**Desktop:** 4 ستون.
**Tablet:** 2×2.
**Mobile:** تک‌ستونه با divider بین موارد.

این بخش informational است و در فاز فعلی action ندارد.

### 5.6 PrimaryCTASection
**فایل:** `src/components/home/PrimaryCTASection.tsx`

یک banner با title، description و CTA اصلی. Desktop دو ستونه؛ Mobile تک‌ستونه. حداقل padding عمودی 40px.

### 5.7 Footer
**فایل:** `src/components/home/Footer.tsx`

**Desktop:** چهار ستون: brand، navigation، services، contact/social.
**Tablet:** دو ستون.
**Mobile:** دو/تک‌ستونه و گروه‌های لینک قابل collapse.

Footer باید مسیرهای اصلی و اطلاعات تماس را قابل دسترس نگه دارد.

---

## 6. Visual Spec

### Color Tokens

| Token | Value | Usage |
|---|---|---|
| `color.primary.500` | `#11A089` | CTA اصلی، active، links |
| `color.primary.700` | `#0C7867` | hover/pressed |
| `color.primary.50` | `#EAF8F5` | subtle background |
| `color.text.900` | `#17211F` | heading |
| `color.text.700` | `#46514E` | body |
| `color.text.500` | `#6F7976` | secondary |
| `color.surface` | `#FFFFFF` | cards/background |
| `color.background` | `#F7F9F8` | page sections |
| `color.border` | `#E2E8E5` | borders/dividers |
| `color.error` | `#D64545` | error |

### Typography

Font family: `Vazirmatn` for Persian/Arabic, `Inter` for Latin fallback.

| Token | Size | Weight | Line-height |
|---|---:|---:|---:|
| `display` | 48px | 700 | 1.15 |
| `h1` | 40px | 700 | 1.2 |
| `h2` | 32px | 700 | 1.25 |
| `h3` | 24px | 700 | 1.3 |
| `body-lg` | 18px | 400 | 1.7 |
| `body` | 16px | 400 | 1.6 |
| `body-sm` | 14px | 400 | 1.6 |
| `button` | 15px | 600 | 1 |
| `caption` | 12px | 500 | 1.5 |

Mobile: `display=34px`, `h1=32px`, `h2=26px`, `h3=20px`.

### Spacing
Base unit: 4px.

- page container max-width: 1200px
- desktop horizontal padding: 32px
- tablet: 24px
- mobile: 20px
- section vertical spacing: 96px desktop / 72px tablet / 56px mobile
- card padding: 20px
- standard component gap: 16–24px
- button height: 48px; mobile minimum touch target 48×48px

### Radius & Shadow
- card radius: 16px
- button radius: 10px
- image radius: 16px
- modal/menu radius: 16px
- default shadow: `0 8px 24px rgba(23,33,31,0.08)`

---

## 7. Responsive Breakpoints

| Breakpoint | Width | Behavior |
|---|---:|---|
| mobile | `<768px` | single column, compact header, horizontal product rail |
| tablet | `768–1024px` | 2-column grids where defined |
| desktop | `>1024px` | full navigation and multi-column layouts |

---

## 8. Interaction Spec

| Element | Event | Behavior |
|---|---|---|
| Header menu | click/tap | open full-width mobile menu |
| Menu backdrop | click/tap | close menu |
| Primary CTA | click | navigate to products/category |
| Category card | click | navigate to category/product listing |
| Product card | click | navigate to Product Detail |
| Product rail | swipe/drag | horizontal scroll on mobile |
| Card | hover desktop | translateY(-2px), shadow increase; 160ms |
| Button | hover | primary token 700 |
| Button | focus | 2px accessible focus ring |
| Image | load | fade-in 160ms |

Respect `prefers-reduced-motion`: disable non-essential motion.

---

## 9. Accessibility

- H1 فقط یک بار در صفحه.
- تمام تصاویر informative دارای `alt` هستند؛ تصاویر decorative دارای alt خالی.
- تمام interactive elementها keyboard accessible هستند.
- focus state باید حداقل 2px و قابل مشاهده باشد.
- کنتراست متن اصلی با background حداقل WCAG AA باشد.
- touch target حداقل 44×44px؛ استاندارد پروژه 48×48px است.

---

## 10. Mock Data Contract

```ts
export type CTA = {
  label: string;
  href: string;
};

export type CategoryCardData = {
  id: string;
  title: string;
  slug: string;
  image: string;
  alt: string;
};

export type ProductCardData = {
  id: string;
  name: string;
  slug: string;
  image: string;
  imageAlt: string;
  shortDescription: string;
};
```

Mock data باید از UI جدا باشد؛ بعداً می‌توان adapter برای Vendure ساخت بدون تغییر Component API.

---

## 11. Assets

```text
sections/home/
├── README.md
├── design/
│   ├── tokens.json
│   └── figma-link.txt
└── assets/
    ├── images/
    └── icons/
```

در فاز فعلی asset واقعی اجباری نیست؛ placeholderها باید aspect ratio نهایی را حفظ کنند.

---

## 12. Edge Cases

- عنوان Hero بسیار طولانی → حداکثر width و wrap کنترل‌شده.
- نام Category طولانی → حداکثر 2 خط و سپس ellipsis.
- تصویر ناموجود → placeholder با نسبت ثابت.
- صفر محصول → Empty state بدون شکستن layout.
- تعداد محصول 1–2 → grid نباید کشیدگی غیرطبیعی داشته باشد.
- خطای یک Section → سایر Sectionها همچنان render شوند.
- mobile menu باز → scroll صفحه قفل شود.
- RTL → iconهای directional در صورت نیاز mirror شوند.

---

## 13. Definition of Done — Developer

- [ ] همه Sectionها با ساختار بالا ساخته شده‌اند.
- [ ] responsive behavior دقیقاً مطابق breakpoints است.
- [ ] تمام color/typography/spacing از token استفاده می‌کنند.
- [ ] هیچ رنگ hardcoded خارج از token وجود ندارد.
- [ ] loading/empty/error states پیاده‌سازی شده‌اند.
- [ ] keyboard/focus/accessibility رعایت شده است.
- [ ] Mock data از Componentها جداست.
- [ ] هیچ Vendure/Axelor integration در این مرحله اضافه نشده است.

## 14. Design QA Reference

مرجع اصلی پیاده‌سازی همین README و `sections/design/tokens.json` است. Figma در این فاز ساخته نشده؛ در صورت ایجاد، لینک آن در `design/figma-link.txt` ثبت خواهد شد.
