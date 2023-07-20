import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Spacer,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import {
  HamburgerIcon,
  MoonIcon,
  Search2Icon,
  SunIcon,
} from '@chakra-ui/icons';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';
import Logo from './Logo';
import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { logout } from '../reducers/authReducers';

const Navbar = () => {
  const {
    state: { user },
    dispatch,
  } = useAuth();
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const handleThemeChange = () => {
    toggleColorMode();
  };

  const handleLogout = () => dispatch(logout());

  const iconColor = useColorModeValue('blackAlpha.800', 'whiteAlpha.800');

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY) {
          // if scroll down hide the navbar
          setShow(false);
        } else {
          // if scroll up show the navbar
          setShow(true);
        }

        // remember current page location to use in the next move
        setLastScrollY(window.scrollY);
      }
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <Box
      className={show ? 'sticky' : ''}
      h='fit-content'
      backdropFilter='auto'
      backdropBlur='8px'
      zIndex={'100'}
    >
      <Container maxW={'1200px'}>
        <Flex py={'1.5em'}>
          <Flex alignItems={'center'} gap='2em'>
            <Link to='/'>
              <Logo />
            </Link>
            {/* links */}
            <Flex
              color={iconColor}
              gap='1em'
              display={{ base: 'none', md: 'none', lg: 'flex' }}
            >
              <Link to='/popular'>
                <Text fontSize={'lg'} p='3'>
                  Popular
                </Text>
              </Link>
              <Link to='/reading-list'>
                <Text fontSize={'lg'} p='3'>
                  Reading list
                </Text>
              </Link>
              <Link to='/topics'>
                <Text fontSize={'lg'} p='3'>
                  Topics
                </Text>
              </Link>
            </Flex>
          </Flex>
          <Spacer />

          <Button
            mr={'.5em'}
            variant={'ghost'}
            display={{ base: 'block', md: 'none' }}
          >
            <Search2Icon color={iconColor} />
          </Button>

          <Button
            ref={btnRef}
            onClick={onOpen}
            display={{ base: 'block', md: 'none' }}
          >
            <HamburgerIcon />
          </Button>

          <Flex
            alignItems={'center'}
            gap='.4em'
            display={{ base: 'none', sm: 'none', md: 'flex' }}
          >
            <Button
              onClick={handleThemeChange}
              color={iconColor}
              variant={'ghost'}
            >
              {colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
            </Button>
            <Button variant={'ghost'}>
              <Search2Icon color={iconColor} />
            </Button>
            {user ? (
              <Avatar
                cursor={'pointer'}
                ref={btnRef}
                onClick={onOpen}
                name='Dan Abrahmov'
                size='sm'
                src='https://bit.ly/dan-abramov'
              />
            ) : (
              <>
                <Link to='/login'>
                  <Button
                    borderColor='#5186e0'
                    color='#5186e0'
                    variant='outline'
                  >
                    Login
                  </Button>
                </Link>
                <Link to='/signup'>
                  <Button
                    borderColor='#5186e0'
                    color={'#fff'}
                    bg='#5186e0'
                    variant='solid'
                    _hover={{
                      bg: '#1246a1',
                      borderColor: '#1246a1',
                    }}
                  >
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </Flex>
        </Flex>
      </Container>

      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
        colorScheme='telegram'
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton mt={'1em'} />
          <DrawerHeader>
            <Link to='/'>
              <Logo />
            </Link>
          </DrawerHeader>

          <DrawerBody>
            <Link to='/blogs'>
              <Text fontSize={'lg'} p='3'>
                Blogs
              </Text>
            </Link>

            <Link to='/reading-list'>
              <Text fontSize={'lg'} p='3'>
                Reading List
              </Text>
            </Link>
            <Link to='/topics'>
              <Text fontSize={'lg'} p='3'>
                Topics
              </Text>
            </Link>
            <Link to='/write'>
              <Text fontSize={'lg'} p='3'>
                Write Articles
              </Text>
            </Link>

            <Link to='/api-docs'>
              <Text fontSize={'lg'} p='3'>
                API Docs
              </Text>
            </Link>
            <Link to='/about'>
              <Text fontSize={'lg'} p='3'>
                About
              </Text>
            </Link>
            <Link to='/contact'>
              <Text fontSize={'lg'} p='3'>
                Contact
              </Text>
            </Link>

            {user ? (
              <Box p='3'>
                <Flex gap='2' mb='4' alignItems={'center'}>
                  <Avatar
                    name='Dan Abrahmov'
                    size='md'
                    src='https://bit.ly/dan-abramov'
                  />
                  <Text fontSize={'lg'}>Profile</Text>
                </Flex>
                <Button
                  width={'100%'}
                  borderColor='#5186e0'
                  color='#5186e0'
                  variant='outline'
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Box>
            ) : (
              <Grid
                templateColumns='repeat(2, 1fr)'
                p='3'
                alignItems={'center'}
                gap={6}
              >
                {' '}
                <Link to='/login'>
                  <Button
                    width={'100%'}
                    borderColor='#5186e0'
                    color='#5186e0'
                    variant='outline'
                  >
                    Login
                  </Button>
                </Link>
                <Link to='/signup'>
                  <Button
                    borderColor='#5186e0'
                    color={'#fff'}
                    bg='#5186e0'
                    variant='solid'
                    _hover={{
                      bg: '#1246a1',
                      borderColor: '#1246a1',
                    }}
                  >
                    Get Started
                  </Button>
                </Link>
              </Grid>
            )}
          </DrawerBody>

          <DrawerFooter>
            <Flex w='full' alignItems={'center'} justifyContent='space-between'>
              <Text>Toggle Theme</Text>
              <Button
                onClick={handleThemeChange}
                color={iconColor}
                variant={'ghost'}
              >
                {colorMode === 'dark' ? <SunIcon /> : <MoonIcon />}
              </Button>
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
export default Navbar;
