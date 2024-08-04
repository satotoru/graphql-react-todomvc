import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { graphql } from '../gql'
import request from 'graphql-request'
import { useQuery } from '@tanstack/react-query'
import { Box, Button, Link as ChakraLink, Code, Heading, ListItem, Text, UnorderedList } from '@chakra-ui/react'
import { useGraphqlQuery } from './-hooks/useGraphqlQuery'
import { TestFieldQuery, TestFieldQueryVariables } from '../gql/graphql'

export const Route = createLazyFileRoute('/')({
  component: App
})

const testFieldDocument = graphql(`
  query TestField {
    testField
    }
  `)

function App() {
  const [count, setCount] = useState(0)
  const { data } = useGraphqlQuery(testFieldDocument);

  return (
    <>
      <Heading as={'h1'}>GraphQL React ToDoMVC</Heading>
      <Box mt={8}>
        <Button onClick={() => setCount(count + 1)}>Count is {count}</Button>
        <Text>graphql testField: <Code ml={2}>{data?.testField}</Code></Text>
      </Box>
      <Box mt={4}>
        <UnorderedList>
          <ListItem>
            <ChakraLink as={Link} to="/">Home</ChakraLink>
          </ListItem>
          <ListItem>
            <ChakraLink as={Link} to="/">Home</ChakraLink>
          </ListItem>
        </UnorderedList>
      </Box>
    </>
  )
}
