const { User, Thought } = require("../models");

const thoughtController = {
    //get all thoughts
    getThoughts(req, res){
        Thought.find({}).populate({
            path: 'reactions'
        })
    }
}