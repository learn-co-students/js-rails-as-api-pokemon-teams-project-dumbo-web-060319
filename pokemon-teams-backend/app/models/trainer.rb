class Trainer < ApplicationRecord
  has_many :pokemons
  attribute :pokemons

  def pokemons=
    self.pokemons
  end
end
