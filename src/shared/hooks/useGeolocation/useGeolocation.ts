import { useEffect } from 'react';

import { setGeolocation, setError } from './geolocationSlice';
import { useGetAddressQuery } from './geolocationApi'; 
import { useAppDispatch } from '../useAppDispatch';
import { useAppSelector } from '../useAppSelector';
 const useGeolocation = () => {
  const dispatch = useAppDispatch();
  const geolocation = useAppSelector((state) => state.geolocation.geolocation);
  const error = useAppSelector((state) => state.geolocation.error);
  
  useEffect(() => {
    if (!navigator.geolocation) {
      dispatch(setError('Geolocation is not supported by your browser'));
      return;
    }

    const onSuccess = (position: GeolocationPosition) => {
      const { latitude, longitude, accuracy } = position.coords;
      dispatch(setGeolocation({ latitude, longitude, accuracy }));
    };

    const onError = (error: GeolocationPositionError) => {
      dispatch(setError(error.message));
    };

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, [dispatch]);

  const { data: address, error: addressError } = useGetAddressQuery(
    { lat: geolocation?.latitude || 0, lon: geolocation?.longitude || 0 },
    { skip: !geolocation }
  );

  useEffect(() => {
    if (addressError) {
      dispatch(setError('Failed to fetch address'));
    }
  }, [addressError, dispatch]);

  return { geolocation, address, error: error || addressError };
};
export default useGeolocation
