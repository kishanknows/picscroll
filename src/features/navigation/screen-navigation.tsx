import {
  LoginScreen,
  SignUpScreen,
  HomeScreen,
  IntroScreen,
  ProfileScreen,
} from '../../screens';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileHeader from '../../components/profile-header';
import HomeHeader from '../../components/home-header';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Intro">
        <Stack.Screen
          name="Intro"
          component={IntroScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={props => {
            return {
              headerTitle: 'Profile',
              headerTintColor: 'white',
              headerStyle: {backgroundColor: '#492849'},
              headerRight: () => <ProfileHeader {...props} />,
            };
          }}
        />
        <Stack.Screen
          name="Signup"
          component={SignUpScreen}
          options={{
            headerTitle: 'Register',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: '#492849'},
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={props => {
            return {
              headerTitle: 'Picscroll',
              headerTintColor: 'white',
              headerStyle: {backgroundColor: '#492849'},
              headerRight: () => <HomeHeader {...props} />,
            };
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
