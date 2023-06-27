import axios from "axios";

interface Payload {
  url: string;
  data?: object;
}

// POST REQUEST
export const postRequest = async (payload: Payload) => {
  let accessToken = localStorage.getItem("accessToken")
  const config = {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    },
  }
  try {
    const res = await axios({
      method: 'POST',
      url: `${process.env.NEXT_PUBLIC_SERVICE_URL}${payload.url}`,
      data: payload.data,
      headers: config.headers
    })
    return res;
  } catch (err) {
    return err
  }
}

// GET REQUEST
export const getRequest = async (payload: Payload) => {
  let accessToken = localStorage.getItem("accessToken")
  const config = {
    headers: {
    'Authorization': `Bearer ${accessToken}`
    },
    data: payload.data
  }
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVICE_URL}${payload.url}`, 
      config
    );
    return res;
  } catch (err) {
    return err?.response?.data
  }
}

// PUT REQUEST
export const putRequest = async (payload: Payload) => {
  let accessToken = localStorage.getItem("accessToken")
  const config = {
    headers: {
    'Authorization': `Bearer ${accessToken}`
    },
  }
  try {
    const res = await axios({
      method: 'PUT',
      url: `${process.env.NEXT_PUBLIC_SERVICE_URL}${payload.url}`,
      data: payload.data,
      headers: config.headers
    })
    return res
  } catch (err) {
    return err
  }
}

// PATCH REQUEST
export const patchRequest = async (payload: Payload) => {
  let accessToken = localStorage.getItem("accessToken")
  const config = {
    headers: {
    'Authorization': `Bearer ${accessToken}`
    },
  }
  try {
    const res = await axios({
      method: 'PATCH',
      url: `${process.env.NEXT_PUBLIC_SERVICE_URL}${payload.url}`,
      data: payload.data,
      headers: config.headers
    })
    return res
  } catch (err) {
    return err
  }
}