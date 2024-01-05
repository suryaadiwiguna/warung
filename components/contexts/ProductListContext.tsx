'use client'

import { useContext, useState, createContext, ReactNode, useEffect } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";

const ProductListContext = createContext<any | null>(null)

export function useProductList() {
    const currentProductListContext = useContext(ProductListContext)
    if (currentProductListContext == null) {
        throw new Error(
            "useProductList has to be used within <ProductListProvider>"
        )
    }
    return currentProductListContext
}

export function ProductListProvider({ children }: { children: ReactNode }) {
    const [products, setProducts] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [apiResponse, setApiResponse] = useState<string | null | number>(null)
    const [reloadComponent, setReload] = useState(1)
    const [initialProductList, setInitialProductList] = useState([])

    const productListState = {
        products: products,
        setProducts: setProducts,
        isLoading: isLoading,
        setLoading: setLoading,
        apiResponse: apiResponse,
        setApiResponse: setApiResponse,
        fetch: fetch,
        setReload: reloadHandler,
        getAllProducts: getAllProducts,
        initialProductList: initialProductList
    }

    function reloadHandler() {
        setReload(reloadComponent + 1)
    }

    function getAllProducts() {
        axios.get(String(process.env.GET_PRODUCT_LIST))
            .then((response: AxiosResponse) => {
                setProducts(response.data.data)
                setApiResponse(response.status)
                setLoading(false)
                setInitialProductList(response.data.data)
            })
            .catch((error: AxiosError) => {
                setLoading(false)
                setApiResponse(`${error.message}  ${error.response?.status}`)
            })
    }

    useEffect(() => {
        setLoading(true)
        getAllProducts()
    }, [reloadComponent])

    return (
        <>
            <ProductListContext.Provider value={productListState}>
                {children}
            </ProductListContext.Provider>
        </>
    )
}