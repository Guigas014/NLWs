import { VStack, Icon, Text } from "native-base";
import { Octicons } from '@expo/vector-icons';

import { Button } from "../components/Button";
import { Header } from "../components/Header";


export function Pools() {
  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Meus bolões" />

      <VStack mt={6} mx={5} borderBottomWidth={1} borderBottomColor="gray.600" pb={4} mb={4}>
        <Button 
          title="buscar bolão por código" 
          leftIcon={<Icon as={Octicons} name="search" color="black" size="md" />}
        />
      </VStack>     

      <Text color="gray.200" fontSize="sm" textAlign="center" px={10} mt={4}>
        Você ainda não está participando de nenhum bolão,
        que tal buscar um por código ou criar um novo?
      </Text>

    </VStack>
  );
}

