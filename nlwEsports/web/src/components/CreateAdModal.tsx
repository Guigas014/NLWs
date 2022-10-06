import { useState, useEffect, FormEvent } from 'react';

import * as Checkbox from '@radix-ui/react-checkbox';
import * as Select from '@radix-ui/react-select';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import * as Dialog from '@radix-ui/react-dialog';
import * as AlertDialog from '@radix-ui/react-alert-dialog';

import { GameController, Check, CaretDown } from 'phosphor-react';
import axios from 'axios';

import { Input } from './Form/Input';
import { Alert } from './Alert';


interface Game {
  id: string;
  title: string;
}

interface Alert {
  title: string;
  content: string;
}


export function CreateAdModal() {
  const [ games, setGames ] = useState<Game[]>([]);  
  const [ weekDays, setWeekDays ] = useState<string[]>([]);  
  const [ useVoiceChannel, setUseVoiceChannel ] = useState(false);  
  const [ alertState, setAlertState ] = useState(false);
  const [ alertInfoState, setAlertInfoState ] = useState(true);


  useEffect(() => {
    axios('http://localhost:3333/games')
      .then(response => {
        setGames(response.data)
      })      

  }, [])

  
  async function handleCreateAd(event: FormEvent) {
    event.preventDefault()

    //setAlertState(false)

    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

    //Validação fazer

    try {
      await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
        "name": data.name,
        "yearsPlaying": Number(data.yearsPlaying),
        "discord": data.discord,
        "weekDays":  weekDays.map(Number),
        "hourStart": data.hourStart,
        "hourEnd": data.hourEnd,
        "useVoiceChannel": useVoiceChannel  
      })
    

      setAlertInfoState(true)
      setAlertState(true)

    } catch (err) {
      setAlertInfoState(false)
      setAlertState(true)
    }
  }

  


  return (
      <>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

          <Dialog.Content 
            className="
              fixed bg-[#2A2634] 
              py-8 
              px-10 
              text-white
              top-1/2
              left-1/2
              -translate-x-1/2
              -translate-y-1/2
              rounded-lg
              w-[480px]
              shadow-lg
              shadow-black/25"
          >
            <Dialog.Title className="text-3xl font-black">Publique seu anúncio</Dialog.Title>

              <form onSubmit={handleCreateAd} action="" className="mt-8 flex flex-col gap-4">

                <div className="flex flex-col gap-2">
                  <label htmlFor="game" className="font-semibold">Qual o game?</label>

                  <Select.Root name="game"> 
                    <Select.Trigger
                      id="game" 
                      className="
                        bg-zinc-900 
                        py-3 
                        px-4 
                        rounded 
                        text-sm 
                        placeholder:text-zinc-500
                        flex
                        justify-between 
                        appearence-none"
                      >
                      <Select.Value placeholder="Selecione o game que deseja jogar" />
                      <CaretDown size={20} />
                    </Select.Trigger>
                    
                    <Select.Content
                      className="
                        bg-zinc-500 
                        py-3 
                        px-4
                        fixed
                        w-[400px]
                        top-[175px]
                        rounded 
                        text-sm 
                        appearence-none"
                    >
                        {games.map(game => {
                          return ( 
                            <Select.Item 
                              key={game.id} 
                              value={game.id} 
                              className="hover:bg-violet-600 rounded px-2"
                            >
                              <Select.ItemText>{game.title}</Select.ItemText>
                            </Select.Item>
                          )
                        })}
                    </Select.Content>
                  </Select.Root>

                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="name">Seu nome (ou nickname)</label>
                  <Input name="name" id="name" placeholder="Como te chamam dentro do game?" />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                    <Input 
                      name="yearsPlaying"  
                      id="yearsPlaying" 
                      type="number" 
                      placeholder="Tudo bem ser ZERO" 
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="discord">Qual seu Discord?</label>
                    <Input name="discord" id="discord" placeholder="Usuario#0000" />
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="weekDays">Quando costuma jogar?</label>
                    
                    <ToggleGroup.Root 
                      type="multiple" 
                      className="grid grid-cols-4 gap-2"
                      value={weekDays}
                      onValueChange={setWeekDays}
                      >
                      <ToggleGroup.Item
                        value="0"
                        title="Domingo"
                        className={`
                          w-11 
                          h-11 
                          rounded  
                          ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}
                        `}
                      >
                      D
                      </ToggleGroup.Item>

                      <ToggleGroup.Item
                        value="1"
                        title="Segunda"
                        className={`
                          w-11 
                          h-11 
                          rounded  
                          ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}
                        `}
                      >
                      S
                      </ToggleGroup.Item>

                      <ToggleGroup.Item
                        value="2"
                        title="Terça"
                        className={`
                          w-11 
                          h-11 
                          rounded  
                          ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}
                        `}
                      >
                      T
                      </ToggleGroup.Item>
                      
                      <ToggleGroup.Item
                        value="3"
                        title="Quarta"
                        className={`
                          w-11 
                          h-11 
                          rounded  
                          ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}
                        `}
                      >
                      Q
                      </ToggleGroup.Item>

                      <ToggleGroup.Item
                        value="4"
                        title="Quinta"
                        className={`
                          w-11 
                          h-11 
                          rounded  
                          ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}
                        `}
                      >
                      Q
                      </ToggleGroup.Item>

                      <ToggleGroup.Item
                        value="5"
                        title="Sexta"
                        className={`
                          w-11 
                          h-11 
                          rounded  
                          ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}
                        `}
                      >
                      S
                      </ToggleGroup.Item>

                      <ToggleGroup.Item
                        value="6"
                        title="Sábado"
                        className={`
                          w-11 
                          h-11 
                          rounded  
                          ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}
                        `}
                      >
                      S
                      </ToggleGroup.Item>
                    </ToggleGroup.Root>

                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <label htmlFor="hourStart">Qual horário do dia?</label>
                    <div className="grid grid-col gap-2">
                      <Input name="hourStart" id="hourStart" type="time" placeholder="De" />
                      <Input name="hourEnd" id="hourEnd" type="time" placeholder="Até" />
                    </div>
                  </div>
                </div>

                <label className="mt-2 flex gap-2 items-center text-sm">
                  <Checkbox.Root 
                    className="w-6 h-6 p-1 rounded bg-zinc-900"
                    checked={useVoiceChannel}
                    onCheckedChange={(checked) => {
                      if (checked === true) {
                        setUseVoiceChannel(true)
                      }
                      else {
                        setUseVoiceChannel(false)
                      }
                    }}
                  >
                    <Checkbox.Indicator>
                      <Check   className="w-4 h-4 text-emerald-400" />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  Costumo me conectar ao chat de voz
                </label>

                <footer className="mt-4 flex justify-end gap-4">
                  <Dialog.Close 
                    type="button"
                    className="
                      bg-zinc-500 
                      px-5 
                      h-12 
                      rounded-md 
                      font-semibold
                      hover:bg-zinc-600"
                  >
                    Cancelar
                  </Dialog.Close>
                  <button 
                    type="submit"
                    className="
                      bg-violet-500 
                      px-5 h-12 
                      rounded-md 
                      font-semibold 
                      flex items-center 
                      gap-3
                      hover:bg-violet-600"
                  >
                    <GameController size={24} />
                    Encontrar duo
                  </button>
                </footer>

              </form>   
          
          </Dialog.Content>


        </Dialog.Portal>

        <AlertDialog.Root open={alertState} onOpenChange={setAlertState}>
          <Alert 
            title = {
              alertInfoState == true ? "Sucesso!!" : "Ops! Deu erro!"
            }
            content = {
              alertInfoState == true ? "Anúncio criado com suceso!" : "Erro ao criar o anúncio" 
            }
          />
        </AlertDialog.Root>
      </>
      )  

}
