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



export const postFormData = async(url,data) => {
  return await axios
  .post( BASE_URL + url,data ,{
      headers:{
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + ( await AsyncStorage.getItem('token') )
      }
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


export const postPostLogin = async(url,data) => {
return await axios
.post( BASE_URL + url,data ,{
    headers:{
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + ( await AsyncStorage.getItem('token') )
    }
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




export const getPreLogin = async( url) => {
return await axios
.get( BASE_URL + url , {
    headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + ( await AsyncStorage.getItem('token') )
      } 
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

export const putPostLogin = async( url, data) => {
return await axios
.put( BASE_URL + url , data,{
    headers: {
        Authorization: 'Bearer ' + ( await AsyncStorage.getItem('token') )
      } 
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


export const getParams = async(url) => {
return await axios
.get( BASE_URL + url , {
    headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + ( await AsyncStorage.getItem('token') )
      } 
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


export const refreshtoken = async(data) => {
// console.log(data);
return await axios
.post( BASE_URL + 'refreshToken' , data,{
    headers: {
        'Content-Type': 'application/json',
      } 
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


export const deletePost = async( url, data) => {
return await axios
.delete( BASE_URL + url ,{
headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + ( await AsyncStorage.getItem('token') )
} , data
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