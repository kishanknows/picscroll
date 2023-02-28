import {Image, Text, TextInput, View, StatusBar} from 'react-native';
import {useEffect, useState} from 'react';
import CustomButton from '../../components/button';
import auth from '@react-native-firebase/auth';
import {useDispatch, useSelector} from 'react-redux';
import {setUser, unsetUser} from './authSlice';
import Styles from './authStyle';

const LoginScreen = ({navigation}) => {
  const initialState = {
    email: '',
    password: '',
  };

  const [loading, setLoading] = useState(false);
  const [{email, password}, setState] = useState(initialState);

  const dispatch = useDispatch();

  const Login = () => {
    setLoading(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        dispatch(setUser(res.user.providerData[0]));
        console.log('signed in!');
        setLoading(false);
        setState({...initialState});
        navigation.replace('Home');
      })
      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          console.log('That email is invalid!');
        }
        if (error.code === 'auth/wrong-password') {
          console.log('please check your password!');
        }
        console.log(error);
        setLoading(false);
      });
  };
  console.log(useSelector(state => state.userConfig));
  return (
    <View style={Styles.container}>
      <StatusBar
        backgroundColor="white"
        barStyle="dark-content"
        translucent={true}
      />
      <Image
        source={require('../../assets/picscroll-1.png')}
        style={Styles.logoStyle}
      />
      <View style={Styles.inputStyle}>
        <TextInput
          style={Styles.inputFieldStyle}
          placeholder="Email"
          value={email}
          onChangeText={text =>
            setState(prevState => ({...prevState, email: text}))
          }
        />
        <TextInput
          style={Styles.inputFieldStyle}
          placeholder="Password"
          value={password}
          onChangeText={text =>
            setState(prevState => ({...prevState, password: text}))
          }
          secureTextEntry={true}
        />
        <CustomButton title="Login" onClick={Login} isLoading={loading} />
        <Text style={Styles.textStyle}>new to picscroll?</Text>
        <CustomButton
          title="Create account"
          onClick={() => {
            setState({...initialState});
            navigation.navigate('Signup');
          }}
        />
      </View>
    </View>
  );
};
export default LoginScreen;
