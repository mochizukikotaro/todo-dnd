class TodoController < ApplicationController
  def index
    @todos = Todo.all
    binding.pry
    respond_to do |format|
      format.html
      format.json { render json: @todos }
    end
  end
end
