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
    HStack,
    Spinner,
    Heading,
    Divider,
    Stack,
    Text,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter
} from '@chakra-ui/react'
import { useRef, useState } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';

export default function ProductDetails({ productName, productId }: { productName: string; productId: number }) {
    const [productDetails, setProductDetails] = useState<any>({})
    const [isLoading, setLoading] = useState(true)

    const { isOpen, onOpen, onClose } = useDisclosure()

    function openModal() {
        onOpen()
        axios.get('https://idrus-haerulumam.outsystemscloud.com/JagaWaroeng_API/rest/JagaWaroeng_API/Get_Product', { params: { Request_Id: productId } })
            .then((response: AxiosResponse) => {
                setProductDetails({ ...response.data.Data })
                setLoading(false)

            })
            .catch((error: AxiosError) => {
                setLoading(false)
            })
        // setOpen(true)
    }

    return (
        <>
            <Button colorScheme="orange" variant={'link'} onClick={openModal} > {productName} </Button>
            <Modal isOpen={isOpen} onClose={onClose} size={'4xl'}>
                <ModalOverlay />
                <ModalContent mx={'1em'}>
                    <ModalHeader>{productName}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {isLoading
                            ? <Spinner />
                            : <>
                                <Stack>
                                    <Heading size={'sm'}>{`Rp ${Intl.NumberFormat().format(productDetails.Price)}`}</Heading>
                                    <Text fontSize={'sm'}>{`Stock: ${productDetails.Stock}, Created on: ${productDetails.Created_Date}`} </Text>
                                    <Divider />
                                    <Text size={'sm'}>{productDetails.Product_Description}</Text>
                                </Stack>
                            </>
                        }
                    </ModalBody>

                    <ModalFooter>
                        <HStack>
                            {isLoading ? null : <DeleteDialog productName={productDetails.Product_Name} productId={productDetails.Id} />}
                            <Button px={'2em'} colorScheme='orange' isLoading={isLoading}>Edit</Button>
                            <Button px={'2em'} colorScheme='orange' onClick={onClose}>Close</Button>
                        </HStack>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

function DeleteDialog({ productName, productId }: { productName: string; productId: number }) {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isRequesting, setRequest] = useState(false)
    const cancelRef = useRef(null)

    function deleteProduct() {
        setRequest(true)
        axios.delete('https://idrus-haerulumam.outsystemscloud.com/JagaWaroeng_API/rest/JagaWaroeng_API/Delete_Product', { params: { Id_Product: productId } })
            .then((response: AxiosResponse) => {
                setRequest(false)
                alert(`Response: ${response.status}. ${productName} successfully deleted.`)
                onClose()
            })
            .catch((error: AxiosError) => {
                alert(error)
                setRequest(false)
            })
    }

    return (
        <>
            <Button colorScheme='red' variant={'ghost'} onClick={onOpen}>
                Delete Product
            </Button>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader
                            fontSize={'lg'}
                            fontWeight={'bold'}
                        >
                            Delete Product
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            {`Are your sure to delete ${productName}? You can't undo this action afterwards.`}
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>Cancel</Button>
                            <Button ml={3} colorScheme='red' onClick={deleteProduct} isLoading={isRequesting} >Delete</Button>
                        </AlertDialogFooter>

                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}