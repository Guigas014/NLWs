  import { View, Text } from 'react-native';
  import { useNavigation } from '@react-navigation/native';

export function HabitsEmpty() {
  const { navigate } = useNavigation();


  return(
    <Text className="text-zinc-400 text-base">
      Você ainda não está monitorando nenhum hábito! {' '}
      <Text 
        className="text-blue-400 text-base underline active:text-blue-500"
        onPress={() => navigate('new')}
      >
        Comece cadastrando um.
      </Text>
    </Text>
  );
}
