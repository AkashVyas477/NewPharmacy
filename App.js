import React from 'react';
import { SafeAreaView} from 'react-native';
import AppNavigator from './Src/Navigation/navigation';
import { Provider } from 'react-redux';
import{ store }from './Src/Redux/Store'


const App =()=>{
  return(
  <Provider  store={store}>
      <AppNavigator/>
      </Provider>
  );
};



export default App;


