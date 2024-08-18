class CreateListCardOrders < ActiveRecord::Migration[7.1]
  def change
    create_table :list_card_orders do |t|
      t.references :list, null: false, foreign_key: true
      t.references :card, null: false, foreign_key: true
      t.integer :value, null: false

      t.timestamps
      t.index %i[list_id card_id value], unique: true
    end
  end
end
