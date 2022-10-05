import * as AlertDialog from '@radix-ui/react-alert-dialog';


interface AlertProps {
  title: string;
  content: string;
}


export function Alert(props: AlertProps) {
  return (

      <AlertDialog.Portal>
        <AlertDialog.Overlay className="bg-black/60 inset-0 fixed" />
        <AlertDialog.Content 
          className="
            fixed bg-[#2A2634] 
            py-6 
            px-10 
            text-white
            top-1/2
            left-1/2
            -translate-x-1/2
            -translate-y-1/2
            rounded-lg
            w-[380px]
            shadow-lg
            shadow-black/25"
        >
          <AlertDialog.Title className="text-xl font-black block mb-2">
            {props.title}
          </AlertDialog.Title>
          <AlertDialog.Description className="text-zinc-400 block mb-8">
            {props.content} 
          </AlertDialog.Description>
          

          <AlertDialog.Action className="
            w-[300px]
            flex
            justify-end"
          >
            <span 
              className="
                py-1 
                px-4 
                bg-violet-500 
                hover:bg-violet-600 
                text-white 
                rounded"
          >
            OK
          </span>
          </AlertDialog.Action>
        </AlertDialog.Content>
      </AlertDialog.Portal>


  )
}
