const router = require('express').Router();

const {getUsers, getSingleUser, createUsers, deleteUser, updateUser} = require('../../controllers/user-controller');

const {addFriend, deleteFriend} = require('../../controllers/user-controller')

//user & friend routes
router.route("/").get(getUsers).post(createUsers)
router.route("/:id").get(getSingleUser).put(updateUser).delete(deleteUser)//do the same for add and remove friend

router.route('/:UserId/friends/:friendId').post(addFriend).delete(deleteFriend)

module.exports = router;