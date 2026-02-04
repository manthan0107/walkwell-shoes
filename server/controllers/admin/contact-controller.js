const Contact = require("../../models/Contact");

const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find({}).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: contacts,
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occured",
        });
    }
};

module.exports = { getAllContacts };
