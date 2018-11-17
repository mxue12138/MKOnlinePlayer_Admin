$(function () {
  $(document).keyup(function(event){
    if(event.keyCode == 13){
      if ($('.login .username').is(":focus")) {
        if (!$('.login .username').val().trim()) {
          layer.msg('账号不能为空');
          return;
        }
        $('.login .password').focus();
      } else if ($('.login .password').is(":focus")) {
        if (!$('.login .password').val().trim()) {
          layer.msg('密码不能为空');
          return;
        }
        $('.login .login').click();
      }
    }
  });
  $('.login .login').click(function () {
    if (!$('.login .username').val().trim() || !$('.login .password').val().trim()) {
      layer.msg('账号或密码不能为空');
      return;
    }
    $.ajax({
      url: '/admin/api/login',
      type: 'POST',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({
        'username': $('.login .username').val().trim(),
        'password': $('.login .password').val().trim()
      }),
      success: function (data) {
        if (data.code == 1) {
          location.href = '/admin/index.html';
        } else {
          layer.msg(data.msg);
        }
      }
    })
  });
  $('.navbar .navbar-link').click(function () {
    $.ajax({
      url: '/admin/api/logout',
      type: 'POST',
      dataType: 'json',
      success: function (data) {
        if (data.code == 1) {
          layer.msg(data.msg);
          location.href = '/admin/login.html';
        } else {
          layer.msg(data.msg);
        }
      }
    })
  });
  $('.music_list .update').click(function () {
    var music_list = [];
    for (var i = 0; i < $('.music_list input').length; i++) {
      if (!$('.music_list input').eq(i).val().trim()) {
        layer.msg('歌单不能为空');
        return;
      }
      music_list.push({
        'id': $('.music_list input').eq(i).val().trim()
      });
    }
    var that = $(this);
    $.ajax({
      url: '/admin/api/music_list',
      type: 'POST',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({
        'music_list': music_list
      }),
      success: function (data) {
        if (data.code == 1) {
          layer.msg(data.msg);
          for (var i = 0; i < that.siblings('.form-group').length; i++) {
            that.siblings('.form-group').eq(i).find('a').show();
            that.siblings('.form-group').eq(i).find('a')[0].href = 'https://music.163.com/#/playlist?id=' + that.siblings('.form-group').eq(i).find('input').val();
          }
        } else {
          layer.msg(data.msg);
        }
      }
    })
  });
  $('.music_list .add').click(function () {
    var clone = $(this).siblings('form').last().clone(true);
    clone.find('.id').val('');
    clone.find('.link').hide()[0].href = '';
    $(this).siblings('form').last().after(clone);
  });
  $('.music_list .del').click(function () {
    var that = $(this);
    layer.confirm('确认要删除吗？', {
      btn: ['确认','取消']
    }, function(){
      that.parent().parent().remove();
      var music_list = [];
      for (var i = 0; i < $('.music_list input').length; i++) {
        if (!$('.music_list input').eq(i).val().trim()) {
          layer.msg('歌单不能为空');
          return;
        }
        music_list.push({
          'id': $('.music_list input').eq(i).val().trim()
        });
      }
      $.ajax({
        url: '/admin/api/music_list',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
          'music_list': music_list
        }),
        success: function (data) {
          if (data.code == 1) {
            layer.msg(data.msg);
          } else {
            layer.msg(data.msg);
          }
        }
      })
    })
  });
  $('.index .update').click(function () {
    var indexData = {
      'title': $('.index #title').val().trim(),
      'description': $('.index #description').val().trim(),
      'keywords': $('.index #keywords').val().trim(),
      'logo_text': $('.index #logo_text').val().trim(),
      'footer': $('.index #footer').val().trim(),
      'notice_show': $('.index #notice_show').val() == 'false' ? false : true,
      'notice': $('.index #notice').val().trim()
    }
    $.ajax({
      url: '/admin/api/index',
      type: 'POST',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({
        'index': indexData
      }),
      success: function (data) {
        if (data.code == 1) {
          layer.msg(data.msg);
        } else {
          layer.msg(data.msg);
        }
      }
    })
  });
  $('.player .update').click(function () {
    var playerData =  {
      'api': $('.player #api').val().trim(),
      'loadcount': $('.player #loadcount').val().trim(),
      'method': $('.player #method').val().trim(),
      'defaultlist': $('.player #defaultlist').val().trim(),
      'autoplay': $('.player #autoplay').val().trim() == 'false' ? false : true,
      'coverbg': $('.player #coverbg').val().trim() == 'false' ? false : true,
      'mcoverbg': $('.player #mcoverbg').val().trim() == 'false' ? false : true,
      'dotshine': $('.player #dotshine').val().trim() == 'false' ? false : true,
      'mdotshine': $('.player #mdotshine').val().trim() == 'false' ? false : true,
      'volume': $('.player #volume').val().trim(),
      'version': $('.player #version').val().trim(),
      'debug': $('.player #debug').val().trim() == 'false' ? false : true
    }
    for (var prop in playerData) {
      if (playerData[prop] === '') {
        layer.msg('请确认已填写所有内容');
        return;
      }
    }
    $.ajax({
      url: '/admin/api/player',
      type: 'POST',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({
        'player': playerData
      }),
      success: function (data) {
        if (data.code == 1) {
          layer.msg(data.msg);
        } else {
          layer.msg(data.msg);
        }
      }
    })
  });
  $('.user .update').click(function () {
    if (!$('.user #username').val().trim() || !$('.user #password').val().trim()) {
      layer.msg('用户名或密码不能为空');
      return;
    }
    layer.confirm('确认修改密码吗？', {
      btn: ['确认','取消']
    }, function () {
      var userData = {
        'username': $('.user #username').val().trim(),
        'password': $('.user #password').val().trim()
      }
      $.ajax({
        url: '/admin/api/user',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify({
          'user': userData
        }),
        success: function (data) {
          if (data.code == 1) {
            layer.msg(data.msg);
            $('.navbar .navbar-link').click();
          } else {
            layer.msg(data.msg);
          }
        }
      })
    })
  })
})