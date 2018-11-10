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
          layer.msg('登陆失败，账号或密码错误');
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
          layer.msg('退出登陆成功');
          location.href = '/admin/login.html';
        } else {
          layer.msg('退出登陆失败');
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
          layer.msg('保存成功');
          for (var i = 0; i < that.siblings('.form-group').length; i++) {
            that.siblings('.form-group').eq(i).find('a').show();
            that.siblings('.form-group').eq(i).find('a')[0].href = 'https://music.163.com/#/playlist?id=' + that.siblings('.form-group').eq(i).find('input').val();
          }
        } else {
          layer.msg('保存失败');
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
            layer.msg('删除成功');
          } else {
            layer.msg('删除失败');
          }
        }
      })
    })
  });
  $('.index .update').click(function () {
    var notice_show = $('.index #notice_show').val();
    notice_show = notice_show == 'false' ? false : true;
    var indexData = {
      'title': $('.index #title').val().trim(),
      'description': $('.index #description').val().trim(),
      'keywords': $('.index #keywords').val().trim(),
      'logo_text': $('.index #logo_text').val().trim(),
      'footer': $('.index #footer').val().trim(),
      'notice_show': notice_show,
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
          layer.msg('保存成功');
        } else {
          layer.msg('保存失败');
        }
      }
    })
  });
  $('.player .update').click(function () {
    var playerData =  {
      'api': $('.player #api').val(),
      'loadcount': $('.player #loadcount').val(),
      'method': $('.player #method').val(),
      'defaultlist': $('.player #defaultlist').val(),
      'autoplay': $('.player #autoplay').val() == 'false' ? false : true,
      'coverbg': $('.player #coverbg').val() == 'false' ? false : true,
      'mcoverbg': $('.player #mcoverbg').val() == 'false' ? false : true,
      'dotshine': $('.player #dotshine').val() == 'false' ? false : true,
      'mdotshine': $('.player #mdotshine').val() == 'false' ? false : true,
      'volume': $('.player #volume').val(),
      'version': $('.player #version').val(),
      'debug': $('.player #debug').val() == 'false' ? false : true
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
          layer.msg('保存成功');
        } else {
          layer.msg('保存失败');
        }
      }
    })
  })
})