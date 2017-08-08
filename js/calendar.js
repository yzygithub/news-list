(function () {
  // 当前日期
  var dateObj = (function () {
    var oDate = new Date();
    return {
      getDate: function () {
        return oDate;
      },
      setDate: function (date) {
        oDate = date;
      }
    };
  })();

  // html部分
  renderHtml();
  // 表格中显示日期
  showCalendarData();
  // 绑定事件
  bindEvent();

  function renderHtml() {
    var oCalendar = document.getElementById("calendar");
    var oTitleBox = document.createElement("div"); // 日历标题 设置年份 月份 上一月 下一月 周日到周一
    var oBodyBox = document.createElement("div"); // 表格区 显示数据

    oTitleBox.className = 'calendar-title-box';
    //写入日历标题 设置年份 月份 上一月 下一月 周日到周一
    oTitleBox.innerHTML = "<h3 class='year' id='year'>2017<i></i></h3> <div class='month-week-box'><span class='prev-month' id='prev'>&lt;</span><h3 class='month' id='month'><span>08月</span></h3>" +
      "<span id='next' class='next-month'>&gt;</span> <ul class='week'><li>日</li><li>一</li><li>二</li><li>三</li><li>四</li>" +
      "<li>五</li><li>六</li></ul></div>";

    oCalendar.appendChild(oTitleBox);

    oBodyBox.className = 'calendar-body-box';
    var _bodyHtml = "";

    // 一个月最多31天，所以一个月最多占6行表格
    for (var i = 0; i < 6; i++) {
      _bodyHtml += "<tr>" +
        "<td></td>" +
        "<td></td>" +
        "<td></td>" +
        "<td></td>" +
        "<td></td>" +
        "<td></td>" +
        "<td></td>" +
        "</tr>";
    }
    oBodyBox.innerHTML = "<table id='calendarTable' class='calendar-table'>" + _bodyHtml +
      "</table>";
    calendar.appendChild(oBodyBox);
  }

  function showCalendarData() {
    var nYear = dateObj.getDate().getFullYear(); // 当前年
    var nMonth = dateObj.getDate().getMonth() + 1; // 当前月
    var oDateStr = getDateStr(dateObj.getDate()); // 当前Date
    // 日历标题栏中的年、月
    var oThisYear = document.getElementById('year');
    var oThisMonth = document.getElementById("month");
    var sThisMonth = oDateStr.substr(4, 2) + "月";
    var sThisYear = oDateStr.substr(0, 4);
    oThisYear.innerHTML = sThisYear + '<i></i>';
    oThisMonth.innerHTML = '<span>' + sThisMonth + '</span>';

    // 表格中的日期数据
    var oTable = document.getElementById("calendarTable");
    var aTd = oTable.getElementsByTagName("td");
    var nFirstDay = new Date(nYear, nMonth - 1, 1);

    // 写入日期
    for (var i = 0; i < aTd.length; i++) {
      var nThisDay = new Date(nYear, nMonth - 1, i + 1 - nFirstDay.getDay());
      var nThisDayStr = getDateStr(nThisDay);
      aTd[i].innerHTML = '<a>' + nThisDay.getDate() + '</a>';

      // 给每一个日期class
      if (nThisDayStr == getDateStr(new Date())) { // 当前天
        aTd[i].children[0].className = 'current-day';
      } else if (nThisDayStr.substr(0, 6) == getDateStr(nFirstDay).substr(0, 6)) {
        if (nThisDay.getDay() == 0 || nThisDay.getDay() == 6) {
          aTd[i].children[0].className = 'weekend';
        } else {
          aTd[i].children[0].className = 'current-month';
        }
      } else {
        aTd[i].children[0].className = 'other-month';
      }
    }
  }
  /**
   * 绑定鼠标点击事件
   */
  function bindEvent() {
    var prevMonth = document.getElementById("prev");
    var nextMonth = document.getElementById("next");
    var thisMonth = document.getElementById("month");
    addEvent(prevMonth, 'click', toChangeMonth, -1);
    addEvent(nextMonth, 'click', toChangeMonth, 1);
    addEvent(thisMonth, 'click', toThisMonth);
  }

  /**
   * 绑定事件
   */
  function addEvent(obj, ev, func, num) {
    if (obj.addEventListener) {
      obj.addEventListener(ev, function () {
        func(num);
      });
    } else if (obj.attachEvent) {
      obj.attachEvent('on' + ev, function () {
        func(num);
      });
    } else {
      obj['on' + ev] = function () {
        func(num);
      };
    }
  }

  /**
   * 点击上下月份
   */
  function toChangeMonth(num) {
    var nDate = dateObj.getDate();
    dateObj.setDate(new Date(nDate.getFullYear(), nDate.getMonth() + num, 1));
    showCalendarData();
  }

  /**
   * 点击返回当前月
   */
  function toThisMonth() {
    var nDate = new Date();
    dateObj.setDate(new Date(nDate.getFullYear(), nDate.getMonth(), 1));
    showCalendarData();
  }
  /**
   * 日期转化为字符串， 4位年+2位月+2位日
   */
  function getDateStr(date) {
    var nYear = date.getFullYear();
    var nMonth = date.getMonth() + 1;
    var nDate = date.getDate();

    nMonth = (nMonth > 9) ? ("" + nMonth) : ("0" + nMonth);
    nDate = (nDate > 9) ? ("" + nDate) : ("0" + nDate);
    return nYear + nMonth + nDate;
  }
})();