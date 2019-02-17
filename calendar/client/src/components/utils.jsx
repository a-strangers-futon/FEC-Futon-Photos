import moment from 'moment';
import _ from 'underscore';
import React from 'react';

const todayToString = function() {
  return moment().startOf('day').toDate().toISOString();
};

export const isoDateStringToReadable = function(isoDateString) {
  if (isoDateString === null) {
    return '';
  }
  return moment(isoDateString).format("MM/DD/YYYY");
};

export const dateRange = function(start, end) {
  var startMoment = moment(start);
  var endMoment = moment(end);
  var result = [];

  while (startMoment <= endMoment) {
    result.push(startMoment.toDate().toISOString());
    startMoment = startMoment.add(1, 'day');
  }
  return result;
}

export const calendarHeaderItems = (
  <div className="calendar-row">
    {_.map(['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'], (dow) => <div className="calendar-header-item">{dow}</div>)}
  </div>
  );

export const cleanSchedule = function (jsonResp) {
  var today = todayToString();
  var cleaned = {};
  for (var row of jsonResp[0].datesTaken) {
    var dateString = row.timestamp;
    var date = new Date(dateString);
    cleaned[dateString] = {text: date.getDate(), isTaken: row.taken || dateString <= today, dateString: dateString, isSelected: false, isTmpTaken: false, isHighlighted: false, isHoverable: false};
  }
  return cleaned;
}

export const buildCalGrid = function (month, year, schedule) {
  var grid = {0: {}};
  var m = moment().month(month).year(year).startOf('month');

  for (var i=0; i<m.day(); i++) {
    grid[0][i] = null;
  }

  var currWeek = 0;
  while (m.month() === month) {
    if (!grid[currWeek]) grid[currWeek] = {};
    grid[currWeek][m.day()] = schedule[m.toDate().toISOString()];

    m = m.add(1, 'day');

    if (m.day() === 0) {
      currWeek++;
    }
  }
  return grid;
};


export const buildDateString = function (date, month, year) {
  return moment().month(month).year(year).date(date).startOf('day').toDate().toIsoString();
}
