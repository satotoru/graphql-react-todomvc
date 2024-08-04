import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { useQuery } from "@tanstack/react-query";
import { DirectiveDefinitionNode } from "graphql";
import request from "graphql-request";

export function getKey<TData = unknown, TVariabels = unknown>(
  document: TypedDocumentNode<TData, TVariabels>
) {
  return (document.definitions[0] as DirectiveDefinitionNode)?.name?.value;
}

export function useGraphqlQuery<TData = unknown, TVariabels = unknown>(
  document: TypedDocumentNode<TData, TVariabels>
) {
  return useQuery({
    queryKey: [getKey(document)],
    queryFn: () => {
      return request({
        url: import.meta.env.VITE_GRAPHQL_ENDPOINT,
        document,
      });
    },
  });
}
