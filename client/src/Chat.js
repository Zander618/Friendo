// import React from 'react';
// import consumer from './cable.js';
// export default class ChatBox extends React.Component {

//   state = {
//     content: 'Hi!',
//     username: 'cool_kid_20'
//   }
//   handleSubmit = () => {
//     fetch('http://localhost:3000/messages', {
//       method: 'POST',
//       body: JSON.stringify(this.state)
//     })
//   }

//   componentDidMount() {
//     consumer.subscriptions.create({
//       channel: 'ChatChannel',
//       username: 'cool_kid_20',
//     }, {
//       connected: () => console.log('connected'),
//       disconnected: () => console.log('disconnected'),
//       received: data => console.log(data),
//     })
//   };
//   componentWillUnmount() {
//     consumer.disconnect()
//   };
// };