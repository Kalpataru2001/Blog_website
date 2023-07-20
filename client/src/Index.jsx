import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import theme from './theme.js';
import AppRoutes from './routes/AppRoutes.jsx';
import './index.css';

const Index = () => {
  return (
    <ChakraProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <AppRoutes />
    </ChakraProvider>
  );
};

export default Index;
