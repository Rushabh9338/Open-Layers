import { Component, OnInit, VERSION } from '@angular/core';
import Draw, { createBox, createRegularPolygon } from 'ol/interaction/Draw.js';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import { OSM, Vector as VectorSource } from 'ol/source.js';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import Feature from 'ol/Feature';
import { Fill, Stroke, Style } from 'ol/style';
import CircleStyle from 'ol/style/Circle';
import { Polygon } from 'ol/geom';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  value: any;
  Map: Map;
  source;
  drawLayer;
  vector;
  valueParameter;

  constructor() {}

  ngOnInit() {
    const raster = new TileLayer({
      source: new OSM(),
    });

    this.source = new VectorSource({ wrapX: false });

    this.vector = new VectorLayer({
      source: this.source,
    });

    this.Map = new Map({
      layers: [raster, this.vector],
      target: 'map',
      view: new View({
        center: [-11000000, 4600000],
        zoom: 4,
      }),
    });

    // Specific radius for Drawing Circle
    //   const circle = new Circle([10, 10], 1000);
    //   // const test = circle.geLength();
    //   const feature = new Feature(circle);
    //   this.vectorLayer = new VectorLayer({
    //     source: new VectorSource({
    //       features: [feature],
    //     }),
    //   });

    //   this.map = new Map({
    //     layers: [this.vectorLayer],
    //     target: 'map',
    //     view: new View({
    //       center: [10, 10],
    //       zoom: 8,
    //     }),
    //   });
    //   this.vectorLayer.setStyle(function (feature) {
    //     return new Style({
    //       stroke: new Stroke({
    //         color: 'red',
    //         width: 2,
    //       }),
    //       fill: new Fill({
    //         color: 'rgba(255, 0, 0, 0.1)',
    //       }),
    //     });
    //   });
    // }
  }

  // addInteraction(){

  //   options = {
  //     div: "map",
  //     zoom: 2,
  //     center: [0, 0],
  //     layers: [
  //       new OpenLayers.Layer.OSM()
  //     ]
  //   };
  //   map = new OpenLayers.Map(options);
  //   vector = new OpenLayers.Layer.Vector();
  //   map.addLayer(vector);

  //   var point1 = new OpenLayers.Geometry.Point(0, 0);
  //   var point2 = new OpenLayers.Geometry.Point(1000000, 1000000);
  //   var point3 = new OpenLayers.Geometry.Point(2000000, 2000000);
  //   var radius = document.getElementById("amount").value;
  //   var mycircle = OpenLayers.Geometry.Polygon.createRegularPolygon(point2, radius, 40, 0);
  //   var featurecircle = new OpenLayers.Feature.Vector(mycircle);

  //   // var selected_polygon_style = {
  //   //     strokeWidth: 5,
  //   //     strokeColor: '#ff0000'
  //   //     // add more styling key/value pairs as your need
  //   // };

  //   // featurecircle.style = selected_polygon_style;

  //   marker1 = new OpenLayers.Feature.Vector(point1, null, {
  //     externalGraphic: "marker.png",
  //     graphicWidth: 32,
  //     graphicHeight: 32,
  //     fillOpacity: 1
  //   });
  //   marker1.style = {
  //     display: 'none'
  //   };

  //   marker2 = new OpenLayers.Feature.Vector(point2, null, {
  //     externalGraphic: "marker.png",
  //     graphicWidth: 32,
  //     graphicHeight: 32,
  //     fillOpacity: 1
  //   });

  //   marker3 = new OpenLayers.Feature.Vector(point3, null, {
  //     externalGraphic: "marker.png",
  //     graphicWidth: 32,
  //     graphicHeight: 32,
  //     fillOpacity: 1
  //   });
  //   vector.addFeatures([marker1, marker2, marker3, featurecircle]);

  //   var slider = document.getElementById("slider-range-max");
  //   slider.addEventListener("input", function(event) {
  //     var amount = document.getElementById("amount");
  //     amount.value = event.target.value;
  //     radius = amount.value;

  //     vector.removeFeatures([featurecircle]);
  //     var mycircle = OpenLayers.Geometry.Polygon.createRegularPolygon(
  //       point2,
  //       radius,
  //       40,
  //       0
  //     );

  //     featurecircle = new OpenLayers.Feature.Vector(mycircle);
  //     vector.addFeatures([featurecircle]);

  //     console.log(radius);
  //   });
  // }

  // addInteraction() {
  //   const typeSelect = <HTMLInputElement>document.getElementById('type');
  //   this.valueParameter = typeSelect.value;
  //   if (this.valueParameter !== 'None') {
  //     let geometryFunction;
  //     if (this.valueParameter === 'Square') {
  //       this.valueParameter = 'Circle';
  //       geometryFunction = createRegularPolygon(4);
  //     } else if (this.valueParameter === 'Box') {
  //       this.valueParameter = 'Circle';
  //       geometryFunction = createBox();
  //     } else if (this.valueParameter === 'Star') {
  //       this.valueParameter = 'Circle';
  //       geometryFunction = (coordinates, geometry) => {
  //         const center = coordinates[0];
  //         const last = coordinates[coordinates.length - 1];
  //         const dx = center[0] - last[0];
  //         const dy = center[1] - last[1];
  //         const radius = 200;
  //         console.log(radius);
  //         const rotation = Math.atan2(dy, dx);
  //         const newCoordinates = [];
  //         const numPoints = 12;
  //         for (let i = 0; i < numPoints; ++i) {
  //           const angle = rotation + (i * 2 * Math.PI) / numPoints;
  //           const fraction = i % 2 === 0 ? 1 : 0.5;
  //           const offsetX = radius * fraction * Math.cos(angle);
  //           const offsetY = radius * fraction * Math.sin(angle);
  //           newCoordinates.push([center[0] + offsetX, center[1] + offsetY]);
  //         }
  //         newCoordinates.push(newCoordinates[0].slice());
  //         if (!geometry) {
  //           geometry = new Polygon([newCoordinates]);
  //         } else {
  //           geometry.setCoordinates([newCoordinates]);
  //         }
  //         return geometry;
  //       };
  //     }
  //     this.drawLayer = new Draw({
  //       source: this.source,
  //       type: this.valueParameter,
  //       geometryFunction: geometryFunction,
  //     });
  //     this.Map.addInteraction(this.drawLayer);
  //   }

  /**
   * Handle change event.
   */
  // typeSelect.onchange = () => {
  //   this.Map.removeInteraction(this.drawLayer);
  //   this.addInteraction();
  // };

  // document.getElementById('undo').addEventListener('click', () => {
  //   this.drawLayer.removeLastPoint();
  // });
  // this.addInteraction();
  // }

  test(value: any) {
    if (this.drawLayer) this.Map.removeInteraction(this.drawLayer);
    if (value === 'clear') {
      this.vector.getSource()?.clear();
    } else {
      this.drawLayer = new Draw({
        source: this.source,
        type: value,
        style: new Style({
          fill: new Fill({
            color: 'blue',
          }),
          stroke: new Stroke({
            color: 'yellow',
            width: 2,
          }),
        }),
      });
      this.vector.setStyle(
        new Style({
          fill: new Fill({
            color: this.makePattern(),
          }),
          stroke: new Stroke({
            color: 'green',
            width: 5,

            // Solid Line
            // lineDash: [10, 0],

            // Dashed Line
            // lineDash: [10, 10],

            // Dash-Dotted Line
            // lineDash: [10, 10, 1, 10],

            // Dash-Dot-Dot
            // lineDash: [10, 10, 1, 10, 1, 10],

            // Dot
            // lineDash: [1, 10],
          }),
        })
      );
      this.Map.addInteraction(this.drawLayer);
    }
  }

  // makePattern = () => {
  //   var cnv = document.createElement('canvas');
  //   var ctx = cnv.getContext('2d');
  //   cnv.width = 6;
  //   cnv.height = 6;
  //   ctx.fillStyle = 'rgb(255, 0, 0)';

  //   for (var i = 0; i < 6; ++i) {
  //     ctx.fillRect(i, i, 1, 1);
  //   }

  //   return ctx.createPattern(cnv, 'repeat-x');
  // };

  // makePattern() {
  //   var myCanvas = document.createElement('canvas');
  //   var drawingContext = myCanvas.getContext('2d');

  //   var color1 = '#F2EEB3';
  //   var color2 = '#FF4C65';
  //   var numberOfStripes = 100;
  //   for (var i = 0; i < numberOfStripes * 2; i++) {
  //     var thickness = 300 / numberOfStripes;
  //     drawingContext.beginPath();
  //     drawingContext.strokeStyle = i % 2 ? color1 : color2;
  //     drawingContext.lineWidth = thickness;
  //     drawingContext.lineCap = 'round';

  //     // Vertical
  //     // drawingContext.moveTo(i * thickness + thickness / 2, 0);
  //     // drawingContext.lineTo(i * thickness + thickness / 2, 300);

  //     // Forward Diagonal
  //     // drawingContext.moveTo(i * thickness + thickness / 2 - 300, 0);
  //     // drawingContext.lineTo(0 + i * thickness + thickness / 2, 300);

  //     // Horizontal
  //     // drawingContext.moveTo(0, i * thickness + thickness / 2);
  //     // drawingContext.lineTo(300, i * thickness + thickness / 2);
  //     drawingContext.stroke();
  //   }
  //   return drawingContext.createPattern(myCanvas, 'repeat');
  // }

  //   var myCanvas = document.getElementById(“myCanvas”);
  // var drawingContext = myCanvas.getContext(“2d”);

  // var color1 = “#24A8AC”,color2=”#0087CB”;
  // var numberOfStripes = 30;
  // for (var i=0;i < numberOfStripes;i++){
  // var thickness = 300 / numberOfStripes;
  // drawingContext.beginPath();
  // drawingContext.strokeStyle = i % 2?color1:color2;
  // drawingContext.lineWidth =thickness;

  // drawingContext.moveTo(0,i*thickness + thickness/2);
  // drawingContext.lineTo(300,i*thickness + thickness/2);
  // drawingContext.stroke();
  // }
  //

  // Cross Pattern
  // makePattern() {
  //   var canvas = document.createElement('canvas');
  //   var ctx = canvas.getContext('2d');
  //   for (let i = 10; i < 200; i += 20) {
  //     ctx.moveTo(0, i);
  //     ctx.lineTo(canvas.width, i);
  //     ctx.stroke();
  //   }
  //   for (let i = 10; i < 400; i += 20) {
  //     ctx.moveTo(i, 0);
  //     ctx.lineTo(i, canvas.width / 2);
  //     // ctx.setTransform(1, 0.2, 0.8, 1, 0, 0);
  //     ctx.stroke();
  //   }

  //   return ctx.createPattern(canvas, 'repeat');
  // }

  makePattern() {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    for (let i = 10; i < 200; i += 20) {
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }
    for (let i = 10; i < 400; i += 20) {
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.width / 2);
      ctx.setTransform(1, 0.2, 0.8, 1, 0, 0);
      ctx.stroke();
    }

    return ctx.createPattern(canvas, 'repeat');
  }
}
// }
