// Assuming you have a MongoDB setup for storing users

const mongoose = require('mongoose');

// Define User Schema
const UserSchema = new mongoose.Schema({
  username: String,
  roomId: String,
  status: String, // 'active' or 'left'
});

const User = mongoose.model('User', UserSchema);

// On user join
socket.on('joinRoom', async ({ username, roomId }) => {
  let user = await User.findOne({ username, roomId });
  
  if (!user) {
    user = new User({ username, roomId, status: 'active' });
  } else {
    user.status = 'active';
  }
  
  await user.save();
});

// On user leave
socket.on('leaveRoom', async ({ username, roomId }) => {
  let user = await User.findOne({ username, roomId });
  
  if (user) {
    user.status = 'left';
    await user.save();
  }
});

// Trigger notifications to users who left
const notifyUsersToRejoin = async (roomId) => {
  const users = await User.find({ roomId, status: 'left' });
  
  users.forEach(user => {
    // Send notification to user
    sendNotification(user.username, `Please rejoin the room ${roomId}`);
  });
};
