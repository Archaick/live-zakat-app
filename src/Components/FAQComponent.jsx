import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Accordion } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faCalculator,
  faUserFriends,
  faInfoCircle,
  faHandsHelping,
  faBalanceScale,
} from "@fortawesome/free-solid-svg-icons";
import "./FAQComponent.css";

function FAQComponent() {
  return (
    <div className="faq-bg">
      <div className="faq-container" id="faq">
        <h2 className="faq-heading">FAQ</h2>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <span className="icon">
                <FontAwesomeIcon icon={faCalendarAlt} />
              </span>
              When is Zakat al-Mal is due?
            </Accordion.Header>
            <Accordion.Body>
              Given annually (full Islamic lunar year) when wealth exceeds the
              Nisab.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              <span className="icon">
                <FontAwesomeIcon icon={faCalculator} />
              </span>
              How is Zakat al-Mal calculated?
            </Accordion.Header>
            <Accordion.Body>
              Zakat is calculated as 2.5% of the total savings and assets held
              for a full Islamic lunar year. This includes the cumulative value
              of various assets such as gold and silver possessions, cash kept
              at home and in bank accounts, investments, share values, and money
              owed to you.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>
              <span className="icon">
                <FontAwesomeIcon icon={faUserFriends} />
              </span>
              Who is eligible to receive Zakat?
            </Accordion.Header>
            <Accordion.Body>
              Recipients include the poor, needy, indebted, and others specified
              by Islamic law.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>
              <span className="icon">
                <FontAwesomeIcon icon={faInfoCircle} />
              </span>
              What is Nisab in the context of Zakat?
            </Accordion.Header>
            <Accordion.Body>
              The minimum wealth a Muslim must have to be obligated to pay
              Zakat.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header>
              <span className="icon">
                <FontAwesomeIcon icon={faHandsHelping} />
              </span>
              Can Zakat be given to non-Muslims?
            </Accordion.Header>
            <Accordion.Body>
              Generally intended for Muslims, but can be given to non-Muslims to
              promote goodwill.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="5">
            <Accordion.Header>
              <span className="icon">
                <FontAwesomeIcon icon={faBalanceScale} />
              </span>
              What standards are used for calculating Nisab?
            </Accordion.Header>
            <Accordion.Body>
              In the context of determining the valid Nisab threshold, some
              scholars argue that the minimum threshold (Nisab) for paper money
              is based on silver, not gold, because that is in the best
              interests of the poor. However, others lean towards gold. This
              site currently supports both the gold and silver standards for
              calculating Nisab. Scholars have issued fatwas allowing the use of
              different standards, either gold or silver. Depending on the
              chosen standard, your Nisab will vary.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
}

export default FAQComponent;
