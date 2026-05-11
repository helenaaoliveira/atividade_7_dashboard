const lutadoresIniciais = [
    {
        nome: "João Mendes",
        categoria: "Peso Leve",
        vitorias: 10,
        derrotas: 2,
        nocautes: 6,
        pais: "Brasil"
    },

    {
        nome: "Carlos Thai",
        categoria: "Peso Médio",
        vitorias: 14,
        derrotas: 3,
        nocautes: 9,
        pais: "Tailândia"
    },

    {
        nome: "Pedro Lima",
        categoria: "Peso Pesado",
        vitorias: 20,
        derrotas: 5,
        nocautes: 15,
        pais: "Brasil"
    },

    {
        nome: "Lucas Silva",
        categoria: "Peso Leve",
        vitorias: 8,
        derrotas: 1,
        nocautes: 4,
        pais: "Argentina"
    },

    {
        nome: "Rafael Costa",
        categoria: "Peso Médio",
        vitorias: 16,
        derrotas: 7,
        nocautes: 11,
        pais: "Chile"
    },

    {
        nome: "André Fighter",
        categoria: "Peso Pesado",
        vitorias: 12,
        derrotas: 4,
        nocautes: 8,
        pais: "Brasil"
    },

    {
        nome: "Thiago Muay",
        categoria: "Peso Leve",
        vitorias: 9,
        derrotas: 2,
        nocautes: 5,
        pais: "México"
    },

    {
        nome: "Bruno Knockout",
        categoria: "Peso Médio",
        vitorias: 18,
        derrotas: 6,
        nocautes: 13,
        pais: "Estados Unidos"
    }
]

let lutadores = JSON.parse(localStorage.getItem("lutadores")) || lutadoresIniciais

const listaLutadores = document.getElementById("listaLutadores")
const filtroCategoria = document.getElementById("filtroCategoria")

const totalLutadores = document.getElementById("totalLutadores")
const mediaVitorias = document.getElementById("mediaVitorias")
const maiorNocaute = document.getElementById("maiorNocaute")

function salvarLocalStorage() {
    localStorage.setItem("lutadores", JSON.stringify(lutadores))
}

function renderizarLutadores(lista) {

    listaLutadores.innerHTML = ""

    for (let i = 0; i < lista.length; i++) {

        const lutador = lista[i]

        const card = document.createElement("div")
        card.classList.add("card-lutador")

        card.innerHTML = `
            <h2>${lutador.nome}</h2>
            <p><strong>Categoria:</strong> ${lutador.categoria}</p>
            <p><strong>Vitórias:</strong> ${lutador.vitorias}</p>
            <p><strong>Derrotas:</strong> ${lutador.derrotas}</p>
            <p><strong>Nocautes:</strong> ${lutador.nocautes}</p>
            <p><strong>País:</strong> ${lutador.pais}</p>
            <button onclick="excluirLutador(${i})">
                Excluir
            </button>
        `
        listaLutadores.appendChild(card)
    }
}

function excluirLutador(indice) {

    lutadores.splice(indice, 1)
    salvarLocalStorage()
    renderizarLutadores(lutadores)
    atualizarIndicadores()
}

function atualizarIndicadores() {

    totalLutadores.textContent = lutadores.length

    let somaVitorias = 0
    let maiorKO = 0

    for (let i = 0; i < lutadores.length; i++) {

        somaVitorias += lutadores[i].vitorias

        if (lutadores[i].nocautes > maiorKO) {
            maiorKO = lutadores[i].nocautes
        }
    }

    const media = somaVitorias / lutadores.length

    mediaVitorias.textContent = media.toFixed(1)

    maiorNocaute.textContent = maiorKO

}

filtroCategoria.addEventListener("change", function () {

    const categoriaSelecionada = filtroCategoria.value

    if (categoriaSelecionada === "Todos") {

        renderizarLutadores(lutadores)

    } else {

        const filtrados = []

        for (let i = 0; i < lutadores.length; i++) {

            if (lutadores[i].categoria === categoriaSelecionada) {
                filtrados.push(lutadores[i])
            }

        }

        renderizarLutadores(filtrados)
    }

})

const form = document.getElementById("formLutador")

form.addEventListener("submit", function (event) {

    event.preventDefault()

    const novoLutador = {
        nome: document.getElementById("nome").value,
        categoria: document.getElementById("categoria").value,
        vitorias: Number(document.getElementById("vitorias").value),
        derrotas: Number(document.getElementById("derrotas").value),
        nocautes: Number(document.getElementById("nocautes").value),
        pais: document.getElementById("pais").value
    }

    lutadores.push(novoLutador)

    salvarLocalStorage()

    renderizarLutadores(lutadores)

    atualizarIndicadores()

    form.reset()

})

renderizarLutadores(lutadores)

atualizarIndicadores()