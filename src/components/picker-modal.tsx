import Modal from 'react-native-modal';
import {View, StyleSheet, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {showPickerModal, showUploadModal} from '../redux/slices/general-slice';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import addImage from '../utils/add-image';
import {setImage} from '../redux/slices/image-slice';

const PickerModal = () => {
  const dispatch = useDispatch();
  const pickerModalShown = useSelector(
    (state: RootState) => state.general.pickerModalShown,
  );

  const imgSelector = (mode: 'camera' | 'storage') => {
    addImage(mode)
      .then(res => {
        dispatch(setImage(res.assets[0]));
        dispatch(showPickerModal(false));
        dispatch(showUploadModal(true));
      })
      .catch(err => dispatch(showPickerModal(false)));
  };

  return (
    <Modal
      isVisible={pickerModalShown}
      onBackdropPress={() => dispatch(showPickerModal(false))}>
      <View style={styles.container}>
        <Text style={styles.modalText}>Choose from gallery or Click now!</Text>
        <View style={styles.iconView}>
          <MaterialIcon
            name="add-photo-alternate"
            size={30}
            color="black"
            onPress={() => imgSelector('storage')}
          />
          <MaterialIcon
            name="add-a-photo"
            size={30}
            color="black"
            onPress={() => imgSelector('camera')}
          />
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
  },
  iconView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
});

export default PickerModal;
