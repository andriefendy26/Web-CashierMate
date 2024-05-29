import Url from "../api/Url";
import axios from "axios";

export async function buatCart(credential) {
  try {
    const result = await axios.post(
      `${Url.ipadress}/api/cart`,

      credential,

      {
        headers: {
          Accept: "application/json",
          // Authorization: `Bearer ${token}`,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}
export async function lihatCart(usaha_id) {
  try {
    const result = await axios.get(`${Url.ipadress}/api/cart/${usaha_id}`, {
      headers: {
        Accept: "application/json",
        // Authorization: `Bearer ${token}`,
      },
    });
    return result.data;
  } catch (e) {
    console.log(e);
  }
}
export async function hapusCart(usaha_id, cart_id) {
  try {
    const result = await axios.delete(`${Url.ipadress}/api/cart/${usaha_id}/${cart_id}`, {
      headers: {
        Accept: "application/json",
        // Authorization: `Bearer ${token}`,
      },
    });
    return result.data;
  } catch (e) {
    console.log(e);
  }
}
export async function ambilSemuaItem(usaha_id, cart_id) {
  try {
    const result = await axios.get(`${Url.ipadress}/api/transaksi/ambilitem/${usaha_id}/${cart_id}`, {
      headers: {
        Accept: "application/json",
        // Authorization: `Bearer ${token}`,
      },
    });
    return result.data;
  } catch (e) {
    console.log(e);
  }
}
export async function tambahItem(credential, usaha_id) {
  try {
    const result = await axios.post(`${Url.ipadress}/api/transaksi/tambahitem/${usaha_id}`, credential, {
      headers: {
        Accept: "application/json",
        // Authorization: `Bearer ${token}`,
      },
    });
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

export async function hapusItem(credential, produk_id, usaha_id, cart_id) {
  try {
    const result = await axios.delete(`${Url.ipadress}/api/transaksi/hapusitem/${produk_id}/${usaha_id}/${cart_id}`, {
      headers: {
        Accept: "application/json",
        // Authorization: `Bearer ${token}`,
      },
    });
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

export async function updateItem(credential, produk_id, usaha_id, cart_id) {
  try {
    const result = await axios.put(
      `${Url.ipadress}/api/transaksi/updateitem/${produk_id}/${usaha_id}/${cart_id}`,
      {
        credential,
      },
      {
        headers: {
          Accept: "application/json",
          // Authorization: `Bearer ${token}`,
        },
      }
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

export async function transaksiLanjutan(credential, user_id, usaha_id, cart_id) {
  try {
    const result = await axios.post(`${Url.ipadress}/api/transaksi/lanjutan/${user_id}/${usaha_id}/${cart_id}`, credential, {
      headers: {
        Accept: "application/json",
        // Authorization: `Bearer ${token}`,
      },
    });
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

export async function ambilSemuaTransaksi(usaha_id) {
  try {
    const result = await axios.get(`${Url.ipadress}/api/transaksi/ambil/${usaha_id}`, {
      headers: {
        Accept: "application/json",
        // Authorization: `Bearer ${token}`,
      },
    });
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

export async function ambilDetailTransaksi(usaha_id, trans_id) {
  try {
    const result = await axios.get(`${Url.ipadress}/api/transaksi/ambildetail/${usaha_id}/${trans_id}`, {
      headers: {
        Accept: "application/json",
        // Authorization: `Bearer ${token}`,
      },
    });
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

export async function detailLaporan(usaha_id) {
  try {
    const result = await axios.get(`${Url.ipadress}/api/transaksi/detailLaporan/${usaha_id}`, {
      headers: {
        Accept: "application/json",
        // Authorization: `Bearer ${token}`,
      },
    });
    return result.data;
  } catch (e) {
    console.log(e);
  }
}
