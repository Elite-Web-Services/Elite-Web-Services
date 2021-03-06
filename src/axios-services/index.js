import axios from 'axios';

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
    const { data } = await axios.get('/api/health');
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
        'Content-Type': 'application/json',
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
        'Content-Type': 'application/json',
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

export async function registerUser(username, password, email) {
  try {
    const response = await axios.post('/api/users/register', {
      username,
      password,
      email,
    });

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}

export async function getUserByUsername(token, username) {
  try {
    const response = await axios.get(`/api/users/user/${username}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
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
        'Content-Type': 'application/json',
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
        'Content-Type': 'application/json',
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
  fullDescription,
  price,
  isPublic,
  imgURL
) => {
  try {
    const response = await axios.post(
      `api/products`,
      {
        typeId,
        name,
        description,
        fullDescription,
        price,
        isPublic,
        imgURL,
      },
      {
        headers: {
          'Content-Type': 'application/json',
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
  fullDescription,
  price,
  isPublic,
  imgURL
) => {
  try {
    const response = await axios.patch(
      `api/products/${productId}`,
      {
        typeId,
        name,
        description,
        fullDescription,
        price,
        isPublic,
        imgURL,
      },
      {
        headers: {
          'Content-Type': 'application/json',
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
          'Content-Type': 'application/json',
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
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
};

export const createType = async (name, token) => {
  try {
    const response = await axios.post(
      `api/products/types`,
      {
        name,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

export const getAllTypes = async () => {
  try {
    const response = await axios.get(`api/products/types`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateType = async (typeId, name, token) => {
  try {
    const response = await axios.patch(
      `api/products/types/${typeId}`,
      {
        name,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteType = async (typeId, token) => {
  try {
    const response = await axios.delete(`api/products/types/${typeId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
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
        'Content-Type': 'application/json',
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
          'Content-Type': 'application/json',
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
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteUser = async (userId, token) => {
  try {
    const response = await axios.delete(`api/users/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getOrderHistory = async (token, userId) => {
  try {
    if (userId) {
      const response = await axios.get(`api/products/orderHistory/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } else {
      const response = await axios.get(`api/products/orderHistory/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    }
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
          'Content-Type': 'application/json',
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
  firstName,
  lastName,
  email,
  userId,
  address,
  address2,
  city,
  state,
  zip,
  country
) => {
  try {
    const response = await axios.patch(
      `api/users/contact/${userId}`,
      {
        userId,
        firstName,
        lastName,
        email,
        address,
        address2,
        city,
        state,
        zip,
        country,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    return error;
  }
};
