'use strict';

var angular = require('angular');

angular
  .module('mwl.calendar')
  .factory('calendarEventTitle', function(calendarDateFilter, calendarTruncateEventTitleFilter) {

    function yearView(event) {
      return event.title + ' (' + calendarDateFilter(event.startsAt, 'datetime', true) + ')';
    }

    function monthView(event) {
      return calendarDateFilter(event.startsAt, 'time', true) + ' - <b>' + event.title + '</b> - <i>' + event.description + '</i> ';
    }

    function monthViewTooltip(event) {
      return calendarDateFilter(event.startsAt, 'time', true) + ' - <b>' + event.title + '</b> - <i>' + event.description + '</i> ';
    }

    function weekView(event) {
      return '<b>' + event.title + '</b> - <i>' + event.description + '</i> ';
    }

    function weekViewTooltip(event) {
      return event.title;
    }

    function dayView(event) {
      return !event.allDay ? '<b>' + event.title + '</b> - <i>' + event.description + '</i> ' : calendarTruncateEventTitleFilter(event.title, 20, event.height);
    }

    return {
      yearView: yearView,
      monthView: monthView,
      monthViewTooltip: monthViewTooltip,
      weekView: weekView,
      weekViewTooltip: weekViewTooltip,
      dayView: dayView
    };

  });
