import { Card, CardBody, CardFooter, CardHeader, Divider, Heading, Text, Stack, IconButton, Input, Flex } from '@chakra-ui/react'
import { getKey, queryClient, useGraphqlMutation } from '../-hooks/useGraphqlQuery'
import { AddIcon, CloseIcon } from '@chakra-ui/icons'
import { CreateCardDocument, DeleteCardDocument, DeleteListDocument, ListsDocument, ListsQuery } from '../../gql/graphql'
import { graphql } from '../../gql'
import { useEffect, useState } from 'react'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'

graphql(`
  mutation DeleteList($id: ID!) {
    deleteList(input: { id: $id }) {
      success
    }
  }
`)

graphql(`
  mutation CreateCard($name: String!, $listId: ID!) {
    createCard(input: { name: $name, listId: $listId }) {
      success
    }
  }
`)

graphql(`
  mutation DeleteCard($id: ID!) {
    deleteCard(input: { id: $id }) {
      success
    }
  }
`)

type CreateCardInputs = {
  name: string
}
type NewCardProps = {
  listId: string
}
function NewCard(props: NewCardProps) {
  const [newCard, setNewCard] = useState(false)
  const createCardMutation = useGraphqlMutation(CreateCardDocument, {
    onSuccess: () => {
      reset()
      setNewCard(false)
      queryClient.invalidateQueries({ queryKey: [getKey(ListsDocument)] })
    }
  })
  const { register, handleSubmit, reset, setFocus } = useForm<CreateCardInputs>();
  const onSubmit: SubmitHandler<CreateCardInputs> = (data) => {
    createCardMutation.mutate({ ...data, listId: props.listId })
  }
  const onError: SubmitErrorHandler<CreateCardInputs> = (e) => {
    reset()
    setNewCard(false)
  }

  useEffect(() => {
    if (newCard) {
      setFocus('name')
    }
  }, [newCard, setFocus])


  return (
    <>
      {
        newCard ? (
          <form onSubmit={handleSubmit(onSubmit, onError)} >
            <Input
              size="sm"
              type="text"
              placeholder="New Card"
              {...register("name", {
                required: true, onBlur: () => {
                  setNewCard(false)
                  reset()
                }
              })}
            />
          </form>
        ) : (
          <IconButton
            aria-label='Add Card'
            icon={<AddIcon></AddIcon>}
            size="xs"
            onClick={() => setNewCard(true)}
          />
        )
      }
    </>
  )
}

type CardItemProps = {
  card: ListsQuery['lists'][number]['cards'][number]
}
function CardItem(props: CardItemProps) {
  const deleteCardMutation = useGraphqlMutation(DeleteCardDocument, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [getKey(ListsDocument)] })
    }
  })

  return (
    <Card key={props.card.id} backgroundColor={"gray.100"} p={2}>
      <Flex justifyContent={"space-between"}>
        <Text>{props.card.name}</Text>
        <CloseIcon
          boxSize={2}
          onClick={() => deleteCardMutation.mutate({ id: props.card.id })}
        >
          ×
        </CloseIcon>
      </Flex>
    </Card>
  )
}


type ListColumnProps = {
  list: ListsQuery['lists'][number]
}
export function ListColumn(props: ListColumnProps) {
  const { list } = props
  const deleteListMutation = useGraphqlMutation(DeleteListDocument, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [getKey(ListsDocument)] })
    }
  })

  return (
    <Card key={list.id} width={200}>
      <CloseIcon
        boxSize={2}
        position={"absolute"}
        right={1}
        top={1}
        onClick={() => deleteListMutation.mutate({ id: list.id })}
      >
        ×
      </CloseIcon>
      <CardHeader p={4}>
        <Heading as={"h3"} size={"xs"}>
          {list.name}
        </Heading>
      </CardHeader>
      <Divider />
      <CardBody p={2}>
        <Stack>
          {list.cards.map((card) => (
            <CardItem key={card.id} card={card} />
          ))}
        </Stack>
      </CardBody>
      <CardFooter p={2}>
        <NewCard listId={list.id} />
      </CardFooter>
    </Card>
  );
}
