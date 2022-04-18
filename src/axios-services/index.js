import axios from "axios";
import res from "express/lib/response";

// this file holds your frontend network request adapters
// think about each function as a service that provides data
// to your React UI through AJAX calls

// for example, if we need to display a list of users
// we'd probably want to define a getUsers service like this:

/* 
  export async function getUsers() {
    try {
      const { data: users } = await axios.get('/api/users')
      return users;
    } catch(err) {
      console.error(err)
    }
  }
*/

export async function getAPIHealth() {
  try {
    const { data } = await axios.get("/api/health");
    return data;
  } catch (err) {
    console.error(err);
    return { healthy: false };
  }
}

export async function registerUser(username, password) {
  try {
    const response = await axios.post("/api/users", {
      headers: {
        "Content-Type": "application/json",
      },
      Body: JSON.stringify({
        username,
        password,
      }),
    });

    return response.data;
  } catch (error) {
    console.error(err);
  }
}
