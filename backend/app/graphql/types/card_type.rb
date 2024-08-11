# frozen_string_literal: true

module Types
  class CardType < Types::BaseObject
    field :id, ID, null: false
    field :list, Types::ListType, null: false
    field :name, String, null: false
    field :description, String
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
