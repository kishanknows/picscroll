import {
  LoginScreen,
  SignUpScreen,
  HomeScreen,
  IntroScreen,
  ProfileScreen,
} from '../screens';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileHeader from '../screens/profile/profile-header';
import HomeHeader from '../screens/home/home-header';
import {theme} from '../theme';

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
              headerTitleAlign: 'center',
              headerStyle: {backgroundColor: theme.primaryColor},
              headerRight: () => <ProfileHeader {...props} />,
            };
          }}
        />
        <Stack.Screen
          name="Signup"
          component={SignUpScreen}
          options={{
            headerTitle: 'Register',
            headerTitleAlign: 'center',
            headerTintColor: 'white',
            headerStyle: {backgroundColor: theme.primaryColor},
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={props => HomeHeader(props)}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
