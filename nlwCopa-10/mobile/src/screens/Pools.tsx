import { useEffect, useState, useCallback } from 'react';
import { VStack, Icon, Text, useToast, FlatList } from "native-base";
import { Octicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";
import { EmptyPoolList } from "../components/EmptyPoolList";
import { PoolCard, PoolCardProps } from "../components/PoolCard";

import { api } from '../services/api';  


export function Pools() {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ pools, setPools ] = useState<PoolCardProps[]>([]);

  const { navigate } = useNavigation();
  const toast = useToast();

  
  async function fetchPools() {
    try {
      setIsLoading(true);

      const response = await api.get('/pools');
      setPools(response.data.pools);

    } catch (error) {
      console.log(error);
  
      toast.show({
        title: 'Não foi possível carregar os bolões',
        placement: 'top',
        bgColor: 'red.500'
      })
    
    } finally {
      setIsLoading(false);
    }
  }

  //useFocusEffect-useCallback - atualiza a lista quando a página e focada.
  useFocusEffect(useCallback(() => {
    fetchPools();
  }, []));
  


  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Meus bolões" />

      <VStack mt={6} mx={5} borderBottomWidth={1} borderBottomColor="gray.600" pb={4} mb={4}>
        <Button 
          title="buscar bolão por código" 
          leftIcon={<Icon as={Octicons} name="search" color="black" size="md" />}
          onPress={() => navigate('find')}
        />
      </VStack>     

      {
        isLoading ? 
          <Loading /> 
        :
          <FlatList 
            data={pools}
            keyExtractor={item => item.id}
            renderItem={ ({ item }) => (
              <PoolCard 
                data={item}
                onPress={() => navigate('details', { id: item.id })} 
              /> 
            )}
            showsVerticalScrollIndicator={false}
            _contentContainerStyle={{ pb: 20 }}
            ListEmptyComponent={() => <EmptyPoolList /> } 
            px={5}
          />      
      }


    </VStack>
  );
}

