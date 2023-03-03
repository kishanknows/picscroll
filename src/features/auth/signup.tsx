import {View, TextInput, Image, StatusBar} from 'react-native';
import CustomButton from '../../components/button';
import auth from '@react-native-firebase/auth';
import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {setUser} from './authSlice';
import Styles from './authStyle';

const SignUpScreen = ({navigation}) => {
  const initialState = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const [loading, setLoading] = useState(false);
  const [{username, email, password, confirmPassword}, setState] =
    useState(initialState);

  const dispatch = useDispatch();

  const SignUp = () => {
    if (confirmPassword === password) {
      setLoading(true);
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
          res.user.updateProfile({displayName: username}).then(() => {
            console.log('User account created & signed in!');
            dispatch(setUser(auth().currentUser?.providerData[0]));
            setLoading(false);
            setState({...initialState});
            navigation.reset({index: 0, routes: [{name: 'Home'}]});
          });
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email is already in use');
          }
          if (error.code === 'auth/invalid-email') {
            console.log('That email is invalid!');
          }
          console.log(error);
          setLoading(false);
        });
    } else {
      console.log("passwords doesn't match!");
    }
  };
  return (
    <View style={Styles.container}>
      <StatusBar
        backgroundColor="#492849"
        barStyle="light-content"
        translucent={true}
      />
      <Image
        source={require('../../assets/picscroll-1.png')}
        style={Styles.logoStyle}
      />
      <View style={Styles.inputStyle}>
        <TextInput
          style={Styles.inputFieldStyle}
          placeholder="Username"
          value={username}
          onChangeText={text =>
            setState(prevState => ({...prevState, username: text}))
          }
        />
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
          placeholder="password"
          value={password}
          onChangeText={text =>
            setState(prevState => ({...prevState, password: text}))
          }
          secureTextEntry={true}
        />
        <TextInput
          style={Styles.inputFieldStyle}
          placeholder="confirm password"
          value={confirmPassword}
          onChangeText={text =>
            setState(prevState => ({...prevState, confirmPassword: text}))
          }
          secureTextEntry={true}
        />
        <CustomButton title="Sign Up" onClick={SignUp} isLoading={loading} />
      </View>
    </View>
  );
};

export default SignUpScreen;
