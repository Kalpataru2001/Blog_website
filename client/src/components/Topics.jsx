import { Box, Button, Text, Wrap, WrapItem } from '@chakra-ui/react';
import { Link, useSearchParams } from 'react-router-dom';

const topics = ['React', 'JavaScript', 'Node.js', 'CSS'];

const Topics = () => {
  const [searchParams] = useSearchParams();
  return (
    <Box>
      <Text fontSize={'xl'} mb='4'>
        Filter by topics
      </Text>
      <Wrap spacing={4}>
        {topics.map((t) => (
          <WrapItem key={t}>
            <Link to={`/blogs?category=${t}`}>
              <Button
                colorScheme='twitter'
                variant={
                  searchParams.get('category') === t ? 'solid' : 'outline'
                }
              >
                {t}
              </Button>
            </Link>
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );
};
export default Topics;
