// inforequest.js

    // Info Request.
    app.post('/infoRequest', function (request, response) {
        var newInfoRequest = new db.InfoRequest (request.body);
        InfoRequest.save(function (err, infoRequest){
          if (err) { 
            return console.log("Got a get info request posting error: " + err);
          } 
          response.json(infoRequest);
        });
    });

  