const express = require('express');
const router = express.Router();
const { getTickets, createTicket, getTicket, deleteTicket, updateTicket } = require("../controllers/ticketControler");


router.get("/get", getTickets);
router.post("/post", createTicket);
router.get("/get/:id", getTicket);
router.delete("/delete/:id", deleteTicket);
router.put("/update/:id", updateTicket);

module.exports = router;