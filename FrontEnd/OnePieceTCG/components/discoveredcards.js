import axios from 'axios';

const API_URL = (setname) => `https://onepieceapp-a9due3h2fgfgcdfy.uksouth-01.azurewebsites.net/api/OnePieceTCG/discovered/${setname}`;

export const discovered_cards = async (setname) => {
  try {
    const response = await axios.get(API_URL(setname));
    return response.data;
  } catch (error) {
    console.error('Error opening pack:', error);
    throw error;
  }
};