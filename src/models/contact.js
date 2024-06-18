const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /\d{10}/.test(v); // Validates phoneNumber format
      },
      message: (props) => `${props.value} is not a valid 10-digit phone number!`,
    },
  },
  email: {
    type: String,
    required: true,
    // unique: true,
    validate: {
      validator: function (v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v); // Validates email format
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  linkedId: {
    type: String,
    required: false,
  },
  linkPrecedence: {
    type: String,
    required: false,
  },
});

const Contact = mongoose.model("contacts", ContactSchema);

module.exports = { Contact };
