import { gql } from "@apollo/client";
// change the mutation to match the checklist
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
// change the mutation to match the checklist
export const ADD_CHECKLIST = gql`
  mutation addCheckList(
    $checkListText: String!
    $checkListAuthor: String!
    $items: [CheckItemInput]
  ) {
    addCheckList(
      checkListText: $checkListText
      checkListAuthor: $checkListAuthor
      items: $items
    ) {
      _id
      checkListText
      checkListAuthor
      createdAt
      comments {
        id
        commentText
      }
      items {
        text
        isCheck
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment($checkListId: ID!, $commentText: String!) {
    addComment(checkListId: $checkListId, commentText: $commentText) {
      _id
      checkListText
      checkListAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
