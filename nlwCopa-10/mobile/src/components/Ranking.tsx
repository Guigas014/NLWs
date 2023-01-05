import { useState, useEffect } from 'react';
import { Box, useToast, FlatList, VStack, HStack, Avatar, Heading, Text } from 'native-base';

import { ParticipantProps } from './Participants';


interface Props {
  participant: ParticipantProps;
  ownerId: string;
  position: number;
}

export function Ranking({ participant, ownerId, position }: Props) {
  //const [owner, setOwner] = useState<string>(""); 
  //const [position, setPosition] = useState(0);

  //console.log(participant.user.id)

  //useEffect(() => {
    //participant.id === ownerId ? setOwner("você") : setOwner("não você")
    //setPosition(position + 1)
  //}, []);


  return (
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
            key={participant.id}
            source={{ uri: participant.user.avatarUrl }}
            w={12}
            h={12}
            rounded="full"
            borderWidth={2}
            marginRight={-3}
            borderColor="gray.800"
          />

          <VStack ml={5} justifyContent="center">
            <Heading color="white" fontSize="md" fontFamily="heading" mb={0.5}>
              {participant.user.name}
             <Text color="gray.200" fontSize="xs">
                {participant.user.id === ownerId ? " (você)" : ""}
              </Text>
            </Heading>

            <Text color="gray.200" fontSize="xs">
              30 ponto(s)
            </Text>
          </VStack>
        </HStack>

       <Box 
        bgColor={position > 1 ? "gray.600" : "yellow.500"} 
        //bgColor="yellow.500"
        w={10} 
        h={6} 
        rounded="full" 
        alignItems="center"
        justifyContent="center" 
      >
         <Text 
          color={position > 1 ? "gray.300" : "black"} 
          //color="black"
          fontSize="md" 
          fontFamily="medium"
         >
          {position}°
         </Text>    
       </Box>

     </HStack>

    </VStack>
  ); 
}
