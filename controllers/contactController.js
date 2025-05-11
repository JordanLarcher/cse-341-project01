const Contact = require('../models/Contact');

exports.getAllContacts = async (req, res, next) => {
    try{
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (err) {
        next(err);
    }
};

exports.getContactById = async  (req, res, next) => {
    try{
        const contact = await Contact.findById(req.params.id);
        if(!contact) return res.status(404).json({message: 'Contact not found'})
        res.status(200).json(contact);
    } catch (err) {
        next(err);
    }
};

exports.createContact = async (req, res, next) =>{
    try {
        const {firstName, lastName, email, favoriteColor} = req.body;
        const newContact = new Contact({firstName, lastName, email, favoriteColor});
        const savedContact = await newContact.save();
        res.status(201).json(savedContact);
    } catch (err) {
        next(err);
    }
}

exports.updateContact = async (req, res, next) =>{
    try{
        const {firstName, lastName, email, favoriteColor} = req.body;
        const updated = await Contact.replaceOne({_id: req.params.id}, {firstName, lastName, email, favoriteColor});
        if(updated.modifiedCount > 0) res.status(204).send();
        else res.status(404).json({message: 'Contact not found or not updated'})
    } catch (err) {
        next(err);
    }
}

exports.deleteContact = async  (req, res, next) => {
    try {
        const result = await Contact.deleteOne({_id: req.params.id});
        if(result.deletedCount > 0) res.status(204).send();
        else res.status(404).json({message: 'Contact not found'});
    } catch (err) {
        next(err)
    }
}
