"use strict";
init();

function loadJSON(callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open("GET", "data/properties.json", true);
  xobj.onreadystatechange = function() {
    if (xobj.readyState == 4 && xobj.status == "200") {
      // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}

function init() {
  loadJSON(function(response) {
    // Parse JSON string into object
    var raw = JSON.parse(response)[0];

    var name = document.getElementById("name");
    name.append(raw["Name"]);

    var address = document.getElementById("address");
    address.append(raw["Address"]);

    var propertyType = document.getElementById("property-type");
    propertyType.append(raw["Property Type"]);

    var totalBuildingArea = document.getElementById("total-building-area");
    totalBuildingArea.append(raw["Total Building Area"]);

    var tenancy = document.getElementById("tenancy");
    tenancy.append(raw["Tenancy"]);

    var noOfTenant = document.getElementById("no.-of-tenant");
    noOfTenant.append(raw["No. of Tenant"]);

    var website = document.getElementById("website");
    website.append(raw["Website"]);

    var propertyClass = document.getElementById("property-class");
    propertyClass.append(raw["Property Class"]);

    var yearBuilt = document.getElementById("year-built");
    yearBuilt.append(raw["Year Built"]);

    var floors = document.getElementById("floors");
    floors.append(raw["Floors"]);

    var description = document.getElementById("description");
    description.append(raw["Description"]);

    var table = raw["AVAILABILITIES"];
    var outHTML = "";
    var unit = null;
    var elTr = null;
    var record = "";
    var area = "";

    function addTableElements(fieldName) {
      var text = document.createTextNode(table[i][fieldName]);
      var elTd = document.createElement("td");
      elTd.appendChild(text);
      return elTd;
    }

    for (var i = 0; i < table.length; i++) {
      unit = addTableElements("Unit Name/Number");
      record = addTableElements("Record Type");
      area = addTableElements("Available Area");

      elTr = document.createElement("tr");
      elTr.appendChild(unit);
      elTr.appendChild(record);
      elTr.appendChild(area);

      var description = document.getElementById("ava");
      description.append(elTr);
    }
    var description = document.getElementById("ava");
    description.append(outHTML);
  });
}

var geocoder;
var map;
function initMap() {
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 16,
    center: { lat: -34.397, lng: 150.644 }
  });
  geocoder = new google.maps.Geocoder();
  codeAddress(geocoder, map);
}

function codeAddress(geocoder, map) {
  var address = document.getElementById("address").textContent;//"2277 Pickwick Dr, Camarillo, CA 93010, USA";
  geocoder.geocode({ address: address }, function(results, status) {
    if (status === "OK") {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      });
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}