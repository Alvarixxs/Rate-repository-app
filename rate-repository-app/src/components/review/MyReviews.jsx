import {useQuery} from "@apollo/client";
import {ME} from "../../graphql/queries";
import Text from "../utils/Text";
import React from "react";
import ReviewItem from "./ReviewItem";
import {FlatList} from "react-native";

const MyReviews = () => {
  const {data, loading, refetch } = useQuery(
    ME,
    { fetchPolicy: 'network-only' , variables: {includesReviews: true}}
  )

  if (loading) {
    return <Text>Loading ...</Text>
  }

  const {reviews} = data.me

  // Get the nodes from the edges array
  const reviewNodes = reviews
    ? reviews.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({item}) => <ReviewItem review={item} editable={true} refetch={refetch}/>}
      keyExtractor={({ id }) => id}
    />
  )
}

export default MyReviews;