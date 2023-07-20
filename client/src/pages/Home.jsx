import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Featured from '../components/Featured';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import Portfolio from '../components/Portfolio';
import { useAuth } from '../hooks/useAuth';
import Feed from './Feed';

const Home = () => {
  const {
    state: { user },
  } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/blogs');
    }
  }, [user, navigate]);

  return (
    <>
      <Navbar />
      {user ? (
        <Feed />
      ) : (
        <>
          <Hero />
          <Featured />
          <Portfolio />
        </>
      )}
      <Footer />
    </>
  );
};

export default Home;
