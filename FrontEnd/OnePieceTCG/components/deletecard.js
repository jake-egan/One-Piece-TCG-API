import axios from 'axios';

const API_URL = (card_id) => `https://onepieceapp-a9due3h2fgfgcdfy.uksouth-01.azurewebsites.net/api/OnePieceTCG/delete/${card_id}`;

export const delete_card = async (card_id) => {
  try {
    const response = await axios.delete(API_URL(card_id));
    return response.data;
  } catch (error) {
    console.error('Error opening pack:', error);
    throw error;
  }
};