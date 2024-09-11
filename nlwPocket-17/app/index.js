const { select } = require("@inquirer/prompts")

const start = async () => {
  while (true) {
    let opcao = await select({
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
        console.log("Vamos cadastrar!")
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
