import { Box, Container, Flex, Spinner, Stack, Text } from '@chakra-ui/react';
import { useEffect } from 'react';

import BlogCardHorizontal from '../components/BlogCardHorizontal';
import Topics from '../components/Topics';
import { useBlogs } from '../hooks/useBlogs';
import {
  getBlogsFailed,
  getBlogsStart,
  getBlogsSuccess,
} from '../reducers/blogReducers';
import { getAllBlogs } from '../services/lib/blog';

const Feed = () => {
  const {
    state: { blogs, loading, error },
    dispatch,
  } = useBlogs();

  useEffect(() => {
    (async () => {
      dispatch(getBlogsStart());
      try {
        let res = await getAllBlogs();

        if (res.status === 200) {
          dispatch(getBlogsSuccess(res.data.data));
        }
      } catch (err) {
        console.log(err.response);
        dispatch(getBlogsFailed(err.response.data.error));
      }
    })();
  }, [dispatch]);

  if (loading) {
    return (
      <Flex
        minH={'full'}
        flexDir='column'
        justifyContent='center'
        alignItems={'center'}
      >
        <Spinner size='lg' />
        <Text my='4'>Fetching blogs...</Text>
      </Flex>
    );
  }

  if (error) {
    return <p>Some error occurred!</p>;
  }

  return (
    <Container maxW={'1200px'} minH={'100vh'} pb='8'>
      <Text fontSize={'xl'} fontWeight='semibold'>
        Recent Blogs
      </Text>

      <Box display={{ base: 'block', sm: 'block', md: 'flex' }} gap='8'>
        <Stack spacing={'4'} my='4' flex={'0.70'}>
          {blogs.map((blog, i) => (
            <BlogCardHorizontal blog={blog} key={i} />
          ))}
        </Stack>
        <Box
          flex='0.3'
          h='fit-content'
          className='sticky sidebar'
          p='4'
          borderRadius='md'
          my='8'
        >
          {/* <Text fontSize={'xl'} fontWeight='semibold'>
            Featured topics
          </Text> */}
          <Topics />
        </Box>
      </Box>
    </Container>
  );
};

export default Feed;
