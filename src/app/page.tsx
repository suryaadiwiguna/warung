'use client'
import { Box, Container, Heading, Text } from "@chakra-ui/react"
import List from "../../components/List"
import Search from "../../components/Search"
import { useEffect, useState } from "react"

export default function Home() {

  const [products, setProducts] = useState([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://idrus-haerulumam.outsystemscloud.com/JagaWaroeng_API/rest/JagaWaroeng_API/Get_All_Products')
      .then((res) => {
        if (!res.ok) throw new Error('Something is wrong')
        return res.json()
      })
      .then((data) => {
        console.log(data)
        setProducts(data.data)
        setLoading(false)
      })
      .catch((e) => {
        console.log(e)
        setLoading(false)
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
        {isLoading && products.length == 0 ? <Text textAlign={'center'}>Loading...</Text> :
          <List data={products} field={["Product_Name", "Price", "Product_Description"]} tableHeader={["Product Name", "Price", "Description"]}></List>
        }
        {products.length == 0 && !isLoading ? <Text textAlign={'center'}>No data</Text> : null}
      </Container>
    </main>
  )
}
