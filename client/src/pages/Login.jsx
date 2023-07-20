import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import ButtonOutline from '../components/common/ButtonOutline';
import ButtonSolid from '../components/common/ButtonSolid';
import Logo from '../components/Logo';
import { useAuth } from '../hooks/useAuth';
import { loginStart, loginSuccess } from '../reducers/authReducers';
import { loginService } from '../services/lib/auth';

const bgImg =
  'url("https://images.pexels.com/photos/4348401/pexels-photo-4348401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")';

const Login = () => {
  const {
    state: { user, loading, error },
    dispatch,
  } = useAuth();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formValues;

  const handlleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await loginService({ email, password });
      dispatch(loginStart(formValues));

      // console.log(res);

      if (res.status === 200) {
        toast.success('Login successful!');
        dispatch(loginSuccess(res?.data?.data));
        navigate('/');
      }
    } catch (err) {
      console.log(err.response);
      toast.error(err.response.data.error);
    }
  };

  const handleGuestLogin = () => {
    setFormValues({
      email: 'din@gmail.com',
      password: '12345',
    });
  };

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  useEffect(() => {
    error && toast.error(error);
  }, [error]);

  return (
    <Flex minH={'100vh'} justifyContent={'center'} alignItems='center'>
      <Box flex={{ base: '1', md: '0.3' }} p='1em 2em'>
        <Logo />
        <Text as={'h2'} mt='1em' fontSize='larger' fontWeight={'bold'}>
          Nice to see you again
        </Text>

        <Box as={'form'} onSubmit={handleFormSubmit} my={'2em'} maxW='420px'>
          {/* email */}
          <FormControl my='4'>
            <FormLabel>Email address</FormLabel>
            <Input
              type='email'
              name='email'
              value={email}
              onChange={handlleInputChange}
              placeholder='Enter your email'
            />
          </FormControl>
          {/* password */}
          <FormControl my='4'>
            <FormLabel>Password</FormLabel>
            <Input
              type='password'
              name='password'
              value={password}
              onChange={handlleInputChange}
              placeholder='Enter your password'
            />
          </FormControl>
          <Link to='/forget-password'>
            <Text color='twitter.600' fontSize={'sm'}>
              Forgot password?
            </Text>
          </Link>

          <ButtonSolid
            type='submit'
            mt='1em'
            w='full'
            isLoading={loading}
            loadingText='Logging in'
          >
            Login
          </ButtonSolid>
          <ButtonOutline
            onClick={handleGuestLogin}
            type='submit'
            mt='1em'
            w='full'
          >
            Login as a guest
          </ButtonOutline>
          <Flex fontSize={'sm'} justifyContent={'center'} gap='6px' my='1em'>
            Don&apos;t have an account?{' '}
            <Link to='/signup'>
              <Text color='twitter.600' fontSize={'sm'}>
                Sign up
              </Text>
            </Link>
          </Flex>
        </Box>

        <Text textAlign={'center'} mt='1em' p='.5em'>
          &copy; CodeTales 2023, All Rights Reserved.
        </Text>
      </Box>
      <Box
        flex={{ sm: '0', md: '0.7' }}
        bgImage={bgImg}
        bgPosition='center'
        bgRepeat='no-repeat'
        h={'100vh'}
      ></Box>
    </Flex>
  );
};
export default Login;
