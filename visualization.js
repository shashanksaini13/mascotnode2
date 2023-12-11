import * as msc from 'mascot-vis';

export function renderVisualization() {
    let scn = msc.scene();
    msc.csv("/public/stocks.csv").then((dt)=> {
        let line = scn.mark("line", {x1: 200, y1: 100, x2: 800, y2: 400, strokeColor: "green"});
        let collection = scn.repeat(line, dt, {field: "company"});
        let polyLine = scn.densify(line, dt, {field: "date"});
        let vertex = polyLine.vertices[0];
        scn.encode(vertex, {field: "date", channel: "x", rangeExtent: 600});
        scn.encode(vertex, {field: "price", channel: "y"});
        scn.encode(polyLine, {field: "company", channel: "strokeColor"});
        scn.axis("x", "date", {orientation: "bottom", labelFormat: "%m/%d/%y"});
        scn.axis("y", "price", {orientation: "left"});
        scn.legend("strokeColor", "company", {x: 850, y: 100});
        msc.renderer('svg','svgEle').render(scn);
    });
}
