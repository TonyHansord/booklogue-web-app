class AuthorsController < ApplicationController
  before_action :authorize, only: [:create]

  def index
    authors = Author.all
    render json: authors
  end

  def create
    author = Author.find_by(first_name: params[:first_name], last_name: params[:last_name])
    if author
      render json: author
    else
      new_author = Author.create(author_params)
      render json: new_author
    end
  end

  private

  def author_params
    params.permit(:first_name, :last_name)
  end
end
