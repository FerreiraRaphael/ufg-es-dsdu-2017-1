import config from "../config/config";

const apiUrl = "https://maps.googleapis.com/maps/api/geocode/json";

export const getAddress = async ({ latitude, longitude, latitudeDelta, longitudeDelta }) => {
  let url = `${apiUrl}?latlng=${latitude},${longitude},${latitudeDelta},${longitudeDelta}&key=${config.geolocationKey}`;
  let result = await fetch(url).then(res => res.json());
  return result;
};

export const searchAddress = async (address) => {
  let url = `${apiUrl}?address=${address}&key=${config.geolocationKey}`;
  let result = await fetch(url).then(res => res.json());
  return result;
};
