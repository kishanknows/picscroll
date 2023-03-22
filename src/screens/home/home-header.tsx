import Ionicon from 'react-native-vector-icons/Ionicons';
import {View, Pressable, Image, StyleSheet} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {showDrawer, showPickerModal} from '../../redux/slices/general-slice';
import {RootState} from '../../redux/store';

const HeaderLeft = props => {
  const dispatch = useDispatch();
  return (
    <Ionicon
      name="menu"
      size={25}
      color={'white'}
      onPress={() => dispatch(showDrawer(true))}
    />
  );
};

const HeaderRight = props => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.userConfig);
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Pressable
        onPress={() => dispatch(showPickerModal(true))}
        style={{marginHorizontal: 30}}>
        <AntDesignIcon name="plus" size={25} color="white" />
      </Pressable>
      <Pressable onPress={() => props.navigation.navigate('Profile')}>
        {user.photoURL ? (
          <Image source={{uri: user.photoURL}} style={styles.avatar} />
        ) : (
          <FontAwesomeIcon name="user-circle" size={30} color="white" />
        )}
      </Pressable>
    </View>
  );
};

const HomeHeader = props => {
  return {
    headerTitle: 'Picscroll',
    headerTintColor: 'white',
    headerTransparent: true,
    headerLeft: () => <HeaderLeft {...props} />,
    headerRight: () => <HeaderRight {...props} />,
  };
};

const styles = StyleSheet.create({
  avatar: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },
});

export default HomeHeader;
