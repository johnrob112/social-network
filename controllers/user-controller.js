const { User, Thought } = require("../models");

const userController = {
  //get all users
  getUsers(req, res) {
    User.find({})
      .select("-__v")
      .sort({ _id: -1 })
      .then((userDatab) => res.json(userDatab))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  //get a single user
  getSingleUser({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .populate({
        path: "friends",
        select: "-__v",
      })
      .then((userDatab) => {
        if (!userDatab) {
          res.status(404).json({ message: "No user found" });
          return;
        }
        res.json(userDatab);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  //update users
  updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.id },  
    {
    $set: req.body
    },
    {
      new: true,
      runValidators: true,
    })
      .then((userDatab) => {
        if (!userDatab) {
          res.status(404).json({ message: "No user found" });
          return;
        }
        res.json(userDatab);
      })
      .catch((err) => res.json(err));
  },

  //create user
  createUsers({ body }, res) {
    User.create(body)
      .then((userDatab) => res.json(userDatab))
      .catch((err) => res.json(err));
  },

  //delete user
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((userDatab) => {
        if (!userDatab) {
          res.status(404).json({ message: "No user found" });
          return;
        }
        res.json(userDatab);
      })
      .catch((err) => res.json(err));
  },

  //add friend 
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $addToSet: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then((userDatab) => {
        if (!userDatab) {
          res.status(404).json({ message: "No user found" });
          return;
        }
        res.json(userDatab);
      })
      .catch((err) => res.json(err));
  },

  //delete friend 
  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((userDatab) => {
        if (!userDatab) {
          return res.status(404).json({ message: "There's no user with this id" });
        }
        res.json(userDatab);
      })
      .catch((err) => res.json(err));
  }

};

module.exports = userController;