import {SHIFTS_ACTIONS} from './types';
import {getIsOverlapping} from '../../utils';

export const initialState = {
  shifts: [],
  selectedArea: '',
};

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
    type: SHIFTS_ACTIONS.SELECTED_AREA,
    payload: area,
  };
};

const updateShifts = (shifts, action) => {
  if (action) {
    const updatedShifts = shifts.map(shift => {
      if (shift.id === action.payload.id) {
        shift = action.payload;
      }
      return shift;
    });

    return getIsOverlapping(updatedShifts, action.payload);
  }
  return getIsOverlapping(shifts);
};

export const shiftsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHIFTS_ACTIONS.LOAD_SHIFTS: {
      return {
        ...state,
        shifts: updateShifts(action.payload),
      };
    }
    case SHIFTS_ACTIONS.BOOK_SHIFT: {
      return {
        ...state,
        shifts: updateShifts(state.shifts, action),
      };
    }
    case SHIFTS_ACTIONS.CANCEL_SHIFT: {
      return {
        ...state,
        shifts: updateShifts(state.shifts, action),
      };
    }
    case SHIFTS_ACTIONS.SELECTED_AREA: {
      return {
        ...state,
        selectedArea: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
