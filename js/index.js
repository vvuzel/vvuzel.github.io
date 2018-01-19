(function(){
  'use strict'
  angular.module('angularDemo', ['ngMaterial']);

  angular.module('angularDemo').controller('angularController', 
                                           ['$scope','PlaceDataService', function($scope, PlaceDataService) { 
    var places = PlaceDataService.getSampleData();
    $scope.Parkinglots = places; //use $scope to expose to the view

    //create checkbox filters on the fly with dynamic data
    var filters = [];
    _.each(places, function(place) {
      _.each(place.properties, function(property) {      
        var existingFilter = _.findWhere(filters, { name: property.name });

        if (existingFilter) {
          var existingOption = _.findWhere(existingFilter.options, { value: property.value });
          if (existingOption) {
            existingOption.count += 1;
          } else {
            existingFilter.options.push({ value: property.value, count: 1 }); 
          }   
        } else {
          var filter = {};
          filter.name = property.name;
          filter.options = [];
          filter.options.push({ value: property.value, count: 1 });
          filters.push(filter);      
        }   
      });
    });
    $scope.Filters = filters;

    this.toggleAll = function($event, includeAll) {       
      _.each(filters, function(filterCategory) {      
        _.each(filterCategory.options, function(option) {
          option.IsIncluded = includeAll;
        });
      });    
    };
  }]);

  angular.module('angularDemo').filter('dynamicFilter', function () {
    return function (places, filterCategories, scope) {
      var filtered = [];

      var placeFilters = _.filter(filterCategories, function(fc) {
        return  _.any(fc.options, { 'IsIncluded': true });
      });

      _.each(places, function(prod) {
        var includeplace = true;
        _.each(placeFilters, function(filter) {
          var props = _.filter(prod.properties, { 'name': filter.name });
          if (!_.any(props, function(prop) { return _.any(filter.options, { 'value': prop.value, 'IsIncluded': true }); })) {
            includeplace = false;
          }
        });
        if (includeplace) {
          filtered.push(prod);
        }
      });
      return filtered;
    };
  });

  angular.module('angularDemo').service('PlaceDataService', function() {
    var service = {};

    //sample data
    var places = [
    {
        number: '405-1-000001',
        name: '탑동입구 공영주차장',
        address: '제주특별자치도 제주시 건입동 임항로(탑동24시 편의점 옆)',
        week: '평일,토요일,공휴일',
        time: '11:00~21:00',
        charge: '유료',
        properties: [
          { name:'지역', value:'건입동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'유료' }
        ]
      },
    {
        number: '405-1-000002',
        name: '신제주로터리',
        address: '제주특별자치도 제주시 연동 신제주로터리(신대로)',
        week: '평일',
        time: '9:00~18:00',
        charge: '유료',
        properties: [
          { name:'지역', value:'연동' },
          { name:'운영요일', value:'평일' },
          { name:'요금정보', value:'유료' }
        ]
      },
    {
        number: '405-1-000003',
        name: '동문재래시장(노상) 공영주차장',
        address: '제주특별자치도 제주시 이도1동 1491-1',
        week: '평일,토요일',
        time: '9:00~18:30',
        charge: '유료',
        properties: [
          { name:'지역', value:'이도1동' },
          { name:'운영요일', value:'평일,토요일' },
          { name:'요금정보', value:'유료' }
        ]
      },
    {
        number: '405-1-000004',
        name: '중앙로터리',
        address: '제주특별자치도 제주시 이도1동 중앙로터리',
        week: '평일,토요일,공휴일',
        time: '9:00~21:00',
        charge: '유료',
        properties: [
          { name:'지역', value:'이도1동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'유료' }
        ]
      },
    {
        number: '405-1-000005',
        name: '시청 앞 공영주차장',
        address: '제주특별자치도 제주시 이도2동 시청앞 ~ 열린정보센터',
        week: '평일',
        time: '9:00~18:00',
        charge: '유료',
        properties: [
          { name:'지역', value:'이도2동' },
          { name:'운영요일', value:'평일' },
          { name:'요금정보', value:'유료' }
        ]
      },
    {
        number: '405-2-000001',
        name: '용두암 주차장',
        address: '제주특별자치도 제주시 제주특별자치도 제주시 용담2동483',
        week: '평일,토요일,공휴일',
        time: '9:00~18:30',
        charge: '유료',
        properties: [
          { name:'지역', value:'용담동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'유료' }
        ]
      },
    {
        number: '405-2-000002',
        name: '공항입구주차장',
        address: '제주특별자치도 제주시 제주특별자치도 제주시 용담2동1611,1624-1',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '유료',
        properties: [
          { name:'지역', value:'용담동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'유료' }
        ]
      },
    {
        number: '405-2-000003',
        name: '탑동제2주차장',
        address: '제주특별자치도 제주시 제주특별자치도 제주시 삼도2동1257',
        week: '공휴일',
        time: '12:00~22:00',
        charge: '유료',
        properties: [
          { name:'지역', value:'삼도2동' },
          { name:'운영요일', value:'공휴일' },
          { name:'요금정보', value:'유료' }
        ]
      },
    {
        number: '405-2-000004',
        name: '칠성골',
        address: '제주특별자치도 제주시 제주특별자치도 제주시 삼도2동1192-8',
        week: '평일,토요일,공휴일',
        time: '11:00~21:00',
        charge: '유료',
        properties: [
          { name:'지역', value:'삼도2동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'유료' }
        ]
      },
    {
        number: '405-2-000005',
        name: '병문주차장',
        address: '제주특별자치도 제주시 제주특별자치도 제주시 삼도2동1227-7',
        week: '평일',
        time: '9:00~18:30',
        charge: '유료',
        properties: [
          { name:'지역', value:'삼도2동' },
          { name:'운영요일', value:'평일' },
          { name:'요금정보', value:'유료' }
        ]
      },
    {
        number: '405-2-000006',
        name: '고산동산주차장',
        address: '제주특별자치도 제주시 제주특별자치도 제주시 이도2동1012-10',
        week: '평일,토요일',
        time: '9:00~19:00',
        charge: '유료',
        properties: [
          { name:'지역', value:'이도2동' },
          { name:'운영요일', value:'평일,토요일' },
          { name:'요금정보', value:'유료' }
        ]
      },
    {
        number: '405-2-000007',
        name: '신제주공영주차장',
        address: '제주특별자치도 제주시 제주특별자치도 제주시 연동272-31',
        week: '평일,토요일,공휴일',
        time: '13:00~23:00',
        charge: '유료',
        properties: [
          { name:'지역', value:'연동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'유료' }
        ]
      },
    {
        number: '405-2-000008',
        name: '인제주차장',
        address: '제주특별자치도 제주시 제주특별자치도 제주시 일도2동409-11',
        week: '평일',
        time: '12:00~22:00',
        charge: '유료',
        properties: [
          { name:'지역', value:'일도2동' },
          { name:'운영요일', value:'평일' },
          { name:'요금정보', value:'유료' }
        ]
      },
    {
        number: '405-2-000009',
        name: '제일주차빌딩',
        address: '제주특별자치도 제주시 제주특별자치도 제주시 일도1동1476-33',
        week: '평일,토요일,공휴일',
        time: '8:00~23:00',
        charge: '유료',
        properties: [
          { name:'지역', value:'일도1동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'유료' }
        ]
      },
    {
        number: '405-2-000010',
        name: '법원 북측',
        address: '제주특별자치도 제주시 제주특별자치도 제주시 이도2동1066',
        week: '평일',
        time: '9:00~19:00',
        charge: '유료',
        properties: [
          { name:'지역', value:'이도2동' },
          { name:'운영요일', value:'평일' },
          { name:'요금정보', value:'유료' }
        ]
      },
    {
        number: '405-2-000011',
        name: '동문재래시장',
        address: '제주특별자치도 제주시 제주특별자치도 제주시 이도1동1330-5',
        week: '평일,토요일',
        time: '9:00~18:30',
        charge: '유료',
        properties: [
          { name:'지역', value:'이도1동' },
          { name:'운영요일', value:'평일,토요일' },
          { name:'요금정보', value:'유료' }
        ]
      },
    {
        number: '405-2-000012',
        name: '성신로',
        address: '제주특별자치도 제주시 제주특별자치도 제주시 연동2322-7',
        week: '평일',
        time: '9:00~19:00',
        charge: '유료',
        properties: [
          { name:'지역', value:'연동' },
          { name:'운영요일', value:'평일' },
          { name:'요금정보', value:'유료' }
        ]
      },
    {
        number: '405-2-000013',
        name: '칠성상가제1',
        address: '제주특별자치도 제주시 제주특별자치도 제주시 일도1동1476-1,20',
        week: '평일',
        time: '12:00~18:00',
        charge: '유료',
        properties: [
          { name:'지역', value:'일도1동' },
          { name:'운영요일', value:'평일' },
          { name:'요금정보', value:'유료' }
        ]
      },
    {
        number: '405-2-000014',
        name: '광양초 서측 주차장',
        address: '제주특별자치도 제주시 제주특별자치도 제주시 이도1동1257-4,8,9,10',
        week: '평일',
        time: '8:30~18:00',
        charge: '유료',
        properties: [
          { name:'지역', value:'이도1동' },
          { name:'운영요일', value:'평일' },
          { name:'요금정보', value:'유료' }
        ]
      },
    {
        number: '405-2-000015',
        name: '칠성상가제2',
        address: '제주특별자치도 제주시 제주특별자치도 제주시 일도1동1401-13',
        week: '평일',
        time: '12:00~18:00',
        charge: '유료',
        properties: [
          { name:'지역', value:'일도1동' },
          { name:'운영요일', value:'평일' },
          { name:'요금정보', value:'유료' }
        ]
      },
    {
        number: '405-2-000016',
        name: '이도2동주민센터 앞',
        address: '제주특별자치도 제주시 제주특별자치도 제주시 이도2동1052-2',
        week: '평일',
        time: '9:00~19:00',
        charge: '유료',
        properties: [
          { name:'지역', value:'이도2동' },
          { name:'운영요일', value:'평일' },
          { name:'요금정보', value:'유료' }
        ]
      },
    {
        number: '405-2-000017',
        name: '동문버스주차',
        address: '제주특별자치도 제주시 제주특별자치도 제주시 일도2동1104외6',
        week: '평일',
        time: '9:00~18:30',
        charge: '유료',
        properties: [
          { name:'지역', value:'일도2동' },
          { name:'운영요일', value:'평일' },
          { name:'요금정보', value:'유료' }
        ]
      },
    {
        number: '405-2-000018',
        name: '동문주차빌딩',
        address: '제주특별자치도 제주시 제주특별자치도 제주시 일도1동1106',
        week: '평일',
        time: '8:00~20:00',
        charge: '유료',
        properties: [
          { name:'지역', value:'일도1동' },
          { name:'운영요일', value:'평일' },
          { name:'요금정보', value:'유료' }
        ]
      },
    {
        number: '405-2-000019',
        name: '관덕정서측',
        address: '제주특별자치도 제주시 제주특별자치도 제주시 삼도2동1024',
        week: '평일,토요일',
        time: '10:00~19:00',
        charge: '유료',
        properties: [
          { name:'지역', value:'삼도동' },
          { name:'운영요일', value:'평일,토요일' },
          { name:'요금정보', value:'유료' }
        ]
      },
    {
        number: '405-2-000020',
        name: '탑동제1주차장',
        address: '제주특별자치도 제주시 제주특별자치도 제주시 삼도2동1263',
        week: '평일',
        time: '10:00~19:00',
        charge: '유료',
        properties: [
          { name:'지역', value:'삼도2동' },
          { name:'운영요일', value:'평일' },
          { name:'요금정보', value:'유료' }
        ]
      },
    {
        number: '405-2-000021',
        name: '도두동 무료 주차장',
        address: '제주특별자치도 제주시 도두1동2629',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'도두동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000022',
        name: '도두동 무료 주차장',
        address: '제주특별자치도 제주시 도두1동2618-0',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'도두동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000023',
        name: '도두동 무료 주차장',
        address: '제주특별자치도 제주시 도두1동1211 외',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'도두동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000024',
        name: '삼양동 무료 주차장',
        address: '제주특별자치도 제주시 삼양1동1579-0',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'삼양동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000025',
        name: '삼양동 무료 주차장',
        address: '제주특별자치도 제주시 삼양1동1598-1',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'삼양동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000026',
        name: '삼양동 무료 주차장',
        address: '제주특별자치도 제주시 삼양1동1628-6',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'삼양동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000027',
        name: '삼양동 무료 주차장',
        address: '제주특별자치도 제주시 삼양1동1657-7',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'삼양동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000028',
        name: '삼양동 무료 주차장',
        address: '제주특별자치도 제주시 삼양2동2133-4',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'삼양동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000029',
        name: '삼양동 무료 주차장',
        address: '제주특별자치도 제주시 삼양2동2176-12',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'삼양동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000030',
        name: '삼양동 무료 주차장',
        address: '제주특별자치도 제주시 삼양2동2135-9',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'삼양동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000031',
        name: '삼양동 무료 주차장',
        address: '제주특별자치도 제주시 삼양1동1592-1',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'삼양동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000032',
        name: '삼양동 무료 주차장',
        address: '제주특별자치도 제주시 삼양1동1569-40',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'삼양동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000033',
        name: '용담이동 무료 주차장',
        address: '제주특별자치도 제주시 용담2동928-31',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'용담동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000034',
        name: '용담이동 무료 주차장',
        address: '제주특별자치도 제주시 용담2동928-89',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'용담동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000035',
        name: '용담이동 무료 주차장',
        address: '제주특별자치도 제주시 용담3동519-11',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'용담동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000036',
        name: '용담이동 무료 주차장',
        address: '제주특별자치도 제주시 용담3동2396-0',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'용담동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000037',
        name: '용담이동 무료 주차장',
        address: '제주특별자치도 제주시 용담2동2686-6',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'용담동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000038',
        name: '용담이동 무료 주차장',
        address: '제주특별자치도 제주시 용담3동1070',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'용담동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000039',
        name: '삼도이동 무료 주차장',
        address: '제주특별자치도 제주시 삼도2동807-0',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'삼도동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000040',
        name: '삼도이동 무료 주차장',
        address: '제주특별자치도 제주시 삼도2동807-3,15',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'삼도동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000041',
        name: '삼도이동 무료 주차장',
        address: '제주특별자치도 제주시 삼도2동1158-99,100',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'삼도동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000042',
        name: '삼도이동 무료 주차장',
        address: '제주특별자치도 제주시 삼도2동1158-32',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'삼도동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000043',
        name: '이도일동 무료 주차장',
        address: '제주특별자치도 제주시 이도1동1285-1외3',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'이도1동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000044',
        name: '이도일동 무료 주차장',
        address: '제주특별자치도 제주시 이도1동1554-0',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'이도1동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000045',
        name: '이도일동 무료 주차장',
        address: '제주특별자치도 제주시 이도1동1261-1,1255-1',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'이도1동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000046',
        name: '이도일동 무료 주차장',
        address: '제주특별자치도 제주시 이도1동1348-0',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'이도1동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000047',
        name: '이도일동 무료 주차장',
        address: '제주특별자치도 제주시 이도1동1502-1',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'이도1동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000048',
        name: '이도이동 무료 주차장',
        address: '제주특별자치도 제주시 이도2동1035-3',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'이도2동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000049',
        name: '이도이동 무료 주차장',
        address: '제주특별자치도 제주시 도남동65-2',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'이도2동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000050',
        name: '이도이동 무료 주차장',
        address: '제주특별자치도 제주시 도남동57-2',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'이도2동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000051',
        name: '이도이동 무료 주차장',
        address: '제주특별자치도 제주시 이도2동1028-0',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'이도2동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000052',
        name: '이도이동 무료 주차장',
        address: '제주특별자치도 제주시 이도2동424',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'이도2동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000053',
        name: '이도이동 무료 주차장',
        address: '제주특별자치도 제주시 이도2동1063-13',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'이도2동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000054',
        name: '이도이동 무료 주차장',
        address: '제주특별자치도 제주시 이도2동1909-74',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'이도2동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000055',
        name: '이도이동 무료 주차장',
        address: '제주특별자치도 제주시 도남동574-2',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'이도2동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000056',
        name: '이도이동 무료 주차장',
        address: '제주특별자치도 제주시 도남동689-6',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'이도2동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000057',
        name: '이도이동 무료 주차장',
        address: '제주특별자치도 제주시 도남동742-0',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'이도2동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000058',
        name: '이도이동 무료 주차장',
        address: '제주특별자치도 제주시 도남동703-7',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'이도2동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000059',
        name: '이도이동 무료 주차장',
        address: '제주특별자치도 제주시 도남동705-13',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'이도2동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000060',
        name: '이도이동 무료 주차장',
        address: '제주특별자치도 제주시 도남동735-0',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'이도2동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000061',
        name: '이도이동 무료 주차장',
        address: '제주특별자치도 제주시 도남동769-8',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'이도2동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000062',
        name: '이도이동 무료 주차장',
        address: '제주특별자치도 제주시 도남동755-0',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'이도2동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000063',
        name: '이도이동 무료 주차장',
        address: '제주특별자치도 제주시 도남동748-7',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'이도2동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000064',
        name: '이도이동 무료 주차장',
        address: '제주특별자치도 제주시 도남동664-5',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'이도2동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000065',
        name: '용담일동 무료 주차장',
        address: '제주특별자치도 제주시 용담1동137-54외5',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'용담동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000066',
        name: '용담일동 무료 주차장',
        address: '제주특별자치도 제주시 용담1동292-9',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'용담동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000067',
        name: '용담일동 무료 주차장',
        address: '제주특별자치도 제주시 용담1동295-40,295-48',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'용담동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000068',
        name: '용담일동 무료 주차장',
        address: '제주특별자치도 제주시 용담1동220-10',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'용담동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000069',
        name: '용담일동 무료 주차장',
        address: '제주특별자치도 제주시 용담1동220-16',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'용담동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000070',
        name: '연동 무료 주차장',
        address: '제주특별자치도 제주시 연동299-12',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'연동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000071',
        name: '연동 무료 주차장',
        address: '제주특별자치도 제주시 연동1458-1',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'연동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000072',
        name: '연동 무료 주차장',
        address: '제주특별자치도 제주시 연동1499',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'연동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000073',
        name: '연동 무료 주차장',
        address: '제주특별자치도 제주시 연동1504',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'연동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000074',
        name: '연동 무료 주차장',
        address: '제주특별자치도 제주시 연동1517',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'연동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000075',
        name: '연동 무료 주차장',
        address: '제주특별자치도 제주시 연동1519-1',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'연동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000076',
        name: '연동 무료 주차장',
        address: '제주특별자치도 제주시 연동1957-0',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'연동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000077',
        name: '연동 무료 주차장',
        address: '제주특별자치도 제주시 연동2305-6',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'연동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000078',
        name: '연동 무료 주차장',
        address: '제주특별자치도 제주시 연동2303-10',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'연동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000079',
        name: '일도이동 무료 주차장',
        address: '제주특별자치도 제주시 일도2동82-7',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'일도2동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000080',
        name: '일도이동 무료 주차장',
        address: '제주특별자치도 제주시 일도2동878',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'일도2동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000081',
        name: '외도동 무료 주차장',
        address: '제주특별자치도 제주시 외도1동417-5',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'외도동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000082',
        name: '외도동 무료 주차장',
        address: '제주특별자치도 제주시 외도1동440-6',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'외도동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000083',
        name: '외도동 무료 주차장',
        address: '제주특별자치도 제주시 외도1동448-2',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'외도동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000084',
        name: '외도동 무료 주차장',
        address: '제주특별자치도 제주시 외도1동453-0',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'외도동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000085',
        name: '외도동 무료 주차장',
        address: '제주특별자치도 제주시 외도1동482-0',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'외도동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000086',
        name: '외도동 무료 주차장',
        address: '제주특별자치도 제주시 외도1동493-0',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'외도동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000087',
        name: '외도동 무료 주차장',
        address: '제주특별자치도 제주시 외도1동496-16',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'외도동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000088',
        name: '외도동 무료 주차장',
        address: '제주특별자치도 제주시 외도1동497-15',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'외도동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000089',
        name: '외도동 무료 주차장',
        address: '제주특별자치도 제주시 외도1동530-3',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'외도동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000090',
        name: '외도동 무료 주차장',
        address: '제주특별자치도 제주시 외도1동542-17',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'외도동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000091',
        name: '외도동 무료 주차장',
        address: '제주특별자치도 제주시 외도1동559-0',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'외도동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000092',
        name: '외도동 무료 주차장',
        address: '제주특별자치도 제주시 외도1동632-6',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'외도동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000093',
        name: '외도동 무료 주차장',
        address: '제주특별자치도 제주시 외도2동233-7',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'외도동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000094',
        name: '노형동 무료 주차장',
        address: '제주특별자치도 제주시 노형동710-3',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'노형동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000095',
        name: '노형동 무료 주차장',
        address: '제주특별자치도 제주시 노형동736',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'노형동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000096',
        name: '노형동 무료 주차장',
        address: '제주특별자치도 제주시 노형동751',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'노형동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000097',
        name: '노형동 무료 주차장',
        address: '제주특별자치도 제주시 노형동1293-1',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'노형동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000098',
        name: '노형동 무료 주차장',
        address: '제주특별자치도 제주시 노형동1290-2',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'노형동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000099',
        name: '노형동 무료 주차장',
        address: '제주특별자치도 제주시 노형동1043-0',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'노형동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000100',
        name: '노형동 무료 주차장',
        address: '제주특별자치도 제주시 노형동1282-0',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'노형동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000101',
        name: '노형동 무료 주차장',
        address: '제주특별자치도 제주시 노형동2512-1,1',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'노형동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000102',
        name: '노형동 무료 주차장',
        address: '제주특별자치도 제주시 노형동2517-1,1',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'노형동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000103',
        name: '노형동 무료 주차장',
        address: '제주특별자치도 제주시 노형동2612-1',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'노형동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000104',
        name: '노형동 무료 주차장',
        address: '제주특별자치도 제주시 노형동2534-2',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'노형동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000105',
        name: '노형동 무료 주차장',
        address: '제주특별자치도 제주시 노형동2575-0',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'노형동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000106',
        name: '노형동 무료 주차장',
        address: '제주특별자치도 제주시 노형동2580-0',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'노형동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000107',
        name: '노형동 무료 주차장',
        address: '제주특별자치도 제주시 노형동2589-0',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'노형동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000108',
        name: '노형동 무료 주차장',
        address: '제주특별자치도 제주시 노형동2595-6',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'노형동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000109',
        name: '건입동 무료 주차장',
        address: '제주특별자치도 제주시 건입동697-1,5',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'건입동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000110',
        name: '건입동 무료 주차장',
        address: '제주특별자치도 제주시 건입동1189-0',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'건입동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000111',
        name: '건입동 무료 주차장',
        address: '제주특별자치도 제주시 건입동1042-2,0',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'건입동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000112',
        name: '이호동 무료 주차장',
        address: '제주특별자치도 제주시 이호1동1788-5',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'이호동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000113',
        name: '이호동 무료 주차장',
        address: '제주특별자치도 제주시 이호1동1665-10',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'이호동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000114',
        name: '화북동 무료 주차장',
        address: '제주특별자치도 제주시 화북1동11-6',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'화북동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000115',
        name: '화북동 무료 주차장',
        address: '제주특별자치도 제주시 화북1동14-0',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'화북동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000116',
        name: '연동 무료 주차장',
        address: '제주특별자치도 제주시 연동291-20',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'연동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000117',
        name: '화북동 무료 주차장',
        address: '제주특별자치도 제주시 화북1동1619-6',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'화북동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000118',
        name: '일도이동 무료 주차장',
        address: '제주특별자치도 제주시 일도2동991-37',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'일도2동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000119',
        name: '화북동 무료 주차장',
        address: '제주특별자치도 제주시 화북1동1935',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'화북동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000120',
        name: '화북동 무료 주차장',
        address: '제주특별자치도 제주시 화북1동1930-3',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'화북동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000121',
        name: '화북동 무료 주차장',
        address: '제주특별자치도 제주시 화북1동1951-4',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'화북동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000122',
        name: '화북동 무료 주차장',
        address: '제주특별자치도 제주시 화북1동2130-5',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'화북동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000123',
        name: '삼도일동 무료 주차장',
        address: '제주특별자치도 제주시 삼도1동560-1',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'삼도동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000124',
        name: '삼도일동 무료 주차장',
        address: '제주특별자치도 제주시 삼도1동533-9',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'삼도동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000125',
        name: '삼양동 무료 주차장',
        address: '제주특별자치도 제주시 삼양2동1665-0',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'삼양동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000126',
        name: '연동 무료 주차장',
        address: '제주특별자치도 제주시 연동999',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'연동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000127',
        name: '연동 무료 주차장',
        address: '제주특별자치도 제주시 연동302-3',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'연동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000128',
        name: '연동 무료 주차장',
        address: '제주특별자치도 제주시 연동315',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'연동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000129',
        name: '오라동 무료 주차장',
        address: '제주특별자치도 제주시 오라1동1163-3',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'오라동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000130',
        name: '일도이동 무료 주차장',
        address: '제주특별자치도 제주시 일도2동160',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'일도2동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000131',
        name: '노형동 무료 주차장',
        address: '제주특별자치도 제주시 노형동1423-0',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'노형동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000132',
        name: '화북동 무료 주차장',
        address: '제주특별자치도 제주시 화북1동 1984-1,1',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'화북동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000133',
        name: '이도이동 무료 주차장',
        address: '제주특별자치도 제주시 이도2동 429-6',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'이도2동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000134',
        name: '봉개동 무료 주차장',
        address: '제주특별자치도 제주시 봉개동산78-0',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'봉개동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000135',
        name: '건입동 무료 주차장',
        address: '제주특별자치도 제주시 건입동918-29',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'건입동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000136',
        name: '오라동 무료 주차장',
        address: '제주특별자치도 제주시 오라2동99',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'오라동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000137',
        name: '건입동 무료 주차장',
        address: '제주특별자치도 제주시 건입동1176',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'건입동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000138',
        name: '이도이동 무료 주차장',
        address: '제주특별자치도 제주시 이도2동417-3',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'이도2동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000139',
        name: '일도이동 무료 주차장',
        address: '제주특별자치도 제주시 일도2동488-1,1',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'일도2동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000140',
        name: '이도이동 무료 주차장',
        address: '제주특별자치도 제주시 이도2동2040-1',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'이도2동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000141',
        name: '이도이동 무료 주차장',
        address: '제주특별자치도 제주시 이도2동2035-9',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'이도2동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000142',
        name: '이도이동 무료 주차장',
        address: '제주특별자치도 제주시 이도2동2030-3',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'이도2동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000143',
        name: '이도이동 무료 주차장',
        address: '제주특별자치도 제주시 이도2동2026-8',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'이도2동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000144',
        name: '이도이동 무료 주차장',
        address: '제주특별자치도 제주시 이도2동1998-8',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'이도2동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000145',
        name: '이도이동 무료 주차장',
        address: '제주특별자치도 제주시 이도2동1999-0',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'이도2동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000146',
        name: '이도이동 무료 주차장',
        address: '제주특별자치도 제주시 이도2동2003-6',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'이도2동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000147',
        name: '이도이동 무료 주차장',
        address: '제주특별자치도 제주시 이도2동2008-0',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'이도2동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000148',
        name: '이도이동 무료 주차장',
        address: '제주특별자치도 제주시 이도2동2021-11',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'이도2동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000149',
        name: '이도이동 무료 주차장',
        address: '제주특별자치도 제주시 이도2동2017-0',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'이도2동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000150',
        name: '이도이동 무료 주차장',
        address: '제주특별자치도 제주시 이도2동1992-6',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'이도2동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000151',
        name: '이도이동 무료 주차장',
        address: '제주특별자치도 제주시 이도2동1994-0',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'이도2동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000152',
        name: '이도이동 무료 주차장',
        address: '제주특별자치도 제주시 이도2동1977-6',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'이도2동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000153',
        name: '이도이동 무료 주차장',
        address: '제주특별자치도 제주시 이도2동1982-17',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'이도2동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000154',
        name: '이도이동 무료 주차장',
        address: '제주특별자치도 제주시 이도2동1982-15',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'이도2동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000155',
        name: '이도이동 무료 주차장',
        address: '제주특별자치도 제주시 이도2동1982-1',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'이도2동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000156',
        name: '이도이동 무료 주차장',
        address: '제주특별자치도 제주시 이도2동1982-3',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'이도2동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000157',
        name: '아라동 무료 주차장',
        address: '제주특별자치도 제주시 아라2동3013-1',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'아라동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000158',
        name: '아라동 무료 주차장',
        address: '제주특별자치도 제주시 아라2동3013-11',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'아라동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000159',
        name: '아라동 무료 주차장',
        address: '제주특별자치도 제주시 아라2동3002-1',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'아라동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000160',
        name: '아라동 무료 주차장',
        address: '제주특별자치도 제주시 아라2동3002-9',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'아라동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000161',
        name: '이도이동 무료 주차장',
        address: '제주특별자치도 제주시 이도2동1968-4',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'이도2동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000162',
        name: '아라동 무료 주차장',
        address: '제주특별자치도 제주시 아라2동3008-0',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'아라동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000163',
        name: '이도이동 무료 주차장',
        address: '제주특별자치도 제주시 이도2동1945-5',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'이도2동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000164',
        name: '이도이동 무료 주차장',
        address: '제주특별자치도 제주시 이도2동1960-2',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'이도2동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000165',
        name: '이도이동 무료 주차장',
        address: '제주특별자치도 제주시 이도2동1954-3',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'이도2동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000166',
        name: '용담이동 무료 주차장',
        address: '제주특별자치도 제주시 용담2동2690-18',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'용담동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000167',
        name: '삼도일동 무료 주차장',
        address: '제주특별자치도 제주시 삼도1동500-13',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'삼도동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000168',
        name: '화북동 무료 주차장',
        address: '제주특별자치도 제주시 화북1동1933-7',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'화북동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000169',
        name: '일도이동 무료 주차장',
        address: '제주특별자치도 제주시 일도2동1029-95',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'일도2동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000170',
        name: '삼양동 무료 주차장',
        address: '제주특별자치도 제주시 삼양2동2124-5',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'삼양동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000171',
        name: '건입동 무료 주차장',
        address: '제주특별자치도 제주시 건입동1077-46',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'건입동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000172',
        name: '화북동 무료 주차장',
        address: '제주특별자치도 제주시 화북1동4266-11',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'화북동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000173',
        name: '노형동 무료 주차장',
        address: '제주특별자치도 제주시 노형동 740-2,2',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'노형동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000174',
        name: '일도이동 무료 주차장',
        address: '제주특별자치도 제주시 일도2동984-2',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'일도2동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000175',
        name: '화북동 무료 주차장',
        address: '제주특별자치도 제주시 화북2동3378-4,5',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'화북동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000176',
        name: '일도이동 무료 주차장',
        address: '제주특별자치도 제주시 일도2동510,510',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'일도2동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000177',
        name: '오라동 무료 주차장',
        address: '제주특별자치도 제주시 오라2동1375-1,1375',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'오라동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000178',
        name: '일도이동 무료 주차장',
        address: '제주특별자치도 제주시 일도2동106',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'일도2동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000179',
        name: '일도이동 무료 주차장',
        address: '제주특별자치도 제주시 일도2동1036-5',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'일도2동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000180',
        name: '이도이동 무료 주차장',
        address: '제주특별자치도 제주시 도남동916-9',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'이도2동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000181',
        name: '삼도이동 무료 주차장',
        address: '제주특별자치도 제주시 삼도2동1167-6,6',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'삼도동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000182',
        name: '일도이동 무료 주차장',
        address: '제주특별자치도 제주시 일도2동111',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'일도2동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000183',
        name: '용담이동 무료 주차장',
        address: '제주특별자치도 제주시 용담2동358-11',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'용담동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000184',
        name: '이도일동 무료 주차장',
        address: '제주특별자치도 제주시 이도1동1704-5',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'이도1동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000185',
        name: '이도이동 무료 주차장',
        address: '제주특별자치도 제주시 도남동910-0',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'이도2동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000186',
        name: '일도이동 무료 주차장',
        address: '제주특별자치도 제주시 일도2동1006-34',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'일도2동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000187',
        name: '이도이동 무료 주차장',
        address: '제주특별자치도 제주시 이도2동8',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'이도2동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000188',
        name: '이도일동 무료 주차장',
        address: '제주특별자치도 제주시 이도1동1696-8',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'이도1동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000189',
        name: '용담일동 무료 주차장',
        address: '제주특별자치도 제주시 용담1동262-12',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'용담동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000190',
        name: '건입동 무료 주차장',
        address: '제주특별자치도 제주시 건입동1277-1',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'건입동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000191',
        name: '이도이동 무료 주차장',
        address: '제주특별자치도 제주시 이도2동374',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'이도2동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000192',
        name: '일도이동 무료 주차장',
        address: '제주특별자치도 제주시 일도2동88-0',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'일도2동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000193',
        name: '용담이동 무료 주차장',
        address: '제주특별자치도 제주시 용담2동1690',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'용담동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000194',
        name: '화북동 무료 주차장',
        address: '제주특별자치도 제주시 화북1동1936-6',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'화북동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000195',
        name: '일도이동 무료 주차장',
        address: '제주특별자치도 제주시 일도2동1029-98',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'일도2동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000196',
        name: '일도이동 무료 주차장',
        address: '제주특별자치도 제주시 일도2동1020-0',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'일도2동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000197',
        name: '이도이동 무료 주차장',
        address: '제주특별자치도 제주시 이도2동1063-11',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'이도2동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000198',
        name: '용담이동 무료 주차장',
        address: '제주특별자치도 제주시 용담2동2745-9',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'용담동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000199',
        name: '삼도일동 무료 주차장',
        address: '제주특별자치도 제주시 삼도1동508-13,3',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'삼도동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000200',
        name: '노형동 무료 주차장',
        address: '제주특별자치도 제주시 노형동3782',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'노형동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000201',
        name: '노형동 무료 주차장',
        address: '제주특별자치도 제주시 노형동3793',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'노형동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000202',
        name: '노형동 무료 주차장',
        address: '제주특별자치도 제주시 노형동3803-5',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'노형동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000203',
        name: '노형동 무료 주차장',
        address: '제주특별자치도 제주시 노형동3800-5',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'노형동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000204',
        name: '노형동 무료 주차장',
        address: '제주특별자치도 제주시 노형동3812-2',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'노형동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000205',
        name: '아라동 무료 주차장',
        address: '제주특별자치도 제주시 아라1동6046-4',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'아라동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000206',
        name: '아라동 무료 주차장',
        address: '제주특별자치도 제주시 아라1동6051-3',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'아라동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000207',
        name: '아라동 무료 주차장',
        address: '제주특별자치도 제주시 아라1동6059',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'아라동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000208',
        name: '아라동 무료 주차장',
        address: '제주특별자치도 제주시 아라1동6096',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'아라동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000209',
        name: '아라동 무료 주차장',
        address: '제주특별자치도 제주시 아라1동6093-3',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'아라동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000210',
        name: '아라동 무료 주차장',
        address: '제주특별자치도 제주시 아라1동6106-2',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'아라동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000211',
        name: '아라동 무료 주차장',
        address: '제주특별자치도 제주시 아라1동6110',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'아라동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000212',
        name: '아라동 무료 주차장',
        address: '제주특별자치도 제주시 아라1동6114-4',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'아라동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000213',
        name: '아라동 무료 주차장',
        address: '제주특별자치도 제주시 아라1동6122',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'아라동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000214',
        name: '아라동 무료 주차장',
        address: '제주특별자치도 제주시 아라1동6128-3',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'아라동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000215',
        name: '아라동 무료 주차장',
        address: '제주특별자치도 제주시 아라1동6130',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'아라동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000216',
        name: '아라동 무료 주차장',
        address: '제주특별자치도 제주시 아라1동6142-0',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'아라동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000217',
        name: '아라동 무료 주차장',
        address: '제주특별자치도 제주시 아라1동6158',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'아라동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000218',
        name: '아라동 무료 주차장',
        address: '제주특별자치도 제주시 아라1동6140-3',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'아라동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000219',
        name: '아라동 무료 주차장',
        address: '제주특별자치도 제주시 아라1동6068-8',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'아라동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000220',
        name: '아라동 무료 주차장',
        address: '제주특별자치도 제주시 아라1동6060',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'아라동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000221',
        name: '아라동 무료 주차장',
        address: '제주특별자치도 제주시 아라1동6064-3',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'아라동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000222',
        name: '아라동 무료 주차장',
        address: '제주특별자치도 제주시 아라1동6083-2',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'아라동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000223',
        name: '아라동 무료 주차장',
        address: '제주특별자치도 제주시 아라1동6075-5',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'아라동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000224',
        name: '아라동 무료 주차장',
        address: '제주특별자치도 제주시 아라1동6103-5',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'아라동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000225',
        name: '이도일동 무료 주차장',
        address: '제주특별자치도 제주시 이도1동1292-9',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'이도1동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000226',
        name: '일도이동 무료 주차장',
        address: '제주특별자치도 제주시 일도2동132-13',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'일도2동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000227',
        name: '건입동 무료 주차장',
        address: '제주특별자치도 제주시 건입동709-3',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'건입동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000228',
        name: '봉개동 무료 주차장',
        address: '제주특별자치도 제주시 회천동3262-3외2',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'봉개동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000229',
        name: '건입동 무료 주차장',
        address: '제주특별자치도 제주시 건입동1042-6',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'건입동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000230',
        name: '용담일동 무료 주차장',
        address: '제주특별자치도 제주시 용담1동244-0',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'용담동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000231',
        name: '건입동 무료 주차장',
        address: '제주특별자치도 제주시 건입동709-1',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'건입동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000232',
        name: '삼도일동 무료 주차장',
        address: '제주특별자치도 제주시 삼도1동533-8',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'삼도동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000233',
        name: '용담일동 무료 주차장',
        address: '제주특별자치도 제주시 용담1동244-0',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'용담동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000234',
        name: '건입동 무료 주차장',
        address: '제주특별자치도 제주시 건입동709-1',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'건입동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000235',
        name: '삼도일동 무료 주차장',
        address: '제주특별자치도 제주시 삼도1동533-8',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'삼도동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000236',
        name: '이도일동 무료 주차장',
        address: '제주특별자치도 제주시 이도1동1555-24',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'이도1동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000237',
        name: '봉개동 무료 주차장',
        address: '제주특별자치도 제주시 봉개동1854-0',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'봉개동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000238',
        name: '화북동 무료 주차장',
        address: '제주특별자치도 제주시 화북2동3645-4',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'화북동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000239',
        name: '화북동 무료 주차장',
        address: '제주특별자치도 제주시 화북2동3645-6',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'화북동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000240',
        name: '봉개동 무료 주차장',
        address: '제주특별자치도 제주시 봉개동1853-0',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'봉개동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000241',
        name: '도두동 무료 주차장',
        address: '제주특별자치도 제주시 도두1동1987-1',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'도두동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000242',
        name: '건입동 무료 주차장',
        address: '제주특별자치도 제주시 건입동1190-0',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'건입동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000243',
        name: '일도이동 무료 주차장',
        address: '제주특별자치도 제주시 일도2동984-2',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'일도2동' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000244',
        name: '구좌읍 무료 주차장',
        address: '제주특별자치도 제주시 구좌읍김녕리 1352-1, 1',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'구좌읍' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000245',
        name: '구좌읍 무료 주차장',
        address: '제주특별자치도 제주시 구좌읍세화리 1500-5, -44',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'구좌읍' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000246',
        name: '구좌읍 무료 주차장',
        address: '제주특별자치도 제주시 구좌읍평대리 3351, -0',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'구좌읍' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000247',
        name: '구좌읍 무료 주차장',
        address: '제주특별자치도 제주시 구좌읍세화리 3641-0',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'구좌읍' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000248',
        name: '구좌읍 무료 주차장',
        address: '제주특별자치도 제주시 구좌읍김녕리 492, -1, 493-2',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'구좌읍' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000249',
        name: '구좌읍 무료 주차장',
        address: '제주특별자치도 제주시 구좌읍월정리 648-3,5',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'구좌읍' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000250',
        name: '구좌읍 무료 주차장',
        address: '제주특별자치도 제주시 구좌읍김녕리 3341-2',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'구좌읍' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000251',
        name: '구좌읍 무료 주차장',
        address: '제주특별자치도 제주시 구좌읍하도리 3204-0',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'구좌읍' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000252',
        name: '구좌읍 무료 주차장',
        address: '제주특별자치도 제주시 구좌읍평대리 3164-0',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'구좌읍' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000253',
        name: '애월읍 무료 주차장',
        address: '제주특별자치도 제주시 애월읍하귀2리 1892-0',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'애월읍' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000254',
        name: '애월읍 무료 주차장',
        address: '제주특별자치도 제주시 애월읍애월리 2060-1',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'애월읍' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000255',
        name: '애월읍 무료 주차장',
        address: '제주특별자치도 제주시 애월읍상귀리 1008-1, 1005',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'애월읍' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000256',
        name: '한림읍 무료 주차장',
        address: '제주특별자치도 제주시 한림읍금능리 1427',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'한림읍' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000257',
        name: '한림읍 무료 주차장',
        address: '제주특별자치도 제주시 한림읍금능리 2015외',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'한림읍' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000258',
        name: '우도면 무료 주차장',
        address: '제주특별자치도 제주시 우도면연평리 611-0',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'우도면' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000259',
        name: '우도면 무료 주차장',
        address: '제주특별자치도 제주시 우도면연평리 317-0',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'우도면' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000260',
        name: '우도면 무료 주차장',
        address: '제주특별자치도 제주시 우도면연평리 682-0',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'우도면' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000261',
        name: '조천읍 무료 주차장',
        address: '제주특별자치도 제주시 조천읍신촌리 2542-0',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'조천읍' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000262',
        name: '조천읍 무료 주차장',
        address: '제주특별자치도 제주시 조천읍조천리 2714-4',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'조천읍' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000263',
        name: '조천읍 무료 주차장',
        address: '제주특별자치도 제주시 조천읍함덕리 921-2',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'조천읍' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000264',
        name: '조천읍 무료 주차장',
        address: '제주특별자치도 제주시 조천읍함덕리 1002-83, 1004-5, 5',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'조천읍' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000265',
        name: '조천읍 무료 주차장',
        address: '제주특별자치도 제주시 조천읍함덕리 1269-9 외 3',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'조천읍' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000266',
        name: '추자면 무료 주차장',
        address: '제주특별자치도 제주시 추자면대서리 4-21,38',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'추자면' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000267',
        name: '추자면 무료 주차장',
        address: '제주특별자치도 제주시 추자면신양리 434-9',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'추자면' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000268',
        name: '한경면 무료 주차장',
        address: '제주특별자치도 제주시 한경면신창리 232-1',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'한경면' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000269',
        name: '우도면 무료 주차장',
        address: '제주특별자치도 제주시 우도면연평리 1456',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'우도면' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000270',
        name: '조천읍 무료 주차장',
        address: '제주특별자치도 제주시 조천읍조천리 1156 외',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'조천읍' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000271',
        name: '조천읍 무료 주차장',
        address: '제주특별자치도 제주시 조천읍함덕리 972-6',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'조천읍' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000272',
        name: '한경면 무료 주차장',
        address: '제주특별자치도 제주시 한경면저리지 2114-62',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'한경면' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000273',
        name: '한림읍 무료 주차장',
        address: '제주특별자치도 제주시 한림읍대림리 1717-1',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'한림읍' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000274',
        name: '조천읍 무료 주차장',
        address: '제주특별자치도 제주시 조천읍교래리 산137-23',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'조천읍' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000275',
        name: '한림읍 무료 주차장',
        address: '제주특별자치도 제주시 한림읍한림리 905-34',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'한림읍' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000276',
        name: '애월읍 무료 주차장',
        address: '제주특별자치도 제주시 애월읍고내리 461-0',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'애월읍' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000277',
        name: '애월읍 무료 주차장',
        address: '제주특별자치도 제주시 애월읍하귀1리 149-5',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'애월읍' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000278',
        name: '애월읍 무료 주차장',
        address: '제주특별자치도 제주시 애월읍하귀1리 149-3',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'애월읍' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000279',
        name: '애월읍 무료 주차장',
        address: '제주특별자치도 제주시 애월읍하귀1리 146-0',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'애월읍' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000280',
        name: '애월읍 무료 주차장',
        address: '제주특별자치도 제주시 애월읍하귀1리 144-0',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'애월읍' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000281',
        name: '애월읍 무료 주차장',
        address: '제주특별자치도 제주시 애월읍하귀1리 123-9',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'애월읍' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000282',
        name: '애월읍 무료 주차장',
        address: '제주특별자치도 제주시 애월읍하귀1리 118-0',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'애월읍' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000283',
        name: '애월읍 무료 주차장',
        address: '제주특별자치도 제주시 애월읍하귀1리 176-2',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'애월읍' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000284',
        name: '애월읍 무료 주차장',
        address: '제주특별자치도 제주시 애월읍하귀1리 195-1',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'애월읍' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000285',
        name: '애월읍 무료 주차장',
        address: '제주특별자치도 제주시 애월읍하귀1리 197-6',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'애월읍' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000286',
        name: '애월읍 무료 주차장',
        address: '제주특별자치도 제주시 애월읍하귀1리 235-3',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'애월읍' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000287',
        name: '애월읍 무료 주차장',
        address: '제주특별자치도 제주시 애월읍하귀1리 238-3',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'애월읍' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000288',
        name: '애월읍 무료 주차장',
        address: '제주특별자치도 제주시 애월읍하귀1리 165-3',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'애월읍' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000289',
        name: '애월읍 무료 주차장',
        address: '제주특별자치도 제주시 애월읍하귀1리 162-0',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'애월읍' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000290',
        name: '애월읍 무료 주차장',
        address: '제주특별자치도 제주시 애월읍하귀1리 160-3',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'애월읍' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000291',
        name: '애월읍 무료 주차장',
        address: '제주특별자치도 제주시 애월읍하귀1리 200-2',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'애월읍' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000292',
        name: '애월읍 무료 주차장',
        address: '제주특별자치도 제주시 애월읍 하귀1리 158-1',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'애월읍' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000293',
        name: '애월읍 무료 주차장',
        address: '제주특별자치도 제주시 애월읍하귀1리 156-4',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'애월읍' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000294',
        name: '애월읍 무료 주차장',
        address: '제주특별자치도 제주시 애월읍하귀1리 155-9',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'애월읍' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000295',
        name: '한림읍 무료 주차장',
        address: '제주특별자치도 제주시 한림읍한림리 1304-10,11,1287-6',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'한림읍' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000296',
        name: '한림읍 무료 주차장',
        address: '제주특별자치도 제주시 한림읍한림리 1389-2,4,7, 1446-9',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'한림읍' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000297',
        name: '조천읍 무료 주차장',
        address: '제주특별자치도 제주시 조천읍조천리 2489',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'조천읍' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000298',
        name: '조천읍 무료 주차장',
        address: '제주특별자치도 제주시 조천읍조천리 2496',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'조천읍' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000299',
        name: '조천읍 무료 주차장',
        address: '제주특별자치도 제주시 조천읍함덕리 272-57',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'조천읍' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000300',
        name: '조천읍 무료 주차장',
        address: '제주특별자치도 제주시 조천읍함덕리 272-24',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'조천읍' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000301',
        name: '조천읍 무료 주차장',
        address: '제주특별자치도 제주시 조천읍함덕리 1024-2외1',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'조천읍' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000302',
        name: '구좌읍 무료 주차장',
        address: '제주특별자치도 제주시 구좌읍세화리 1507-0',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'구좌읍' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000303',
        name: '구좌읍 무료 주차장',
        address: '제주특별자치도 제주시 구좌읍세화리 1491-1',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'구좌읍' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000304',
        name: '구좌읍 무료 주차장',
        address: '제주특별자치도 제주시 구좌읍한동리 2972-0',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'구좌읍' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000305',
        name: '조천읍 무료 주차장',
        address: '제주특별자치도 제주시 조천읍함덕리 272-23',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'조천읍' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000306',
        name: '조천읍 무료 주차장',
        address: '제주특별자치도 제주시 조천읍함덕리 1024-2,2',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'조천읍' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000307',
        name: '구좌읍 무료 주차장',
        address: '제주특별자치도 제주시 구좌읍세화리 1507-0',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'구좌읍' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },
    {
        number: '405-2-000308',
        name: '구좌읍 무료 주차장',
        address: '제주특별자치도 제주시 구좌읍1491-1',
        week: '평일,토요일,공휴일',
        time: '00:00~23:59',
        charge: '무료',
        properties: [
          { name:'지역', value:'구좌읍' },
          { name:'운영요일', value:'평일,토요일,공휴일' },
          { name:'요금정보', value:'무료' }
        ]
      },

    ];

    service.getSampleData = function() {
      return places;
    };

    return service;

  });

})();