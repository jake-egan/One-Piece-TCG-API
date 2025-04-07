import axios from 'axios';

const API_URL = (setname) => `http://192.168.1.57:5000/api/OnePieceTCG/discovered/${setname}`;

export const discovered_cards = async (setname) => {
  try {
    const response = await axios.get(API_URL(setname));
    return response.data;
  } catch (error) {
    console.error('Error opening pack:', error);
    throw error;
  }
};