$(function(){

  socket.on('hello', function (data) {
    console.log("On vient d'arriver : on affiche la liste des gens connectés");
    console.log('Données reçues :');
    console.log(data);

    data.list.forEach(function(personId) {
      addPerson(personId);
    })
  });

  socket.on('someoneHasConnected', function (data) {
    console.log("Quelqu'un vient de se connecter : on l'affiche");
    console.log('Données reçues :');
    console.log(data);

    addPerson(data.id);
  });

  socket.on('someoneHasDisconnected', function (data) {
    console.log("Quelqu'un vient de partir : on le supprime");
    console.log('Données reçues :');
    console.log(data);

    removePerson(data.id);
  });

  function addPerson(personId) {
    $('#people').append('<div class="person" data-id="'+personId+'">'+personId+'</div>');
  }

  function removePerson(personId) {
    $('.person[data-id="'+personId+'"]').fadeOut();
  }

});
