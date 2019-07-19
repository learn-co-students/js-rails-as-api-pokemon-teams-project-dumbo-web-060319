class TrainersController < ApplicationController
  def index
    render json: Trainer.all, except: [:created_at, :updated_at]
  end
end
