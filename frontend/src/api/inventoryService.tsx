import axios from "axios";

export async function get(url: string, config = {}) {
  return await axios
    .get(url, { ...config })
    .then((response) => response);
}

export async function post(url: string, data: any, config = {}) {
  return axios
    .post(url, { ...data }, { ...config })
    .then((response) => response.data);
}

export async function put(url: string, data: any, config = {}) {
  return axios
    .put(url, { ...data }, { ...config })
    .then((response) => response.data);
}


export async function del(url: string, config = {}) {
  return await axios
    .delete(url, { ...config })
    .then((response) => response.data);
}
