class TodosController < ApplicationController
  protect_from_forgery except: %i[create]

  def index
    @todos = Todo.all
    respond_to do |format|
      format.html
      format.json { render json: @todos }
    end
  end

  def create
    @todo = Todo.create(todo_params)
    render json: @todo
  end

  def destroy
    # TODO: When given unexpected params...
    todo = Todo.find(params[:id])
    if todo.destroy
      render json: todo
    end
  end

  private

  def todo_params
    params.require(:todo).permit(
      :name, :created_at
    )
  end
end
