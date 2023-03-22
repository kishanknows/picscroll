import {Pressable} from 'react-native';
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';
import {unsetUser} from '../../redux/slices/auth-slice';

const ProfileHeader = props => {
  const dispatch = useDispatch();
  const Logout = () => {
    auth()
      .signOut()
      .then(() => {
        console.log('signed out successfully!');
        dispatch(unsetUser());
        props.navigation.reset({index: 0, routes: [{name: 'Login'}]});
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <Pressable onPress={Logout}>
      <Icon name="logout" size={25} color="white" />
    </Pressable>
  );
};

export default ProfileHeader;
