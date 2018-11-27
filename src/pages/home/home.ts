import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'
import request from 'request';
import { getHostElement } from '@angular/core/src/render3';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  ionViewDidEnter() {

    /*Initializing Map*/
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWVjaGFuIiwiYSI6ImNqbXd4ZmYzYTA0eWcza3J0NzVsNnNkcWoifQ.PQuBcFIs9STCQ6uf8DrJNw';
    var map = new mapboxgl.Map({
      style: 'mapbox://styles/aechan/cjmwxodn95lir2rmoq60ydb3m',
      center: [-89.4125, 43.0766],
      zoom: 15,
      pitch: 0,
      minZoom: 1, //restrict map zoom - buildings not visible beyond 13
      maxZoom: 17,
      container: 'map'
    });

    // geojson format example
    // var geojson = {
    //   type: 'FeatureCollection',
    //   features: [{
    //     type: 'Feature',
    //     geometry: {
    //       type: 'Point',
    //       coordinates: [-89.4155519, 43.077424]
    //     },
    //     properties: {
    //       title: 'Sullivan Residence Hall',
    //       description: "Sullivan's fridge is empty"
    //     }
    //   },
    //   {
    //     type: 'Feature',
    //     geometry: {
    //       type: 'Point',
    //       coordinates: [-89.41778898239136, 43.07775948865735]
    //     },
    //     properties: {
    //       title: 'Dejope Residence Hall',
    //       description: "Dejope's fridge is stocked"
    //     }
    //   },
    //   {
    //     type: 'Feature',
    //     geometry: {
    //       type: 'Point',
    //       coordinates: [-89.40695285797119, 43.07677990128432]
    //     },
    //     properties: {
    //       title: 'Elizabeth Waters Residence Hall',
    //       description: "Waters' fridge is stocked"
    //     }
    //   },
    //   {
    //     type: 'Feature',
    //     geometry: {
    //       type: 'Point',
    //       coordinates: [-89.4012451171875, 43.07382537092813]
    //     },
    //     properties: {
    //       title: 'Chadbourne Residence Hall',
    //       description: "Chad's fridge are stocked"
    //     }
    //   },
    //   {
    //     type: 'Feature',
    //     geometry: {
    //       type: 'Point',
    //       coordinates: [-89.40125584602356, 43.076764227759085]
    //     },
    //     properties: {
    //       title: 'College Liberary',
    //       description: "CoLi's fridge are stocked"
    //     }
    //   }]
    // };


    var geojson;
    // this function works correctly. It can get correct format geojson. But I dont get the asynchronous things

    // TODO now it can get correct-formated geojson. But the following foreach will run before it download the data, and output "geojson undefined" error
    var url = 'https://script.google.com/macros/s/AKfycbx9F0ORXrp-IiX0t7LmRxVyeKEk57Vu3wVrsbl_uzfkLGhfGh8/exec'
    request.get(url, function (error, response, body) {
      geojson = JSON.parse(body);
    })  

    // add markers to map
    geojson.features.forEach(function (marker) {

      // create a HTML element for each feature
      var el = document.createElement('div');
      el.id = 'marker';

      // make a marker for each feature and add to the map
      new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
          .setHTML('<h3>' + marker.properties.title + '</h3><p><div align="center">' + marker.properties.description + '</div></p>'))
        .addTo(map);
    });

  }

}

