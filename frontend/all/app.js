new Vue({
    el: '#app',
    data: {
      tabs: ['Timesheet', 'Workers', 'Employers', 'Absence Types'],
      activeTab: 0
    },
    methods: {
      changeTab(index) {
        this.activeTab = index;
      }
    }
  });