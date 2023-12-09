import React, { useState } from 'react';
import { Box, ChakraProvider, extendTheme, Text } from "@chakra-ui/react";
import { HomeIcon, BellIcon, EditIcon } from "@chakra-ui/icons";
import { ImHome3 } from 'react-icons/im';
import {BiTask} from 'react-icons/bi'
import {
  BottomNavigation,
  BottomNavigationItem,
  BottomNavigationIcon,
  BottomNavigationLabel,
  BottomNavigationStyleConfig
} from "chakra-ui-bottom-navigation";

export default function Widget() {
  const [index, setIndex] = useState("value");

  return (
    <div className="block w-full h-full">
      <Box position={'fixed'} className='widget h-16 rounded-lg bg-white left-0 right-0 bottom-2 border-t' display={{
        md : 'none' ,
        sm : 'block'
      }}>
        <BottomNavigation
          value={index}
          onChange={(newIndex) => {
            setIndex(newIndex);
          }}
          colorScheme="white"
          variant="float"
          showLabel="if-active"
          spacing={3}
          display={'flex'}
          alignItems={'center'} // Pusatkan vertikal
          className='border justify-between h-full px-2'
        >
          <BottomNavigationItem className='flex flex-col items-center w-20'> {/* Tambahkan style untuk item */}
            <BottomNavigationIcon as={BiTask} boxSize={6} color={'green.400'} />
            <BottomNavigationLabel as={Text} fontSize="xs">Task</BottomNavigationLabel> {/* Gaya label */}
          </BottomNavigationItem>
          <BottomNavigationItem value="value"  className='flex flex-col items-center w-20 bg-white'>
            <BottomNavigationIcon as={ImHome3} color={'green.400'} boxSize={6}  /> {/* Atur ukuran ikon */}
            <BottomNavigationLabel  as={Text} fontSize="xs">Home</BottomNavigationLabel>
          </BottomNavigationItem>
          <BottomNavigationItem className='flex flex-col w-20 items-center'>
            <BottomNavigationIcon as={BellIcon} color={'green.400'} boxSize={6} />
            <BottomNavigationLabel as={Text} fontSize="xs">Notification</BottomNavigationLabel>
          </BottomNavigationItem>
        </BottomNavigation>
      </Box>
    </div>
  );
}

const theme = extendTheme({
  components: {
    BottomNavigation: BottomNavigationStyleConfig
  }
});
