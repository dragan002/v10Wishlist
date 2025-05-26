import { render } from '@wordpress/element';
import { ChakraProvider } from '@chakra-ui/react';
import WishlistPage from './components/WishlistPage';

// This is the entry point for the wishlist page
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('wpls-wishlist-root');
  if (container) {
    render(
      <ChakraProvider>
        <WishlistPage />
      </ChakraProvider>,
      container
    );
  }
});