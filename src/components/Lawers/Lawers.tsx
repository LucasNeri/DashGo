import { Tr, Checkbox, useBreakpointValue, Td, Box, Button, Icon, Text } from "@chakra-ui/react";
import { RiPencilLine, RiDeleteBin5Line } from "react-icons/ri";
import api from '../../services/api'
import React, { useState } from 'react'
import { DeleteModal } from '../../components/Modal/DeleteModal';

interface ILawer {
    _id: string,
    name: string,
    email: string,
    date: string,
}

interface ILawers {
    lawers: ILawer[],
    loadLawers: (page:any, sortDate: boolean, sortName: boolean) => void
    offset: number,
    pages: number,
    totalLawers: number,
    isSortDate: boolean,
    isSortName: boolean,
}

function formatDate(date) {
    return new Intl.DateTimeFormat('pt-BR').format(new Date(date))
}

export function Lawers({ lawers, loadLawers, offset, totalLawers, isSortDate, isSortName } : ILawers) {

    const [isOpen, setIsOpen] = useState(false)
    const [lawerToDelete, setLawerToDelete] = useState<ILawer>()

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true, 
    })

    async function modalDeleteOpen(lawer : ILawer) {
        setLawerToDelete(lawer)
        setIsOpen(true)
    }

    async function onClose() {
        setIsOpen(false)
    }

    async function deleteLawer(id : string) {
        api.delete(`api/deleteLawer/${id}`).then (() => {
            setIsOpen(false)

            const newTotal =  totalLawers - 1 
            if (newTotal < 11) {
                loadLawers(1, isSortDate, isSortName)
            } else if ( (offset + 1) < totalLawers) {
                loadLawers(offset/10 + 1, isSortDate, isSortName)
            } else {
                loadLawers(offset/10, isSortDate, isSortName)
            }
        })
    }

    return (
        <>
            {
                lawers.map(lawer => (
                    <Tr>
                        <Td>
                            <Box>
                                <Text fontWeight='bold'>{lawer.name}</Text>
                                <Text fontSize='sm' color='gray.300'>{lawer.email}</Text>
                            </Box>
                        </Td>
                        { isWideVersion && <Td>{formatDate(lawer.date)}</Td>}
                        <Td>
                            <Button 
                                as='a' 
                                size='sm' 
                                fontSize='sm' 
                                colorScheme='purple'
                                leftIcon={<Icon as={RiPencilLine} fontSize='16'/>} 
                                href={`/lawers/edit/${lawer._id}`}
                            >
                                { isWideVersion ? 'Editar' : ''}
                            </Button>
                        </Td>
                        <Td>
                            <Button 
                                as='a' 
                                size='sm' 
                                fontSize='sm' 
                                colorScheme='red'
                                leftIcon={<Icon as={RiDeleteBin5Line} fontSize='16'/>} 
                                onClick={() => modalDeleteOpen(lawer)}
                            >
                                { isWideVersion ? 'Excluir' : ''}
                            </Button>
                        </Td>
                    </Tr>
                ))
            }
            <DeleteModal lawer={lawerToDelete} isOpen={isOpen} onClose={onClose} onDelete={deleteLawer}/>
        </>
    )
}