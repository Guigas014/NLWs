// Quando um  arquivo começa com "_" o ExpoRouter reconhece o mesmo como um arquivo de configuração. Esse arquivo compartilha suas configurações com todo o App.
import "@/styles/global.css"

import { Slot } from "expo-router"
import { StatusBar } from "expo-status-bar"

import { Loading } from "@/components/Loading"

import {
  useFonts,
  Roboto_700Bold,
  Roboto_500Medium,
  Roboto_400Regular,
} from "@expo-google-fonts/roboto"

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Roboto_700Bold,
    Roboto_500Medium,
    Roboto_400Regular,
  })

  return (
    <>
      <StatusBar style="light" />
      {!fontsLoaded ? <Loading /> : <Slot />}
    </>
  )
}
