import { useState } from "react"
import { View, Image, StatusBar, Alert } from "react-native"
import { Link, router } from "expo-router"
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons"
import axios from "axios"

import { colors } from "@/styles/colors"
import { api } from "@/server/api"
import { useBadgeStore } from "@/store/badge-store"

import { Input } from "@/components/input"
import { Button } from "@/components/button"

const EVENT_ID = "536b05b2-b773-4268-b2d4-0acc2f4cff95"

export default function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const badgeStore = useBadgeStore()

  async function handleRegister() {
    try {
      if (!name.trim() || !email.trim()) {
        return Alert.alert("Inscrição", "Prencha todos os campos")
      }

      setIsLoading(true)

      const registerResponse = await api.post(`/events/${EVENT_ID}/attendees`, {
        name,
        email,
      })

      const attendeeId = registerResponse.data.attendeeId

      if (attendeeId) {
        const badgeResponse = await api.get(`/attendees/${attendeeId}/badge`)

        registerResponse.data.attendeeId

        badgeStore.save(badgeResponse.data.badge)

        Alert.alert("Inscrição", "Inscrição realizada com sucesso!", [
          { text: "OK", onPress: () => router.push("/ticket") },
        ])
      }
    } catch (error) {
      console.log(error)

      if (axios.isAxiosError(error)) {
        if (
          String(error.response?.data.message).includes("already registered")
        ) {
          return Alert.alert("Inscrição", "Este e-mail já está cadastrado!")
        }
      }

      Alert.alert("Inscrição", "Não foi possível fazer a inscrição")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View className="flex-1 bg-green-500 items-center justify-center p-8">
      <StatusBar barStyle="light-content" />

      <Image
        source={require("@/assets/logo.png")}
        className="h-16"
        resizeMode="contain"
      />

      <View className="w-full mt-12 gap-3">
        <Input>
          <FontAwesome6
            name="user-circle"
            color={colors.green[200]}
            size={20}
          />
          <Input.Field placeholder="Nome completo" onChangeText={setName} />
        </Input>

        <Input>
          <MaterialIcons
            name="alternate-email"
            color={colors.green[200]}
            size={20}
          />
          <Input.Field
            placeholder="E-mail"
            keyboardType="email-address"
            onChangeText={setEmail}
          />
        </Input>

        <Button
          title="Realizar inscrição"
          onPress={handleRegister}
          isLoading={isLoading}
        />

        <Link
          href="/"
          className="text-gray-100 text-base font-bold text-center mt-8"
        >
          Já possui ingresso?
        </Link>
      </View>
    </View>
  )
}
