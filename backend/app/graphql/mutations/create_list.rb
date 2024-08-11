# frozen_string_literal: true

module Mutations
  class CreateList < BaseMutation
    field :success, Boolean, null: false

    argument :name, String, required: true

    def resolve(name:)
      List.create!(name: name)
      {success: true}
    end
  end
end
