import axios from 'axios';

const API_URL = 'http://192.168.1.57:5000/api/OnePieceTCG/openpack';

export const openPack = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error opening pack:', error);
    throw error;
  }
};
