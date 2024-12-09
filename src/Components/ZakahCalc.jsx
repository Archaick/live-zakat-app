import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Form, Button } from "react-bootstrap";
import "./ZakahCalc.css";
import Select from "react-select";
import { NumericFormat } from "react-number-format";

function ZakahCalc({ goldData, currencyData, silverData }) {
  const [oneYear, setOneYear] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [zakahAmount, setZakahAmount] = useState("");
  const [isAmountValid, setIsAmountValid] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("");
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

  const handleAmountChange = (values) => {
    const { floatValue } = values; // Extract raw numeric value
    setZakahAmount(floatValue || ""); // Update with numeric value or empty string
    setIsAmountValid(!!floatValue); // Validate if a number is entered
  };

  const handleCalculate = () => {
    if (isAmountValid) {
      setShowModal(true);
    } else {
      alert("Enter a valid amount");
      setZakahAmount("");
    }
  };

  const goldNisab = () => {
    const pricePerGram = parseFloat(goldData.price_per_gram);
    const currencyInfo = currencyData[selectedCurrency.toUpperCase()];
    const currencyRate = currencyInfo ? parseFloat(currencyInfo.rate) : null;

    if (!currencyRate || currencyRate <= 0) {
      console.error("Invalid currency rate:", currencyRate);
      return null;
    }

    const nisabValue = pricePerGram * currencyRate * 85;
    return nisabValue >= 0.01 ? nisabValue.toFixed(2) : "0.01"; // Minimum display value
  };

  const silverNisab = () => {
    const pricePerGram = parseFloat(silverData.silver_per_gram);
    const currencyInfo = currencyData[selectedCurrency.toUpperCase()];
    const currencyRate = currencyInfo ? parseFloat(currencyInfo.rate) : null;

    if (!currencyRate || currencyRate <= 0) {
      console.error("Invalid currency rate:", currencyRate);
      return null;
    }

    const nisabValue = pricePerGram * currencyRate * 595;
    return nisabValue >= 0.01 ? nisabValue.toFixed(2) : "0.01"; // Minimum display value
  };

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
            {oneYear && (
              <>
                <Form.Group>
                  <Form.Label>Choose the currency</Form.Label>
                  <Select
                    className="currency-dropdown"
                    value={{
                      value: selectedCurrency,
                      label: currencyData?.[selectedCurrency.toUpperCase()]
                        ? `${
                            currencyData[selectedCurrency.toUpperCase()].name
                          } (${selectedCurrency.toUpperCase()})`
                        : selectedCurrency.toUpperCase(),
                    }}
                    onChange={(selectedOption) =>
                      setSelectedCurrency(selectedOption.value)
                    }
                    options={Object.keys(currencyData || {}).map(
                      (currencyCode) => ({
                        value: currencyCode.toLowerCase(),
                        label: currencyData[currencyCode.toUpperCase()]
                          ? `${
                              currencyData[currencyCode.toUpperCase()].name
                            } (${currencyCode.toUpperCase()})`
                          : currencyCode.toUpperCase(),
                      })
                    )}
                    placeholder="Search for a currency..."
                    isSearchable
                    styles={{
                      menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    }}
                    menuPortalTarget={document.body}
                    menuPosition="absolute"
                  />
                </Form.Group>

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

                {showStandardOptions && (
                  <>
                    <Form.Group>
                      <Form.Label>
                        Input the total amount of your net assets
                      </Form.Label>
                      <NumericFormat
                        value={zakahAmount}
                        thousandSeparator=","
                        decimalScale={2}
                        allowNegative={false}
                        fixedDecimalScale
                        onValueChange={handleAmountChange}
                        className="form-control"
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

          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Result</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {Number(zakahAmount) < Number(nisab) ? (
                <div>
                  <p>
                    💵Your financial holdings of {zakahAmount}{" "}
                    {selectedCurrency.toUpperCase()} do not meet the minimum
                    nisab limit; zakat is not obligatory.
                  </p>
                </div>
              ) : (
                <div>
                  <p>
                    💵Your financial holdings of {zakahAmount}{" "}
                    {selectedCurrency.toUpperCase()} have reached the Nisab.
                  </p>
                  <p>
                    Your zakah is{" "}
                    <span className="zakah-amount">
                      {(Number(zakahAmount) / 40).toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>{" "}
                    {selectedCurrency.toUpperCase()}.
                  </p>
                </div>
              )}

              <p>🪙Metal currency last updated: {goldData.updatedAtReadable}</p>
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
