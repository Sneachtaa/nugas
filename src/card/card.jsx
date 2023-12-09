import React from 'react'
import { Card, CardHeader, CardBody, CardFooter , SimpleGrid } from '@chakra-ui/react'
import {
    Box,
    Heading,
    Container,
    Text,
    Button,
    Stack,
    Icon,
    useColorModeValue,
    createIcon,
  } from '@chakra-ui/react';
  
  
  
export default function Cards() {
    
const Cardx = () => {
    return(
     <Card className='w-32 h-32'>
   <CardBody>
     <Text>Tugas pertemuan ?</Text>
   </CardBody>
 </Card>
    )
 
 }
  return (
    
  <Card  className='card '>
    <CardHeader>
      <Heading size='md'>Tugas Pertemuan 1 </Heading>
    </CardHeader>
    <CardBody>
      <Text>2023-8-28</Text>
    </CardBody>
    <CardFooter>
      <Button>Read more</Button>
    </CardFooter>
  </Card>
 
 

  )
}


