// Common types for Home and Product Detail pages

export type CTA = {
  label: string;
  href: string;
};

export type NavItem = {
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

export type BreadcrumbItem = {
  label: string;
  href: string;
};

export type ProductStatus = 'available' | 'out-of-stock' | 'coming-soon';

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
