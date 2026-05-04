//random code change to trigger the agent/execution
const express = require("express");
const app = express();

app.use(express.json());

// Health check
app.get("/health", (req, res) => res.send("OK"));

// Payment processing endpoint
app.post("/payment", (req, res) => {
    const { amount, currency, customerId } = req.body;

    // Validation
    if (!amount || !currency || !customerId) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    if (typeof amount !== "number" || amount <= 0) {
        return res.status(400).json({ error: "Invalid amount" });
    }

    if (amount > 999999) {
        return res.status(400).json({ error: "Amount exceeds maximum limit" });
    }

    const validCurrencies = ["USD", "EUR", "GBP"];
    if (!validCurrencies.includes(currency)) {
        return res.status(400).json({ error: "Unsupported currency" });
    }

    if (typeof customerId !== "string" || customerId.trim().length === 0) {
        return res.status(400).json({ error: "Invalid customer ID" });
    }

    // Process payment
    try {
        const transactionId = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        res.status(200).json({
            success: true,
            transactionId,
            amount,
            currency,
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        res.status(500).json({ error: "Payment processing failed" });
    }
});

// Start server
app.listen(3000, "0.0.0.0", () => console.log("Payment service running on port 3000"));
module.exports = app;