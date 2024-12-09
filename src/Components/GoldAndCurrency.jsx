import React, { useState, useEffect } from "react";
import axios from "axios";
import ZakahCalc from "./ZakahCalc";
import "./GoldAndCurrency.css";
import { Loader } from "@mantine/core";

function GoldAndCurrency() {
  const [goldData, setGoldData] = useState(null);
  const [silverData, setSilverData] = useState(null);
  const [currencyData, setCurrencyData] = useState(null);
  // the above are props
  const [retry, setRetry] = useState(false);

  const fetchGoldData = async () => {
    if (goldData) return; // Don't fetch if data is already fetched
    try {
      const response = await axios.get("https://api.gold-api.com/price/XAU");
      const goldPerGram = response.data.price / 31.1035;
      const newGoldData = {
        ...response.data,
        price_per_gram: goldPerGram.toFixed(2),
      };
      setGoldData(newGoldData);
    } catch (error) {
      console.error("Error fetching gold", error);
      setRetry(true);
    }
  };

  const fetchSilverData = async () => {
    if (silverData) return; // Don't fetch if data is already fetched
    try {
      const response = await axios.get("https://api.gold-api.com/price/XAG");
      const silverPerGram = response.data.price / 31.1035;
      const newSilverData = {
        ...response.data,
        silver_per_gram: silverPerGram.toFixed(2),
      };
      setSilverData(newSilverData);
    } catch (error) {
      console.error("Error fetching silver", error);
      setRetry(true);
    }
  };

  const fetchCurrency = async () => {
    if (currencyData) return; // Don't fetch if data is already fetched
    try {
      const [exchangeRatesResponse, currencyNamesResponse] = await Promise.all([
        axios.get(
          "https://latest.currency-api.pages.dev/v1/currencies/usd.json"
        ),
        axios.get(
          "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json"
        ),
      ]);

      const exchangeRates = exchangeRatesResponse.data.usd;
      const currencyNames = currencyNamesResponse.data;

      // Combine exchange rates with currency names
      const newCurrencyData = Object.keys(exchangeRates).reduce((acc, key) => {
        acc[key.toUpperCase()] = {
          rate: exchangeRates[key],
          name: currencyNames[key] || key, // Use name if available, fallback to symbol
        };
        return acc;
      }, {});

      newCurrencyData.date = exchangeRatesResponse.data.date; // Add the date field
      setCurrencyData(newCurrencyData);
    } catch (error) {
      console.error("Error fetching currency", error);
      setRetry(true);
    }
  };

  useEffect(() => {
    const fetchData = () => {
      fetchGoldData();
      fetchCurrency();
      fetchSilverData();
    };

    fetchData();

    if (retry) {
      const retryDelay = 5000; // Retry after 5 seconds
      const timeoutId = setTimeout(() => {
        setRetry(false);
        fetchData();
      }, retryDelay);
      return () => clearTimeout(timeoutId); // Clear timeout on component unmount
    }
  }, [retry]);

  return (
    <div className="gold-currency-section" id="calculate">
      {goldData && silverData && currencyData ? (
        <ZakahCalc
          goldData={goldData}
          currencyData={currencyData}
          silverData={silverData}
        />
      ) : (
        <div className="loader-wrapper">
          <Loader color="red" size="xl" type="bars" />
        </div>
      )}
    </div>
  );
}

export default GoldAndCurrency;
