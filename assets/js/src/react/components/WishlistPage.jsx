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

  // Get settings from PHP with all new options
  const settings = typeof wpls_wishlist_data !== 'undefined' && wpls_wishlist_data.page_settings
    ? wpls_wishlist_data.page_settings
    : {
      page_title: 'My Wishlist',
      color_scheme: 'blue',
      show_prices: true,
      show_date_added: true,
      layout_style: 'grid',
      show_product_description: true,
      show_stock_status: true,
      continue_shopping_text: 'Continue Shopping'
    };

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

  // NEW: Render function for individual wishlist items
  const renderWishlistItem = (item) => {
    const isListLayout = settings.layout_style === 'list';

    return (
      <Box
        key={item.id}
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        bg="white"
        shadow="sm"
        _hover={{ shadow: 'md' }}
        transition="all 0.2s"
        p={isListLayout ? 4 : 0}
        display={isListLayout ? 'flex' : 'block'}
        alignItems={isListLayout ? 'center' : 'stretch'}
        gap={isListLayout ? 4 : 0}
        position="relative"
      >
        {/* Remove Button */}
        <IconButton
          icon={<CloseIcon />}
          size="sm"
          position="absolute"
          top={2}
          right={2}
          zIndex={1}
          colorScheme="red"
          variant="solid"
          onClick={() => removeItem(item.id)}
          aria-label="Remove item"
        />

        {/* Product Image */}
        <Box
          flexShrink={0}
          width={isListLayout ? '120px' : 'full'}
          height={isListLayout ? '120px' : '200px'}
        >
          <Image
            src={item.image}
            alt={item.name}
            width="100%"
            height="100%"
            objectFit="cover"
          />
        </Box>

        {/* Product Info */}
        <Box p={isListLayout ? 0 : 4} flex={isListLayout ? 1 : 'none'}>
          <Stack spacing={2}>
            <Heading size={isListLayout ? "sm" : "md"} noOfLines={2}>
              <Link href={item.url} color={`${settings.color_scheme}.600`}>
                {item.name}
              </Link>
            </Heading>

            {/* NEW: Product Description */}
            {settings.show_product_description && item.description && (
              <Text fontSize="sm" color="gray.600" noOfLines={isListLayout ? 1 : 2}>
                {item.description}
              </Text>
            )}

            {/* Price */}
            {settings.show_prices && (
              <Text
                fontSize={isListLayout ? "md" : "lg"}
                fontWeight="bold"
                color={`${settings.color_scheme}.500`}
                dangerouslySetInnerHTML={{ __html: item.price_html }}
              />
            )}

            {/* Date Added */}
            {settings.show_date_added && (
              <Text fontSize="sm" color="gray.500">
                Added: {new Date(item.date_added).toLocaleDateString()}
              </Text>
            )}

            {/* Action Area */}
            <Flex
              justify="space-between"
              align="center"
              mt={2}
              direction={isListLayout ? "row" : "column"}
              gap={2}
            >
              {/* NEW: Stock Status */}
              {settings.show_stock_status && (
                <Badge
                  colorScheme={item.in_stock ? 'green' : 'red'}
                  variant="subtle"
                  width="fit-content"
                >
                  {item.in_stock ? 'In Stock' : 'Out of Stock'}
                </Badge>
              )}

              <Button
                colorScheme={settings.color_scheme}
                size="sm"
                onClick={() => addToCart(item.product_id)}
                isDisabled={!item.in_stock}
                width={isListLayout ? "auto" : "full"}
              >
                Add to Cart
              </Button>
            </Flex>
          </Stack>
        </Box>
      </Box>
    );
  };

  if (loading) {
    return (
      <Flex justify="center" align="center" minH="200px">
        <Spinner size="xl" color={`${settings.color_scheme}.500`} />
      </Flex>
    );
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        {error}
      </Alert>
    );
  }

  return (
    <Box maxW="1200px" mx="auto" p={6}>
      {/* Dynamic page title */}
      <Heading as="h1" size="xl" mb={6} color={`${settings.color_scheme}.600`}>
        {settings.page_title}
      </Heading>

      {items.length === 0 ? (
        <Box textAlign="center" py={10}>
          <Text fontSize="lg" color="gray.500" mb={4}>
            Your wishlist is empty
          </Text>
          <Button
            as={Link}
            href={wpls_wishlist_data.shop_url || '/shop'}
            colorScheme={settings.color_scheme}
            size="lg"
          >
            {settings.continue_shopping_text}
          </Button>
        </Box>
      ) : (
        <>
          <Flex justify="space-between" align="center" mb={6}>
            <Text color="gray.600">
              {items.length} item{items.length !== 1 ? 's' : ''} in your wishlist
            </Text>
            <Button
              onClick={clearWishlist}
              variant="outline"
              colorScheme="red"
              size="sm"
            >
              Clear Wishlist
            </Button>
          </Flex>

          {/* NEW: Dynamic Layout - Grid or List */}
          {settings.layout_style === 'grid' ? (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {items.map(renderWishlistItem)}
            </SimpleGrid>
          ) : (
            <Stack spacing={4}>
              {items.map(renderWishlistItem)}
            </Stack>
          )}

          {/* NEW: Continue Shopping with custom text */}
          <Box mt={8} textAlign="center">
            <Button
              as={Link}
              href={wpls_wishlist_data.shop_url || '/shop'}
              variant="outline"
              colorScheme={settings.color_scheme}
              size="lg"
            >
              {settings.continue_shopping_text}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default WishlistPage;