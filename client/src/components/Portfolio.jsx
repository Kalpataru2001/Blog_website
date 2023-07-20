import { Button, Flex, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Portfolio = () => {
  return (
    <Flex
      justifyContent={'center'}
      alignItems={'center'}
      flexDir={'column'}
      bgGradient='linear(to-r, blue.500, purple.600)'
      color='#fcfcfc'
      mt='12'
      p='2em'
      py='4em'
      textAlign='center'
    >
      <Text
        as={'h1'}
        fontWeight='bold'
        fontSize={{ base: '3xl', sm: '2xl', md: '4xl' }}
      >
        Integrate CodeTales&apos;s API with your portfolio
      </Text>
      <Text
        as={'p'}
        my='4'
        mb='8'
        color='whiteAlpha.800'
        fontSize={{ sm: 'lg' }}
        maxW='668px'
      >
        Having trouble sharing your blogs in your portfolio? CodeTales provide
        rich APIs which can be integrated with your site.
      </Text>
      <Link to='/posts'>
        <Button
          color={'#5186e0'}
          bg='#fff'
          variant='solid'
          _hover={{
            opacity: 0.9,
          }}
          size='lg'
        >
          View the Docs
        </Button>
      </Link>
    </Flex>
  );
};
export default Portfolio;
