import { server } from "./server.js"

const form = document.querySelector("#form")
const input = document.querySelector("#url")
const content = document.querySelector("#content")

form.addEventListener("submit", async (event) => {
  event.preventDefault()
  content.classList.add("placeholder")

  const videoURL = input.value

  if (!videoURL.includes("shorts")) {
    return (content.textContent = "Não é um short!")
  }

  const [_, params] = videoURL.split("/shorts/") //pega o segundo item da lista
  const [videoId] = params.split("?si") //pega só o primeiro item da lista

  content.textContent = "obtendo o texto do áudio..."

  const transcription = await server.get("/summary/" + videoId)

  content.textContent = "Realizando o resumo..."

  const summary = await server.post("/summary", {
    text: transcription.data.result,
  })

  content.textContent = summary.data.result
  content.classList.remove("placeholder")
})
