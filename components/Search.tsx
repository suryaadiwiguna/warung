'use client'

import { SearchIcon } from "@chakra-ui/icons";
import { Button, Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ChangeEvent, useEffect, useState, KeyboardEvent } from "react";

export default function Search({ searchHandler, emptyHandler, loadingHandler }: { searchHandler: Function, emptyHandler: Function, loadingHandler: Function }) {
    //State management
    const [searchValue, setSearchValue] = useState<string>('')
    const [searchTouched, setSearchTouched] = useState(false)
    const [hasSearched, setHasSearched] = useState(false)

    useEffect(() => {
        console.log(searchValue, searchTouched, hasSearched)
        console.log("Yo")
        if (searchValue == '' && searchTouched && hasSearched) {
            loadingHandler(true)
            emptyHandler()
            setSearchTouched(false)
            setHasSearched(false)
        }
    }, [searchValue])

    //Event handler
    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setSearchTouched(true)
        setSearchValue(event.target.value)
    }
    function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
        if (event.key == "Enter") {
            setHasSearched(true)
            searchProducts()
        }
    }

    //Main Search handler
    function searchProducts() {
        // console.log(searchValue)
        loadingHandler(true)
        setHasSearched(true)
        axios.get(process.env.SEARCH_PRODUCT + searchValue)
            .then((response: AxiosResponse) => {
                console.log(response)
                searchHandler(response.data)
                loadingHandler(false)
            })
            .catch((error: AxiosError) => {
                alert(error)
            })
    }

    return (
        <>
            <InputGroup>
                <InputLeftAddon>
                    <SearchIcon />
                </InputLeftAddon>
                <Input
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    type="search"
                    placeholder="Product name" />
                <Button
                    colorScheme="orange"
                    ml={'1em'}
                    px={'2em'}
                    onClick={searchProducts}
                    isDisabled={!Boolean(searchValue)}
                >
                    Search
                </Button>
            </InputGroup>
        </>
    )
}
