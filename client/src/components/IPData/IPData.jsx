import './IPData.css'

/**
 * IPData Component
 *
 * A component that displays information about an IP.
 *
 * @component
 * @param {object} data - The data object containing IP information.
 * @returns {JSX.Element} The IPData component.
 */
export const IPData = ({ data }) => {
    return (
      <>
        <h2>Información de la IP</h2>
        <img src={data?.url_flag} alt="image_flag" />
        <ul>
          <li>
            <strong>IP:</strong> {data?.ip}
          </li>
          <li>
            <strong>País:</strong> {data?.countryName}
          </li>
          <li>
            <strong>Código ISO:</strong> {data?.isoCountryCode}
          </li>
          <li>
            <strong>Moneda Local:</strong> {data?.currency}
          </li>
          <li>
            <strong>{`Cotización EUR/${data?.currency}:`}</strong> {data?.eur_rate}
          </li>
        </ul>
      </>
    );
  }
  