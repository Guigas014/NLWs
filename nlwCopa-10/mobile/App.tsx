import { NativeBaseProvider, StatusBar } from "native-base";
import { useFonts, Roboto_400Regular,  Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { Loading } from './src/components/Loading';
import { SignIn } from './src/screens/SignIn';

import { THEME } from './styles/theme';


export default function App() {
  const [fontsLoad] = useFonts({ Roboto_400Regular,  Roboto_500Medium, Roboto_700Bold });  


  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar 
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {
        fontsLoad ? <SignIn /> : <Loading />
      }      
    </NativeBaseProvider>
  );
}

