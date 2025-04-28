"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import "../styles/Wallet.css"

const Wallet = ({ user }) => {
  const [amount, setAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("credit-card")
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // Mock transaction history
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: "deposit",
      amount: 100,
      date: "2023-05-10",
      status: "completed",
      method: "Credit Card",
    },
    {
      id: 2,
      type: "purchase",
      amount: 49.99,
      date: "2023-05-12",
      status: "completed",
      course: "Advanced JavaScript",
    },
    {
      id: 3,
      type: "deposit",
      amount: 200,
      date: "2023-05-15",
      status: "completed",
      method: "PayPal",
    },
    {
      id: 4,
      type: "purchase",
      amount: 79.99,
      date: "2023-05-18",
      status: "completed",
      course: "UI/UX Design Masterclass",
    },
  ])

  const handleDeposit = (e) => {
    e.preventDefault()

    if (!amount || Number.parseFloat(amount) <= 0) {
      alert("Please enter a valid amount")
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      // Add new transaction
      const newTransaction = {
        id: transactions.length + 1,
        type: "deposit",
        amount: Number.parseFloat(amount),
        date: new Date().toISOString().split("T")[0],
        status: "completed",
        method:
          paymentMethod === "credit-card" ? "Credit Card" : paymentMethod === "paypal" ? "PayPal" : "Bank Transfer",
      }

      setTransactions([newTransaction, ...transactions])
      setAmount("")
      setIsLoading(false)
      setShowSuccess(true)

      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false)
      }, 3000)
    }, 1500)
  }

  return (
    <div className="wallet-container">
      <motion.div
        className="wallet-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>My Wallet</h1>
        <p>Manage your funds and transactions</p>
      </motion.div>

      <div className="wallet-content">
        <div className="wallet-main">
          <motion.div
            className="balance-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="balance-info">
              <h2>Current Balance</h2>
              <div className="balance-amount">${user.wallet.balance.toFixed(2)}</div>
            </div>
            <div className="balance-actions">
              <button className="action-button withdraw">
                <i className="fas fa-arrow-up"></i> Withdraw
              </button>
            </div>
          </motion.div>

          <motion.div
            className="transaction-history"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2>Transaction History</h2>

            {transactions.length > 0 ? (
              <div className="transactions-list">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className={`transaction-item ${transaction.type}`}>
                    <div className="transaction-icon">
                      <i className={`fas ${transaction.type === "deposit" ? "fa-arrow-down" : "fa-shopping-cart"}`}></i>
                    </div>
                    <div className="transaction-details">
                      <div className="transaction-title">
                        {transaction.type === "deposit"
                          ? `Deposit via ${transaction.method}`
                          : `Purchase: ${transaction.course}`}
                      </div>
                      <div className="transaction-date">{transaction.date}</div>
                    </div>
                    <div className="transaction-amount">
                      {transaction.type === "deposit" ? "+" : "-"}${transaction.amount.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-transactions">
                <p>You don't have any transactions yet.</p>
              </div>
            )}
          </motion.div>
        </div>

        <motion.div
          className="wallet-sidebar"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="deposit-card">
            <h2>Add Funds</h2>

            {showSuccess && (
              <div className="success-message">
                <i className="fas fa-check-circle"></i>
                <span>Deposit successful!</span>
              </div>
            )}

            <form onSubmit={handleDeposit} className="deposit-form">
              <div className="form-group">
                <label htmlFor="amount">Amount</label>
                <div className="amount-input">
                  <span className="currency-symbol">$</span>
                  <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    min="1"
                    step="0.01"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Payment Method</label>
                <div className="payment-methods">
                  <div className="payment-method">
                    <input
                      type="radio"
                      id="credit-card"
                      name="payment-method"
                      value="credit-card"
                      checked={paymentMethod === "credit-card"}
                      onChange={() => setPaymentMethod("credit-card")}
                    />
                    <label htmlFor="credit-card">
                      <i className="fas fa-credit-card"></i>
                      <span>Credit Card</span>
                    </label>
                  </div>

                  <div className="payment-method">
                    <input
                      type="radio"
                      id="paypal"
                      name="payment-method"
                      value="paypal"
                      checked={paymentMethod === "paypal"}
                      onChange={() => setPaymentMethod("paypal")}
                    />
                    <label htmlFor="paypal">
                      <i className="fab fa-paypal"></i>
                      <span>PayPal</span>
                    </label>
                  </div>

                  <div className="payment-method">
                    <input
                      type="radio"
                      id="bank-transfer"
                      name="payment-method"
                      value="bank-transfer"
                      checked={paymentMethod === "bank-transfer"}
                      onChange={() => setPaymentMethod("bank-transfer")}
                    />
                    <label htmlFor="bank-transfer">
                      <i className="fas fa-university"></i>
                      <span>Bank Transfer</span>
                    </label>
                  </div>
                </div>
              </div>

              <button type="submit" className="deposit-button" disabled={isLoading}>
                {isLoading ? "Processing..." : "Add Funds"}
              </button>
            </form>

            <div className="secure-payment">
              <i className="fas fa-lock"></i>
              <span>Secure Payment Processing</span>
            </div>
          </div>

          <div className="wallet-info-card">
            <h3>How It Works</h3>
            <ul className="wallet-info-list">
              <li>
                <i className="fas fa-wallet"></i>
                <span>Add funds to your wallet using your preferred payment method</span>
              </li>
              <li>
                <i className="fas fa-shopping-cart"></i>
                <span>Use your wallet balance to purchase courses instantly</span>
              </li>
              <li>
                <i className="fas fa-undo"></i>
                <span>Refunds for course purchases go back to your wallet</span>
              </li>
              <li>
                <i className="fas fa-university"></i>
                <span>Withdraw your balance to your bank account anytime</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Wallet
