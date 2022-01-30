import React from 'react';
import { useFonts } from 'expo-font';

import Routes from './src/routes';

import { Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold  } from '@expo-google-fonts/nunito';



export default function App() {

  const [fontsLoaded] = useFonts({
    Nunito_600SemiBold, 
    Nunito_700Bold, 
    Nunito_800ExtraBold, 
  });
  
  if (!fontsLoaded) {
    return null;
  }


  return (
    <Routes />
  );
}

