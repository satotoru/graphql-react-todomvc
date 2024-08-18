/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation DeleteList($id: ID!) {\n    deleteList(input: { id: $id }) {\n      success\n    }\n  }\n": types.DeleteListDocument,
    "\n  mutation CreateCard($name: String!, $listId: ID!) {\n    createCard(input: { name: $name, listId: $listId }) {\n      success\n    }\n  }\n": types.CreateCardDocument,
    "\n  mutation DeleteCard($id: ID!) {\n    deleteCard(input: { id: $id }) {\n      success\n    }\n  }\n": types.DeleteCardDocument,
    "\n  mutation MoveCard($listId: ID!, $cardIdFrom: ID!, $cardIdTo: ID!) {\n    moveCard(input: { listId: $listId, cardIdFrom: $cardIdFrom, cardIdTo: $cardIdTo }) {\n      success\n    }\n  }\n": types.MoveCardDocument,
    "\n  mutation CreateList($name: String!) {\n    createList(input: { name: $name }) {\n      success\n    }\n  }\n": types.CreateListDocument,
    "\n  query Lists {\n    lists {\n      id\n      name\n      createdAt\n      updatedAt\n      cards {\n        id\n        name\n        createdAt\n        updatedAt\n      }\n    }\n  }\n": types.ListsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteList($id: ID!) {\n    deleteList(input: { id: $id }) {\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteList($id: ID!) {\n    deleteList(input: { id: $id }) {\n      success\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateCard($name: String!, $listId: ID!) {\n    createCard(input: { name: $name, listId: $listId }) {\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation CreateCard($name: String!, $listId: ID!) {\n    createCard(input: { name: $name, listId: $listId }) {\n      success\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteCard($id: ID!) {\n    deleteCard(input: { id: $id }) {\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteCard($id: ID!) {\n    deleteCard(input: { id: $id }) {\n      success\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation MoveCard($listId: ID!, $cardIdFrom: ID!, $cardIdTo: ID!) {\n    moveCard(input: { listId: $listId, cardIdFrom: $cardIdFrom, cardIdTo: $cardIdTo }) {\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation MoveCard($listId: ID!, $cardIdFrom: ID!, $cardIdTo: ID!) {\n    moveCard(input: { listId: $listId, cardIdFrom: $cardIdFrom, cardIdTo: $cardIdTo }) {\n      success\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateList($name: String!) {\n    createList(input: { name: $name }) {\n      success\n    }\n  }\n"): (typeof documents)["\n  mutation CreateList($name: String!) {\n    createList(input: { name: $name }) {\n      success\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query Lists {\n    lists {\n      id\n      name\n      createdAt\n      updatedAt\n      cards {\n        id\n        name\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"): (typeof documents)["\n  query Lists {\n    lists {\n      id\n      name\n      createdAt\n      updatedAt\n      cards {\n        id\n        name\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;