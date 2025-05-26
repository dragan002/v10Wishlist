<?php

declare(strict_types=1);

namespace WishlistSimple\Frontend;

use Error;

if (! defined('ABSPATH')) {
  exit; // Exit if accessed directly.
}

/**
 * Wpls_Frontend Class.
 *
 * Handles the frontend functionality of the wishlist including the "Add to Wishlist" button.
 */
class Wpls_Frontend
{

  public function __construct(string $version, string $text_domain)
  {
    $this->version = $version;
    $this->text_domain = $text_domain;
  }

  /**
   * Initialize the frontend hooks.
   */
  public function init(): void
  {
    // Register AJAX actions - these should always be registered
    add_action('wp_ajax_wpls_add_to_wishlist', [$this, 'add_to_wishlist']);
    add_action('wp_ajax_nopriv_wpls_add_to_wishlist', [$this, 'add_to_wishlist']);

    // Register AJAX actions for the React counter
    add_action('wp_ajax_wpls_get_wishlist_count', [$this, 'get_wishlist_count_ajax']);
    add_action('wp_ajax_nopriv_wpls_get_wishlist_count', [$this, 'get_wishlist_count_ajax']);

    // Conditional hooks for display and scripts, only on actual frontend pages
    if (!is_admin()) {
      // Hook to add the "Add to Wishlist" button
      add_action('woocommerce_single_product_summary', [$this, 'display_add_to_wishlist_button'], 31);
      // Enqueue jQuery-based frontend scripts (for the button click)
      add_action('wp_enqueue_scripts', [$this, 'enqueue_scripts_for_the_ajax_call']);
      // Enqueue React-based scripts (for the counter)
      add_action('wp_enqueue_scripts', [$this, 'enqueue_react_scripts']);
    }

    // Add these to your init() method
    add_action('wp_ajax_wpls_get_wishlist_items', [$this, 'get_wishlist_items_ajax']);
    add_action('wp_ajax_nopriv_wpls_get_wishlist_items', [$this, 'get_wishlist_items_ajax']);

    // Register AJAX handlers for adding to cart from wishlist
    add_action('wp_ajax_wpls_add_to_cart_from_wishlist', [$this, 'add_to_cart_from_wishlist']);
    add_action('wp_ajax_nopriv_wpls_add_to_cart_from_wishlist', [$this, 'add_to_cart_from_wishlist']);

    // Register AJAX handlers for removing and clearing wishlist
    add_action('wp_ajax_wpls_remove_from_wishlist', [$this, 'remove_from_wishlist_ajax']);
    add_action('wp_ajax_nopriv_wpls_remove_from_wishlist', [$this, 'remove_from_wishlist_ajax']);
    add_action('wp_ajax_wpls_clear_wishlist', [$this, 'clear_wishlist_ajax']);
    add_action('wp_ajax_nopriv_wpls_clear_wishlist', [$this, 'clear_wishlist_ajax']);
  }

  public function add_to_wishlist(): void
  {    // Check if nonce is NOT set or NOT valid
    if (!isset($_POST['nonce']) || !wp_verify_nonce($_POST['nonce'], 'wpls_add_to_wishlist')) {
      wp_send_json_error([
        'message' => 'Invalid nonce',
        'success' => false,
      ]);
    }

    if (!isset($_POST['product_id'])) {
      wp_send_json_error([
        'message' => 'Product ID is required',
        'success' => false,
      ]);
    }

    $product_id = absint($_POST['product_id']);

    if (!$product_id || !wc_get_product($product_id)) {
      wp_send_json_error([
        'message' => __('Invalid product ID', 'wishlist-simple'),
        'success' => false,
      ]);
    }
    $current_user_or_guest_id = wpls_get_current_user_or_guest_id();

    $result = \WishlistSimple\Core\Wpls_Database::add_to_wishlist($product_id, $current_user_or_guest_id);

    if (!$result) {
      wp_send_json_error([
        'message' => __('Failed to add product to wishlist', 'wishlist-simple'),
        'success' => false,
      ]);
    } else {
      wp_send_json_success([
        'message' => __('Product added to wishlist', 'wishlist-simple'),
        'success' => true,
      ]);
    }
  }

  public function display_add_to_wishlist_button(): void
  {
    global $product;

    if (!$product || !is_a($product, 'WC_Product')) {
      return;
    }

    $product_id = $product->get_id();
    $user_id = get_current_user_id();

    // Check if product is in wishlist
    $in_wishlist = \WishlistSimple\Core\Wpls_Database::is_product_in_wishlist($product_id, $user_id);

?>
    <div class="wpls-add-to-wishlist-container">
      <button
        type="button"
        class="button wpls-add-to-wishlist-button <?php echo $in_wishlist ? 'added-to-wishlist' : ''; ?>"
        id="wpls-add-to-wishlist-button-<?php echo esc_attr($product_id); ?>"
        data-product-id="<?php echo esc_attr($product_id); ?>">
        <?php echo $in_wishlist ? esc_html__('View Wishlist', 'wishlist-simple') : esc_html__('Add to Wishlist', 'wishlist-simple'); ?>
      </button>
    </div>
<?php
  }

  public function enqueue_scripts_for_the_ajax_call(): void
  {
    if (!is_product()) {
      return;
    }
    wp_enqueue_script(
      'wpls-frontend',
      WPLS_PLUGIN_URL . 'assets/js/src/frontend/frontend.js',
      ['jquery'],
      $this->version,
      true
    );

    wp_localize_script(
      'wpls-frontend',
      'wpls_jquery_data',
      [
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('wpls_add_to_wishlist'),
        'add_success' => __('Product added to wishlist', 'wishlist-simple'),
        'add_error' => __('Failed to add product to wishlist', 'wishlist-simple'),
        'is_user_logged_in' => is_user_logged_in(),
      ]
    );
  }

  public function get_wishlist_count_ajax(): void
  {
    // Verify nonce
    if (!isset($_POST['nonce']) || !wp_verify_nonce(sanitize_text_field(wp_unslash($_POST['nonce'])), 'wpls_add_to_wishlist')) {
      wp_send_json_error(['message' => __('Invalid security token.', 'wishlist-simple'), 'count' => 0]);
      return;
    }

    // Get the correct user or guest ID using our helper function
    $current_user_or_guest_id = wpls_get_current_user_or_guest_id();

    // Pass this ID to the database method
    $count = \WishlistSimple\Core\Wpls_Database::get_wishlist_count($current_user_or_guest_id);

    wp_send_json_success(['count' => $count]);
  }

  public function enqueue_react_scripts(): void
  {
    // Only on frontend pages, not during AJAX requests triggered by other means
    if (is_admin() || (defined('DOING_AJAX') && DOING_AJAX)) return;

    // Path to the asset file (output of build script for React)
    $script_asset_path = WPLS_PLUGIN_DIR . 'assets/js/build/index.asset.php';

    if (! file_exists($script_asset_path)) {
      error_log('Wishlist Simple: React script asset file not found at ' . $script_asset_path . '. Did you run npm run build?');
      return;
    }
    $script_asset = require($script_asset_path);

    wp_enqueue_script(
      'wpls-react-components',
      WPLS_PLUGIN_URL . 'assets/js/build/index.js',
      $script_asset['dependencies'],
      $script_asset['version'],
      true // Load in footer
    );

    // Get wishlist page URL
    $wishlist_page_id = get_option('wpls_wishlist_page_id');
    $wishlist_url = $wishlist_page_id ? get_permalink($wishlist_page_id) : '';

    wp_localize_script(
      'wpls-react-components',
      'wpls_data',
      [
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('wpls_add_to_wishlist'),
        'wishlist_url' => $wishlist_url,
      ]
    );
  }

  public function get_wishlist_items_ajax(): void
  {
    // Check nonce
    if (!isset($_GET['nonce']) || !wp_verify_nonce($_GET['nonce'], 'wpls_wishlist_actions')) {
      wp_send_json_error(['message' => __('Security check failed', 'wishlist-simple')]);
      return;
    }

    try {
      // Get the correct user or guest ID using our helper function
      $current_user_or_guest_id = wpls_get_current_user_or_guest_id();

      // Pass this ID to the database method
      $items = \WishlistSimple\Core\Wpls_Database::get_wishlist_items($current_user_or_guest_id);

      $formatted_items = [];
      foreach ($items as $item) {
        $product = wc_get_product($item->product_id);
        if ($product) {
          $image_id = $product->get_image_id();
          $image_url = $image_id ? wp_get_attachment_image_url($image_id, 'medium') : wc_placeholder_img_src('medium');

          $formatted_items[] = [
            'id'           => (int)$item->item_id,
            'product_id'   => (int)$item->product_id,
            'name'         => $product->get_name(),
            'price_html'   => $product->get_price_html(),
            'url'          => get_permalink($item->product_id),
            'image'        => $image_url,
            'stock_status' => $product->get_stock_status(),
            'in_stock'     => $product->is_in_stock(),
            'date_added'   => $item->date_added,
          ];
        }
      }
      wp_send_json_success($formatted_items);
    } catch (\Exception $e) {
      error_log('Wishlist Simple: Error in get_wishlist_items_ajax: ' . $e->getMessage());
      wp_send_json_error(['message' => __('Error retrieving wishlist items', 'wishlist-simple')]);
    }
  }

  public function add_to_cart_from_wishlist(): void
  {
    // 1. Verify security nonce
    if (!isset($_POST['nonce']) || !wp_verify_nonce($_POST['nonce'], 'wpls_wishlist_actions')) {
      wp_send_json_error([
        'message' => __('Security check failed', 'wishlist-simple'),
      ]);
      return;
    }

    // 2. Validate input
    if (!isset($_POST['product_id'])) {
      wp_send_json_error([
        'message' => __('Product ID is required', 'wishlist-simple'),
      ]);
      return;
    }

    $product_id = absint($_POST['product_id']);

    // 3. Verify product exists and can be purchased
    $product = wc_get_product($product_id);
    if (!$product || !$product->is_purchasable() || !$product->is_in_stock()) {
      wp_send_json_error([
        'message' => __('This product cannot be added to the cart', 'wishlist-simple'),
      ]);
      return;
    }

    // 4. Add to WooCommerce cart
    $quantity = 1; // Default quantity
    $cart_item_key = WC()->cart->add_to_cart($product_id, $quantity);

    // 5. Return success or error response
    if ($cart_item_key) {
      wp_send_json_success([
        'message' => __('Product added to cart', 'wishlist-simple'),
        'cart_url' => wc_get_cart_url(),
      ]);
    } else {
      wp_send_json_error([
        'message' => __('Failed to add product to cart', 'wishlist-simple'),
      ]);
    }
  }

  public function remove_from_wishlist_ajax(): void
  {
    // Check nonce
    if (!isset($_POST['nonce']) || !wp_verify_nonce($_POST['nonce'], 'wpls_wishlist_actions')) {
      wp_send_json_error(['message' => __('Security check failed', 'wishlist-simple')]);
      return;
    }

    if (!isset($_POST['item_id'])) {
      wp_send_json_error(['message' => __('Item ID is required', 'wishlist-simple')]);
      return;
    }

    $item_id = (int)$_POST['item_id'];
    $current_user_or_guest_id = wpls_get_current_user_or_guest_id();

    $result = \WishlistSimple\Core\Wpls_Database::remove_from_wishlist($item_id, $current_user_or_guest_id);

    if ($result) {
      wp_send_json_success([
        'message' => __('Item removed from wishlist', 'wishlist-simple'),
      ]);
    } else {
      wp_send_json_error([
        'message' => __('Failed to remove item from wishlist', 'wishlist-simple'),
      ]);
    }
  }

  public function clear_wishlist_ajax(): void
  {
    // Check nonce
    if (!isset($_POST['nonce']) || !wp_verify_nonce($_POST['nonce'], 'wpls_wishlist_actions')) {
      wp_send_json_error(['message' => __('Security check failed', 'wishlist-simple')]);
      return;
    }

    $current_user_or_guest_id = wpls_get_current_user_or_guest_id();
    $result = \WishlistSimple\Core\Wpls_Database::clear_wishlist($current_user_or_guest_id);
    if ($result) {
      wp_send_json_success([
        'message' => __('Wishlist cleared', 'wishlist-simple'),
      ]);
    } else {
      wp_send_json_error([
        'message' => __('Failed to clear wishlist', 'wishlist-simple'),
      ]);
    }
  }
}
