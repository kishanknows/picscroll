import {StyleSheet, View, StatusBar, Text, Button} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {useState} from 'react';

const ProfileScreen = () => {
  const [test, setTest] = useState(false);
  const user = useSelector((state: RootState) => state.userConfig);
  return (
    <View style={Styles.background}>
      <StatusBar
        backgroundColor="#492849"
        barStyle="light-content"
        translucent={true}
      />
      {test ? (
        <View style={Styles.container}></View>
      ) : (
        <FontAwesomeIcon name="user-circle" size={200} color="black" />
      )}
      <Text style={Styles.details}>{user.displayName}</Text>
      <Button onPress={() => setTest(!test)} title="press" />
    </View>
  );
};

const Styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  container: {
    // flex: 1,
    height: 200,
    width: 200,
    backgroundColor: 'red',
    borderRadius: 100,
  },
  details: {
    flex: 3,
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default ProfileScreen;
