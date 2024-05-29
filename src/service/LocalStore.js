import AsyncStorage from '@react-native-async-storage/async-storage';

export async function setKategoriStore(data) {
  try {
    const jsonValue = JSON.stringify(data);
    await AsyncStorage.setItem('kategori', jsonValue);
    console.log('Berhasil Menyiman Kategori LocalStorage');
  } catch (error) {
    console.error('Gagal menyimpan token:', error);
  }
}

export async function getKategoriStore(callback) {
  try {
    const value = await AsyncStorage.getItem('kategori');
    callback(JSON.parse(value));
  } catch (error) {
    console.error('Gagal Mengambil Token:', error);
  }
}

export async function removeKategoriStore() {
  try {
    await AsyncStorage.removeItem('kategori');
    console.log('berhasil di hapus');
  } catch (e) {
    console.log(e);
  }
}
