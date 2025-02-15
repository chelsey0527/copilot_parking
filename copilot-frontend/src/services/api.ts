import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';
const GROQ_API_KEY = process.env.REACT_APP_API_KEY;

const api = axios.create({
  baseURL: 'http://localhost:3001',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getUserByActivationCode = async (activationCode: string) => {
  const response = await api.post('/api/activate', { activationCode });
  return response.data;
};

export const verifyActivationCode = async (code: string) => {
  const response = await api.get(`/api/${code}`);
  return response.data;
};

export const createConversation = async (eventUserId: string, sender: 'user' | 'bot', message: string) => {
  console.log('--- entered conversation ----');
  const response = await api.post('/api/conversations', {
    eventUserId,
    sender,
    message,
  });
  return response.data;
};

export const getConversationHistory = async (userId: string) => {
  const response = await api.get(`/api/conversations/${userId}`);
  return response.data;
};

export const getBotResponse = async (eventUserId: string, userMessage: string) => {
  const response = await api.post('/api/conversations/bot-response', {
    eventUserId,
    message: userMessage,
  });
  return response.data;
};

export const getSmartBotResponse = async (
  eventUserId: string, 
  message: string,
  specialNeeds: {
    needsEV: boolean;
    needsAccessible: boolean;
    needsCloserToElevator: boolean;
  }
) => {
  try {
    const response = await api.post('/api/conversations/smart-response', {
      eventUserId,
      message,
      specialNeeds
    }, {
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error('API Key:', GROQ_API_KEY);
    throw error;
  }
};

export const registerCarPlate = async (eventUserId: string, carPlate: string) => {
  const response = await api.post('/api/conversations/register-plate', {
    eventUserId,
    carPlate,
  });
  return response.data;
};