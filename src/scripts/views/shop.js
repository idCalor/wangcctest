
// 引入模板
var shopTpl = require('../tpl/shop.string');

// 定义一个视图
SPA.defineView('shop', {
  // 将模板写在body里
  html: shopTpl,


  plugins: [
    'delegated',
    {
      name: 'avalon',
      options: function (vm) {
        vm.boyTemp={};
        vm.boyall={};
        vm.isShowLoading=true;

      }
    }
  ],

  // 给视图定义公共的属性和方法
  init: {


    // 定义视图公共的home hot swiper对象
    // myHomeHotSwiper: null,
    // 定义scroll对象
    myScroll: null

  },

  bindActions: {

    'tap.shop.slide': function (e) {
      // 获得视图公共的home hot swiper, 跳转到某个slider
      this.myShopSwiper.slideTo($(e.el).index());
    }
  },

  bindEvents: {
    beforeShow: function () {
      // 保存视图对象
      var that = this;

      // 获得avalon的vm
       var vm = that.getVM();

      // 第一次渲染数据
      $.ajax({
        url: '/api/boyList.php',
        success: function (res) {

           vm.boyTemp = res.data;
          //  vm.boyall=that.concat(vm.boyTemp);
          vm.boyall=vm.boyTemp;
        }
      });
      // 定义home hot swiper，注意这里的that.mySwiper
      that.mybannerSwiper=new Swiper('#shop-banner-swiper',{
        loop:false,
        pagination : '.swiper-pagination',
        autoplay: 2000,
        autoplayDisableOnInteraction : false
      });
      that.myShopSwiper = new Swiper('#shop-nav-swiper', {
        loop: false,
        onSlideChangeStart: function () {
          $('.shop-nav li').eq(that.myShopSwiper.activeIndex).addClass('active').siblings().removeClass('active');
        }
      });
      setTimeout(function () {
          // 获得SAP里定义的scroll对象，homeHotScroll通过data-scroll-id实现绑定的
        that.myScroll = that.widgets.shopScroll;
          var gapSize = 26;
          var pageNo = 0;
          // var pageSize = 6;
          that.myScroll.scrollBy(0, -gapSize);

          var head = $('.head img'),
              topImgHasClass = head.hasClass('up');
          var foot = $('.foot img'),
              bottomImgHasClass = head.hasClass('down');
          that.myScroll.on('scroll', function () {
              var y = this.y,
                  maxY = this.maxScrollY - y;
              if (y >= 0) {
                  !topImgHasClass && head.addClass('up');
                  return '';
              }
              if (maxY >= 0) {
                  !bottomImgHasClass && foot.addClass('down');
                  return '';
              }
          });

          that.myScroll.on('scrollEnd', function () {
              if (this.y >= -100 && this.y < 0) {
                  myScroll.scrollTo(0, -gapSize);
                  head.removeClass('up');
              } else if (this.y >= 0) {
                  head.attr('src', '/wangcctest/images/ajax-loader.gif');
                  // ajax下拉刷新数据
                  $.ajax({
                    url: '/api/boyList.php',
                    // 请求参数，get：放置的url上，post:request体里
                    data: {
                        type: 'refresh'
                      },
                    success: function (res) {
                    vm.boyTemp = res.data;
                     //  vm.boyall=that.concat(vm.boyTemp);
                     vm.boyall=vm.boyTemp;
                    that.myScroll.scrollTo(0, -gapSize);
                    head.removeClass('up');
                    head.attr('src', '/webapp1502/images/arrow.png');
                    }
                  });
              }

              var maxY = this.maxScrollY - this.y;
              if (maxY > -gapSize && maxY < 0) {
                  var self = this;
                  that.myScroll.scrollTo(0, self.maxScrollY + gapSize);
                  foot.removeClass('down')
              } else if (maxY >= 0) {
                  foot.attr('src', '/wangcctest/images/ajax-loader.gif');
                  // ajax上拉加载数据

                  $.ajax({
                    url: '/api/boyList.php',

                    // 请求参数，get：放置的url上，post:request体里
                    data: {
                      page: pageNo
                      // pageSize: pageSize
                    },

                    success: function (res) {
                      vm.boyTemp = res.data;
                     //  vm.boyall=that.concat(vm.boyTemp);
                      vm.boyall=vm.boyTemp;
                      pageNo++;
                    that.myScroll.refresh();
                    that.myScroll.scrollTo(0,self.y+ gapSize);
                    foot.removeClass('down');
                    foot.attr('src', '/webapp1502/images/arrow.png');
                    }
                  });

                  // var self = this;
                  // setTimeout(function () {
                  //     $('.foot').before(
                  //         '<div class="item">add 1</div>'+
                  //         '<div class="item">add 2</div>'+
                  //         '<div class="item">add 3</div>'+
                  //         '<div class="item">add 4</div>'+
                  //         '<div class="item">add 5</div>'
                  //     );
                  //     myScroll.refresh();
                  //
                  //     myScroll.scrollTo(0, self.y + gapSize);
                  //     foot.removeClass('down');
                  //     foot.attr('src', '/wangcctest/images/arrow.png');
                  // }, 1000);
              }
          });
        }, 0);

    }
  }
});
