# Product Detail Page — Design Specification

## 1. وضعیت و Gate

**Status:** Design Deliverable v1.0 — آماده بررسی PM

این سند Design Spec اجرایی Product Detail است. داده‌ها در این مرحله Mock/Static هستند و هیچ اتصال اجرایی به Vendure، Axelor، Pricing Engine یا Checkout وجود ندارد.

---

## 2. هدف و UX Flow

کاربر باید بتواند محصول را شناسایی کند، تصاویر و اطلاعات آن را بررسی کند، گزینه‌های پایه را در صورت وجود انتخاب کند و با CTA اصلی وارد مرحله بعدی سفارش شود.

**Primary flow:** `Home → Category/Product → Product Detail → شروع سفارش`

**Primary CTA:** `شروع سفارش`

در این فاز CTA فقط یک navigation action است و منطق سفارش واقعی ندارد.

---

## 3. Information Architecture

ترتیب Desktop:

1. Header
2. Breadcrumb
3. Product Hero / Main Information
4. Product Description
5. Product Specifications
6. Related Products
7. Footer

ترتیب داخل Product Hero:

`Gallery → Summary → Options → Primary CTA`

Mobile:

`Breadcrumb → Gallery → Summary → Options → CTA → Description → Specifications → Related Products`

---

## 4. Wireframe

```text
┌──────────────────────────────────────────────┐
│ Header                                       │
├──────────────────────────────────────────────┤
│ Home / Category / Product                    │
├───────────────────────┬──────────────────────┤
│                       │ Product name         │
│                       │ Short description    │
│     Main Image        │ Meta / availability  │
│                       │ Options              │
│ [thumb][thumb][thumb] │ [Option] [Option]    │
│                       │ [شروع سفارش]         │
├───────────────────────┴──────────────────────┤
│ Description                                  │
│ متن توضیحات محصول                            │
├──────────────────────────────────────────────┤
│ Specifications                               │
│ Label ........ Value                         │
├──────────────────────────────────────────────┤
│ محصولات مرتبط                                │
│ [Product] [Product] [Product] [Product]      │
├──────────────────────────────────────────────┤
│ Footer                                       │
└──────────────────────────────────────────────┘
```

---

## 5. Component Specification

### 5.1 Breadcrumb
**فایل:** `src/components/product-detail/Breadcrumb.tsx`

| Prop | Type | Required | توضیح |
|---|---|---:|---|
| items | BreadcrumbItem[] | ✅ | مسیر صفحه |

Desktop و Tablet کامل نمایش داده شود. Mobile اگر بیش از 3 item وجود داشت، فقط Home، `…` و item آخر نمایش داده شود.

آخرین item غیرقابل کلیک است.

### 5.2 ProductGallery
**فایل:** `src/components/product-detail/ProductGallery.tsx`

| Prop | Type | Required | توضیح |
|---|---|---:|---|
| images | ProductImage[] | ✅ | تصاویر محصول |
| productName | string | ✅ | alt پایه |

**Desktop:** gallery در ستون 56% عرض Hero؛ تصویر اصلی aspect ratio 1:1، thumbnailها زیر تصویر با gap 12px.

**Tablet:** ستون gallery برابر 52%.

**Mobile:** تصویر اصلی full width با aspect ratio 1:1؛ thumbnailها horizontal scroll.

رفتار:
- اولین تصویر به‌صورت پیش‌فرض active است.
- click/tap روی thumbnail تصویر اصلی را تغییر می‌دهد.
- keyboard: arrow keys تصویر قبلی/بعدی را انتخاب می‌کنند.
- اگر فقط یک تصویر وجود دارد، thumbnail rail و navigation controls حذف می‌شوند.
- اگر تصویر load نشود، placeholder 1:1 نمایش داده شود.
- click روی تصویر اصلی در Desktop می‌تواند lightbox را باز کند؛ در Mobile swipe برای تغییر تصویر کافی است.

**Loading:** main image skeleton + 4 thumbnail skeleton.
**Empty:** placeholder 1:1 با icon تصویر و متن `تصویری برای نمایش وجود ندارد.`

### 5.3 ProductSummary
**فایل:** `src/components/product-detail/ProductSummary.tsx`

| Prop | Type | Required | توضیح |
|---|---|---:|---|
| name | string | ✅ | نام محصول |
| shortDescription | string | ❌ | خلاصه |
| status | ProductStatus | ❌ | وضعیت نمایشی |

Hierarchy:
1. product name — H1
2. short description
3. optional status/meta
4. Options
5. Primary CTA

**Desktop:** summary در ستون 44% با sticky positioning در viewport پس از scroll.
**Tablet:** sticky غیرفعال.
**Mobile:** normal flow؛ هیچ sticky panel استفاده نشود.

### 5.4 ProductOptions
**فایل:** `src/components/product-detail/ProductOptions.tsx`

در این فاز فقط optionهای پایه قابل نمایش هستند؛ منطق پیچیده configurator خارج از scope است.

| Prop | Type | Required | توضیح |
|---|---|---:|---|
| options | ProductOption[] | ❌ | گزینه‌های قابل انتخاب |
| value | Record<string,string> | ❌ | انتخاب فعلی |
| onChange | function | ❌ | callback تغییر |

هر option شامل label، values و selected state است.

- Option label: 14px / 600
- Value control: حداقل ارتفاع 44px
- selected: border با `color.primary.500` و background `color.primary.50`
- disabled: opacity 0.5 و cursor ممنوع

اگر options خالی باشد، بخش Option اصلاً render نشود.

### 5.5 OrderCTA
**فایل:** `src/components/product-detail/OrderCTA.tsx`

| Prop | Type | Required | توضیح |
|---|---|---:|---|
| label | string | ✅ | متن CTA |
| disabled | boolean | ❌ | غیرفعال |
| href | string | ❌ | مسیر مرحله بعد |

**Desktop:** عرض کامل ستون Summary، height 48px.
**Mobile:** عرض کامل container، height 52px.

در صورت `disabled` شدن، دلیل کوتاه زیر CTA نمایش داده شود؛ صرفاً opacity کم نشود.

در این فاز کلیک CTA فقط navigation/callback است؛ payment/order mutation نباید اضافه شود.

### 5.6 ProductDescription
**فایل:** `src/components/product-detail/ProductDescription.tsx`

عنوان H2 + متن خوانا. max-width متن 760px برای خوانایی. پاراگراف‌ها gap برابر 16px.

Mobile: متن 16px و line-height 1.7.

### 5.7 ProductSpecifications
**فایل:** `src/components/product-detail/ProductSpecifications.tsx`

| Prop | Type | Required | توضیح |
|---|---|---:|---|
| specifications | Specification[] | ❌ | ویژگی‌ها |

Desktop: دو ستون label/value با row height حداقل 48px.
Mobile: یک ستون؛ label بالای value.

**Empty:** اگر specification وجود ندارد، کل Section مخفی شود.

### 5.8 RelatedProductsSection
**فایل:** `src/components/product-detail/RelatedProductsSection.tsx`

Desktop: 4 card، Tablet: 3، Mobile: horizontal scroll با snap و min-width 260px.

هر Card به Product Detail محصول مربوطه لینک می‌شود.

**Loading:** 4 skeleton card.
**Empty:** Section حذف شود.
**Error:** inline retry؛ failure این Section نباید Product Detail اصلی را خراب کند.

### 5.9 ProductDetailPage
**فایل:** `src/app/products/[slug]/page.tsx`

صفحه orchestration انجام می‌دهد و منطق visual را به Componentها واگذار می‌کند. در این فاز data source mock است.

---

## 6. Visual Spec

### Color Tokens

| Token | Value | Usage |
|---|---|---|
| `color.primary.500` | `#11A089` | CTA، active option، links |
| `color.primary.700` | `#0C7867` | hover/pressed |
| `color.primary.50` | `#EAF8F5` | selected option / subtle surface |
| `color.text.900` | `#17211F` | H1/H2 |
| `color.text.700` | `#46514E` | body |
| `color.text.500` | `#6F7976` | secondary |
| `color.surface` | `#FFFFFF` | cards / gallery |
| `color.background` | `#F7F9F8` | page background |
| `color.border` | `#E2E8E5` | divider |
| `color.error` | `#D64545` | error |

### Typography

Font family: `Vazirmatn`, fallback `Inter`, system sans-serif.

| Token | Size | Weight | Line-height |
|---|---:|---:|---:|
| `h1` | 40px | 700 | 1.2 |
| `h2` | 32px | 700 | 1.25 |
| `h3` | 24px | 700 | 1.3 |
| `body-lg` | 18px | 400 | 1.7 |
| `body` | 16px | 400 | 1.6 |
| `body-sm` | 14px | 400 | 1.6 |
| `button` | 15px | 600 | 1 |
| `caption` | 12px | 500 | 1.5 |

Mobile: H1 32px، H2 26px، H3 20px.

### Spacing

- container max-width: 1200px
- desktop padding: 32px
- tablet padding: 24px
- mobile padding: 20px
- Hero column gap: 48px desktop / 32px tablet
- Section vertical spacing: 96px desktop / 72px tablet / 56px mobile
- option gap: 12px
- card gap: 20px desktop / 16px mobile
- CTA height: 48px desktop / 52px mobile

### Radius
- image/card: 16px
- controls/buttons: 10px
- modal/lightbox: 16px

---

## 7. Responsive Behavior

| Breakpoint | Width | Behavior |
|---|---:|---|
| mobile | `<768px` | single column; gallery first; non-sticky summary |
| tablet | `768–1024px` | two-column hero; sticky disabled |
| desktop | `>1024px` | 56/44 hero; summary sticky |

---

## 8. Interaction Spec

| Element | Event | Behavior |
|---|---|---|
| Breadcrumb | click | navigate to parent path |
| Thumbnail | click/tap | replace main image |
| Main image | click desktop | open lightbox |
| Gallery | swipe mobile | next/previous image |
| Option | click/tap | update selected state |
| Disabled option | click | no selection; optional reason visible |
| Primary CTA | click | callback/navigation only |
| Related product | click | navigate to its Product Detail |
| CTA/button | hover | primary 700 |
| interactive | focus | 2px visible focus ring |

Transitions: 160ms ease-out for color, shadow and opacity. No essential information may depend on animation.

Respect `prefers-reduced-motion`.

---

## 9. Loading / Error / Empty / Not-found

### Full-page loading
Header remains visible. Product Hero uses skeletons for gallery and summary. Description/specification/related sections use skeleton blocks.

### Product error
Show a centered error state:
- title: `بارگذاری محصول با خطا مواجه شد`
- description: short recovery message
- action: `تلاش مجدد`

### Product not-found
Show 404-style product state:
- title: `محصول پیدا نشد`
- description: `ممکن است محصول حذف شده یا آدرس آن تغییر کرده باشد.`
- CTA: `بازگشت به محصولات`

### Section error
Failure in Related Products or optional information must not replace the main product content. Show inline retry or hide optional section.

---

## 10. Mock Data Contract

```ts
export type ProductImage = {
  id: string;
  url: string;
  alt: string;
};

export type ProductOption = {
  id: string;
  label: string;
  values: { id: string; label: string; disabled?: boolean }[];
};

export type Specification = {
  id: string;
  label: string;
  value: string;
};

export type ProductDetailMock = {
  id: string;
  slug: string;
  name: string;
  shortDescription?: string;
  description: string;
  images: ProductImage[];
  options?: ProductOption[];
  specifications?: Specification[];
  relatedProductIds?: string[];
};
```

Mock adapter باید از UI جدا باشد. در مرحله Commerce می‌توان adapter را به Vendure Product/ProductVariant متصل کرد بدون تغییر API کامپوننت‌ها.

---

## 11. Accessibility

- یک H1 برای نام محصول.
- gallery با keyboard قابل کنترل باشد.
- thumbnail active با `aria-current` مشخص شود.
- option انتخاب‌شده با state قابل تشخیص برای screen reader باشد.
- تمام controls حداقل 44×44px؛ استاندارد پروژه 48px.
- focus ring حداقل 2px.
- تصاویر دارای alt مناسب باشند.
- خطاها با متن قابل فهم و action recovery ارائه شوند.

---

## 12. Edge Cases

- محصول بدون تصویر → placeholder 1:1.
- محصول با یک تصویر → thumbnail controls حذف.
- محصول با تصاویر زیاد → thumbnail rail scrollable؛ layout رشد نکند.
- نام محصول بسیار طولانی → wrap کنترل‌شده بدون overflow.
- توضیحات بسیار طولانی → کامل نمایش داده شود؛ truncation اجباری نیست.
- بدون options → بخش options حذف.
- option بدون value → option group حذف یا disabled نمایش داده شود.
- specification خالی → section حذف.
- related products خالی → section حذف.
- related products error → فقط همان section خطا بگیرد.
- محصول not-found → صفحه شکسته نمایش داده نشود.
- CTA disabled → دلیل وضعیت نمایش داده شود.
- RTL → directional icons در صورت نیاز mirror شوند.

---

## 13. Suggested Component Tree

```text
ProductDetailPage
├── Header
├── Breadcrumb
├── ProductHero
│   ├── ProductGallery
│   └── ProductSummary
│       ├── ProductOptions
│       └── OrderCTA
├── ProductDescription
├── ProductSpecifications
├── RelatedProductsSection
└── Footer
```

---

## 14. Definition of Done — Developer

- [ ] Component tree مطابق Spec است.
- [ ] Desktop / Tablet / Mobile پیاده‌سازی شده است.
- [ ] Gallery تمام interactionهای تعریف‌شده را دارد.
- [ ] Option selected/disabled state مشخص است.
- [ ] CTA اصلی در همه breakpointها قابل دسترسی است.
- [ ] loading/error/not-found/empty states پیاده شده‌اند.
- [ ] Typography/color/spacing از token استفاده می‌کنند.
- [ ] Mock data از UI جداست.
- [ ] هیچ Vendure/Axelor/Pricing/Checkout integration در این مرحله اضافه نشده است.
- [ ] accessibility requirements رعایت شده است.

## 15. Design QA Reference

مرجع اصلی پیاده‌سازی همین README و `sections/design/tokens.json` است. Figma در این فاز ساخته نشده؛ در صورت ایجاد، لینک آن در `design/figma-link.txt` ثبت خواهد شد.
