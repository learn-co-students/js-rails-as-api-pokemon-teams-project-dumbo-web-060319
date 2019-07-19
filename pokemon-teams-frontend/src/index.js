const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const MAIN = document.querySelector('main');
const DIVCARDS = document.querySelectorAll('.card');

function slapThatTrainer(trainers) {
	for (let trainer of trainers) {
		let trainerCard = document.createElement('div');
		trainerCard.className = "card";
		trainerCard.dataset.id = trainer.id;
		trainerCard.innerHTML += `<p> ${trainer.name} </p>`
		trainerCard.innerHTML += `<button data-trainer-id="${trainer.id}" class="addPokemon"> Add Pokémon! </button>`;
		trainerCard.innerHTML += '<ul class="trainerPokemons"> </ul>'
		let listOfPokemon = trainerCard.querySelector('.trainerPokemons');
		MAIN.append(trainerCard);
		for (let pokemon of trainer.pokemons) {
			trainerCard.innerHTML += `<li>${pokemon.species} -- ${pokemon.nickname} <button class="release" data-pokemon-id="${pokemon.id}">Release</button> </li>`
		}
	}
}

function renderPage() {
	fetch(TRAINERS_URL)
	.then(resp => resp.json())
	.then(slapThatTrainer);
}

document.addEventListener("DOMContentLoaded", event => {
	renderPage();
});

function showNewPokemon(pokemon) {
	let targetCard = '<div> </div>';
	for (divCard of DIVCARDS) {
		if (divCard.dataset.id == poekmon.id) {
			targetCard = divCard;
			break;
		}
	}
}

function createPokemon(trainer_id) {
	fetch(POKEMONS_URL, {
		method: "POST",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			"trainer_id": trainer_id
		})
	})
	.then(response => response.json())
	.then(showNewPokemon)
}

document.addEventListener("click", event => {
	if (event.target.className === 'addPokemon'){
		console.log("hit");
		createPokemon(event.target.dataset.trainerId);
		// location.reload();

	}
}) 