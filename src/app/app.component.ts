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
    console.log(value);
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
            color: 'red',
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
}
