export const BASE_URL = 'https://api.thecatapi.com/v1';
export const API_KEY =
  'live_x76JxnLI3XMUem2hlw5jx67EnS5Spg9WzmVb7V5y3PneYGD3bESCqP8yUlkgIF9Q';

export function fetchBreeds() {
  return fetch(`${BASE_URL}/breeds?api_key=${API_KEY}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export function fetchCatByBreed(breedId) {
  return fetch(
    `${BASE_URL}/images/search?api_key=${API_KEY}&breed_ids=${breedId}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
