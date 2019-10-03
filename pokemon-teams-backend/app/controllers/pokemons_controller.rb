class PokemonsController < ApplicationController
    require "faker"

    def index
        @pokemons = Pokemon.all
        render json: @pokemons, except: [:created_at, :updated_at]
    end

    def show
        @pokemon = Pokemon.find(params[:id])
        render json: @pokemon, except: [:created_at, :updated_at]
    end

    def create
        @trainer = Trainer.find(params[:trainer_id]["trainerId"])
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        @pokemon = @trainer.pokemons.create(nickname: name, species: species)

        if @pokemon.valid?
        render json: @pokemon, except: [:created_at, :updated_at]
        else
            render json: @pokemon.errors.full_messages, status: :unprocessable_entity
        end
    end

    def update
        @pokemon = Pokemon.update(pokemon_params)
        render json: @pokemon, except: [:created_at, :updated_at]
    end

    def destroy
        @pokemon = Pokemon.find(params[:id])
        render json: @pokemon, except: [:created_at, :updated_at]
        @pokemon.destroy 
    end

    private

    def pokemon_trainer_param
        params.require(:pokemons).permit(:id, :trainer_id)
    end

    def pokemon_params
        params.require(:pokemons).permit(:trainer_id)
    end

end
