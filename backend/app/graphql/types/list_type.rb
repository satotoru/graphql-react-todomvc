# frozen_string_literal: true

module Types
  class ListType < Types::BaseObject
    field :id, ID, null: false
    field :name, String
    field :cards, [Types::CardType], null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false

    def cards
      object.ordered_cards
    end
  end
end
