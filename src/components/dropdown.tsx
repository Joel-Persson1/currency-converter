import { HiOutlineStar, HiStar } from "react-icons/hi2";

interface CurrencyDropdownProps {
  currencies: string[];
  currency: string;
  setCurrency: (currency: string) => void;
  favorites?: string[];
  handleFavorite?: (currency: string) => void;
  title?: string;
}

const CurrencyDropdown = ({
  currencies,
  currency,
  setCurrency,
  favorites,
  handleFavorite,
  title = "",
}: CurrencyDropdownProps) => {
  const isFavorite = (curr: string) => favorites?.includes(curr);

  return (
    <div>
      <label
        className="block text-sm font-medium text-gray-700"
        htmlFor={title}
      >
        {title}
      </label>

      <div className="mt-1 relative">
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {favorites &&
            favorites.length > 0 &&
            favorites.map((currency) => (
              <option className="bg-gray-200" key={currency} value={currency}>
                {currency}
              </option>
            ))}
          <hr />

          {currencies
            .filter((c) => !favorites?.includes(c))
            .map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
        </select>

        <button
          onClick={() => handleFavorite && handleFavorite(currency)}
          className="cursor-pointer absolute inset-y-0 right-0 pr-5 flex items-center text-sm leading-5"
        >
          {isFavorite(currency) ? <HiStar /> : <HiOutlineStar />}
        </button>
      </div>
    </div>
  );
};

export default CurrencyDropdown;
