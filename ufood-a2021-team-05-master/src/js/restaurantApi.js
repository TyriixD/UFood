const URL = "https://ufoodapi.herokuapp.com/unsecure";
const URLSEC = "https://ufoodapi.herokuapp.com/unsecure";

export const getRestaurant = async () => {
  const response = await fetch(`${URL}/restaurants`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  return response.json();
}

export const getAllRestaurants = async () => {
  const response = await fetch(`${URL}/restaurants/?limit=500`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  return response.json();
}

export const getRestaurantListWithParam = async (parameter) => {
  const response = await fetch(`${URL}/restaurants?${parameter}`, {
    Method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })

  return response.json();
}

//Permet d'afficher le restaurant correspondant à l'id demandé.
export const getRestaurantById = async (id) => {
  const response = await fetch(`${URL}/restaurants/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  return response.json();
}

//Permet d'afficher les visites du restaurant correspondant à l'id demandé.
export const getVisitsByRestaurantId = async (id) => {
  const response = await fetch(`${URL}/restaurants/${id}/visits`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  return response.json();
}

//Permet d'afficher les visites du restaurant correspondant à l'id demandé avec des params facultatif
export const getVisitsByRestaurantIdWithParam = async(id,param) => {
  const response = await fetch(`${URL}/restaurants/${id}/visits?${param}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  return response.json();
}

export const getResto = async () => {
  const response = await client.get("/restaurants");
  return response.data;
}

//Methode HOME - getrestaurants() ...
export const getSearchedRestaurentList = async function(searchFilter, nb_rest_show){
  //SECURED LISTING
  if($cookies.get("token") != "null")
  {
    const response = await fetch(URLSEC + '/restaurants/' + "?q=" + searchFilter + "&limit=" + nb_rest_show, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: $cookies.get("token")
      },
    });
    if (response.status !== 200){
      throw new Error("Unable to get restaurants list! :( ");
    }
    return response.json();
  }

  //UNSECURED LISTING
  else
  {
    const response = await fetch(URL + '/restaurants/' + "?q=" + searchFilter + "&limit=" + nb_rest_show, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    if (response.status !== 200){
      throw new Error("Unable to get restaurants list! :( ");
    }
    return response.json();
  }
}

export const getSearchedRestaurentByFilter = async function(searchFilter, nb_rest_show){

  //SECURED LISTING
  if($cookies.get("token") != "null")
  {
  let response = "";
  if (searchFilter === '1' || searchFilter === '2' ||
    searchFilter === '3' || searchFilter === '4'){
    response = await fetch(URLSEC + '/restaurants/' + "?price_range="  + searchFilter + "&limit=" + nb_rest_show, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: $cookies.get("token")
      },
    });
  } else{
    response = await fetch(URLSEC + '/restaurants/'  + "?genres="  + searchFilter + "&limit=" + nb_rest_show, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
  }
  if (response.status !== 200){
    throw new Error("Unable to get restaurants list! :( ");
  }
  return response.json();
  }


  //UNSECURED LISTING
  else
  {
    let response = "";
    if (searchFilter === '1' || searchFilter === '2' ||
      searchFilter === '3' || searchFilter === '4'){
      response = await fetch(URL + '/restaurants/' + "?price_range="  + searchFilter + "&limit=" + nb_rest_show, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
    } else{
      response = await fetch(URL + '/restaurants/'  + "?genres="  + searchFilter + "&limit=" + nb_rest_show, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
    }
    if (response.status !== 200){
      throw new Error("Unable to get restaurants list! :( ");
    }
    return response.json();
  }
}

