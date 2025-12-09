import { useCurrency } from "../contexts/currency";
import "../converter.css";

function ComputationBox() {
  const {
    amount,
    setAmount,
    baseCurrency,
    setBaseCurrency,
    currencies,
    targetCurrency,
    setTargetCurrency,
    setExchangeRate,
  } = useCurrency();

  let formattedCurrencies = Object.values(currencies || {});
  const usd = ["USD"];
  const zmw = ["ZMW"];
  const defaultBase = [
    ...formattedCurrencies.filter((c) => usd.includes(c.short_code)),
    ...formattedCurrencies.filter((c) => !usd.includes(c.short_code)),
  ];
  const defaultTarget = [
    ...formattedCurrencies.filter((c) => zmw.includes(c.short_code)),
    ...formattedCurrencies.filter((c) => !zmw.includes(c.short_code)),
  ];

  function SwapCurrencies() {
    const holding = baseCurrency;
    setBaseCurrency(targetCurrency);
    setTargetCurrency(holding);
    if (!amount) {
      setExchangeRate({});
    }
  }
  return (
    <div className="left-panel">
      <div className="input-group">
        <label>Amount</label>
        <input
          type="number"
          placeholder="$10"
          value={amount}
          onChange={(e) => {
            const val = e.target.value;

            // Allow only digits
            if (/^\d*$/.test(val)) {
              setAmount(val);
            }
          }}
        />
      </div>
      <div className="input-group">
        <div className="input-group">
          <label>Base Currency</label>

          <div className="select-box">
            <select
              onChange={(e) => setBaseCurrency(e.target.value)}
              value={baseCurrency}
            >
              {defaultBase.map((c) => (
                <option key={c.id} value={c.short_code}>
                  {c.short_code} — {c.name}
                </option>
              ))}
            </select>

            <img
              className="flag"
              src={`https://flagcdn.com/${baseCurrency
                ?.slice(0, 2)
                .toLowerCase()}.svg`}
              alt={`${baseCurrency} flag`}
              width={36}
              height={24}
            />
          </div>
        </div>
      </div>
      <div className="swap-row">
        <button className="swap-btn" onClick={SwapCurrencies}>
          ⇄ Swap
        </button>
      </div>
      <div className="input-group">
        <div className="input-group">
          <label>Target Currency</label>

          <div className="select-box">
            <select
              onChange={(e) => setTargetCurrency(e.target.value)}
              value={targetCurrency}
            >
              {defaultTarget.map((c) => (
                <option key={c.id} value={c.short_code}>
                  {c.short_code} — {c.name}
                </option>
              ))}
            </select>
            <img
              className="flag"
              src={`https://flagcdn.com/${targetCurrency
                ?.slice(0, 2)
                .toLowerCase()}.svg`}
              alt={`${targetCurrency} flag`}
              width={36}
              height={24}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComputationBox;
