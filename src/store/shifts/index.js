import {SHIFTS_ACTIONS} from './types';

export const initialState = {
  shifts: [],
};

export const loadShifts = shifs => {
  return {
    type: SHIFTS_ACTIONS.LOAD_SHIFTS,
    payload: shifs,
  };
};

export const loadShiftById = id => {
  return {
    type: SHIFTS_ACTIONS.LOAD_SHIFT_BY_ID,
    payload: id,
  };
};

export const bookShift = id => {
  return {
    type: SHIFTS_ACTIONS.BOOK_SHIFT,
    payload: id,
  };
};

export const cancelShift = id => {
  return {
    type: SHIFTS_ACTIONS.CANCEL_SHIFT,
  };
};

export const shiftsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHIFTS_ACTIONS.LOAD_SHIFTS: {
      return {
        ...state,
        shifts: action.payload,
      };
    }
    case SHIFTS_ACTIONS.LOAD_SHIFT_BY_ID: {
      return {
        ...state,
        shifts: action.payload,
      };
    }
    case SHIFTS_ACTIONS.BOOK_SHIFT: {
      return {
        ...state,
        shifts: initialState.shifts,
      };
    }
    case SHIFTS_ACTIONS.CANCEL_SHIFT: {
      return {
        ...state,
        shifts: initialState.shifts,
      };
    }
    default: {
      return state;
    }
  }
};
