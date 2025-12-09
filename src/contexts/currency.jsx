import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
const CurrencyContext = createContext();

function CurrencyProvider({ children }) {
  const [targetCurrency, setTargetCurrency] = useState("ZMW");
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [exchangeRate, setGetExchangeRate] = useState({});

  useEffect(function () {
    async function getCurrencies() {
      setIsLoading(true);
      const response = await fetch(`"/api/getCurrencies"`);
      if (!response.ok) {
        toast.error("Could not load currencies");
        setIsLoading(false);
        throw new Error("");
      }
      setIsLoading(false);
      const data = await response.json();
      setCurrencies(() => data);
    }
    getCurrencies();
  }, []);

  useEffect(
    function () {
      async function getExchangeRate() {
        setIsLoading(true);
        const response = await fetch(
          `/api/convert?from=${baseCurrency}&to=${targetCurrency}&amount=${amount}`
        );
        if (!response.ok) {
          setIsLoading(false);
          toast.error("Could not convert currencies. Something went wrong");
          throw new Error("Failed to fetch todos");
        }
        setIsLoading(false);
        const data = await response.json();
        setGetExchangeRate(() => data);
      }
      getExchangeRate();
    },
    [baseCurrency, targetCurrency, amount]
  );

  return (
    <CurrencyContext.Provider
      value={{
        isLoading,
        currencies,
        exchangeRate,
        baseCurrency,
        setBaseCurrency,
        targetCurrency,
        setTargetCurrency,
        amount,
        setAmount,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined)
    throw new Error("Currency context was used outside the provider");
  return context;
}
export { CurrencyContext, CurrencyProvider, useCurrency };
