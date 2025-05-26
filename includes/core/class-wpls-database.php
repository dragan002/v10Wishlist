<?php

declare(strict_types=1);

namespace WishlistSimple\Core;

if (! defined('ABSPATH')) {
  exit;
}

class Wpls_Database
{
  private const WISHLIST_ITEMS_TABLE_NAME = 'wpls_wishlist_items';
  public static function get_wishlist_items_table_name(): string
  {
    global $wpdb;
    return $wpdb->prefix . self::WISHLIST_ITEMS_TABLE_NAME;
  }

  public static function create_tables(): void
  {
    global $wpdb;

    $table_name      = self::get_wishlist_items_table_name();
    $charset_collate = $wpdb->get_charset_collate();

    $sql = "CREATE TABLE {$table_name} (
      item_id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
      user_id bigint(20) unsigned DEFAULT NULL,
      product_id bigint(20) unsigned NOT NULL,
      date_added datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY  (item_id),
      KEY idx_user_product (user_id, product_id)
    ) {$charset_collate};";

    if (! function_exists('dbDelta')) {
      require_once ABSPATH . 'wp-admin/includes/upgrade.php';
    }

    dbDelta($sql);
  }
  public static function add_to_wishlist(int $product_id, ?int $user_or_guest_id = null): bool
  {
    global $wpdb;
    $table_name = self::get_wishlist_items_table_name();

    // If no specific user/guest ID is provided, get the current one.
    if ($user_or_guest_id === null) {
      $user_or_guest_id = wpls_get_current_user_or_guest_id();
    }

    // Check if the item already exists in the wishlist for this user/guest
    $existing = $wpdb->get_var(
      $wpdb->prepare(
        "SELECT item_id FROM {$table_name} WHERE product_id = %d AND user_id = %d",
        $product_id,
        $user_or_guest_id // Use the determined user_or_guest_id
      )
    );

    // If the item already exists, consider it a success (or handle as desired, e.g., update date_added)
    if ($existing) {
      return true;
    }

    // Insert the new wishlist item
    $result = $wpdb->insert(
      $table_name,
      [
        'user_id'    => $user_or_guest_id, // Use the determined user_or_guest_id
        'product_id' => $product_id,
        'date_added' => current_time('mysql'),
      ],
      [
        '%d', // user_id
        '%d', // product_id
        '%s', // date_added
      ]
    );

    return $result !== false;
  }
  public static function is_product_in_wishlist(int $product_id, ?int $user_id = null): bool
  {
    global $wpdb;

    // If no user_id provided, use the current user
    if ($user_id === null) {
      $user_id = get_current_user_id();
    }

    $table_name = \WishlistSimple\Core\Wpls_Database::get_wishlist_items_table_name();

    $result = $wpdb->get_var(
      $wpdb->prepare(
        "SELECT COUNT(*) FROM {$table_name} WHERE product_id = %d AND user_id = %d",
        $product_id,
        $user_id
      )
    );

    return (int)$result > 0;
  }

  public static function get_wishlist_count(?int $user_or_guest_id = null): int
  {
    global $wpdb;

    // If no specific user/guest ID is provided, get the current one.
    if ($user_or_guest_id === null) {
      $user_or_guest_id = wpls_get_current_user_or_guest_id();
    }

    $table_name = self::get_wishlist_items_table_name();

    $count = $wpdb->get_var(
      $wpdb->prepare(
        "SELECT COUNT(*) FROM {$table_name} WHERE user_id = %d",
        $user_or_guest_id // Use the determined user_or_guest_id
      )
    );

    return (int)$count;
  }

  public static function create_wishlist_page(): int
  {
    // Check if page already exists
    $wishlist_page_id = get_option('wpls_wishlist_page_id');
    if ($wishlist_page_id && get_post($wishlist_page_id)) {
      return (int)$wishlist_page_id;
    }

    // Create the page
    $page_id = wp_insert_post([
      'post_title'     => __('Wishlist', 'wishlist-simple'),
      'post_content'   => '',
      'post_status'    => 'publish',
      'post_type'      => 'page',
      'comment_status' => 'closed'
    ]);

    if ($page_id && !is_wp_error($page_id)) {
      // Save the page ID in options
      update_option('wpls_wishlist_page_id', $page_id);
      return $page_id;
    }

    return 0;
  }

  /**
   * Get all wishlist items for a user or guest.
   *
   * @param int|null $user_or_guest_id The user ID or guest ID. If null, it will be determined automatically.
   * @return array Array of wishlist item objects.
   */
  public static function get_wishlist_items(?int $user_or_guest_id = null): array
  {
    global $wpdb;

    if ($user_or_guest_id === null) {
      $user_or_guest_id = wpls_get_current_user_or_guest_id();
    }

    $table_name = self::get_wishlist_items_table_name();

    // Debug log before fetching
    error_log(sprintf(
      'WPLS Debug - Fetching Items: user_or_guest_id=%d, table=%s',
      $user_or_guest_id,
      $table_name
    ));

    $items = $wpdb->get_results($wpdb->prepare(
      "SELECT * FROM {$table_name} WHERE user_id = %d ORDER BY date_added DESC",
      $user_or_guest_id
    ));

    // Debug log after fetching
    error_log(sprintf(
      'WPLS Debug - Fetch Result: found_items=%d, last_error=%s',
      count($items),
      $wpdb->last_error
    ));

    return $items ?: [];
  }

  public static function remove_from_wishlist(int $item_id, ?int $user_or_guest_id = null): bool
  {
    global $wpdb;

    if ($user_or_guest_id === null) {
      $user_or_guest_id = wpls_get_current_user_or_guest_id();
    }

    $table_name = self::get_wishlist_items_table_name();

    // Debug log before deletion
    error_log(sprintf(
      'WPLS Debug - Removing Item: item_id=%d, user_or_guest_id=%d, table=%s',
      $item_id,
      $user_or_guest_id,
      $table_name
    ));

    // First, verify the item exists and belongs to this user/guest
    $existing_item = $wpdb->get_row($wpdb->prepare(
      "SELECT * FROM {$table_name} WHERE item_id = %d AND user_id = %d",
      $item_id,
      $user_or_guest_id
    ));

    if (!$existing_item) {
      error_log(sprintf(
        'WPLS Debug - Item not found: item_id=%d, user_or_guest_id=%d',
        $item_id,
        $user_or_guest_id
      ));
      return false;
    }

    $result = $wpdb->delete(
      $table_name,
      [
        'item_id' => $item_id,
        'user_id' => $user_or_guest_id,
      ],
      [
        '%d',
        '%d',
      ]
    );

    // Debug log after deletion
    error_log(sprintf(
      'WPLS Debug - Delete Result: success=%s, affected_rows=%d, last_error=%s',
      ($result !== false ? 'true' : 'false'),
      $result,
      $wpdb->last_error
    ));

    return $result !== false;
  }

  public static function clear_wishlist(?int $user_id = null): bool
  {
    global $wpdb;

    if ($user_id === null) {
      $user_id = get_current_user_id();
    }

    $table_name = self::get_wishlist_items_table_name();

    $result = $wpdb->delete(
      $table_name,
      ['user_id' => $user_id],
      ['%d']
    );

    return $result !== false;
  }
}
