<?php

/**
 * WishlistSimple
 *
 * @package           WishlistSimple
 * @author            Your Name
 * @copyright         2024 Your Name
 * @license           GPL-3.0-or-later
 *
 * @wordpress-plugin
 * Plugin Name:       Wishlist Simple
 * Plugin URI:        https://example.com/wishlist-simple
 * Description:       A simple wishlist plugin for WooCommerce.
 * Version:           1.0.0
 * Requires at least: 6.0
 * Requires PHP:      7.4
 * Author:            Your Name
 * Author URI:        https://example.com
 * Text Domain:       wishlist-simple
 * Domain Path:       /languages
 * License:           GPL v3 or later
 * License URI:       http://www.gnu.org/licenses/gpl-3.0.txt
 */

declare(strict_types=1);

if (! defined('ABSPATH')) {
  exit;
}

if (! defined('WPLS_VERSION')) {
  define('WPLS_VERSION', '1.0.0');
}

if (! defined('WPLS_PLUGIN_DIR')) {
  define('WPLS_PLUGIN_DIR', plugin_dir_path(__FILE__));
}

if (! defined('WPLS_PLUGIN_URL')) {
  define('WPLS_PLUGIN_URL', plugin_dir_url(__FILE__));
}

if (! defined('WPLS_TEXT_DOMAIN')) {
  define('WPLS_TEXT_DOMAIN', 'wishlist-simple');
}

if (! defined('WPLS_MIN_PHP_VERSION')) {
  define('WPLS_MIN_PHP_VERSION', '7.4');
}

if (! defined('WPLS_MIN_WP_VERSION')) {
  define('WPLS_MIN_WP_VERSION', '6.0');
}

function wpls_activate_wishlist_simple(): void
{
  require_once WPLS_PLUGIN_DIR . 'includes/core/class-wpls-database.php';
  WishlistSimple\Core\Wpls_Database::create_tables();
  WishlistSimple\Core\Wpls_Database::create_wishlist_page();
}
register_activation_hook(__FILE__, 'wpls_activate_wishlist_simple');

require_once WPLS_PLUGIN_DIR . 'includes/core/class-wpls-loader.php';
require_once WPLS_PLUGIN_DIR . 'includes/api/class-wpls-api.php';

$wpls_loader = new WishlistSimple\Core\Wpls_Loader('WishlistSimple\\', WPLS_PLUGIN_DIR . 'includes/');
$wpls_loader->register();

function wpls_run_wishlist_simple(): void
{
  $plugin = new WishlistSimple\Core\Wpls_Core(WPLS_VERSION, WPLS_TEXT_DOMAIN);
  $plugin->run();
}

wpls_run_wishlist_simple();

if (!function_exists('wpls_get_current_user_or_guest_id')) {
  function wpls_get_current_user_or_guest_id(): int
  {
    // Early return for logged-in users
    if (is_user_logged_in()) {
      return get_current_user_id();
    }

    $cookie_name = 'wpls_guest_wishlist_id';
    $guest_id_from_cookie = isset($_COOKIE[$cookie_name]) ? absint($_COOKIE[$cookie_name]) : 0;

    // Debug only if we're actually handling a guest
    error_log(sprintf(
      'WPLS Debug - Guest Check: Cookie=%s, Value=%s',
      $cookie_name,
      $guest_id_from_cookie
    ));

    if ($guest_id_from_cookie >= 1000000000) {
      return $guest_id_from_cookie;
    }

    // Only proceed with new guest ID if we're not doing AJAX
    if (wp_doing_ajax()) {
      error_log('WPLS Debug - Skipping guest ID generation during AJAX');
      return 0; // or handle this case differently
    }

    $new_guest_id = mt_rand(1000000000, PHP_INT_MAX - 1);

    if (!headers_sent()) {
      $domain = parse_url(home_url(), PHP_URL_HOST);

      setcookie(
        $cookie_name,
        (string)$new_guest_id,
        [
          'expires' => time() + YEAR_IN_SECONDS,
          'path' => '/',
          'domain' => $domain,
          'secure' => is_ssl(),
          'httponly' => true,
          'samesite' => 'Lax'
        ]
      );

      error_log(sprintf(
        'WPLS Debug - New Guest: ID=%s, Domain=%s',
        $new_guest_id,
        $domain
      ));
    }

    $_COOKIE[$cookie_name] = (string)$new_guest_id;
    return $new_guest_id;
  }
}

add_action('init', function () {
  // Only proceed if ALL these conditions are true:
  if (
    !is_user_logged_in()    // Must be a guest
    && !is_admin()          // Must be frontend
    && !wp_doing_ajax()     // Not during AJAX calls
    && !wp_doing_cron()     // Not during cron
  ) {
    wpls_get_current_user_or_guest_id();
  }
});
