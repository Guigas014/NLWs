"use client"

import { useEffect, useState } from "react"
import { api } from "../../../pages/api/api"

import { BadgeCheck, Medal, MousePointerClick } from "lucide-react"

type User = {
  item: {
    subscribers: number
    userId: number
    name: string
  }
  position: number
}

interface StatsProps {
  subscriberId: string
}

export function Stats({ subscriberId }: StatsProps) {
  const [user, setUser] = useState<User>()
  // console.log(subscriberId)

  async function getUserData(subscriberId: string) {
    const response = await api
      .get(`subscription/hagatom-java-2025/ranking/${subscriberId}`)
      .then((response) => setUser(response.data))
      .catch((error) => {
        console.error(error.response.data.message)
        alert(error.response.data.message)
      })

    console.log(response)
  }

  useEffect(() => {
    getUserData(subscriberId)
  }, [])

  return (
    <div className="grid gap-3 md:grid-cols-3">
      <div className=" relative bg-gray-700 border border-gray-600 px-4 py-7 flex flex-col items-center justify-center gap-1 rounded-xl">
        <span className="font-heading text-2xl font-semibold text-gray-200 leading-none">
          1042
        </span>
        <span className="text-sm text-gray-300 leading-none text-center">
          Acesso ao link
        </span>

        <MousePointerClick className="size-5 text-purple absolute top-3 left-3" />
      </div>

      <div className="relative bg-gray-700 border border-gray-600 px-4 py-7 flex flex-col items-center justify-center gap-1 rounded-xl">
        <span className="font-heading text-2xl font-semibold text-gray-200 leading-none">
          {user?.item.subscribers || 0}
        </span>
        <span className="text-sm text-gray-300 leading-none text-center">
          Inscrições feitas
        </span>

        <BadgeCheck className="size-5 text-purple absolute top-3 left-3" />
      </div>

      <div className="relative bg-gray-700 border border-gray-600 px-4 py-7 flex flex-col items-center justify-center gap-1 rounded-xl">
        <span className="font-heading text-2xl font-semibold text-gray-200 leading-none">
          {`${user?.position || 0}°`}
        </span>
        <span className="text-sm text-gray-300 leading-none text-center">
          Posição no ranking
        </span>

        <Medal className="size-5 text-purple absolute top-3 left-3" />
      </div>
    </div>
  )
}
