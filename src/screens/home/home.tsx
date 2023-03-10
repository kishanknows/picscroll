import {
  StyleSheet,
  View,
  StatusBar,
  Image,
  FlatList,
  Dimensions,
  Text,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import CustomModal from '../../components/custom-modal';
import {useEffect, useState} from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import SideMenu from './side-menu';
import catAPI from '../../services/cat-api';
import dogAPI from '../../services/dog-api';

const HomeScreen = props => {
  const [posts, setPosts] = useState<FirebaseFirestoreTypes.DocumentData[]>();
  const [loading, setLoading] = useState(false);
  const [catPosts, setCatPosts] = useState([]);
  const [dogPosts, setDogPosts] = useState([]);
  const [tab, setTab] = useState(1);

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

  const getCatImages = pos => {
    pos === 'front' ? setLoading(true) : null;
    catAPI()
      .then(res =>
        pos === 'back'
          ? setCatPosts(catPosts.concat(res.data))
          : setCatPosts(res.data.concat(catPosts)),
      )
      .finally(() => setLoading(false))
      .catch(err => console.log(err));
  };

  const getDogImages = pos => {
    pos === 'front' ? setLoading(true) : null;
    dogAPI()
      .then(res =>
        pos === 'back'
          ? setDogPosts(dogPosts.concat(res.data))
          : setDogPosts(res.data.concat(dogPosts)),
      )
      .finally(() => setLoading(false))
      .catch(err => console.log(err));
  };

  const onRefresh = () => {
    switch (tab) {
      case 1:
        getImages();
        break;
      case 2:
        getCatImages('front');
        break;
      case 3:
        getDogImages('front');
        break;
    }
  };

  const onEndReached = () => {
    switch (tab) {
      case 1:
        null;
        break;
      case 2:
        getCatImages('back');
        break;
      case 3:
        getDogImages('back');
        break;
    }
  };

  const Item = props => {
    return (
      <View style={styles.itemView}>
        <Image source={{uri: props.url}} style={styles.itemImage} />
        <View style={styles.itemDetailView}>
          <View style={{flexDirection: 'row'}}>
            <FontAwesomeIcon name="user-circle" size={40} color="white" />
            <Text style={styles.itemDetailText}>@{props.username}</Text>
          </View>
          <Text style={styles.itemDescriptionText}>Abusadamente desp.</Text>
        </View>
      </View>
    );
  };

  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor="black"
        barStyle="light-content"
        translucent={true}
      />
      <CustomModal {...props} />
      <SideMenu {...props} setTab={setTab} />
      <FlatList
        snapToInterval={Dimensions.get('screen').height}
        showsVerticalScrollIndicator={false}
        onRefresh={onRefresh}
        disableIntervalMomentum={true}
        disableScrollViewPanResponder={true}
        refreshing={loading}
        data={tab === 1 ? posts : tab === 2 ? catPosts : dogPosts}
        onEndReached={onEndReached}
        ListFooterComponent={
          tab === 1 ? null : <ActivityIndicator color={'white'} size={20} />
        }
        ListFooterComponentStyle={{backgroundColor: 'black'}}
        renderItem={({item}) => (
          <Item
            url={tab === 1 ? item.image_url : item.url}
            username={tab === 1 ? item.username : item.id}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  itemView: {
    backgroundColor: 'black',
    justifyContent: 'center',
  },
  itemImage: {
    height: Dimensions.get('screen').height,
    width: '100%',
    resizeMode: 'contain',
  },
  itemDetailView: {
    position: 'absolute',
    bottom: 1,
    marginBottom: 100,
    marginLeft: 10,
    padding: 5,
  },
  itemDetailText: {
    color: 'white',
    fontWeight: 'bold',
    padding: 5,
    fontSize: 13,
    alignSelf: 'flex-end',
  },
  itemDescriptionText: {color: 'white', paddingTop: 10},
});

export default HomeScreen;
