import { getTokenInfo, isTokenValid } from "./logApi";

const URL = "https://ufoodapi.herokuapp.com";

export const getUserWithParam = async (name) => {
  if (await isTokenValid()) {
    const response = await fetch(`${URL}/users?q=${name}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': $cookies.get("token")
      }
    });
    return response.json()
  }
}

export const getUser = async () => {
  try{
    if (await isTokenValid()) {
      const USER_ID = (await getTokenInfo()).id
      const response = await fetch(`${URL}/users/${USER_ID}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': $cookies.get("token")
        }
      });
      return response.json()
    }
  } catch (err) {}
}


export const getOtherUser = async (USER_ID) => {
  if (await isTokenValid()) {
    const response = await fetch(`${URL}/users/${USER_ID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': $cookies.get("token")
      }
    });
    return response.json()
  }
}


//Permet de lister tous les listes de restaurants favoris d'un usager
export const getUserFavoritesList = async() => {
  try{
    if (await isTokenValid()) {
      const USER_ID = (await getTokenInfo()).id
      const response = await fetch(`${URL}/users/${USER_ID}/favorites`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': $cookies.get("token")
        }
      })
      return response.json();
    }
  } catch (err) {
    
  }
}

//Permet de lister tous les listes de restaurants favoris d'un usager avec param
export const getUserFavoritesListWithParam = async(param) => {
  if (await isTokenValid()) {
    const USER_ID = (await getTokenInfo()).id
    const response = await fetch(`${URL}/users/${USER_ID}/favorites?${param}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': $cookies.get("token")
      }
    })
    return response.json();
  }
}

export const getGravatarInfo = async(hash) => {
  const response = await fetch(`https://www.gravatar.com/7f3486d60075640d9d0b74d3b1f1ca8c.json`, {
    method: 'GET',
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
    }
  })
  return response.json();
}

