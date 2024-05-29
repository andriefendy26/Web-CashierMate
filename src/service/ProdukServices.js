import Url from '../api/Url';
import axios from 'axios';

export async function ambilKategori(id_usaha) {
  try {
    const result = await axios.get(
      `${Url.ipadress}/api/kategori/ambil/${id_usaha}`,
      {
        headers: {
          Accept: 'application/json',
          // Authorization: `Bearer ${token}`,
        },
      },
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}
export async function tambahKategori(usaha_id, credential) {
  try {
    const result = await axios.post(
      `${Url.ipadress}/api/kategori/simpan/${usaha_id}`,
      credential,
      {
        headers: {
          Accept: 'application/json',
          // Authorization: `Bearer ${token}`,
        },
      },
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}
export async function hapusKategori(kat_id, usaha_id) {
  try {
    const result = await axios.delete(
      `${Url.ipadress}/api/kategori/hapus/${kat_id}/${usaha_id}`,
      {
        headers: {
          Accept: 'application/json',
          // Authorization: `Bearer ${token}`,
        },
      },
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}
export async function ambilProduk(usaha_id) {
  try {
    const result = await axios.get(
      `${Url.ipadress}/api/produk/ambil/${usaha_id}`,
      {
        headers: {
          Accept: 'application/json',
          // Authorization: `Bearer ${token}`,
        },
      },
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

export async function simpanProduk(credential, usaha_id) {
  try {
    const result = await axios.post(
      `${Url.ipadress}/api/produk/simpan/${usaha_id}`,
      credential,
      {
        headers: {
          Accept: 'application/json',
          "Content-Type" : "multipart/form-data"
          // Authorization: `Bearer ${token}`,
        },
      },
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

export async function hapusProduk(produk_id, usaha_id) {
  try {
    const result = await axios.delete(
      `${Url.ipadress}/api/produk/hapus/${produk_id}/${usaha_id}`,
      {
        headers: {
          Accept: 'application/json',
          // Authorization: `Bearer ${token}`,
        },
      },
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}

export async function editProduk(credential, id_produk, id_usaha) {
  try {
    const result = await axios.put(
      `${Url.ipadress}/api/produk/update/${id_produk}/${id_usaha}`,
      credential,
      {
        headers: {
          Accept: 'application/json',
          // Authorization: `Bearer ${token}`,
        },
      },
    );
    return result.data;
  } catch (e) {
    console.log(e);
  }
}
