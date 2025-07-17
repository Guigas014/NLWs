const form = document.getElementById("form")
const apiKeyInput = document.getElementById("apiKey")
const gameSelect = document.getElementById("gameSelect")
const questionInput = document.getElementById("questionInput")
const askButton = document.getElementById("askButton")
const aiResponse = document.getElementById("aiResponse")

form.addEventListener("submit", async (event) => {
  event.preventDefault()

  const apiKey = apiKeyInput.value
  const game = gameSelect.value
  const question = questionInput.value

  // console.log({ apiKey, game, question })

  if (apiKey == "" || game == "" || question == "") {
    alert("Por favor, preencha todos os campos.")

    return
  }

  // Muda o estado do botão quando está perguntando
  askButton.disabled = true
  askButton.textContent = "Perguntando..."
  askButton.classList.add("loading")

  try {
    // Perguntar para IA
    const text = await perguntarAI(apiKey, game, question)

    aiResponse.querySelector(".response-content").innerHTML =
      markdownToHtml(text)

    aiResponse.classList.remove("hidden")
  } catch (error) {
    console.log("Erro: ", error)
  } finally {
    askButton.disabled = false
    askButton.textContent = "Perguntar"
    askButton.classList.remove("loading")
  }
})

const perguntarAI = async (apiKey, game, question) => {
  const model = "gemini-2.5-flash"

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`

  let pergunta = ""

  // Prompt Enginer
  // olha, tenho esse jogo ${game} e gostaria de saber ${question} // modelo antiga e básico
  const perguntaLeague = `
    ## Especialidade
    Você é um especialista assistente de meta para o jogo ${game}

    ## Tarefa
    Você deve responder as perguntas do usuário com base no seu conhecimento sobre o jogo, estratégias, build e dicas

    ## Regras
    - Se você não souber a resposta, responda com 'Não sei' e não tente inventar uma resposta.
    - Se a pergunta não for sobre o jogo, responda com 'Essa pergunta não é sobre o jogo ${game}'.
    - Considere a data atual ${new Date().toLocaleDateString("pt-BR")}
    - Faça pesquisas atualizadas sobre o patch atual, baseado na data atual, para dar uma resposta coerente.
    - Nunca responda itens que você não tenha certeza de que existe no patch atual.

    ## Resposta
    - Economize na resposta, seja direto e responda no máximo 500 caracateres.
    - Responda em Markdown.
    - Não precisa fazer nenhuma saudação ou despedida, apenas responda a pergunta.

    ## Exemplo de resposta
    pergunta do usuário: "Qual é a melhor build para o campeão X no patch atual?"
    resposta> "A melhor build para o campeão X no patch atual é: 
    \n\n **Itens:** 
    \n\n coloque aqui os itens recomendados
    \n\n **Runas:**
    \n\n coloque aqui as runas recomendadas

    ---
    Aqui está a pergunta do usuário: ${question}
  `

  const perguntaFishing = `
     ## Especialidade
    Você é um especialista assistente de meta para o jogo ${game}

    ## Tarefa
    Você deve responder as perguntas do usuário com base no seu conhecimento sobre o jogo, estratégias, build e dicas

    ## Regras
    - Se você não souber a resposta, responda com 'Não sei' e não tente inventar uma resposta.
    - Se a pergunta não for sobre o jogo, responda com 'Essa pergunta não é sobre o jogo ${game}'.
    - Considere a data atual ${new Date().toLocaleDateString("pt-BR")}
    - Faça pesquisas atualizadas, baseado na data atual, para dar uma resposta coerente.

    ## Resposta
    - Economize na resposta, seja direto e responda no máximo 500 caracateres.
    - Responda em Markdown.
    - Não precisa fazer nenhuma saudação ou despedida, apenas responda a pergunta.

    ## Exemplo de resposta
    pergunta do usuário: "Qual é o melhor kit para pescar o peixe X?"
    resposta> "O melhor kit para pescar o peixe X é: 
    \n\n **Itens:** 
    \n\n coloque aqui os itens recomendados

    ---
    Aqui está a pergunta do usuário: ${question}
  `

  switch (game) {
    case "lol":
      pergunta = perguntaLeague
      break
    case "fishing planet":
      pergunta = perguntaFishing
      break
    default:
      console.error("Jogo não encontrado.")
      break
  }

  const contents = [
    {
      role: "user",
      parts: [
        {
          text: pergunta,
        },
      ],
    },
  ]

  // Ferramentas que a IA pode usar
  // Aqui estamos usando a ferramenta de busca do Google
  const tools = [
    {
      google_search: {},
    },
  ]

  // chamada para API
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents,
      tools,
    }),
  })

  const data = await response.json()
  // console.log({ data })

  return data.candidates[0].content.parts[0].text
}

const markdownToHtml = (text) => {
  const converter = new showdown.Converter()
  return converter.makeHtml(text)
}
