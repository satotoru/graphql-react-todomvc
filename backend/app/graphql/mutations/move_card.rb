# frozen_string_literal: true

module Mutations
  class MoveCard < BaseMutation
    field :success, Boolean, null: false

    argument :list_id, ID, required: true
    argument :card_id_from, ID, required: true
    argument :card_id_to, ID, required: true

    def resolve(list_id:, card_id_from:, card_id_to:)
      list = List.find(list_id)
      card_from = list.cards.find(card_id_from)
      card_to = list.cards.find(card_id_to)
      list.move_card!(card_from, card_to)
      {success: true}
    end
  end
end
