# frozen_string_literal: true

module Mutations
  class ReorderCards < BaseMutation
    field :success, Boolean, null: false

    argument :list_id, ID, required: true
    argument :card_ids, [ID], required: true

    def resolve(list_id:, card_ids:)
      list = List.find(list_id)
      list.reorder_cards!(card_ids)
      {success: true}
    end
  end
end
