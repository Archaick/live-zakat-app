import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuran, faScroll, faUserGraduate, faGavel, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './References.css';

function References() {
    return (
        <Container className="references-section mt-4 mb-4" id='references'>
            <h1 className="mb-3 text-center">References</h1>

            <Row className="align-items-center mb-4">
                <Col md={6} className="d-flex align-items-center mb-3 mb-md-0">
                    <div className="text-center w-100">
                        <FontAwesomeIcon icon={faQuran} className="reference-icon mb-3" />
                        <h3>Quran</h3>
                        <p>'In twenty-nine occurrences in the Qur`an, the mention of zakat was preceded with that of prayer' - Islamweb</p>
                        <ul className="list-unstyled">
                            <li>
                                <a href="https://www.islamweb.net/en/fatwa/32528/significance-of-associating-the-mention-of-prayer-with-zakat-in-the-quran" target='_blank' rel="noopener noreferrer">
                                    Associating the mention of zakat and prayers
                                    <FontAwesomeIcon icon={faExternalLinkAlt} className="external-link-icon" />
                                </a>
                            </li>
                            <li>
                                <a href="https://www.islamweb.net/en/article/185563/summary-of-zakah-rulings" target='_blank' rel="noopener noreferrer">
                                    Summary of zakah rulings
                                    <FontAwesomeIcon icon={faExternalLinkAlt} className="external-link-icon" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </Col>

                <Col md={6} className="d-flex align-items-center mb-3 mb-md-0">
                    <div className="text-center w-100">
                        <FontAwesomeIcon icon={faGavel} className="reference-icon mb-3" />
                        <h3>Fatwas</h3>
                        <p>Fatwas issued by Islamic scholars and authorities clarify the application of Nisab in modern contexts.</p>
                        <ul className="list-unstyled">
                            <li>
                                <a href="https://www.islamweb.net/en/fatwa/470932/nisab-of-gold-and-silver-differ-in-value-which-one-to-opt-for" target='_blank' rel="noopener noreferrer">
                                    Example of nisab in modern times
                                    <FontAwesomeIcon icon={faExternalLinkAlt} className="external-link-icon" />
                                </a>
                            </li>
                            <li>
                                <a href="https://islamqa.info/en/answers/93414/how-to-calculate-zakah-on-money-earned-during-the-year#:~:text=If%20it%20reaches%20the%20Nisab,of%20one%20tenth%20(2.5%25)." target='_blank' rel="noopener noreferrer">
                                    Ruling of calculating Zakat
                                    <FontAwesomeIcon icon={faExternalLinkAlt} className="external-link-icon" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </Col>



            </Row>

            <Row className="align-items-center mb-4">
                <Col md={6} className="d-flex align-items-center mb-3 mb-md-0">
                    <div className="text-center w-100">
                        <FontAwesomeIcon icon={faUserGraduate} className="reference-icon mb-3" />
                        <h3>Scholars</h3>
                        <p>Renowned Islamic scholars have written extensively on the principles and calculations of Zakat.</p>
                    </div>
                </Col>

                <Col md={6} className="d-flex align-items-center mb-3 mb-md-0">
                    <div className="text-center w-100">
                        <FontAwesomeIcon icon={faScroll} className="reference-icon mb-3" />
                        <h3>Hadith</h3>
                        <p>Various Hadiths from Prophet Muhammad (peace be upon him) provide guidance on Zakat and Nisab.</p>
                        <ul className="list-unstyled">
                            <li>
                                <a href="https://islamqa.info/en/answers/49632/the-difference-between-zakah-on-wealth-and-zakat-al-fitr" target='_blank' rel="noopener noreferrer">
                                    Zakah wealth vs. Zakat Al-Fitr
                                    <FontAwesomeIcon icon={faExternalLinkAlt} className="external-link-icon" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </Col>

            </Row>
        </Container>
    );
}

export default References;
