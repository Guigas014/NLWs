import { useState, useEffect } from 'react';
import { StatusBar, Text, View, ImageBackground, TouchableOpacity } from 'react-native';
import { SplashScreen, Stack } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

import { styled } from 'nativewind';

import blurBg from '../src/assets/bg-blur.png';
import Stripes from '../src/assets/stripes.svg';

import { BaiJamjuree_700Bold } from '@expo-google-fonts/bai-jamjuree';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold
} from '@expo-google-fonts/roboto';


const StyledStripes = styled(Stripes);


export default function Layout() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<null | boolean>(null);
    


  const [ hasLoadedFonts ] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
    BaiJamjuree_700Bold
  });  

  useEffect(() => {
    SecureStore.getItemAsync('token').then((token) => {
      //console.log(!!token)

      setIsUserAuthenticated(!!token)  //!! - transforma em boolean
    })
  }, []);
  


  if (!hasLoadedFonts) {
    return <SplashScreen />;
  }


  return (
    <ImageBackground 
      source={blurBg}
      className="relative flex-1 bg-gray-900"
      imageStyle={{ position: 'absolute' }}
    >

      <StyledStripes className="absolute left-2" />

      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' },
        }}
      > 
        <Stack.Screen name="index" redirect={isUserAuthenticated} />
        <Stack.Screen name="memories" />
        <Stack.Screen name="new" />
      </Stack>
    </ImageBackground>
  )
}
