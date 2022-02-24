/*TODO
Style
Add Reply
Add timestamp
*/

$(document).ready(() => {
  // Global Variables
  let index = Math.floor(Math.random() * 4);
  let username = users[index][0];
  let img = users[index][1];

  // Function Definitions
  getMessages = async function () {
    return $.ajax({
      url: "http://localhost:3000/feed/",
      crossDomain: true,
      method: "GET",
      success: function (response) {
        console.log(response);
      },
      error: function (err) {
        console.log(err);
      },
    });
  };

  postComment = function () {
    // Reset user to a new random one
    let text = document.getElementById("post_field").value;
    if (text.length === 0) {
      alert("Please Type a Message!");
    }
    if (text.length > 1000) {
      alert("There's a 1000 Character Limit");
    }
    // Structure data object for post request
    let obj = {
      username: username,
      text: text,
      img: img,
    };
    $.ajax({
      url: "http://localhost:3000/submit/",
      method: "POST",
      crossDomain: true,
      data: obj,
      success: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
    index = Math.floor(Math.random() * 4);
    username = users[index][0];
    img = users[index][1];
    $(".profile").attr("src", img);
    document.getElementById("post_field").value = null
  };

  upVote = function () {
    let id = event.target.id;
    console.log(id);
    $.ajax({
      url: "http://localhost:3000/upvote/",
      method: "PUT",
      crossDomain: true,
      data: id,
      succes: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
    updateFeed();
  };

  // Declaring App and Title
  const $app = $("#app");
  $app.html("");
  const $title = $("<h2>Discussion</h2>");
  $title.appendTo($app);

  // Comment Post Section
  const $post = $("<div id=post></div>");
  $post.appendTo($app);

  const $currentUser = $(`<img class=profile src=${img} width=50 height=50>`);
  $currentUser.appendTo($post);

  const $input = $(
    "<input type=text id=post_field placeholder='What Are Your Thoughts?''></input>"
  );
  $input.appendTo($post);

  const $comment = $(`<button onClick=postComment()>Comment</button>`);
  $comment.appendTo($post);

  const $discussion = $("<div id=discussion><hr></hr></div>");
  $discussion.appendTo($app);

  // Feed Section
  const updateFeed = async () => {
    $discussion.empty();

    let data = await getMessages();
    for (element of data) {
      let src = element.img;
      let id = element.id;

      const $message = $(`<div id=message></div>`);
      $message.appendTo($discussion);
      const $leftBox = $("<div id=leftBox></div>");
      $leftBox.appendTo($message);
      const $rightBox = $("<div id=rightBox></div>");
      $rightBox.appendTo($message);

      // Left components
      const $user = $(`<div class=user>${element.username}</div>`);
      $user.appendTo($leftBox);
      const $userIMG = $(
        `<img class=profile src=${src} alt=load width=50 height=50>`
      );
      $userIMG.appendTo($leftBox);

      // Right components
      const $textContainer = $("<div id=textContainer></div>");
      $textContainer.appendTo($rightBox);
      const $text = $(`<div id=messageText>${element.text}</div>`);
      $text.appendTo($textContainer);
      const $upvoteContainer = $("<div id=upvoteContainer></div>");
      $upvoteContainer.appendTo($rightBox);
      const $upvote = $(
        `<div class=upvote id=${id} onClick=upVote()>∆ Upvote</div>`
      );
      $upvote.appendTo($upvoteContainer);
      const $upvoteCount = $(`<div class=upvoteCount>${element.upvotes}</div>`);
      $upvoteCount.appendTo($upvoteContainer);

      const $reply = $(`<div class=reply></div>`);
      $reply.appendTo($post);
    }
  };

  updateFeed();
});

// Storing usernames and urls to randomize on post
const users = [
  [
    "Shoeless Joe",
    "https://deadline.com/wp-content/uploads/2019/06/fieldofdreamsliotta.jpg",
  ],
  [
    "Blinky",
    "https://cdn.imgbin.com/21/0/10/imgbin-ms-pac-man-pac-man-world-3-ghosts-packman-5ypZhN0Pp6NfnqcYa7BjJ9RJz.jpg",
  ],
  ["Yoda", "https://pbs.twimg.com/media/DYL3NBVW4AAH8cR.jpg"],
  [
    "Moaning Myrtle",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPSuFQPdBIL-Y_Chdil20jGyHYg3ez74Z3dxFUdTLC5aQUl-pOqcZaXrBH_NYl80Za0iw&usqp=CAU",
  ],
  [
    "Samara",
    "https://e00-marca.uecdn.es/assets/multimedia/imagenes/2019/10/07/15704611556564.png",
  ],
];
