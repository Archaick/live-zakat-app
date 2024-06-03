import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Oval } from 'react-loader-spinner';
import ZakahCalc from './ZakahCalc';
import './GoldAndCurrency.css';

function GoldAndCurrency() {
    const [goldData, setGoldData] = useState(null);
    const [currencyData, setCurrencyData] = useState(null);

    const fetchGoldData = async () => {
        try {   
            const response = await axios.get('https://api.gold-api.com/price/XAU');
            const goldPerGram = response.data.price / 31.1035;

            const newGoldData = {
                ...response.data,
                price_per_gram: goldPerGram.toFixed(2)
            };
            setGoldData(newGoldData);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };

    const fetchCurrency = async () => {
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
        }
    };

    useEffect(() => {
        fetchGoldData();
        fetchCurrency();
    }, []);

    return (
        <div className="gold-currency-section" id='calculate'>
            {goldData ? (
                <ZakahCalc goldData={goldData} currencyData={currencyData} />
            ) : (
                <div>
                    <Oval 
                        height={60} 
                        width={30} 
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
