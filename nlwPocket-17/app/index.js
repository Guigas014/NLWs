const { select, input } = require("@inquirer/prompts")

let metas = []

async function cadastrarMeta() {
  const meta = await input({ message: "Digite a meta: " })

  if (meta.length == 0) {
    console.log("A meta não pode ser vazia.")
    return
  }

  metas.push({ value: meta, checked: false })
}

const start = async () => {
  while (true) {
    const opcao = await select({
      message: "Menu >",
      choices: [
        {
          name: "Cadastrar meta",
          value: "cadastrar",
        },
        {
          name: "Listar metas realizadas",
          value: "listar realizadas",
        },
        {
          name: "Listar metas abertas",
          value: "listar abertas",
        },
        {
          name: "Sair",
          value: "sair",
        },
      ],
    })

    switch (opcao) {
      case "cadastrar":
        await cadastrarMeta()
        console.log(metas)
        break
      case "listar":
        console.log("Vamos listar!")
        break
      case "sair":
        console.log("Até a próxima!!")
        return

      default:
        break
    }
  }
}

start()
