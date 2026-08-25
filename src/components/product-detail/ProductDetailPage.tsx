'use client';

import React from 'react';
import { tokens } from '@/types/tokens';
import { ProductDetailMock, BreadcrumbItem, ProductImage, ProductOption, Specification, ProductCardData } from '@/types';
import { Header } from '../home/Header';
import { Footer } from '../home/Footer';
import { Breadcrumb } from './Breadcrumb';
import { ProductGallery } from './ProductGallery';
import { ProductSummary } from './ProductSummary';
import { ProductOptions } from './ProductOptions';
import { OrderCTA } from './OrderCTA';
import { ProductDescription } from './ProductDescription';
import { ProductSpecifications } from './ProductSpecifications';
import { RelatedProductsSection } from './RelatedProductsSection';

interface ProductHeroProps {
  images: ProductImage[];
  name: string;
  shortDescription?: string;
  options?: ProductOption[];
  onOptionChange?: (optionId: string, valueId: string) => void;
  selectedOptions?: Record<string, string>;
  ctaLabel: string;
  ctaHref?: string;
  ctaDisabled?: boolean;
  ctaDisabledReason?: string;
}

const ProductHero: React.FC<ProductHeroProps> = ({
  images,
  name,
  shortDescription,
  options,
  onOptionChange,
  selectedOptions,
  ctaLabel,
  ctaHref,
  ctaDisabled,
  ctaDisabledReason,
}) => {
  return (
    <div
      style={{
        padding: `0 ${tokens.spacing.desktopPadding}`,
        display: 'grid',
        gridTemplateColumns: '56% 44%',
        gap: '48px',
        alignItems: 'start',
      }}
    >
      {/* Gallery Column */}
      <div>
        <ProductGallery images={images} productName={name} />
      </div>

      {/* Summary Column */}
      <div>
        <ProductSummary name={name} shortDescription={shortDescription}>
          <ProductOptions
            options={options}
            value={selectedOptions}
            onChange={onOptionChange}
          />
          <OrderCTA
            label={ctaLabel}
            href={ctaHref}
            disabled={ctaDisabled}
            disabledReason={ctaDisabledReason}
          />
        </ProductSummary>
      </div>

      <style jsx>{`
        @media (max-width: ${tokens.breakpoints.tablet}) {
          div[style*="grid-template-columns"] {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </div>
  );
};

interface ProductDetailPageProps {
  // Mock data - in real app this would come from API
  product: ProductDetailMock | null;
  relatedProducts: ProductCardData[];
  loading: boolean;
  error: boolean;
  notFound: boolean;

  // Header/Footer props
  logo: string;
  navItems: NavItem[];
  brandName: string;
  footerNavigation: NavItem[];
  footerServices: string[];
  contactInfo: {
    phone?: string;
    email?: string;
    address?: string;
  };
}

import { NavItem } from '@/types';

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  relatedProducts,
  loading,
  error,
  notFound,
  logo,
  navItems,
  brandName,
  footerNavigation,
  footerServices,
  contactInfo,
}) => {
  const [selectedOptions, setSelectedOptions] = React.useState<Record<string, string>>({});

  const handleOptionChange = (optionId: string, valueId: string) => {
    setSelectedOptions((prev) => ({ ...prev, [optionId]: valueId }));
  };

  // Loading state
  if (loading) {
    return (
      <main dir="rtl" lang="fa">
        <Header logo={logo} navItems={navItems} />
        <div
          style={{
            padding: `${tokens.spacing.sectionVertical.desktop} ${tokens.spacing.desktopPadding}`,
          }}
        >
          <div
            style={{
              maxWidth: tokens.spacing.pageMaxWidth,
              margin: '0 auto',
            }}
          >
            {/* Skeleton for breadcrumb */}
            <div
              style={{
                height: '20px',
                width: '200px',
                backgroundColor: tokens.colors.border,
                marginBottom: '24px',
                animation: 'pulse 1.5s infinite',
              }}
            />
            {/* Skeleton for hero */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '48px',
              }}
            >
              <div
                style={{
                  aspectRatio: '1/1',
                  backgroundColor: tokens.colors.border,
                  borderRadius: tokens.radius.image,
                  animation: 'pulse 1.5s infinite',
                }}
              />
              <div>
                <div
                  style={{
                    height: '40px',
                    width: '80%',
                    backgroundColor: tokens.colors.border,
                    marginBottom: '16px',
                    animation: 'pulse 1.5s infinite',
                  }}
                />
                <div
                  style={{
                    height: '20px',
                    width: '60%',
                    backgroundColor: tokens.colors.border,
                    marginBottom: '24px',
                    animation: 'pulse 1.5s infinite',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <Footer
          brandName={brandName}
          navigation={footerNavigation}
          services={footerServices}
          contactInfo={contactInfo}
        />
        <style jsx>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}</style>
      </main>
    );
  }

  // Error state
  if (error || notFound) {
    return (
      <main dir="rtl" lang="fa">
        <Header logo={logo} navItems={navItems} />
        <div
          style={{
            padding: `${tokens.spacing.sectionVertical.desktop} ${tokens.spacing.desktopPadding}`,
            minHeight: '50vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              textAlign: 'center',
              maxWidth: '400px',
            }}
          >
            <h1
              style={{
                fontFamily: tokens.typography.fontFamily,
                fontSize: tokens.typography.h2.desktop.fontSize,
                color: tokens.colors.text[900],
                marginBottom: '16px',
              }}
            >
              {notFound ? 'محصول پیدا نشد' : 'بارگذاری محصول با خطا مواجه شد'}
            </h1>
            <p
              style={{
                fontFamily: tokens.typography.fontFamily,
                fontSize: tokens.typography.body.fontSize,
                color: tokens.colors.text[700],
                marginBottom: '24px',
              }}
            >
              {notFound
                ? 'ممکن است محصول حذف شده یا آدرس آن تغییر کرده باشد.'
                : 'لطفاً دوباره تلاش کنید.'}
            </p>
            <a
              href="/products"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: tokens.spacing.buttonHeight,
                padding: '0 32px',
                borderRadius: tokens.radius.button,
                backgroundColor: tokens.colors.primary[500],
                color: tokens.colors.surface,
                fontFamily: tokens.typography.fontFamily,
                fontSize: tokens.typography.button.fontSize,
                fontWeight: tokens.typography.button.fontWeight,
                textDecoration: 'none',
              }}
            >
              بازگشت به محصولات
            </a>
          </div>
        </div>
        <Footer
          brandName={brandName}
          navigation={footerNavigation}
          services={footerServices}
          contactInfo={contactInfo}
        />
      </main>
    );
  }

  if (!product) {
    return null;
  }

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'خانه', href: '/' },
    { label: 'محصولات', href: '/products' },
    { label: product.name, href: '' },
  ];

  return (
    <main dir="rtl" lang="fa">
      <Header logo={logo} navItems={navItems} />
      
      <Breadcrumb items={breadcrumbItems} />

      <ProductHero
        images={product.images}
        name={product.name}
        shortDescription={product.shortDescription}
        options={product.options}
        onOptionChange={handleOptionChange}
        selectedOptions={selectedOptions}
        ctaLabel="شروع سفارش"
        ctaHref="/checkout"
      />

      <ProductDescription description={product.description} />

      <ProductSpecifications specifications={product.specifications} />

      {relatedProducts.length > 0 && (
        <RelatedProductsSection
          title="محصولات مرتبط"
          products={relatedProducts}
        />
      )}

      <Footer
        brandName={brandName}
        navigation={footerNavigation}
        services={footerServices}
        contactInfo={contactInfo}
      />
    </main>
  );
};

export default ProductDetailPage;
