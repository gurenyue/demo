$(function () {
  setHeight();
  navsClick();
  contentScroll();
  var now = 0
  var preIndex = 0;
  var contentList =$('.contentlist>li')
  var contentul =$('.contentlist')
  var navList =$('.nav li')
  var sideList =$('.sideNav>li')
  var liCount=contentList.length;
   // console.log(liCount);
  function setHeight() {
   // 设置内容区域的宽高
   let $contentli=$('.contentlist > li')
   // 设置每个内容的li都是屏高减去头高
   let height=$(window).height()-$('header').height();
   // console.log(height);
   // 设置高
   $contentli.css("height",height);//$('').css(名，值)
   $('.content').css("height",height);//$('').css(名，值)
 }
  // 导航条点击事件
  function navsClick() {
    var navList =$('.nav li')
    var sideList =$('.sideNav li')

    $.each(navList, function(i){       //  头部导航处理
      navList[i].index = i;			// 保存当前的i
      $(navList[i]).on("click",function(){
        preIndex = now;
        move(this.index);
        now = this.index;     // 更新now
      })
    });

    $.each(sideList, function(i){       //  头部导航处理
      sideList[i].index = i;			// 保存当前的i
      $(sideList[i]).on("click",function(){
        preIndex = now;
        move(this.index);
        now = this.index;     // 更新now
      })
    });

  }

  // 内容区滚动事件
  function contentScroll() {
   console.log('开始滑动');
     let $content=$('.content');
    $content.on('mousewheel DOMMouseScroll', function (e) {
      // 与 IE 做兼容处理   ie低版本中 event是作为window属性存在的
      e = e || event
      // chrome 和 ie   e.originalEvent.wheelDelta > 0 (滚轮向上)
      // firefox        e.originalEvent.detail < 0   (滚轮向上)
       // delta>1向上(否则滚轮向下)
      var delta = (e.originalEvent.wheelDelta > 0 ? 1 : -1) || (e.originalEvent.detail > 0 ? -1 : 1)

      if (delta > 0) {  // 滚轮向上
        // 滚轮向上的逻辑
        if(now>0){
          now--
          move(now)     // 可以封装一个move函数专门来处理li的移动和执行相应的动画
        }
        console.log('向上');
        // window.delta=true
      }else if (delta < 0) {
        // 滚轮向下的逻辑
        if(now<liCount-1){
          now++
          move(now)
        }
        console.log('向下');
        // window.delta=false
      }
      preIndex =now;
      //  取消滚轮的默认行为
      //  firefox: window.event.returnValue = false     ie chormme: e.preventDefault()
      window.event? window.event.returnValue = false : e.preventDefault()
    })
  }
  function move(index) {
    $.each(navList,function (i) {
      $(navList[i]).removeClass('active')
    })
    $(navList[index]).addClass('active')
    $.each(sideList,function (i) {
      $(sideList[i]).removeClass('active')
    })
    $(sideList[index]).addClass('active')
    $('.contentlist').css('top',-index*($(window).height()-$('header').height()))

  }
  function move11(index) {
   console.log('进入move');
    let $contentlist=$('.contentlist')
    let oldTop=$contentlist.position().top
    let nowIndex=0
    // 每个内容区li的高
    let liHeight=$('.contentlist>li').height();
    // li个数
    let liCount=$('.contentlist>li').length;
    let maxTop=-liHeight*(liCount-1)
    console.log(liCount);
   // 当点击导航时
    if(index){
      console.log('move向上');
    }else{
      // 读取window.delta并判断是上滑动还是下滑
      let newTop=window.delta ? oldTop+liHeight : oldTop-liHeight
      console.log(newTop);
      if(maxTop>newTop){
        newTop = maxTop
      }else if(newTop>0) {
        newTop=0
      }
      $contentlist.css('top',newTop)
      nowIndex=Math.round(-newTop/liHeight)
      // move(index)

    }


  }
})