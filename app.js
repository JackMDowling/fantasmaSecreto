$(document).ready(() => {
  const $app = $("#app");
  $app.html("");

  const $title = $("<h2>Chat App</h2>");
  $title.appendTo($app);

  const $discussion = $("<div id=discussion>Discussion</div>");
  $discussion.appendTo($app);
  const $message = $("<div id=message>Message will go here</div>");
  $message.appendTo($discussion);
});
