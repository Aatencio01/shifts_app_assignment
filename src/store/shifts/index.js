import get from 'lodash/get';
import {SHIFTS_ACTIONS} from './types';
import {getIsOverlapping, groupShiftsByArea} from '../../utils';

export const initialState = {
  shifts: [],
  selectedArea: '',
  showLoading: {
    isLoading: false,
    date: {},
  },
};

const updateShifts = (shifts, action) => {
  if (action) {
    const updatedShifts = shifts.map(shift => {
      if (shift.id === action.payload.id) {
        shift = action.payload;
      }
      return shift;
    });

    return getIsOverlapping(updatedShifts);
  }
  return getIsOverlapping(shifts);
};

export const shiftsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHIFTS_ACTIONS.LOAD_SHIFTS: {
      const getInitialArea = get(
        groupShiftsByArea(action.payload),
        '[0].title',
        '',
      );
      return {
        ...state,
        shifts: updateShifts(action.payload),
        selectedArea: getInitialArea,
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
    case SHIFTS_ACTIONS.SELECT_AREA: {
      return {
        ...state,
        selectedArea: action.payload,
      };
    }
    case SHIFTS_ACTIONS.SHOW_LOADING: {
      return {
        ...state,
        showLoading: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
