import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Form, Button } from "react-bootstrap";
import "./ZakahCalc.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

function ZakahCalc({ goldData, currencyData, silverData }) {
  const [oneYear, setOneYear] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [zakahAmount, setZakahAmount] = useState("");
  const [isAmountValid, setIsAmountValid] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("usd");
  const [standard, setStandard] = useState("");
  const [showStandardOptions, setShowStandardOptions] = useState(false);

  useEffect(() => {
    if (!oneYear) {
      setShowStandardOptions(false);
      setStandard("");
    }
  }, [oneYear]);

  const handleOneYearChange = (e) => {
    const value = e.target.value === "yes";
    setOneYear(value);
  };

  const handleStandardChange = (e) => {
    setStandard(e.target.value);
    setShowStandardOptions(e.target.value !== "");
  };

  const handleClose = () => {
    setShowModal(false);
    setZakahAmount("");
    setIsAmountValid(false);
  };

  const formatNumber = (value) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/,/g, "");
    if (!isNaN(value) && value.trim() !== "") {
      setZakahAmount(formatNumber(value));
      setIsAmountValid(true);
    } else {
      setZakahAmount(value);
      setIsAmountValid(false);
    }
  };

  const handleCalculate = () => {
    if (isAmountValid) {
      setShowModal(true);
    } else {
      alert("Enter a valid amount");
      setZakahAmount("");
    }
  };

  const handleKeyDown = (e) => {
    const invalidChars = ["-", "+", "e", "."];
    if (invalidChars.includes(e.key)) {
      e.preventDefault();
    }
    if (e.key === "Enter") {
      handleCalculate();
    }
  };

  const goldNisab = () => {
    const pricePerGram = parseFloat(goldData.price_per_gram);
    const currencyRate = parseFloat(
      currencyData[selectedCurrency.toUpperCase()]
    );

    if (!currencyRate || currencyRate <= 0) {
      console.error("Invalid currency rate:", currencyRate);
      return null; // Return null for invalid rates
    }

    const nisabValue = pricePerGram * currencyRate * 85;
    return nisabValue >= 0.01 ? nisabValue.toFixed(2) : "0.01"; // Minimum display value
  };

  const silverNisab = () => {
    const pricePerGram = parseFloat(silverData.silver_per_gram);
    const currencyRate = parseFloat(
      currencyData[selectedCurrency.toUpperCase()]
    );

    if (!currencyRate || currencyRate <= 0) {
      console.error("Invalid currency rate:", currencyRate);
      return null; // Return null for invalid rates
    }

    const nisabValue = pricePerGram * currencyRate * 595;
    return nisabValue >= 0.01 ? nisabValue.toFixed(2) : "0.01"; // Minimum display value
  };

  const handleCurrencyChange = (e) => setSelectedCurrency(e.target.value);

  const nisab =
    standard === "gold"
      ? goldNisab()
      : standard === "silver"
      ? silverNisab()
      : 0;

  return (
    <div className="zakah-calc-section" id="calculate">
      <div className="zakah-calc-bg"></div>
      <div className="zakah-calc-wrapper">
        <div className="zakah-calc-container">
          <h1>Calculate</h1>

          <Form.Group>
            <Form.Label>
              Has your money been held for one full{" "}
              <a
                href="https://www.islamweb.net/en/fatwa/304246/about-the-hijri-and-solar-calendars"
                target="_blank"
                className="style-link"
              >
                lunar
                <FontAwesomeIcon
                  icon={faExternalLinkAlt}
                  className="external-link-icon"
                />
              </a>{" "}
              year?
            </Form.Label>
            <Form.Control
              as="select"
              onChange={handleOneYearChange}
              value={oneYear ? "yes" : "no"}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </Form.Control>
          </Form.Group>

          <div className={`additional-fields ${oneYear ? "show" : ""}`}>
            <div className={`additional-fields ${oneYear ? "show" : ""}`}>
              {oneYear && (
                <>
                  {/* Currency Dropdown */}
                  <Form.Group>
                    <Form.Label>Choose the currency</Form.Label>
                    <Form.Control
                      as="select"
                      value={selectedCurrency}
                      onChange={handleCurrencyChange}
                    >
                      {Object.keys(currencyData).map((currencyCode) => (
                        <option
                          key={currencyCode}
                          value={currencyCode.toLowerCase()}
                        >
                          {currencyCode.toUpperCase()}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  {/* Standard Dropdown */}
                  <Form.Group>
                    <Form.Label>Select the Standard</Form.Label>
                    <Form.Control
                      as="select"
                      onChange={handleStandardChange}
                      value={standard}
                    >
                      <option value="">Select...</option>
                      <option value="gold">Gold Standard</option>
                      <option value="silver">Silver Standard</option>
                    </Form.Control>
                  </Form.Group>

                  {/* Amount Input */}
                  {showStandardOptions && (
                    <>
                      <Form.Group>
                        <Form.Label>
                          Input the total amount of your net assets
                        </Form.Label>
                        <Form.Control
                          type="text"
                          onChange={handleAmountChange}
                          required
                          className="number-input"
                          onKeyDown={handleKeyDown}
                          value={zakahAmount}
                        />
                      </Form.Group>
                      <Button
                        variant="dark"
                        onClick={handleCalculate}
                        className="calc-submit"
                      >
                        Calculate
                      </Button>
                    </>
                  )}
                </>
              )}
            </div>
          </div>

          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Result</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              {Number(zakahAmount.replace(/,/g, "")) < Number(nisab) ? (
                <div>
                  <p>
                    💵Your financial holdings of {zakahAmount}{" "}
                    {selectedCurrency.toUpperCase()} do not meet the minimum
                    nisab limit; zakat is not obligatory.
                  </p>
                  <p>
                    📉The current minimum nisab based on your selected currency
                    and metal type is{" "}
                    <span className="zakah-amount">
                      {(nisab * 1).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{" "}
                      {selectedCurrency.toUpperCase()}.
                    </span>
                  </p>
                </div>
              ) : (
                <div>
                  <p>
                    💵Your financial holdings of{" "}
                    {Number(zakahAmount.replace(/,/g, "")).toLocaleString(
                      "en-US",
                      { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                    )}{" "}
                    {selectedCurrency.toUpperCase()} have reached the Nisab,
                    your zakah is:
                    <span className="zakah-amount">
                      {(
                        Number(zakahAmount.replace(/,/g, "")) / 40
                      ).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{" "}
                      {selectedCurrency.toUpperCase()}
                    </span>
                  </p>
                  <p>
                    🪙Metal currency last updated: {goldData.updatedAtReadable}
                  </p>
                  <p>🕛Currency exchange last update: {currencyData.date}</p>
                  <p>
                    📈Current minimum Nisab based on your currency selection and
                    metal type is{" "}
                    {(nisab * 1).toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    {selectedCurrency.toUpperCase()}
                  </p>
                </div>
              )}
            </Modal.Body>

            <Modal.Footer>
              <Button variant="dark" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default ZakahCalc;
