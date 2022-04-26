import axios from "axios";

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

export const getMe = async (token) => {
  try {
    const { data } = await axios.get(`/api/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getAllUsers = async (token) => {
  try {
    const { data } = await axios.get(`/api/users/all`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    throw error.response.data;
  }
};

export const loginUser = async (username, password) => {
  try {
    const { data } = await axios.post(`/api/users/login`, {
      username,
      password,
    });
    return data;
  } catch (error) {
    throw error.response.data;
  }
};

export async function registerUser(username, password) {
  try {
    const response = await axios.post("/api/users/register", {
      username,
      password,
    });

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export const getAllProducts = async (token) => {
  try {
    const response = await axios.get(`api/products/all`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const getPublicProducts = async () => {
  try {
    const response = await axios.get(`api/products`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export const createProduct = async (
  token,
  typeId,
  name,
  description,
  price,
  isPublic
) => {
  try {
    const response = await axios.post(
      `api/products`,
      {
        typeId,
        name,
        description,
        price,
        isPublic,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateProduct = async (
  productId,
  token,
  typeId,
  name,
  description,
  price,
  isPublic
) => {
  try {
    const response = await axios.patch(
      `api/products/${productId}`,
      {
        typeId,
        name,
        description,
        price,
        isPublic,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateCartProductQuantity = async (
  token,
  quantity,
  cartId,
  productId
) => {
  try {
    const response = await axios.patch(
      `api/carts/productQuantity`,
      {
        quantity,
        cartId,
        productId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteProduct = async (productId, token) => {
  try {
    const response = await axios.delete(`api/products/${productId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const getAllTypes = async () => {
  try {
    const response = await axios.get(`api/products/types`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const getCart = async (token) => {
  try {
    const response = await axios.get(`api/carts`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const addProductToCart = async (
  token,
  cartId,
  productId,
  quantity,
  purchasedCost
) => {
  try {
    const response = await axios.post(
      `api/carts/addProduct`,
      {
        cartId,
        productId,
        quantity,
        purchasedCost,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteCartProduct = async (productId, token) => {
  try {
    const response = await axios.delete(`api/carts/removeCartProduct/`, {
      data: {
        productId,
      },

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const getOrderHistory = async (token) => {
  try {
    const response = await axios.get(`api/products/orderHistory`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("response.data orderhistroy", response.data);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const purchaseCart = async (token, cartId) => {
  try {
    const response = await axios.patch(
      `api/carts/purchaseCart/`,
      {
        cartId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

// appears in console in browser

export const addContact = async (
  token,
  email,
  userId,
  address,
  address2,
  city,
  state,
  zip
) => {
  try {
    const response = await axios.patch(
      `api/users/contact/${userId}`,
      {
        userId,
        email,
        address,
        address2,
        city,
        state,
        zip,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("response!!!!!!!!", response.data);
    return response.data;
  } catch (error) {
    return error;
  }
};
