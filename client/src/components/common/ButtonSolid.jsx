import { Button } from '@chakra-ui/react';

const ButtonSolid = (props) => {
  return (
    <Button
      borderColor='#5186e0'
      color={'#fff'}
      bg='#5186e0'
      variant='solid'
      _hover={{
        bg: '#1246a1',
        borderColor: '#1246a1',
      }}
      {...props}
    >
      {props?.children}
    </Button>
  );
};

export default ButtonSolid;
