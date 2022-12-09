import { useState, useEffect } from 'react';
import { Box, useToast, FlatList, VStack, HStack, Avatar, Heading, Text } from 'native-base';

import { api } from '../services/api';

import { EmptyRakingList } from '../components/EmptyRakingList';


export function Ranking() {
  return (
    //<FlatList
      ////data={}
      ////keyExtractor={}  
      ////renderItem={() => ()}
      //_contentContainerStyle={{ pb: 20 }}
      //ListEmptyComponent={() => <EmptyRakingList />}
    ///>
    <VStack
      w="full"
      bgColor="gray.800"
      rounded="sm"
      alignItems="center"
      borderBottomWidth={3}
      borderBottomColor="yellow.500"
      mb={3}
      p={4}
    >
      <HStack>
        <Avatar
          //key={participant.id}
          source={{ uri: "https://github.com/Guigas014.png"}}
          w={8}
          h={8}
          rounded="full"
          borderWidth={2}
          marginRight={-3}
          borderColor="gray.800"
       />

       <VStack>
         <Heading color="white" fontSize="md" fontFamily="heading">
           Guilherme
         </Heading>

         <Text color="gray.200" fontSize="xs">
           30 ponto(s)
         </Text>
       </VStack>

       <Text color="white" fontSize="sm">1°</Text>    

     </HStack>

    </VStack>
  ); 
}
