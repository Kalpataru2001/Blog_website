import { Box, Container, Flex, Grid, Spinner, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import Navbar from '../components/Navbar';
import Topics from '../components/Topics';
import { useBlogs } from '../hooks/useBlogs';
import {
  getBlogsFailed,
  getBlogsStart,
  getBlogsSuccess,
} from '../reducers/blogReducers';
import { getAllBlogs } from '../services/lib/blog';

const Blogs = () => {
  const {
    state: { blogs, loading, error },
    dispatch,
  } = useBlogs();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    (async () => {
      dispatch(getBlogsStart());
      try {
        let res = await getAllBlogs(searchParams.get('category'));

        if (res.status === 200) {
          dispatch(getBlogsSuccess(res.data.data));
        }
      } catch (err) {
        console.log(err.response);
        dispatch(getBlogsFailed(err.response.data.error));
      }
    })();
  }, [dispatch, searchParams]);

  if (loading) {
    return (
      <Flex
        minH={'100vh'}
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
    <Box position={'relative'}>
      <Navbar />
      <Container maxW={'1200px'} minH={'100vh'} pb='8'>
        <Text fontSize={'2xl'} fontWeight='bold'>
          Recent blogs
        </Text>

        <Box display={{ base: 'block', md: 'flex' }} gap='8'>
          <Grid
            templateColumns={{
              base: 'repeat(1,1fr)',
              sm: 'repeat(2,1fr)',
              md: 'repeat(2, 1fr)',
            }}
            gap={6}
            my={'8'}
            flex={{ base: 1, md: '0.7' }}
          >
            {blogs.map((blog, i) => (
              <BlogCard blog={blog} key={i} />
            ))}
          </Grid>
          <Box
            flex='0.3'
            h='fit-content'
            className='sticky sidebar'
            p='4'
            borderRadius='md'
            my='8'
          >
            <Topics />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Blogs;
