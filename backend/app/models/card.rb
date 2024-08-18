class Card < ApplicationRecord
  before_save :set_default_order
  after_destroy :reorder_cards

  belongs_to :list
  has_one :list_card_order, dependent: :destroy

  validates :name, presence: true

  scope :ordered, -> { joins(:list_card_order).order("list_card_orders.value ASC") }

  private

  def set_default_order
    return if list_card_order.present?

    build_list_card_order(
      list:,
      value: list.cards.joins(:list_card_order).maximum("list_card_orders.value") + 1
    )
  end

  def reorder_cards
    list.reorder_cards!(list.cards.ordered.pluck(:id))
  end
end
