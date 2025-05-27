<?php

declare(strict_types=1);

namespace WishlistSimple\Core;

if (! defined('ABSPATH')) {
  exit; // Exit if accessed directly.
}

/**
 * Wpls_Loader Class.
 *
 * Autoloader for the plugin's classes.
 */
class Wpls_Loader
{

  private string $base_dir;

  private string $namespace_prefix;

  public function __construct(string $namespace_prefix, string $base_dir)
  {
    $this->namespace_prefix = $namespace_prefix;
    $this->base_dir         = rtrim($base_dir, DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR;
  }

  /**
   * Registers the autoloader with SPL.
   */
  public function register(): void
  {
    spl_autoload_register([$this, 'load_class']);
  }

  /**
   * Loads the class file for a given class name.
   *
   * @param string $class_name The fully-qualified class name.
   */
  public function load_class(string $class_name): void
  {
    // Check if the class uses the registered namespace prefix.
    if (strncmp($this->namespace_prefix, $class_name, strlen($this->namespace_prefix)) !== 0) {
      return; // Not a class from our namespace.
    }

    // Get the relative class name.
    $relative_class = substr($class_name, strlen($this->namespace_prefix));

    // Replace namespace separators with directory separators
    $file_parts = explode('\\', $relative_class);
    $class_name_only = array_pop($file_parts);

    // Convert to WordPress filename format (class-{lowercase-name}.php)
    $class_file_name = 'class-' . strtolower(str_replace('_', '-', $class_name_only)) . '.php';

    // Build directory path (lowercase for directories)
    $sub_path = ! empty($file_parts) ? strtolower(implode(DIRECTORY_SEPARATOR, $file_parts)) . DIRECTORY_SEPARATOR : '';

    $file = $this->base_dir . $sub_path . $class_file_name;

    // If the file exists, require it.
    if (file_exists($file)) {
      require_once $file;
    }
  }
}
