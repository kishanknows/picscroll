import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

const addImage = async (mode: 'camera' | 'storage') => {
  let result: ImagePickerResponse;
  switch (mode) {
    case 'camera':
      result = await launchCamera({
        mediaType: 'photo',
        presentationStyle: 'fullScreen',
        maxHeight: 500,
      });
      break;
    case 'storage':
      result = await launchImageLibrary({
        mediaType: 'photo',
        presentationStyle: 'fullScreen',
      });
      break;
  }
  return result;
};

export default addImage;
