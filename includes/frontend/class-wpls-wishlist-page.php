<?php

declare(strict_types=1);

namespace WishlistSimple\Frontend;

if (!defined('ABSPATH')) {
  exit; // Exit if accessed directly.
}

class Wpls_Wishlist_Page
{
  public function __construct()
  {
    // Filter page content
    add_filter('the_content', [$this, 'filter_wishlist_page_content']);

    // Add scripts for the wishlist page
    add_action('wp_enqueue_scripts', [$this, 'enqueue_scripts']);
  }

  public function is_wishlist_page(): bool
  {
    if (!is_page()) {
      return false;
    }

    $wishlist_page_id = get_option('wpls_wishlist_page_id');
    $current_page_id = get_queried_object_id();

    return $wishlist_page_id && $current_page_id == $wishlist_page_id;
  }

  public function filter_wishlist_page_content(string $content): string
  {
    // Only modify content for the wishlist page
    if (!$this->is_wishlist_page()) {
      return $content;
    }

    // Return a div for React to mount to
    return '<div id="wpls-wishlist-root"></div>';
  }
  public function enqueue_scripts(): void
  {
    if (!$this->is_wishlist_page()) {
      return;
    }

    // Path to the asset file
    $script_asset_path = WPLS_PLUGIN_DIR . 'assets/js/build/wishlist-page.asset.php';

    if (!file_exists($script_asset_path)) {
      error_log('Wishlist Simple: Script asset file not found at ' . $script_asset_path);
      return;
    }

    $script_asset = require($script_asset_path);

    // Enqueue the React bundle
    wp_enqueue_script(
      'wpls-wishlist-page',
      WPLS_PLUGIN_URL . 'assets/js/build/wishlist-page.js',
      $script_asset['dependencies'],
      $script_asset['version'],
      true
    );

    // Get wishlist page URL
    $wishlist_page_id = get_option('wpls_wishlist_page_id');
    $wishlist_url = $wishlist_page_id ? get_permalink($wishlist_page_id) : '';

    // Localize data for the React app
    wp_localize_script(
      'wpls-wishlist-page',
      'wpls_wishlist_data',
      [
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('wpls_wishlist_actions'),
        'rest_url' => esc_url_raw(rest_url()),
        'api_nonce' => wp_create_nonce('wp_rest'),
        'shop_url' => get_permalink(wc_get_page_id('shop')),
        'cart_url' => wc_get_cart_url(),
        'wishlist_url' => $wishlist_url,
      ]
    );
  }
}
