class TrainersController < ApplicationController
    require 'faker'
    

    def index
        @trainers = Trainer.all
        render json: @trainers, include: :pokemons, only: [:name, :id]
    end

    def show
        @trainer = Trainer.find(params[:id])
        render json: @trainer, include: :pokemons, only: [:name, :id]
    end

end
