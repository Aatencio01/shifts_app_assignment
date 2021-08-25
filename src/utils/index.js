import groupBy from 'lodash/groupBy';
import map from 'lodash/map';

const DATE_OPTIONS = {
  month: 'long',
  day: 'numeric',
};

export const Variables = {
  API_BASE_URL: 'http://127.0.0.1:8080',
};

export const CompareAndShowDateTitle = date => {
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

export const OrderShiftsByArea = shifts => {
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

export const OrderShiftsByDate = shifts => {
  if (shifts) {
    const sectionsToShow = {};

    shifts.forEach(dates => {
      const getTitle = CompareAndShowDateTitle(dates.startTime);
      if (getTitle && !Array.isArray(sectionsToShow[getTitle])) {
        Object.assign(sectionsToShow, {
          [getTitle]: [dates],
        });
      } else {
        sectionsToShow[getTitle].push({...dates});
      }
    });

    const formattedSections = map(sectionsToShow, (section, key) => {
      return {title: key, data: section};
    });

    return formattedSections;
  }
};
