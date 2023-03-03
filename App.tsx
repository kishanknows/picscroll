import store, {persistor} from './src/redux/store';
import {Provider} from 'react-redux';
import AppNavigator from './src/features/navigation/screen-navigation';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
