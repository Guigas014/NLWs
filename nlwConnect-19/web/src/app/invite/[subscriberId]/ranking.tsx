import Image from "next/image"

import { api } from "@/pages/api/api"

import gold from "../../../assets/medal-gold.svg"
import silver from "../../../assets/medal-silver.svg"
import cooper from "../../../assets/medal-cooper.svg"

type User = {
  subscribers: number
  userId: number
  name: string
}

export async function Ranking() {
  const response = await api.get("subscription/hagatom-java-2025/ranking")

  const users = response.data as User[]

  return (
    <div className="w-full max-w-[440px] space-y-5">
      <h2 className="text-gray-200 text-xl font-heading font-semibold leading-none">
        Ranking de indicações
      </h2>

      <div className="space-y-4">
        <div className="relative rounded-xl bg-gray-700 border border-gray-600 p-6 flex flex-col justify-center gap-3">
          <span className="text-sm text-gray-300 leading-none">
            <span className="font-semibold">1º</span> | {users[0].name}
          </span>

          <span className="font-heading text-2xl font-semibold text-gray-200 leading-none">
            {users[0].subscribers}
          </span>

          <Image src={gold} alt="medal" className="absolute top-0 right-8" />
        </div>

        <div className="relative rounded-xl bg-gray-700 border border-gray-600 p-6 flex flex-col justify-center gap-3">
          <span className="text-sm text-gray-300 leading-none">
            <span className="font-semibold">2º</span> | {users[1].name}
          </span>

          <span className="font-heading text-2xl font-semibold text-gray-200 leading-none">
            {users[1].subscribers}
          </span>

          <Image src={silver} alt="medal" className="absolute top-0 right-8" />
        </div>

        <div className="relative rounded-xl bg-gray-700 border border-gray-600 p-6 flex flex-col justify-center gap-3">
          <span className="text-sm text-gray-300 leading-none">
            <span className="font-semibold">3º</span> | {users[2].name}
          </span>

          <span className="font-heading text-2xl font-semibold text-gray-200 leading-none">
            {users[2].subscribers}
          </span>

          <Image src={cooper} alt="medal" className="absolute top-0 right-8" />
        </div>
      </div>
    </div>
  )
}
