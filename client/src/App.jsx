import { Box, useColorModeValue } from '@chakra-ui/react';
import { useLayoutEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

function App() {
  const location = useLocation();
  const bg = useColorModeValue('white', 'blackAlpha.500');

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  return (
    <Box bg={bg}>
      <Outlet />
      <Toaster position='bottom-left' reverseOrder={false} />
    </Box>
  );
}

export default App;
