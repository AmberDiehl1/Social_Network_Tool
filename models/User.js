const { Schema, model } = require('mongoose');


// Schema to create Student model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trimmed: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/,'not an email address']
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId, 
        ref: 'Thought'
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId, 
        ref: 'User'
      }
    ],
   
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;
