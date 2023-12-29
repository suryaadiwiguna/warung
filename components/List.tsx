'use client'

import { Table, Tbody, Th, Thead, Tr, Td, Text, TableContainer } from "@chakra-ui/react";
import Link from "next/link";
import { ReactElement } from "react";

export default function List({ data, colName }: { data: any[]; colName: string[] }): ReactElement {

    function getRandomNumber() {
        return Math.round(Math.random() * (99999 - 10001))
    }

    return (
        <>
            <TableContainer>
                <Table >
                    <Thead >
                        <Tr >
                            {colName.map((key) => {
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
                                    {colName.map((key) => {
                                        return <Td key={getRandomNumber()}>{
                                            key == colName[0] ? <Text color={'blue'}> <Link href={`#/${data.id}`}> {data[key]} </Link> </Text> : data[key]
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
