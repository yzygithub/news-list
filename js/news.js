/**
 * Created by yzy on 2017/7/31.
 */
$(document).ready(function () {
  console.log('/*Created by yzy on 2017/7/31.*/')
  /*初始化*/
  var counter = 0; /*计数器*/
  var pageStart = 0; /*offset*/
  var pageSize = 10; /*size*/
  var loadFlag = false;
  /*首次加载*/

  refreshNews(pageStart, pageSize);
    
  // refreshNews(pageStart, pageSize);
  /*监听加载更多*/
  $(document).on('click', '.load-more', function(){
    counter ++;
    pageStart = counter * pageSize;
    refreshNews(pageStart, pageSize);
  });
})

  function refreshNews(offset,size) {
    var $lists = $('.coten-list');
    // $lists.empty();
    $.ajax({
      // url: 'http://www.easy-mock.com/mock/597fee33a1d30433d84ea8a6/news/list/',
      //因为在github pages中ajax无法执行跨域请求，加载本地json文件
      url: './js/mock.json',
      type: 'GET',
      dataType: 'json',
      success: function (data) {
        console.log(data);
        var data=data.reverse();
        var listLength = data.length;
        if(listLength - offset < size ){
          size = listLength - offset;
        }
        var result = '';
        for(var i=offset; i< (offset+size); i++) {
          result+='<div class="list clearfix"><span class="clearfix">'+
          '<b>'+data[i].NewsTime.split('.')[2]+'</b>'+
          '<span class="news-time">'+data[i].NewsTime.split(".")[0]+'-'+data[i].NewsTime.split(".")[1]+'</span></span>'+
          '<img src="'+data[i].NewsImg+'" alt="news">'+'<p class="p-list">'+
          '<a class="" href="">'+data[i].NewsTitle+'</a>'+'<br />'+'</p>'+
          '<p class="news-desc">'+data[i].NewsDescription.substr(0,40)+'......</p>'+
          '<a href="'+data[i].NewsLink+'" class="news-link" target="_blank"></a>'+
          '</div>';
        }
        $lists.append(result);

        loadFlag = true;
        if (loadFlag == true){
          $(".loading").hide();
        }
          /*隐藏load-more按钮*/
          if ( (offset + size) >= listLength){
            $(".load-more").html('没有更多');
          }else{
            $(".load-more").show();
          }
      },
      error: function(xhr, type){
        alert('Ajax error!');
      }
    });
    
  }

