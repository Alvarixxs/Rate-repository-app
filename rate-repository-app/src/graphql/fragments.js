import {gql} from "@apollo/client";

export const REPOSITORY_DETAILS = gql`
   fragment RepositoryDetails on Repository {
     id
     description
     fullName
     language
     stargazersCount
     forksCount
     ratingAverage
     reviewCount
     ownerAvatarUrl
     url
  }
 `

export const REVIEW_DETAILS = gql`
fragment ReviewDetails on Review {
  id
  text
  rating
  createdAt
  repositoryId
  repository {
   name
  }
}
`

export const USER_DETAILS = gql`
fragment UserDetails on User {
  id
  username
}
`