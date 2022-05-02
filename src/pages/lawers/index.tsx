import { Box, Flex, Heading, Button, Icon, Stack, Checkbox, Progress } from "@chakra-ui/react";
import { RiAddLine, RiRefreshLine } from "react-icons/ri";
import Link from 'next/link'
import api from '../../services/api'
import React, { useState, useEffect } from 'react'

import { Sidebar } from "../../components/Sidebar/index";
import { Header } from "../../components/Header";
import { ConditionalTable } from '../../components/Lawers/ConditionalTable';

export default function LawerList() {
    const [lawers, setLawers] = useState()
    const [totalLawers, setTotalLawers] = useState()
    const [offset, setOffset] = useState()
    const [pages, setPages] = useState()
    const [isSortDate, setIsSortDate] = useState(false)
    const [isSortName, setIsSortName] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        loadLawers(false, false, false)
    }, [])

    async function loadLawers(page : any, sortDate : boolean, sortName : boolean) {
        setIsLoading(false)

        let url = `/api/getLawers`

        if (page) {
            url += `?page=${page}&size=10`
        } else {
            url += `?page=1&size=10`
        }

        if (sortName) {
            url += `&sort=name`
        } else if (sortDate) {
            url += `&sort=date`
        }

        api.get(url).then(res => {
            setTimeout(() => {
                setLawers(res.data.data.docs)
                setTotalLawers(res.data.data.total)
                setOffset(res.data.data.offset)
                setPages(res.data.data.pages)
                setIsLoading(true)
            }, 1000)
        }).catch(err => {
            console.log(err)
            setIsLoading(true)
        })
    }

    async function handleSortDate() {
        if (!isSortDate) {
            setIsSortDate(true)
            setIsSortName(false)
            loadLawers(false, true, false)
        } else {
            setIsSortDate(false)
            loadLawers(false, false, false)
        }
    }

    async function handleSortName() {
        if (!isSortName) {
            setIsSortName(true)
            setIsSortDate(false)
            loadLawers(false, false, true)
        } else {
            setIsSortName(false)
            loadLawers(false, false, false)
        }
    }

    return (
        <Box>
            <Header />

            <Flex w='100%' my='6' maxWidth={1480} mx='auto' px='6'>
                <Sidebar />

                <Box flex='1' borderRadius={8} bg='gray.800' p='8'>
                    <Flex mb='8' justify='space-between' align='center'>
                        <Heading size='lg' fontWeight='normal'>Advogados</Heading>
                        <Box>
                            <Button 
                                as='a' 
                                size='sm' 
                                fontSize='sm' 
                                colorScheme='blue'
                                mr='4'
                                leftIcon={<Icon as={RiRefreshLine} fontSize='20'/>} 
                                onClick={() => loadLawers(false, isSortDate, isSortName)}
                            >
                                Recarregar
                            </Button>
                            <Link href="/lawers/create" passHref>
                                <Button 
                                    as='a' 
                                    size='sm' 
                                    fontSize='sm' 
                                    colorScheme='pink'
                                    leftIcon={<Icon as={RiAddLine} fontSize='20'/>} 
                                >
                                    Cadastrar Novo
                                </Button>
                            </Link>
                        </Box>
                    </Flex>

                    <Progress size='xs' isIndeterminate mb={5} hidden={isLoading}/>

                    <Stack spacing={5} direction='row' mb={5}>
                        <Checkbox colorScheme='blue' onChange={() => handleSortName()} mx={6} isChecked={isSortName} >
                            Ordenar por nome
                        </Checkbox>
                        <Checkbox colorScheme='green' onChange={() => handleSortDate()} isChecked={isSortDate} >
                            Ordenar por data
                        </Checkbox>
                    </Stack>
                    

                    <ConditionalTable lawers={lawers} totalLawers={totalLawers} offset={offset} pages={pages} loadLawers={loadLawers} isSortDate={isSortDate} isSortName={isSortName}/>
                </Box>

            </Flex>
        </Box>
    )
}