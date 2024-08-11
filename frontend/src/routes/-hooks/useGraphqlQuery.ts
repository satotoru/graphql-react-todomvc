import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { QueryClient, useMutation, UseMutationOptions, useQuery } from "@tanstack/react-query";
import { DirectiveDefinitionNode } from "graphql";
import request from "graphql-request";

export const queryClient = new QueryClient()

export function getKey<TData = unknown, TVariables = unknown>(
  document: TypedDocumentNode<TData, TVariables>
) {
  return [(document.definitions[0] as DirectiveDefinitionNode)?.name?.value][0];
}

export function useGraphqlQuery<TData = unknown, TVariables = unknown>(
  document: TypedDocumentNode<TData, TVariables>,
  variables?: TVariables
) {
  return useQuery({
    queryKey: [getKey(document)],
    queryFn: () => {
      return request({
        url: import.meta.env.VITE_GRAPHQL_ENDPOINT,
        document,
        ...(variables && variables),
      });
    },
  });
}

export function useGraphqlMutation<TData = unknown, TVariables = unknown>(
  document: TypedDocumentNode<TData, TVariables>,
  options?: UseMutationOptions<TData, unknown, TVariables>
) {
  return useMutation({
    ...options,
    mutationKey: [getKey(document)],
    mutationFn: (variables?: TVariables) => {
      return request({
        url: import.meta.env.VITE_GRAPHQL_ENDPOINT,
        document,
        ...(variables && { variables }),
      });
    },
  });
}
