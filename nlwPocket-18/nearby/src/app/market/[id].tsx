import { useEffect, useRef, useState } from "react"
import { Alert, Modal, ScrollView, StatusBar, View } from "react-native"
import { router, useLocalSearchParams, Redirect } from "expo-router"
import { useCameraPermissions, CameraView } from "expo-camera"

import { api } from "@/services/api"
import { Loading } from "@/components/loading"
import { Cover } from "@/components/market/cover"
import { DetailsProps, Details } from "@/components/market/details"
import { Coupon } from "@/components/market/coupon"
import { Button } from "@/components/button"

type DataProps = DetailsProps & {
  cover: string
}

export default function Market() {
  const [data, setData] = useState<DataProps>()
  const [coupon, setCoupon] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isVisibleModal, setIsVisibleModal] = useState(false)
  const [couponIsFetching, setCouponIsFetching] = useState(false)

  const [_, requestPermissions] = useCameraPermissions()
  const params = useLocalSearchParams<{ id: string }>()

  const qrLock = useRef(false)

  async function fetchMarket() {
    try {
      const { data } = await api.get(`/markets/${params.id}`)
      setData(data)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
      Alert.alert("Erro", "Não foi possível carregar os dados.", [
        { text: "OK", onPress: () => router.back() },
      ])
    }
  }

  async function handleOpenModal() {
    try {
      const { granted } = await requestPermissions()

      if (!granted) {
        return Alert.alert("Câmera", "Você precisa habilitar o uso da câmera.")
      }

      qrLock.current = false
      setIsVisibleModal(true)
    } catch (error) {
      console.log(error)
      return Alert.alert("Câmera", "Não foi possível utilizar a câmera.")
    }
  }

  async function getCoupon(id: string) {
    try {
      setCouponIsFetching(true)

      const { data } = await api.patch("/coupons/" + id)

      Alert.alert("Cupom", data.coupon)
      setCoupon(data.coupon)
    } catch (error) {
      console.log(error)
      return Alert.alert("Erro", "Não foi possível utilizar o cupom.")
    } finally {
      setCouponIsFetching(false)
    }
  }

  function handleUseCoupon(id: string) {
    setIsVisibleModal(false)

    Alert.alert(
      "Cupom",
      "Não é possível reutilizar um cupom resgatado. Deseja realmente resgatar o cupom?",
      [
        { style: "cancel", text: "Não" },
        { text: "Sim", onPress: () => getCoupon(id) },
      ]
    )
  }

  useEffect(() => {
    fetchMarket()
  }, [params.id, coupon])

  if (isLoading) {
    return <Loading />
  }

  if (!data) {
    return <Redirect href="/home" />
  }

  return (
    <View style={{ flex: 1 }}>
      {/* <StatusBar barStyle="light-content" hidden={isVisibleModal} /> */}

      <ScrollView showsVerticalScrollIndicator={false}>
        <Cover uri={data.cover} />
        <Details data={data} />
        {coupon && <Coupon code={coupon} />}
      </ScrollView>

      <View style={{ padding: 32 }}>
        <Button onPress={() => handleOpenModal()}>
          <Button.Title>Ler QR Code</Button.Title>
        </Button>
      </View>

      <Modal style={{ flex: 1 }} visible={isVisibleModal}>
        <CameraView
          style={{ flex: 1 }}
          facing="back"
          onBarcodeScanned={({ data }) => {
            if (data && !qrLock.current) {
              qrLock.current = true
              setTimeout(() => handleUseCoupon(data), 500)
            }
          }}
        />

        <View style={{ position: "absolute", bottom: 32, left: 32, right: 32 }}>
          <Button
            onPress={() => setIsVisibleModal(false)}
            isLoading={couponIsFetching}
          >
            <Button.Title>Voltar</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  )
}
