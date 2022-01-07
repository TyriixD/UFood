const URL = "https://ufoodapi.herokuapp.com";

//Permet de d'enregistrer une nouvelle visite de restaurants.
export const postRestaurantVisit = async(idResto, comment, rating, date, idUser) => {
  const response = await fetch(`${URL}/users/${idUser}/restaurants/visits`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Authorization: $cookies.get("token")
    },
    body: JSON.stringify({
      restaurant_id: idResto,
      comment: comment,
      rating: rating,
      date: date
    })
  });
  return response.json();
}

//Permet d'afficher les visites de l'usager correspondant à l'id demandé.
export const getUsersVisits = async (id, nb_listed, idUser) => {
  const response = await fetch(`${URL}/users/${idUser}/restaurants/visits?limit=${nb_listed}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: $cookies.get("token")
    },
  })
  return response.json();
}
