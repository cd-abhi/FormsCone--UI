import { useMutation, gql } from "@apollo/client";

export const CREATE_FORM = gql`
  mutation createForm($title: String!, $description: String!) {
    createForm(input: { title: $title, description: $description }) {
      result
    }
  }
`;

export const GET_FORMS = gql`
  query {
    forms {
      id
      title
      description
    }
  }
`;

export const DELETE_FORM = gql`
  mutation DeleteForm($id: Float!) {
    deleteForm(id: $id)
  }
`;

export const ADD_ITEMS = gql`
  mutation addItems($input: [ItemsInputType!]!) {
    addItems(input: $input) {
      result
    }
  }
`;

export const GET_ITEMS = gql`
  query {
    items {
      id
      question
      description
    }
  }
`;

