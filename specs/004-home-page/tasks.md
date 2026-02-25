# Implementation Plan: Home Page Redesign Enhancement

## Overview

This implementation plan transforms the LYORE ABAYA home page into a luxury e-commerce experience with sophisticated visual hierarchy, professional animations, and enhanced product presentation. The implementation uses Next.js 15 with TypeScript, Tailwind CSS v4, and Framer Motion v12, maintaining full bilingual support (Arabic/English) with RTL/LTR layout mirroring.

The plan follows an incremental approach: establish the design system foundation, enhance existing components, create new feature sections, implement professional effects, ensure accessibility compliance, and optimize performance.

## Tasks

- [x] 1. Establish Design System Foundation
  - Create Tailwind configuration with professional color scales, gradients, shadows, and animations
  - Set up custom CSS utilities for luxury effects (text shadows, GPU acceleration, gradient borders)
  - Create Framer Motion variants library with entrance, hover, and continuous animations
  - Configure animation system with reduced motion support
  - _Requirements: 1.2, 9.2, 12.1, 12.7_

- [ ]* 1.1 Write property test for text contrast ratio compliance
  - **Property 1: Text Contrast Ratio Compliance**
  - **Validates: Requirements 1.2, 9.2**

- [x] 2. Create Core Utility Hooks
  - Implement useReducedMotion hook for motion preference detection
  - Implement useIntersectionObserver hook for scroll-triggered animations
  - Implement useStaggerAnimation hook for sequential element reveals
  - Create animation utility functions (getVariantWithReducedMotion, getVariantForMobile)
  - _Requirements: 9.7, 12.2, 12.9_

- [x] 3. Enhance HeroSlider Component
  - Increase overlay opacity to 0.5-0.6 for better contrast
  - Update heading typography to 48px+ desktop, 32px+ mobile
  - Enhance CTA button with professional hover effects (scale, glow, shimmer)
  - Ensure WCAG AA contrast ratio (4.5:1 minimum) for all text
  - Add reduced motion support to disable auto-play
  - Implement RTL/LTR text alignment
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.7, 1.8, 1.9_

- [ ]* 3.1 Write property test for responsive typography minimums
  - **Property 2: Responsive Typography Minimums**
  - **Validates: Requirements 1.3, 3.6, 3.7, 4.5, 4.6, 5.5, 5.6, 6.4**

- [ ]* 3.2 Write property test for touch target size compliance
  - **Property 3: Touch Target Size Compliance**
  - **Validates: Requirements 1.6, 3.8, 7.7**

- [x] 4. Create WhyChooseSection Component (New)
  - Create component structure with section heading and 4-column grid layout
  - Implement FeatureCard sub-component with circular icon container (80px diameter)
  - Add Champagne Gold (#C9A96E) icons on Warm Off-White (#FAF7F4) background
  - Implement staggered entrance animation (100ms delay between cards)
  - Add hover effects (translateY -4px, border glow, icon rotation)
  - Configure responsive grid (2 columns mobile, 4 columns desktop)
  - Integrate with next-intl for translations
  - Add reduced motion support
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 2.10, 2.11, 2.12, 2.13_

- [ ]* 4.1 Write property test for icon container minimum size
  - **Property 4: Icon Container Minimum Size**
  - **Validates: Requirements 2.7**

- [ ]* 4.2 Write property test for brand color consistency
  - **Property 5: Brand Color Consistency**
  - **Validates: Requirements 2.8, 4.7**

- [ ]* 4.3 Write property test for brand font application
  - **Property 6: Brand Font Application**
  - **Validates: Requirements 2.9**

- [x] 5. Enhance ProductCard Component
  - Add rounded corners (12px border-radius minimum)
  - Implement multi-layer shadow system (rest and hover states)
  - Add sophisticated hover effects (translateY -8px, scale 1.02, image zoom 1.08)
  - Create diagonal "New" badge with gold gradient
  - Implement hover overlay with gradient and Quick View button
  - Ensure 3:4 aspect ratio for product images
  - Style price with gold gradient text effect
  - Ensure 44px × 44px minimum tap target for WhatsApp button
  - Add 12px minimum padding
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 3.12_

- [ ]* 5.1 Write property test for product card border radius
  - **Property 7: Product Card Border Radius**
  - **Validates: Requirements 3.1**

- [ ]* 5.2 Write property test for product image aspect ratio
  - **Property 8: Product Image Aspect Ratio**
  - **Validates: Requirements 3.2**

- [ ]* 5.3 Write property test for product card padding
  - **Property 9: Product Card Padding**
  - **Validates: Requirements 3.12**

- [ ] 6. Enhance FeaturedProducts Section
  - Implement responsive grid (2 columns mobile, 3 tablet, 4 desktop)
  - Add horizontal scrolling with snap points for mobile
  - Create "View All" button with RTL/LTR positioning
  - Implement staggered product card animations
  - Integrate with ProductCard enhancements
  - Add navigation to /collections page
  - _Requirements: 3.9, 3.10, 3.11, 7.3, 7.4, 7.5_

- [ ] 7. Create FeaturesHighlight Component (New)
  - Create component structure with section heading
  - Implement FeatureItem sub-component with icon, title, and description
  - Configure responsive layout (vertical stack mobile, horizontal desktop)
  - Set icon size to 32px × 32px minimum with Champagne Gold color
  - Implement staggered fade-in animation on viewport entry
  - Add RTL/LTR icon positioning (left for LTR, right for RTL)
  - Integrate with next-intl for translations
  - Add reduced motion support
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 4.10, 4.11_

- [ ]* 7.1 Write property test for feature item icon size
  - **Property 10: Feature Item Icon Size**
  - **Validates: Requirements 4.4**

- [x] 8. Enhance AboutSection Component
  - Add decorative accent line (60px × 4px in Champagne Gold)
  - Implement decorative corner elements (top-left and bottom-right)
  - Update typography hierarchy (36px desktop, 28px mobile for heading)
  - Set body text to 16px with 1.8 line-height
  - Add rounded corners (12px minimum) to image
  - Implement fade-in animation (opacity 0 to 1 over 600ms)
  - Create "Learn More" button linking to /about
  - Configure split layout (50/50 desktop, stacked mobile)
  - Ensure proper RTL/LTR text/image positioning
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 5.9, 5.10, 5.11, 5.12_

- [x] 9. Enhance CollectionsBanner Component
  - Increase overlay opacity to 0.5-0.7
  - Implement parallax effect (background moves at 0.5x scroll speed)
  - Add shimmer animation to overlay
  - Enhance CTA button with scale effect (1.05) and glow
  - Set minimum heights (400px desktop, 300px mobile)
  - Update heading typography (42px desktop, 32px mobile)
  - Ensure CTA button minimum dimensions (160px × 48px)
  - Add navigation to /collections page
  - Center-align all content
  - Disable parallax when prefers-reduced-motion is enabled
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8, 6.9, 6.10_

- [ ]* 9.1 Write property test for collections banner height
  - **Property 11: Collections Banner Height**
  - **Validates: Requirements 6.3**

- [ ] 10. Checkpoint - Ensure all component enhancements are complete
  - Verify all sections render correctly
  - Test animations and hover effects
  - Ensure all tests pass
  - Ask the user if questions arise

- [ ] 11. Implement Responsive Layout System
  - Ensure home page works on minimum 375px viewport width
  - Prevent horizontal scrolling on all viewport sizes
  - Configure responsive typography with proper scaling
  - Ensure 44px × 44px minimum touch targets on mobile
  - Implement lazy loading for below-fold images
  - Optimize above-the-fold content for 2.5s load on 3G
  - _Requirements: 7.1, 7.2, 7.6, 7.7, 7.8, 7.9_

- [ ]* 11.1 Write property test for horizontal scroll prevention
  - **Property 12: Horizontal Scroll Prevention**
  - **Validates: Requirements 7.2**

- [ ] 12. Implement Bilingual Support with RTL/LTR Mirroring
  - Ensure home page supports Arabic (ar) and English (en) locales
  - Apply RTL text direction for Arabic, LTR for English
  - Mirror all asymmetric layouts between RTL and LTR
  - Load all text content from translation files (no hardcoded strings)
  - Format currency correctly (د.إ after number for Arabic, AED before for English)
  - Maintain visual consistency and proper spacing in both layouts
  - Generate WhatsApp messages in current locale language
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7, 8.8, 8.9_

- [ ]* 12.1 Write property test for RTL layout mirroring
  - **Property 13: RTL Layout Mirroring**
  - **Validates: Requirements 8.4**

- [ ]* 12.2 Write property test for translation key usage
  - **Property 14: Translation Key Usage**
  - **Validates: Requirements 8.5**

- [ ]* 12.3 Write property test for WhatsApp message locale consistency
  - **Property 15: WhatsApp Message Locale Consistency**
  - **Validates: Requirements 8.9, 11.2, 11.3, 11.4**

- [ ] 13. Implement Accessibility Features
  - Ensure WCAG 2.1 Level AA compliance
  - Verify all text has 4.5:1 contrast ratio minimum
  - Provide keyboard navigation for all interactive elements
  - Display focus indicators on all focusable elements
  - Add ARIA labels for all icon-only buttons
  - Provide alt text for all images
  - Disable animations when prefers-reduced-motion is enabled
  - Disable Hero_Slider auto-play when prefers-reduced-motion is enabled
  - Ensure full keyboard navigation (Tab, Enter, Arrow keys)
  - Announce dynamic content changes to screen readers using ARIA live regions
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7, 9.8, 9.9, 9.10_

- [ ]* 13.1 Write property test for keyboard focusability
  - **Property 16: Keyboard Focusability**
  - **Validates: Requirements 9.3**

- [ ]* 13.2 Write property test for focus indicator visibility
  - **Property 17: Focus Indicator Visibility**
  - **Validates: Requirements 9.4**

- [ ]* 13.3 Write property test for icon button accessibility
  - **Property 18: Icon Button Accessibility**
  - **Validates: Requirements 9.5**

- [ ]* 13.4 Write property test for image alt text presence
  - **Property 19: Image Alt Text Presence**
  - **Validates: Requirements 9.6**

- [ ] 14. Checkpoint - Ensure accessibility and responsive features are complete
  - Run accessibility audit with axe-core
  - Test keyboard navigation flows
  - Verify reduced motion support
  - Test on multiple viewport sizes
  - Ensure all tests pass
  - Ask the user if questions arise

- [ ] 15. Implement Performance Optimizations
  - Achieve Lighthouse Performance score ≥ 90
  - Achieve Lighthouse Accessibility score ≥ 95
  - Display Hero_Section within 1.5 seconds of initial page load
  - Lazy load all images below the fold
  - Use next/image component for automatic image optimization
  - Preload critical assets (hero image, fonts) using Next.js preload hints
  - Implement proper caching headers for static assets
  - Minimize layout shift (Cumulative Layout Shift score < 0.1)
  - Load web fonts using font-display: swap
  - Compress and optimize all images to WebP format where supported
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7, 10.8, 10.9, 10.10_

- [ ]* 15.1 Write property test for image lazy loading
  - **Property 20: Image Lazy Loading**
  - **Validates: Requirements 7.9, 10.4**

- [ ]* 15.2 Write property test for next/image usage
  - **Property 21: Next Image Usage**
  - **Validates: Requirements 10.5, 10.10**

- [ ] 16. Enhance WhatsApp Integration
  - Generate pre-filled WhatsApp messages with product details
  - Include product name in current locale
  - Include product price with correct currency format
  - Include greeting in current locale
  - Open WhatsApp Web in new tab on desktop
  - Open WhatsApp mobile app on mobile devices
  - Display WhatsApp icon with recognizable green color (#25D366)
  - Add accessible text for screen readers
  - Display fallback message with phone number if WhatsApp fails to open
  - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 11.7, 11.8, 11.9_

- [ ] 17. Implement Animation and Interaction Polish
  - Maintain 60fps frame rate during all animations
  - Trigger entrance animations when 20% of section is visible
  - Configure Hero_Slider transitions (ease-in-out, 600ms duration)
  - Configure Product_Card hover effects (ease-out, 300ms duration)
  - Set staggered animation delay to 100ms between items
  - Use transform: translateY for parallax with GPU acceleration
  - Use transform and opacity for hover effects
  - Debounce scroll event listeners
  - Use Intersection Observer API for scroll-triggered animations
  - Clean up all event listeners and observers on component unmount
  - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6, 12.7, 12.8, 12.9, 12.10_

- [ ]* 17.1 Write property test for hover effect performance
  - **Property 22: Hover Effect Performance Properties**
  - **Validates: Requirements 12.7**

- [ ]* 17.2 Write property test for animation cleanup
  - **Property 23: Animation Cleanup**
  - **Validates: Requirements 12.10**

- [ ] 18. Create Translation Files
  - Add translation keys for WhyChooseSection (heading, 4 feature titles)
  - Add translation keys for FeaturesHighlight (heading, 4 feature titles and descriptions)
  - Update existing translation keys for enhanced components
  - Ensure all text content uses translation keys
  - Verify translations for both Arabic and English
  - _Requirements: 8.5_

- [ ] 19. Create Feature Data Files
  - Create whyChooseFeatures array with 4 feature cards (Quality, Craftsmanship, Materials, Delivery)
  - Create highlightFeatures array with 4 feature items (Shipping, Payment, Returns, Support)
  - Map icons from Lucide React to feature data
  - Link translation keys to feature data
  - _Requirements: 2.11, 4.9_

- [ ] 20. Integrate Components into Home Page
  - Update home page to render sections in correct order
  - Ensure proper spacing between sections
  - Pass product data to FeaturedProducts section
  - Configure locale routing with next-intl
  - Ensure server-side rendering for initial content
  - Set up client-side hydration for interactive components
  - _Requirements: All requirements_

- [ ] 21. Write Unit Tests for Components
  - Write unit tests for HeroSlider (rendering, RTL/LTR, reduced motion)
  - Write unit tests for WhyChooseSection (grid layout, animations, hover effects)
  - Write unit tests for ProductCard (rendering, hover effects, WhatsApp button)
  - Write unit tests for FeaturedProducts (grid layout, scrolling, navigation)
  - Write unit tests for FeaturesHighlight (layout, animations, RTL/LTR)
  - Write unit tests for AboutSection (split layout, decorative elements, navigation)
  - Write unit tests for CollectionsBanner (parallax, overlay, navigation)
  - Write integration tests for home page (section order, navigation flows)
  - Write accessibility tests (axe violations, keyboard navigation)
  - _Requirements: All requirements_

- [ ] 22. Final Checkpoint - Comprehensive Testing
  - Run all unit tests and ensure they pass
  - Run all property tests and ensure they pass
  - Run Lighthouse audit and verify scores (Performance ≥ 90, Accessibility ≥ 95)
  - Test on multiple browsers (Chrome, Firefox, Safari, Edge)
  - Test on multiple devices (mobile, tablet, desktop)
  - Test both Arabic and English locales
  - Verify all animations respect reduced motion preferences
  - Ensure all interactive elements are keyboard accessible
  - Ask the user if questions arise

- [ ] 23. Documentation and Cleanup
  - Document component props and usage
  - Document animation variants and their purposes
  - Document Tailwind custom utilities
  - Remove any unused code or dependencies
  - Ensure code follows project style guidelines
  - Update README if necessary

## Notes

- Tasks marked with `*` are optional property-based tests and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at key milestones
- Property tests validate universal correctness properties across all inputs
- Unit tests validate specific examples, edge cases, and integration points
- The implementation uses TypeScript with Next.js 15, Tailwind CSS v4, and Framer Motion v12
- All components support bilingual (Arabic/English) with full RTL/LTR layout mirroring
- All animations respect prefers-reduced-motion user preference
- Performance targets: LCP < 2.5s, CLS < 0.1, Lighthouse Performance ≥ 90, Accessibility ≥ 95
