class List < ApplicationRecord
  has_many :cards, dependent: :destroy
  has_many :list_card_orders, dependent: :destroy

  validates :name, presence: true

  def reorder_cards!(card_ids)
    ApplicationRecord.transaction do
      list_card_orders.delete_all
      card_ids.each_with_index do |card_id, i|
        list_card_orders.create!(card_id: card_id, value: i + 1)
      end
    end
  end
end
