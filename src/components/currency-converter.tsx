import { useEffect, useState } from "react";
import CurrencyDropdown from "./dropdown";
import { HiArrowsRightLeft } from "react-icons/hi2";

const CurrencyConverter = () => {
  // State variables
  const [currencies, setCurrencies] = useState<string[]>([]);
  // Amount to convert
  // Using number | string to handle empty input gracefully
  const [amount, setAmount] = useState<number | string>(1);

  // From and To currencies
  // Defaulting to USD and INR for demonstration purposes
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("INR");

  // Converted amount and state for conversion
  // Using string | null to handle cases where conversion hasn't happened yet
  const [convertedAmount, setConvertedAmount] = useState<string | null>(null);
  const [converting, setConverting] = useState<boolean>(false);

  // Error state to handle any issues during conversion
  // Using string | null to handle cases where no error has occurred
  const [error, setError] = useState<string | null>(null);

  // Favorites state to manage favorite currencies
  // Defaulting to some common currencies for demonstration purposes
  // Using string[] to store an array of favorite currency codes
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : ["USD", "EUR", "INR"];
  });

  // Call fetchCurrencies on component mount
  useEffect(() => {
    fetchCurrencies();
  }, []);

  /**
   * Fetch currencies from the api
   *
   * @returns void
   */
  const fetchCurrencies = async () => {
    try {
      const response = await fetch("https://api.frankfurter.dev/v1/currencies");

      if (!response.ok) throw new Error("Failed to fetch currencies");

      const data = await response.json();
      setCurrencies(Object.keys(data));
    } catch (error) {
      console.error("Error fetching currencies:", error);
    }
  };

  /**
   * Convert currency when the user clicks the convert button
   *
   * @returns Error
   */
  const convertCurrency = async () => {
    setError(null);
    setConvertedAmount(null);

    if (!fromCurrency || !toCurrency || Number(amount) <= 0)
      return setError("Invalid inputs for conversion");

    setConverting(true);

    try {
      const response = await fetch(
        `https://api.frankfurter.dev/v1/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );

      if (!response.ok) throw new Error("Failed to convert currency");

      const data = await response.json();

      setConvertedAmount(data.rates[toCurrency] + " " + toCurrency);
    } catch (error) {
      console.error("Error fetching currencies:", error);
      setError("Failed to fetch conversion rates");
      setConvertedAmount(null);
    } finally {
      setConverting(false);
    }
  };

  // Handle favorite currencies
  /**
   * Handle favorite currencies
   * @param currency
   *
   * @returns void
   */
  const handleFavorite = (currency: string) => {
    // Logic to handle favorite currencies
    let updatedFavorites = [...favorites];
    if (updatedFavorites.includes(currency)) {
      updatedFavorites = updatedFavorites.filter((c) => c !== currency);
    } else {
      updatedFavorites.push(currency);
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  // Swap currencies
  /**
   * Swap currencies
   *
   * @returns void
   */
  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <div className="max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md">
      <h2 className="mb-5 text-2xl font-semibold text-gray-700">
        Currency Converter
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <CurrencyDropdown
          favorites={favorites.filter((c: unknown) => c !== toCurrency)}
          currencies={currencies.filter((c) => c !== toCurrency)}
          title="From:"
          currency={fromCurrency}
          setCurrency={setFromCurrency}
          handleFavorite={handleFavorite}
        />

        <div className="flex justify-center -mb-5 sm:mb-0">
          <button
            aria-label="swap-currencies"
            onClick={swapCurrencies}
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <HiArrowsRightLeft className="text-xl text-gray-700" />
          </button>
        </div>

        <CurrencyDropdown
          favorites={favorites.filter((c: unknown) => c !== fromCurrency)}
          currencies={currencies.filter((c) => c !== fromCurrency)}
          title="To:"
          currency={toCurrency}
          setCurrency={setToCurrency}
          handleFavorite={handleFavorite}
        />
      </div>

      <div className="mt-4">
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-7 00"
        >
          Amount:
        </label>
        <input
          value={amount}
          onChange={(e) => {
            const val = e.target.value;

            // Validate input

            if (val === "") setAmount("");
            else if (Number(val) <= 0) setAmount("");
            else if (Number(val) > 1000000) setAmount(1000000);
            else setAmount(Number(val));
          }}
          type="number"
          className="mt-1 w-full p-2 border border-gray-300 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={convertCurrency}
          className={`cursor-pointer px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
            converting ? "animate-pulse" : ""
          }`}
        >
          Convert
        </button>
      </div>

      {/* If error, then display the error with this component */}
      {error && (
        <div
          aria-label="error"
          className="mt-4 text-lg font-medium text-right text-red-600"
        >
          <p>{error}</p>
        </div>
      )}

      {/* If converted value, display the converted value */}
      {convertedAmount && (
        <div className="mt-4 text-lg font-medium text-right text-green-600">
          <p>Converted Amount: {convertedAmount}</p>
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;
