import { useState } from 'react'

import { CloseButton } from '../CloseButton'
import { FeedbackTypeStep } from './Steps/FeedbackTypeStep'
import { FeedbackContentStep } from './Steps/FeedbackContentStep'

import bugImageUrl from '../../assets/bug.svg'
import ideaImageUrl from '../../assets/idea.svg'
import thoughtImageUrl from '../../assets/thought.svg'


export const feedbackTypes = {
  BUB: {
    title: 'Problema',
    image: {
      source: bugImageUrl,
      alt: 'Image de um inseto'
    },
  },
  IDEA: {
    title: 'Ideia',
    image: {
      source: ideaImageUrl,
      alt: 'Image de uma lampada'
    },
  },
  OTHER: {
    title: 'Outro',
    image: {
      source: thoughtImageUrl,
      alt: 'Image de uma nuvem'
    },
  },
}

export type FeedbackType = keyof typeof feedbackTypes



export function WidgetForm() { 
   const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)

    
   function handleRestartFeedback() {
     setFeedbackType(null);
   }


	 return ( 
    <div className="bg-zinc-900
      p-4
      relative
      rounded-2xl
      mb-4
      flex
      flex-col
      items-center
      shadow-lg
      w-[calc(100vw-2rem)]
      md:w-auto"
    >
      

      {!feedbackType ? (
        <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
      ) 
      : (
        <FeedbackContentStep 
          feedbackType={feedbackType}
          onFeedbackRestartRequested={handleRestartFeedback} 
        /> 
      )}
      <footer className="text-xs text-neutral-400">
        Feito com ♥ pela <a href="https://rocketseat.com.br" 
                            className="underline underline-offset-2"
                         >
                          Rocketseat
                         </a>
      </footer>
    
    </div>  
	 ); 

}
