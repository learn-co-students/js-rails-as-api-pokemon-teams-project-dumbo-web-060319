class Pokemon < ApplicationRecord
  belongs_to :trainer
  validates_presence_of :nickname, :species, :trainer_id
end
