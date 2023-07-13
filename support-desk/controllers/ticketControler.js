const asyncHandler = require('express-async-handler');

const Ticket = require("../models/ticketModel");

const getTickets = asyncHandler(async (req, res) => {

    const tickets = await Ticket.find({});

    if (tickets) {
        res.json(tickets);
    } else {
        res.status(400);
        throw new Error("Couldn't retrive any ticket");
    }
});


const getTicket = asyncHandler(async (req, res) => {

    const ticket = await Ticket.findOne({ ticketId: req.params.id });

    if (ticket) {
        res.json(ticket);
    } else {
        res.status(400);
        throw new Error("Couldn't retrive the ticket");
    }
});


const createTicket = asyncHandler(async (req, res) => {

    const { product, description } = req.body;

    const tickets = await Ticket.find({});
    let ticketId = 0;

    tickets.forEach(ticket => {
        if (parseInt(ticket.ticketId) > parseInt(ticketId)) {
            ticketId = parseInt(ticket.ticketId) + 1;
        }
    });

    if (!product || !description) {
        res.status(400);
        throw new Error("please add a product and descriptiom");
    }

    const ticket = await Ticket.create({
        ticketId: ticketId + 1,
        product,
        description,
        status: "new"
    });

    res.status(201).json(ticket);
});


const deleteTicket = asyncHandler(async (req, res) => {

    const ticket = await Ticket.findOne({ ticketId: req.params.id });

    if (!ticket) {
        res.status(400);
        throw new Error("Couldn't retrive the ticket");
    }

    // await ticket.remove();
    await Ticket.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true });
});

const updateTicket = asyncHandler(async (req, res) => {

    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
        res.status(400);
        throw new Error("Couldn't retrive the ticket");
    }

    const updatedTicke = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });

    res.status(200).json(updatedTicke);
});


module.exports = {
    getTickets,
    getTicket,
    createTicket,
    updateTicket,
    deleteTicket
};