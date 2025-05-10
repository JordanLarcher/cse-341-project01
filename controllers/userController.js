const User = require('../models/User');

exports.getAllUsers = async (req, res, next) => {
    try{
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
};

exports.getUserById = async  (req, res, next) => {
    try{
        const user = await User.findById(req.params.id);
        if(!user) return res.status(404).json({message: 'User not found'})
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }
};

exports.createUser = async (req, res, next) =>{
    try {
        const {email, username, name, ip} = req.body;
        const newUser = new User({email, username, name, ip});
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        next(err);
    }
}

exports.updateUser = async (req, res, next) =>{
    try{
        const {email, username, name, ip} = req.body;
        const updated = await User.replaceOne({_id: req.params.id}, {email, username, name, ip});
        if(updated.modifiedCount > 0) res.status(204).send();
        else res.status(404).json({message: 'User not found or not updated'})
    } catch (err) {
        next(err);
    }
}

exports.deleteUser = async  (req, res, next) => {
    try {
        const result = await User.deleteOne({_id: req.params.id});
        if(result.deletedCount > 0) res.status(204).send();
        else res.status(404).json({message: 'User not found'});
    } catch (err) {
        next(err)
    }
}
