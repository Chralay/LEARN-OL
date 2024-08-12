import View from "ol/View"
import Map from "ol/Map"
import { useEffect, useRef } from "react"
import * as Proj from 'ol/proj'; // 转化
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import { Feature } from "ol";
import Point from "ol/geom/Point";
import { Cluster } from "ol/source";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import Style from "ol/style/Style";
import { FeatureLike } from "ol/Feature";
import {Stroke, Fill, Circle as sCircle, Text} from 'ol/style'

export default function OpenlayerCluster() {
    let openMap = useRef<Map>().current;
    let markerSource = useRef<Cluster<Feature<Point>>>().current;
    let markerLayer = useRef<VectorLayer>().current;

    useEffect(() => {
        initMap();
        setMarker();
    }, []);

    function initMap() {
        const view = new View({
            center: Proj.fromLonLat([113.26, 23.13]),
            zoom: 11, // 默认缩放等级
            maxZoom: 20, // 最大缩放等级
            minZoom: 5, // 最小缩放等级
        });

        const tileLayer = new TileLayer({
            source: new XYZ({
                url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&scl=1&size=1&style=7&x={x}&y={y}&z={z}'
            })
        });
        
        openMap = new Map({
            target: 'map', 
            layers: [tileLayer], 
            view: view
        });
    }

    function setMarker() {
        setMarkerSource();

        markerLayer = new VectorLayer({
            source: markerSource,
            style: _setClusterStyle(),
        });

        openMap && openMap.addLayer(markerLayer);
    }

    function setMarkerSource() {
        const points = _getPoints();

        const features = points.map(item => {
            return new Feature({
                geometry: new Point(Proj.fromLonLat(item))
            })
        })
        markerSource = new Cluster({
            distance: 100,
            source: new VectorSource({
                features: features
            })
        })
        // 为什么要刷新?
        // if (markerLayer) {
        //     markerSource.refresh();
        // }
    }


    function _getPoints(): number[][] {
        return [
            [113.20,23.38], // 广州北
            [113.25,23.19], // 广州白云
            [113.26,23.15], // 广州
            [113.27,22.99], // 广州南
            [113.32,23.15], // 广州东
        ];
    }

    function _setClusterStyle() {
        const singlePointStyle = new Style({
            image: new sCircle({
              radius: 20,
              stroke: new Stroke({
                color: "#fff",
              }),
              fill: new Fill({
                color: "pink",
              }),
            }),
          });

        const morePointStyle =  (count: number) => new Style({
            image: new sCircle({
              radius: 20,
              stroke: new Stroke({
                color: "#fff",
              }),
              fill: new Fill({
                color: "orange",
              }),
            }),
            text: new Text({
              text: count.toString(),
              fill: new Fill({
                color: "#fff",
              }),
            }),
          });

        return (feature: FeatureLike) => {
            const count = feature.get('features').length;
            if(count === 1) {
                return singlePointStyle;
            } else {
                return morePointStyle(count);
            }
        };
    }

    return (
        <div id='map' style={{ width: '100%', height: '100%' }}></div>
    )
}