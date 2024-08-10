import View from "ol/View"
import Map from "ol/Map"
import { useEffect, useRef } from "react"
import * as Proj from 'ol/proj'; // 转化
import TileLayer from "ol/layer/Tile";
import XYZ from "ol/source/XYZ";
import {defaults as ControlDefaults, } from 'ol/control/defaults'
import Attribution from "ol/control/Attribution";

export default function OpenlayerSimple() {

    useEffect(() => {
        const view = new View({
            center: [113.26, 23.13], // 默认中心点
            projection: 'EPSG:4326', // 坐标系规则，使用经纬度坐标系
            // 或者直接用 Proj.transform，参数1是经纬度坐标，参数2是使用经纬度坐标系，参数3是转为EPSG:3857，因为默认的projection是'EPSG:3857'
            // center: Proj.transform([113.26, 23.13], 'EPSG:4326', 'EPSG:3857'),
            zoom: 11, // 默认缩放等级
            maxZoom: 20, // 最大缩放等级
            minZoom: 5, // 最小缩放等级
        });

        
        const tileLayer = new TileLayer({
            source: new XYZ({
                url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&scl=1&size=1&style=7&x={x}&y={y}&z={z}'
            })
        });
        
        new Map({
            target: 'map', 
            layers: [tileLayer], 
            view: view,
            controls: ControlDefaults().extend([
                new Attribution(), // 地图信息 没显示出来
                // new FullScreen(), // 全屏控件
                // new OverviewMap(), // 鸟瞰图 不知道用在哪里
                // new MousePosition(), // 鼠标位置
            ])
        });
        
    }, []);

    return (
        <div id='map' style={{ width: '100%', height: '100%' }}></div>
    )
}