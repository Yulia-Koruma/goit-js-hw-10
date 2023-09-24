import axios from "axios";

const url = 'https://api.thecatapi.com/v1';
// axios.defaults.headers.common["x-api-key"] = "live_59FPPWQRuEdundOBjedDDE8v7l5Ldmi2He73QW7miJH1Z8yw2NdHIeVE7cwG22Ln";

const api_key = "live_59FPPWQRuEdundOBjedDDE8v7l5Ldmi2He73QW7miJH1Z8yw2NdHIeVE7cwG22Ln";

export function fetchBreeds() {
    return fetch(`${url}/breeds?api_key=${api_key}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
            // Notiflix.Notify.failure('Oops, there is no dog with that name');
            // return Promise.reject('Trouble');
        });
    // .then(animals => {
    //     console.log(animals);
    // }).catch(error => {
    //     console.log(error)
    // });
};

export function fetchCatByBreed(breedId) {
    return fetch(`${url}/images/search?api_key=${api_key}&breed_ids=${breedId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        });

};
