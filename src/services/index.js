import {Variables} from '../utils';

export const getAvailableShifts = async () => {
  const response = await fetch(`${Variables.API_BASE_URL}/shifts`);
  return response.json();
};

export const postBookingShift = async date => {
  const bookShiftResponse = await fetch(
    `${Variables.API_BASE_URL}/shifts/${date.id}/book`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );
  return bookShiftResponse.json();
};

export const postCancelShift = async date => {
  const cancelShiftResponse = await fetch(
    `${Variables.API_BASE_URL}/shifts/${date.id}/cancel`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );
  return cancelShiftResponse.json();
};
