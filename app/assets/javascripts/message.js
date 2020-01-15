$(function(){ 
  
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="upper" data-message-id=${message.id}>
         <div class="post">
           <div class="poster">
             ${message.user_name}
           </div>
           <div class="date">
             ${message.created_at}
           </div>
         </div>
         <div class="talk">
           <p class="next">
             ${message.content}
           </p>
         </div>
         <img src=${message.image} >
       </div>`
     return html;
   } else {
     var html =
      `<div class="upper" data-message-id=${message.id}>
         <div class="post">
           <div class="poster">
             ${message.user_name}
           </div>
           <div class="date">
             ${message.created_at}
           </div>
         </div>
         <div class="talk">
           <p class="next">
             ${message.content}
           </p>
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
  });
})
});