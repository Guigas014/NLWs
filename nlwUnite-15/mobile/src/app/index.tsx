import { View, Image } from "react-native"

export default function Home() {
  return (
    <View className="flex-1 bg-green-500 items-center justify-center">
      <Image
        source={require("@/assets/logo.png")}
        className="h-16"
        resizeMode="contain"
      />

      <View></View>
    </View>
  )
}
