const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        token: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Token", TokenSchema);
