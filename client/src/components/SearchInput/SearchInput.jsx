import './SearchInput.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

/**
 * SearchInput Component
 *
 * A component that provides an input field for entering an IP address and a search button.
 *
 * @component
 * @param {string} ip - The IP address value.
 * @param {function} setIp - A function to set the IP address value.
 * @param {function} handleSearch - A function to handle the search action.
 * @param {function} handleKeyPress - A function to handle key press events.
 * @param {boolean} isLoading - Boolean value indicating whether therequest is finished or running

 * @returns {JSX.Element} The SearchInput component.
 */
export const SearchInput =({ ip, setIp, handleSearch,handleKeyPress, isLoading }) => {
    return (
      <div className="search">
        <input
          type="text"
          placeholder="Ingresa una IP"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button disabled={isLoading} onClick={handleSearch}>
        <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    );
  }
  