import Modal from 'react-native-modal';
import {View, StyleSheet, Text, ActivityIndicator} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {showUploadModal} from '../redux/slices/general-slice';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {unsetImage} from '../redux/slices/image-slice';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {useState} from 'react';
import postImage from '../utils/post-image';
import updateProfile from '../utils/update-profile';
import {setUser} from '../redux/slices/auth-slice';
import auth from '@react-native-firebase/auth';

const UploadModal = props => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const uploadModalShown = useSelector(
    (state: RootState) => state.general.uploadModalShown,
  );
  const selectedImg = useSelector((state: RootState) => state.selectedImg);
  const user = useSelector((state: RootState) => state.userConfig);

  const confirm = () => {
    setLoading(true);
    props.route.name === 'Profile'
      ? updateProfile(selectedImg, user.email)
          .then(() => dispatch(setUser(auth().currentUser?.providerData[0])))
          .finally(() => {
            dispatch(showUploadModal(false));
            setLoading(false);
          })
      : postImage(selectedImg, user).finally(() => {
          dispatch(showUploadModal(false));
          setLoading(false);
        });
  };

  const discard = () => {
    dispatch(showUploadModal(false));
    dispatch(unsetImage());
  };

  return (
    <Modal isVisible={uploadModalShown} onBackdropPress={discard}>
      <View style={styles.container}>
        {loading ? (
          <Text style={styles.modalText}>Uploading...</Text>
        ) : (
          <Text style={styles.modalText}>Upload the selected Image?</Text>
        )}
        <View style={styles.iconView}>
          <MaterialIcon
            name="close"
            size={30}
            color="black"
            onPress={discard}
          />
          {loading ? (
            <ActivityIndicator size={30} color="black" />
          ) : (
            <FeatherIcon
              name="upload"
              size={30}
              color="black"
              onPress={confirm}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 120,
    width: 220,
    backgroundColor: '#f6eff6',
    borderRadius: 20,
    alignSelf: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: 'white',
  },
  modalText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    flex: 2,
  },
  iconView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 5,
    flex: 1,
  },
});

export default UploadModal;
