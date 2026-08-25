// Mock data for Home Page - For demonstration only
// In production, this will be replaced with real API data from Vendure/Axelor

import { CategoryCardData, ProductCardData, CTA, NavItem } from '@/types';

export const mockNavItems: NavItem[] = [
  { label: 'خانه', href: '/' },
  { label: 'محصولات', href: '/products' },
  { label: 'دسته‌بندی‌ها', href: '/categories' },
  { label: 'درباره ما', href: '/about' },
  { label: 'تماس با ما', href: '/contact' },
];

export const mockCategories: CategoryCardData[] = [
  {
    id: 'cat-1',
    title: 'کارت ویزیت',
    slug: 'business-cards',
    image: '/images/category-business-cards.jpg',
    alt: 'کارت ویزیت',
  },
  {
    id: 'cat-2',
    title: 'بروشور و کاتالوگ',
    slug: 'brochures',
    image: '/images/category-brochures.jpg',
    alt: 'بروشور و کاتالوگ',
  },
  {
    id: 'cat-3',
    title: 'بنر و فلکس',
    slug: 'banners',
    image: '/images/category-banners.jpg',
    alt: 'بنر و فلکس',
  },
  {
    id: 'cat-4',
    title: 'سربرگ و پاکت',
    slug: 'letterheads',
    image: '/images/category-letterheads.jpg',
    alt: 'سربرگ و پاکت',
  },
];

export const mockFeaturedProducts: ProductCardData[] = [
  {
    id: 'prod-1',
    name: 'کارت ویزیت لمینت براق',
    slug: 'glossy-laminated-business-card',
    image: '/images/product-1.jpg',
    imageAlt: 'کارت ویزیت لمینت براق',
    shortDescription: 'کارت ویزیت با کیفیت بالا و لمینت براق',
  },
  {
    id: 'prod-2',
    name: 'بروشور سه لت',
    slug: 'tri-fold-brochure',
    image: '/images/product-2.jpg',
    imageAlt: 'بروشور سه لت',
    shortDescription: 'بروشور تبلیغاتی سه لت با چاپ رنگی',
  },
  {
    id: 'prod-3',
    name: 'بنر عرضی ۳ متر',
    slug: 'horizontal-banner-3m',
    image: '/images/product-3.jpg',
    imageAlt: 'بنر عرضی ۳ متر',
    shortDescription: 'بنر تبلیغاتی با ابعاد ۳ متر',
  },
  {
    id: 'prod-4',
    name: 'کاتالوگ A4',
    slug: 'a4-catalog',
    image: '/images/product-4.jpg',
    imageAlt: 'کاتالوگ A4',
    shortDescription: 'کاتالوگ محصولات با فرمت A4',
  },
];

export const mockHeroPrimaryAction: CTA = {
  label: 'مشاهده محصولات',
  href: '/products',
};

export const mockHeroSecondaryAction: CTA = {
  label: 'دسته‌بندی‌ها',
  href: '/categories',
};

export const mockCTAAction: CTA = {
  label: 'مشاهده محصولات',
  href: '/products',
};

export const mockServices = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#11A089" strokeWidth="2">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: 'چاپ سریع',
    description: 'تحویل سفارشات در کمترین زمان ممکن',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#11A089" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: 'کیفیت تضمینی',
    description: 'استفاده از بهترین مواد و تجهیزات چاپ',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#11A089" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
    title: 'پشتیبانی اختصاصی',
    description: 'پاسخگویی به سوالات و راهنمایی شما',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#11A089" strokeWidth="2">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
    title: 'قیمت رقابتی',
    description: 'بهترین قیمت با حفظ کیفیت',
  },
];

export const mockFooterNavItems: NavItem[] = [
  { label: 'صفحه اصلی', href: '/' },
  { label: 'محصولات', href: '/products' },
  { label: 'خدمات', href: '/services' },
  { label: 'وبلاگ', href: '/blog' },
];

export const mockFooterServices: string[] = [
  'چاپ افست',
  'چاپ دیجیتال',
  'طراحی گرافیک',
  'تبلیغات محیطی',
];

export const mockContactInfo = {
  phone: '۰۲۱-۱۲۳۴۵۶۷۸',
  email: 'info@webprint.example',
  address: 'تهران، خیابان انقلاب، پلاک ۱۲۳',
};

export const mockSocialLinks = [
  { platform: 'Instagram', href: 'https://instagram.com' },
  { platform: 'Telegram', href: 'https://telegram.org' },
  { platform: 'LinkedIn', href: 'https://linkedin.com' },
];
