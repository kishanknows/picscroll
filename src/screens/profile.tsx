import {StyleSheet, View, StatusBar} from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={Styles.container}>
      <StatusBar
        backgroundColor="#492849"
        barStyle="light-content"
        translucent={true}
      />
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;
