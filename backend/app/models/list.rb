class List < ApplicationRecord
  has_many :cards, dependent: :destroy
  has_many :list_card_orders, dependent: :destroy

  validates :name, presence: true

  def ordered_cards
    cards.joins(:list_card_order).order("list_card_orders.value ASC")
  end

  def move_card!(card_from, card_to)
    new_cards = ordered_cards.to_a
    from_index = new_cards.index { |card| card.id == card_from.id }
    to_index = new_cards.index { |card| card.id == card_to.id }

    item = new_cards.delete_at(from_index)
    new_cards.insert(to_index, item)
    reorder_cards!(new_cards.map(&:id))
  end

  def reorder_cards!(card_ids)
    ApplicationRecord.transaction do
      list_card_orders.delete_all
      card_ids.each_with_index do |card_id, i|
        list_card_orders.create!(card_id: card_id, value: i + 1)
      end
    end
  end
end
