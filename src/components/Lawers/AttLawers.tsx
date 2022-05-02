import { Tr, Checkbox, useBreakpointValue, Td, Box, Button, Icon, Text } from "@chakra-ui/react";
import React, { useState } from 'react'

interface ILawer {
    _id: string,
    name: string,
    email: string,
    date: string,
}

interface ILawers {
    lawers: ILawer[],
}

function formatDate(date) {
    return new Intl.DateTimeFormat('pt-BR').format(new Date(date))
}

export function AttLawers({ lawers } : ILawers) {

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true, 
    })

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
                    </Tr>
                ))
            }
        </>
    )
}