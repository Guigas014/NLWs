//Lista de dados gerada pelo ChatGPT
const perguntas = [
  {
    pergunta: "O que significa 'DOM' em JavaScript?",
    respostas: [
      "Documento Online de Modelagem",
      "Modelo de Objeto de Documento",
      "Data de Operação em Múltiplos",
    ],
    correta: 1
  },
  {
    pergunta: "Qual é a função do método 'querySelector'?",
    respostas: [
      "Selecionar elementos por classe",
      "Selecionar elementos por ID",
      "Selecionar elementos por nome",
    ],
    correta: 0
  },
  {
    pergunta: "O que é um 'callback' em JavaScript?",
    respostas: [
      "Uma função que é executada imediatamente",
      "Uma função que é passada como argumento para outra função",
      "Um tipo de variável em JavaScript",
    ],
    correta: 1
  },
  {
    pergunta: "Qual é a diferença entre 'let' e 'const' em declarações de variáveis?",
    respostas: [
      "Nenhuma, são sinônimos",
      "let é usado para variáveis mutáveis e const para variáveis imutáveis",
      "const é usado para variáveis globais e let para variáveis locais",
    ],
    correta: 1
  },
  {
    pergunta: "O que é o 'hoisting' em JavaScript?",
    respostas: [
      "Uma técnica de animação de elementos HTML",
      "O processo de mover declarações para o topo do escopo antes da execução",
      "Um método para lidar com erros de código",
    ],
    correta: 1
  },
  {
    pergunta: "Qual é a finalidade do método 'map' em arrays?",
    respostas: [
      "Modificar todos os elementos do array original",
      "Criar um novo array com elementos modificados",
      "Ordenar os elementos do array em ordem alfabética",
    ],
    correta: 1
  },
  {
    pergunta: "O que é uma 'Promise' em JavaScript?",
    respostas: [
      "Uma declaração de variável",
      "Um objeto representando a eventual conclusão ou falha de uma operação assíncrona",
      "Um tipo de estrutura condicional",
    ],
    correta: 1
  },
  {
    pergunta: "Qual é a diferença entre '==' e '===' em JavaScript?",
    respostas: [
      "'==' compara apenas os valores, '===' compara valores e tipos de dados",
      "'===' compara apenas os valores, '==' compara valores e tipos de dados",
      "Não há diferença, são sinônimos",
    ],
    correta: 0
  },
  {
    pergunta: "O que é 'NaN' em JavaScript?",
    respostas: [
      "Um acrônimo para 'Not a Number'",
      "Um método para converter strings em números",
      "Um operador lógico",
    ],
    correta: 0
  },
  {
    pergunta: "Qual é a função do método 'splice' em arrays?",
    respostas: [
      "Adicionar elementos no início do array",
      "Remover elementos do array e/ou adicionar novos elementos em sua posição",
      "Ordenar os elementos do array em ordem crescente",
    ],
    correta: 1
  },
];


const quiz = document.querySelector('#quiz')
const template = document.querySelector('template')

const corretas = new Set()
const totalDePerguntas = perguntas.length
const mostrarTotal = document.querySelector('#acertos span')


for (const item of perguntas) {
  const quizItem = template.content.cloneNode(true)
  quizItem.querySelector('h3').textContent = item.pergunta

  for (let resposta of item.respostas) {
    const dt = quizItem.querySelector('dl dt').cloneNode(true)
    dt.querySelector('span').textContent = resposta
    dt.querySelector('input').setAttribute('name', 'pergunta-' + perguntas.indexOf(item))
    dt.querySelector('input').value = item.respostas.indexOf(resposta)
    
    dt.querySelector('input').onchange = (event) => {
      corretas.delete(item)
      
      if(event.target.value == item.correta) {
        corretas.add(item)
      }
      mostrarTotal.textContent = corretas.size + " de " + totalDePerguntas
    }


    quizItem.querySelector('dl').appendChild(dt)
  }
  quizItem.querySelector('dl dt').remove()

  quiz.appendChild(quizItem)
}

