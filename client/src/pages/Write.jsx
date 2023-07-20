import { Box } from '@chakra-ui/react';
import TextEditor from '../components/editor/TextEditor';
import Navbar from '../components/Navbar';

const Write = () => {
  return (
    <Box minH={'100vh'}>
      <Navbar />
      <TextEditor />
    </Box>
  );
};

export default Write;
