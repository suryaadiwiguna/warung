'use client'
import { Box, Container, Flex, Heading, Spinner, Text } from "@chakra-ui/react"
import List from "../../components/List"
import Search from "../../components/Search"
import { useEffect, useState } from "react"
import axios, { AxiosError, AxiosResponse } from "axios"
import AddNewProduct from "../../components/AddNewProduct"

export default function Home() {

  const [products, setProducts] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [apiResponse, setApiResponse] = useState<string | null | number>(null)

  useEffect(() => {
    axios.get(String(process.env.GET_PRODUCT_LIST))
      .then((response: AxiosResponse) => {
        setProducts(response.data.data)
        setApiResponse(response.status)
        setLoading(false)

      })
      .catch((error: AxiosError) => {
        setLoading(false)
        setApiResponse(`${error.message}  ${error.response?.status}`)
        console.log(error)
      })
  }, [])

  return (
    <main>
      <Box w={'full'} bg={'orange.500'} color={'white'} py={'1em'} mb={'2em'}>
        <Container maxW={'4xl'}>
          <Heading size={'md'} textAlign={'center'}>Jaga Warung Yow</Heading>
        </Container>
      </Box>
      <Container maxW={'4xl'} mb={'1em'}>
        <Search />
      </Container>
      <Container maxW={'4xl'}>
        <Flex justifyContent={'center'} minH={'20em'} alignItems={'center'}>
          {isLoading && products.length == 0 ? <Spinner /> :
            <List data={products} field={["Product_Name", "Price", "Product_Description"]} tableHeader={["Product Name", "Price", "Description"]}></List>
          }
          {products.length == 0 && !isLoading ? <Text textAlign={'center'}>{apiResponse}</Text> : null}
        </Flex>
      </Container>
      <Box position={'fixed'} bottom={{ base: 7, md: 50 }} right={{ base: 7, md: 50 }}>
        <AddNewProduct />
      </Box>
    </main>
  )
}
