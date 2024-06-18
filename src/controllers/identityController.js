const { Contact } = require("../models/contact");
const createOrUpdateIdentity = async (req, res) => {
  try {
    const { id, phoneNumber, email, linkedIn, linkPrecedence } = req.body;
    const newContact = new Contact({
      id,
      phoneNumber,
      email,
      linkedIn,
      linkPrecedence,
    });
    const savedContact = await newContact.save();
    res.status(200).json({
      success: true,
      message: "Contact created/updated successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  createOrUpdateIdentity,
};
