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
import DrawerExample from './sidebar/sidebar';



export default function App() {
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    const randomTimeout = Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000;


    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, randomTimeout);

    return () => {
      // Clear the timeout if the component unmounts before it's fired
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <ChakraProvider>
  {isMobile ? (
    <div>
     <span>hehe</span>
    </div>
  ) : (
    <div>
      {loading ? (
        <Load />
      ) : (
        <AuthProvider>
          <section className='w-full h-full'>
            <div className='flex flex-row'>
              <DrawerExample />
              <Home />
            </div>
          </section>
        </AuthProvider>
      )}
    </div>
  )}
</ChakraProvider>

  )
}

