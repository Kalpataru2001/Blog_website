import {
  Avatar,
  Box,
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

const BlogCard = ({ blog }) => {
  return (
    <Box flex={'0.4'}>
      <Link to={`/blogs/${blog._id}`}>
        {blog?.photo ? (
          <Image
            _hover={{
              filter: 'brightness(0.8)',
            }}
            aspectRatio={'16/9'}
            transition='all 0.3s ease'
            src={blog.photo}
            alt='Green double couch with wooden legs'
            borderRadius='lg'
          />
        ) : (
          <Flex
            aspectRatio={'16/9'}
            p='2em'
            borderRadius={'lg'}
            bgGradient='linear(to-l, #7928CA, #FF0080)'
            justifyContent='center'
            alignItems={'center'}
            color='#fff'
          >
            <Text fontSize='2xl' as='h1' fontWeight={'semibold'}>
              {blog?.title}
            </Text>
          </Flex>
        )}
      </Link>
      <Stack mt='6' spacing='3'>
        <Link to={`/blogs/${blog?._id}`}>
          <Text
            fontSize={{ sm: 'xl', md: '2xl' }}
            _hover={{ color: 'blue.500' }}
            transition='all 0.3s ease'
            fontWeight='semibold'
            my='2'
          >
            {blog?.title}
          </Text>
        </Link>

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

        <Wrap spacing={4} mt='4'>
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
      </Stack>
    </Box>
  );
};

export default BlogCard;
