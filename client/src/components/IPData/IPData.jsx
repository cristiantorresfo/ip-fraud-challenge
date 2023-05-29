import './IPData.css'

export const IPData = ({ data }) => {
    return (
      <>
        <h2>Información de la IP</h2>
        <ul>
          <li>
            <strong>IP:</strong> {data.ip}
          </li>
          <li>
            <strong>País:</strong> {data.countryName}
          </li>
          <li>
            <strong>Código ISO:</strong> {data.isoCountryCode}
          </li>
          <li>
            <strong>Moneda Local:</strong> {data.currency}
          </li>
          <li>
            <strong>{`Cotización EUR/${data.currency}:`}</strong> {data.eur_rate}
          </li>
        </ul>
      </>
    );
  }
  