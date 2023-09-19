import { gql } from "@apollo/client";
// change the querys to match the checklist
export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      email
      username
      checkLists {
        _id
        checkListText
        createdAt
        items {
          text
          isCheck
        }
      }
    }
  }
`;

export const GET_ALL_CHECKLISTS = gql`
  query getCheckLists {
    checkLists {
      _id
      checkListText
      checkListAuthor
      createdAt
      items {
        text
        isCheck
      }
    }
  }
`;

export const QUERY_SINGLE_CHECKLIST = gql`
  query getSingleCkeckList($checkListId: ID!) {
    checkList(checkListId: $checkListId) {
      _id
      checkListText
      checkListAuthor
      createdAt
      comments {
        _id
        commentText
        commentAuthor
        createdAt
      }
    }
  }
`;

// export const QUERY_ME = gql`
//   query me {
//     me {
//       _id
//       username
//       email
//       checkLists {
//         items {
//           text
//           isCheck
//         }
//         title
//         user {
//           username
//           email
//         }
//       }
//     }
//   }
// `;
