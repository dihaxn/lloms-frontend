import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  keywords = [], 
  image, 
  url, 
  type = 'website',
  author,
  publishedTime,
  modifiedTime,
  section,
  tags = [],
  noindex = false,
  nofollow = false,
  canonical,
  lang = 'en',
  children 
}) => {
  // Default values
  const defaultTitle = 'Little Lanka - Premium Food & Beverages';
  const defaultDescription = 'Discover the finest selection of premium food and beverages from Little Lanka. Quality ingredients, authentic flavors, and exceptional service.';
  const defaultKeywords = ['food', 'beverages', 'premium', 'quality', 'authentic', 'Little Lanka'];
  
  // Combine with defaults
  const finalTitle = title ? `${title} | ${defaultTitle}` : defaultTitle;
  const finalDescription = description || defaultDescription;
  const finalKeywords = [...new Set([...defaultKeywords, ...keywords])];
  
  // Meta robots
  const robots = [];
  if (noindex) robots.push('noindex');
  if (nofollow) robots.push('nofollow');
  if (robots.length === 0) robots.push('index, follow');
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={finalKeywords.join(', ')} />
      <meta name="robots" content={robots.join(', ')} />
      <meta name="author" content={author || 'Little Lanka'} />
      <meta name="language" content={lang} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:url" content={url || window.location.href} />
      <meta property="og:image" content={image || '/src/assets/websitenavbar/logo.png'} />
      <meta property="og:site_name" content="Little Lanka" />
      <meta property="og:locale" content={lang} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={image || '/src/assets/websitenavbar/logo.png'} />
      
      {/* Article specific meta tags */}
      {type === 'article' && (
        <>
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {section && <meta property="article:section" content={section} />}
          {tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Favicon and App Icons */}
      <link rel="icon" type="image/png" sizes="32x32" href="/src/assets/websitenavbar/logo.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/src/assets/websitenavbar/logo.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/src/assets/websitenavbar/logo.png" />
      
      {/* PWA Manifest */}
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#F4952C" />
      <meta name="msapplication-TileColor" content="#F4952C" />
      
      {/* Viewport and Mobile */}
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      
      {/* Additional SEO */}
      <meta name="application-name" content="Little Lanka" />
      <meta name="apple-mobile-web-app-title" content="Little Lanka" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Little Lanka",
          "url": "https://littlelanka.com",
          "logo": "https://littlelanka.com/src/assets/websitenavbar/logo.png",
          "description": finalDescription,
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "Sri Lanka"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "customer service"
          },
          "sameAs": [
            "https://facebook.com/littlelanka",
            "https://instagram.com/littlelanka"
          ]
        })}
      </script>
      
      {/* Additional children */}
      {children}
    </Helmet>
  );
};

export default SEO;
