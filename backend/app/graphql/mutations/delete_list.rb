# frozen_string_literal: true

module Mutations
  class DeleteList < BaseMutation
    field :success, Boolean, null: false

    argument :id, ID, required: true

    def resolve(id:)
      List.find(id).destroy
      {success: true}
    end
  end
end
