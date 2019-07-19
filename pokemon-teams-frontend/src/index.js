const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", function(e) {
    fetchTrainers()
})

function fetchTrainers() {
    fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(showTrainers)
}

function showTrainers(json) {
    const main = document.querySelector("main")
   json.forEach(trainer => {
    let card = document.createElement("div")
    main.append(card)
    card.classList = "card"
    card.dataset.dataId = `#{trainer.id}`
    card.innerHTML = `
     <p>${trainer.name}</p>
     <button data-trainer-id="${trainer.id}" id="button-${trainer.id}" class="catch">Add Pokemon</button>
     <ul id="pokelist-${trainer.id}">
     </ul>
     `;
    trainer.pokemons.forEach(pokemon => {
        const ul = document.querySelector(`#pokelist-${trainer.id}`)
        let li = document.createElement("li")
        li.id = `poke-list-item${pokemon.id}`
        ul.append(li)
        li.innerHTML = `
            ${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id=${pokemon.id}>Release</button>
          `

    }) 
    
});
    catchPokemon()
    throwPokemonInTrash()
}


function throwPokemonInTrash() {
    const buttons = document.querySelectorAll(".release")
        buttons.forEach(button => {
            button.addEventListener("click", function(e) {
                let pokemonId = event.target.dataset 
                let id = pokemonId["pokemonId"];
                fetch(`${POKEMONS_URL}/${id}`, {
                    method: "delete",
                    headers: {
                    "Content-Type": "application/json"},
                    body: JSON.stringify({
                        id: pokemonId 
                    })
                }).then(response => response.json())
                   .then(removeElement)
            })
        })
}

function removeElement(json) {
    let li = document.querySelector(`#poke-list-item${json.id}`)
    li.remove()
}

function catchPokemon() {
    let buttons = document.querySelectorAll(".catch")
    buttons.forEach(button => {
        button.addEventListener("click", function(e) {
            let trainerId = event.target.dataset 
            addPokemon(trainerId)
        })
    })
}

function addPokemon(trainerId) {
    fetch(POKEMONS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"},
        body: JSON.stringify({
            trainer_id: trainerId
        })
    })
    .then(response => response.json())
    .then(showPokemon)
}

function showPokemon(pokemon) {
    const ul = document.querySelector(`#pokelist-${pokemon.trainer_id}`)
    let li = document.createElement("li")
    ul.append(li)
    li.id = `poke-list-item${pokemon.id}`
    li.innerHTML = `
            ${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id=${pokemon.id}>Release</button>
          `
}

 





