import Video from 'react-native-video';
import {View, StatusBar} from 'react-native';
import auth from '@react-native-firebase/auth';

const IntroScreen = ({navigation}) => {
  const isLoggedIn = auth().currentUser;
  return (
    <View
      style={{
        justifyContent: 'center',
        backgroundColor: 'white',
        height: '100%',
      }}>
      <StatusBar
        backgroundColor="white"
        barStyle="dark-content"
        translucent={true}
      />
      <Video
        source={require('../assets/intronew.mp4')}
        style={{width: '100%', height: '100%'}}
        onEnd={() =>
          isLoggedIn ? navigation.replace('Home') : navigation.replace('Login')
        }
      />
    </View>
  );
};
export default IntroScreen;
