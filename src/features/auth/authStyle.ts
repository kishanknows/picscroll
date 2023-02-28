import {StyleSheet} from 'react-native';

const Styles = StyleSheet.create({
  logoStyle: {
    flex: 2,
    resizeMode: 'contain',
  },
  inputStyle: {
    flex: 3,
    alignSelf: 'stretch',
  },
  inputFieldStyle: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  textStyle: {
    marginTop: 30,
    alignSelf: 'center',
  },
});

export default Styles;
