'use client';

import React from 'react';
import { CategoryCardData, ProductCardData, CTA, NavItem } from '@/types';
import { Header } from './Header';
import { HeroSection } from './HeroSection';
import { CategorySection } from './CategorySection';
import { FeaturedProductsSection } from './FeaturedProductsSection';
import { ServicesSection } from './ServicesSection';
import { PrimaryCTASection } from './PrimaryCTASection';
import { Footer } from './Footer';

interface HomePageProps {
  // Header props
  logo: string;
  navItems: NavItem[];
  headerCtaLabel?: string;

  // Hero props
  heroEyebrow?: string;
  heroTitle: string;
  heroDescription: string;
  heroPrimaryAction: CTA;
  heroSecondaryAction?: CTA;
  heroImage: string;

  // Category props
  categoryTitle: string;
  categories: CategoryCardData[];
  categoryViewAllHref?: string;

  // Featured products props
  featuredTitle: string;
  featuredProducts: ProductCardData[];
  featuredViewAllHref?: string;

  // Services props
  services: Array<{
    icon: React.ReactNode;
    title: string;
    description: string;
  }>;

  // CTA Section props
  ctaTitle: string;
  ctaDescription: string;
  ctaAction: CTA;

  // Footer props
  brandName: string;
  footerNavigation: NavItem[];
  footerServices: string[];
  contactInfo: {
    phone?: string;
    email?: string;
    address?: string;
  };
  socialLinks?: { platform: string; href: string }[];
}

export const HomePage: React.FC<HomePageProps> = (props) => {
  return (
    <main dir="rtl" lang="fa">
      <Header
        logo={props.logo}
        navItems={props.navItems}
        ctaLabel={props.headerCtaLabel}
      />
      <HeroSection
        eyebrow={props.heroEyebrow}
        title={props.heroTitle}
        description={props.heroDescription}
        primaryAction={props.heroPrimaryAction}
        secondaryAction={props.heroSecondaryAction}
        image={props.heroImage}
      />
      <CategorySection
        title={props.categoryTitle}
        categories={props.categories}
        viewAllHref={props.categoryViewAllHref}
      />
      <FeaturedProductsSection
        title={props.featuredTitle}
        products={props.featuredProducts}
        viewAllHref={props.featuredViewAllHref}
      />
      <ServicesSection services={props.services} />
      <PrimaryCTASection
        title={props.ctaTitle}
        description={props.ctaDescription}
        cta={props.ctaAction}
      />
      <Footer
        brandName={props.brandName}
        navigation={props.footerNavigation}
        services={props.footerServices}
        contactInfo={props.contactInfo}
        socialLinks={props.socialLinks}
      />
    </main>
  );
};

export default HomePage;
