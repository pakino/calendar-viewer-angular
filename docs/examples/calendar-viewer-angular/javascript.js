angular
  .module('mwl.calendar.docs')//,['mwl.calendar', 'ui.bootstrap', 'ngAnimate'])
  .controller('CalendarCtrl', function(moment, alert, calendarConfig, $scope, $location, $anchorScroll) {
    var vm = this;

    //These variables MUST be set as a minimum for the calendar to work
    vm.calendarView = 'month';
    vm.viewDate = new Date();
    var actions = [{
      label: '<span class=\'glyphicon glyphicon-remove\'></span>',
      onClick: function(args) {
        vm.events.splice( args.calendarEvent.$id, 1);
        vm.backup = vm.events;
      }
    }];
    vm.events = [
      {
        title: 'Event 1',
        description: 'This is an example of description',
        tag: 'work,blog',
        color: calendarConfig.colorTypes.warning,
        startsAt: moment().startOf('week').subtract(2, 'days').add(8, 'hours').toDate(),
        endsAt: moment().startOf('week').add(1, 'week').add(9, 'hours').toDate(),
        draggable: true,
        resizable: true,
        actions: actions
      }, {
        title: 'Event 2',
        description: 'This is an example of description',
        tag: 'blog',
        color: calendarConfig.colorTypes.info,
        startsAt: moment().subtract(1, 'day').toDate(),
        endsAt: moment().add(5, 'days').toDate(),
        draggable: true,
        resizable: true,
        actions: actions
      }, {
        title: 'Event 3',
        description: 'This is an example of description',
        tag:  'work',
        color: calendarConfig.colorTypes.important,
        startsAt: moment().startOf('day').add(7, 'hours').toDate(),
        endsAt: moment().startOf('day').add(19, 'hours').toDate(),
        recursOn: 'year',
        draggable: true,
        resizable: true,
        actions: actions
      }, {
        title: 'Event 4',
        description: 'This is an example of description',
        tag: 'home',
        color: calendarConfig.colorTypes.info,
        startsAt: moment().subtract(0, 'day').toDate(),
        endsAt: moment().add(5, 'days').toDate(),
        draggable: true,
        resizable: true,
        actions: actions
      }
    ];
    vm.backup = vm.events;

    vm.cellIsOpen = true;

    vm.addEvent = function() {
      vm.events.push({
        title: '*** New event ****',
        description: 'This is an example of description',
        tag: 'test',
        color: calendarConfig.colorTypes.important,
        startsAt: moment().startOf('day').toDate(),
        endsAt: moment().endOf('day').toDate(),
        draggable: true,
        resizable: true,
        actions: actions
      });
      vm.backup = vm.events;
      //move to the position of the element
      var newHash = 'el'+(vm.backup.length-1);
      if ($location.hash() !== newHash) {
        $location.hash('el'+(vm.backup.length-1));
      } else {
        $anchorScroll();
      }
    };

    vm.eventClicked = function(event) {
      alert.show('Clicked', event);
    };

    vm.eventEdited = function(event) {
      alert.show('Edited', event);
    };

    vm.eventDeleted = function(event) {
      alert.show('Deleted', event);
    };

    vm.eventTimesChanged = function(event) {
      alert.show('Dropped or resized', event);
    };

    vm.toggle = function($event, field, event) {
      $event.preventDefault();
      $event.stopPropagation();
      event[field] = !event[field];
    };

    vm.timespanClicked = function(date, cell) {

      if (vm.calendarView === 'month') {
        if ((vm.cellIsOpen && moment(date).startOf('day').isSame(moment(vm.viewDate).startOf('day'))) || cell.events.length === 0 || !cell.inMonth) {
          vm.cellIsOpen = false;
        } else {
          vm.cellIsOpen = true;
          vm.viewDate = date;
        }
      } else if (vm.calendarView === 'year') {
        if ((vm.cellIsOpen && moment(date).startOf('month').isSame(moment(vm.viewDate).startOf('month'))) || cell.events.length === 0) {
          vm.cellIsOpen = false;
        } else {
          vm.cellIsOpen = true;
          vm.viewDate = date;
        }
      }

    };

    //check for the tag search and filter the data based on tag
    $scope.$watch('searchTags', function(val){
      if(val){
        var a = [];
        var x=0;
        for (var i = 0; i < vm.backup.length; i++) {
          var val2 = val.split(',');
          var tags = vm.backup[i].tag.split(',');
          for (var j = 0; j < val2.length; j++) {
            for (var k = 0; k < tags.length; k++) {
              if (tags[k].toLowerCase() === val2[j].toLowerCase() && val2[j].length>0 && tags[k].length>0) {
                if(a.indexOf(vm.backup[i]) == -1){
                  a[x] = vm.backup[i];
                  x++;
                }
              }
            }
          }
        }
        vm.events = a;
      }else{
        vm.events = vm.backup;
      }
    });

  });
