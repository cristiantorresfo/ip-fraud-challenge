import './SearchInput.css'

export const SearchInput =({ ip, setIp, handleSearch,handleKeyPress }) => {
    return (
      <div className="search">
        <input
          type="text"
          placeholder="Ingrese una IP"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>
    );
  }
  