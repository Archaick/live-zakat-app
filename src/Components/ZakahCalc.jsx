import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Form, Button } from 'react-bootstrap';
import './ZakahCalc.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';

function ZakahCalc({ goldData, currencyData }) {
    const [oneYear, setOneYear] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [zakahAmount, setZakahAmount] = useState('');
    const [isAmountValid, setIsAmountValid] = useState(false);
    const [selectedCurrency, setSelectedCurrency] = useState('usd');

    const handleOneYearChange = (e) => {
        const value = e.target.value === 'yes';
        setOneYear(value);
    };

    // resets input to 0 after modal closes
    const handleClose = () => {
        setShowModal(false);
        setZakahAmount(''); // Reset the input value to empty string after closing the modal
        setIsAmountValid(false); // Reset validation state
    };

    const handleAmountChange = (e) => {
        const value = e.target.value;
        setZakahAmount(value);
        setIsAmountValid(!isNaN(parseInt(value)) && parseInt(value) > 0);
    };

    const handleCalculate = () => {
        if (isAmountValid) {
            setShowModal(true);
        } else {
            alert('Enter a valid amount');
            setZakahAmount('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent form submission on Enter key
            handleCalculate();
        }
    };

    const goldNisab = () => {
        if (selectedCurrency === 'idr') {
            return (goldData.price_per_gram * currencyData.IDR * 85).toFixed(2);
        } else if (selectedCurrency === 'sar') {
            return (goldData.price_per_gram * currencyData.SAR * 85).toFixed(2);
        } else {
            return (goldData.price_per_gram * currencyData.USD * 85).toFixed(2);
        }
    };

    const handleCurrencyChange = (e) => setSelectedCurrency(e.target.value);

    return (
        <div className="zakah-calc-section" id='calculate'>
            <div className="zakah-calc-bg"></div>
            <div className="zakah-calc-wrapper">
                <div className="zakah-calc-container">
                    <h1>Calculate</h1>

                    <Form.Group>
                        <Form.Label>Has your money been held for one full <a href="https://www.islamweb.net/en/fatwa/304246/about-the-hijri-and-solar-calendars" target='_blank' className='style-link'>lunar<FontAwesomeIcon icon={faExternalLinkAlt} className="external-link-icon" /></a> year?</Form.Label>
                        <Form.Control as='select' onChange={handleOneYearChange}>
                            <option value="no">No</option>
                            <option value="yes">Yes</option>
                        </Form.Control>
                    </Form.Group>

                    <div className={`additional-fields ${oneYear ? 'show' : ''}`}>
                        <Form.Group>
                            <Form.Label>Choose the currency</Form.Label>
                            <Form.Control as='select' onChange={handleCurrencyChange}>
                                <option value="usd">USD</option>
                                <option value="idr">IDR</option>
                                <option value="sar">SAR</option>
                            </Form.Control>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Input the total amount of your net assests</Form.Label>
                            <Form.Control
                                type='number'
                                onChange={handleAmountChange}
                                required
                                className="number-input"
                                onKeyDown={handleKeyDown} // Add onKeyDown event handler (enter button support)
                                value={zakahAmount} // Bind the value to zakahAmount state
                            />
                        </Form.Group>
                        <Button variant='dark' onClick={handleCalculate} className='calc-submit'>Calculate</Button>
                    </div>

                    <Modal show={showModal} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Result</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            {Number(zakahAmount) < Number(goldNisab()) ? (

                                <div>
                                    <p>💵Your financial holdings of {zakahAmount} {selectedCurrency.toUpperCase()} does not meet the minimum nisab limit; zakat is not obligatory.</p>
                                    <p>📉The current minimum nisab for your selected currency is <span className='zakah-amount'>{(goldNisab() * 1).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {selectedCurrency.toUpperCase()}.</span></p>
                                </div>

                            ) : (
                                <div>
                                    <p>💵Your financial holdings of {(zakahAmount * 1).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {selectedCurrency.toUpperCase()} has reached the Nisab, your zakah is: 
                                        <span className="zakah-amount">
                                            {(zakahAmount / 40).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {selectedCurrency.toUpperCase()}
                                        </span>
                                    </p>
                                    <p>🪙Gold currency last updated: {goldData.updatedAtReadable}</p>
                                    <p>🕛Currency exchange last update: {currencyData.date}</p>
                                    <p>📈Current minimum Nisab for your currency selection is {(goldNisab() * 1).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {selectedCurrency.toUpperCase()}</p>
                                </div>
                            )}
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant='dark' onClick={handleClose}>
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
