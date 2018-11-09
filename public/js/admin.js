$(function () {
  $(document).keyup(function(event){
    if(event.keyCode == 13){
      if ($('.login .username').is(":focus")) {
        if (!$('.login .username').val().trim()) {
          alert('账号不能为空');
          return;
        }
        $('.login .password').focus();
      } else if ($('.login .password').is(":focus")) {
        if (!$('.login .password').val().trim()) {
          alert('密码不能为空');
          return;
        }
        $('.login .login').click();
      }
    }
  });
  $('.login .login').click(function () {
    if (!$('.login .username').val().trim() || !$('.login .password').val().trim()) {
      alert('账号或密码不能为空');
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
          alert('登陆失败');
        }
      }
    })
  });
  $('.music_list .update').click(function () {
    var music_list = [];
    for (var i = 0; i < $('.music_list input').length; i++) {
      if (!$('.music_list input').eq(i).val().trim()) {
        alert('歌单不能为空');
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
          alert('保存成功');
          that.siblings('p').last().children('a').show()[0].href = 'https://music.163.com/#/playlist?id=' + that.siblings('p').last().children('input').val();
        } else {
          alert('保存失败');
        }
      }
    })
  });
  $('.music_list .add').click(function () {
    var clone = $(this).siblings('p').last().clone(true);
    clone.children('input').val('');
    clone.children('a').hide()[0].href = '';
    clone.children('a')[0].href = '';
    $(this).siblings('p').last().after(clone);
  });
  $('.music_list .del').click(function () {
    if (confirm('确认要删除吗？')) {
      $(this).parent().remove();
      var music_list = [];
      for (var i = 0; i < $('.music_list input').length; i++) {
        if (!$('.music_list input').eq(i).val().trim()) {
          alert('歌单不能为空');
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
            alert('删除成功');
          } else {
            alert('删除失败');
          }
        }
      })
    }
  });
  $('.index .update').click(function () {
    $.ajax({
      url: '/admin/api/index',
      type: 'POST',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({
        'index': {
          'title': $('.index input').eq(0).val().trim(),
          'description': $('.index input').eq(1).val().trim(),
          'keywords': $('.index input').eq(2).val().trim(),
          'logo_text': $('.index input').eq(3).val().trim(),
          'footer': $('.index textarea').val().trim()
        }
      }),
      success: function (data) {
        if (data.code == 1) {
          alert('保存成功');
        } else {
          alert('保存失败');
        }
      }
    })
  })
})