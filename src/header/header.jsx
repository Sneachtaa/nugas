import React, { useState ,useEffect } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Icon,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import {useAuth} from '../auth/auth'
import axios from 'axios';
import {FiLogOut} from 'react-icons/fi'

// Import yang sesuai dengan react-icons
import { HiBars3BottomLeft } from "react-icons/hi";
import Swal from "sweetalert2";

const Links = ["Github", "Projects", "About me"];

const NavLink = (props) => {
  const { children } = props;

  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={"#"}
    >
      {children}
    </Box>
  );
};

function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const  { isLoggedIn, setIsLoggedIn } = useAuth();
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isLoggedIn , login , close } = useAuth();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleModalClose = async () => {
    setShowLoginModal(false);
  
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    try {
      const response = await axios.post("http://localhost:28181/login", {
        username: email,
        password: password,
      });
  
      if (response.data.success) {
        Swal.fire("Success", "Login successful", "success");
        localStorage.setItem("isLoggedIn", "true");
        login(); 
      } else {
        Swal.fire("Error", "Invalid username or password", "error");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
  

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    if (storedIsLoggedIn === "true") {
      login()
    }
  }, []);


  return (
    <>
      <Box
       
        bg={useColorModeValue("white", "white")}
        px={0}
        className="navbar"
        top={0}
    
        right={0}
      >
        <Flex
          h={"full"}
          alignItems={"center"}
          justifyContent={"space-between"}
          width={"full"}
          px={{
            base: 4,
            sm: 5,
          }}
          align={"center"}
        >
          <IconButton
            size={"md"}
            icon={
              isOpen ? (
                <CloseIcon zIndex={12} fontSize={16} />
              ) : (
                <HamburgerIcon fontSize={20} />
              )
            }
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
            bg="transparent"
          />
          <HStack w={"w-full"} justifyContent={'center'} className=" h-full flex" spacing={8} alignItems={"center"}>
          
            <HStack
              as={"nav"}
              spacing={6}
              display={{ base: "none", md: "flex" }}
              alignItems={"center"}
            >
             
             {Links.map((link, index) => (
        <NavLink key={link}>
          <h4 className="text-sm">
            {index === 0 && (
              <a href={`https://github.com/Sneachtaa`} target="_blank" rel="noopener noreferrer">
              Github
              </a>
            )}
            {index !== 0 && link}
          </h4>
        </NavLink>
      ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
          {isLoggedIn ? (
              <Menu>
                <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
                  <Avatar size={'sm'} src={'/asset/f.jpg'} />
                </MenuButton>
                <MenuList bg={'white'} width={'40'} py={3}>
                  <MenuItem>Profile</MenuItem>
                  <MenuItem>Link 2</MenuItem>
                  <MenuDivider />
                  <MenuItem>
                  <Box display={'flex'} w={'full'} alignItems={'center'} h={'full'}>
                    <Icon>
                    <FiLogOut/>
                    </Icon>
                    <span>Logout</span>
                    </Box>
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Button
                colorScheme="white"
                color={"white.700"}
                className=" bg-gray-100 border w-20 h-12 "
                onClick={handleLoginClick}
              >
                <h3 className=" font-bold text-neutral-700 text-sm">Masuk</h3>
              </Button>
            )}
          </Flex>
        </Flex>
        {isOpen ? (
          <Box
            pb={4}
            px={3}
            display={{ md: "none" }}
            position={"absolute"}
            width={"full"}
            bg={"white"}
            className="drop h-screen border-t"
          >
            <Stack
              as={"nav"}
              spacing={4}
              px={0}
              py={4}
              height={"full"}
              w={"full"}
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

      {/* Modal Login */}
      <Modal isOpen={showLoginModal} onClose={handleModalClose}>
        <ModalOverlay />
        <ModalContent  position={'absolute'} className="form py-2 top-20 rounded-t-lg rounded-b-none ">
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            
            <FormControl>
              <FormLabel>Email</FormLabel>
             
              <Input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                Isrequired
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                Isrequired
              />
            </FormControl>
         
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleModalClose}>
              Login
            </Button>
          
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Navbar;
