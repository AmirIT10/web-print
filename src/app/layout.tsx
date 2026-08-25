import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Web Print - سفارش چاپ آنلاین',
  description: 'انواع خدمات چاپ شامل کارت ویزیت، بروشور، بنر و سایر محصولات تبلیغاتی را با بهترین کیفیت و قیمت سفارش دهید.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link
          href="https://cdn.jsdelivr.net/gh/rastikerdar/vazirmatn@v33.003/Vazirmatn-font-face.css"
          rel="stylesheet"
          type="text/css"
        />
      </head>
      <body
        style={{
          margin: 0,
          padding: 0,
          fontFamily: 'Vazirmatn, Inter, system-ui, sans-serif',
          backgroundColor: '#F7F9F8',
          color: '#46514E',
        }}
      >
        {children}
      </body>
    </html>
  );
}
