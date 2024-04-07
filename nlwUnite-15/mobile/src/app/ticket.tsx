import { useState } from "react"
import {
  Alert,
  Modal,
  ScrollView,
  Share,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import * as ImagePicker from "expo-image-picker"
import { Redirect } from "expo-router"
import { MotiView } from "moti"

import { colors } from "@/styles/colors"
import { useBadgeStore } from "@/store/badge-store"

import { Header } from "@/components/header"
import { Credential } from "@/components/credential"
import { Button } from "@/components/button"
import { QRCode } from "@/components/qrcode"

export default function Ticket() {
  // const [image, setImage] = useState("") Esse estado foi trocado pelo badgeStore
  const [expandQRCode, setExpandQRCode] = useState(false)

  const badgeStore = useBadgeStore()
  // console.log(badgeStore.data)

  async function handleShare() {
    try {
      if (badgeStore.data?.checkInUrl) {
        await Share.share({
          message: badgeStore.data.checkInUrl,
        })
      }
    } catch (error) {
      console.log(error)

      Alert.alert("Compartilhar", "Não foi possível compartilhar.")
    }
  }

  async function handleSelectImage() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
      })

      if (result.assets) {
        badgeStore.updateAvatar(result.assets[0].uri)
      }
    } catch (error) {
      console.log(error)
      Alert.alert("Foto", "Não foi possível selecionar a imagem.")
    }
  }

  if (!badgeStore.data?.checkInUrl) {
    return <Redirect href="/" />
  }

  return (
    <View className="flex-1 bg-green-500">
      <StatusBar barStyle="light-content" />

      <Header title="Minha Credencial" />

      <ScrollView
        className="-mt-28 -z-10"
        contentContainerClassName="px-8 pb-8"
        showsVerticalScrollIndicator={false}
      >
        <Credential
          data={badgeStore.data}
          onChangeAvatar={handleSelectImage}
          onExpandQRCode={() => setExpandQRCode(true)}
        />

        <MotiView
          from={{
            translateY: 0,
          }}
          animate={{
            translateY: 10,
          }}
          transition={{
            // repeat: 5,
            loop: true,
            type: "timing",
            duration: 700,
          }}
        >
          <FontAwesome
            name="angle-double-down"
            color={colors.gray[300]}
            size={24}
            className="self-center my-6"
          />
        </MotiView>

        <Text className="text-white font-bold text-2xl mt-4">
          Compartilhar credencial
        </Text>
        <Text className="text-white font-regular text-base mt-1 mb-6">
          Mostre ao mundo que você vai participar do{" "}
          {badgeStore.data.eventTitle}!
        </Text>

        <Button title="Compartilhar" onPress={handleShare} />

        <TouchableOpacity
          activeOpacity={0.7}
          className="mt-10"
          onPress={() => badgeStore.remove()}
        >
          <Text className="text-base text-white font-bold text-center">
            Remover Ingresso
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={expandQRCode} statusBarTranslucent>
        <View className="flex-1 bg-green-500 items-center justify-center">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setExpandQRCode(false)}
          >
            <QRCode value={badgeStore.data.checkInUrl} size={300} />
            <Text className="font-body text-orange-500 text-sm text-center mt-10">
              Fechar QRCode
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  )
}
