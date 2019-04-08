import { select, selectAll } from "d3-selection";
import 'd3-transition';
import {  avgTemp, avgTempp } from "./barchart.data";
import { axisBottom, axisLeft } from "d3-axis";
import { min, max } from "d3-array";
import { scaleLinear, scaleTime, scaleOrdinal,scaleBand,  } from "d3-scale";
import { schemeAccent, schemeCategory10, schemeSpectral } from "d3-scale-chromatic";
import { line } from "d3-shape";

const d3 = {
    select, 
    selectAll,
    scaleBand, 
    scaleLinear, 
    scaleTime,  
    min, 
    max,
    line,
    axisBottom,
    axisLeft,
    scaleOrdinal,
    schemeAccent,
    schemeCategory10,
    schemeSpectral
    
  };

const width = 500;
const height = 400;
const margin = 60;
const padding = 70;
const barWidth = 35;

// Creamos la tarjeta.
const card = select("#root")
  .append("div")
  .attr("class", "card");

// Creamos el 'lienzo' svg.
const svg = card
  .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", `${-padding} ${-padding} ${width + 2*padding} ${height + 2*padding}`);
    

const scaleYPos = d3.scaleLinear()
.domain([d3.min(avgTempp, function(d,i){return d.Temp -6}),d3.max(avgTempp, function(d,i){return d.Temp +3}) ])
.range([height,0]);


const scaleXPos = d3.scaleBand()
.domain(avgTempp.map(function(d){return d.Month}))
.range([0, width]);