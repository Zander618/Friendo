# class ChatChannel < ApplicationCable::Channel
#   def subscribed
#     user = params['username']
#     stream_for 'public_chat'
#     ActionCable.server.broadcast 'public_chat', "#{user} joined!"
#   end

#   # def unsubscribed
#     # Any cleanup needed when channel is unsubscribed
#   # end
# end
