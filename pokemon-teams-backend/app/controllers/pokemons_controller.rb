class PokemonsController < ApplicationController
  def index
    render json: Pokemon.all, except: [:created_at, :updated_at]
  end

  def destroy
    Pokemon.find(params[:id]).destroy
  end

  def create
    Pokemon.create(pokemon_params)
  end

  private

  def pokemon_params
    params.require(:pokemon).permit(
      :nickname,
      :species,
      :trainer_id
    )
  end

end
