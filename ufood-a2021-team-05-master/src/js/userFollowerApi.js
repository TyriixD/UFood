import { isTokenValid } from "./logApi";

const URL =  "https://ufoodapi.herokuapp.com";
export const createUserFollower = async (user_id) => {
  if (await isTokenValid()){
    const response = await fetch(`${URL}/follow`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': $cookies.get("token")
      },
      body: JSON.stringify({
        'id': user_id
      }),
    })

    return response.json();
  }
}


export const deleteUserFollow = async (user_id) => {
  const response = await fetch(`${URL}/follow/${user_id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': $cookies.get("token")
    },
  })

  return response.json();
}
