class NotesController < ApplicationController
  before_action :authorize
  wrap_parameters format: []
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response

  def index
    book = get_book
    render json: book.notes
  end

  def show
    book = get_book
    render json: book.notes.find(params[:id])
  end

  def create
    book = get_book
    render json: book.notes.create(note_params)
  end

  def update
    book = get_book
    note = book.notes.find(params[:id])
    note.update(note_params)
    render json: note
  end

  def destroy
    note = Note.find(params[:note_id])
    note.destroy
    head :no_content
  end

  private

  def get_book
    user = User.find(session[:user_id])
    book = user.books.find(params[:book_id])
    return book
  end

  def note_params
    params.permit(:subject, :content)
  end
end
