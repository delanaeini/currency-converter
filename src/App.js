import { useState, useEffect } from "react";

export default function App() {
  const [input, setInput] = useState(0);
  const [output, setOutput] = useState("");
  const [fromCur, setFromCur] = useState("EUR");
  const [toCur, setToCur] = useState("USD");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function currencyConverter() {
        setIsLoading(true); //before fetch we set isLoading to true
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${input}&from=${fromCur}&to=${toCur}`
        );
        const data = await res.json();
        setOutput(data.rates[toCur]);
        setIsLoading(false); //after fetch we set isLoading to false
      }

      //The api doesn't work when toCur and fromCur are the same so we take care of that situation here
      if (fromCur === toCur) return setOutput(input);
      currencyConverter();
    },
    [input, fromCur, toCur]
  );

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(Number(e.target.value))}
        disabled={isLoading} //elements are disabled when the fetch/loading is happending
      />
      <select
        value={fromCur}
        onChange={(e) => setFromCur(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={toCur}
        onChange={(e) => setToCur(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{input > 0 && `${input} ${fromCur} is equal to ${output} ${toCur}`}</p>
    </div>
  );
}
