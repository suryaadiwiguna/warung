import { Box, Container, Heading } from "@chakra-ui/react"
import List from "../../components/List"
import Search from "../../components/Search"
import AddNewProduct from "../../components/AddNewProduct"
import { ProductListProvider } from "../../components/contexts/ProductListContext"

export default function Home() {

  return (
    <main>
      <Box w={'full'} bg={'orange.500'} color={'white'} py={'1em'} mb={'2em'}>
        <Container maxW={'4xl'}>
          <Heading size={'md'} textAlign={'center'}>Jaga Warung Yow</Heading>
        </Container>
      </Box>
      <ProductListProvider>
        <Container maxW={'4xl'} mb={'1em'}>
          <Search />
        </Container>
        <Container maxW={'4xl'}>
          <List
            field={["Product_Name", "Price", "Product_Description"]}
            tableHeader={["Product Name", "Price", "Description"]}>
          </List>
        </Container>
        <Box position={'fixed'} bottom={{ base: 7, md: 50 }} right={{ base: 7, md: 50 }}>
          <AddNewProduct />
        </Box>
      </ProductListProvider>
    </main>
  )
}
