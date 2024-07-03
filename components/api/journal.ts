// components/api/journal.ts
import axios from 'axios';
import { JournalEntryCreate } from '../types';

const API_URL = 'http://127.0.0.1:8000';

export const createJournalEntry = async (entry: JournalEntryCreate, token: string | null) => {
  try {
    const response = await axios.post(
      `${API_URL}/entries/`,
      entry,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating journal entry:', error);
    throw error;
  }
};
