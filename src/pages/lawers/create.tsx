import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import { Input } from "../../components/Form/Input";
import { Sidebar } from "../../components/Sidebar/index";
import { Header } from "../../components/Header";
import Link from 'next/link'
import React, { useState, ChangeEvent } from 'react'
import api from '../../services/api'
import { AlertMessage } from '../../components/Alerts/AlertMessage' 

interface ILawer {
    name: string,
    email: string,
}

export default function CreateLawer() {

    const [isAlert, setIsAlert] = useState(false)
    const [alertMessages, setAlertMessages] = useState()
    const [isError, setIsError] = useState(Boolean)

    const [model, setModel] = useState<ILawer>({
        name: '',
        email: '',
    })

    function updateModel (e: ChangeEvent<HTMLInputElement>) {
        setModel({
            ...model,
            [e.target.name]: e.target.value
        })
    }

    
    async function onSubmit (e) {
        e.preventDefault()

        api.post('/api/createLawer', model).then(() => {

            setIsAlert(true)
            setIsError(false)
            setIsAlert(true)

            let messsages_created : any
            messsages_created = []
            messsages_created.push('Advogado cadastrado com sucesso!')
            setAlertMessages(messsages_created)

        }).catch(err => {
            setIsError(true)
            setIsAlert(true)
            if (err.response) {
                setAlertMessages(err.response.data.frontendMessage)
            }
        })
    }
    

    return (
        <Box>
            <Header />

            <AlertMessage isAlert={isAlert} setIsAlert={setIsAlert} messages={alertMessages} error={isError}/>


            <Flex w='100%' my='6' maxWidth={1480} mx='auto' px='6'>
                <Sidebar />

                <Box flex='1' borderRadius={8} bg='gray.800' p={['6', '8']}>
                    <Heading size='lg' fontWeight='normal'>Cadastrar Advogado</Heading>

                    <Divider my='6' borderColor='gray.700'/>

                    <VStack spacing='8'>
                        <SimpleGrid minChildWidth='240px' spacing={['6', '8']} w='100%'>
                            <Input 
                                name="name" 
                                label='Nome Completo' 
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} 
                            />
                            <Input 
                                name="email" 
                                type='email' 
                                label='E-mail'
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)}  
                            />
                        </SimpleGrid>
                    </VStack>

                    <Flex mt='8' justify='flex-end'>
                        <HStack spacing='4'>
                            <Link href="/lawers" passHref>
                                <Button as='a' colorScheme='whiteAlpha'>Cancelar</Button>
                            </Link>
                            <Button colorScheme='pink' onClick={onSubmit}>Salvar</Button>
                        </HStack>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    )

}