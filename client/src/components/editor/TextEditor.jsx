import {
  ButtonGroup,
  Container,
  FormControl,
  FormLabel,
  Input,
  Text,
} from '@chakra-ui/react';
import ButtonSolid from '../common/ButtonSolid';
import ButtonOutline from '../common/ButtonOutline';
import { addBlog } from '../../services/lib/blog';
import { useAuth } from '../../hooks/useAuth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import MDEditor from '@uiw/react-md-editor';

const TextEditor = () => {
  const {
    state: { user },
  } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('**Hello world!!!**');
  const navigate = useNavigate();

  const saveBlog = async () => {
    try {
      const data = {
        title,
        description,
        content: value,
      };

      const res = await addBlog(data, user._id);

      console.log(res);

      if (res.status === 200) {
        toast.success('Blog created successfully!');
        navigate('/blogs');
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <Container maxW={'1200px'}>
      <FormControl my='4'>
        <FormLabel>Title</FormLabel>
        <Input
          type='text'
          name='title'
          placeholder='Blog title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </FormControl>
      <FormControl my='4'>
        <FormLabel>Description</FormLabel>
        <Input
          type='text'
          name='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder='Blog description'
        />
      </FormControl>

      <Text fontSize={'md'} mb='2'>
        Content
      </Text>

      <MDEditor
        style={{ minHeight: '280px' }}
        value={value}
        onChange={setValue}
      />

      <ButtonGroup my='4'>
        <ButtonOutline>Cancel</ButtonOutline>
        <ButtonSolid onClick={saveBlog}>Save</ButtonSolid>
      </ButtonGroup>
    </Container>
  );
};

export default TextEditor;
