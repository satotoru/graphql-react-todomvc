# frozen_string_literal: true

module Types
  class MutationType < Types::BaseObject
    field :reorder_cards, mutation: Mutations::ReorderCards
    field :delete_card, mutation: Mutations::DeleteCard
    field :create_card, mutation: Mutations::CreateCard
    field :delete_list, mutation: Mutations::DeleteList
    field :create_list, mutation: Mutations::CreateList
    # TODO: remove me
    field :test_field, String, null: false,
      description: "An example field added by the generator"
    def test_field
      "Hello World"
    end
  end
end
