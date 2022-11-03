import Image from 'next/image'

import appPreviewImg from '../assets/app-nlw-copa-preview.png'
import logoImg from '../assets/logo.svg'
import usersAvatarExampleImg from '../assets/users-avatar-example.png'
import iconCheckImg from '../assets/icon-check.svg'


interface HomeProps {
  count: number; 
}


export default function Home(props: HomeProps) {
  return (
    <div className="max-w-[1124px] h-screen mx-auto my-20 grid grid-cols-2 gap-28 items-center">
      <main>
        <Image src={logoImg} alt="NLW Copa" />

        <h1 className="mt-14 text-white text-5xl font-bold leading-tight">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className="mt-10 flex items-center gap-2">
          <Image src={usersAvatarExampleImg} alt="Usuários" />
          <strong className="text-gray-100 text-xl">
            <span className="text-ignite-500">+12.592</span> pessoas já estão usando
          </strong>
        </div>

        <form className="mt-10 flex gap-2">
          <input 
            className= "flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-white"
            type="text" 
            required 
            placeholder="Qual é o nome do seu bolão?" 
          />
          <button 
            className="
              px-6 
              py-4 
              bg-yellow-500 
              rounded 
              text-gray-900 
              font-bold 
              text-sm 
              uppercase
              hover:bg-yellow-700"
            type="submit"
          >
            Criar meu bolão
          </button>
        </form>

        <p className="mt-4 text-gray-300 text-sm leading-relaxed">
          Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas!!
        </p>

        <div className="
          mt-10 
          pt-10 
          border-t 
          border-gray-600 
          flex
          items-center
          justify-between
          text-gray-100"
        >
          <div className="flex items-center gap-6">
            <Image src={iconCheckImg} alt="check" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+2.034</span>
              <span>Boloões criados</span>
            </div>
          </div>
    
          <div className="w-px h-14 bg-gray-600" />

          <div className="flex items-center gap-6">
            <Image src={iconCheckImg} alt="check" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+192.847</span>
              <span>Palpites enviados</span>
            </div>
          </div>

        </div>
      </main>
      
      <Image src={appPreviewImg} alt="Imagem da capa" quality={100} />
    </div>
  )
}


export const getServerSideProps = async () => {
  const response = await fetch('http://localhost:3333/pools/count')
  const data = await response.json()

  return {
    props: {
      count: data.count,
    }
  }
}

