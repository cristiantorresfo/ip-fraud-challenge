import mongoose from 'mongoose';

const fraudContextSchema = new mongoose.Schema({
  ip: String,
  countryName: String,
  isoCountryCode: String,
  countryCode: String,
  currency: String,
  eur_rate: Number,
});

const blacklistedIpSchema = new mongoose.Schema({
  ip: {
    type: String,
    unique: true,
  },
});

const FraudContext = mongoose.model('FraudContext', fraudContextSchema);
const BlacklistedIp = mongoose.model('BlacklistedIp', blacklistedIpSchema);

export { FraudContext, BlacklistedIp };
