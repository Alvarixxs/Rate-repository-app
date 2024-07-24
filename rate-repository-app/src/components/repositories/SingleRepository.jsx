import {useParams} from "react-router-native";
import {useQuery} from "@apollo/client";
import {GET_REPOSITORY} from "../../graphql/queries";
import {FlatList} from "react-native";
import Text from "../utils/Text"
import RepositoryItem from "./RepositoryItem";
import ReviewItem from "../review/ReviewItem";

function SingleRepository() {
  const {id} = useParams();
  const FIRST = 8
  const {data, loading , error, fetchMore} = useQuery(GET_REPOSITORY, {
      variables: {
        repositoryId: id,
        first: FIRST,
      },
      fetchPolicy: "cache-and-network"
    }
  );

  const onEndReach = async () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    await fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        first: FIRST,
      },
    });
  }

  if (loading) {
    return (
      <Text>Loading...</Text>
    );
  }

  if (error) {
    return (
      <Text>Error: {error.message}</Text>
    );
  }

  // Get the nodes from the edges array
  const reviewNodes = data.repository.reviews
    ? data.repository.reviews.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({item}) => <ReviewItem review={item}/>}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryItem repository={data.repository} url={true} />}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  )
}

export default SingleRepository;