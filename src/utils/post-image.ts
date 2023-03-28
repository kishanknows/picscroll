import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const postImage = async (result, user) => {
  const uploadTask = storage()
    .ref('uploads/' + result.fileName)
    .putFile(result.uri);

  const onComplete = async () => {
    const url = await uploadTask.snapshot.ref.getDownloadURL();
    firestore().collection('Uploads').add({
      username: user.displayName,
      user_image_url: user.photoURL,
      image_url: url,
      posted_on: Date.now(),
      likes_count: null,
      comments_count: null,
      liked_by: {},
      comments: [],
    });
  };

  uploadTask.on(
    'state_changed',
    snapshot => console.log(snapshot.bytesTransferred / snapshot.totalBytes),
    error => console.log(error),
  );
  return uploadTask.then(onComplete);
};

export default postImage;
