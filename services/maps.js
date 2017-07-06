import config from "../config/config";

const apiUrl = "https://maps.googleapis.com/maps/api/geocode/json";

export const getAddress = async ({ latitude, longitude }) => {
  let url = `${apiUrl}?latlng=${latitude},${longitude}&key=${config.geolocationKey}`;
  let result = await fetch(url).then(res => res.json());
  return result;
};

export const searchAddress = async (address) => {
  let url = `${apiUrl}?address=${address}&key=${config.geolocationKey}`;
  let result = await fetch(url).then(res => res.json());
  return result;
};
