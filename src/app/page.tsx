import { Box, Container, Heading } from "@chakra-ui/react"
import List from "../../components/List"
import Search from "../../components/Search"

export default function Home() {

  const data = [
    {
      id: 1,
      name: "Magnum",
      price: 25000,
      description: "Price per-piece",
      createdBy: "Ucup"
    }, {
      id: 2,
      name: "Sampoerna Mild 12",
      price: 32000,
      description: "Price per-box",
      createdBy: "Ucup"
    }
  ]

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
        <List data={data} colName={["name", "price", "description"]}></List>
      </Container>
    </main>
  )
}
