import { Box, Button, HStack, Image, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import useLongPress from '../hooks/useLongPress'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import { MdClose, MdEdit } from 'react-icons/md'

  

export default function Lead({lead, onClick=() => {}, onDelete=() => {}}) {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const longPressEvent = useLongPress(() => {
        onOpen()
    },() => {}, {shouldPreventDefault: true, delay: 500})

  return (
    <>
        <HStack onClick={() => {
            onOpen()
        }} _hover={{bg: "gray.50"}} px={4} w="100%" py={3} borderBottomWidth={1}>
        <Image src={lead.image} objectFit="cover" minW="64px" boxSize="64px" rounded={"xl"} />
        <Box>
            <Text fontWeight={"bold"}>{lead.title}</Text>
            <Text height={"42px"} lineHeight="1.2" overflow="hidden">{lead.info}</Text>
        </Box>
        </HStack>
        <Modal size="sm" isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent px={0} maxW="256px">
          {/* <ModalCloseButton /> */}
          <ModalBody px={2}>
                <Button onClick={onClick} w="100%" justifyContent={"left"} variant="ghost" leftIcon={<MdEdit size="20px"/>}>Edit</Button>
                <Button onClick={() => {
                    onDelete(lead._id, () => {onClose()})
                }} w="100%" justifyContent={"left"} variant="ghost" leftIcon={<MdClose size="20px"/>}>Delete</Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
