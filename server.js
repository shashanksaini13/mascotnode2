import path from 'path';
import fs from 'fs';
import { URL } from 'url';
import * as mascot from './node_modules/mascotSVG.js';


const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);


async function main() {
    // Load the data
    const dataPath = path.resolve(__dirname, 'data', 'stocks.csv');
    const dataCsv = fs.readFileSync(dataPath, 'utf-8');


    // Process the data and generate the SVG content
    let scn = mascot.scene();
    let dt = mascot.csv('http://localhost:3000/stocks');
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

    console.log(scn);
}

main().catch(err => console.error(err));
