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
  private string $plugin_path;
  private string $plugin_url;

  const MENU_SLUG = 'wpls-settings';

  public function __construct(string $version, string $text_domain, string $plugin_path, string $plugin_url)
  {
    $this->version = $version;
    $this->text_domain = $text_domain;
    $this->plugin_path = $plugin_path;
    $this->plugin_url = $plugin_url;
  }

  public function init(): void
  {
    add_action('admin_menu', [$this, 'wpls_register_react_admin_page']);
    add_action('admin_enqueue_scripts', [$this, 'wpls_enqueue_react_admin_scripts']);
  }

  /**
   * Registers the admin menu page for React app.
   */
  public function wpls_register_react_admin_page(): void
  {
    add_menu_page(
      __('Wishlist Simple Settings', $this->text_domain),
      __('Wishlist Simple', $this->text_domain),
      'manage_options',
      self::MENU_SLUG,
      [$this, 'wpls_render_react_container'],
      'dashicons-heart',
      75
    );
  }

  /**
   * Renders the container for React app.
   */
  public function wpls_render_react_container(): void
  {
?>
    <div class="wrap">
      <div id="wpls-admin-root">
        <p><?php esc_html_e('Loading settings interface...', $this->text_domain); ?></p>
      </div>
    </div>
<?php
  }

  /**
   * Enqueues React scripts and styles.
   */
  public function wpls_enqueue_react_admin_scripts(string $hook_suffix): void
  {
    if ('toplevel_page_' . self::MENU_SLUG !== $hook_suffix) {
      return;
    }

    $script_asset_path = $this->plugin_path . 'assets/js/build/admin.asset.php';

    if (!file_exists($script_asset_path)) {
      wp_die(
        esc_html__('React script asset not found. Run npm run build. Path: ', $this->text_domain) .
          esc_html($script_asset_path)
      );
    }

    $script_asset = require $script_asset_path;

    wp_enqueue_script(
      'wpls-admin-app',
      $this->plugin_url . 'assets/js/build/admin.js',
      $script_asset['dependencies'],
      $script_asset['version'],
      true
    );

    $style_path = $this->plugin_path . 'assets/js/build/admin.css';
    if (file_exists($style_path)) {
      wp_enqueue_style(
        'wpls-admin-app-styles',
        $this->plugin_url . 'assets/js/build/admin.css',
        [],
        $script_asset['version']
      );
    }

    wp_localize_script(
      'wpls-admin-app',
      'wplsAdminData',
      [
        'rest_url'   => esc_url_raw(rest_url()),
        'nonce'      => wp_create_nonce('wp_rest'),
        'plugin_url' => $this->plugin_url,
      ]
    );
  }
}
