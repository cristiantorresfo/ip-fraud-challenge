import axios from 'axios';
import { FraudContext, BlacklistedIp } from '../models/Data.js';

const API_KEY = '2312555476f161ae403b76b505d66e5e';
const API_KEY_FIXER = '160e86b23612724755e62049b0f75da4';


export const getContext = async (req, res) => {
  const { ip } = req.params;
  const isBlacklisted = await BlacklistedIp.exists({ ip });
  // Verificar si el contexto ya existe en la base de datos
  const existingContext = await FraudContext.findOne({ ip });
  if (existingContext && !isBlacklisted) {
    return res.json(existingContext);
  }

  // Obtener información de geolocalización de IP
  try {
    if (isBlacklisted) {
      return res.status(403).json({ error: 'La IP está en la lista negra.' });
    }

    const ipApiResponse = await axios.get(`http://api.ipapi.com/${ip}?access_key=${API_KEY}`);
    const { country_name, country_code } = ipApiResponse.data;

    // Obtener información del país
    const countryApiResponse = await axios.get(`https://restcountries.com/v3.1/alpha/${country_code}`);
    const data = countryApiResponse.data;
    
    const currencyCode = Object.keys(data[0].currencies)[0];
    
    // Obtener cotización de la moneda en euros
    const currencyApiResponse = await axios.get(`http://data.fixer.io/api/latest?access_key=${API_KEY_FIXER}&symbols=${currencyCode}`);

    const newContext = new FraudContext({
      ip,
      countryName: country_name,
      isoCountryCode: data[0].cioc,
      countryCode: country_code,
      currency: currencyCode,
      eur_rate: currencyApiResponse.data.rates[currencyCode],
      url_flag:data[0].flags.png
    });

    await newContext.save();

    res.json(newContext);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el contexto.' });
  }
};

export const addToBlacklist = async (req, res) => {
  const { ip } = req.params;

  try {
    const existingIp = await BlacklistedIp.findOne({ ip });
    if (existingIp) {
      return res.status(400).json({ error: 'La IP ya está en la lista negra.' });
    }

    const newBlacklistedIp = new BlacklistedIp({ ip });
    await newBlacklistedIp.save();
    res.json({ success: true, message: 'IP añadida a la lista negra.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al añadir la IP a la lista negra.' });
  }
};
