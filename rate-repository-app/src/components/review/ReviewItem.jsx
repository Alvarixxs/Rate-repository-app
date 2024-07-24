import {Alert, Pressable, StyleSheet, View} from "react-native";
import Text from "../utils/Text";
import theme from "../../theme";
import {useNavigate} from "react-router-native";
import {useMutation} from "@apollo/client";
import {DELETE_REVIEW} from "../../graphql/mutations";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    backgroundColor: '#fff',
  },
  reviewContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    padding: 10,
  },
  ratingContainer: {
    alignSelf: 'flex-start',
    borderColor: theme.colors.primary,
    borderWidth: 2,
    borderRadius: 1000,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewTextContainer: {
    flexShrink: 1,
    flex: 1,
    gap: 5,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    gap: 10,
  },
  viewRepoContainer: {
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    flexShrink: 1,
    flexGrow: 1,
    padding: 10,
    alignItems: 'center',

  },
  deleteRevContainer: {
    backgroundColor: theme.colors.error,
    borderRadius: 5,
    flexShrink: 1,
    flexGrow: 1,
    padding: 10,
    alignItems: 'center',
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review, editable= false, refetch = () => null }) => {
  const navigate = useNavigate();
  const [mutate, result] = useMutation(DELETE_REVIEW);

  const navigateToRepo = () => {
    navigate(`/${review.repositoryId}`);
  }

  const deleteReview = () =>
    Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: async () => {
          await mutate({variables: {deleteReviewId: review.id}});
          refetch()
        }},
    ]);

  return (
    <View>
      <ItemSeparator />
      <View style={styles.container}>
        <View style={styles.reviewContainer}>
          <View style={styles.ratingContainer}>
            <Text color="primary" fontWeight="bold">{review.rating}</Text>
          </View>
          <View style={styles.reviewTextContainer}>
            {editable ? (
              <Text fontWeight="bold" >{review.repository.name}</Text>
            ) : (
              <Text fontWeight="bold" >{review.user.username}</Text>
            )}
            <Text color="textSecondary">{review.createdAt.split("T")[0]}</Text>
            <Text>{review.text}</Text>
          </View>
        </View>
        {editable ? (
          <View style={styles.buttonContainer}>
            <Pressable style={styles.viewRepoContainer} onPress={navigateToRepo}>
              <Text fontWeight="bold" style={{color: '#fff'}}>View repository</Text>
            </Pressable>
            <Pressable style={styles.deleteRevContainer} onPress={deleteReview}>
              <Text fontWeight="bold" style={{color: '#fff'}}>Delete review</Text>
            </Pressable>
          </View>
        ) : null}
      </View>
    </View>
  )
};

export default ReviewItem