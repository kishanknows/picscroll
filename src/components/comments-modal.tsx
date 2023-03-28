import {
  Modal,
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  FlatList,
  Image,
  TextInput,
} from 'react-native';
import {useState} from 'react';
import {theme} from '../theme';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import firestore from '@react-native-firebase/firestore';

const Separator = () => {
  return <View style={styles.separator}></View>;
};

const Item = props => {
  return (
    <View style={styles.commentView}>
      {props.photoURL ? (
        <Image source={{uri: props.photoURL}} style={styles.commentAvatar} />
      ) : (
        <FontAwesomeIcon name="user-circle" size={25} color="white" />
      )}
      <View style={styles.commentTextView}>
        <Text style={styles.commentTextHeader}>{props.username}</Text>
        <Text style={styles.commentTextContent}>{props.comment}</Text>
      </View>
    </View>
  );
};

const CommentsModal = props => {
  const [commentInput, setCommentInput] = useState('');
  const user = useSelector((state: RootState) => state.userConfig);
  const submit = () => {
    const updatedComments = props.comments;
    updatedComments.push({
      username: user.displayName,
      photoURL: user.photoURL,
      comment: commentInput,
    });
    firestore()
      .doc(props.path)
      .update({
        comments: updatedComments,
        comments_count: props.commentsCount + 1,
      });
    setCommentInput('');
    props.setCommentsCount(props.commentsCount + 1);
  };

  return (
    <Modal transparent={true} visible={props.visible} animationType="slide">
      <TouchableWithoutFeedback
        onPress={() => props.setCommentModalShown(false)}>
        <View style={styles.background}></View>
      </TouchableWithoutFeedback>
      <View style={styles.container}>
        <Text style={styles.header}>Comments</Text>
        <Separator />
        <View style={{flex: 9, paddingLeft: 10}}>
          <FlatList
            data={props.comments}
            renderItem={({item}) => (
              <Item
                photoURL={item.photoURL}
                username={item.username}
                comment={item.comment}
              />
            )}
          />
        </View>
        <View style={{flex: 1}}></View>
        <View style={styles.commentField}>
          {user.photoURL ? (
            <Image source={{uri: user.photoURL}} style={styles.commentAvatar} />
          ) : (
            <FontAwesomeIcon name="user-circle" size={25} color="white" />
          )}
          <TextInput
            style={styles.commentFieldText}
            onChangeText={text => setCommentInput(text)}
            placeholder="add a comment"
            value={commentInput}
          />
          <FontAwesomeIcon
            name="send"
            color="black"
            size={20}
            onPress={submit}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: '100%',
    width: '100%',
  },
  container: {
    position: 'absolute',
    top: '15%',
    height: '85%',
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: 'white',
  },
  header: {
    alignSelf: 'center',
    margin: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  separator: {
    backgroundColor: 'grey',
    height: 0.5,
    width: '100%',
    alignSelf: 'center',
  },
  commentView: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 9,
  },
  commentAvatar: {
    height: 25,
    width: 25,
    borderRadius: 12.5,
    marginVertical: 10,
    marginRight: 10,
  },
  commentTextView: {
    padding: 10,
    flex: 1,
  },
  commentTextHeader: {
    fontSize: 12,
    marginBottom: 2,
  },
  commentTextContent: {
    fontSize: 14,
    color: 'black',
  },
  commentField: {
    position: 'absolute',
    bottom: 1,
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    backgroundColor: theme.primaryColorLight,
    padding: 10,
  },
  commentFieldText: {
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    flex: 1,
    paddingLeft: 0,
  },
});

export default CommentsModal;
