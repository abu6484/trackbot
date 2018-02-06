// This loads the environment variables from the .env file
//require('dotenv-extended').load();
//final_versionv4.1

var builder = require('botbuilder');
var restify = require('restify');
var path = require('path');
var database = require(path.join(__dirname, "./Database.js"));
var env = require('dotenv');
var botbuilder_azure = require('botbuilder-azure');
var EmailId_arg = "";
//var Lowercase = require('lower-case');

env.config();

var useEmulator = (process.env.NODE_ENV == 'development');

var connector = useEmulator ? new builder.ChatConnector() : new botbuilder_azure.BotServiceConnector({
    appId: process.env['MicrosoftAppId'],
    appPassword: process.env['MicrosoftAppPassword'],
    stateEndpoint: process.env['BotStateEndpoint'],
    openIdMetadata: process.env['BotOpenIdMetadata']
});

if (useEmulator) {
    //var restify = require('restify');
    //var server = restify.createServer();
    //server.listen(3978, function() {
    //    console.log('test bot endpont at http://localhost:3978/api/messages');
    //});
    var server = restify.createServer();
    server.listen(process.env.port || process.env.PORT || 3978, function () {
        console.log('%s listening to %s', server.name, server.url);
    });

    server.post('/api/messages', connector.listen());
    //bot.localePath(path.join(__dirname, './locale'));
} else {
    module.exports = { default: connector.listen() }
}

// Setup Restify Server
//var server = restify.createServer();
//server.listen(process.env.port || process.env.PORT || 3978, function () {
//    console.log('%s listening to %s', server.name, server.url);
//});

// Create connector and listen for messagesnpm install arraylist
//var connector = new builder.ChatConnector({
//  appId: process.env.MICROSOFT_APP_ID,
//  appPassword: process.env.MICROSOFT_APP_PASSWORD
//});

//server.post('/api/messages', connector.listen());
var HelpMessage = '';
var UserNameKey;
var UserWelcomedKey;
var emailIdMobile = '';
var AWB_arg = '';
// var urls = "https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/8f41d0fb-d7f1-4f6f-87e4-d3ece31ba8c0?subscription-key=3576f9b91fdf4762b5a0dd790e68a1af&verbose=true&timezoneOffset=5.5&q=";
// var emailMessage ="-----Original Message----- From: ORD Dario Hernandez [mailto:dhernandez@worldcourier.com] Sent: Montag, 17. Juli 2017 16:32 To: WERNER, WILLIAM ; SLAVIC, ZEMKA SWISS ; SESTIC, MIRJANA ; MCREDMOND, DANIEL Cc: ORD Operations Subject: MAWB#724-61316824 JOB#4686 XPRESSO SERVICE Please provide us with a booking as per the following information: MAWB: 724-61316824 Pieces: 4 pieces Weight: 158.8 KGS Dims: 3 @ 33x18x19 IN & 1 @ 16x16x16 IN Commodity: RESEARCH SAMPLES / UN1845,DRY ICE,9 – 1 X 15 KGS & 3 X 30 KGS Routing: ORD – ZRH Flights: LX 009 / 17 JULY Service: XPRESSO Screened: YES If you need anything further, please feel free to contact us Dario Hernandez World Courier, an AmerisourceBergen company Operations Agent ORD 3737 N. 25th Avenue Schiller Park, IL, 60176 Tel: 1-630-694-9077 Fax: 1-630-694-9070 www.worldcourier.com _____ World Courier, Inc. Registered office: 1313 Fourth Avenue, New Hyde Park, New York, 11040, USA. This e-mail, including any attachments, may contain confidential and/or privileged information. It is for the sole use of the intended recipient. If you have received it in error, please notify the sender immediately and delete it from your system. Any unauthorised copying, disclosure, distribution, use or retention of this e-mail or the information in it is strictly forbidden. Please note we reserve the right to monitor all e-mail communication for quality assurance, policy compliance and/or security purposes. Play your part in saving the environment - please do not print this e-mail unless absolutely necessary "

// Setup bot with default dialog
var bot = new builder.UniversalBot(connector, [
    (session, next) => {
        // is user's name set? 
        var userName = session.userData[UserNameKey];
        if (!userName) {
            return session.beginDialog('greet');
        }
        // has the user been welcomed to the conversation?
        if (!session.privateConversationData[UserWelcomedKey]) {
            //  session.privateConversationData[UserWelcomedKey] = true;
            //session.send('Welcome back to Swiss Cargo AWB/Flight search.', "" , "", HelpMessage);
            return session.beginDialog('greet');
        }

        if (session.message.text.toLowerCase()  == "hi"  || session.message.text.toLowerCase()  == "hello"  || session.message.text.toLowerCase() == "hey" ) {
            session.reset("greet");
        }

        if (session.message.text.toLowerCase()  == "discontinue") {
            session.endConversation("Thank you! It was nice speaking to you. Have a nice day...");
        }

        else {
            //if(session.message.text.length !=11)
            // {
            //session.beginDialog('GetUserData');
            //}
            // else{
            session.beginDialog('MainMethod');

            // }
        }
    }
]);




bot.dialog('GetUserData', [
    (session, args) => {
        var list = [];
        var list2 = [];
        var list3 = [];


        var input = EmailId_arg; //session.userData[UserNameKey];
        var inputemail = input.replace("U+0040;", "@");
        database.awb.forEach(function (element) {
            if ((element.EmailId.toString() == emailIdMobile.toLowerCase() || element.Mobile.toString() == emailIdMobile)) {

                if (element.key != AWB_arg) {
                    list.push(element.key)
                }
            }
        })

        //creating the list for the user selection


        if (list.length > 0) {

            list.push('None of the above')
            list.push('Discontinue')

            builder.Prompts.choice(session, 'We also found some other AWB numbers on your name. You can get their status by clicking on the relevent AWB number or come out of the process by clicking on discontinue ?', list, { listStyle: builder.ListStyle.button });

        }


        else {
            builder.Prompts.text(session, 'I could not find an AWB number for the details that you entered. Is it possible to check and please enter the valid AWB number?')// try to add choices
        }



    }, function (session, result) {

        var notlist = session.message.text;
        var list1 = [2]
        if (notlist == 'None of the above') {
            list1[0] = 'Track By AWB Number';
            list1[1] = 'Track By Flight Number';
            builder.Prompts.choice(session, 'Can you please select any one option from the list below:', list1, { listStyle: builder.ListStyle.button }),
                function (session, result) {
                    var intent = session.message.text.split('=');
                    if (intent[1] == "Track By AWB Number") {
                        builder.Prompts.text(session, 'If you could not find the number in the above list, I request you to kindly enter AWB/Flight number to search')
                    }
                    //LuisAjax(session.message.text,session);          
                }

        }
        else {

            LuisAjax(session.message.text, session);
        }
    }

]),
    // Greet dialogbu
    bot.dialog('greet', new builder.SimpleDialog(function (session, results) {
        var Search = session.message.text;      
        var name = "";
        var company = "";
        var intent = Search.split('=');       
         if (Search  == "Discontinue" || intent[1] == "Discontinue"){
            session.endConversation("Thank you! It was nice speaking to you. Have a nice day...");      
        }
        else if (Search == "Track another Shipment"){
            session.beginDialog("EndMethod");
        }
        else if (intent[1] == "Track Shipment"){
            session.send("Please enter an AWB number so I can start tracking your cargo?");
        }
        else if (!session.privateConversationData[UserWelcomedKey] && intent[1] != "Track Shipment" && session.message.text.length < 11){
            var thumbnail = new builder.ThumbnailCard(session);
            thumbnail.title("Welcome to Swiss World Cargo");
            thumbnail.images([builder.CardImage.create(session, 'https://i3ltrackbotdemo.blob.core.windows.net/images/image-humanoid.PNG')]);
            //thumbnail.images([builder.CardImage.create(session,"C:/Users/Public/Pictures/Sample Pictures/girl-icon.PNG")]);          
            // thumbnail.images([builder.CardImage.create(session,"C:/Users/Public/Pictures/Sample Pictures/Swiss.PNG")]);
            var text = '\n\r Hi, I am Heidi, your Swiss WorldCargo virtual assistant. I can help you with tracking shipments or finding contacts. I am constantly learning and soon I will be able to assist you in other situations as well. What would you like to do ?. \r\n';
            thumbnail.text(text);
            thumbnail.tap(new builder.CardAction.openUrl(session, "https://www.swissworldcargo.com/about_us/company/our_story"));
            thumbnail.buttons([new builder.CardAction.dialogAction(session, " ", "Track Shipment", "Track Shipment"), new builder.CardAction.openUrl(session, "https://www.swissworldcargo.com/en/web/20184/station-info", "Contact US"),new builder.CardAction.dialogAction(session, " ", "Discontinue", "Discontinue")])
            //thumbnail.buttons([new builder.CardAction.dialogAction(session," ","",""),new builder.CardAction.openUrl(session,"https://www.swissworldcargo.com/en/web/20184/station-info","Contact US")])      
            var messagess = new builder.Message(session).attachments([thumbnail]);
            // session.send(messagess);
            builder.Prompts.text(session, messagess);
            //builder.Prompts.text(session, 'Please enter your email address or phone number?', {retryPrompt : "Please enter your Name or Mobile Number..."});
        }
        else {
            if (Search.toLowerCase()  == "hi"  || Search.toLowerCase()  == "hello"  || Search.toLowerCase() == "hey" ){
                session.reset("greet");
            }
            LuisAjax(session.message.text, session);
          }
    }));

bot.localePath(path.join(__dirname, './locale'));

bot.dialog('MainMethod', [
    (session, args) => {
        LuisAjax(session.message.text, session);
    }
]);

bot.dialog('EndMethod', [
    (session, args) => {
        if (session.message.text.length >= 11 && session.message.text != "Track another Shipment") {
            LuisAjax(session.message.text, session);
            //session.reset();
        }
        else {
            // session.cancelDialog();
            session.send("Please enter an AWB number so I can start tracking your cargo ?");
        }

    }
]);
// AWB Search
bot.dialog('Note.Search', [
    (session, args) => {
        session.sendTyping();
        var AWBNumber = args == undefined ? session.message.text.replace(/\s/g, '') : args;
        var match = false;
        var userName = session.userData[UserNameKey];
        var tableHTML = "";
        var list = [2];
        //list.push("Exit");
        
        list[0] = ("Track another Shipment");
        list[1] = ("Discontinue");
        if (AWBNumber.length != 11)
            session.send('Invalid AWB Number format. Please enter valid AWB number in format 1XX12XXXX78');
        else {
            database.awb.forEach(function (element) {
                if (element.key.toString() == AWBNumber) {
                    //session.endDialogWithResult({response :element.value});                
                    // var tableHTML = '<table style="padding:10px;border:1px solid black;"><tr ><th style="background-color:#c6c6c6;width:100px;hight:200px">Shipment Ready For Carriage </th><td style="background-color:#008000;width:4px"></td > <td align="center">'+element.shipmentready +'</td><td align="center">'+element.Itemcount +'</td></tr><tr ><th style="background-color:#c6c6c6">Shipment Departed</th><td style="background-color:#008000;width:4px"></td > <td align="center">'+element.shipmentdeparted +'</td><td align="center">'+element.Itemcount +'</td></tr><tr ><th style="background-color:#c6c6c6">Flight Departure </th><td style="background-color:#008000;width:4px"></td > <td align="center">'+element.flightdeparture +'</td><td align="center">'+element.Itemcount +'</td></tr><tr ><th style="background-color:#c6c6c6">Flight Arrival</th><td style="background-color:#008000";width:4px></td > <td align="center">'+element.FlightArrival +'</td><td align="center">'+element.Itemcount +'</td></tr><tr ><th style="background-color:#c6c6c6">Shipment Arrived </th><td style="background-color:#008000;width:4px"></td > <td align="center">'+element.ShipmentArrived +'</td><td align="center">'+element.Itemcount +'</td></tr><tr ><th style="background-color:#c6c6c6">Shipment Ready For Pick-Up  </th><td style="background-color:#008000;width:4px"></td > <td align="center">'+element.ShipmentReadyForPUp +'</td><td align="center">'+element.Itemcount +'</td></tr><tr ><th style="background-color:#c6c6c6">Shipment Delivered </th><td style="background-color:#008000;width:4px"></td > <td align="center">'+element.ShipmentDelivered +'</td><td align="center">'+element.Itemcount +'</td></tr></table>';
                    //     if(ShipmentDelivered=="Yet to deliver")
                    //    {
                    //    tableHTML = '<table style="padding:10px;border:1px solid black;"><tr><td>AWB Number :'+element.key+'<td><td><img src='+"C:/Users/19242/Pictures/abb.PNG"+'></img></td></tr></table><table style="padding:10px;border:1px solid black;"><tr ><th style="background-color:#c6c6c6;width:100px;hight:200px">Shipment Ready For Carriage </th><td style="background-color:#008000;width:4px"></td > <td align="center">'+element.shipmentready +'</td><td align="center">'+element.Itemcount +'</td></tr><tr ><th style="background-color:#c6c6c6">Shipment Departed</th><td style="background-color:#008000;width:4px"></td > <td align="center">'+element.shipmentdeparted +'</td><td align="center">'+element.Itemcount +'</td></tr><tr ><th style="background-color:#c6c6c6">Flight Departure </th><td style="background-color:#008000;width:4px"></td > <td align="center">'+element.flightdeparture +'</td><td align="center">'+element.Itemcount +'</td></tr><tr ><th style="background-color:#c6c6c6;width:100px;hight:200px">&nbsp</th> <td align="center"></td><td align="center"></td></tr><tr ><th style="background-color:#c6c6c6;width:100px;hight:200px"> &nbsp</th></td> <td align="center"></td><td align="center"></td></tr><tr ><th style="background-color:#c6c6c6;width:100px;hight:200px">&nbsp  </th> <td align="center"></td><td align="center"></td></tr><tr ><th style="background-color:#c6c6c6;width:100px;hight:200px"></th><td style=width:4px"></td > <td align="center">'+element.ShipmentDelivered +'</td><td align="center">'+element.Itemcount +'</td></tr></table>';
                    //tableHTML = '<table style="padding:10px;border:1px solid black;"><tr><td>AWB Number :'+element.key+'<td><td><img src='+"https://i3ltrackbotdemo.blob.core.windows.net/images/abb.PNG"+'></img></td></tr></table><table style="padding:10px;border:1px solid black;"><tr ><td style="background-color:#c6c6c6;width:100px;hight:200px">Shipment Ready For Carriage </td><td style="background-color:#008000;width:3px;border-left: 1px solid black;border-right: 1px solid black;"></td > <td align="center">'+element.shipmentready +'</td><td align="center">'+element.Itemcount +'</td></tr><tr ><td style="background-color:#c6c6c6">Shipment Departed</td><td style="background-color:#008000;width:3pxp;border-left: 1px solid black;border-right: 1px solid black;"></td > <td align="center">'+element.shipmentdeparted +'</td><td align="center">'+element.Itemcount +'</td></tr><tr ><td style="background-color:#c6c6c6">Flight Departure </td><td style="background-color:#008000;width:3px;border-left: 1px solid black;border-right: 1px solid black;"></td > <td align="center">'+element.flightdeparture +'</td><td align="center">'+element.Itemcount +'</td></tr><tr ><th style="background-color:;width:100px;hight:200px">&nbsp</th> <td align="center" style="width:3px;border-left: 1px solid black;border-right: 1px solid black;"></td><td align="center"></td></tr><tr ><th style="background-color:;width:100px;hight:200px"> &nbsp</th></td> <td align="center></td><td align="center style="width:3px;border-left: 1px solid black;border-right: 1px solid black;"></td></tr><tr ><th style="background-color:;width:100px;hight:200px">&nbsp  </th> <td align="center"; style="width:3px;border-left: 1px solid black;border-right: 1px solid black;"></td><td align="center";></td></tr><tr ><th style="background-color:;width:100px;hight:200px"></th><td style="width:3px;border-left: 1px solid black;border-right:  1px solid black;"></td > <td align="center">'+element.ShipmentDelivered +'</td><td align="center">'+element.Itemcount +'</td></tr></table>';
                    session.send(element.Description);
                    session.send("[Click here or detailed tracking](https://www.swissworldcargo.com/track_n_trace)");
                    //    }
                    // else{
                    //      tableHTML = '<table style="padding:10px;border:1px solid black;"><tr ><th style="background-color:#c6c6c6;width:100px;hight:200px">Shipment Ready For Carriage </th><td style="background-color:#008000;width:4px"></td > <td align="center">'+element.shipmentready +'</td><td align="center">'+element.Itemcount +'</td></tr><tr ><th style="background-color:#c6c6c6">Shipment Departed</th><td style="background-color:#008000;width:4px"></td > <td align="center">'+element.shipmentdeparted +'</td><td align="center">'+element.Itemcount +'</td></tr><tr ><th style="background-color:#c6c6c6">Flight Departure </th><td style="background-color:#008000;width:4px"></td > <td align="center">'+element.flightdeparture +'</td><td align="center">'+element.Itemcount +'</td></tr><tr ><th style="background-color:#c6c6c6">Flight Arrival</th><td style="background-color:#008000";width:4px></td > <td align="center">'+element.FlightArrival +'</td><td align="center">'+element.Itemcount +'</td></tr><tr ><th style="background-color:#c6c6c6">Shipment Arrived </th><td style="background-color:#008000;width:4px"></td > <td align="center">'+element.ShipmentArrived +'</td><td align="center">'+element.Itemcount +'</td></tr><tr ><th style="background-color:#c6c6c6">Shipment Ready For Pick-Up  </th><td style="background-color:#008000;width:4px"></td > <td align="center">'+element.ShipmentReadyForPUp +'</td><td align="center">'+element.Itemcount +'</td></tr><tr ><th style="background-color:#c6c6c6">Shipment Delivered </th><td style="background-color:#008000;width:4px"></td > <td align="center">'+element.ShipmentDelivered +'</td><td align="center">'+element.Itemcount +'</td></tr></table>';
                    //     }

                    //var message = {
                    //   type: 'message',
                    //   textFormat: 'xml', 
                    //   text: tableHTML
                    //};   

                    // var tableHTML = '<table style="padding:10px;border:1px solid black;"><tr style="background-color:#c6c6c6"><th>Countries</th><th>Capitals</th><th>Population</th><th>Language</th></tr><tr><td>USA</td><td>Washington D.C.</td><td>309 million</td><td>English</td></tr><tr><td>Sweden</td><td>Stockholm</td><td>9 million</td><td>Swedish</td></tr></table>';
                    // var message = {
                    //     type: 'message',
                    //     textFormat: 'xml', 
                    //     text: tableHTML
                    // };
                    //   session.cancelDialog();
                    //session.userData[UserNameKey] ="";
                    //session.send(message);

                    // session.send('Thank You! I hope I could help you in tracking your shipment. For all other information, request you to kindly contact directly over the phone.');
                    builder.Prompts.choice(session, 'Please select any one option from list ?', list, { listStyle: builder.ListStyle.button }),
                        ///  function(session,result){
                        //  var check = session.message.text();
                        // if(check =="contu"){
                        ///// session.beginDialog("")
                        // }
                        // }
                        //console.log(table);  
                        // session.cancelDialog();



                        match = true;
                }

            }, this);

            if (!match)
                session.send('AWB not found. Please enter valid AWB number');
        }
    }
]).triggerAction({ matches: 'Note.Search' });

// Flight Search
bot.dialog('Note.Flight', [
    (session, args) => {
        session.sendTyping();
        var FlightNumber = args == undefined ? session.message.text.replace(/\s/g, '') : args;

        var match = false;
        var userName = session.userData[UserNameKey];
        if (FlightNumber.length > 6)
            session.send('Invalid Flight Number format. Please enter valid Flight number upto 4 digit');
        else {
            database.flight.forEach(function (element) {
                if (element.key.toString() == FlightNumber) {
                    //session.endDialogWithResult({response :element.value});
                    session.endDialog(element.value);
                    session.send('Please enter AWB/Flight number to search');
                    match = true;
                }
            }, this);
            if (!match)
                session.send('Flight not found. Please enter valid Flight number');
        }

    }
]).triggerAction({ matches: 'Note.Flight' });

bot.localePath(path.join(__dirname, './locale'));

function LuisAjax(statement, session) {
    var HttpsProxyAgent = require('https-proxy-agent');
    var request = require('request');
    var proxy = 'http://10.6.13.87:8080';
    var agent = new HttpsProxyAgent(proxy);
    if (statement.length == 11)
        statement = "Please find the my awb " + statement;
    else
        statement = statement;
    request({
        uri: 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/6f1605d5-b7c9-4692-94a7-5b33f0d9a0b7',

        method: "POST",
        body: "'" + statement.toString() + "'",
        parameters: {
            'verbose': true,
            'timezoneOffset': 5.5,
            'subscription-key': '50e406712b5f423fbc990e8c3795ec58',
        },
        headers: {
            'Ocp-Apim-Subscription-Key': '50e406712b5f423fbc990e8c3795ec58',
        },
        //agent: agent,
        timeout: 10000,
        followRedirect: true,
        maxRedirects: 10
    }, function (error, response, body) {
        var luisresult = JSON.parse(body);
        if (luisresult.topScoringIntent.intent == 'Note.Search') {
            if (luisresult.entities[0] != undefined) {
                var args = luisresult.entities[0].entity.replace(/\s/g, '');
                session.beginDialog('Note.Search', args);
            }

            else if (session.message.text.toLowerCase()  == "discontinue") {
                session.endConversation("Thank you! It was nice speaking to you. Have a nice day...");
            }

            else { session.send("Please enter Valid AWB/Flight number to search"); }

        }
        else if (luisresult.topScoringIntent.intent == 'Note.Flight') {

            if (luisresult.entities[0] != undefined) {
                var args = luisresult.entities[0].entity.replace(/\s/g, '');
                session.beginDialog('Note.Flight', args);
            }

            else { session.send("Please enter an AWB number so I can start tracking your cargo"); }

        }
        else if (luisresult.topScoringIntent.intent == 'None') {

            var Search = session.message.text;
            var intent = Search.split('=');

            if (intent[1] == "Track AWB") {
                // session.userData[UserNameKey] = "Test";
                return session.endDialog('Please enter Swiss Cargo AWB Number /Email ID to track ?');
            }

            else if (intent[1] == "Track Flight") {
                // session.userData[UserNameKey] = "Test";
                return session.endDialog('Please enter Flight number to track ?');
            }
            else if (luisresult.query.toLowerCase()  == "hi"  || luisresult.query.toLowerCase()  == "hello"  || luisresult.query.toLowerCase() == "hey" ) {
                session.reset("greet");
            }
            else {
                session.send("Please enter an AWB number so I can start tracking your cargo");
               
            }
        }
    });
}

