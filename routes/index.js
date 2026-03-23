const express=require('express');
const router=express.Router();
const userController=require('../controllers/userController');

//Route to get all users
router.get('/users',userController.getAllUsers);
router.get('/users/:id',userController.getUserById);
router.post('/users',userController.createUser);
router.put('/users',userController.updateUser);
router.delete('/users',userController.deleteUser);
module.exports=router;
