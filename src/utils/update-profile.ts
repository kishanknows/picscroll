import storage from '@react-native-firebase/storage';
import auth from '@react-native-firebase/auth';

const updateProfile = async (result, email) => {
  const uploadTask = storage()
    .ref('users/' + email + '.jpg')
    .putFile(result.uri);

  const onComplete = async () => {
    const url = await uploadTask.snapshot.ref.getDownloadURL();
    const update = await auth().currentUser?.updateProfile({photoURL: url});
    return update;
  };

  const func = async () => {
    uploadTask.on(
      'state_changed',
      snapshot => console.log(snapshot.bytesTransferred / snapshot.totalBytes),
      error => console.log(error),
    );

    const complete = await uploadTask.then(onComplete);
    return complete;
  };

  const response = await func();
  return response;
};

export default updateProfile;
