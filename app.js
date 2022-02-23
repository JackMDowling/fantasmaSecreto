$(document).ready(() => {
  const feed = $.ajax({
    url: "http://localhost:3000/feed/",
    crossDomain: true,
    success: function (response) {
      console.log("hello ", response);
    },
    error: function (err) {
      console.log("this didn't work ", err);
    },
  });

  const $app = $("#app");
  $app.html("");

  const $title = $("<h2>Chat App</h2>");
  $title.appendTo($app);

  const $post = $("<div id=post></div>");
  $post.appendTo($app);

  const $discussion = $("<div id=discussion>Discussion</div>");
  $discussion.appendTo($app);
  const $message = $("<div id=message>Message will go here</div>");
  $message.appendTo($discussion);
  const $user = $("<div class=user></div>");
  $user.appendTo($message);
  const $text = $("<div id=messageText></div>");
  $text.appendTo($message);
  const $upvote = $("<div class=upvote></div>");
  $upvote.appendTo($message);
  const $reply = $("<div class=reply></div>");
  $reply.appendTo($post);
});
