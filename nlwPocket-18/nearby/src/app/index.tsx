import { View, Text } from "react-native"
import { router } from "expo-router"

import { Welcome } from "@/components/welcome"
import { Steps } from "@/components/steps"
import { Button } from "@/components/button"

import { IconMapPin } from "@tabler/icons-react-native"

export default function Index() {
  return (
    <View style={{ flex: 1, padding: 40, gap: 40 }}>
      <Welcome />

      <Steps />

      <Button onPress={() => router.navigate("/home")}>
        {/* <Button.Icon icon={IconMapPin}></Button.Icon> */}
        <Button.Title>Começar</Button.Title>
      </Button>
    </View>
  )
}
