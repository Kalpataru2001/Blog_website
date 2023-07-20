import { Container, Flex, Spinner, Stack, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useBlogs } from '../hooks/useBlogs';
import {
  getBlogsFailed,
  getBlogsStart,
  getBlogsSuccess,
} from '../reducers/blogReducers';
import { getAllBlogs } from '../services/lib/blog';
import BlogCard from './BlogCard';
import BlogCardHorizontal from './BlogCardHorizontal';

const Featured = () => {
  const {
    state: { blogs, loading, error },
    dispatch,
  } = useBlogs();

  useEffect(() => {
    const getBlogs = async () => {
      try {
        dispatch(getBlogsStart());
        let res = await getAllBlogs();

        if (res.status === 200) {
          dispatch(getBlogsSuccess(res.data.data));
        }
      } catch (err) {
        console.log(err.response);
        dispatch(getBlogsFailed(err.response.data.error));
      }
    };
    getBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    <Container maxWidth={'1200px'} my='12'>
      <Text as={'h1'} my='8' fontWeight='semibold' fontSize={'2xl'}>
        Featured Posts
      </Text>
      <Flex gap='2em' direction={{ base: 'column', md: 'row' }}>
        {blogs.length !== 0 ? (
          <>
            <BlogCard blog={blogs[0]} />

            <Stack spacing={'4'} flex={'0.6'}>
              {blogs.map((blog) => (
                <BlogCardHorizontal blog={blog} key={blog._id} />
              ))}
            </Stack>
          </>
        ) : (
          <>No Blogs Found</>
        )}
      </Flex>
    </Container>
  );
};
export default Featured;
