import { useState, useEffect } from '@wordpress/element';

const WishlistCounter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Initial count fetch
    fetchWishlistCount();

    // Listen for wishlist updates
    document.addEventListener('wpls_wishlist_updated', fetchWishlistCount);
    return () => document.removeEventListener('wpls_wishlist_updated', fetchWishlistCount);
  }, []);

  const fetchWishlistCount = async () => {
    try {
      // Ensure wpls_data and wpls_data.ajax_url are available
      if (typeof wpls_data === 'undefined' || typeof wpls_data.ajax_url === 'undefined') {
        console.error('wpls_data or wpls_data.ajax_url is not defined.');
        return;
      }

      const response = await fetch(wpls_data.ajax_url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          action: 'wpls_get_wishlist_count',
          nonce: wpls_data.nonce // Ensure wpls_data.nonce is available
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        setCount(data.data.count);
      } else {
        console.error('Failed to fetch wishlist count:', data.data ? data.data.message : 'Unknown error');
      }
    } catch (error) {
      console.error('Error fetching wishlist count:', error);
    }
  };

  if (count === 0 && wpls_data.show_zero_count !== 'yes') { // Assuming you might add this option later
    return null;
  }


  return (
    <a href={wpls_data.wishlist_url || '#'} className="wpls-wishlist-counter">
      <span className="wishlist-icon">♥</span> {/* You can replace this with an SVG or icon font */}
      <span className="count">{count}</span>
    </a>
  );
};

export default WishlistCounter;