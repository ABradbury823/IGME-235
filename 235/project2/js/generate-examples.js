


let limit = 0;
//let regionStartOffset = 0;
let currentPageOffset1 = 0;
let currentPageOffset2 = 0;
let resultsNum1 = 0;
let resultsNum2 = 0;
let isType1 = true;
let examplePokemon1 = null;
let examplePokemon2 = null;
let generatePressed = true;

function dataExampleLoaded(e){
    let xhr = e.target;

    let obj = JSON.parse(xhr.responseText);

    if(obj.name == type1){isType1 = true;}
    else{isType1 = false;}

    if(isType1){
        examplePokemon1 = obj.pokemon;
        resultsNum1 = examplePokemon1.length;
    }
    else{
        examplePokemon2 = obj.pokemon;
        resultsNum2 = examplePokemon2.length;
        }
    //console.log(examplePokemon);

    limit = document.querySelector("#limit").value;
    limit = parseInt(limit);
    //regionStartOffset = document.querySelector("#region").value;

    //update to searching status and search for requested type pokemon
    if(isType1){
        document.querySelector("#examples-status1").innerHTML = `<b>Searching for ${capitalize(type1)} type Pokémon...</b>`;

        //randomize offset if this is generated by clicking generate button
        if(generatePressed){currentPageOffset1 = Math.floor(Math.random() * (resultsNum1 / limit));}

        //example Pokemon has just pokemon name and url
        //find pokemon with another request
        for(let i = currentPageOffset1; i < currentPageOffset1 + limit; i++){
            if(i < resultsNum1){
            getPokemonData(examplePokemon1[i].pokemon.url);
            }
        }

        //update to found status
        let prevButton = document.querySelector("#previous-examples1");
        let nextButton = document.querySelector("#next-examples1");
        activateButtons(prevButton, nextButton, currentPageOffset1, resultsNum1);
        document.querySelector("#examples-status1").innerHTML = 
            `<b>${resultsNum1} results found for ${capitalize(type1)} type Pokémon:</b>`
    }
    else{
        document.querySelector("#examples-status2").innerHTML = `<b>Searching for ${capitalize(type2)} type Pokémon...</b>`;

        if(generatePressed){currentPageOffset2 = Math.floor(Math.random() * (resultsNum2 / limit));}

        for(let i = currentPageOffset2; i < currentPageOffset2 + limit; i++){
            if(i < resultsNum2){
            getPokemonData(examplePokemon2[i].pokemon.url);
            }
        }

        let prevButton = document.querySelector("#previous-examples2");
        let nextButton = document.querySelector("#next-examples2");
        activateButtons(prevButton, nextButton, currentPageOffset2, resultsNum2);
        document.querySelector("#examples-status2").innerHTML = 
            `<b>${resultsNum2} results found for ${capitalize(type2)} type Pokémon:</b>`
    }

    //if(type2 != "" && isType1){isType1 != isType1;}
}

function getPokemonData(url){
    let xhr = new XMLHttpRequest();

    xhr.onload = pokemonDataLoaded;
    xhr.onerror = pokemonDataError;

    xhr.open("GET", url);
    xhr.send();
}

function pokemonDataLoaded(e){
    let xhr = e.target;
    let obj = JSON.parse(xhr.responseText);
    let pokemonName = capitalize(obj.name);

    //certain forms go above max pokedex number
    let dexNumber = 0;
    if(obj.id < 899){dexNumber = obj.id;}
    else{dexNumber = "???";}

    let pokemonSprite = obj.sprites.front_default;

    //show both types (if applicable)
    let type = "";
    for(let i = 0; i < obj.types.length; i++){
        if(obj.types.length > 1 && i == 0){
        type += capitalize(obj.types[i].type.name) + "/";
        }
        else{type += capitalize(obj.types[i].type.name);}
    }

    //make div to show example
    let newDiv = document.createElement("div");
    newDiv.innerHTML = `<p id="${dexNumber}" class="name">#${dexNumber} ${pokemonName}</p>
                        <img src="${pokemonSprite}" alt="${pokemonName} Image" class="image">
                        <p class="type">${type}</p>`;
    newDiv.style.border = "solid 1px black";
    newDiv.style.order = dexNumber;

    //add new div to proper list
    let exampleList = null;
    if(isType1){
        exampleList = document.querySelector("#example-pokemon1");
        exampleList.appendChild(newDiv);
    }
    else{
        exampleList = document.querySelector("#example-pokemon2")
        exampleList.appendChild(newDiv);
    }

    //if(type2 != "" && document.querySelector("#example-pokemon1").childElementCount == limit){isType1 = false;}
    //else if(type2 != "" && document.querySelector("#example-pokemon2").childElementCount == limit){isType1 = true;}
}

//PURPOSE: print an error message if there is a problem returning pokemon data from the api
//ARGUMENTS: the XMLHttpRequest that sent the error
function pokemonDataError(e){
    console.log("There was an error retrieving data for a Pokémon!")
}

//PURPOSE: activate and deactivate next and previous buttons for example pokemon
//ARGUMENTS: the previous button node, the next button node, amount of offset from first page of pokemon, number of search results
function activateButtons(prevButton, nextButton, offset, resultsNum){
    //previous button can turn off/on if a different page is being displayed
    if(offset == 0){prevButton.disabled = true;}
    else{prevButton.disabled = false;}

    //next button can turn off/on if the user is on the last page
    if(offset + limit >= resultsNum){nextButton.disabled = true;}
    else{nextButton.disabled = false;}
}
