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
    Text,
    FormControl,
    FormLabel,
    FormHelperText,
    FormErrorMessage,
    Input,
    Box,
    Flex,
    Textarea,
    Select,
    Stack
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

export default function AddNewProduct() {

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button colorScheme="orange" leftIcon={<AddIcon />} onClick={onOpen} >New Product </Button>

            <Modal isOpen={isOpen} onClose={onClose} size={'4xl'}>
                <ModalOverlay />
                <ModalContent mx={'1em'}>
                    <ModalHeader>Add New Product</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                        <Stack spacing={3}>
                            <FormControl isRequired>
                                <FormLabel>Product Name</FormLabel>
                                <Input type='text' placeholder='New product name' />
                                <FormErrorMessage>Product name is required.</FormErrorMessage>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Price</FormLabel>
                                <Input type='number' placeholder='The price (number only)' />
                                <FormErrorMessage>Price is required.</FormErrorMessage>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Stock</FormLabel>
                                <Input type='number' placeholder='Stock (number only)' />
                                <FormErrorMessage>Stock is required.</FormErrorMessage>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Product Type</FormLabel>
                                <Select placeholder='Select product type'>
                                    <option value={'MKN'}>Food</option>
                                    <option value={'RKK'}>Cigarette</option>
                                    <option value={'MNM'}>Beverage</option>
                                </Select>
                            </FormControl>
                            <FormControl >
                                <FormLabel>Description</FormLabel>
                                <Textarea placeholder='Product description' />
                            </FormControl>
                        </Stack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='orange' variant={'outline'} mr={3} onClick={onClose}> Close </Button>
                        <Button colorScheme='orange' variant={'solid'} onClick={handleSubmit} type='submit'> Submit </Button>
                    </ModalFooter>

                </ModalContent>
            </Modal>
        </>
    )
}

function NewProductForm() {
    return (
        <>
            <Flex direction={'column'} gap={4}>
                <FormControl isRequired>
                    <FormLabel>Product Name</FormLabel>
                    <Input type='text' placeholder='New product name' />
                    <FormErrorMessage>Product name is required.</FormErrorMessage>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Price</FormLabel>
                    <Input type='number' placeholder='The price (number only)' />
                    <FormErrorMessage>Price is required.</FormErrorMessage>
                </FormControl>
                <FormControl >
                    <FormLabel>Description</FormLabel>
                    <Textarea placeholder='Product description' />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Stock</FormLabel>
                    <Input type='number' placeholder='Stock (number only)' />
                    <FormErrorMessage>Stock is required.</FormErrorMessage>
                </FormControl>
            </Flex>
        </>

    )
}

function handleSubmit() {

}