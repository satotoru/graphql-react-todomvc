# frozen_string_literal: true

module Mutations
  class CreateCard < BaseMutation

    field :success, Boolean, null: false

    argument :name, String, required: true
    argument :list_id, ID, required: true

    def resolve(name:, list_id:)
      Card.create!(name: name, list_id: list_id)
      {success: true}
    end
  end
end
