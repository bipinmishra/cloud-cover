$('.list-dashboard-detail').on('click', '.trigger-btn', function (e) {
  e.preventDefault();
  console.log('this is text');

  if ($(this).closest('.sub').hasClass('open')) {
    $(this).closest('.sub').removeClass('open');

    $(this).closest('.sub').find('.sub').removeClass('open');
  } else {
    $(this).closest('.sub').addClass('open');
  }
});




$('.list-dashboard-detail').on('click', '.open-group', function () {
  $('.select-box-group-list').html('');
  for (var g = 0; g < _user_dynamic_contentInner.groupList.length; g++) {
    var grpElement = '  <li class="group-item">' + _user_dynamic_contentInner.groupList[g].name + '</li>';

    $('.select-box-group-list').append(grpElement);
  }

  $('#group').addClass('show');
});



$("#groupSearch").on("keyup", function () {
  var value = $(this).val().toLowerCase();

  $("#groupListElement li").filter(function () {

    if ($(this).text().toLowerCase().indexOf(value) > -1) {
      $(this).show();
    } else {
      $(this).hide();
    }
  });

});


$('#changeMode').on('change', function () {

  if ($(this).prop('checked')) {
    $('body').addClass('dark-mode');
  } else {
    $('body').removeClass('dark-mode');
  }
})



$('.list-dashboard-detail').on('click', '.open-setting', function () {

  var name = $(this).closest('.detail-wrap').find('.name').text();
  var imgClass = $(this).closest('.detail-wrap').find('.name .icon').attr('class');
  // console.log(imgClass);
  $('.dash-name').val(name);
  $('.icon-name  .icon').remove();
  var iconHtml = '<span class="icon ' + imgClass + '"></span>';

  $('.icon-name').append(iconHtml);

  $('#setting').addClass('show');
});



$('.finish-modal').on('click', function () {
  $('.modal-wrapper-outer').removeClass('show');
});


$("#mainSearch").on("keyup", function () {
  var value = $(this).val().toLowerCase();

  console.log($("#mainSearchList .detail-wrap").length);

  $("#mainSearchList .detail-wrap").filter(function () {
    $(this).closest('.label-master').show();
    if ($(this).find('.name').text().toLowerCase().indexOf(value) > -1) {
      $(this).closest('.detail-wrap').show();
    } else {
      $(this).closest('.detail-wrap').hide();
    }
  });


  $('.detail-wrap').each(function () {
    if ($(this).is(":hidden")) {
      $(this).closest('.label-master').hide();
    } else {
      $(this).closest('.label-master').find('.detail-wrap').show();
    }
  });

  // The same works with hidden


});


window._user_dynamic_contentInner;

function getAppData2() {
  // if($('.dynamic-content').length){	
  $.getJSON("assets/data/user-detail.json", function (data) {
    _user_dynamic_contentInner = data;
    // console.log(_user_dynamic_contentInner);
    printData(data);
    $('.loader-wrapper').hide();
  }).fail(function () {
    alert("error in loading Data");
  });
  // }
}

getAppData2();









function printData(data) {
  if (data.dashboardList.length) {

    for (var i = 0; i < data.dashboardList.length; i++) {

      //Master Level ===============================
      if (data.dashboardList[i].sub.length) {

        var masterSub = '<li class="label-master sub">' +
          '<a href="javascript:void(0);" class="trigger-btn"></a>' +
          '' +
          '<div class="detail-wrap">' +
          ' <ul>' +
          '  <li class="name"><span class="icon ' + data.dashboardList[i].icon + '"></span>' + data.dashboardList[i].name + '</li>' +
          '  <li> ' +
          '  <span class="icon ' + data.dashboardList[i].docked + '"></span>' +
          '  </li>' +
          '  <li> ' + data.dashboardList[i].widget + ' </li>' +
          '  <li> ' + data.dashboardList[i].owner + ' </li>' +
          '' +
          '  <li class="shared">' +
          '<div class="user-list middle-align ">' +
          ' <span class="user-info open-group"><img src="assets/images/user.png"' +
          'alt=""></span>' +
          '</div>' +
          '  </li>' +
          '  <li>' + data.dashboardList[i].modified + '</li>' +
          '' +
          '  <li class="setting">' +
          '<a href="javascript:void(0);" class="open-setting">' +
          ' <span class="icon setting"></span>' +
          '</a>' +
          '  </li>' +
          ' </ul>' +
          '</div>' +
          '</li>';
        $('.append-dynamic-html').append(masterSub);

        var masterSubUL = '<ul class="master-sub-ul"></ul>';
        $('.append-dynamic-html').find('.label-master.sub').eq(i).append(masterSubUL);


        var indexElement = $('.label-master').eq(i).find('.detail-wrap').eq(0).find('.user-list');
        // console.log(indexElement);
        printUserlist(data.dashboardList[i], indexElement);

        // var indexElement = $('.label-master').eq(i).find('.detail-wrap .user-list');
        // var IndexPopElement = $('.label-master').eq(i).find('.detail-wrap .user-list .pop-list-ul');
        // printUserlist(data.dashboardList[i], indexElement, IndexPopElement );

        // console.log('master- Sub');
        //First Level ==================
        for (var j = 0; j < data.dashboardList[i].sub.length; j++) {


          if (data.dashboardList[i].sub[j].sub.length) {
            var _clLable1Sub = 'label-1 sub';
            var label1Sub = '<li class="' + _clLable1Sub + '">' +
              '<a href="javascript:void(0);" class="trigger-btn trigger-btn-inner"></a>' +
              '' +
              '<div class="detail-wrap detail-wrap-2">' +
              ' <ul>' +
              '  <li class="name"><span class="icon ' + data.dashboardList[i].sub[j].icon + '"></span>' + data.dashboardList[i].sub[j].name + '</li>' +
              '  <li> ' +
              '  <span class="icon ' + data.dashboardList[i].sub[j].docked + '"></span>' +
              '  </li>' +
              '  <li> ' + data.dashboardList[i].sub[j].widget + ' </li>' +
              '  <li> ' + data.dashboardList[i].sub[j].owner + ' </li>' +
              '' +
              '  <li class="shared">' +
              '<div class="user-list middle-align ">' +
              ' <span class="user-info open-group"><img src="assets/images/user.png"' +
              'alt=""></span>' +
              '</div>' +
              '  </li>' +
              '  <li>' + data.dashboardList[i].sub[j].modified + '</li>' +
              '' +
              '  <li class="setting">' +
              '<a href="javascript:void(0);" class="open-setting">' +
              ' <span class="icon setting"></span>' +
              '</a>' +
              '  </li>' +
              ' </ul>' +
              '</div>' +
              '<ul class="label1-sub-ul"></ul>' +
              '</li>';

            $('.append-dynamic-html').find('.label-master.sub').eq(i).find('.master-sub-ul').append(label1Sub);

            var indexElement = $('.label-master.sub').eq(i).find('.master-sub-ul').find('.label-1').eq(j).find('.detail-wrap').eq(0).find('.user-list');
            printUserlist(data.dashboardList[i].sub[j], indexElement);

            // var indexElement = $('.label-master.sub').eq(i).find('.master-sub-ul').find('.label-1').eq(j).find('.detail-wrap .user-list');
            // printUserlist(data.dashboardList[i], indexElement );

            // console.log('master- Sub li Sub');

            // console.log(i);
            // console.log(j);
            // console.log( i + " ::::jjj"+ j);
            // var label1SUBUL = '<ul class="label1-sub-ul"></ul>';
            // $('.append-dynamic-html').find('.label-master.sub').eq(i).find('.label-1.sub').eq(j).append(label1SUBUL);


            //Second Level Print
            for (var k = 0; k < data.dashboardList[i].sub[j].sub.length; k++) {

              if (data.dashboardList[i].sub[j].sub.length) {
                var label2 = '<li class="label-2">' +
                  '' +
                  '<div class="detail-wrap detail-wrap-3">' +
                  ' <ul>' +
                  '  <li class="name"><span class="icon ' + data.dashboardList[i].sub[j].sub[k].icon + '"></span>' + data.dashboardList[i].sub[j].sub[k].name + '</li>' +
                  '  <li> ' +
                  '  <span class="icon ' + data.dashboardList[i].sub[j].sub[k].docked + '"></span>' +
                  '  </li>' +
                  '  <li> ' + data.dashboardList[i].sub[j].sub[k].widget + ' </li>' +
                  '  <li> ' + data.dashboardList[i].sub[j].sub[k].owner + ' </li>' +
                  '' +
                  '  <li class="shared">' +
                  '<div class="user-list middle-align ">' +
                  ' <span class="user-info open-group"><img src="assets/images/user.png"' +
                  'alt=""></span>' +
                  '</div>' +
                  '  </li>' +
                  '  <li>' + data.dashboardList[i].sub[j].sub[k].modified + '</li>' +
                  '' +
                  '  <li class="setting">' +
                  '<a href="javascript:void(0);" class="open-setting">' +
                  ' <span class="icon setting"></span>' +
                  '</a>' +
                  '  </li>' +
                  ' </ul>' +
                  '</div>' +
                  '</li>';
                // $('.append-dynamic-html').find('.label-master.sub').eq(i).find('.master-sub-ul').append(label2);
                // console.log( i + " ::::jjj"+ j);
                // console.log($('.append-dynamic-html').find('.label-master.sub').eq(i).find('.lable-1.sub'));
                $('.append-dynamic-html').find('.label-master.sub').eq(i).find('.label1-sub-ul').append(label2);

                var indexElement = $('.label-master.sub').eq(i).find('.master-sub-ul').find('.label-1').eq(j).find('.label1-sub-ul .detail-wrap').eq(0).find('.user-list');
                printUserlist(data.dashboardList[i].sub[j].sub[k], indexElement);
              }
              // console.log('master- Sub li Sub Labele 2 one date clear  ===========');
            }

          } else {
            var label1 = '<li class="label-1">' +
              '' +
              '<div class="detail-wrap detail-wrap-2">' +
              ' <ul>' +
              '  <li class="name"><span class="icon ' + data.dashboardList[i].sub[j].icon + '"></span>' + data.dashboardList[i].sub[j].name + '</li>' +
              '  <li> ' +
              '  <span class="icon ' + data.dashboardList[i].sub[j].docked + '"></span>' +
              '  </li>' +
              '  <li> ' + data.dashboardList[i].sub[j].widget + ' </li>' +
              '  <li> ' + data.dashboardList[i].sub[j].owner + ' </li>' +
              '' +
              '  <li class="shared">' +
              '<div class="user-list middle-align ">' +
              ' <span class="user-info open-group"><img src="assets/images/user.png"' +
              'alt=""></span>' +
              '</div>' +
              '  </li>' +
              '  <li>' + data.dashboardList[i].sub[j].modified + '</li>' +
              '' +
              '  <li class="setting">' +
              '<a href="javascript:void(0);" class="open-setting">' +
              ' <span class="icon setting"></span>' +
              '</a>' +
              '  </li>' +
              ' </ul>' +
              '</div>' +
              '</li>';
            $('.append-dynamic-html').find('.label-master.sub').eq(i).find('.master-sub-ul').append(label1);

            var indexElement = $('.label-master.sub').eq(i).find('.master-sub-ul').find('.label-1').eq(j).find('.detail-wrap').eq(0).find('.user-list');
            printUserlist(data.dashboardList[i].sub[j], indexElement);
          }

        }

      } else {

        var master = '<li class="label-master">' +
          '' +
          '<div class="detail-wrap">' +
          ' <ul>' +
          '  <li class="name"><span class="icon ' + data.dashboardList[i].icon + '"></span>' + data.dashboardList[i].name + '</li>' +
          '  <li> ' +
          '  <span class="icon ' + data.dashboardList[i].docked + '"></span>' +
          '  </li>' +
          '  <li> ' + data.dashboardList[i].widget + ' </li>' +
          '  <li> ' + data.dashboardList[i].owner + ' </li>' +
          '' +
          '  <li class="shared">' +
          '<div class="user-list middle-align ">' +
          ' <span class="user-info open-group"><img src="assets/images/user.png"' +
          'alt=""></span>' +
          '</div>' +
          '  </li>' +
          '  <li>' + data.dashboardList[i].modified + '</li>' +
          '' +
          '  <li class="setting">' +
          '<a href="javascript:void(0);" class="open-setting">' +
          ' <span class="icon setting"></span>' +
          '</a>' +
          '  </li>' +
          ' </ul>' +
          '</div>' +
          '</li>';
        // console.log('master- normal');
        $('.append-dynamic-html').append(master);

        var indexElement = $('.label-master').eq(i).find('.detail-wrap').eq(0).find('.user-list');
        printUserlist(data.dashboardList[i], indexElement);

      }

    }
  }
}


function printUserlist(data, indexElement) {
  var html = '';
  var listElement = '';
  if (data.shared.length > 3) {
    for (var a = 0; a < 2; a++) {
      html = html + ' ' + ' <span class="user-info open-group"><img src="' + data.shared[a].img + '"></span>';
    }

    // console.log(html);
    var count = data.shared.length - 2;
    html = html + ' ' + '<span class="user-info count open-group"><b>+' + count + '</b><div class="pop-hover-list"><ul class="pop-list-ul">';



    //  console.log(html);
    // console.log(listElement);
    for (var b = 0; b < data.shared.length; b++) {

      listElement = listElement + '' + '<li>' +
        '  <span class="user-info"><img src="' + data.shared[b].img + '"' +
        'alt="">' +
        '  </span>' +
        '  <span class="agent-name">' + data.shared[b].name + '</span> ' +
        ' </li>';
    }

    html = html + ' ' + listElement + '</ul> </div></span>'


  } else {
    for (var c = 0; c < data.shared.length; c++) {
      html = html + ' ' + '<span class="user-info open-group"><img src="' + data.shared[c].img + '"></span>';
    }
  }

  $(indexElement).html(html);

  // $(IndexPopElement).append(listElement);

  // console.log(IndexPopElement.length);
}
