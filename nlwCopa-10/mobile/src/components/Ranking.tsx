import { useState, useEffect } from 'react';
import { Box, useToast, FlatList, VStack, HStack, Avatar, Heading, Text } from 'native-base';

import { api } from '../services/api';

import { EmptyRakingList } from '../components/EmptyRakingList';


export function Ranking() {
  const position = 4;


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
      <HStack 
        w="full"
        mx={2}
        py={2}
        justifyContent="space-between"
        alignItems="center" 
      >

      <HStack>
          <Avatar
            //key={participant.id}
            source={{ uri: "https://github.com/Guigas014.png"}}
            w={12}
            h={12}
            rounded="full"
            borderWidth={2}
            marginRight={-3}
            borderColor="gray.800"
          />

          <VStack ml={5} justifyContent="center">
            <Heading color="white" fontSize="md" fontFamily="heading" mb={0.5}>
              Guilherme Alves
              <Text color="gray.200" fontSize="xs">(você)</Text>
            </Heading>

            <Text color="gray.200" fontSize="xs">
              30 ponto(s)
            </Text>
          </VStack>
        </HStack>

       <Box 
        bgColor={position > 3 ? "gray.600" : "yellow.500"} 
        w={10} 
        h={6} 
        rounded="full" 
        alignItems="center"
        justifyContent="center" 
      >
         <Text 
          color={position > 3 ? "gray.300" : "black"} 
          fontSize="md" 
          fontFamily="medium"
         >
          1°
         </Text>    
       </Box>

     </HStack>

    </VStack>
  ); 
}
