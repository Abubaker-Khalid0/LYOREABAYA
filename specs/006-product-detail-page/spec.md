# Feature Specification: Product Detail Page

**Feature Branch**: `6-product-detail-page`  
**Created**: February 25, 2026  
**Status**: Draft  
**Input**: User description: "Product Detail Page - Complete individual product page with image gallery, size/color selection, WhatsApp ordering, and related products"

## Clarifications

### Session 2026-02-25

- Q: WhatsApp FAB visibility scope - should it be visible on product pages only or all pages site-wide? → A: All pages site-wide (Option B)
- Q: How should validation errors be displayed when a customer tries to order without selecting required size/color? → A: Inline error message below the selection area (Option A). Size/color are product-level optional attributes - validation only applies when that specific product has those options available.
- Q: When there are no other products in the same category, what should the Related Products section do? → A: Show 3 products from other categories (Option B). Prioritization: (1) products with matching collection/style tag (e.g., Ramadan, Classic, Luxe), (2) featured products, (3) newest items.
- Q: What are the requirements for product images in terms of file format, dimensions, and file size? → A: WebP format preferred, 1200x1600px minimum (3:4 aspect ratio), max 500KB per image (Option B)
- Q: When WhatsApp integration fails, how should the system respond? → A: Show fallback contact options in a modal/overlay (Option B). Display phone number, Instagram, and email. Optionally include a "Copy message" button so customers can paste into WhatsApp manually.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Product Details (Priority: P1)

A customer browsing the collections page clicks on a product card to view detailed information about a specific abaya, including high-quality images, full description, available sizes and colors, and pricing.

**Why this priority**: This is the core functionality of the product detail page. Without the ability to view product details, customers cannot make informed purchasing decisions. This is the foundation upon which all other features depend.

**Independent Test**: Navigate to `/en/products/elegant-black-abaya` or `/ar/products/elegant-black-abaya` and verify that the page displays the product name, price, description, category badge, and at least one product image. The page should render correctly in both English (LTR) and Arabic (RTL) layouts.

**Acceptance Scenarios**:

1. **Given** a customer is on the collections page, **When** they click on any product card, **Then** they are navigated to the product detail page with the correct URL `/[locale]/products/[slug]`
2. **Given** a customer lands on a product detail page, **When** the page loads, **Then** they see the product name in their selected language (AR/EN)
3. **Given** a customer views a product, **When** the page renders, **Then** they see the price displayed in champagne gold color (#C9A96E) with the currency symbol (د.إ)
4. **Given** a customer views a product, **When** the page loads, **Then** they see the category badge (e.g., "Winter Collection" / "مجموعة الشتاء") in maroon background
5. **Given** a customer views a product, **When** the page renders, **Then** they see the full product description in their selected language
6. **Given** a customer enters an invalid product slug, **When** they navigate to `/products/non-existent-slug`, **Then** they are redirected to a 404 page

---

### User Story 2 - Browse Product Images (Priority: P1)

A customer wants to examine the abaya from multiple angles by viewing all available product images in a gallery format, with the ability to switch between images and zoom in for closer inspection.

**Why this priority**: High-quality imagery is critical for luxury fashion e-commerce. Customers need to see the product from multiple angles to assess quality, design details, and craftsmanship before making a purchase decision. This directly impacts conversion rates.

**Independent Test**: Navigate to any product detail page and verify that: (1) a main large image is displayed, (2) thumbnail images appear below the main image, (3) clicking a thumbnail changes the main image with a smooth fade animation, (4) clicking the main image opens a lightbox/modal for full-screen viewing.

**Acceptance Scenarios**:

1. **Given** a product has multiple images, **When** the page loads, **Then** the first image is displayed as the main image with thumbnails below
2. **Given** a customer views the image gallery, **When** they click on any thumbnail, **Then** the main image changes to the selected image with a smooth fade transition
3. **Given** a customer views the main image, **When** they click on it, **Then** a lightbox modal opens displaying the image in full-screen mode
4. **Given** a customer has the lightbox open, **When** they click outside the image or press ESC, **Then** the lightbox closes and returns to the product page
5. **Given** a product has only one image, **When** the page loads, **Then** only the main image is displayed without thumbnails
6. **Given** a customer is viewing images, **When** they hover over the main image, **Then** a subtle zoom effect (scale 1.05) is applied

---

### User Story 3 - Select Size and Color (Priority: P1)

A customer wants to choose their preferred size and color for the abaya before placing an order, with clear visual feedback on their selections and indication of out-of-stock options.

**Why this priority**: Size and color selection are mandatory for completing an order. Without this functionality, customers cannot specify their preferences, making the WhatsApp order message incomplete and requiring additional back-and-forth communication.

**Independent Test**: On any product detail page, verify that: (1) all available sizes are displayed as selectable options, (2) clicking a size highlights it as selected, (3) all available colors are displayed as color circles, (4) clicking a color shows a border around it, (5) out-of-stock sizes are grayed out and non-selectable.

**Acceptance Scenarios**:

1. **Given** a customer views a product, **When** the page loads, **Then** they see all available sizes (XS, S, M, L, XL, XXL) displayed as radio buttons or selectable tiles
2. **Given** a customer views size options, **When** they click on an available size, **Then** that size is highlighted/selected with visual feedback (e.g., maroon background)
3. **Given** a customer views a product, **When** the page loads, **Then** they see all available colors displayed as circular color swatches with the actual color hex value
4. **Given** a customer views color options, **When** they click on a color, **Then** that color is selected with a visible border around the swatch
5. **Given** a size is out of stock, **When** the page renders, **Then** that size option is grayed out with a strikethrough and is not selectable
6. **Given** a customer has not selected a size, **When** they attempt to order via WhatsApp, **Then** they are prompted to select a size first
7. **Given** a customer has not selected a color (and multiple colors are available), **When** they attempt to order, **Then** they are prompted to select a color first

---

### User Story 4 - Order via WhatsApp (Priority: P1)

A customer who has selected their preferred size and color wants to place an order by clicking a WhatsApp button that opens WhatsApp with a pre-filled message containing all product details, size, and color information.

**Why this priority**: This is the primary conversion mechanism for the entire website. Without WhatsApp ordering, there is no way for customers to complete a purchase. This is the core business functionality.

**Independent Test**: On a product detail page, select a size and color, then click the "Order Now" WhatsApp button. Verify that WhatsApp opens (on mobile) or WhatsApp Web opens (on desktop) with a pre-filled message in the correct language containing: product name, price, selected size, and selected color.

**Acceptance Scenarios**:

1. **Given** a customer has selected a size and color, **When** they click the "اطلبي الآن" / "Order Now" button, **Then** WhatsApp opens with a pre-filled message in the correct language
2. **Given** a customer is viewing the Arabic site, **When** they click the order button, **Then** the WhatsApp message is formatted as: "مرحباً، أريد طلب عباية: 🏷️ الاسم: [product name] 💰 السعر: [price] د.إ 📏 المقاس: [size] 🎨 اللون: [color]"
3. **Given** a customer is viewing the English site, **When** they click the order button, **Then** the WhatsApp message is formatted in English with the same structure
4. **Given** a customer has not selected a size, **When** they click the order button, **Then** they see an error message prompting them to select a size
5. **Given** a customer has not selected a color (when multiple colors available), **When** they click the order button, **Then** they see an error message prompting them to select a color
6. **Given** a customer clicks the order button, **When** WhatsApp opens, **Then** the message is sent to the correct business number (971502507859)
7. **Given** a customer wants to inquire without ordering, **When** they click the "استفسري عبر واتساب" / "Inquire via WhatsApp" button, **Then** WhatsApp opens with a simpler pre-filled message containing only the product name

---

### User Story 5 - Quick WhatsApp Inquiry (Priority: P2)

A customer browsing a product page wants to quickly ask a question about the product via WhatsApp without going through the full order process, using a floating action button (FAB) that is always visible.

**Why this priority**: This provides a low-friction way for customers to engage with the business for questions about sizing, availability, customization, or shipping. It reduces barriers to communication and can help convert hesitant customers.

**Independent Test**: Navigate to any product detail page and verify that: (1) a floating WhatsApp button appears in the bottom-right corner (bottom-left in RTL), (2) the button has a pulse animation, (3) clicking it opens WhatsApp with the product name pre-filled.

**Acceptance Scenarios**:

1. **Given** a customer is on a product detail page, **When** the page loads, **Then** they see a floating WhatsApp button fixed to the bottom-right corner (bottom-left in RTL)
2. **Given** the WhatsApp FAB is visible, **When** the page renders, **Then** the button displays a WhatsApp green icon with the text "استفسري الآن" / "Inquire Now"
3. **Given** the WhatsApp FAB is visible, **When** the customer observes it, **Then** it has a subtle pulse animation to draw attention
4. **Given** a customer clicks the WhatsApp FAB on a product page, **When** WhatsApp opens, **Then** the message is pre-filled with: "مرحباً، لدي استفسار عن: [product name]" / "Hello, I have a question about: [product name]"
5. **Given** a customer is on mobile, **When** they view the product page, **Then** the FAB does not overlap with other interactive elements

---

### User Story 6 - Discover Related Products (Priority: P2)

A customer viewing a product wants to see other similar abayas from the same category to compare options and explore more designs without returning to the collections page.

**Why this priority**: This increases engagement and time on site, encourages browsing, and can lead to additional sales. It provides a seamless discovery experience and reduces friction in the shopping journey.

**Independent Test**: Navigate to any product detail page and scroll to the bottom. Verify that a "Related Products" section appears with the heading "قد يعجبك أيضاً" / "You May Also Like", displaying 3 products from the same category, each using the ProductCard component with working links.

**Acceptance Scenarios**:

1. **Given** a customer views a product, **When** they scroll to the bottom of the page, **Then** they see a "قد يعجبك أيضاً" / "You May Also Like" section
2. **Given** the related products section is visible, **When** it renders, **Then** it displays 3 products from the same category as the current product
3. **Given** there are fewer than 3 products in the same category, **When** the section renders, **Then** it displays all available products from that category
4. **Given** there are no other products in the same category, **When** the section renders, **Then** it displays 3 products from other categories, prioritizing: (1) products with matching collection/style tags, (2) featured products, (3) newest items
5. **Given** a customer views related products, **When** they click on any related product card, **Then** they are navigated to that product's detail page
6. **Given** a customer views related products, **When** they click the WhatsApp button on a related product card, **Then** WhatsApp opens with that product's information

---

### Edge Cases

- What happens when a product slug does not exist in the products.ts data? → Redirect to 404 page
- What happens when a product has no images? → Display a placeholder image with the brand logo
- What happens when a product image fails to load or is corrupted? → Display placeholder image and log error
- What happens when a product image doesn't meet the recommended format/size (WebP, 1200x1600px, max 500KB)? → Display the image anyway but log a warning for content management
- What happens when a product has only one size available? → Display that size as pre-selected and non-changeable
- What happens when a product has only one color available? → Display that color as pre-selected and non-changeable
- What happens when all sizes are out of stock? → Display "Out of Stock" message and disable the order button, but keep the inquiry button active
- What happens when a customer tries to order without selecting size/color? → Show validation error message prompting selection
- What happens when the WhatsApp number is not configured? → Log error and show fallback contact message
- What happens when WhatsApp fails to open (not installed, network error, invalid number)? → Display a modal/overlay with fallback contact options (phone number, Instagram, email) and optionally a "Copy message" button for manual WhatsApp use
- What happens when a customer is on a slow connection and images are loading? → Show skeleton loaders for images
- What happens when a product has more than 10 images? → Display all thumbnails in a scrollable horizontal row
- What happens when the related products query returns the current product? → Filter out the current product from related products

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST generate a unique URL for each product using the format `/[locale]/products/[slug]` where slug is derived from the product's slug field
- **FR-002**: System MUST pre-render all product detail pages for optimal performance and instant page loads
- **FR-003**: System MUST redirect to a 404 page when a user navigates to a product slug that does not exist in the products.ts data
- **FR-004**: System MUST display the product name in the user's selected language (Arabic or English) from the product's name object
- **FR-005**: System MUST display the product price in champagne gold color (#C9A96E) with the appropriate currency symbol based on locale (د.إ for Arabic, AED for English)
- **FR-006**: System MUST display the product category badge with maroon background (#550000) and white text
- **FR-007**: System MUST display the full product description in the user's selected language from the product's description object
- **FR-008**: System MUST display all product images in an image gallery with the first image as the main display image
- **FR-008a**: System SHOULD use WebP format for product images with minimum dimensions of 1200x1600px (3:4 aspect ratio) and maximum file size of 500KB per image for optimal performance and quality
- **FR-009**: System MUST display thumbnail images below the main image for products with multiple images
- **FR-010**: System MUST change the main image when a user clicks on a thumbnail, with a smooth fade transition animation
- **FR-011**: System MUST open a lightbox modal when a user clicks on the main image, displaying the image in full-screen mode
- **FR-012**: System MUST close the lightbox when a user clicks outside the image, presses ESC, or clicks a close button
- **FR-013**: System MUST display all available sizes (from the product's sizes array) as selectable options with clear visual distinction
- **FR-014**: System MUST visually indicate the selected size with a distinct style (e.g., maroon background, border)
- **FR-015**: System MUST display all available colors (from the product's colors array) as circular color swatches showing the actual hex color
- **FR-016**: System MUST visually indicate the selected color with a border around the color swatch
- **FR-017**: System MUST gray out and disable size options that are marked as out of stock
- **FR-018**: System MUST display a strikethrough on out-of-stock size labels
- **FR-019**: System MUST validate that a size is selected before allowing a WhatsApp order, but only if the product has multiple size options available
- **FR-020**: System MUST validate that a color is selected before allowing a WhatsApp order, but only if the product has multiple color options available
- **FR-020a**: System MUST display an inline error message below the size selection area when validation fails (e.g., "Please select a size" in red text)
- **FR-020b**: System MUST display an inline error message below the color selection area when validation fails (e.g., "Please select a color" in red text)
- **FR-021**: System MUST display a primary "Order Now" button (full-width, maroon background) that opens WhatsApp with a pre-filled order message
- **FR-022**: System MUST display a secondary "Inquire via WhatsApp" button (outlined style) that opens WhatsApp with a pre-filled inquiry message
- **FR-023**: System MUST format the WhatsApp order message in the user's selected language with the structure: greeting + product name + price + size + color
- **FR-024**: System MUST format the WhatsApp inquiry message in the user's selected language with the structure: greeting + product name
- **FR-025**: System MUST send WhatsApp messages to the business number 971502507859
- **FR-025a**: System MUST handle WhatsApp integration failures gracefully by displaying a modal/overlay with fallback contact options (phone number, Instagram, email)
- **FR-025b**: System SHOULD provide a "Copy message" button in the fallback modal to allow customers to manually paste the pre-filled message into WhatsApp
- **FR-025c**: System MUST log all WhatsApp integration failures for monitoring and debugging purposes
- **FR-026**: System MUST display a floating action button (FAB) fixed to the bottom-right corner (bottom-left in RTL) on all pages, with the product name pre-filled in the WhatsApp message when on a product detail page
- **FR-027**: System MUST style the WhatsApp FAB with WhatsApp green color and include a WhatsApp icon
- **FR-028**: System MUST animate the WhatsApp FAB with a subtle pulse effect to draw attention
- **FR-030**: System MUST display a "Related Products" section at the bottom of the product detail page
- **FR-031**: System MUST show 3 products from the same category as the current product in the related products section; if fewer than 3 exist in the same category, fallback to products with matching collection/style tags, then featured products, then newest items
- **FR-031a**: System MUST support optional collection/style tags on products (e.g., "Ramadan", "Classic", "Luxe") for improved related product matching
- **FR-032**: System MUST filter out the current product from the related products list
- **FR-033**: System MUST use the existing ProductCard component to display related products
- **FR-034**: System MUST display the section heading "قد يعجبك أيضاً" in Arabic or "You May Also Like" in English
- **FR-035**: System MUST handle RTL layout correctly for Arabic, including: text alignment, image gallery layout, button positioning, and FAB positioning
- **FR-036**: System MUST handle LTR layout correctly for English
- **FR-037**: System MUST display appropriate SEO metadata for each product page including: title, description, og:image, og:title, og:description
- **FR-038**: System MUST use the product's first image as the og:image for social sharing
- **FR-039**: System MUST display skeleton loaders while images are loading
- **FR-040**: System MUST display a placeholder image if a product has no images defined

### Key Entities

- **Product**: Represents an abaya product with attributes including: id, slug, name (bilingual), description (bilingual), price, currency (bilingual), category (bilingual), sizes array, colors array (with name and hex), images array, featured boolean, collection/style tags (optional, e.g., "Ramadan", "Classic", "Luxe"), and whatsappMessage (bilingual)
- **Size**: Represents a size option with attributes: label (e.g., "S", "M", "L"), availability status (in stock / out of stock)
- **Color**: Represents a color option with attributes: name (e.g., "Black", "Navy"), hex value (e.g., "#000000")
- **WhatsApp Message**: Represents a pre-filled message with attributes: recipient number, message text (formatted with product details), language

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Customers can view complete product details (name, price, description, images) within 2 seconds of page load on a standard connection
- **SC-002**: Customers can successfully place a WhatsApp order with selected size and color in under 30 seconds from landing on the product page
- **SC-003**: 95% of customers successfully select a size and color without encountering validation errors
- **SC-004**: The image gallery allows customers to view all product images with smooth transitions (fade animation completes in under 300ms)
- **SC-005**: The lightbox opens and displays full-screen images within 200ms of clicking the main image
- **SC-006**: WhatsApp messages are correctly formatted with all product details (name, price, size, color) in the appropriate language 100% of the time
- **SC-007**: The WhatsApp FAB is visible and functional on all pages, with product-specific pre-filled messages when on a product detail page
- **SC-008**: Related products section displays 3 relevant products from the same category for 90% of products (excluding products that are the only item in their category)
- **SC-009**: The product detail page renders correctly in both RTL (Arabic) and LTR (English) layouts with no visual misalignments
- **SC-010**: All product detail pages load instantly with no perceptible delay on standard connections
- **SC-011**: Customers can navigate from collections page to product detail page and back without losing their filter selection or scroll position
- **SC-012**: The page achieves a Lighthouse Performance score of 90+ and Accessibility score of 95+
