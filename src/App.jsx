import React, { useState } from "react";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import daruma from "./image/daruma.png";
import "./App.css";

const bills = [
  { name: "$100", value: 100 },
  { name: "$50", value: 50 },
  { name: "$20", value: 20 },
  { name: "$10", value: 10 },
  { name: "$5", value: 5 },
  { name: "$2", value: 2 },
  { name: "$1", value: 1 },
];

const coins = [
  { name: "¢25", value: 0.25 },
  { name: "¢10", value: 0.1 },
  { name: "¢5", value: 0.05 },
];

function App() {
  const [billsInput, setBillsInput] = useState({});
  const [coinsInput, setCoinsInput] = useState({});
  const [total, setTotal] = useState(0);

  const handleBillsInputChange = (event) => {
    const { name, value } = event.target;
    setBillsInput({ ...billsInput, [name]: parseInt(value) || 0 });
  };

  const handleCoinsInputChange = (event) => {
    const { name, value } = event.target;
    setCoinsInput({ ...coinsInput, [name]: parseInt(value) || 0 });
  };

  const handleCalculateClick = () => {
    let totalBills = 0;
    let totalCoins = 0;
    for (let bill of bills) {
      const quantity = billsInput[bill.value] || 0;
      totalBills += bill.value * quantity;
    }
    for (let coin of coins) {
      const quantity = coinsInput[coin.value] || 0;
      totalCoins += coin.value * quantity;
    }
    const totalAmount = totalBills + totalCoins;
    setTotal(totalAmount.toFixed(2));
  };

  const handleResetClick = () => {
    setBillsInput({});
    setCoinsInput({});
    setTotal(0);
  };

  return (
    <div className="calc-sysyem">
      <div className="img-container">
        {/* <RiMoneyDollarCircleFill className="icon" /> */}
        <img className="icon" src={daruma} alt="daruma" />
      </div>
      <h1>Money Calculator</h1>
      <main>
        <form>
          <div>
            <h2>Bills & Coins</h2>
            {bills.map((bill) => (
              <div className="input-area" key={bill.value}>
                <label htmlFor={bill.name}>{bill.name} </label>
                <input
                  type="number"
                  id={bill.name}
                  name={bill.value}
                  value={billsInput[bill.value] || ""}
                  onChange={handleBillsInputChange}
                />
              </div>
            ))}
          </div>
          <div>
            {coins.map((coin) => (
              <div className="input-area" key={coin.value}>
                <label htmlFor={coin.name}>{coin.name} </label>
                <input
                  type="number"
                  id={coin.name}
                  name={coin.value}
                  step={coin.value}
                  min="0"
                  value={coinsInput[coin.value] || ""}
                  onChange={handleCoinsInputChange}
                />
              </div>
            ))}
          </div>
        </form>
        <div>
          <h2>Total</h2>
          {bills.map((bill) => (
            <p className="denominations-total" key={bill.value}>
              ${(billsInput[bill.value] || 0) * bill.value}
            </p>
          ))}
          {coins.map((coin) => (
            <p className="denominations-total" key={coin.value}>
              ${((coinsInput[coin.value] || 0) * coin.value).toFixed(2)}
            </p>
          ))}
        </div>
      </main>
      <p className="total-amount">
        <span>Grand Total</span> ${total}
      </p>

      <button className="btn-calc" onClick={handleCalculateClick}>
        Calculate
      </button>
      <button className="btn-clear" onClick={handleResetClick}>
        Clear
      </button>

      <p className="copyright">&copy; 2023 Manami Batai</p>
    </div>
  );
}

export default App;
