import { Modal, Button, ModalContent, Text, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, ModalOverlay } from "@chakra-ui/react";
import React, { useState } from 'react'

interface ILawer {
    _id: string,
    name: string,
    email: string,
    date: string,
}

interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDelete: (id : string) => void;
    lawer: ILawer;
}

export function DeleteModal({ isOpen, onClose, onDelete, lawer } : DeleteModalProps) {  

    if (!lawer) {
        return (
            <>
            </>
        )
    }
    return (
        <Modal colorScheme='black' isCentered isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent color='white' bg={"#2D3748"}>
            <ModalHeader>Excluir Cadastro</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Text>Tem certeza que deseja excluir o cadastro?</Text>
                <br></br>
                <Text>Nome: <strong>{lawer.name}</strong></Text>
                <Text>Email: <strong>{lawer.email}</strong></Text>
                <Text>Data: <strong>{lawer.date}</strong></Text>
            </ModalBody>
            <ModalFooter>
                <Button bg='white' color='black' mr={3} onClick={onClose}>
                Cancelar
                </Button>
                <Button colorScheme='red' onClick={() => onDelete(lawer._id)}>Excluir Cadastro</Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    )
}