const URL = "https://ufoodapi.herokuapp.com";

//Permet de d'enregistrer un nouvel usager.
export const postSignup = async(name, email, password) => {
  const response = await fetch(`${URL}/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      name: name,
      email: email,
      password: password
    })
  })
  response.json().then(data =>{
    alert("Le compte de " + data.name + " à été créé!")
  })
  return;
}

//Permet de se connecter a un usager.
export const postLogin = async(email, password, callback) => {
  const response = await fetch(`${URL}/login`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      email: email,
      password: password
    })
  })
  if (response.status !== 200){
    callback()
  }
  else
  {
    await response.json().then(data =>{
      $cookies.set("token",data.token,);
    })
  }

  return;
}

//Permet de recuperer les informations de l'usager a partir d'un Token
export const getTokenInfo = async() => {
  let tokenData = {};
  const response = await fetch(`${URL}/tokenInfo`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: $cookies.get("token")
    }
  })
  await response.json().then(data =>{
    tokenData = data;
  })
  return tokenData;
}

//Valide si un Token est valide
export const isTokenValid = async() => {
  let result = false;
  try{
    if($cookies.get("token") !== "null") {
      const response = await fetch(`${URL}/tokenInfo`, {
        method: 'GET',
        headers: {
          Authorization: $cookies.get("token")
        }
      })
      if (response.status === 200) {
        result = true;
      } else {
        result = false
      }
    } else{
      result = false
    }
  }catch(err){
    return false
  }
  return result
}
