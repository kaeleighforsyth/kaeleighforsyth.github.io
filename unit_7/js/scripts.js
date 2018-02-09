console.log('script loaded');

// Only run the code once the page has loaded
$(document).ready(function() {

  // This is your Firebase Database - we need to load it up
  var messagesRef = new Firebase("https://heheheheheheh-1e7e8.firebaseio.com/");

  // NOW WE CREATE A REFERENCE TO FIREBASE

  // These are the input fields where we're
  // grabbing our data from
  var messageField = $('#messageInput');
  var nameField = $('#nameInput');
  var messageList = $('#msgList');

  //
  $('#submit-msg').click(function(){
    //GET OUR FIELD VALUES
    var username = nameField.val();
    var message = messageField.val();
    messageField.val('');
    //SAVE DATA TO FIREBASE AND EMPTY THE FIELDS
    messagesRef.push({
      chat: {
        name: username,
        text: message
      }
    });
    // EMPTY THE FIELDS
    messageField.val('');
    nameField.val('');
  });

  $('#submit-msg').click(function(){
    console.log('click')
  })

  // Add a callback that is triggered for each chat message.
  messagesRef.on('child_added', function(snapshot) {
    //GET DATA
    var data = snapshot.val();
    var username = data.chat.name || "anonymous";
    var message = data.chat.text;

    //CREATE ELEMENTS MESSAGE & SANITIZE TEXT
    var messageElement = $("<li>");
    var nameElement = $("<strong class='example-chat-username'></strong>")
    nameElement.text(username + ' says...');
    messageElement.text(message).prepend(nameElement);

    //ADD MESSAGE
    messageList.append(messageElement)

    //SCROLL TO BOTTOM OF MESSAGE LIST
    messageList[0].scrollTop = messageList[0].scrollHeight;
  });


  function clearField() {
    console.log('clearing');
    setTimeout(function() {
      $('#messageInput').empty();
      $('#messageInput').val('');
    }, 10);
  }
});
