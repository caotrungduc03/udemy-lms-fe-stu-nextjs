import axios from 'axios';
import { MakeConfig } from './axios';
import { toast } from 'react-toastify';

export const getListUsers = async (page: any, sort: any, token: any) => {
  try {
    const config = MakeConfig('/users', 'get', token, null, null);
    config.params = {
      page: page || 0,
      sort: sort || null
    };
    const response = await axios.request(config);
    return {
      totalCount: response.data.total,
      users: response.data.items,
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Could not fetch users');
  }
};


