import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faCoins, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css';

function Footer() {
    return (
        <footer className="footer-section">
            <Container id='footer'>
                <Row className="text-center text-md-left">
                    <Col md={6} className="mb-4 mb-md-0">
                        <h5>Disclaimer</h5>
                        <p>
                            This project aims to provide an estimate for the calculation of Zakat, though it is not guaranteed to be 100% accurate. While live values are used, they may not be as precise as current market values obtainable through paid APIs. The primary role of this project is for educational purposes.
                        </p>
                        <h6 className="mt-4">Upcoming Updates</h6>
                        <ul className="list-unstyled">
                            <li>Adding silver standard for zakat</li>
                            <li>Expansion in language and currency support</li>
                            <li>Refining of the project page</li>
                        </ul>
                    </Col>
                    <Col md={6} className="mb-4 mb-md-0">
                        <h5>Contact</h5>
                        <ul className="list-unstyled">
                            <li>
                                <FontAwesomeIcon icon={faEnvelope} /> <a href="mailto:your-email@example.com" className="text-decoration-none">saeed.jh3@gmail.com</a>
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faGithub} /> <a href="https://github.com/Archaick" target="_blank" rel="noopener noreferrer" className="text-decoration-none">GitHub</a>
                            </li>
                        </ul>
                        <h5 className="mt-4">APIs Used</h5>
                        <ul className="list-unstyled">
                            <li>
                                <FontAwesomeIcon icon={faCoins} /> <a href="https://www.gold-api.com/docs" target='_blank' rel="noopener noreferrer" className="text-decoration-none">Metals</a>
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faDollarSign} /> <a href="https://github.com/fawazahmed0/exchange-api" target='_blank' rel="noopener noreferrer" className="text-decoration-none">Currencies</a>
                            </li>
                        </ul>
                    </Col>
                </Row>
                <Row className="text-center mt-2">
                    <Col>
                        <p>&copy; {new Date().getFullYear()} Version 1.0</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;
