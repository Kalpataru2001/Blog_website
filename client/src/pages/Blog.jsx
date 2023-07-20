import {
  AspectRatio,
  Avatar,
  Box,
  Container,
  Flex,
  Image,
  Spinner,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../hooks/useAuth';
import { getBlog, incrementViews } from '../services/lib/blog';
import { Remarkable } from 'remarkable';

const md = new Remarkable();

function renderMarkdownToHTML(markdown) {
  // This is ONLY safe because the output HTML
  // is shown to the same user, and because you
  // trust this Markdown parser to not have bugs.
  const renderedHTML = md.render(markdown);
  return { __html: renderedHTML };
}

const Blog = () => {
  const {
    state: { user },
  } = useAuth();
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const timeColor = useColorModeValue('blackAlpha.800', 'whiteAlpha.800');
  const headingColor = useColorModeValue('blackAlpha.800', 'whiteAlpha.800');
  // const relatedBg = useColorModeValue('gray.100', 'blackAlpha.300');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await getBlog(id);
        setBlog(res.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err.response);
        setIsLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  useEffect(() => {
    if (user)
      (async () => {
        try {
          await incrementViews(id, user._id);
        } catch (err) {
          console.log(err.response);
        }
      })();
  }, [user, id]);

  if (isLoading) {
    return (
      <Flex
        minH={'100vh'}
        flexDir='column'
        justifyContent='center'
        alignItems={'center'}
      >
        <Spinner size='lg' />
        <Text my='4'>Fetching blog...</Text>
      </Flex>
    );
  }

  return (
    <Box>
      <Navbar />
      <Container maxW={'1200px'} minH={'100vh'} mt='8' pb='8'>
        <Flex gap='8' flexDir={{ base: 'column', md: 'row' }}>
          <Box flex={{ base: 1, md: 1 }} maxW='960px' m='auto'>
            <AspectRatio ratio={16 / 9} maxH='360px'>
              {blog?.photo ? (
                <Image
                  src={blog.photo}
                  alt='Green double couch with wooden legs'
                  borderRadius='lg'
                />
              ) : (
                <Flex
                  width={'100%'}
                  aspectRatio={'16/9'}
                  p='2em'
                  borderRadius={'lg'}
                  bgGradient='linear(to-l, #7928CA, #FF0080)'
                  justifyContent='center'
                  alignItems={'center'}
                  textAlign='center'
                >
                  <Text
                    fontSize={{ sm: '3xl', md: '4xl' }}
                    fontWeight={'semibold'}
                    color='#fff'
                  >
                    {blog.title}
                  </Text>
                </Flex>
              )}
            </AspectRatio>
            <Text
              as='h1'
              fontSize={{ base: 'xl', sm: '2xl', md: '4xl' }}
              my='4'
              fontWeight='bold'
              textAlign={'center'}
              color={headingColor}
            >
              {blog.title}
            </Text>
            <Text
              as='h3'
              fontSize={{ base: 'md', sm: 'lg', md: 'xl' }}
              my='4'
              textAlign={'center'}
              color={headingColor}
            >
              {blog.description}
            </Text>

            <Flex
              gap='4'
              my='2'
              mb='8'
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Avatar
                name='Dan Abrahmov'
                size='sm'
                src={blog.userId?.profilePic || 'https://bit.ly/dan-abramov'}
              />

              <Text color={timeColor} as='p' fontSize={'lg'}>
                {blog.userId?.username} •{' '}
                {new Date(blog.createdAt).toDateString()}
              </Text>
            </Flex>

            <Box
              className='blog'
              dangerouslySetInnerHTML={renderMarkdownToHTML(blog.content)}
            ></Box>
          </Box>

          {/* <Box flex='0.3' h='fit-content' className='sticky sidebar'>
            <Box p='4' bg={relatedBg} borderRadius='md' mb='8'>
              <Text fontSize={'xl'}>In this article</Text>
            </Box>
            <Box p='4' bg={relatedBg} borderRadius='md' my='8'>
              <Text fontSize={'xl'}>Related articles</Text>
            </Box>
          </Box> */}
        </Flex>
      </Container>
    </Box>
  );
};

export default Blog;
