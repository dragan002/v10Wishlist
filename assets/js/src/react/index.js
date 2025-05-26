import { render } from '@wordpress/element';
import WishlistCounter from './components/WishlistCounter';

document.addEventListener('DOMContentLoaded', () => {
  // Define an array of potential selectors for the mount point
  const mountPointSelectors = [
    '.site-header-cart', // Common WooCommerce selector
    '.header-cart-wrapper', // Another common one
    '.site-header .secondary-navigation ul', // Storefront theme secondary nav
    '#site-header-menu #primary-menu-list', // Twenty Twenty-One/Two/Three primary menu
    '#site-navigation .menu-main-menu-container > ul', // Generic primary menu
    '#primary-navigation > div > ul', // Another generic primary menu pattern
    'header[role="banner"] .nav-wrapper > ul', // Common header pattern
    'header .main-navigation ul', // Another common navigation pattern
    // Add more selectors if needed for common themes
  ];

  let mountPoint = null;
  for (const selector of mountPointSelectors) {
    mountPoint = document.querySelector(selector);
    if (mountPoint) {
      break; // Found a suitable mount point
    }
  }

  // If no specific mount point is found, try to append to the site header as a fallback
  if (!mountPoint) {
    mountPoint = document.querySelector('.site-header') || document.querySelector('header[role="banner"]');
  }

  // Final fallback: body, if absolutely nothing else is found (less ideal)
  if (!mountPoint) {
    console.warn('Wishlist Counter: Could not find a suitable mount point in the header or navigation. The counter might not be visible.');
    return; // Don't render if no good spot is found
  }

  const container = document.createElement('div');
  container.className = 'wpls-wishlist-counter-container'; // For potential styling

  // Try to prepend or append intelligently if it's a list
  if (mountPoint.tagName === 'UL') {
    const listItem = document.createElement('li');
    listItem.className = 'menu-item wpls-wishlist-counter-menu-item'; // So it looks like a menu item
    listItem.appendChild(container);
    mountPoint.appendChild(listItem); // Append as a new menu item
  } else {
    // For other elements, append directly (e.g., inside a header div)
    mountPoint.appendChild(container);
  }

  render(<WishlistCounter />, container);
});