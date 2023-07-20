import { Flex, Text, useColorMode } from '@chakra-ui/react';
import darkLogo from '../assets/dark-logo.svg';
import lightLogo from '../assets/light-logo.svg';

const Logo = () => {
  const { colorMode } = useColorMode();
  return (
    <Flex alignItems={'center'} gap='1.5'>
      <img
        width={'48px'}
        height={'48px'}
        src={colorMode !== 'dark' ? darkLogo : lightLogo}
        alt='logo'
      />
      <Text fontSize={'2xl'} fontWeight='semibold'>
        CodeTales
      </Text>
    </Flex>
  );
};
export default Logo;
