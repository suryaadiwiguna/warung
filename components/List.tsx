'use client'

import { Table, Tbody, Th, Thead, Tr, Td, Text, TableContainer } from "@chakra-ui/react";
import Link from "next/link";
import { ReactElement } from "react";

export default function List({ data, field, tableHeader }: { data: any[]; field: string[]; tableHeader: string[] }): ReactElement {

    function getRandomNumber() {
        return Math.round(Math.random() * (99999 - 10001))
    }

    return (
        <>
            <TableContainer w={'full'}>
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
                        {data.map((data) => {
                            return (
                                <Tr key={getRandomNumber()}>
                                    {field.map((key) => {
                                        return <Td key={getRandomNumber()}>{
                                            key == field[0] ? <Text color={'orange.500'}> <Link href={`#/${data.id}`}> {data[key]} </Link> </Text> : data[key]
                                        }
                                        </Td>
                                    })}
                                </Tr>
                            )
                        })}

                    </Tbody>
                </Table>
            </TableContainer>
        </>
    )
}
