const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


//DOM Elements
const main = document.querySelector("main")


//delete pokemon

function releasePokemon(event){
    const id = event.target.dataset.pokemonId

     const li = event.target.closest("li")
     li.remove()
    fetch(`${POKEMONS_URL}/${id}`, {
    method: 'DELETE', 
    })
    .then(response => response.json())
    .then(data => {
    console.log('Deleted:', data);
    })
   
}

///fetch random pokemon

function addPokemon (event){
    console.log(event.target.dataset.trainerId)
    console.log(event.target)
    const button = event.target
    const id = event.target.dataset.trainerId
    data = {"trainer_id": id}
    fetch(POKEMONS_URL, {
    method: 'POST', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(returnedPokemon => {
    console.log('Success added:', returnedPokemon)
        const div = button.closest("div")
        const ul = div.querySelector("ul")
        renderPokemon(returnedPokemon, ul)
    })
    .catch((error) => {
    console.error('Error:', error);
    });
}


function displayTrainer(trainer){
    cardDiv = document.createElement("div")
    cardDiv.className = "card"
    cardDiv.dataset.id = trainer.id
    const p = document.createElement("p")
    p.textContent = trainer.name
    const button = document.createElement("button")
    button.dataset.trainerId = trainer.id
    button.textContent = "Add Pokemon"
    button.addEventListener("click", addPokemon)
    const ul = document.createElement("ul")
    cardDiv.append(p, button, ul)
    trainer.pokemons.forEach(function (pokemon){
        renderPokemon(pokemon, ul)
    })
    main.append(cardDiv)
}

function renderPokemon(pokemon, ul){
    
    const li = document.createElement("li")
    li.textContent = `${pokemon.nickname} (${pokemon.species})`
    const releaseBtn = document.createElement("button")
    releaseBtn.className = "release"
    releaseBtn.dataset.pokemonId = pokemon.id
    releaseBtn.textContent = "Release"
    releaseBtn.addEventListener("click", releasePokemon)
    li.append(releaseBtn)
    ul.append(li)
}

function renderTrainers(trainersArray){
    trainersArray.forEach(displayTrainer)
}

function initialize (){
    fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(trainersArray => renderTrainers(trainersArray));

}
initialize () 