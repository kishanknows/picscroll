import {StyleSheet, View, StatusBar, Image, FlatList} from 'react-native';
import CustomModal from '../components/custom-modal';
import storage from '@react-native-firebase/storage';
import {useEffect, useState} from 'react';

const HomeScreen = props => {
  const [images, setImages] = useState<string[]>([]);
  const getImages = async () => {
    const imgRefs = await storage().ref('uploads/').listAll();
    const urls = await Promise.all(
      imgRefs.items.map(ref => ref.getDownloadURL()),
    );
    setImages(urls);
  };

  useEffect(() => {
    getImages();
  }, []);

  console.log(images);
  return (
    <View style={Styles.container}>
      <StatusBar
        backgroundColor="#492849"
        barStyle="light-content"
        translucent={true}
      />
      <CustomModal {...props} />
      <FlatList
        onRefresh={getImages}
        refreshing={false}
        data={images}
        renderItem={image => (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <View></View>
            <Image
              source={{uri: image.item}}
              style={{height: 500, width: '100%'}}
            />
          </View>
        )}></FlatList>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
  },
});

export default HomeScreen;
