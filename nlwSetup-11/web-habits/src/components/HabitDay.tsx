import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';

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

            <Popover.Arrow height={8} width={16} className="fill-zinc-900" />
          </Popover.Content>    

        </Popover.Portal>
      </Popover.Root>
  )
}
