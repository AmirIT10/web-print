import ProductDetailPage from '@/components/product-detail/ProductDetailPage';
import { mockNavItems, mockFooterServices, mockContactInfo } from '@/data/mock-home';

// Mock product data - in production this would come from API
const mockProduct = {
  id: 'prod-1',
  slug: 'glossy-laminated-business-card',
  name: 'کارت ویزیت لمینت براق',
  shortDescription: 'کارت ویزیت با کیفیت بالا و لمینت براق، مناسب برای معرفی حرفه‌ای کسب‌وکار شما',
  description: `این محصول یک کارت ویزیت با کیفیت عالی است که با لمینت براق پوشش داده شده است. 
  کارت ویزیت یکی از مهم‌ترین ابزارهای بازاریابی و معرفی کسب‌وکار شماست. 
  با استفاده از این محصول می‌توانید印象 اولیه خوبی در ذهن مشتریان خود ایجاد کنید.
  
  ویژگی‌های اصلی:
  - چاپ با کیفیت بالا
  - لمینت براق مقاوم
  - قابلیت طراحی سفارشی
  - تحویل سریع`,
  images: [
    { id: 'img-1', url: '/images/product-1-main.jpg', alt: 'کارت ویزیت لمینت براق - نمای اصلی' },
    { id: 'img-2', url: '/images/product-1-side.jpg', alt: 'کارت ویزیت لمینت براق - نمای جانبی' },
    { id: 'img-3', url: '/images/product-1-back.jpg', alt: 'کارت ویزیت لمینت براق - نمای پشت' },
  ],
  options: [
    {
      id: 'opt-size',
      label: 'اندازه',
      values: [
        { id: 'size-standard', label: 'استاندارد (۹×۵)' },
        { id: 'size-large', label: 'بزرگ (۱۰×۷)' },
      ],
    },
    {
      id: 'opt-paper',
      label: 'نوع کاغذ',
      values: [
        { id: 'paper-300g', label: 'مقوای ۳۰۰ گرم' },
        { id: 'paper-350g', label: 'مقوای ۳۵۰ گرم' },
      ],
    },
  ],
  specifications: [
    { id: 'spec-1', label: 'جنس', value: 'مقوای گلاسه' },
    { id: 'spec-2', label: 'گرماژ', value: '۳۰۰ گرم' },
    { id: 'spec-3', label: 'پوشش', value: 'لمینت براق' },
    { id: 'spec-4', label: 'زمان تحویل', value: '۲-۳ روز کاری' },
  ],
};

const mockRelatedProducts = [
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
  {
    id: 'prod-5',
    name: 'سربرگ A4',
    slug: 'a4-letterhead',
    image: '/images/product-5.jpg',
    imageAlt: 'سربرگ A4',
    shortDescription: 'سربرگ اداری با کیفیت بالا',
  },
];

interface PageProps {
  params: { slug: string };
}

export default function ProductDetail({ params }: PageProps) {
  // In production, fetch product data based on params.slug
  const product = mockProduct;
  
  return (
    <ProductDetailPage
      product={product}
      relatedProducts={mockRelatedProducts}
      loading={false}
      error={false}
      notFound={false}
      logo="/images/logo-placeholder.png"
      navItems={mockNavItems}
      brandName="Web Print"
      footerNavigation={mockNavItems}
      footerServices={mockFooterServices}
      contactInfo={mockContactInfo}
    />
  );
}
