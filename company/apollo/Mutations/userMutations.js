import { gql } from "@apollo/client";
import { USER_FRAGMENT, USERMODULE_FRAGMENT } from "../Fragments";

const LOGIN = gql`
  ${USER_FRAGMENT}
  mutation login($email: String!, $password: String!) {
    login(data: { email: $email, password: $password }) {
      token
      user {
        ...user
      }
    }
  }
`;

const SIGNUP = gql`
  mutation signup(
    $name: String!
    $email: String!
    $password: String!
    $isAdmin: Boolean
    $firstRun: Boolean
  ) {
    signup(
      data: {
        name: $name
        email: $email
        password: $password
        isAdmin: $isAdmin
        firstRun: $firstRun
      }
    )
  }
`;

const RESET_PASSWORD = gql`
  mutation resetPassword($token: String!, $password: String!) {
    resetPassword(data: { token: $token, password: $password })
  }
`;

const FORGET_PASSWORD = gql`
  mutation forgetPassword($email: String!) {
    forgetPassword(email: $email)
  }
`;

const ACCOUNT_VALIDATION = gql`
  mutation verifyAccount($token: String!) {
    verifyAccount(token: $token)
  }
`;

const ADD_MODULES_FOR_USER = gql`
  ${USERMODULE_FRAGMENT}
  mutation addModulesforUser($modules: [String!]!) {
    addModulesforUser(modules: $modules) {
      ...userModule
    }
  }
`;

const UPDATE_USER = gql`
  mutation updateUser(
    $_id: String!
    $name: String
    $email: String
    $password: String
    $isAdmin: Boolean
    $firstRun: Boolean
    $image: Upload
  ) {
    updateUser(
      data: {
        _id: $_id
        name: $name
        email: $email
        password: $password
        isAdmin: $isAdmin
        firstRun: $firstRun
        image: $image
      }
    ) {
      _id
      imageUrl
    }
  }
`;

export {
  LOGIN,
  SIGNUP,
  RESET_PASSWORD,
  FORGET_PASSWORD,
  ACCOUNT_VALIDATION,
  ADD_MODULES_FOR_USER,
  UPDATE_USER,
};
