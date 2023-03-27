import {
  StyleSheet,
  View,
  StatusBar,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {showPickerModal} from '../../redux/slices/general-slice';
import PickerModal from '../../components/picker-modal';
import UploadModal from '../../components/upload-modal';
import {theme} from '../../theme';

const ProfileScreen = props => {
  const user = useSelector((state: RootState) => state.userConfig);
  const dispatch = useDispatch();
  return (
    <View style={Styles.background}>
      <StatusBar
        backgroundColor="#492849"
        barStyle="light-content"
        translucent={true}
      />
      <View style={Styles.container}>
        {user.photoURL ? (
          <Image
            source={{uri: user.photoURL}}
            style={{
              height: 200,
              width: 200,
              borderRadius: 100,
            }}
          />
        ) : (
          <FontAwesomeIcon name="user-circle" size={200} color="black" />
        )}
        <TouchableOpacity
          style={{
            backgroundColor: theme.primaryColor,
            padding: 10,
            position: 'absolute',
            alignSelf: 'flex-end',
            borderRadius: 40,
            marginRight: 10,
            borderWidth: 1,
            borderColor: 'white',
          }}
          onPress={() => dispatch(showPickerModal(true))}>
          <IonIcon name="camera-outline" size={25} color="white" />
        </TouchableOpacity>
      </View>
      <Text style={Styles.details}>{user.displayName}</Text>
      <PickerModal />
      <UploadModal {...props} />
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
    // backgroundColor: 'red',
    flexDirection: 'column-reverse',
    // borderRadius: 100,
  },
  details: {
    flex: 3,
    fontWeight: 'bold',
    fontSize: 20,
    padding: 20,
    color: 'black',
  },
});

export default ProfileScreen;
