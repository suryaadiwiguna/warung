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
    Textarea
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
                        <NewProductForm />
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='orange' variant={'outline'} mr={3} onClick={onClose}> Close </Button>
                        <Button colorScheme='orange' variant={'solid'} onClick={onClose} > Submit </Button>
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

function submit() {

}