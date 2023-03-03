import {View, Pressable} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
const HomeHeader = props => {
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
        <FontAwesomeIcon name="user-circle" size={40} color="white" />
      </Pressable>
    </View>
  );
};

export default HomeHeader;
