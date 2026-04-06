# Handcrafted Haven

## Overview
Handcrafted Haven is an innovative web application that aims to provide a platform for artisans and crafters to showcase and sell their unique handcrafted items. It serves as a virtual marketplace, connecting talented creators with potential customers who appreciate the beauty and quality of handmade products. The application focuses on fostering a sense of community, supporting local artisans, and promoting sustainable consumption.

## Purpose
1. **Develop Software Development Skills**: Build a full-stack web application using a comprehensive technology stack and collaborative workflow.
2. **Develop as an Effective Group Member**: Practice professionalism and teamwork in a software development environment.
3. **Teach one Another**: Share knowledge and learn from teammates following the BYU-Idaho learning model.

## Technology Stack
- **Front-End**: HTML, CSS, JavaScript, Next.js
- **Back-End**: Node.js, Database (MongoDB/PostgreSQL)
- **Styling**: Vanilla CSS (Custom Design System)
- **Deployment**: Vercel
- **Project Management**: GitHub Boards

## Group Members
- Isabella Silva

## User Stories & Work Items

### 1. Product Discovery
**User Story:** As a visitor, I want to browse products by category (e.g., jewelry, pottery, textiles) so that I can quickly find items I'm interested in.
- [x] Create a `CategoryNav` component for the storefront.
- [x] Implement URL state management to handle `?category=xyz` filtering.
- [x] Design and build a responsive `ProductGrid` component.

### 2. Shared Stories (Artisan Profiles)
**User Story:** As a potential customer, I want to read the artisan's story on their profile so that I can feel a personal connection to the item I'm buying.
- [x] Create a dynamic route `/artisan/[id]` for seller profiles.
- [x] Implement a "Featured Story" section on the profile page.
- [x] Add a link to the artisan profile from every product card.

### 3. Product Details
**User Story:** As a buyer, I want to see multiple high-quality images and a detailed description of a product so that I can understand its quality and features.
- [x] Create a dynamic route `/product/[id]` for product details.
- [x] Build an `ImageGallery` component with support for multiple images.
- [x] Implement a structured table for product specifications (dimensions, materials).

### 4. Seller Registration
**User Story:** As an artisan, I want to create an account specifically for selling so that I can manage my inventory and track my sales.
- [x] Build a multi-step registration form (User vs. Seller).
- [x] Set up NextAuth or a similar authentication provider.
- [x] Define User/Seller roles in the database schema.

### 5. Inventory Management
**User Story:** As a seller, I want to add new products with images and prices so that my latest creations are available to customers.
- [x] Design a `SellerDashboard` layout.
- [x] Create an "Add Product" form with image upload functionality.
- [x] Build an API endpoint (or Server Action) to save products to the database.

### 6. Trust & Reviews
**User Story:** As a customer, I want to leave a rating and review for a product I've purchased so that I can help other buyers make informed decisions.
- [x] Create a `ReviewForm` component with a star-rating selector.
- [x] Build a backend function to calculate and update average product ratings.
- [x] Design a `ReviewList` component to display verified reviews.

### 7. Search Functionality
**User Story:** As a shopper, I want to search for products using keywords so that I can find exactly what I'm looking for without browsing categories.
- [x] Implement a `SearchBar` component in the global header.
- [x] Create a `/search` results page that displays matching products.
- [x] Optimized database query for keyword searching across names and descriptions.

### 8. Mobile Responsiveness
**User Story:** As a mobile user, I want the website to be easy to navigate on my phone so that I can shop while on the go.
- [ ] Implement a mobile-first `HamburgerMenu` for navigation.
- [ ] Conduct a responsive audit across common screen sizes (iPhone, iPad).
- [ ] Optimize image loading using `next/image` to reduce mobile data usage.

### 9. Secure Checkout
**User Story:** As a buyer, I want a secure checkout process so that I feel confident my payment information is protected.
- [ ] Implement client-side `CartState` using Context API or similar.
- [ ] Create a "Checkout Summary" page showing totals and taxes.
- [ ] Integrate a payment gateway sandbox (e.g., Stripe API).

### 10. Social Proof
**User Story:** As a seller, I want my average rating to be displayed next to my name so that I can build a reputation for quality craftsmanship.
- [ ] Add "Top Rated Artisan" badges to profiles meeting specific criteria.
- [ ] Create a "Meet the Maker" section on the homepage featuring high-rated sellers.
- [ ] Build a global "Artisan Directory" with rating-based sorting.
