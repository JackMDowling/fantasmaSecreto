$(document).ready(() => {
  const getMessages = async () => {
    return $.ajax({
      url: "http://localhost:3000/feed/",
      crossDomain: true,
      success: function (response) {
        console.log(response);
      },
      error: function (err) {
        console.log(err);
      },
    });
  };

  const $app = $("#app");
  $app.html("");
  const $title = $("<h2>Discussion</h2>");
  $title.appendTo($app);

  // Comment Post Section
  const $post = $("<div id=post></div>");
  $post.appendTo($app);
  const $currentUser = $("<div>img</div>");
  $currentUser.appendTo($post);
  const $input = $(
    "<input type=text id=post_field placeholder='What Are Your Thoughts?' width='70%'></input>"
  );
  $input.appendTo($post);
  const $comment = $("<button onClick=postComment>Comment</button>");
  $comment.appendTo($post);

  const $discussion = $("<div id=discussion><hr></hr></div>");
  $discussion.appendTo($app);
  // Feed Section
  const updateFeed = async () => {
    let data = await getMessages();
    console.log(data);
    for (element of data) {
      let src = element.img;
      const $message = $(`<div id=message></div>`);
      $message.appendTo($discussion);
      const $user = $(`<div class=user>${element.username}</div>`);
      $user.appendTo($message);
      const $userIMG = $(
        `<img class=profile src=${src} alt=load width=50 height=50>`
      );
      $userIMG.appendTo($message);
      const $text = $(`<div id=messageText>${element.text}</div>`);
      $text.appendTo($message);
      const $upvote = $(`<div class=upvote>${element.upvotes}</div>`);
      $upvote.appendTo($message);
      const $reply = $(`<div class=reply></div>`);
      $reply.appendTo($post);
    }
  };

  updateFeed();
});
