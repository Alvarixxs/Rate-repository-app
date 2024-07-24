import { gql } from '@apollo/client';
import {REPOSITORY_DETAILS, REVIEW_DETAILS, USER_DETAILS} from "./fragments";

export const GET_REPOSITORIES = gql`
query Query($orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy, $searchKeyword: String, $first: Int, $after: String) {
  repositories(orderDirection: $orderDirection, orderBy: $orderBy, searchKeyword: $searchKeyword, first: $first, after: $after) {
    edges {
      node {
        ...RepositoryDetails
      }
      cursor
    }
    pageInfo {
      endCursor
      startCursor
      hasNextPage
    }
  }
}
${REPOSITORY_DETAILS}
`;

export const ME = gql`
query Query($includesReviews: Boolean = false) {
  me {
    ...UserDetails
    reviews @include (if: $includesReviews) {
      edges {
        node {
          ...ReviewDetails
        }
      }
    }
  }
}
${USER_DETAILS}
${REVIEW_DETAILS}
`

export const GET_REPOSITORY = gql`
query Repository($repositoryId: ID!, $first: Int, $after: String) {
  repository(id: $repositoryId) {
    ...RepositoryDetails
    reviews(first: $first, after: $after) {
      edges {
        node {
          ...ReviewDetails
          user {
            ...UserDetails
          }
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
}
${REPOSITORY_DETAILS}
${REVIEW_DETAILS}
${USER_DETAILS}
`