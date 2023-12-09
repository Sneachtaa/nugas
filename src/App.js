import './App.css';
import './index.css';
import { ChakraProvider, Box } from '@chakra-ui/react';
import { isMobile } from 'react-device-detect';
import Home from './home/home';
import Blank from './blank/blank';
import { AuthProvider } from './auth/auth';
import Load from './loading/load';
import { useState, useEffect } from 'react';
import FileUploadDownload from './file/validation';
import Portal from './portal/portal';

export default function App() {
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    // Generate a random timeout value between 3 to 5 seconds (in milliseconds)
    const randomTimeout = Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000;

    // Set a timeout to hide the loading after the random interval
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, randomTimeout);

    return () => {
      // Clear the timeout if the component unmounts before it's fired
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    isMobile ? (
      <ChakraProvider>
        <Box className='block overflow-y-scroll relative w-full h-full m-auto' w={{
          md: 'full',
          sm: 'full'
        }}>
          {loading ? (
            <Load />
          ) : (
            <AuthProvider>
              <section>
             <Home/>
              </section>
            </AuthProvider>
          )}
        </Box>
      </ChakraProvider>
    ) : (
      <Blank />
    )

    // <ChakraProvider>
    //  <AuthProvider>
    //  <Home/>
    //  </AuthProvider>
    // </ChakraProvider>

    

  );
}

