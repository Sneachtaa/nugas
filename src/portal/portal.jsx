import React from 'react'
import Navbar from '../header/header'
import LargeWithNewsletter from '../footer/footer'
import Widget from '../widget/widget';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Container,
    Box,
    Heading,
    Text,
    Button,
    SimpleGrid,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Select,
    FormControl,
    FormLabel,
    Input,
    Stack,
  } from '@chakra-ui/react';
 import Home from '../home/home';
export default function Portal() {
  return (
    <Container className="home relative w-full max-h-screen h-full bg-white mx-0 my-0 ">
        <Box>
            <Navbar/>
            <main>
               <Home/>
            </main>
        </Box>
        <Widget/>
        <LargeWithNewsletter/>
    </Container>
  )
}
