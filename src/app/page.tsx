import HomePage from '@/components/home/HomePage';
import {
  mockNavItems,
  mockCategories,
  mockFeaturedProducts,
  mockHeroPrimaryAction,
  mockHeroSecondaryAction,
  mockCTAAction,
  mockServices,
  mockFooterNavItems,
  mockFooterServices,
  mockContactInfo,
} from '@/data/mock-home';

export default function Home() {
  return (
    <HomePage
      logo="/images/logo-placeholder.png"
      navItems={mockNavItems}
      headerCtaLabel="مشاهده محصولات"
      heroEyebrow="چاپ حرفه‌ای و باکیفیت"
      heroTitle="سفارش چاپ آنلاین، سریع و آسان"
      heroDescription="انواع خدمات چاپ شامل کارت ویزیت، بروشور، بنر و سایر محصولات تبلیغاتی را با بهترین کیفیت و قیمت سفارش دهید."
      heroPrimaryAction={mockHeroPrimaryAction}
      heroSecondaryAction={mockHeroSecondaryAction}
      heroImage="/images/hero-placeholder.jpg"
      categoryTitle="دسته‌بندی محصولات"
      categories={mockCategories}
      categoryViewAllHref="/categories"
      featuredTitle="محصولات منتخب"
      featuredProducts={mockFeaturedProducts}
      featuredViewAllHref="/products"
      services={mockServices}
      ctaTitle="آماده سفارش هستید؟"
      ctaDescription="همین حالا محصولات مورد نظر خود را انتخاب و سفارش دهید."
      ctaAction={mockCTAAction}
      brandName="Web Print"
      footerNavigation={mockFooterNavItems}
      footerServices={mockFooterServices}
      contactInfo={mockContactInfo}
      socialLinks={[
        { platform: 'Instagram', href: 'https://instagram.com' },
        { platform: 'Telegram', href: 'https://telegram.org' },
        { platform: 'LinkedIn', href: 'https://linkedin.com' },
      ]}
    />
  );
}
