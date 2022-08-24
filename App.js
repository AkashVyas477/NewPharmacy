import React, { useEffect } from 'react';
import { SafeAreaView} from 'react-native';
import AppNavigator from './src/navigation/navigation';
import { Provider } from 'react-redux';
import{ store }from './src/Store/Store'
import './src/CommonConfig/Translations/IMLocalize'



const App =()=>{

  return(
  <Provider  store={store}>
      <AppNavigator/>
      </Provider>
  );
};



export default App;


