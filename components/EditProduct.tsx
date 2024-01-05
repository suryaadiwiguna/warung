'use client'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    Textarea,
    Select,
    Stack,
} from '@chakra-ui/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { useProductList } from './contexts/ProductListContext'

type ProductData = {
    Id: number,
    Product_Name: string,
    Price: number,
    Stock: number,
    Product_Type_Code: string | number,
    Product_Description: string,
    Created_By: string
}

export default function EditProduct({ productData, isLoading, successHandler }: { productData: ProductData, isLoading: boolean, successHandler: Function }) {

    const { Id, Product_Name, Price, Stock, Product_Type_Code, Product_Description } = productData;
    const { setReload } = useProductList()
    //Modal handler (Chakra UI)
    const { isOpen, onOpen, onClose } = useDisclosure()

    //Formik (Form handler)
    const formik = useFormik({
        initialValues: {
            Id: 0,
            Product_Name: '',
            Price: 0,
            Stock: 0,
            Product_Type: '',
            Product_Description: '',
            Updated_By: ''
        },
        validationSchema: Yup.object({
            Product_Name: Yup.string()
                .min(2, "Must be at least 2 characters")
                .required("Product name is required"),
            Price: Yup.number()
                .positive()
                .moreThan(0)
                .required("Price is required"),
            Stock: Yup.number()
                .required('Stock is required'),
            Product_Type: Yup.string()
                .required("Product type is required"),
            Product_Description: Yup.string()
        }),
        onSubmit: (values, { setSubmitting }) => {
            // setSubmitting(false)
            axios.put(String(process.env.UPDATE_PRODUCT), values)
                .then((res: AxiosResponse) => {
                    alert(res.data.msg)
                    setSubmitting(false)
                    setReload()
                    onClose()
                    successHandler()
                })
                .catch((error: AxiosError) => {
                    alert(error)
                    setSubmitting(false)
                })
        }
    })

    function openModal() {
        onOpen()
        formik.values.Id = Id;
        formik.values.Product_Name = Product_Name;
        formik.values.Price = Price;
        formik.values.Stock = Stock;
        // formik.values.Product_Type_Code = Product_Type_Code;
        formik.values.Product_Description = Product_Description;
        formik.values.Updated_By = 'Surya';
    }

    return (
        <>
            <Button colorScheme="orange" onClick={openModal} isDisabled={isLoading} >Edit </Button>

            <Modal isOpen={isOpen} onClose={onClose} size={'4xl'}>
                <ModalOverlay />
                <ModalContent mx={'1em'}>
                    <ModalHeader>Edit Product</ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={formik.handleSubmit}>
                        <ModalBody>
                            <Stack spacing={3}>
                                <FormControl isRequired isInvalid={Boolean(formik.touched.Product_Name && formik.errors.Product_Name)}>
                                    <FormLabel htmlFor='Product_Name'>Product Name</FormLabel>
                                    <Input
                                        id='Product_Name'
                                        name='Product_Name'
                                        type='text'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.Product_Name}
                                    />
                                    <FormErrorMessage>{formik.errors.Product_Name}</FormErrorMessage>
                                </FormControl>

                                <FormControl isRequired isInvalid={Boolean(formik.touched.Price && formik.errors.Price)}>
                                    <FormLabel htmlFor='Price'>Price</FormLabel>
                                    <Input
                                        id='Price'
                                        name='Price'
                                        type='number'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.Price}
                                    />
                                    <FormErrorMessage>{formik.errors.Price} </FormErrorMessage>
                                </FormControl>

                                <FormControl isRequired isInvalid={Boolean(formik.touched.Product_Type && formik.errors.Product_Type)}>
                                    <FormLabel>Product Type</FormLabel>
                                    <Select
                                        placeholder='Select product type'
                                        id='Product_Type'
                                        name='Product_Type'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.Product_Type}
                                    >
                                        <option value={1}>Food</option>
                                        <option value={2}>Cigarette</option>
                                        <option value={3}>Beverage</option>
                                    </Select>
                                    <FormErrorMessage> {formik.errors.Product_Type} </FormErrorMessage>
                                </FormControl>

                                <FormControl isRequired isInvalid={Boolean(formik.touched.Stock && formik.errors.Stock)}>
                                    <FormLabel>Stock</FormLabel>
                                    <Input
                                        id='Stock'
                                        name='Stock'
                                        type='number'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.Stock}
                                    />
                                    <FormErrorMessage> {formik.errors.Stock} </FormErrorMessage>
                                </FormControl>
                                <FormControl isInvalid={Boolean(formik.touched.Product_Description && formik.errors.Product_Description)}>
                                    <FormLabel>Description</FormLabel>
                                    <Textarea
                                        id='Product_Description'
                                        name='Product_Description'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.Product_Description}
                                    />
                                </FormControl>
                            </Stack>
                        </ModalBody>

                        <ModalFooter>
                            <Button px={'2em'} onClick={onClose}>Cancel</Button>
                            <Button
                                px={'2em'} ml={'1em'} colorScheme='orange' type='submit'
                                isLoading={formik.isSubmitting}
                                isDisabled={
                                    formik.values.Product_Name == Product_Name &&
                                    formik.values.Price == Price &&
                                    formik.values.Stock == Stock &&
                                    (formik.values.Product_Type == '' || formik.values.Product_Type == Product_Type_Code) &&
                                    formik.values.Product_Description == Product_Description
                                }
                            >
                                Submit
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal >

        </>
    )
}
