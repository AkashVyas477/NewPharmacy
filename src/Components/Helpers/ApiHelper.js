import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Constants } from '../../CommonConfig';

const BASE_URL=Constants.BASE_URL

export const postRequest = async (url, data) => {
    
    return await axios
      .post(BASE_URL + url, data, {
        headers:{
              'Content-Type': 'application/json',
            },
      })
      .then((response) => {
        if (response.status === 200) {
          return {
            success: true,
            data: response.data,
            statusCode: response.status,
          };
        } else {
          return {
            success: false,
            data: response.data,
            statusCode: response.status,
          };
        }
      })
      .catch((error) => {
        return {
          success: false,
          data: error.response.data,
          statusCode: error.response.status,
        };
      });
    
  };
  