'use client'

import { Button, Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";

export default function Search() {
    return (
        <>
            <InputGroup>
                <InputLeftAddon>
                    Search:
                </InputLeftAddon>
                <Input type="search" placeholder="Product name" />
                <Button colorScheme="orange" ml={'1em'} px={'2em'}>Search</Button>
            </InputGroup>
        </>
    )
}
