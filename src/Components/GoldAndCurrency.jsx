import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Oval } from 'react-loader-spinner';
import ZakahCalc from './ZakahCalc';
import './GoldAndCurrency.css';

function GoldAndCurrency() {
    const [goldData, setGoldData] = useState(null);
    const [silverData, setSilverData] = useState(null);
    const [currencyData, setCurrencyData] = useState(null);
    const [retry, setRetry] = useState(false);

    const fetchGoldData = async () => {
        if (goldData) return; // Don't fetch if data is already fetched
        try {
            const response = await axios.get('https://api.gold-api.com/price/XAU');
            const goldPerGram = response.data.price / 31.1035;
            const newGoldData = {
                ...response.data,
                price_per_gram: goldPerGram.toFixed(2)
            };
            setGoldData(newGoldData);
        } catch (error) {
            console.error('Error fetching gold', error);
            setRetry(true);
        }
    };

    const fetchSilverData = async () => {
        if (silverData) return; // Don't fetch if data is already fetched
        try {
            const response = await axios.get('https://api.gold-api.com/price/XAG');
            const silverPerGram = response.data.price / 31.1035;
            const newSilverData = {
                ...response.data,
                silver_per_gram: silverPerGram.toFixed(2)
            };
            setSilverData(newSilverData);
        } catch (error) {
            console.error('Error fetching silver', error);
            setRetry(true);
        }
    };

    const fetchCurrency = async () => {
        if (currencyData) return; // Don't fetch if data is already fetched
        try {
            const response = await axios.get('https://latest.currency-api.pages.dev/v1/currencies/usd.json');
            const newCurrencyData = {
                ...response.data.usd,
                USD: response.data.usd.usd,
                IDR: response.data.usd.idr,
                SAR: response.data.usd.sar,
                date: response.data.date
            };
            setCurrencyData(newCurrencyData);
        } catch (error) {
            console.error('Error at fetching currency', error);
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
        <div className="gold-currency-section" id='calculate'>
            {goldData && silverData && currencyData ? (
                <ZakahCalc goldData={goldData} currencyData={currencyData} silverData={silverData} />
            ) : (
                <div className="loader-wrapper">
                    <Oval 
                        height={60} 
                        width={60} 
                        color="#4fa94d" 
                        wrapperStyle={{}} 
                        wrapperClass="" 
                        visible={true} 
                        ariaLabel='oval-loading' 
                        secondaryColor="#4fa94d" 
                        strokeWidth={2} 
                        strokeWidthSecondary={2} 
                    />
                </div>
            )}
        </div>
    );
}

export default GoldAndCurrency;
