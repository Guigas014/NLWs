let participantes = [
  {
    nome: "Guilherme",
    email: "gui@hotmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: new Date(2024, 2, 25, 22, 00)
  },
  {
    nome: "Mayk",
    email: "mayk@hotmail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: null
  },
  {
    nome: "Ana",
    email: "ana@gmail.com",
    dataInscricao: new Date(2024, 2, 23, 10, 30),
    dataCheckIn: new Date(2024, 2, 25, 20, 15)
  },
  {
    nome: "João",
    email: "joao@yahoo.com",
    dataInscricao: new Date(2024, 2, 23, 14, 45),
    dataCheckIn: null
  },
  {
    nome: "Maria",
    email: "maria@gmail.com",
    dataInscricao: new Date(2024, 2, 23, 16, 10),
    dataCheckIn: new Date(2024, 2, 25, 21, 30)
  },
  {
    nome: "Pedro",
    email: "pedro@yahoo.com",
    dataInscricao: new Date(2024, 2, 24, 9, 20),
    dataCheckIn: new Date(2024, 2, 25, 19, 50)
  },
  {
    nome: "Lucas",
    email: "lucas@hotmail.com",
    dataInscricao: new Date(2024, 2, 24, 12, 40),
    dataCheckIn: null
  },
  {
    nome: "Camila",
    email: "camila@gmail.com",
    dataInscricao: new Date(2024, 2, 24, 15, 55),
    dataCheckIn: new Date(2024, 2, 25, 23, 10)
  },
  {
    nome: "Rodrigo",
    email: "rodrigo@yahoo.com",
    dataInscricao: new Date(2024, 2, 25, 8, 10),
    dataCheckIn: new Date(2024, 2, 25, 22, 45)
  },
  {
    nome: "Laura",
    email: "laura@hotmail.com",
    dataInscricao: new Date(2024, 2, 25, 11, 30),
    dataCheckIn: new Date(2024, 2, 25, 21, 20)
  }
]


const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)
  let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

  if (participante.dataCheckIn == null) {
    dataCheckIn = `
      <button 
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
      >
        Confirmar check-in
      </button>
    `
  }

  return `
  <tr>
    <td>
    <strong>${participante.nome}</strong>
    <br>
    <small>${participante.email}</small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
  </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""

  for (let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  //Substitui informação do HTML
  }

  document.querySelector('tbody').innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const formData = new FormData(event.target)

  const participante = {
    nome: formData.get('nome'),
    email: formData.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null
  }

  //Verificar se o participante já existe
  const participanteExiste = participantes.find((p) => {
    return p.email == participante.email
  })

  if (participanteExiste) {
    alert("Email já cadastrado!")
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)
  
  //Limpar  o formulário
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
  //Confirmar se quer realmente fazer o checkin
  const result = confirm('Tem certeza que deseja fazer o check-in?')

  if (result == false) { return }
 //encontrar o participante dentro da lista
  const participante = participantes.find((p) => {
    return p.email == event.target.dataset.email

  })
 //atualizar o check-in do participante
  participante.dataCheckIn = new Date()
 //atualizar a lista de participantes
 atualizarLista(participantes)
}

