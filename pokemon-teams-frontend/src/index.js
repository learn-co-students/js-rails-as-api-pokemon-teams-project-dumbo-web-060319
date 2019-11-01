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
		trainerCard.innerHTML += `<ul class="trainerPokemons" id="trainer-id-${trainer.id}"> </ul>`
		let listOfPokemon = trainerCard.querySelector('.trainerPokemons');
		MAIN.append(trainerCard);
		let ul = trainerCard.querySelector('ul');
		for (let pokemon of trainer.pokemons) {
			ul.innerHTML += `<li>${pokemon.species} -- ${pokemon.nickname} <button class="release" data-pokemon-id="${pokemon.id}">Release</button> </li>`
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
	let ul = document.querySelector(`#trainer-id-${pokemon.trainer_id}`);
	// debugger;
	// do the debugger for this and find the null prob with query
	ul.innerHTML += `<li>${pokemon.species} -- ${pokemon.nickname} <button class="release" data-pokemon-id="${pokemon.id}">Release</button> </li>`
}

function createPokemon(trainerId) {
	fetch(POKEMONS_URL, {
		method: "POST",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			"trainer_id": trainerId
		})
	})
	.then(response => response.json())
	.then(showNewPokemon)
}

function updateList(json) {
	console.log(json);
}

function deletePokemon(pokemonId) {
	fetch(`${POKEMONS_URL}/${pokemonId}`, {
		method: "DELETE",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			"id": pokemonId
		})
	})
	location.reload();
}

document.addEventListener("click", event => {
	if (event.target.className === 'addPokemon') {
		createPokemon(event.target.dataset.trainerId);
		// location.reload();
	}
	else if (event.target.className === 'release') {
		deletePokemon(event.target.dataset.pokemonId)
	}
}) 