import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

const CustomButton = props => {
  return (
    <TouchableOpacity style={Styles.buttonStyle} onPress={props.onClick}>
      {props.isLoading ? (
        <ActivityIndicator />
      ) : (
        <Text style={Styles.buttonTextStyle}>{props.title}</Text>
      )}
    </TouchableOpacity>
  );
};

const Styles = StyleSheet.create({
  buttonStyle: {
    padding: '2%',
    backgroundColor: '#492849',
    borderRadius: 20,
    margin: 5,
  },
  buttonTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'white',
    fontWeight: '300',
  },
});

export default CustomButton;
