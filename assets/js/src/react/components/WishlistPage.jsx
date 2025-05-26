import { useState, useEffect } from '@wordpress/element';
import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Spinner,
  Alert,
  AlertIcon,
  Button,
  Flex,
  Link,
  Image,
  Stack,
  useToast,
  Badge,
  IconButton
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

const WishlistPage = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();

  useEffect(() => {
    fetchWishlistItems();
  }, []);

  const fetchWishlistItems = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${wpls_wishlist_data.ajax_url}?action=wpls_get_wishlist_items&nonce=${wpls_wishlist_data.nonce}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch wishlist items');
      }

      const data = await response.json();

      if (data.success) {
        setItems(data.data);
      } else {
        setError(data.data.message || 'Error loading wishlist');
      }
    } catch (err) {
      setError('Error loading wishlist data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId) => {
    try {
      setLoading(true);

      const response = await fetch(
        `${wpls_wishlist_data.ajax_url}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            action: 'wpls_add_to_cart_from_wishlist',
            product_id: productId,
            nonce: wpls_wishlist_data.nonce
          })
        }
      );

      const data = await response.json();

      if (data.success) {
        toast({
          title: 'Added to cart',
          description: data.data.message,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        throw new Error(data.data.message || 'Failed to add to cart');
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: err.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (itemId) => {
    try {
      const response = await fetch(
        `${wpls_wishlist_data.ajax_url}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            action: 'wpls_remove_from_wishlist',
            item_id: itemId,
            nonce: wpls_wishlist_data.nonce
          })
        }
      );

      if (!response.ok) {
        throw new Error('Failed to remove item');
      }

      const data = await response.json();

      if (data.success) {
        setItems(items.filter(item => item.id !== itemId));

        toast({
          title: 'Item removed',
          status: 'success',
          duration: 2000,
        });
      } else {
        throw new Error(data.data.message || 'Failed to remove item');
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: err.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const clearWishlist = async () => {
    if (!window.confirm('Are you sure you want to clear your wishlist?')) {
      return;
    }

    try {
      const response = await fetch(
        `${wpls_wishlist_data.ajax_url}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            action: 'wpls_clear_wishlist',
            nonce: wpls_wishlist_data.nonce
          })
        }
      );

      if (!response.ok) {
        throw new Error('Failed to clear wishlist');
      }

      const data = await response.json();

      if (data.success) {
        setItems([]);

        toast({
          title: 'Wishlist cleared',
          status: 'success',
          duration: 2000,
        });
      } else {
        throw new Error(data.data.message || 'Failed to clear wishlist');
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: err.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" minH="200px">
        <Spinner size="xl" color="blue.500" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Alert status="error" borderRadius="md">
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  if (items.length === 0) {
    return (
      <Box textAlign="center" py={10}>
        <Text mb={4}>Your wishlist is empty.</Text>
        <Button
          as="a"
          href={wpls_wishlist_data.shop_url}
          colorScheme="blue"
        >
          Browse Products
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Box mb={6}>
        <Flex justify="space-between" align="center">
          {items.length > 0 && (
            <Button
              colorScheme="red"
              variant="outline"
              onClick={clearWishlist}
            >
              Clear Wishlist
            </Button>
          )}
        </Flex>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {items.map((item) => (
          <Box
            key={item.id}
            borderWidth="1px"
            borderRadius="lg"
            p={4}
            transition="all 0.3s"
            _hover={{ transform: "translateY(-4px)", boxShadow: "lg" }}
          >
            <Box overflow="hidden" borderRadius="md" mb={3}>
              <Image
                src={item.image}
                alt={item.name}
                transition="0.3s ease"
                _hover={{ transform: "scale(1.05)" }}
              />
            </Box>

            <Heading size="md" my={2} noOfLines={2}>
              {item.name}
            </Heading>

            <Box
              dangerouslySetInnerHTML={{ __html: item.price_html }}
              mb={3}
            />

            <Box
              position="absolute"
              top={2}
              right={2}
              zIndex={2}
            >
              <IconButton
                aria-label="Remove from wishlist"
                icon={<CloseIcon />}
                size="sm"
                borderRadius="full"
                colorScheme="gray"
                onClick={() => removeItem(item.id)}
              />
            </Box>

            <Button
              colorScheme="red"
              size="lg"
              width="full"
              onClick={() => addToCart(item.product_id)}
              _hover={{ transform: "scale(1.03)" }}
            >
              Add to Cart
            </Button>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default WishlistPage;