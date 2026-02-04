const Contact = require("../../models/Contact");

const addContact = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        const newContact = new Contact({
            name,
            email,
            message,
        });

        await newContact.save();

        res.status(201).json({
            success: true,
            message: "Message sent successfully",
            data: newContact,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occured",
        });
    }
};

module.exports = { addContact };
