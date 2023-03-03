import {
  Modal,
  StyleSheet,
  View,
  Text,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {useState} from 'react';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';

const CustomModal = props => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const username = useSelector(state => state.userConfig.email);

  const closeModal = () => {
    props.navigation.setParams({showModal: false});
    setResult(null);
  };

  const uploadImg = () => {
    setLoading(true);
    const uploadTask = storage()
      .ref('uploads/' + result.fileName)
      .putFile(result.uri);
    uploadTask.on(
      'state_changed',
      snapshot => console.log(snapshot.state),
      error => console.log(error),
      () => {
        uploadTask.snapshot.ref
          .getDownloadURL()
          .then(url => {
            console.log(url);
            firestore()
              .collection('Uploads')
              .add({
                username: username,
                image_url: url,
                posted_on: Date.now(),
              })
              .then(() => console.log('uploaded to firestore!'));
            closeModal();
            setLoading(false);
          })
          .catch(error => {
            setLoading(false);
            closeModal();
            console.log(error);
          });
      },
    );
  };

  const addImage = key => {
    props.navigation.setParams({showModal: false});
    switch (key) {
      case 1:
        launchCamera({
          mediaType: 'photo',
          presentationStyle: 'fullScreen',
        })
          .then(response => {
            setResult(response.assets[0]);
            props.navigation.setParams({showModal: true});
          })
          .catch(error => console.log(error));
        break;
      case 2:
        launchImageLibrary({
          mediaType: 'photo',
          presentationStyle: 'fullScreen',
        })
          .then(response => {
            setResult(response.assets[0]);
            props.navigation.setParams({showModal: true});
          })
          .catch(error => console.log(error));
        break;
    }
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.route.params?.showModal === true}
      onRequestClose={closeModal}>
      <View style={Styles.container}>
        {result ? null : (
          <Pressable style={{alignSelf: 'flex-end'}} onPress={closeModal}>
            <FeatherIcon name="x" size={20} color={'white'} />
          </Pressable>
        )}
        <View style={Styles.textArea}>
          <Text style={Styles.textStyle}>
            {result
              ? 'upload selected image?'
              : 'upload from gallery or click now!'}
          </Text>
        </View>
        <View style={Styles.pressableArea}>
          {result ? (
            <Pressable onPress={closeModal} style={{flex: 1}}>
              <FeatherIcon name="x" size={30} color={'white'} />
            </Pressable>
          ) : (
            <Pressable
              onPress={() => {
                addImage(2);
              }}
              style={{flex: 1}}>
              <MaterialIcon
                name="add-photo-alternate"
                size={30}
                color={'white'}
              />
            </Pressable>
          )}

          {result ? (
            loading ? (
              <ActivityIndicator />
            ) : (
              <Pressable
                onPress={uploadImg}
                style={{flex: 1, alignItems: 'flex-end'}}>
                <FeatherIcon name="upload" size={30} color={'white'} />
              </Pressable>
            )
          ) : (
            <Pressable
              onPress={() => {
                addImage(1);
              }}
              style={{flex: 1, alignItems: 'flex-end'}}>
              <MaterialIcon name={'add-a-photo'} size={30} color={'white'} />
            </Pressable>
          )}
        </View>
      </View>
    </Modal>
  );
};

const Styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#492849',
    alignSelf: 'center',
    height: 130,
    width: 200,
    marginTop: '80%',
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  textArea: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressableArea: {
    flex: 2,
    flexDirection: 'row',
    alignSelf: 'stretch',
    paddingHorizontal: 30,
  },
  textStyle: {
    fontSize: 15,
    fontWeight: 'normal',
    color: 'white',
    textAlign: 'center',
  },
});
export default CustomModal;
