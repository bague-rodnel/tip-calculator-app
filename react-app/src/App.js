import { useState } from "react";
import { BsCurrencyDollar, BsFillPersonFill } from "react-icons/bs";
import Button from "./components/Button";
import Input from "./components/Input";
import "./sass/styles.scss";

const App = () => {
  const [bill, setBill] = useState(0);
  const [rate, setRate] = useState(0);
  const [customRate, setCustomRate] = useState("");
  const [pax, setPax] = useState(1);
  const [btnDisabled, setBtnDisabled] = useState(true);

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  const handleFormClick = (e) => {
    e.target.select && e.target.select();
  };

  const handleFormKeyDown = (e) => {
    if (e.keyCode === 8 || e.keyCode === 46 || !isNaN(Number(e.key))) {
      return;
    }

    e.preventDefault();
  };

  const handleFormChange = (e) => {
    setBtnDisabled(false);

    if (e.target.getAttribute("id") === "bill") {
      setBill(Math.abs(e.target.value / 1.0));
    }

    if (e.target.classList.contains("fixed-tip")) {
      const textRate = e.target.innerText.split("%")[0];
      setRate(textRate / 100);
      setCustomRate("");
    }

    if (e.target.getAttribute("id") === "tip_custom") {
      const absVal = Math.abs(e.target.value);
      setRate(absVal / 100);
      setCustomRate(absVal);
    }

    if (e.target.getAttribute("id") === "pax") {
      setPax(Math.abs(e.target.value));
    }
  };

  const handleReset = (e) => {
    setBill(0);
    setRate(0);
    setCustomRate("");
    setPax(1);
    setBtnDisabled(true);
  };

  let tipPerPax = "";
  let totalPerPax = "";

  if (0 === pax) {
    tipPerPax = "--";
    totalPerPax = "--";
  } else {
    tipPerPax = ((bill * rate) / pax).toFixed(2);
    totalPerPax = ((bill * (1.0 + rate)) / pax).toFixed(2);
  }

  return (
    <>
      <h1>
        SPLI
        <br />
        TTER
      </h1>

      <div className="app">
        <form
          id="app_form"
          onSubmit={handleFormSubmit}
          onChange={handleFormChange}
          onClick={handleFormClick}
          onKeyDown={handleFormKeyDown}
        >
          <div className="input-areas">
            <div className="bill-area area">
              <label htmlFor="bill">Bill</label>
              <Input
                id="bill"
                placeholder="0"
                icon={BsCurrencyDollar}
                value={bill}
                onChange={handleFormChange}
              />
            </div>

            <div className="tip-area area">
              <label>Select Tip %</label>
              <div className="tips-grid">
                <Button
                  className="fixed-tip"
                  isLit={!customRate && rate === 0.05}
                  text="5%"
                  onClick={handleFormChange}
                />
                <Button
                  className="fixed-tip"
                  isLit={!customRate && rate === 0.1}
                  text="10%"
                  onClick={handleFormChange}
                />
                <Button
                  className="fixed-tip"
                  isLit={!customRate && rate === 0.15}
                  text="15%"
                  onClick={handleFormChange}
                />
                <Button
                  className="fixed-tip"
                  isLit={!customRate && rate === 0.25}
                  text="25%"
                  onClick={handleFormChange}
                />
                <Button
                  className="fixed-tip"
                  isLit={!customRate && rate === 0.5}
                  text="50%"
                  onClick={handleFormChange}
                />
                <Input
                  id="tip_custom"
                  className={customRate !== "" && customRate >= 0 && "in-use"}
                  placeholder="Custom"
                  value={customRate}
                  onChange={handleFormChange}
                />
              </div>
            </div>

            <div className="pax-area area">
              <div className="input-header">
                <label htmlFor="pax">Number of People</label>
                <span id="pax-error">{0 === pax && "Can't be zero"}</span>
              </div>
              <Input
                id="pax"
                icon={BsFillPersonFill}
                placeholder="1"
                value={pax}
                onChange={handleFormChange}
                isInvalid={0 === pax}
              />
            </div>
          </div>

          <div className="totals-area area">
            <dl>
              <dt className="totals-label">
                Tip Amount
                <em>/ person</em>
              </dt>
              <dd id="tip_per_pax" data-value={`$${tipPerPax}`}>
                ${tipPerPax}
              </dd>
              <dt className="totals-label">
                Total
                <em>/ person</em>
              </dt>
              <dd id="total_per_pax" data-value={`$${totalPerPax}`}>
                ${totalPerPax}
              </dd>
            </dl>

            <Button
              id="btnReset"
              className="btn-reset"
              text="Reset"
              onClick={handleReset}
              isDisabled={btnDisabled}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default App;
