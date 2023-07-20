import {
  Avatar,
  Flex,
  HStack,
  Image,
  Stack,
  Tag,
  Text,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const BlogCardHorizontal = ({ blog }) => {
  return (
    <Flex direction={{ base: 'column', sm: 'row' }} my='2'>
      <Link to={`/blogs/${blog._id}`}>
        {blog?.photo ? (
          <Image
            h={'100%'}
            aspectRatio={'16/9'}
            objectFit='cover'
            maxW={{ base: '100%', sm: '200px' }}
            _hover={{
              filter: 'brightness(0.8)',
            }}
            transition='all 0.3s ease'
            src={blog.photo}
            alt='Caffe Latte'
            borderRadius={'.5rem'}
          />
        ) : (
          <Flex
            aspectRatio={'16/9'}
            // h={{ base: '200px', md: '100%' }}
            h='100%'
            w={{ base: '100%', sm: '200px' }}
            _hover={{
              filter: 'brightness(0.8)',
            }}
            p='1em'
            borderRadius={'.5rem'}
            bgGradient='linear(to-l, #7928CA, #FF0080)'
            justifyContent='center'
            alignItems={'center'}
            color='#fff'
          >
            <Text fontSize='xl' as='h1' fontWeight={'semibold'}>
              {blog.title}
            </Text>
          </Flex>
        )}
      </Link>

      <Stack p={{ sm: '0 1em' }} py={{ base: '1em' }}>
        <Link to={`/blogs/${blog._id}`}>
          <Text
            fontSize={'xl'}
            _hover={{ color: 'blue.500' }}
            transition='all 0.3s ease'
            fontWeight='semibold'
            my='2'
          >
            {blog.title}
          </Text>
        </Link>

        <Wrap spacing={4} my='2'>
          {blog.categories.map((c) => (
            <WrapItem key={c}>
              <Link to={'/topics/' + c}>
                <Tag
                  size={'md'}
                  _hover={{ color: 'blue.400' }}
                  transition='all 0.3s ease'
                  variant='subtle'
                  textTransform={'capitalize'}
                >
                  {c}
                </Tag>
              </Link>
            </WrapItem>
          ))}
        </Wrap>

        <HStack gap='2'>
          <Avatar
            name='Dan Abrahmov'
            size='sm'
            src={blog.userId?.profilePic || 'https://bit.ly/dan-abramov'}
          />

          <Text fontSize={'md'} as='p'>
            <Text as='span' fontWeight={'bold'}>
              {blog.userId?.username}
            </Text>{' '}
            • <Text as='span'>{new Date(blog.createdAt).toDateString()}</Text>
          </Text>
        </HStack>
      </Stack>
    </Flex>
  );
};
export default BlogCardHorizontal;
