import {store} from './src/redux/store';
import {Provider} from 'react-redux';
import AppNavigator from './src/features/navigation/screen-navigation';

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
