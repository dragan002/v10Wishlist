import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ChakraProvider,
  extendTheme,
  Box,
  Heading,
  Text,
  Alert,
  AlertIcon,
  Flex,
  Grid,
  GridItem,
  Card,
  CardHeader,
  CardBody,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Button,
  ButtonGroup,
  Input,
  FormControl,
  FormLabel,
  Switch,
  Select,
  Textarea,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Badge,
  Avatar,
  AvatarBadge,
  Icon,
  useColorModeValue,
  VStack,
  HStack,
  Spacer,
  Divider,
  Progress,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Tooltip,
  CircularProgress,
  CircularProgressLabel,
  SimpleGrid,
  Skeleton,
  SkeletonText,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Stack,
  Image,
  AspectRatio,
  Center,
  Spinner,
  useColorMode,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  Tag,
  TagLabel,
  TagCloseButton,
  Wrap,
  WrapItem,
  usePrefersReducedMotion
} from '@chakra-ui/react';
import {
  FiSettings,
  FiHeart,
  FiUsers,
  FiTrendingUp,
  FiShoppingCart,
  FiMoon,
  FiSun,
  FiChevronDown,
  FiEdit3,
  FiTrash2,
  FiPlus,
  FiDownload,
  FiUpload,
  FiEye,
  FiBarChart2,
  FiPieChart,
  FiActivity,
  FiGlobe,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiClock,
  FiDollarSign,
  FiPercent,
  FiTarget,
  FiZap,
  FiStar,
  FiAward,
  FiTrendingDown,
  FiRefreshCw,
  FiFilter,
  FiSearch,
  FiMoreVertical,
  FiExternalLink,
  FiCopy,
  FiShare2,
  FiBookmark,
  FiFlag
} from 'react-icons/fi';

// Advanced theme with gradients, animations, and custom components
const theme = extendTheme({
  colors: {
    brand: {
      900: '#0D1B2A',
      800: '#1B263B',
      700: '#415A77',
      600: '#778DA9',
      500: '#E0E1DD',
      400: '#F8F9FA',
      300: '#E9ECEF',
      200: '#DEE2E6',
      100: '#F1F3F4',
      50: '#FFFFFF',
    },
    accent: {
      500: '#FF6B6B',
      400: '#4ECDC4',
      300: '#45B7D1',
      200: '#96CEB4',
      100: '#FFEAA7',
    },
    gradient: {
      primary: 'linear(to-r, #667eea, #764ba2)',
      secondary: 'linear(to-r, #f093fb, #f5576c)',
      success: 'linear(to-r, #4facfe, #00f2fe)',
      warning: 'linear(to-r, #43e97b, #38f9d7)',
    }
  },
  fonts: {
    heading: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    body: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },
  components: {
    Card: {
      baseStyle: {
        container: {
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          borderRadius: '16px',
          border: '1px solid',
          borderColor: 'gray.100',
          transition: 'all 0.2s',
          _hover: {
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          }
        },
      },
      variants: {
        gradient: {
          container: {
            bgGradient: 'linear(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            _hover: {
              transform: 'translateY(-4px)',
            }
          }
        },
        glass: {
          container: {
            bg: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }
        }
      }
    },
    Button: {
      variants: {
        gradient: {
          bgGradient: 'linear(to-r, #667eea, #764ba2)',
          color: 'white',
          _hover: {
            bgGradient: 'linear(to-r, #5a67d8, #6b46c1)',
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          },
          _active: {
            transform: 'translateY(0)',
          }
        },
        glass: {
          bg: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          color: 'white',
          _hover: {
            bg: 'rgba(255, 255, 255, 0.2)',
          }
        }
      }
    }
  },
  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.900' : 'gray.50',
        fontFeatureSettings: '"cv02", "cv03", "cv04", "cv11"',
      }
    })
  }
});

// CSS-in-JS animations (replacing keyframes)
const floatAnimation = {
  animation: 'float 3s ease-in-out infinite',
  '@keyframes float': {
    '0%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-10px)' },
    '100%': { transform: 'translateY(0px)' }
  }
};

const pulseAnimation = {
  animation: 'pulse 2s infinite',
  '@keyframes pulse': {
    '0%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.05)' },
    '100%': { transform: 'scale(1)' }
  }
};

const slideInAnimation = {
  animation: 'slideIn 0.5s ease-out',
  '@keyframes slideIn': {
    'from': { opacity: 0, transform: 'translateX(-20px)' },
    'to': { opacity: 1, transform: 'translateX(0)' }
  }
};

// Mock data for demonstration
const mockWishlistData = [
  { id: 1, product: 'Wireless Headphones', user: 'John Doe', date: '2024-01-15', status: 'active', value: '$299' },
  { id: 2, product: 'Smart Watch', user: 'Jane Smith', date: '2024-01-14', status: 'converted', value: '$199' },
  { id: 3, product: 'Laptop Stand', user: 'Mike Johnson', date: '2024-01-13', status: 'active', value: '$89' },
  { id: 4, product: 'Bluetooth Speaker', user: 'Sarah Wilson', date: '2024-01-12', status: 'expired', value: '$149' },
];

const AdminApp = () => {
  const [buttonText, setButtonText] = useState('Add to Wishlist');
  const [buttonColor, setButtonColor] = useState('#667eea');
  const [isEnabled, setIsEnabled] = useState(true);
  const [sliderValue, setSliderValue] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [buttonPosition, setButtonPosition] = useState('before_cart');
  const [animationStyle, setAnimationStyle] = useState('bounce');
  const [isLoadingSettings, setIsLoadingSettings] = useState(true);
  const [fontColor, setFontColor] = useState('#ffffff');
  const [fontSize, setFontSize] = useState('16');
  const [buttonPadding, setButtonPadding] = useState('12');
  const [buttonMargin, setButtonMargin] = useState('10');
  const [buttonBorderRadius, setButtonBorderRadius] = useState('6');
  const [buttonBorderWidth, setButtonBorderWidth] = useState('0');
  const [buttonBorderColor, setButtonBorderColor] = useState('#000000');
  const [showIcon, setShowIcon] = useState(true);
  const [iconPosition, setIconPosition] = useState('left');

  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure();
  const prefersReducedMotion = usePrefersReducedMotion();

  const { rest_url, nonce, plugin_url } = typeof wplsAdminData !== 'undefined'
    ? wplsAdminData
    : { rest_url: 'N/A', nonce: 'N/A', plugin_url: 'N/A' };

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const animation = prefersReducedMotion ? undefined : slideInAnimation;

  const loadSettings = async () => {
    if (rest_url === 'N/A') return;

    try {
      setIsLoadingSettings(true);
      const response = await fetch(`${rest_url}wpls/v1/button-settings`, {
        method: 'GET',
        headers: {
          'X-WP-Nonce': nonce,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setButtonText(data.button_text || 'Add to Wishlist');
        setButtonColor(data.button_color || '#667eea');
        setButtonPosition(data.button_position || 'before_cart');
        setAnimationStyle(data.animation_style || 'bounce');
        setIsEnabled(data.is_enabled !== false);
        setFontColor(data.font_color || '#ffffff');
        setFontSize(data.font_size || '16');
        setButtonPadding(data.button_padding || '12');
        setButtonMargin(data.button_margin || '10');
        setButtonBorderRadius(data.border_radius || '6');
        setButtonBorderWidth(data.border_width || '0');
        setButtonBorderColor(data.border_color || '#000000');
        setShowIcon(data.show_icon !== false);
        setIconPosition(data.icon_position || 'left');
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
      toast({
        title: 'Failed to load settings',
        description: 'Using default values.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoadingSettings(false);
    }
  };

  const handleSaveSettings = async () => {
    if (rest_url === 'N/A') {
      toast({
        title: 'Cannot save settings',
        description: 'API connection not available.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${rest_url}wpls/v1/button-settings`, {
        method: 'POST',
        headers: {
          'X-WP-Nonce': nonce,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          button_text: buttonText,
          button_color: buttonColor,
          button_position: buttonPosition,
          animation_style: animationStyle,
          is_enabled: isEnabled,
          font_color: fontColor,
          font_size: fontSize,
          button_padding: buttonPadding,
          button_margin: buttonMargin,
          border_radius: buttonBorderRadius,
          border_width: buttonBorderWidth,
          border_color: buttonBorderColor,
          show_icon: showIcon,
          icon_position: iconPosition,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast({
          title: 'Settings saved successfully! 🎉',
          description: 'Your wishlist configuration has been updated.',
          status: 'success',
          duration: 4000,
          isClosable: true,
          position: 'top-right',
        });
      } else {
        throw new Error(data.message || 'Failed to save settings');
      }
    } catch (error) {
      console.error('Save error:', error);
      toast({
        title: 'Failed to save settings',
        description: error.message || 'Please try again.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleBulkAction = (action) => {
    toast({
      title: `Bulk ${action} completed`,
      description: `${selectedItems.length} items processed successfully.`,
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
    setSelectedItems([]);
  };

  return (
    <ChakraProvider theme={theme}>
      <Box minH="100vh" bg={bgColor} sx={prefersReducedMotion ? {} : slideInAnimation}>
        {/* Top Navigation Bar */}
        <Box
          bg={cardBg}
          borderBottom="1px"
          borderColor={borderColor}
          px={6}
          py={4}
          position="sticky"
          top={0}
          zIndex={100}
          backdropFilter="blur(10px)"
          bg={useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(26, 32, 44, 0.8)')}
        >
          <Flex align="center" justify="space-between">
            <HStack spacing={4}>
              <Avatar
                size="sm"
                bg="gradient.primary"
                icon={<Icon as={FiHeart} fontSize="1.2rem" />}
                sx={prefersReducedMotion ? {} : floatAnimation}
              >
                <AvatarBadge boxSize="1em" bg="green.500" />
              </Avatar>
              <Box>
                <Heading size="md" bgGradient="linear(to-r, #667eea, #764ba2)" bgClip="text">
                  Wishlist Pro
                </Heading>
                <Text fontSize="xs" color="gray.500">Advanced Analytics Dashboard</Text>
              </Box>
            </HStack>

            <HStack spacing={3}>
              <Tooltip label="Toggle dark mode">
                <IconButton
                  icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
                  onClick={toggleColorMode}
                  variant="ghost"
                  size="sm"
                />
              </Tooltip>

              <Menu>
                <MenuButton as={Button} size="sm" variant="ghost" rightIcon={<FiChevronDown />}>
                  <Avatar size="xs" name="Admin User" />
                </MenuButton>
                <MenuList>
                  <MenuItem icon={<FiSettings />}>Settings</MenuItem>
                  <MenuItem icon={<FiUsers />}>Profile</MenuItem>
                  <MenuDivider />
                  <MenuItem>Logout</MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          </Flex>
        </Box>

        <Box p={6}>
          {/* Breadcrumb */}
          <Breadcrumb mb={6} fontSize="sm">
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="#">Wishlist Settings</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>

          {/* Hero Section */}
          <Card variant="gradient" mb={8}>
            <CardBody p={8}>
              <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={8} alignItems="center">
                <Box>
                  <Heading size="xl" mb={4} color="white">
                    Welcome to Wishlist Pro Dashboard
                  </Heading>
                  <Text fontSize="lg" mb={6} opacity={0.9}>
                    Manage your wishlist settings, track user engagement, and boost your conversion rates with our advanced analytics.
                  </Text>
                  <ButtonGroup>
                    <Button variant="glass" leftIcon={<FiZap />}>
                      Quick Setup
                    </Button>
                    <Button variant="outline" colorScheme="whiteAlpha" leftIcon={<FiBarChart2 />}>
                      View Reports
                    </Button>
                  </ButtonGroup>
                </Box>
                <Center>
                  <Box
                    sx={prefersReducedMotion ? {} : pulseAnimation}
                    opacity={0.3}
                  >
                    <Icon as={FiHeart} fontSize="120px" color="white" />
                  </Box>
                </Center>
              </Grid>
            </CardBody>
          </Card>

          {/* Status Alert */}
          {rest_url === 'N/A' ? (
            <Alert status="warning" mb={6} borderRadius="lg" variant="left-accent">
              <AlertIcon />
              <Box>
                <Text fontWeight="bold">Connection Issue Detected</Text>
                <Text fontSize="sm">PHP data not found. Please check wp_localize_script configuration.</Text>
              </Box>
            </Alert>
          ) : (
            <Alert status="success" mb={6} borderRadius="lg" variant="left-accent">
              <AlertIcon />
              <Box>
                <Text fontWeight="bold">System Connected Successfully</Text>
                <Text fontSize="sm">All systems operational. React app loaded with Chakra UI.</Text>
              </Box>
            </Alert>
          )}

          {/* Advanced Stats Grid */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
            <Card bg={cardBg} position="relative" overflow="hidden">
              <CardBody>
                <Flex justify="space-between" align="start">
                  <Box>
                    <Text fontSize="sm" color="gray.500" fontWeight="medium">Total Wishlists</Text>
                    <Text fontSize="3xl" fontWeight="bold" color="blue.500">2,847</Text>
                    <HStack spacing={1} mt={2}>
                      <Icon as={FiTrendingUp} color="green.500" />
                      <Text fontSize="sm" color="green.500" fontWeight="medium">+23.5%</Text>
                      <Text fontSize="sm" color="gray.500">vs last month</Text>
                    </HStack>
                  </Box>
                  <CircularProgress value={75} color="blue.500" size="60px">
                    <CircularProgressLabel fontSize="xs">75%</CircularProgressLabel>
                  </CircularProgress>
                </Flex>
                <Box
                  position="absolute"
                  top={0}
                  right={0}
                  w="100px"
                  h="100px"
                  opacity={0.1}
                  bgGradient="radial(circle, blue.500, transparent)"
                />
              </CardBody>
            </Card>

            <Card bg={cardBg} position="relative" overflow="hidden">
              <CardBody>
                <Flex justify="space-between" align="start">
                  <Box>
                    <Text fontSize="sm" color="gray.500" fontWeight="medium">Conversion Rate</Text>
                    <Text fontSize="3xl" fontWeight="bold" color="green.500">18.2%</Text>
                    <HStack spacing={1} mt={2}>
                      <Icon as={FiTrendingUp} color="green.500" />
                      <Text fontSize="sm" color="green.500" fontWeight="medium">+5.2%</Text>
                      <Text fontSize="sm" color="gray.500">vs last week</Text>
                    </HStack>
                  </Box>
                  <CircularProgress value={82} color="green.500" size="60px">
                    <CircularProgressLabel fontSize="xs">82%</CircularProgressLabel>
                  </CircularProgress>
                </Flex>
                <Box
                  position="absolute"
                  top={0}
                  right={0}
                  w="100px"
                  h="100px"
                  opacity={0.1}
                  bgGradient="radial(circle, green.500, transparent)"
                />
              </CardBody>
            </Card>

            <Card bg={cardBg} position="relative" overflow="hidden">
              <CardBody>
                <Flex justify="space-between" align="start">
                  <Box>
                    <Text fontSize="sm" color="gray.500" fontWeight="medium">Revenue Impact</Text>
                    <Text fontSize="3xl" fontWeight="bold" color="purple.500">$24,891</Text>
                    <HStack spacing={1} mt={2}>
                      <Icon as={FiTrendingDown} color="red.500" />
                      <Text fontSize="sm" color="red.500" fontWeight="medium">-2.1%</Text>
                      <Text fontSize="sm" color="gray.500">vs yesterday</Text>
                    </HStack>
                  </Box>
                  <CircularProgress value={65} color="purple.500" size="60px">
                    <CircularProgressLabel fontSize="xs">65%</CircularProgressLabel>
                  </CircularProgress>
                </Flex>
                <Box
                  position="absolute"
                  top={0}
                  right={0}
                  w="100px"
                  h="100px"
                  opacity={0.1}
                  bgGradient="radial(circle, purple.500, transparent)"
                />
              </CardBody>
            </Card>

            <Card bg={cardBg} position="relative" overflow="hidden">
              <CardBody>
                <Flex justify="space-between" align="start">
                  <Box>
                    <Text fontSize="sm" color="gray.500" fontWeight="medium">Active Users</Text>
                    <Text fontSize="3xl" fontWeight="bold" color="orange.500">1,429</Text>
                    <HStack spacing={1} mt={2}>
                      <Icon as={FiTrendingUp} color="green.500" />
                      <Text fontSize="sm" color="green.500" fontWeight="medium">+12.3%</Text>
                      <Text fontSize="sm" color="gray.500">vs last hour</Text>
                    </HStack>
                  </Box>
                  <CircularProgress value={90} color="orange.500" size="60px">
                    <CircularProgressLabel fontSize="xs">90%</CircularProgressLabel>
                  </CircularProgress>
                </Flex>
                <Box
                  position="absolute"
                  top={0}
                  right={0}
                  w="100px"
                  h="100px"
                  opacity={0.1}
                  bgGradient="radial(circle, orange.500, transparent)"
                />
              </CardBody>
            </Card>
          </SimpleGrid>

          {/* Main Content */}
          <Grid templateColumns={{ base: '1fr', xl: '2fr 1fr' }} gap={8}>
            {/* Left Column - Main Settings */}
            <Card bg={cardBg}>
              <CardBody>
                <Tabs variant="soft-rounded" colorScheme="blue">
                  <TabList mb={6} bg={useColorModeValue('gray.100', 'gray.700')} p={1} borderRadius="lg">
                    <Tab _selected={{ bg: 'white', shadow: 'sm' }}>
                      <Icon as={FiSettings} mr={2} />
                      Button Settings
                    </Tab>
                    <Tab _selected={{ bg: 'white', shadow: 'sm' }}>
                      <Icon as={FiBarChart2} mr={2} />
                      Analytics
                    </Tab>
                    <Tab _selected={{ bg: 'white', shadow: 'sm' }}>
                      <Icon as={FiUsers} mr={2} />
                      User Data
                    </Tab>
                  </TabList>

                  <TabPanels>
                    {/* Button Settings Panel */}
                    <TabPanel p={0}>
                      <VStack spacing={8} align="stretch">
                        <Box>
                          <Flex justify="space-between" align="center" mb={6}>
                            <Box>
                              <Heading size="lg" mb={2}>Button Customization</Heading>
                              <Text color="gray.600">Customize the appearance and behavior of your wishlist button</Text>
                            </Box>
                            <Button variant="gradient" leftIcon={<FiEye />} onClick={onOpen}>
                              Live Preview
                            </Button>
                          </Flex>

                          <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={8}>
                            <VStack spacing={6} align="stretch">
                              <FormControl>
                                <FormLabel fontWeight="semibold">Button Text</FormLabel>
                                <Input
                                  value={buttonText}
                                  onChange={(e) => setButtonText(e.target.value)}
                                  placeholder="Enter button text"
                                  size="lg"
                                  borderRadius="lg"
                                />
                              </FormControl>

                              <FormControl>
                                <FormLabel fontWeight="semibold">Button Color</FormLabel>
                                <HStack>
                                  <Input
                                    type="color"
                                    value={buttonColor}
                                    onChange={(e) => setButtonColor(e.target.value)}
                                    w="80px"
                                    h="50px"
                                    borderRadius="lg"
                                    cursor="pointer"
                                  />
                                  <Input
                                    value={buttonColor}
                                    onChange={(e) => setButtonColor(e.target.value)}
                                    placeholder="#667eea"
                                    size="lg"
                                    borderRadius="lg"
                                  />
                                </HStack>
                              </FormControl>

                              <FormControl>
                                <FormLabel fontWeight="semibold">Button Position</FormLabel>
                                <Select
                                  size="lg"
                                  borderRadius="lg"
                                  value={buttonPosition}
                                  onChange={(e) => setButtonPosition(e.target.value)}
                                >
                                  <option value="before_single_product_summary">Before Product Summary</option>
                                  <option value="single_product_summary_5">Product Summary (Early)</option>
                                  <option value="single_product_summary_15">Product Summary (Mid)</option>
                                  <option value="before_add_to_cart_form">Before Add to Cart Form</option>
                                  <option value="before_add_to_cart_button">Left Side of Add to Cart Button</option>
                                  <option value="after_add_to_cart_button">Right Side of Add to Cart Button</option>
                                  <option value="after_add_to_cart_form">After Add to Cart Form</option>
                                </Select>
                              </FormControl>

                              <FormControl>
                                <FormLabel fontWeight="semibold">Animation Style</FormLabel>
                                <RadioGroup
                                  value={animationStyle}
                                  onChange={setAnimationStyle}
                                >
                                  <Stack direction="row" spacing={4}>
                                    <Radio value="bounce">Bounce</Radio>
                                    <Radio value="fade">Fade</Radio>
                                    <Radio value="slide">Slide</Radio>
                                    <Radio value="none">None</Radio>
                                  </Stack>
                                </RadioGroup>
                              </FormControl>

                              <FormControl>
                                <FormLabel fontWeight="semibold">Font Color</FormLabel>
                                <HStack>
                                  <Input
                                    type="color"
                                    value={fontColor}
                                    onChange={(e) => setFontColor(e.target.value)}
                                    w="80px"
                                    h="50px"
                                    borderRadius="lg"
                                    cursor="pointer"
                                  />
                                  <Input
                                    value={fontColor}
                                    onChange={(e) => setFontColor(e.target.value)}
                                    placeholder="#ffffff"
                                    size="lg"
                                    borderRadius="lg"
                                  />
                                </HStack>
                              </FormControl>

                              <FormControl>
                                <FormLabel fontWeight="semibold">Font Size (px)</FormLabel>
                                <NumberInput
                                  value={fontSize}
                                  onChange={(value) => setFontSize(value)}
                                  min={10}
                                  max={32}
                                  size="lg"
                                >
                                  <NumberInputField borderRadius="lg" />
                                  <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                  </NumberInputStepper>
                                </NumberInput>
                              </FormControl>

                              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                                <FormControl>
                                  <FormLabel fontWeight="semibold">Padding (px)</FormLabel>
                                  <NumberInput
                                    value={buttonPadding}
                                    onChange={(value) => setButtonPadding(value)}
                                    min={0}
                                    max={50}
                                    size="lg"
                                  >
                                    <NumberInputField borderRadius="lg" />
                                    <NumberInputStepper>
                                      <NumberIncrementStepper />
                                      <NumberDecrementStepper />
                                    </NumberInputStepper>
                                  </NumberInput>
                                </FormControl>

                                <FormControl>
                                  <FormLabel fontWeight="semibold">Margin (px)</FormLabel>
                                  <NumberInput
                                    value={buttonMargin}
                                    onChange={(value) => setButtonMargin(value)}
                                    min={0}
                                    max={50}
                                    size="lg"
                                  >
                                    <NumberInputField borderRadius="lg" />
                                    <NumberInputStepper>
                                      <NumberIncrementStepper />
                                      <NumberDecrementStepper />
                                    </NumberInputStepper>
                                  </NumberInput>
                                </FormControl>
                              </SimpleGrid>

                              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                                <FormControl>
                                  <FormLabel fontWeight="semibold">Border Radius (px)</FormLabel>
                                  <NumberInput
                                    value={buttonBorderRadius}
                                    onChange={(value) => setButtonBorderRadius(value)}
                                    min={0}
                                    max={50}
                                    size="lg"
                                  >
                                    <NumberInputField borderRadius="lg" />
                                    <NumberInputStepper>
                                      <NumberIncrementStepper />
                                      <NumberDecrementStepper />
                                    </NumberInputStepper>
                                  </NumberInput>
                                </FormControl>

                                <FormControl>
                                  <FormLabel fontWeight="semibold">Border Width (px)</FormLabel>
                                  <NumberInput
                                    value={buttonBorderWidth}
                                    onChange={(value) => setButtonBorderWidth(value)}
                                    min={0}
                                    max={10}
                                    size="lg"
                                  >
                                    <NumberInputField borderRadius="lg" />
                                    <NumberInputStepper>
                                      <NumberIncrementStepper />
                                      <NumberDecrementStepper />
                                    </NumberInputStepper>
                                  </NumberInput>
                                </FormControl>

                                <FormControl>
                                  <FormLabel fontWeight="semibold">Border Color</FormLabel>
                                  <Input
                                    type="color"
                                    value={buttonBorderColor}
                                    onChange={(e) => setButtonBorderColor(e.target.value)}
                                    size="lg"
                                    borderRadius="lg"
                                    cursor="pointer"
                                  />
                                </FormControl>
                              </SimpleGrid>

                              <FormControl>
                                <FormLabel fontWeight="semibold">Icon Settings</FormLabel>
                                <VStack spacing={3} align="stretch">
                                  <Flex justify="space-between" align="center">
                                    <Text>Show Heart Icon</Text>
                                    <Switch
                                      isChecked={showIcon}
                                      onChange={(e) => setShowIcon(e.target.checked)}
                                      colorScheme="blue"
                                      size="lg"
                                    />
                                  </Flex>

                                  {showIcon && (
                                    <FormControl>
                                      <FormLabel fontSize="sm">Icon Position</FormLabel>
                                      <RadioGroup
                                        value={iconPosition}
                                        onChange={setIconPosition}
                                      >
                                        <Stack direction="row" spacing={4}>
                                          <Radio value="left">Left</Radio>
                                          <Radio value="right">Right</Radio>
                                        </Stack>
                                      </RadioGroup>
                                    </FormControl>
                                  )}
                                </VStack>
                              </FormControl>
                            </VStack>

                            <Box>
                              <Text fontWeight="semibold" mb={4}>Live Preview</Text>
                              <Box
                                p={8}
                                border="2px dashed"
                                borderColor="gray.300"
                                borderRadius="xl"
                                bg={useColorModeValue('gray.50', 'gray.700')}
                                textAlign="center"
                              >
                                <Text fontSize="sm" color="gray.500" mb={4}>Product Page Preview</Text>
                                <Button
                                  bg={buttonColor}
                                  color={fontColor}
                                  fontSize={`${fontSize}px`}
                                  padding={`${buttonPadding}px`}
                                  margin={`${buttonMargin}px`}
                                  borderRadius={`${buttonBorderRadius}px`}
                                  border={buttonBorderWidth > 0 ? `${buttonBorderWidth}px solid ${buttonBorderColor}` : 'none'}
                                  leftIcon={showIcon && iconPosition === 'left' ? <FiHeart /> : undefined}
                                  rightIcon={showIcon && iconPosition === 'right' ? <FiHeart /> : undefined}
                                  size="lg"
                                  _hover={{
                                    transform: 'translateY(-2px)',
                                    boxShadow: 'lg',
                                    opacity: 0.9
                                  }}
                                  transition="all 0.2s"
                                  className={`wpls-animation-${animationStyle}`}
                                >
                                  {buttonText}
                                </Button>
                                <Text fontSize="xs" color="gray.400" mt={4}>
                                  This is how your button will appear
                                </Text>
                              </Box>

                              <Box mt={6} p={4} bg={useColorModeValue('blue.50', 'blue.900')} borderRadius="lg">
                                <Text fontSize="sm" fontWeight="semibold" color="blue.600" mb={2}>
                                  💡 Pro Tip
                                </Text>
                                <Text fontSize="sm" color="blue.600">
                                  Use contrasting colors to make your wishlist button stand out and increase click-through rates.
                                </Text>
                              </Box>
                            </Box>
                          </Grid>
                        </Box>

                        <Divider />

                        <Box>
                          <Heading size="md" mb={6}>Advanced Settings</Heading>
                          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                            <FormControl>
                              <Flex justify="space-between" align="center">
                                <FormLabel fontWeight="semibold" mb={0}>Enable Wishlist</FormLabel>
                                <Switch
                                  isChecked={isEnabled}
                                  onChange={(e) => setIsEnabled(e.target.checked)}
                                  colorScheme="blue"
                                  size="lg"
                                />
                              </Flex>
                              <Text fontSize="sm" color="gray.500" mt={1}>
                                Toggle wishlist functionality on/off
                              </Text>
                            </FormControl>

                            <FormControl>
                              <FormLabel fontWeight="semibold">Cache Duration</FormLabel>
                              <NumberInput value={sliderValue} onChange={(value) => setSliderValue(value)} min={5} max={120}>
                                <NumberInputField />
                                <NumberInputStepper>
                                  <NumberIncrementStepper />
                                  <NumberDecrementStepper />
                                </NumberInputStepper>
                              </NumberInput>
                              <Text fontSize="sm" color="gray.500" mt={1}>
                                Cache duration in minutes
                              </Text>
                            </FormControl>
                          </SimpleGrid>
                        </Box>

                        <HStack spacing={4}>
                          <Button
                            variant="gradient"
                            size="lg"
                            leftIcon={isLoading ? <Spinner size="sm" /> : <FiZap />}
                            onClick={handleSaveSettings}
                            isLoading={isLoading}
                            loadingText="Saving..."
                          >
                            Save Settings
                          </Button>
                          <Button variant="outline" size="lg" leftIcon={<FiRefreshCw />}>
                            Reset to Default
                          </Button>
                          <Button variant="ghost" size="lg" leftIcon={<FiDownload />}>
                            Export Config
                          </Button>
                        </HStack>
                      </VStack>
                    </TabPanel>

                    {/* Analytics Panel */}
                    <TabPanel p={0}>
                      <VStack spacing={6} align="stretch">
                        <Heading size="lg">Analytics Overview</Heading>

                        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                          <Stat p={4} bg={useColorModeValue('green.50', 'green.900')} borderRadius="lg">
                            <StatLabel>Wishlist Adds Today</StatLabel>
                            <StatNumber color="green.500">247</StatNumber>
                            <StatHelpText>
                              <StatArrow type="increase" />
                              12% increase
                            </StatHelpText>
                          </Stat>

                          <Stat p={4} bg={useColorModeValue('blue.50', 'blue.900')} borderRadius="lg">
                            <StatLabel>Conversion Rate</StatLabel>
                            <StatNumber color="blue.500">18.2%</StatNumber>
                            <StatHelpText>
                              <StatArrow type="increase" />
                              5% increase
                            </StatHelpText>
                          </Stat>

                          <Stat p={4} bg={useColorModeValue('purple.50', 'purple.900')} borderRadius="lg">
                            <StatLabel>Revenue Generated</StatLabel>
                            <StatNumber color="purple.500">$3,247</StatNumber>
                            <StatHelpText>
                              <StatArrow type="decrease" />
                              2% decrease
                            </StatHelpText>
                          </Stat>
                        </SimpleGrid>

                        <Box h="300px" bg={useColorModeValue('gray.100', 'gray.700')} borderRadius="lg" p={6}>
                          <Center h="full">
                            <VStack>
                              <Icon as={FiBarChart2} fontSize="48px" color="gray.400" />
                              <Text color="gray.500">Analytics Chart Placeholder</Text>
                              <Text fontSize="sm" color="gray.400">Chart.js integration coming soon</Text>
                            </VStack>
                          </Center>
                        </Box>
                      </VStack>
                    </TabPanel>

                    {/* User Data Panel */}
                    <TabPanel p={0}>
                      <VStack spacing={6} align="stretch">
                        <Flex justify="space-between" align="center">
                          <Heading size="lg">Recent Wishlist Activity</Heading>
                          <ButtonGroup size="sm">
                            <Button leftIcon={<FiFilter />} variant="outline">Filter</Button>
                            <Button leftIcon={<FiDownload />} variant="outline">Export</Button>
                          </ButtonGroup>
                        </Flex>

                        <TableContainer>
                          <Table variant="simple">
                            <Thead>
                              <Tr>
                                <Th>Product</Th>
                                <Th>User</Th>
                                <Th>Date Added</Th>
                                <Th>Status</Th>
                                <Th>Value</Th>
                                <Th>Actions</Th>
                              </Tr>
                            </Thead>
                            <Tbody>
                              {mockWishlistData.map((item) => (
                                <Tr key={item.id}>
                                  <Td fontWeight="medium">{item.product}</Td>
                                  <Td>{item.user}</Td>
                                  <Td>{item.date}</Td>
                                  <Td>
                                    <Badge
                                      colorScheme={
                                        item.status === 'active' ? 'green' :
                                          item.status === 'converted' ? 'blue' : 'red'
                                      }
                                    >
                                      {item.status}
                                    </Badge>
                                  </Td>
                                  <Td fontWeight="bold">{item.value}</Td>
                                  <Td>
                                    <Menu>
                                      <MenuButton as={IconButton} icon={<FiMoreVertical />} variant="ghost" size="sm" />
                                      <MenuList>
                                        <MenuItem icon={<FiEye />}>View Details</MenuItem>
                                        <MenuItem icon={<FiEdit3 />}>Edit</MenuItem>
                                        <MenuItem icon={<FiTrash2 />} color="red.500">Delete</MenuItem>
                                      </MenuList>
                                    </Menu>
                                  </Td>
                                </Tr>
                              ))}
                            </Tbody>
                          </Table>
                        </TableContainer>
                      </VStack>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </CardBody>
            </Card>

            {/* Right Column - Quick Actions & Info */}
            <VStack spacing={6} align="stretch">
              {/* Quick Actions */}
              <Card bg={cardBg}>
                <CardHeader>
                  <Heading size="md">Quick Actions</Heading>
                </CardHeader>
                <CardBody pt={0}>
                  <VStack spacing={3}>
                    <Button w="full" leftIcon={<FiPlus />} variant="outline">
                      Create New Campaign
                    </Button>
                    <Button w="full" leftIcon={<FiBarChart2 />} variant="outline">
                      Generate Report
                    </Button>
                    <Button w="full" leftIcon={<FiSettings />} variant="outline" onClick={onDrawerOpen}>
                      Advanced Settings
                    </Button>
                    <Button w="full" leftIcon={<FiUpload />} variant="outline">
                      Import Data
                    </Button>
                  </VStack>
                </CardBody>
              </Card>

              {/* System Status */}
              <Card bg={cardBg}>
                <CardHeader>
                  <Heading size="md">System Status</Heading>
                </CardHeader>
                <CardBody pt={0}>
                  <VStack spacing={4} align="stretch">
                    <HStack justify="space-between">
                      <Text fontSize="sm">API Connection</Text>
                      <Badge colorScheme="green">Online</Badge>
                    </HStack>
                    <HStack justify="space-between">
                      <Text fontSize="sm">Database</Text>
                      <Badge colorScheme="green">Healthy</Badge>
                    </HStack>
                    <HStack justify="space-between">
                      <Text fontSize="sm">Cache</Text>
                      <Badge colorScheme="yellow">Warming</Badge>
                    </HStack>
                    <HStack justify="space-between">
                      <Text fontSize="sm">Last Backup</Text>
                      <Text fontSize="sm" color="gray.500">2 hours ago</Text>
                    </HStack>
                  </VStack>
                </CardBody>
              </Card>

              {/* Recent Activity */}
              <Card bg={cardBg}>
                <CardHeader>
                  <Heading size="md">Recent Activity</Heading>
                </CardHeader>
                <CardBody pt={0}>
                  <VStack spacing={3} align="stretch">
                    {[
                      { action: 'Settings updated', time: '2 min ago', icon: FiSettings },
                      { action: 'New user registered', time: '5 min ago', icon: FiUsers },
                      { action: 'Report generated', time: '1 hour ago', icon: FiBarChart2 },
                      { action: 'Backup completed', time: '2 hours ago', icon: FiDownload },
                    ].map((activity, index) => (
                      <HStack key={index} spacing={3}>
                        <Icon as={activity.icon} color="blue.500" />
                        <Box flex={1}>
                          <Text fontSize="sm" fontWeight="medium">{activity.action}</Text>
                          <Text fontSize="xs" color="gray.500">{activity.time}</Text>
                        </Box>
                      </HStack>
                    ))}
                  </VStack>
                </CardBody>
              </Card>
            </VStack>
          </Grid>

          {/* Live Preview Modal */}
          <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay backdropFilter="blur(10px)" />
            <ModalContent>
              <ModalHeader>Live Button Preview</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <VStack spacing={6}>
                  <Box
                    w="full"
                    p={8}
                    bg={useColorModeValue('gray.50', 'gray.700')}
                    borderRadius="lg"
                    textAlign="center"
                  >
                    <Text fontSize="lg" fontWeight="bold" mb={4}>Product: Wireless Headphones</Text>
                    <Text color="gray.600" mb={6}>$299.99</Text>
                    <Button
                      bg={buttonColor}
                      color={fontColor}
                      fontSize={`${fontSize}px`}
                      padding={`${buttonPadding}px`}
                      margin={`${buttonMargin}px`}
                      borderRadius={`${buttonBorderRadius}px`}
                      border={buttonBorderWidth > 0 ? `${buttonBorderWidth}px solid ${buttonBorderColor}` : 'none'}
                      leftIcon={showIcon && iconPosition === 'left' ? <FiHeart /> : undefined}
                      rightIcon={showIcon && iconPosition === 'right' ? <FiHeart /> : undefined}
                      size="lg"
                      _hover={{
                        transform: 'translateY(-2px)',
                        boxShadow: 'lg',
                        opacity: 0.9
                      }}
                      transition="all 0.2s"
                      className={`wpls-animation-${animationStyle}`}
                    >
                      {buttonText}
                    </Button>
                  </Box>

                  <SimpleGrid columns={2} spacing={4} w="full">
                    <Box textAlign="center" p={4} bg={useColorModeValue('blue.50', 'blue.900')} borderRadius="lg">
                      <Text fontSize="sm" fontWeight="bold" color="blue.600">Desktop View</Text>
                      <Text fontSize="xs" color="blue.500">Optimized for larger screens</Text>
                    </Box>
                    <Box textAlign="center" p={4} bg={useColorModeValue('green.50', 'green.900')} borderRadius="lg">
                      <Text fontSize="sm" fontWeight="bold" color="green.600">Mobile View</Text>
                      <Text fontSize="xs" color="green.500">Responsive design</Text>
                    </Box>
                  </SimpleGrid>
                </VStack>
              </ModalBody>
              <ModalFooter>
                <Button variant="ghost" mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button variant="gradient">Apply Changes</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          {/* Advanced Settings Drawer */}
          <Drawer isOpen={isDrawerOpen} placement="right" onClose={onDrawerClose} size="lg">
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader borderBottomWidth="1px">
                <HStack>
                  <Icon as={FiSettings} />
                  <Text>Advanced Settings</Text>
                </HStack>
              </DrawerHeader>

              <DrawerBody>
                <VStack spacing={8} align="stretch">
                  <Accordion allowMultiple>
                    <AccordionItem>
                      <AccordionButton>
                        <Box flex="1" textAlign="left" fontWeight="semibold">
                          Performance Settings
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                      <AccordionPanel pb={4}>
                        <VStack spacing={4} align="stretch">
                          <FormControl>
                            <FormLabel>Cache Duration (minutes)</FormLabel>
                            <Slider value={sliderValue} onChange={setSliderValue} min={5} max={120}>
                              <SliderTrack>
                                <SliderFilledTrack />
                              </SliderTrack>
                              <SliderThumb />
                            </Slider>
                            <Text fontSize="sm" color="gray.500">{sliderValue} minutes</Text>
                          </FormControl>

                          <FormControl>
                            <Flex justify="space-between" align="center">
                              <FormLabel mb={0}>Enable Lazy Loading</FormLabel>
                              <Switch colorScheme="blue" />
                            </Flex>
                          </FormControl>
                        </VStack>
                      </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem>
                      <AccordionButton>
                        <Box flex="1" textAlign="left" fontWeight="semibold">
                          Security Settings
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                      <AccordionPanel pb={4}>
                        <VStack spacing={4} align="stretch">
                          <FormControl>
                            <Flex justify="space-between" align="center">
                              <FormLabel mb={0}>Enable Rate Limiting</FormLabel>
                              <Switch colorScheme="red" />
                            </Flex>
                            <Text fontSize="sm" color="gray.500">Prevent spam requests</Text>
                          </FormControl>

                          <FormControl>
                            <FormLabel>Max Requests per Hour</FormLabel>
                            <NumberInput defaultValue={100} min={10} max={1000}>
                              <NumberInputField />
                              <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                              </NumberInputStepper>
                            </NumberInput>
                          </FormControl>
                        </VStack>
                      </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem>
                      <AccordionButton>
                        <Box flex="1" textAlign="left" fontWeight="semibold">
                          Email Notifications
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                      <AccordionPanel pb={4}>
                        <VStack spacing={4} align="stretch">
                          <CheckboxGroup>
                            <Stack spacing={3}>
                              <Checkbox>New wishlist items</Checkbox>
                              <Checkbox>Price drop alerts</Checkbox>
                              <Checkbox>Stock availability</Checkbox>
                              <Checkbox>Weekly reports</Checkbox>
                            </Stack>
                          </CheckboxGroup>
                        </VStack>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                </VStack>
              </DrawerBody>

              <DrawerFooter borderTopWidth="1px">
                <Button variant="outline" mr={3} onClick={onDrawerClose}>
                  Cancel
                </Button>
                <Button variant="gradient">Save Changes</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

// Initialize the React app
document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('wpls-admin-root');
  if (container) {
    const root = createRoot(container);
    root.render(<AdminApp />);
  }
});