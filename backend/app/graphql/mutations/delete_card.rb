# frozen_string_literal: true

module Mutations
  class DeleteCard < BaseMutation
    field :success, Boolean, null: false

    argument :id, ID, required: true

    def resolve(id:)
      Card.find(id).destroy
      {success: true}
    end
  end
end
