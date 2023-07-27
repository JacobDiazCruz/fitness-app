import axios from "axios";

interface Payload {
  url: string;
  data?: object;
}

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
    });
    return res;
  } catch (err: any) {
    return err.response;
  }
}

export const postRequestv2 = async (payload: Payload) => {
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
    });
    if(!res) throw new Error("Error with request")
    return {
      res,
      err: null
    };
  } catch (err: any) {
    return {
      res: null,
      err
    };
  }
}

// GET REQUEST
export const getRequestv2 = async (payload: Payload) => {
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
    if(!res) throw new Error("Error with request")
    return {
      res,
      err: null
    };
  } catch (err) {
    return {
      res: null,
      err
    };
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

export const putRequestv2 = async (payload: Payload) => {
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
    });
    if(!res) throw new Error("Error with request")
    return {
      res,
      err: null
    };
  } catch (err: any) {
    return {
      res: null,
      err
    };
  }
}

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
};

export const patchRequestv2 = async (payload: Payload) => {
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
    });
    if(!res) throw new Error("Error with request")
    return {
      res,
      err: null
    };
  } catch (err: any) {
    return {
      res: null,
      err
    };
  }
}

export const deleteRequest = async (payload: Payload) => {
  let accessToken = localStorage.getItem("accessToken")
  const config = {
    headers: {
    'Authorization': `Bearer ${accessToken}`
    },
  }
  try {
    const res = await axios({
      method: 'DELETE',
      url: `${process.env.NEXT_PUBLIC_SERVICE_URL}${payload.url}`,
      data: payload.data,
      headers: config.headers
    })
    return res
  } catch (err) {
    return err
  }
};