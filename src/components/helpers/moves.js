// get generation specific moves
function getMoves(pokemonData) {
    // get basic moves list
    return new Promise((resolve, reject) => {
        if (pokemonData != null) {
            resolve(pokemonData.moves);
        }
        if (pokemonData == null) {
            reject(new Error('No pokemon data in store!'));
        }
    })
        .then(function(response) {
            console.log(response); // response = basic api moves array
            return response;
        })
        .catch(error => {
            throw error;
        });
}

export { getMoves };
