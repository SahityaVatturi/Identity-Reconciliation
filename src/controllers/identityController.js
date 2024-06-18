const { Contact } = require("../models/contact");
const createOrUpdateIdentity = async (req, res) => {
  try {
    const { phoneNumber, email } = req.body;
    // Find all contacts matching either email or phoneNumber
    const contacts = await Contact.find({ $or: [{ email }, { phoneNumber }] }).sort({ createdAt: 1 });
    if (contacts.length === 0) {
      // Case: No existing contacts, create a new primary contact
      const primaryContact = new Contact({
        phoneNumber,
        email,
        linkedId: null,
        linkPrecedence: "primary",
      });
      const savedPrimaryContact = await primaryContact.save();
      return res.status(200).json({
        contact: {
          primaryContatctId: savedPrimaryContact._id,
          emails: [savedPrimaryContact.email],
          phoneNumbers: [savedPrimaryContact.phoneNumber],
          secondaryContactIds: [],
        },
      });
    }

    // Case 2 & 3: Handle existing contacts
    let primaryContactId = null;
    const secondaryContactIds = [];

    // Determine primary contact (oldest created one)
    const sortedContacts = contacts.sort((a, b) => a.createdAt - b.createdAt);
    primaryContactId = sortedContacts[0]._id;

    // Consolidate emails and phoneNumbers
    const emails = Array.from(new Set(sortedContacts.map((contact) => contact.email)));
    const phoneNumbers = Array.from(new Set(sortedContacts.map((contact) => contact.phoneNumber)));

    // Create new secondary contact if necessary
    const existingPrimary = sortedContacts.find((contact) => contact._id.equals(primaryContactId));
    if (existingPrimary.email !== email || existingPrimary.phoneNumber !== phoneNumber) {
      const newSecondaryContact = new Contact({
        phoneNumber,
        email,
        linkedId: primaryContactId,
        linkPrecedence: "secondary",
      });
      const savedSecondaryContact = await newSecondaryContact.save();
      secondaryContactIds.push(savedSecondaryContact._id);
    }

    return res.status(200).json({
      contact: {
        primaryContatctId: primaryContactId,
        emails: emails,
        phoneNumbers: phoneNumbers,
        secondaryContactIds: secondaryContactIds,
      },
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
