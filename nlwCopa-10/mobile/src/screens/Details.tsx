import { useState, useEffect } from 'react';
import { Share } from 'react-native';
import { HStack, VStack, useToast } from 'native-base';
import { useRoute, useNavigation } from '@react-navigation/native';

import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { PoolCardProps } from '../components/PoolCard';
import { PoolHeader } from '../components/PoolHeader';
import { EmptyMyPoolList } from '../components/EmptyMyPoolList';
import { Option } from '../components/Option';
import { Guesses } from '../components/Guesses';
import { Ranking } from '../components/Ranking';
import { EmptyRakingList } from '../components/EmptyRakingList';

import { api } from '../services/api';


interface RouteParams {
  id: string;
}


export function Details() {
  const [ isLoading, setIsLoading ] = useState(true);
  const [ poolDetails, setPoolDetails ] = useState<PoolCardProps>({} as PoolCardProps);
  const [optionSelected, setOptionSelected ] = useState<'guesses' | 'ranking'>('guesses');

  const route = useRoute();
  const { id } = route.params as RouteParams;
  //const { navigate } = useNavigation();  
  const toast = useToast();  


  async function fetchPoolDetails() {
    try {
      setIsLoading(true);

      const response = await api.get(`/pools/${id}`);
      setPoolDetails(response.data.pool);

      
    } catch (error) {
      console.log(error);
      
      if (error) {
        toast.show({
          title: 'Não foi possível carregar os detalher do bolão',
          placement: 'top',
          bgColor: 'red.500'
        }); 
      }
    } finally {
      setIsLoading(false);
    }
  }
  
  //O handle no nome da função é usado quando o usuário aperta um botão.
  async function handleCodeShare() {
    await Share.share({
      message: poolDetails.code
    })
  }

  useEffect(() => {
    fetchPoolDetails();
  }, [id]);
    


  if (isLoading) {
    return <Loading />
  }
    
  
  return (
    <VStack flex={1} bgColor="gray.900">
      <Header  
        title={poolDetails.title} 
        showBackButton 
        showShareButton 
        onShare={handleCodeShare}
      />

      {
        poolDetails._count?.participants > 0 ?
          <VStack flex={1} px={5}>
            <PoolHeader data={poolDetails} />


            <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
              <Option 
                title="Seus palpites"
                isSelected={optionSelected === 'guesses'}  
                onPress={() => setOptionSelected('guesses')}
              />
              <Option 
                title="Ranking do grupo" 
                isSelected={optionSelected === 'ranking'}  
                onPress={() => setOptionSelected('ranking')}
              />
            </HStack>       

            {
              optionSelected === 'guesses' ?
                <Guesses poolId={poolDetails.id} code={poolDetails.code} />
              :
                //<Ranking />
                <EmptyRakingList />
            }            


          </VStack>
        :
          <EmptyMyPoolList code={poolDetails.code} />
      }    


    </VStack>
  );
}
