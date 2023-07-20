import { Button } from '@chakra-ui/react';

const ButtonOutline = (props) => {
  return (
    <Button
      {...props}
      borderColor='#5186e0'
      color='#5186e0'
      variant='outline'
      {...props}
    >
      {props?.children}
    </Button>
  );
};

export default ButtonOutline;
