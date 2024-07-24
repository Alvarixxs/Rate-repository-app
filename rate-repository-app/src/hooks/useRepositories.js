import {useQuery} from "@apollo/client";
import {GET_REPOSITORIES} from "../graphql/queries";

const queryVariables = [
  {
    orderDirection: "DESC",
    orderBy: "CREATED_AT",
  },
  {
    orderDirection: "DESC",
    orderBy: "RATING_AVERAGE",
  },
  {
    orderDirection: "ASC",
    orderBy: "RATING_AVERAGE",
  }
]

const useRepositories = ({order, search, first}) => {
  const {loading, data, fetchMore, ...result} = useQuery(GET_REPOSITORIES, {
    variables: {
      orderDirection: queryVariables[order].orderDirection,
      orderBy: queryVariables[order].orderBy,
      searchKeyword: search,
      first,
    },
    fetchPolicy: 'cache-and-network',
    // Other options
  });

  const handleFetchMore = async () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    await fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        orderDirection: queryVariables[order].orderDirection,
        orderBy: queryVariables[order].orderBy,
        searchKeyword: search,
        first,
      },
    });
  };

  return {
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading,
    ...result,
  };
};

export default useRepositories;