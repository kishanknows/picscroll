import {Text, StyleSheet} from 'react-native';
import {useState} from 'react';
import CommentsModal from '../../components/comments-modal';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';

export const Like = props => {
  const user_id = useSelector((state: RootState) => state.userConfig.uid);

  const [isLiked, setIsLiked] = useState(
    props.liked_by?.hasOwnProperty(user_id) ? true : false,
  );
  const [likeCount, setLikeCount] = useState(props.likes_count);

  const _like = () => {
    const updated_liked_by = {...props.liked_by, [user_id]: true};
    firestore()
      .doc(props.path)
      .update({
        likes_count: likeCount + 1,
        liked_by: updated_liked_by,
      });
    setIsLiked(true);
    setLikeCount(likeCount + 1);
  };

  const _unLike = () => {
    const updated_liked_by = props.liked_by;
    delete updated_liked_by[user_id];
    firestore()
      .doc(props.path)
      .update({
        likes_count: likeCount - 1,
        liked_by: updated_liked_by,
      });
    setIsLiked(false);
    setLikeCount(likeCount - 1);
  };

  return (
    <>
      {isLiked ? (
        <FontAwesomeIcon name="heart" size={25} color="red" onPress={_unLike} />
      ) : (
        <FontAwesomeIcon
          name="heart-o"
          size={25}
          color="white"
          onPress={_like}
        />
      )}
      <Text style={styles.likeCommentText}>{likeCount}</Text>
    </>
  );
};

export const Comment = props => {
  const [commentModalShown, setCommentModalShown] = useState(false);
  const [commentsCount, setCommentsCount] = useState(props.comments_count);

  return (
    <>
      <CommentsModal
        visible={commentModalShown}
        setCommentModalShown={setCommentModalShown}
        comments={props.comments}
        path={props.path}
        comments_count={props.comments_count}
        setCommentsCount={setCommentsCount}
        commentsCount={commentsCount}
      />
      <FontAwesomeIcon
        name="comment-o"
        size={25}
        color="white"
        onPress={() => setCommentModalShown(true)}
      />
      <Text style={styles.likeCommentText}>{commentsCount}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  likeCommentText: {
    color: 'white',
    paddingBottom: 10,
  },
});
