import {
  Image,
  View,
  ImageBackground,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native"
import { Feather } from "@expo/vector-icons"
import { MotiView } from "moti"

import { colors } from "@/styles/colors"
import { BadgeStore } from "@/store/badge-store"

import { QRCode } from "@/components/qrcode"

type Props = {
  data: BadgeStore
  image?: string
  onChangeAvatar?: () => void
  onExpandQRCode?: () => void
}

export function Credential({ onChangeAvatar, onExpandQRCode, data }: Props) {
  // console.log("DADOS: ", data.checkInUrl)

  const { height } = useWindowDimensions()

  // console.log("DATA:", data.id)

  return (
    <MotiView
      className="w-full self-stretch items-center"
      from={{ opacity: 0.5, translateY: -height, rotateZ: "50deg" }}
      animate={{ opacity: 1, translateY: 0, rotateZ: "0deg" }}
      transition={{ duration: 3000 }}
    >
      <Image
        source={require("@/assets/ticket/band.png")}
        className="w-24 h-52 z-10"
      />

      <View className="bg-black/20 self-stretch items-center pb-6 border border-white/10 mx-3 rounded-2xl -mt-5">
        <ImageBackground
          source={require("@/assets/ticket/header.png")}
          className="px-6 py-8 h-40 items-center self-stretch border-b border-white/10 overflow-hidden"
        >
          <View className="w-full flex-row items-center justify-between">
            <Text className="text-zinc-50 text-sm font-bold">
              {data.eventTitle}
            </Text>
            <Text className="text-zinc-50 text-sm font-bold">
              #{data.id.slice(0, 4)}
            </Text>
          </View>

          <View className="w-40 h-40 bg-black rounded-full" />
        </ImageBackground>

        {data.image ? (
          <TouchableOpacity activeOpacity={0.7} onPress={onChangeAvatar}>
            <Image
              source={{ uri: data.image }}
              className="w-36 h-36 rounded-full -mt-24"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            activeOpacity={0.7}
            className="w-36 h-36 rounded-full -mt-24 bg-gray-400 items-center justify-center"
            onPress={onChangeAvatar}
          >
            <Feather name="camera" color={colors.green[400]} size={32} />
          </TouchableOpacity>
        )}

        <Text className="font-bold text-2xl text-zinc-50 mt-4">
          {data.name}
        </Text>
        <Text className="font-regular text-base text-zinc-300 mb-4">
          {data.email}
        </Text>

        <QRCode value={data.checkInUrl} size={120} />

        <TouchableOpacity
          activeOpacity={0.7}
          className="mt-6"
          onPress={onExpandQRCode}
        >
          <Text className="font-body text-orange-500 text-sm">
            Ampliar QR Code
          </Text>
        </TouchableOpacity>
      </View>
    </MotiView>
  )
}
