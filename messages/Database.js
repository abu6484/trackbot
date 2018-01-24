var awb = []; // create an empty array


awb.push(
{
    key:   "72412345678",
    Name: "Eva Goldschmidt",
    EmailId: "eva@roche.ch",
    Company: "Roche Diagnostics",
    Mobile :"+417676767676",
    Description : "Your shipment 72412345678, with 6 pieces and 55 kilos, is booked on flight LX123 departing on 3.02.2017 from MAD to JFK. Thank you for choosing Swiss WoldCargo.",
    value: "Shipment Created"
},
{
    key:   "72412345679",
    Name: "Eva Goldschmidt",
    EmailId: "eva@roche.ch",
    Company: "Roche Diagnostics",
    Mobile :"+417676767676",
    Description : "Flight LX2027 has arrived in ZRH on  03.02.2017 at 17:25.",
    value: "Shipment Created"

},
{
    key:   "72412348670",
    shipmentready:'18.11.2017 01:45',
    Name: "Nils Fenner",
    EmailId: "nils1@abb.ch",
    Company: "ABB",
    Mobile :"+416767676767",
    shipmentdeparted:'18.11.2017 07:45',
    flightdeparture:'18.11.2017 08:45',
    FlightArrival :'18.11.2017 09:45',
    ShipmentArrived :'18.11.2017 10:10',   
    ShipmentReadyForPUp :'18.11.2017 10:45',
    ShipmentDelivered  :'Yet to deliver',
    Itemcount :'1 Pieces',
    value: "Shipment Arrived"
},
{
    key:   "72412345668",
    shipmentready:'18.11.2017 01:45',
    Name: "Eva Goldschmidt",
    EmailId: "eva@roche.ch",
    Company: "Roche Diagnostics",
    Mobile :"7676767676",
    Description: "Your shipment 72412345668 is ready for carriage at departure  airport MAD. It will be loaded on flight LX123 to ZRH on 03.02.2017 at 15:00.",
    value: "Shipment ready for carriage"
},
{
    key:   "72412345677",
    shipmentready:'18.11.2017 01:45',
    Name: "Christian Piguet",
    EmailId: "christian1@csem.ch",
    Company: "CSEM",
    Mobile :"+417676767678",
    shipmentdeparted:'18.11.2017 07:45',
    flightdeparture:'18.11.2017 08:45',
    FlightArrival :'18.11.2017 09:45',
    ShipmentArrived :'18.11.2017 10:10',   
    ShipmentReadyForPUp :'18.11.2017 10:45',
    ShipmentDelivered  :'Yet to deliver',
    Itemcount :'1 Pieces',
    value: "Shipment Arrived"
},
{
    key:   "72412345675",
    shipmentready:'18.11.2017 01:45',
    shipmentdeparted:'18.11.2017 07:45',
    Name: "Christian Piguet",
    EmailId: "christian1@csem.ch",
    Company: "CSEM",
    Mobile :"+417676767678",
    flightdeparture:'18.11.2017 08:45',
    FlightArrival :'18.11.2017 09:45',
    ShipmentArrived :'18.11.2017 10:10',   
    ShipmentReadyForPUp :'18.11.2017 10:45',
    ShipmentDelivered  :'Yet to deliver',
    Itemcount :'1 Pieces',
    value: "Shipment Arrived on 13-Nov-2017 at 5.30 AM"
},
{
    key:   "72412345674",
    shipmentready:'18.11.2017 01:45',
    shipmentdeparted:'18.11.2017 07:45',
    flightdeparture:'18.11.2017 08:45',
    Name: "Patrick Lambelet",
    EmailId: "patrick@heliotis.ch",
    Company: "Heliotis",
    Mobile :"+417676767679",
    FlightArrival :'18.11.2017 09:45',
    ShipmentArrived :'18.11.2017 10:10',   
    ShipmentReadyForPUp :'18.11.2017 10:45',
    ShipmentDelivered  :'Yet to deliver',
    Itemcount :'1 Pieces',
    value: "Shipment Arrived"
},
{
    key:   "72412345673",
    shipmentready:'18.11.2017 01:45',
    shipmentdeparted:'18.11.2017 07:45',
    flightdeparture:'18.11.2017 08:45',
    Name: "Patrick Lambelet",
    EmailId: "patrick@heliotis.ch",
    Company: "Heliotis",
    Mobile :"+417676767679",
    FlightArrival :'18.11.2017 09:45',
    ShipmentArrived :'18.11.2017 10:10',   
    ShipmentReadyForPUp :'18.11.2017 10:45',
    ShipmentDelivered  :'18.11.2017 11:45',
    Itemcount :'1 Pieces',
    value: "Shipment Arrived"
},
{
    key:   "72412345671",
    Name: "Eva Goldschmidt",
    EmailId: "eva@roche.ch",
    Company: "Roche Diagnostics",
    Mobile :"7676767678",
    Description : "Your shipment 72412345671 has been loaded on flight LX123 departing from MAD on 03.02.2017 at 9:05.Flight is planned to arrive at 10:50 on 03.02.2017 in ZRH.",
    value: "Shipment departed"
},
{
    key:   "72417345678",
    shipmentready:'18/11/2017',
    Name: "Eva Goldschmidt",
    EmailId: "eva@roche.ch",
    Company: "Roche Diagnostics",
    Mobile :"7676767678",
    Description: "Your shipment 72417345678 has been loaded on flight LX123 departing from MAD on 03.02.2017 at 9:05.Flight LX123 has departed  from MAD on 03.02.2017 at 9:05.Flight is planned to arrive at 10:50 on 03.02.2017 in ZRH.",
    value: "Aircraft movement outbound"
},
{
    key:   "72412245678",
    shipmentready:'18/11/2017',
    Name: "Nils Fenner",
    EmailId: "nils@abb.ch",
    Company: "ABB",
    Mobile :"7676767678",
    Description : " Your shipment 72412245678 has been loaded on flight LX123 departing from MAD on 03.02.2017 at 9:05. Flight LX123 has departed  from MAD on 03.02.2017 at 9:05. Flight LX123 has arrived in ZRH on  03.02.2017 at 9:05. ",
    value: "Aircraft movement inbound (multi leg)"
},
{
    key:   "72415345678",
    shipmentready:'18/11/2017',
    Name: "Nils Fenner",
    EmailId: "nils@abb.ch",
    Company: "ABB",
    Mobile :"7676767678",
    Description : "Your shipment 72415345678 has been unloaded in ZRH from flight LX123 on 03.02.2017 at 9:55. It will continue its journey toward JNB on flight LX123, departure planned on 10.02.2017 at 15:30.",
    value: "Freight received at destination (multi leg)"
},
{
    key:   "72402345668",
    shipmentready:'18/11/2017',
    Name: "Nils Fenner",
    EmailId: "nils@abb.ch",
    Company: "ABB",
    Mobile :"7676767678",
    Description: "Flight LX123 has arrived in ZRH on  03.02.2017 at 9:05.",
    value: "Aircraft movement inbound"
},
{
    key:   "72400345658",
    shipmentready:'18/11/2017',
    shipmentdeparted:'18/11/2017',
    Name: "Nils Fenner",
    EmailId: "nils@abb.ch",
    Company: "ABB",
    Mobile :"7676767678",
    Description : "Your shipment 72400345658 has been unloaded in ZRH from flight LX123 on 03.02.2017 at 9:55. Itbe soon ready for pick up.",
    value: "Freight received at destination"
},
{
    key:   "72472333658",
    shipmentready:'18/11/2017',
    shipmentdeparted:'18/11/2017',
    Name: "Christian Piguet",
    EmailId: "christian@csem.ch",
    Company: "CSEM",
    Mobile :"7676767678",
    Description : "Your shipment 72472333658 has been picked up and handed overs to you in JNB at 16.45 on 10.02.2017.",
    value: "Physical shipment delivery"
},
{
    key:   "72462399658",
    shipmentready:'18/11/2017',
    shipmentdeparted:'18/11/2017',
    Name: "Christian Piguet",
    EmailId: "christian@csem.ch",
    Company: "CSEM",
    Mobile :"7676767678",
    Description : "We are really sorry but your shipement 72462399658 has experienced an irregularity in MAD: the shipment has not been loaded as initially booked, due to non delivery by agent.  For more details, please visit our Track and trace tool or contact your local office. ",
    value: "Irreg. With reason code"
},
{
    key:   "72411100658",
    shipmentready:'18/11/2017',
    shipmentdeparted:'18/11/2017',
    Name: "Christian Piguet",
    EmailId: "christian@csem.ch",
    Company: "CSEM",
    Mobile :"7676767678",
    Description : "We are really sorry but your shipement 72411100658 has experienced an irregularity in MAD. Please visit our Track and trace tool or contact your local office. ",
    value: "Irreg. With no reason code"
},
{
    key:   "72488456789",
    shipmentready:'18/11/2017',
    shipmentdeparted:'18/11/2017',
    Name: "Christian Piguet",
    EmailId: "christian@csem.ch",
    Company: "CSEM",
    Mobile :"7676767678",
    Description : "Your shipment 72488456789 is ready for pick up at EWR. It can be collected within opening hours.",
    value: "Notification to customer"
});   

var flight = []; // create an empty array
flight.push(
{
    key:   "lx1266",
    EmailId: "tes2t@gmail.com",
    value: "Zurich (Kloten) to Copenhagen ETA - Wed 08:49 CET "
},
{
    key:   "lx1325",
    EmailId: "tes2t@gmail.com",
    value: "Domodedovo Int'l to Zurich (Kloten) ETA - Wed 10:28 CET"
}); 

// var availableAWB=[];
// availableAWB.push("Yes");
// availableAWB.push("No");

exports.awb = awb;
exports.flight = flight;
// exports.availableAWB = availableAWB;
