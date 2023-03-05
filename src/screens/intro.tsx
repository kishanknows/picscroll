import {View, StatusBar, Image, StyleSheet} from 'react-native';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';

const IntroScreen = ({navigation}) => {
  const isLoggedIn = useSelector(state => state.userConfig.uid);

  useEffect(() => {
    setTimeout(() => {
      isLoggedIn ? navigation.replace('Home') : navigation.replace('Login');
    }, 2700);
  }, []);

  return (
    <View style={styles.background}>
      <StatusBar
        backgroundColor="#492849"
        barStyle="light-content"
        translucent={true}
      />
      <Image source={require('../assets/splash.gif')} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    justifyContent: 'center',
    backgroundColor: '#492849',
    height: '100%',
  },
  image: {
    width: '100%',
    resizeMode: 'contain',
    height: 60,
  },
});
export default IntroScreen;
