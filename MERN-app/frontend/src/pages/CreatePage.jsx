import { Box, Button, Container, Heading, useColorModeValue, VStack, Input } from '@chakra-ui/react'
import React, { useState } from 'react'

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: ""
  })

  const handleAddProduct = () => {
    console.log(newProduct);
  }

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>

        <Heading as="h1" size={"2xl"} textAlign={"center"} mb={8}>
          Create New Product
        </Heading>

        <Box w={"full"} bg={useColorModeValue("white", "gray.800")}
          p={6} rounded={"lg"} shadow={"md"}
        >
          <VStack>
            <Input 
              placeholder='New Product'
              name='name'
              value={newProduct.name}
              onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} 
            />
            <Input 
              placeholder='New Price'
              name='price'
              type='number'
              value={newProduct.price}
              onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} 
            />
            <Input 
              placeholder='New Image'
              name='image'
              value={newProduct.image}
              onChange={(e) => setNewProduct({...newProduct, image: e.target.value})} 
            />
          </VStack>

          <Button colorScheme='blue' onClick={handleAddProduct} w='full'>
            Add Product
          </Button>

        </Box>

      </VStack>

    </Container>
  )
}

export default CreatePage