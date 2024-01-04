import { Table, Tbody, Th, Thead, Tr, Td, TableContainer, Spinner, Center } from "@chakra-ui/react";
import { ReactElement } from "react";
import ProductDetails from "./ProductDetails";
import { useProductList } from "./contexts/ProductListContext";

export default function List({ field, tableHeader }: { field: string[]; tableHeader: string[] }): ReactElement {
    const productList = useProductList()
    const { products, isLoading, apiResponse }: { products: any[], isLoading: boolean, apiResponse: string | number } = productList

    function getRandomNumber() {
        return Math.round(Math.random() * (99999 - 10001))
    }

    return (
        <>
            {isLoading
                ? <Center><Spinner /></Center>
                : <TableContainer w={'full'}>
                    <Table >
                        <Thead >
                            <Tr >
                                {tableHeader.map((key) => {
                                    return (
                                        <Th key={getRandomNumber()}>{key}</Th>
                                    )
                                })}
                            </Tr>
                        </Thead>
                        <Tbody >
                            {products.map((products) => {
                                return (
                                    <Tr key={getRandomNumber()}>
                                        {field.map((key) => {
                                            return <Td key={getRandomNumber()}>{
                                                key == field[0]
                                                    ? <ProductDetails
                                                        productName={products[key]}
                                                        productId={products.Id}
                                                    />
                                                    : products[key]
                                            }
                                            </Td>
                                        })}
                                    </Tr>
                                )
                            })}

                        </Tbody>
                    </Table>
                </TableContainer>
            }
        </>
    )
}
