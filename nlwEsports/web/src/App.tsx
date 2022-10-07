  import { useState, useEffect } from 'react';
  import * as Dialog from '@radix-ui/react-dialog';
  import { ScrollingCarousel, Carousel } from '@trendyol-js/react-carousel';
  import { CaretLeft, CaretRight } from 'phosphor-react';

  import logoImg from './assets/logo-nlw-esports.svg';

  import { GameBanner } from './components/GameBanner';
  import { CreateAdBanner } from './components/CreateAdBanner';
  import { CreateAdModal } from './components/CreateAdModal';

  import './styles/main.css';

  import axios from 'axios';


  interface Game {
    id: string;
    title: string;
    bannerURL:string;
    _count: {
      ads: number;
    }
  }

  function App() {
    const [ games, setGames ] = useState<Game[]>([]);  

    const carousel = document.getElementsByClassName('carousel').item(0)
    const bLeft = document.getElementsByClassName('buttonLeft').item(0)
    const bRight = document.getElementsByClassName('buttonRight').item(0)

    useEffect(() => {
      axios('http://localhost:3333/games')
        .then(response => {
          setGames(response.data)
        })      
    }, [])
    

    function moveCarousel(test: string) {

      if (test == "right") {
        carousel.scrollBy(200, 0)
      }
      if (test == "left") {
        carousel.scrollBy(-200, 0)
      }

      console.log(carousel.scrollLeft) 

      if (carousel.scrollLeft <= 199) {
        bLeft.hidden = true
      }
      else {
        bLeft.hidden = false
      }

      if (carousel.scrollLeft >= (carousel.scrollLeftMax - 199)) {
        bRight.hidden = true
      }
      else {
        bRight.hidden = false
      }
  }



  return (
    <div className="max-w-[1280px] mx-auto flex flex-col items-center my-10">

      <img src={logoImg} alt="" />

      <h1 className="text-6xl text-white font-black mt-16">
        Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.
      </h1>


      <div className="flex">
      <div className="flex min-w-[30px] mr-4 text-white">
        <button onClick={() => moveCarousel("left")} className="buttonLeft" hidden>
          <CaretLeft size={30} />
        </button>
      </div>

      <div className="
        flex 
        w-[85vw] 
        my-16 
        overflow-hidden 
        scroll-smooth 
        carousel"
      >

        <div className="flex">
          {games.map(game => {
            return (
              <GameBanner
                key={game.id}
                title={game.title} 
                bannerURL={game.bannerURL} 
                adsCount={game._count.ads} 
              />        
            )  
          })}
        </div>
      </div>

      <div className="flex min-w-[30px] ml-4 text-white">
        <button onClick={() => moveCarousel("right")} className="buttonRight">
          <CaretRight size={30} />
        </button>
      </div>
      </div>

      

      <Dialog.Root> 
        <CreateAdBanner />      
        <CreateAdModal />

      </Dialog.Root>

    </div>
  )
}

export default App
