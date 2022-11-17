
const { Schema, model, Types } = require("mongoose");
const moment = require("moment");
const { get } = require("request");

//user schema
const UserSchema = new Schema (
    { 
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },


email: {
    type: String,
    requied: true,
    unique: true,
    //email regex
    match: [/.+@.+\..+/],
  },
  //Array of _id values referencing the Thought model
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Thought",
    },
  ],
  //Array of _id values referencing the User model
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
},
{
  toJSON: {
    virtuals: true,
  },
  id: false,
}
);

//length of the user's friends array
UserSchema.virtual('friendCount').get(function() {
  return this.friends.length   
})

//create the user model
const User = model('User', UserSchema)

//export User module
module.exports = User;
