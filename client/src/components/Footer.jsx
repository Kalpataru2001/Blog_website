import { Box, Container, Flex, Text, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer = () => {
  return (
    <Container maxW={'1200px'} mt='12'>
      <Flex direction={{ base: 'column', sm: 'row' }}>
        <Box flex={0.3}>
          <Link to='/'>
            <Logo />
          </Link>
        </Box>
        <VStack spacing='3' p='4' flex='0.3' align={'left'}>
          <Text as='h2' fontWeight={'semibold'} fontSize='xl'>
            Links
          </Text>
          <Link to='/about'>About</Link>
          <Link to='/about'>Features</Link>
          <Link to='/about'>Contact</Link>
        </VStack>
        <Box flex={0.3}></Box>
      </Flex>
    </Container>
  );
};
export default Footer;
