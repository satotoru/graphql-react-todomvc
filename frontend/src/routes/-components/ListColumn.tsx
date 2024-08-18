import { Card, CardBody, CardFooter, CardHeader, Divider, Heading, Text, Stack, IconButton, Input, Flex } from '@chakra-ui/react'
import { getKey, queryClient, useGraphqlMutation } from '../-hooks/useGraphqlQuery'
import { AddIcon, CloseIcon } from '@chakra-ui/icons'
import { CreateCardDocument, DeleteCardDocument, DeleteListDocument, ListsDocument, ListsQuery, ReorderCardsDocument } from '../../gql/graphql'
import { graphql } from '../../gql'
import { useEffect, useState } from 'react'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { closestCenter, DndContext, DragEndEvent, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

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

graphql(`
  mutation ReorderCards($listId: ID!, $cardIds: [ID!]!) {
    reorderCards(input: { listId: $listId, cardIds: $cardIds }) {
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

function SortableItem(props: { id: string, children: React.ReactNode }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }
  return <div ref={setNodeRef} style={style} {...attributes} {...listeners}>{props.children}</div>
}

type ListColumnProps = {
  list: ListsQuery['lists'][number]
}
export function ListColumn(props: ListColumnProps) {
  const { list } = props
  const [cards, setCards] = useState(list.cards)
  useEffect(() => {
    setCards(list.cards)
  }, [list.cards])

  const deleteListMutation = useGraphqlMutation(DeleteListDocument, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [getKey(ListsDocument)] })
    }
  })
  const reorderCardsMutation = useGraphqlMutation(ReorderCardsDocument, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [getKey(ListsDocument)] })
    }
  })
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over) {
      return
    }
    if (active.id !== over.id) {
      const oldIndex = cards.findIndex((card) => card.id === active.id)
      const newIndex = cards.findIndex((card) => card.id === over.id)
      const newCards = arrayMove(cards, oldIndex, newIndex)
      setCards(newCards)
      reorderCardsMutation.mutate({ listId: list.id, cardIds: newCards.map((card) => card.id) })
    }
  }
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )

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
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={cards} strategy={verticalListSortingStrategy}>
              {cards.map((card) => (
                <SortableItem key={card.id} id={card.id}>
                  <CardItem card={card} />
                </SortableItem>
              ))}
            </SortableContext>
          </DndContext>
        </Stack>
      </CardBody>
      <CardFooter p={2}>
        <NewCard listId={list.id} />
      </CardFooter>
    </Card>
  );
}
