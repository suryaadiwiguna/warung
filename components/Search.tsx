'use client'

import { SearchIcon } from "@chakra-ui/icons";
import { Button, Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";

export default function Search() {
    return (
        <>
            <InputGroup>
                <InputLeftAddon>
                    <SearchIcon />
                </InputLeftAddon>
                <Input type="search" placeholder="Product name" />
                <Button colorScheme="orange" ml={'1em'} px={'2em'}>Search</Button>
            </InputGroup>
        </>
    )
}
