import config from '../config/config';

export const getAddress = async ({latitude, longitude}) => {
    let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${config.geolocationKey}`;
    let googleResult = await fetch(url).then(res => res.json());
    return googleResult;
}