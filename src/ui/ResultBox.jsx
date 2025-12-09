import { useCurrency } from "../contexts/currency";
import "../converter.css";

function ResultBox() {
  const { baseCurrency, amount, targetCurrency, exchangeRate } = useCurrency();
  return (
    <div className="right-panel">
      <div>
        <div>
          <p className="result-main">
            {amount === "" ? 0 : null} {baseCurrency} {amount}
            {" is equal to"}
          </p>
          <h2 className="result-amount">
            {targetCurrency} {exchangeRate?.value}
          </h2>
        </div>
        <div>
          {amount && (
            <>
              <p className="rate">
                1 {baseCurrency} = {exchangeRate?.value / amount}{" "}
                {targetCurrency}
              </p>
              <p className="rate">
                1 {targetCurrency} = {amount / exchangeRate?.value}{" "}
                {baseCurrency}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResultBox;
