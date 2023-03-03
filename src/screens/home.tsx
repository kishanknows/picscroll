import {
  StyleSheet,
  View,
  StatusBar,
  Image,
  FlatList,
  Dimensions,
  Text,
} from 'react-native';
import CustomModal from '../components/custom-modal';
import {useEffect, useState} from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

const HomeScreen = props => {
  const [posts, setPosts] = useState<FirebaseFirestoreTypes.DocumentData[]>();
  const [loading, setLoading] = useState(false);

  const getImages = async () => {
    setLoading(true);
    const postRefs = await firestore()
      .collection('Uploads')
      .orderBy('posted_on', 'desc')
      .get();
    const docs = await Promise.all(
      postRefs.docs.map(post => post.data()),
    ).finally(() => setLoading(false));
    setPosts(docs);
  };

  useEffect(() => {
    getImages();
  }, []);

  const Item = props => {
    return (
      <View
        style={{
          backgroundColor: 'black',
        }}>
        <Image
          source={{uri: props.url}}
          style={{
            height: Dimensions.get('window').height,
            width: '100%',
            resizeMode: 'contain',
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            bottom: 1,
            marginBottom: 100,
            marginLeft: 10,
          }}>
          <FontAwesomeIcon name="user-circle" size={40} color="white" />
          <View style={{paddingLeft: 10}}>
            <Text style={{color: 'white'}}>{props.username}</Text>
            <Text style={{color: 'white'}}>Abusadamente desp.</Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={Styles.container}>
      <StatusBar
        backgroundColor="#492849"
        barStyle="light-content"
        translucent={true}
      />
      <CustomModal {...props} />
      <FlatList
        snapToInterval={Dimensions.get('window').height}
        snapToAlignment="start"
        showsVerticalScrollIndicator={false}
        onRefresh={getImages}
        disableIntervalMomentum={true}
        disableScrollViewPanResponder={true}
        refreshing={loading}
        data={posts}
        renderItem={({item}) => (
          <Item url={item.image_url} username={item.username} />
        )}
      />
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default HomeScreen;
