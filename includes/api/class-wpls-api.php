<?php

declare(strict_types=1);

namespace WishlistSimple\Api;

if (!defined('ABSPATH')) exit;


class Wpls_Api
{
  private string $namespace = 'wpls/v1';

  public function __construct()
  {
    add_action('rest_api_init', [$this, 'register_routes']);
  }

  public function register_routes(): void
  {
    // Button settings endpoint
    register_rest_route($this->namespace, '/button-settings', [
      'methods' => 'GET',
      'callback' => [$this, 'get_button_settings'],
      'permission_callback' => [$this, 'check_admin_permissions']
    ]);

    register_rest_route($this->namespace, '/button-settings', [
      'methods' => 'POST',
      'callback' => [$this, 'save_button_settings'],
      'permission_callback' => [$this, 'check_admin_permissions'],
      'args' => [
        'button_text' => [
          'required' => true,
          'sanitize_callback' => 'sanitize_text_field'
        ],
        'button_color' => [
          'required' => true,
          'sanitize_callback' => 'sanitize_hex_color'
        ],
        'button_position' => [
          'required' => true,
          'sanitize_callback' => 'sanitize_text_field'
        ],
        'animation_style' => [
          'required' => true,
          'sanitize_callback' => 'sanitize_text_field'
        ],
        'is_enabled' => [
          'required' => true,
          'sanitize_callback' => 'rest_sanitize_boolean'
        ]
      ]
    ]);
  }

  public function check_admin_permissions(): bool
  {
    return current_user_can('manage_options');
  }

  public function get_button_settings(\WP_REST_Request $request): \WP_REST_Response
  {
    $settings = get_option('wpls_button_settings', [
      'button_text' => 'Add to Wishlist',
      'button_color' => '#667eea',
      'button_position' => 'before_cart',
      'animation_style' => 'bounce',
      'is_enabled' => true
    ]);

    return new \WP_REST_Response($settings, 200);
  }

  public function save_button_settings(\WP_REST_Request $request): \WP_REST_Response
  {
    // Add error logging for debugging
    error_log('WPLS API: save_button_settings called');

    try {
      $settings = [
        'button_text'     => sanitize_text_field($request->get_param('button_text')),
        'button_color'    => sanitize_text_field($request->get_param('button_color')), // Changed from sanitize_hex_color
        'button_position' => sanitize_text_field($request->get_param('button_position')),
        'animation_style' => sanitize_text_field($request->get_param('animation_style')),
        'is_enabled'      => rest_sanitize_boolean($request->get_param('is_enabled'))
      ];

      error_log('WPLS API: Settings to save: ' . print_r($settings, true));

      $updated = update_option('wpls_button_settings', $settings);

      error_log('WPLS API: Update result: ' . ($updated ? 'success' : 'failed'));

      return new \WP_REST_Response([
        'success' => true,
        'message' => 'Settings saved successfully',
        'data' => $settings
      ], 200);
    } catch (\Exception $e) {
      error_log('WPLS API Error: ' . $e->getMessage());
      return new \WP_REST_Response([
        'success' => false,
        'message' => 'Server error: ' . $e->getMessage()
      ], 500);
    }
  }
}
