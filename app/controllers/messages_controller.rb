class MessagesController < ApplicationController
  def create
    user = User.find_by(params['username'])
    message = Message.create(
      content: params['content'],
      user_id: user.id
    )
    if message.valid?   
      ActionCable.server.broadcast 'public_chat', message.content
    end
    render json: message
  end
  
end
