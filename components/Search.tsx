'use client'

import { SearchIcon } from "@chakra-ui/icons";
import { Button, Input, InputGroup, InputLeftAddon } from "@chakra-ui/react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ChangeEvent, useState, KeyboardEvent, useEffect } from "react";
import { useProductList } from "./contexts/ProductListContext";

export default function Search() {
    //State management
    const [searchValue, setSearchValue] = useState<string>('')
    const [searchTouched, setSearchTouched] = useState(false)
    const [hasSearched, setHasSearched] = useState(false)
    const productList = useProductList()

    useEffect(() => {
        if (searchValue == '' && searchTouched && hasSearched) {
            productList.setProducts(productList.initialProductList)
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
        if (event.key == "Enter" && searchValue) {
            setHasSearched(true)
            searchProducts()
        }
    }

    function searchProducts() {
        productList.setLoading(true)
        setHasSearched(true)
        axios.get(process.env.SEARCH_PRODUCT + searchValue)
            .then((response: AxiosResponse) => {
                productList.setProducts(response.data)
                productList.setLoading(false)
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
                    isDisabled={!searchValue}
                >
                    Search
                </Button>
            </InputGroup>
        </>
    )
}
