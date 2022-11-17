//require dependencies
const { Schema, model, Types } = require("mongoose");
const moment = require('moment');

//reaction schema
const ReactionSchema = new Schema ({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },

    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },

    username: {
        type: String,
        required: true
    },

    createdAt:{
        type: Date,
        //default value is set to the current timestamp
        default: Date.now,
        //Getter to format the timestamp
        get: createdAtInfo => moment(createdAtInfo).format('MMM DD, YYYY [at] hh:mm a')
    }
},
    { 
        toJSON: {
            virtuals:true,
            getters:true
        },
        id: false
    }
);

//thought schema
const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },

    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtInfo) =>
        moment(createdAtInfo).format("MMM DD, YYYY [at] hh:mm a"),
    },

    username: {
      type: String,
      required: true,
    },
    reactions: [ReactionSchema],
  },

  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);
//thoughts reactions array field
ThoughtSchema.virtual('reactionCount').get(function (){
    return this.reactions.length
})

//creating the thought model based on the thought schema
const Thought = model('Thought', ThoughtSchema)


module.exports = Thought;