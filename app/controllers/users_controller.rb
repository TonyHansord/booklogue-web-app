class UsersController < ApplicationController
  skip_before_action :authorize, only: :create
  wrap_parameters format: []

  def show
    if session[:user_id]
      user = User.find(session[:user_id])
      render json: user, include: :books, status: :created
    else
      render json: { errors: ["Not authorized"] }, status: :unauthorized
    end
  end

  def create
    user = User.create(user_params)

    if user.valid?
      session[:user_id] = user.id
      render json: user, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    user = User.find(session[:user_id])
    session.delete :user_id
    user.destroy
    render json: { message: "Account successfully deleted" }
  end

  private

  def user_params
    params.permit(:name, :email, :password, :password_confirmation, :bio)
  end
end
