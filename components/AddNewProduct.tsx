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
import { AddIcon } from '@chakra-ui/icons'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { useProductList } from './contexts/ProductListContext'

export default function AddNewProduct() {
    //State manager
    const { setReload } = useProductList()
    //Modal handler (Chakra UI)
    const { isOpen, onOpen, onClose } = useDisclosure()

    //Formik (Form handler)
    const formik = useFormik({
        initialValues: {
            Product_Name: '',
            Price: '',
            Stock: '',
            Product_Type_Code: '',
            Product_Description: '',
            Created_By: 'Surya'
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
            Product_Type_Code: Yup.string()
                .required("Product type is required"),
            Product_Description: Yup.string()
        }),
        onSubmit: (values, { setSubmitting, resetForm }) => {
            console.log(values)
            axios.post('https://idrus-haerulumam.outsystemscloud.com/JagaWaroeng_API/rest/JagaWaroeng_API/Insert_Product', values)
                .then((res: AxiosResponse) => {
                    alert(res.data.msg)
                    console.log(res)
                    setSubmitting(false)
                    onClose()
                    setReload()
                    resetForm()
                })
                .catch((error: AxiosError) => {
                    alert(error)
                })
        }
    })

    return (
        <>
            <Button colorScheme="orange" leftIcon={<AddIcon />} onClick={onOpen} >New Product </Button>

            <Modal isOpen={isOpen} onClose={onClose} size={'4xl'}>
                <ModalOverlay />
                <ModalContent mx={'1em'}>
                    <ModalHeader>Add New Product</ModalHeader>
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
                                        type='text'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.Price}
                                    />
                                    <FormErrorMessage>{formik.errors.Price} </FormErrorMessage>
                                </FormControl>

                                <FormControl isRequired isInvalid={Boolean(formik.touched.Product_Type_Code && formik.errors.Product_Type_Code)}>
                                    <FormLabel>Product Type</FormLabel>
                                    <Select
                                        placeholder='Select product type'
                                        id='Product_Type_Code'
                                        name='Product_Type_Code'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.Product_Type_Code}
                                    >
                                        <option value={'MKN'}>Food</option>
                                        <option value={'RKK'}>Cigarette</option>
                                        <option value={'MNM'}>Beverage</option>
                                    </Select>
                                    <FormErrorMessage> {formik.errors.Product_Type_Code} </FormErrorMessage>
                                </FormControl>

                                <FormControl isRequired isInvalid={Boolean(formik.touched.Stock && formik.errors.Stock)}>
                                    <FormLabel>Stock</FormLabel>
                                    <Input
                                        id='Stock'
                                        name='Stock'
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
                            <Button px={'2em'} ml={'1em'} colorScheme='orange' type='submit' isLoading={formik.isSubmitting}>Submit</Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal >
        </>
    )
}
