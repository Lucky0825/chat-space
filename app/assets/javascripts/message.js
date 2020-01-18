$(function(){ 
  var buildHTML = function(message) {
    if (message.content && message.image) {
      //data-idが反映されるようにしている
      var html = 
      `<div class="message" data-message-id="${message.id}">
        <div class="post">
          <div class="poster">
            ${message.user_name}
          </div>
          <div class="date">
            ${message.created_at}
          </div>
        </div>
        <div class="talk">
          <div class="next">
            ${message.content}
          </div>
            <img class="lower-message__image" src="${message.image}">
        </div>
      </div>`
      return html;
    }
    
    else if (message.content) {
      //同様に、data-idが反映されるようにしている
      var html = 
      `<div class="message" data-message-id="${message.id}">
        <div class="post">
          <div class="poster">
            ${message.user_name}
          </div>
          <div class="date">
            ${message.created_at}
          </div>
        </div>
        <div class="talk">
          <div class="next">
            ${message.content}
          </div>
        </div>
      </div>`
      return html;
    }
    
    else if(message.image) {
      //同様に、data-idが反映されるようにしている
      var html = 
      `<div class="message" data-message-id="${message.id}">
        <div class="post">
          <div class="poster">
            ${message.user_name}
          </div>
          <div class="date">
            ${message.created_at}
          </div>
        </div>
        <div class="talk">
          <img class="lower-message__image" src="/uploads/message/image/51/test_image.jpg" alt="Test image">
        </div>
      </div>`
      return html;
    };    
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data){
      var html = buildHTML(data);
      $('.main-content').append(html);
      $('form')[0].reset();
      $('.main-content').animate({ scrollTop: $('.main-content')[0].scrollHeight});
      $('.form-btn').prop('disabled', false);
    })

    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
  }); 

  var reloadMessages = function() {
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
    var last_message_id = $('.message:last').data("message-id");
    $.ajax({
      //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
      url: "api/messages",
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })

    .done(function(messages) {
      if (messages.length !== 0) {
      //追加するHTMLの入れ物を作る
      var insertHTML = '';
      //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      //メッセージが入ったHTMLに、入れ物ごと追加
      console.log()
      $('.main-content').append(insertHTML);
      $('.main-content').animate({ scrollTop: $('.main-content')[0].scrollHeight});
      $("#new_message")[0].reset();
      $(".form__submit").prop("disabled", false);
      }
    })

    .fail(function() {
      alert('error');
    })
  }; 

  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
}); 
