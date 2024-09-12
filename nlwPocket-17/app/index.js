const { select, input, checkbox } = require("@inquirer/prompts")
const fs = require("fs").promises

let mensagem = "Bem vindo ao App de metas!"
let metas

const carregarMetas = async () => {
  try {
    const dados = await fs.readFile("metas.json", "utf-8")

    // Transforma o objeto JSON em um objeto do tipo JS
    metas = JSON.parse(dados)
  } catch (error) {
    // console.log(error.data)
    metas = []
  }
}

const salvarMetas = async () => {
  try {
    // Transforma o objeto do tipo JS em um objeto do tipo JSON
    await fs.writeFile("metas.json", JSON.stringify(metas, null, 2))
  } catch (error) {
    // console.log(error.data)
  }
}

async function cadastrarMeta() {
  const meta = await input({ message: "Digite a meta: " })

  if (meta.length == 0) {
    mensagem = "A meta não pode ser vazia."
    return
  }

  metas.push({ value: meta, checked: false })

  mensagem = "Meta cadastrada com sucesso!"
}

async function listarMetas() {
  if (metas.length == 0) {
    mensagem = "Não existem metas cadastradas!"
    return
  }

  const respostas = await checkbox({
    message:
      "Use as setas para mudar de meta, o espaço para marcar e desmarcar e o Enter para finalizar essa etapa",
    choices: [...metas],
    instructions: false,
  })

  //Desmarca todas as metas
  metas.forEach((m) => {
    m.checked = false
  })

  if (respostas.length == 0) {
    mensagem = "Nenhuma meta selecionada!"
    return
  }

  respostas.forEach((resposta) => {
    const meta = metas.find((m) => {
      return m.value == resposta
    })

    meta.checked = true
  })

  mensagem = "Meta(s) marcada(s) como concluída(s)!"
}

async function metasRealizadas() {
  const realizadas = metas.filter((meta) => {
    return meta.checked
  })

  if (realizadas.length == 0) {
    mensagem = "Não existem metas realizadas!"
    return
  }

  await select({
    message: "Metas Realizadas (" + realizadas.length + ")",
    choices: [...realizadas],
  })
}

async function metasAbertas() {
  const abertas = metas.filter((meta) => {
    return !meta.checked
  })

  if (abertas.length == 0) {
    mensagem = "Não existem metas abertas!"
    return
  }

  await select({
    message: "Metas Abertas (" + abertas.length + ")",
    choices: [...abertas],
  })
}

async function deletaMetas() {
  if (metas.length == 0) {
    mensagem = "Não existem metas cadastradas!"
    return
  }

  const metasDesmarcadas = metas.map((meta) => {
    return { value: meta.value, checked: false }
  })

  const itemsParaDeletar = await checkbox({
    message: "Selecione uma meta para deletar",
    choices: [...metasDesmarcadas],
    instructions: false,
  })

  if (itemsParaDeletar.length == 0) {
    mensagem = "Nenhuma meta para deletar!"
    return
  }

  itemsParaDeletar.forEach((item) => {
    metas = metas.filter((meta) => {
      return meta.value != item
    })
  })

  mensagem = "Meta(s) deleta(s) com sucesso!!"
}

function mostrarMensagem() {
  console.clear()

  if (mensagem != "") {
    console.log(mensagem)
    console.log("")
    mensagem = ""
  }
}

const start = async () => {
  carregarMetas()

  while (true) {
    mostrarMensagem()
    await salvarMetas()

    const opcao = await select({
      message: "Menu >",
      choices: [
        {
          name: "Cadastrar meta",
          value: "cadastrar",
        },
        {
          name: "Listar metas",
          value: "listar",
        },
        {
          name: "Metas realizadas",
          value: "realizadas",
        },
        {
          name: "Metas abertas",
          value: "abertas",
        },
        {
          name: "Deletar metas",
          value: "deletar",
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
        break
      case "listar":
        await listarMetas()
        break
      case "realizadas":
        await metasRealizadas()
        break
      case "abertas":
        await metasAbertas()
        break
      case "deletar":
        await deletaMetas()
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
