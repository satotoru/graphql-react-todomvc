import { createLazyFileRoute } from '@tanstack/react-router'
import { graphql } from '../gql'
import { Box, Heading, HStack, Stack } from '@chakra-ui/react'
import { useGraphqlQuery } from './-hooks/useGraphqlQuery'
import { NewList } from './-components/NewList'
import { ListsDocument } from '../gql/graphql'
import { ListColumn } from './-components/ListColumn'

export const Route = createLazyFileRoute('/')({
  component: App
})

graphql(`
  query Lists {
    lists {
      id
      name
      createdAt
      updatedAt
      cards {
        id
        name
        createdAt
        updatedAt
      }
    }
  }
`)

function App() {
  const { data: listsData } = useGraphqlQuery(ListsDocument);
  return (
    <>
      <Heading as={'h1'}>GraphQL React ToDoMVC</Heading>
      <NewList />
      <Box mt={4}>
        <Stack direction="row" shouldWrapChildren={true} spacing={4}>
          {listsData?.lists.map((list) => (
            <ListColumn key={list.id} list={list} />
          ))}
        </Stack>
      </Box>
    </>
  )
}
