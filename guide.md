# Wishlist Simple Plugin Development Plan

## Prefix: `wpls_` | Text Domain: `wishlist-simple` | Class Prefix: `Wpls_`

---

## Phase 1: Core Wishlist Functionality (MVP)

Focus: Essential wishlist features for logged-in users and guests.

### Task 1.1: "Add to Wishlist" Button & Basic Data Handling
*   **Backend:**
    *   Custom DB table: `wp_wpls_wishlist_items` (`user_id`, `product_id`, `guest_session_id`, `added_date`).
    *   PHP Functions:
        *   Add product to wishlist (logged-in/guest).
        *   Remove product from wishlist.
        *   Check if product is in wishlist.
    *   WordPress AJAX Hooks: `wp_ajax_wpls_add_to_wishlist`, `wp_ajax_nopriv_wpls_add_to_wishlist`.
*   **Frontend (Theme Integration):**
    *   Display button on single product pages (e.g., `woocommerce_single_product_summary`).
    *   JavaScript for AJAX add/remove, button state update.
    *   Translatable strings.

### Task 1.2: Wishlist Count Icon
*   **Backend:**
    *   PHP function for current wishlist count.
    *   AJAX for dynamic count update.
*   **Frontend (Theme Integration):**
    *   Shortcode (e.g., `[wpls_wishlist_count]`) or template tag.
    *   JavaScript for dynamic count update.

### Task 1.3: Simple Wishlist Viewing Interface
*   **Backend:**
    *   PHP function to retrieve wishlist items for current user/guest.
*   **Frontend (New Page):**
    *   WordPress page via shortcode (e.g., `[wpls_wishlist_view]`).
    *   List products (image, name, price).
    *   Functionality to remove items (uses AJAX from Task 1.1).
    *   Basic styling.

---

## Phase 2: Admin Customization & Initial Dashboard Setup

Focus: Merchant customization options and React/Chakra UI admin dashboard foundation.

### Task 2.1: Admin Settings for Button Customization
*   **Backend (WordPress Settings API):**
    *   New settings page ("Wishlist Simple").
    *   Options: Button text, colors (bg, text, hover), placement (hooks/CSS selector).
    *   Save with `update_option()`, retrieve with `get_option()`. Sanitize/Escape.
*   **Frontend:**
    *   Modify button rendering (Task 1.1) to use saved options.
    *   Logic for placement options.

### Task 2.2: React/Chakra UI Admin Dashboard - Initial Setup
*   **Development Environment:**
    *   Modern JS build process (e.g., `@wordpress/scripts`).
*   **Plugin Structure:**
    *   `admin/dashboard` directory for React app.
*   **Basic React App:**
    *   Root React component.
    *   Chakra UI integration (`ChakraProvider`).
    *   Basic admin layout (sidebar, content area).
*   **WordPress Integration:**
    *   Enqueue React app JS/CSS (`wp_enqueue_script/style`).
    *   `wp_localize_script` for data (REST API URL, nonces, initial settings).
    *   Admin page as container for React app.
    *   Initial dashboard: Welcome message/basic info.

---

## Phase 3: Enhancing User Experience & Features

Focus: Advanced user-facing features.

### Task 3.1: Multiple Wishlists
*   **Backend:**
    *   DB Schema:
        *   `wp_wpls_wishlists` table (`id`, `user_id`, `guest_session_id`, `name`, `is_default`).
        *   `wishlist_id` foreign key in `wp_wpls_wishlist_items`.
    *   PHP Functions: Create, rename, delete wishlists; set default; move items; add to specific wishlist.
*   **Frontend (Wishlist Page & Product Page):**
    *   Wishlist Page (Task 1.3):
        *   Create new wishlists.
        *   Display list of wishlists (dropdown/tabs).
        *   Rename/delete wishlists.
    *   Product Page (Add to Wishlist):
        *   Select target wishlist if multiple exist (dropdown/modal).

### Task 3.2: Item Reservation (Limited Stock)
*   **Backend:**
    *   Admin Settings (React Dashboard or WP Settings API initially):
        *   Enable/disable feature.
        *   Reservation time period.
        *   Product/category eligibility for reservation.
    *   Database: Add `is_reserved`, `reserved_until` (timestamp) to `wp_wpls_wishlist_items`.
    *   Logic:
        *   On add to wishlist (if eligible & stock available): mark reserved, set `reserved_until`.
        *   WP Cron job (`wp_schedule_event`) for expired reservations (update DB, potentially stock).
        *   Careful consideration for WooCommerce stock management interaction.
*   **Frontend (Wishlist Page):**
    *   Visual indicator ("Reserved") & countdown timer.
    *   "Complete Purchase" CTA for reserved items.

---

## Phase 4: Advanced Admin Features & Insights (React Dashboard)

Focus: Sophisticated controls and analytics in the React/Chakra UI dashboard.

### Task 4.1: Porting Customization Settings to React Dashboard
*   **Backend (REST API):**
    *   WordPress REST API endpoints for plugin settings (GET/POST/PUT). Authentication & capability checks.
*   **Frontend (React/Chakra UI Dashboard):**
    *   Rebuild customization options (Task 2.1) in React using Chakra UI.
    *   Fetch/send settings via REST API.

### Task 4.2: Product Recommendations & Stock/Price Info in Wishlist View
*   **Backend:**
    *   Recommendations: Logic for related/complementary products (categories, tags, WC related). Expose via AJAX/page load.
    *   Stock/Price: Fetch current status. For price *changes*, store price at add time (adds complexity).
*   **Frontend (Wishlist Page):**
    *   Display "Recommended Products" section.
    *   Current stock status.
    *   Optional: Price change indicator.

### Task 4.3: Basic Insights on Wishlist Usage (React Dashboard)
*   **Backend:**
    *   Data Tracking: Ensure `wp_wpls_wishlist_items` captures product ID, user ID, date.
    *   Track items added vs. purchased (hook into WC order completion).
    *   REST API Endpoints for aggregated data:
        *   Most wishlisted products.
        *   Stats on items added vs. purchased.
*   **Frontend (React/Chakra UI Dashboard):**
    *   New analytics sections/pages.
    *   Chakra UI components (and charting library like Chart.js/Recharts - bundled dependency) for:
        *   List/chart of most wishlisted products.
        *   Basic wishlist activity stats.

---

## General Development Principles (Apply Throughout)

*   **WordPress.org Compliance:** Strict adherence to all provided WordPress Plugin Development Rules.
    *   Prefix: `wpls_` (functions), `Wpls_` (classes).
    *   Text Domain: `wishlist-simple`.
*   **Security:** Nonces, capability checks, input sanitization, output escaping, `$wpdb->prepare()`.
*   **Error Handling:** `try-catch`, `WP_DEBUG_LOG`.
*   **Database:** `$wpdb`, `dbDelta()` for table creation/updates on activation.
*   **Assets:** `wp_enqueue_script/style`, `wp_localize_script`. Bundle all assets locally.
*   **Direct File Access:** `if ( ! defined( 'ABSPATH' ) ) exit;` in all PHP files.
*   **No Debug Logs in Production:** Remove `console.log`, etc.
*   **OOP & Modularity:** Classes, reusable functions.
*   **WordPress Hooks:** Actions and filters.
*   **Internationalization:** `__()`, `_e()` with `wishlist-simple` text domain. Include `.pot` file.
*   **UI/UX:** Chakra UI for React admin components.

---