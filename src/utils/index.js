import groupBy from 'lodash/groupBy';
import map from 'lodash/map';

const DATE_OPTIONS = {
  month: 'long',
  day: 'numeric',
};

export const Variables = {
  API_BASE_URL: 'http://127.0.0.1:8080',
};

const showDateTitle = date => {
  const todayDate = new Date();
  const dateFromApi = new Date(date);
  const day = dateFromApi.toLocaleDateString('en-US', DATE_OPTIONS);
  const today = todayDate.toLocaleDateString('en-US', DATE_OPTIONS);

  if (day === today) {
    return 'Today';
  } else {
    return day;
  }
};

const sortedShifts = shifts => {
  return shifts.sort((a, b) => a.startTime - b.startTime);
};

export const filterOutOfTime = shifts => {
  return shifts.filter(shift => shift.startTime > Date.now());
};

export const groupShiftsByArea = shifts => {
  if (shifts) {
    const groupShifts = groupBy(shifts, 'area');
    const getDataKeys = Object.keys(groupShifts);

    const formattedShifts = getDataKeys.map(area => {
      return {
        title: area,
        data: groupShifts[area],
      };
    });
    return formattedShifts;
  }
};

export const groupShiftsByDate = shifts => {
  if (shifts) {
    const sectionsToShow = {};

    shifts.forEach(dates => {
      const getTitle = showDateTitle(dates.startTime);
      if (getTitle && !Array.isArray(sectionsToShow[getTitle])) {
        Object.assign(sectionsToShow, {
          [getTitle]: [dates],
        });
      } else {
        sectionsToShow[getTitle].push({...dates});
      }
    });

    const formattedSections = map(sectionsToShow, (section, key) => {
      const filterOutOfTimeSections = filterOutOfTime(section);
      return {title: key, data: sortedShifts(filterOutOfTimeSections)};
    });

    return formattedSections;
  }
};

export const getHoursAndMinutes = (startTimeValue, endTimeValue) => {
  const startTime = new Date(startTimeValue).toLocaleTimeString('en-US', {
    hour12: false,
    hour: 'numeric',
    minute: 'numeric',
  });
  const endTime = new Date(endTimeValue).toLocaleTimeString('en-US', {
    hour12: false,
    hour: 'numeric',
    minute: 'numeric',
  });

  return `${startTime}-${endTime}`;
};

export const getIsOverlapping = (shifts, shiftFromAction) => {
  let findOverLapping = [];
  if (shiftFromAction) {
    console.log('shiftFromAction ==', shiftFromAction);
    findOverLapping = shifts.map(shift => {
      shift.overlapping = false;
      if (shiftFromAction.booked) {
        if (
          shiftFromAction.startTime < shift.endTime &&
          shiftFromAction.endTime > shift.startTime &&
          !shift.booked
        ) {
          shift.overlapping = true;
        }
      }
      return shift;
    });
  } else {
    const filterByBooked = shifts.filter(shift => shift.booked);
    findOverLapping = shifts.map(shift => {
      shift.overlapping = false;
      filterByBooked.forEach(filterShift => {
        if (
          filterShift.startTime < shift.endTime &&
          filterShift.endTime > shift.startTime &&
          !shift.booked
        ) {
          shift.overlapping = true;
        }
      });
      return shift;
    });
  }

  return findOverLapping;
};
