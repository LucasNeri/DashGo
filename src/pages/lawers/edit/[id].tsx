import { Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack } from "@chakra-ui/react";
import { Input } from "../../../components/Form/Input";
import { Sidebar } from "../../../components/Sidebar/index";
import { Header } from "../../../components/Header";
import Link from 'next/link'
import React, { useState, ChangeEvent, useEffect } from 'react'
import api from '../../../services/api'
import { AlertMessage } from '../../../components/Alerts/AlertMessage' 
import { useRouter } from 'next/router'

interface ILawer {
    name: string,
    email: string,
}

export default function EditLawer() {
    const router = useRouter();

    const [isAlert, setIsAlert] = useState(false)
    const [alertMessages, setAlertMessages] = useState()
    const [isError, setIsError] = useState(Boolean)

    const [model, setModel] = useState<ILawer>({
        name: '',
        email: '',
    })

    useEffect(()=>{
        getLawer()
        if(!router.isReady) return;
    }, [router.isReady]);

    async function getLawer() {
        if (router.query.id === undefined) return;
        const _ = await api.get(`/api/getLawerById/${router.query.id}`).then(res => {
            setModel({
                name: res.data.data.name,
                email: res.data.data.email,
            })
        })
    }

    function updateModel (e: ChangeEvent<HTMLInputElement>) {
        setModel({
            ...model,
            [e.target.name]: e.target.value
        })
    }

    
    async function onSubmit (e) {
        e.preventDefault()

        api.put(`/api/updateLawer/${router.query.id}`, model).then(() => {

            setIsAlert(true)
            setIsError(false)
            setIsAlert(true)

            let messsages_created : any
            messsages_created = []
            messsages_created.push('Advogado editado com sucesso!')
            setAlertMessages(messsages_created)

        }).catch(err => {
            setIsError(true)
            setIsAlert(true)
            if (err.response.data.frontendMessage) {
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
                                value={model.name}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updateModel(e)} 
                            />
                            <Input 
                                name="email" 
                                type='email' 
                                label='E-mail'
                                value={model.email}
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