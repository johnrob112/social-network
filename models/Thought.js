const { Schema, model, Types } = require("mongoose");
const moment = require('moment');

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
        default: Date.now,
        //Get format to timestamp
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