import { Box, Container } from '@chakra-ui/react'
import React from 'react'

export default function Load() {
return (
<React.Fragment>
  <Container w={'full'} h={'full'} m={'auto'} className='block relative'>
    <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} className=' h-screen'>

      <div className="loading">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

    </Box>
  </Container>
</React.Fragment>

)
}