import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {theme} from '../theme';

const CustomButton = props => {
  return (
    <TouchableOpacity style={Styles.buttonStyle} onPress={props.onClick}>
      {props.isLoading ? (
        <ActivityIndicator size={22} color="white" />
      ) : (
        <Text style={Styles.buttonTextStyle}>{props.title}</Text>
      )}
    </TouchableOpacity>
  );
};

const Styles = StyleSheet.create({
  buttonStyle: {
    padding: '1.5%',
    backgroundColor: theme.primaryColor,
    borderRadius: 20,
    margin: 5,
    elevation: 20,
  },
  buttonTextStyle: {
    fontSize: 18,
    alignSelf: 'center',
    color: 'white',
    fontWeight: '400',
  },
});

export default CustomButton;
