import * as Popover from '@radix-ui/react-popover';
import * as Checkbox from '@radix-ui/react-checkbox';
import clsx from 'clsx';
import { Check } from 'phosphor-react';

import { ProgressBar } from './ProgressBar';


interface HabitDayProps {
  completed: number;
  amount: number;
}


export function HabitDay({ completed, amount }: HabitDayProps) {

  const completedPercentage = Math.round((completed / amount) * 100)
  
  
  return (
      <Popover.Root>
        <Popover.Trigger 
        className={clsx("w-10 h-10 border-2 rounded-lg", {
         'bg-zinc-900 border-zinc-800': completedPercentage === 0,
         'bg-blue-900 border-blue-700': completedPercentage > 0 && completedPercentage < 20,
         'bg-blue-800 border-blue-600': completedPercentage >= 20 && completedPercentage < 40,
         'bg-blue-700 border-blue-500': completedPercentage >= 40 && completedPercentage < 60,
         'bg-blue-600 border-blue-500': completedPercentage >= 60 && completedPercentage < 80,
         'bg-blue-500 border-blue-400': completedPercentage >= 80,
          })}
        />
        
        <Popover.Portal className="">

          <Popover.Content 
            className="min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col"
          >
            <span className="font-semibold text-zinc-400">sexta-feira</span>
            <span className="mt-1 font-extrabold leading-tight text-3xl">20/01</span>

            <ProgressBar progress={completedPercentage} />      

            <div className="mt-6 flex flex-col gap-3">
              <Checkbox.Root
                className="flex items-center gap-3 group"
              >
                <div className="
                  h-8 
                  w-8 
                  rounded-lg 
                  flex 
                  items-center
                  justify-center
                  bg-zinc-900
                  border-2
                  border-zinc-800
                  group-data-[state=checked]:bg-green-500
                  group-data-[state=checked]:border-green-500"
                >
                  <Checkbox.Indicator>
                    <Check size={20} className="text-white" />
                  </Checkbox.Indicator>
                </div>

                <span className="
                  font-semibold 
                  text-xl 
                  text-white 
                  leading-tight
                  group-data-[state=checked]:line-through
                  group-data-[state=checked]:text-zinc-400"
                >
                  Beber 2L de água
                </span>
              </Checkbox.Root>
            </div>

            <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
          </Popover.Content>    

        </Popover.Portal>
      </Popover.Root>
  )
}
