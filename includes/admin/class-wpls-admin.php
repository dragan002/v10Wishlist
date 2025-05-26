<?php

declare(strict_types=1);

namespace WishlistSimple\Admin;

if (! defined('ABSPATH')) {
  exit; // Exit if accessed directly.
}

class Wpls_Admin
{

  private string $version;

  private string $text_domain;
  public function __construct(string $version, string $text_domain)
  {
    $this->version = $version;
    $this->text_domain = $text_domain;
  }

  public function init(): void
  {
    // Add menu item
    add_action('admin_menu', [$this, 'add_admin_menu']);
  }

  public function add_admin_menu(): void
  {
    add_menu_page(
      __('Wishlist Simple Settings', 'wishlist-simple'), // Page title
      __('Wishlist', 'wishlist-simple'),                // Menu title
      'manage_options',                                 // Capability
      'wpls-wishlist-simple',                           // Menu slug
      [$this, 'display_admin_page'],                    // Callback function
      'dashicons-heart',                                // Icon URL
      30                                                // Position
    );
  }
  public function display_admin_page(): void
  {
?>
    <div class="wrap">
      <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
      <p><?php esc_html_e('Welcome to the Wishlist Simple settings page.', 'wishlist-simple'); ?></p>
      <p><?php esc_html_e('Further options and information will be available here as the plugin develops.', 'wishlist-simple'); ?></p>
    </div>
<?php
  }
}
