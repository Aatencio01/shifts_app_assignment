import {SHIFTS_ACTIONS} from './types';

export const loadShifts = shifs => {
  return {
    type: SHIFTS_ACTIONS.LOAD_SHIFTS,
    payload: shifs,
  };
};

export const bookShift = shif => {
  return {
    type: SHIFTS_ACTIONS.BOOK_SHIFT,
    payload: shif,
  };
};

export const cancelShift = shif => {
  return {
    type: SHIFTS_ACTIONS.CANCEL_SHIFT,
    payload: shif,
  };
};

export const setSelectedArea = area => {
  return {
    type: SHIFTS_ACTIONS.SELECT_AREA,
    payload: area,
  };
};

export const setShowLoading = date => {
  return {
    type: SHIFTS_ACTIONS.SHOW_LOADING,
    payload: date,
  };
};
