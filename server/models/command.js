const mongoose = require("mongoose");

const commandSchema = new mongoose.Schema({
  creationDate: {
    type: Date,
    default: Date.now(),
  },

  sendingDate: {
    type: Date,
  },

  // [draft,validate,en cours,done]
  status: {
    type: String,
    default: "draft",
  },
  total: {
    type: Number,
  },
  //tableau kol case feha id de produit +quantité commandé
  products: [
    {
      produit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },

      quantity: { type: Number },
    },
  ],
});

const Command = mongoose.model("Command", commandSchema);

module.exports = Command;
