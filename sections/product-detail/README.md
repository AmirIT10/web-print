# Product Detail Page

## وضعیت
Design phase — PRD approved by PM.

## هدف
نمایش کامل اطلاعات محصول و ایجاد مسیر واضح برای شروع سفارش، بدون وابستگی اجرایی به Vendure در این فاز.

## ساختار پیشنهادی
- `ProductDetailPage`
- `Breadcrumb`
- `ProductGallery`
- `ProductSummary`
- `ProductOptions`
- `ProductDescription`
- `ProductSpecifications`
- `OrderCTA`
- `RelatedProductsSection`

## قرارداد داده
در این فاز داده‌ها Mock/Static هستند. مدل داده باید قابلیت جایگزینی با Product و ProductVariantهای Vendure را داشته باشد.

## حالت‌ها
صفحه باید `default`, `loading`, `error` و در صورت نبود محصول `empty/not-found` را پوشش دهد.

## Responsive
- Mobile: کمتر از 768px
- Tablet: 768 تا 1024px
- Desktop: بیشتر از 1024px

## Gallery
تصویر اصلی، thumbnailها و وضعیت انتخاب تصویر باید مشخص و قابل استفاده با لمس و کلیک باشند.

## CTA
CTA اصلی باید همیشه قابل تشخیص باشد و در Mobile دسترسی به آن دشوار نشود.

## Design QA
پیاده‌سازی باید مطابق Design Spec نهایی Designer بررسی شود. مقادیر دقیق visual و interaction پس از تکمیل طراحی در README نهایی ثبت می‌شوند.
