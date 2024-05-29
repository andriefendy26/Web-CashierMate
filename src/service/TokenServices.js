
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function setUsers(data) {
    try {
        const jsonValue = JSON.stringify(data);
        await AsyncStorage.setItem('users', jsonValue);
    } catch (error) {
      console.error('Gagal menyimpan token:', error);
    }
  }

  export async function getUsers (callback){
      try {
        const value = await AsyncStorage.getItem('users');
        callback(JSON.parse(value))
      } catch (error) {
        console.error('Gagal Mengambil Token:', error);
      }
  }
  
    export async function removeUsers (){
        try{  
            await AsyncStorage.removeItem('users');
            console.log('berhasil di hapus')
        }catch(e){
            console.log(e)
        }
      }
