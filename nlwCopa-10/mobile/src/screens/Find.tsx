import { useState } from 'react';
import { VStack, Heading, useToast } from "native-base";
import { useNavigation } from "@react-navigation/native";

import { api } from '../services/api';

import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";


export function Find() {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ code, setCode ] = useState('');

  const toast = useToast();  
  const { navigate } = useNavigation();  


  async function handleJoinPool() {
    try {
      setIsLoading(true);

      if (!code.trim()) {
        return toast.show({
          title: 'Informe o código',
          placement: 'top',
          bgColor: 'red.500'
        }); 
      }

     await api.post('/pools/join', { code });

     toast.show({
      title: 'Você entrou no bolão com sucesso!',
      placement: 'top',
      bgColor: 'green.500'
     }); 

     navigate('pools'); 

      
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      
      if (error.response?.data?.message) {
        return toast.show({
          title: error.response?.data?.message,
          placement: 'top',
          bgColor: 'green.500'
        }); 
      }
    }
  }  


  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Buscar por código"  showBackButton/>

      <VStack mt={8} mx={5} alignItems="center">

        <Heading fontFamily="heading" color="white" fontSize="xl" mb={8} textAlign="center">
          Encontrar um bolão através do seu código único
        </Heading>

        <Input 
          mb={2}
          placeholder="Qual o código bolão?"
          autoCapitalize="characters"
          onChangeText={setCode}
        />        

        <Button  
          title="buscar bolão"
          onPress={handleJoinPool}
          isLoading={isLoading}
        />

      </VStack>
    </VStack>
  );
}

