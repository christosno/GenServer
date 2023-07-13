const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema(
    {
        ticketId: {
            type: String,
        },
        product: {
            type: String,
            required: [true, "Please select a product"],
            enum: ["iPhone", "MacBookPro", "iMac", "iPad"]
        },
        description: {
            type: String,
            required: [true, "Please enter a discription of the issue"],
        },
        status: {
            type: String,
            enum: ["new", "open", "closed"],
            default: "new"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Ticket", ticketSchema, "tickets");