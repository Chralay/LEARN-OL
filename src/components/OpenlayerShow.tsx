import { useEffect } from 'react';
import { Map, View } from 'ol'; // 地图Collection
import * as Proj from 'ol/proj'; // 转化
import { Tile as TileLayer } from 'ol/layer'; // 图层
// import { XYZ, Vector as VectorSource } from 'ol/source'; // 资源
import { XYZ } from 'ol/source'; // 资源
// import Draw from 'ol/interaction/Draw';
import './OpenlayerShow.css'

// let drawSource: VectorSource<any> | undefined = undefined;
// let drawLayer = null;
// let draw: Draw | null = null;
// let modify = null;

const OpenlayerShow = () => {
    // const [map, setMap] = useState<Map | null>(null); // 地图
    // const [view, setView] = useState<View | null>(null); // 地图视图
    // const [drawType, setDrawType] = useState<number | null>(null); // 画板类型 1圆形 2矩形 3多边形

    // 设置绘制类型
    // function setDraw(type: number) {
    //     let kind;
    //     let geometryFunction;
    //     if (type === 1) {
    //         kind = 'Circle';
    //     } else if (type === 2) {
    //         kind = 'Circle';
    //         geometryFunction = createBox();
    //     } else if (type === 3) {
    //         kind = 'Polygon';
    //     }
    //     draw = new Draw({
    //         source: drawSource,
    //         type: kind as Type,
    //         geometryFunction: geometryFunction,
    //         style: new Style({
    //             fill: new Fill({
    //                 color: 'rgba(237, 57, 47, 0.35)'
    //             }),
    //             stroke: new Stroke({
    //                 color: '#ED392F',
    //                 width: 4,
    //                 lineDash: [10]
    //             }),
    //             image: new CircleStyle({
    //                 radius: 7,
    //                 fill: new Fill({
    //                     color: '#ED392F'
    //                 })
    //             })
    //         })
    //     });
    //     map && map.addInteraction(draw);
    //     setDrawType(type);
        
    //     // 监听线绘制结束事件，获取坐标
    //     draw.on('drawend', (event) => {
    //         // 移除绘制功能
    //         map && map.removeInteraction(draw as Interaction);
    //         // 重置数据
    //         setDrawType(null);
    //         draw = null;
    //         // 获取绘制信息
    //         let geometryDraw = event.feature.getGeometry();
    //         console.log(geometryDraw);
            
    //         // 添加修改功能
    //         let features = new Collection<any>();
    //         features.push(event.feature);
    //         modify = new Modify({
    //             features: features,
    //             style: new Style({
    //                 image: new CircleStyle({
    //                     radius: 7,
    //                     fill: new Fill({
    //                         color: '#ED392F'
    //                     })
    //                 })
    //             })
    //         });
    //         map && map.addInteraction(modify);
    //         // 监听修改事件
    //         modify.on('modifyend', () => {
            
    //         });
    //     });
    // }

    // useEffect(() => {
        // if (map) {
        //     // 添加画板layer
        //     drawSource = new VectorSource();
        //     drawLayer = new VectorLayer({
        //         source: drawSource,
        //         style: new Style({
        //             fill: new Fill({
        //                 color: 'rgba(237, 57, 47, 0.35)'
        //             }),
        //             stroke: new Stroke({
        //                 color: '#ED392F',
        //                 width: 4,
        //                 lineDash: [10]
        //             })
        //         })
        //     });
        //     drawLayer.setZIndex(2);
        //     map.addLayer(drawLayer);
        // }
    // }, [map]);

    // useEffect(() => {
    //     // 监听地图视图，创建地图
    //     if (view) {
    //         // 使用高德图层
    //         const tileLayer = new TileLayer({
    //             source: new XYZ({
    //                 url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&scl=1&size=1&style=7&x={x}&y={y}&z={z}'
    //             })
    //         });
    //         // 创建实例
    //         const _map = new Map({
    //             target: 'map',
    //             layers: [tileLayer], // 使用高德图层
    //             view: view
    //         });
    //         // setMap(_map);
    //     }
    // }, [view]);

    useEffect(() => {
        // View用于创建2D视图
        const viewObj = new View({
            center: Proj.transform([104.06403453968424, 30.597419070782898], 'EPSG:4326', 'EPSG:3857'), // 使用'EPSG:3857'投影
            zoom: 16
        });
        const tileLayer = new TileLayer({
            source: new XYZ({
                url: 'http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&scl=1&size=1&style=7&x={x}&y={y}&z={z}'
            })
        });
        // 创建实例
        new Map({
            target: 'map',
            layers: [tileLayer], // 使用高德图层
            view: viewObj
        });
        // setView(viewObj);
    }, []);

    return <div className='interaction_container'>
        <div>openlayer地图绘制、修改圆形、矩形、多边形</div>
        <div className='map_box'>
            <div className='draw_type'>
                <span className="title">选择绘制图形</span>
                {/* <div className={`list ${drawType === 1 ? "active" : ''}`} onClick={() => { setDraw(1); }}>圆形</div>
                <div className={`list ${drawType === 2 ? "active" : ''}`} onClick={() => { setDraw(2); }}>矩形</div>
                <div className={`list ${drawType === 3 ? "active" : ''}`} onClick={() => { setDraw(3); }}>多边形</div> */}
            </div>
            <div id='map' style={{ width: '100%', height: '100%' }}></div>
        </div>

    </div>;
}
export default OpenlayerShow;




