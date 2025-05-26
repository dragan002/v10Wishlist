<?php

declare(strict_types=1);

namespace WishlistSimple\Core;

if (! defined('ABSPATH')) {
  exit; // Exit if accessed directly.
}

/**
 * Wpls_Core Class.
 *
 * The main class for the WishlistSimple plugin.
 * Responsible for initializing the plugin and loading its components.
 */
final class Wpls_Core
{

  public function __construct(string $version, string $text_domain)
  {
    $this->version     = $version;
    $this->text_domain = $text_domain;
  }

  public function run(): void
  {
    $this->load_dependencies();
    $this->register_hooks();
    $this->init_components();
  }

  private function load_dependencies(): void
  {
    // Core dependencies will be added here as needed
  }

  private function register_hooks(): void
  {
    add_action('plugins_loaded', [$this, 'load_textdomain']);
    // Check if WooCommerce is active
    add_action('plugins_loaded', [$this, 'check_woocommerce_dependency']);
  }

  private function init_components(): void
  {

    if (is_admin()) {
      $admin = new \WishlistSimple\Admin\Wpls_Admin($this->version, $this->text_domain);
      $admin->init();
    }

    $frontend = new \WishlistSimple\Frontend\Wpls_Frontend($this->version, $this->text_domain);
    $frontend->init(); // This needs to register the AJAX hooks.

    // Initialize wishlist page
    new \WishlistSimple\Frontend\Wpls_Wishlist_Page();
  }

  /**
   * Load the plugin text domain for translation.
   */
  public function load_textdomain(): void
  {
    load_plugin_textdomain(
      $this->text_domain,
      false, // deprecated
      dirname(plugin_basename(WPLS_PLUGIN_DIR)) . '/languages/' // WPLS_PLUGIN_DIR is the path to the plugin directory.
    );
  }

  /**
   * Check if WooCommerce is active and show admin notice if not.
   */
  public function check_woocommerce_dependency(): void
  {
    if (!class_exists('WooCommerce')) {
      add_action('admin_notices', function () {
?>
        <div class="notice notice-error">
          <p><?php esc_html_e('Wishlist Simple requires WooCommerce to be installed and activated.', 'wishlist-simple'); ?></p>
        </div>
<?php
      });
    }
  }

  public function get_wishlist_items_ajax()
  {
    wp_send_json_success([]);  // Return empty array for testing
  }
}
