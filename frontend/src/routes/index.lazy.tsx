import { createLazyFileRoute } from '@tanstack/react-router'
import { graphql } from '../gql'
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Heading, HStack, Input, Text } from '@chakra-ui/react'
import { getKey, queryClient, useGraphqlMutation, useGraphqlQuery } from './-hooks/useGraphqlQuery'
import { SubmitHandler, useForm } from 'react-hook-form'
import { CloseIcon } from '@chakra-ui/icons'

export const Route = createLazyFileRoute('/')({
  component: App
})

const listsDocument = graphql(`
  query Lists {
    lists {
      id
      name
      createdAt
      updatedAt
    }
  }
`)

const createListDocument = graphql(`
  mutation CreateList($name: String!) {
    createList(input: { name: $name }) {
      success
    }
  }
`)

const deleteListDocument = graphql(`
  mutation DeleteList($id: ID!) {
    deleteList(input: { id: $id }) {
      success
    }
  }
`)

type ListInputs = {
  name: string
}

function App() {
  const { register, handleSubmit, formState: { errors } } = useForm<ListInputs>();
  const { data: listsData } = useGraphqlQuery(listsDocument);
  const createListMutation = useGraphqlMutation(createListDocument, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [getKey(listsDocument)] })
    }
  })
  const deleteListMutation = useGraphqlMutation(deleteListDocument, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [getKey(listsDocument)] })
    }
  })
  const onSubmit: SubmitHandler<ListInputs> = (data) => createListMutation.mutate(data)

  return (
    <>
      <Heading as={'h1'}>GraphQL React ToDoMVC</Heading>
      <Card mt={4}>
        <CardBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <HStack>
              <Input type="text" placeholder="New List" {...register("name", { required: true })} />
              {errors.name && <Text size={"xs"} color={'red'}>This field is required</Text>}
              <Button type="submit">Add</Button>
            </HStack>
          </form>
        </CardBody>
      </Card>
      <Box mt={4}>
        <HStack shouldWrapChildren={true} >
          {listsData?.lists.map((list) => (
            <Card key={list.id} width={200}>
              <CloseIcon
                boxSize={2}
                position={"absolute"}
                right={1}
                top={1}
                onClick={() => deleteListMutation.mutate({ id: list.id })}>×</CloseIcon>
              <CardHeader> <Heading size={"xs"}>{list.name}</Heading> </CardHeader>
              <CardBody>
              </CardBody>
              <CardFooter>
                <Button size="xs">New</Button>
              </CardFooter>
            </Card>
          ))}
        </HStack>
      </Box>
    </>
  )
}
