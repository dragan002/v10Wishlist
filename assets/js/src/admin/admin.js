import React from 'react';
import { createRoot } from 'react-dom/client'; // New way to import createRoot for React 18+
import { ChakraProvider, extendTheme, Box, Heading, Text, Alert, AlertIcon } from '@chakra-ui/react';

// 1. Optional: Extend the theme if you have specific brand colors or styles
const theme = extendTheme({
  colors: {
    brand: {
      900: '#1a365d', // Dark blue
      800: '#153e75',
      700: '#2a69ac', // Primary blue
      50: '#e6f0ff', // Light blue for backgrounds or highlights
    },
    // You can also customize other theme aspects like fonts, breakpoints, etc.
  },
  // Example: Setting a global style for the body (though generally less needed with Chakra)
  // styles: {
  //   global: {
  //     body: {
  //       bg: 'gray.50', // A light gray background for the admin page
  //     },
  //   },
  // },
});

// 2. Main App component
const App = () => {
  // Access data passed from PHP via wp_localize_script
  const { rest_url, nonce } = typeof wplsAdminData !== 'undefined' ? wplsAdminData : { rest_url: 'N/A', nonce: 'N/A' };

  return (
    <Box p={6} borderWidth="1px" borderRadius="lg" boxShadow="md" bg="white">
      <Heading as="h1" size="lg" mb={6} color="brand.700">
        Wishlist Simple Settings
      </Heading>

      {rest_url === 'N/A' ? (
        <Alert status="warning" mb={4}>
          <AlertIcon />
          PHP data (wplsAdminData) not found. Ensure wp_localize_script is working.
        </Alert>
      ) : (
        <Alert status="success" mb={4} variant="subtle">
          <AlertIcon />
          React app loaded successfully with Chakra UI!
        </Alert>
      )}

      <Box mb={4} p={4} borderWidth="1px" borderRadius="md" bg="gray.50">
        <Heading as="h4" size="sm" mb={2}>Developer Info:</Heading>
        <Text fontSize="sm"><strong>REST API URL:</strong> {rest_url}</Text>
        <Text fontSize="sm"><strong>Nonce:</strong> {nonce ? 'Available' : 'Not Available'}</Text>
        <Text fontSize="sm"><strong>Plugin URL (from PHP):</strong> {typeof wplsAdminData !== 'undefined' && wplsAdminData.plugin_url ? wplsAdminData.plugin_url : 'N/A'}</Text>
      </Box>

      <Text>
        This is the main container for the Wishlist Simple plugin settings.
        We will build the settings form here using Chakra UI components.
      </Text>
      {/* Future settings form components will go here */}
    </Box>
  );
};

// 3. Render the App component into the DOM
// Ensure the DOM is fully loaded before trying to find the root element.
document.addEventListener('DOMContentLoaded', () => {
  const rootEl = document.getElementById('wpls-admin-app-root');
  if (rootEl) {
    const root = createRoot(rootEl); // Create a root.
    root.render(
      <React.StrictMode>
        <ChakraProvider theme={theme}>
          <App />
        </ChakraProvider>
      </React.StrictMode>
    );
  } else {
    console.error("WPLS Error: Could not find the root element '#wpls-admin-app-root'. Ensure it exists in your admin page HTML.");
  }
});
