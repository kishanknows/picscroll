import Ionicon from 'react-native-vector-icons/Ionicons';
import {View, Pressable} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {useState} from 'react';

const HeaderLeft = props => {
  return (
    <Ionicon
      name="menu"
      size={25}
      color={'white'}
      onPress={() => props.navigation.setParams({showMenu: true})}
    />
  );
};

const HeaderRight = props => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Pressable
        onPress={() => props.navigation.setParams({showModal: true})}
        style={{marginHorizontal: 30}}>
        <AntDesignIcon name="plus" size={25} color="white" />
      </Pressable>
      <Pressable onPress={() => props.navigation.navigate('Profile')}>
        <FontAwesomeIcon name="user-circle" size={30} color="white" />
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

export default HomeHeader;
