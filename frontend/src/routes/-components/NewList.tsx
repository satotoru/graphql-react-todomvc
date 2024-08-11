import { SubmitHandler, useForm } from 'react-hook-form'
import { getKey, queryClient, useGraphqlMutation } from '../-hooks/useGraphqlQuery';
import { graphql } from '../../gql'
import { Button, Card, CardBody, HStack, Input, Text } from '@chakra-ui/react';
import { CreateListDocument, ListsDocument } from '../../gql/graphql';

graphql(`
  mutation CreateList($name: String!) {
    createList(input: { name: $name }) {
      success
    }
  }
`)

type ListInputs = {
  name: string
}

export function NewList() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<ListInputs>();
  const createListMutation = useGraphqlMutation(CreateListDocument, {
    onSuccess: () => {
      reset()
      queryClient.invalidateQueries({ queryKey: [getKey(ListsDocument)] })
    }
  })
  const onSubmit: SubmitHandler<ListInputs> = (data) => {
    createListMutation.mutate(data)
  }

  return (
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
  )
}
