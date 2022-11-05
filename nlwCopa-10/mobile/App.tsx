import { NativeBaseProvider, StatusBar } from "native-base";
import { useFonts, Roboto_400Regular,  Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { Loading } from './src/components/Loading';
import { SignIn } from './src/screens/SignIn';
import { New } from './src/screens/New';
import { Find } from './src/screens/Find';
import { Pools } from './src/screens/Pools';

import { THEME } from './styles/theme';
import { AuthContextProvider } from './src/contexts/AuthContext';
import { Routes } from './src/routes';


export default function App() {
  const [fontsLoad] = useFonts({ Roboto_400Regular,  Roboto_500Medium, Roboto_700Bold });  


  return (
    <NativeBaseProvider theme={THEME}>
      <AuthContextProvider>

        <StatusBar 
          barStyle="light-content"
          backgroundColor="transparent"
          translucent
        />

        {
          fontsLoad ? <Routes /> : <Loading />
        }      

      </AuthContextProvider>
    </NativeBaseProvider>
  );
}

