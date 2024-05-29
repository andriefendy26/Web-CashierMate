import Url from "../api/Url";
import axios from "axios";

export async function login(credential) {
  const result = await axios.post(`${Url.ipadress}/api/login`, credential, {
    headers: {
      Accept: "application/json",
    },
  });
  return result.data;
}

export async function regist(credential) {
  const result = await axios.post(`${Url.ipadress}/api/registrasi`, credential, {
    headers: {
      Accept: "application/json",
    },
  });

  return result;
}
export async function tambahPegawai(usaha_id, credential) {
  try {
    const result = await axios.post(`${Url.ipadress}/api/tambahpegawai/${usaha_id}`, credential, {
      headers: {
        Accept: "application/json",
      },
    });

    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function updateUser(user_id, credential) {
  try {
    const result = await axios.put(`${Url.ipadress}/api/updateuser/${user_id}`, credential, {
      headers: {
        Accept: "application/json",
        // Authorization: `Bearer ${token}`,
      },
    });
    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function getUserByEmail(email) {
  try {
    const result = await axios.get(`${Url.ipadress}/api/users/${email}`, {
      headers: {
        Accept: "application/json",
        // Authorization: `Bearer ${token}`,
      },
    });
    return result;
  } catch (e) {
    console.log(e);
  }
}
export async function ambilPegawai(usaha_id) {
  try {
    const result = await axios.get(`${Url.ipadress}/api/ambilpegawai/${usaha_id}`, {
      headers: {
        Accept: "application/json",
        // Authorization: `Bearer ${token}`,
      },
    });
    return result;
  } catch (e) {
    console.log(e);
  }
}
export async function deleteUser(user_id, usaha_id) {
  try {
    const result = await axios.delete(`${Url.ipadress}/api/deleteuser/${user_id}/${usaha_id}`, {
      headers: {
        Accept: "application/json",
        // Authorization: `Bearer ${token}`,
      },
    });
    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function logout(token) {
  try {
    const result = await axios.get(`${Url.ipadress}/api/logout`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return result;
  } catch (e) {
    console.log(e);
  }
}
