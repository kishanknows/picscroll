import {StyleSheet} from 'react-native';
import {theme} from '../../theme';

const Styles = StyleSheet.create({
  logoStyle: {
    flex: 2,
    resizeMode: 'contain',
  },
  inputStyle: {
    flex: 4,
    alignSelf: 'stretch',
  },
  inputFieldStyle: {
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 20,
    paddingVertical: 5,
    margin: 10,
    backgroundColor: theme.primaryColorLight,
    borderColor: 'black',
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
