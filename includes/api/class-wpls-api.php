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
          'sanitize_callback' => 'sanitize_text_field'
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
        ],
        'font_color' => [
          'required' => false,
          'sanitize_callback' => 'sanitize_text_field'
        ],
        'font_size' => [
          'required' => false,
          'sanitize_callback' => 'absint'
        ],
        'button_padding' => [
          'required' => false,
          'sanitize_callback' => 'absint'
        ],
        'button_margin' => [
          'required' => false,
          'sanitize_callback' => 'absint'
        ],
        'border_radius' => [
          'required' => false,
          'sanitize_callback' => 'absint'
        ],
        'border_width' => [
          'required' => false,
          'sanitize_callback' => 'absint'
        ],
        'border_color' => [
          'required' => false,
          'sanitize_callback' => 'sanitize_text_field'
        ],
        'show_icon' => [
          'required' => false,
          'sanitize_callback' => 'rest_sanitize_boolean'
        ],
        'icon_position' => [
          'required' => false,
          'sanitize_callback' => 'sanitize_text_field'
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
      'button_position' => 'before_add_to_cart_button',
      'animation_style' => 'bounce',
      'is_enabled' => true,
      'font_color' => '#ffffff',
      'font_size' => 16,
      'button_padding' => 12,
      'button_margin' => 10,
      'border_radius' => 6,
      'border_width' => 0,
      'border_color' => '#000000',
      'show_icon' => true,
      'icon_position' => 'left'
    ]);

    return new \WP_REST_Response($settings, 200);
  }

  public function save_button_settings(\WP_REST_Request $request): \WP_REST_Response
  {
    error_log('WPLS API: save_button_settings called');

    try {
      $settings = [
        'button_text'     => sanitize_text_field($request->get_param('button_text')),
        'button_color'    => sanitize_text_field($request->get_param('button_color')),
        'button_position' => sanitize_text_field($request->get_param('button_position')),
        'animation_style' => sanitize_text_field($request->get_param('animation_style')),
        'is_enabled'      => rest_sanitize_boolean($request->get_param('is_enabled')),
        'font_color'      => sanitize_text_field($request->get_param('font_color') ?: '#ffffff'),
        'font_size'       => absint($request->get_param('font_size') ?: 16),
        'button_padding'  => absint($request->get_param('button_padding') ?: 12),
        'button_margin'   => absint($request->get_param('button_margin') ?: 10),
        'border_radius'   => absint($request->get_param('border_radius') ?: 6),
        'border_width'    => absint($request->get_param('border_width') ?: 0),
        'border_color'    => sanitize_text_field($request->get_param('border_color') ?: '#000000'),
        'show_icon'       => rest_sanitize_boolean($request->get_param('show_icon') !== false),
        'icon_position'   => sanitize_text_field($request->get_param('icon_position') ?: 'left')
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
