import { getTokenInfo, isTokenValid } from "./logApi";

const URL = "https://ufoodapi.herokuapp.com/unsecure";
const URLSEC = "https://ufoodapi.herokuapp.com";

export const verifyListName = async (name, listName) => {
  if (await isTokenValid()) {
    let alreadyExist = false;
    for (let index in listName) {
      if (name === listName[index].name) {
        alreadyExist = true;
      }
    }
    return alreadyExist;
  }
}


//Retourne les listes de restaurants favoris de tous les utilisateurs.
export const getFavoriteList = async () => {
  if (await isTokenValid()) {
    const USER_ID = (await getTokenInfo()).id
    const response = await fetch(`${URL}/favorites?limit=200`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': $cookies.get("token")
      }
    });
    return response.json();
  }
}

//Permet d'afficher la liste de restaurants favoris correspondant à l'id demandé.
export const getFavoriteListById = async (id) => {
  if (await isTokenValid()) {
    const response = await fetch(`${URLSEC}/favorites/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization': $cookies.get("token")
      }
    });
    return response.json();
  }
}

//Permet de créer une nouvelle liste de restaurants favoris.
export const createFavoriteList = async(name, owner) => {
  try{
    if (await isTokenValid()) {
      const response = await fetch(`${URLSEC}/favorites`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': $cookies.get("token")
        },
        body: JSON.stringify({
          name,
          owner
        })
      });
      return response.json();
    }
  } catch (err) {}
}

//Permet d'ajouter un restaurant la liste de favoris correspondant à l'id demandé.
export const addRestaurantToFavorite = async(listFavoriteId, id) => {
  const response = await fetch(`${URLSEC}/favorites/${listFavoriteId}/restaurants`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: $cookies.get("token")
      },
      body: JSON.stringify({
        id: id
      })
    });
    return response.json();
  }

//A tester, method d'ajout de resto avec axios
export const addRestoToFav = async(listFavoriteId, id) => {
  return await client.post(`/favorites/${listFavoriteId}/restaurants`, {
    id
  });
}

//Permet de retirer le restaurant avec l'id restaurantId de la liste de favoris correspondant à l'id id demandé.
export const removeRestaurantFromFavorite = async(listFavoriteId, restaurantId) => {
  if (await isTokenValid()) {
    const response = await fetch(`${URLSEC}/favorites/${listFavoriteId}/restaurants/${restaurantId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        'Authorization': $cookies.get("token")
      }
    });
    return response.json();
  }
}

//Permet de supprimer la liste de restaurants favoris correspondants à l'id demandé.
export const deleteFavoriteList = async(id) => {
  if (await isTokenValid()) {
    const response = await fetch(`${URLSEC}/favorites/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        'Authorization': $cookies.get("token")

      }
    });
    return response.json();
  }
}

//Permet de modifier la liste de restaurants favoris correspondant à l'id demandé.
export const updateFavoriteList = async(listFavoriteId,name, owner) => {
  if (await isTokenValid()) {
    const response = await fetch(`${URLSEC}/favorites/${listFavoriteId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'Authorization': $cookies.get("token")
      },
      body: JSON.stringify({
        name: name,
        owner: owner
      })
    });
    return response.json();
  }
}

