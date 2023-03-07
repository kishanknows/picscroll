import {
  StyleSheet,
  View,
  StatusBar,
  Image,
  FlatList,
  Dimensions,
  Text,
} from 'react-native';
import CustomModal from '../../components/custom-modal';
import {useEffect, useState} from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import SideMenu from './side-menu';

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
          justifyContent: 'center',
        }}>
        <Image
          source={{uri: props.url}}
          style={{
            height: Dimensions.get('screen').height,
            width: '100%',
            resizeMode: 'contain',
          }}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 1,
            marginBottom: 100,
            marginLeft: 10,
            padding: 5,
          }}>
          <View style={{flexDirection: 'row'}}>
            <FontAwesomeIcon name="user-circle" size={40} color="white" />
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                padding: 5,
                fontSize: 13,
                alignSelf: 'flex-end',
              }}>
              @{props.username}
            </Text>
          </View>
          <Text style={{color: 'white', paddingTop: 10}}>
            Abusadamente desp.
          </Text>
        </View>
      </View>
    );
  };
  return (
    <View style={Styles.container}>
      <StatusBar
        backgroundColor="black"
        barStyle="light-content"
        translucent={true}
      />
      <CustomModal {...props} />
      <SideMenu {...props} />
      <FlatList
        snapToInterval={Dimensions.get('screen').height}
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
