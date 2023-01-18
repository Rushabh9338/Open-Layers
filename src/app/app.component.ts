import { Component, OnInit, VERSION } from '@angular/core';
import Draw from 'ol/interaction/Draw.js';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import { OSM, Vector as VectorSource } from 'ol/source.js';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import Feature from 'ol/Feature';
import { Fill, Stroke, Style } from 'ol/style';
import CircleStyle from 'ol/style/Circle';

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
  }

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
