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

var COLORS = ["#DF4F39", "#E17364", "#37A23B", "#B5E5B6", "#3C7CDE","#CFE2FD" , "#E2E3E7"],
    LABELS = ["≥27º", "26-21º","20-17º","16-15º", "14-13º", "12-8º" , "≤8º" ],
    VALUES = ["1", "2", "3", "4", "5", "6", "7"];


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


 // gridlines in y axis function
 function gridlines() {		
    return d3.axisLeft(scaleYPos)
        
  }
svg.append("g")
  .attr("class", "grid")
  .call(gridlines()
      .tickSize(-width)
      .tickFormat('')
      )
      
      
//bars

const barGroup = svg
  .append('g');

barGroup
.selectAll('rect')
.data(avgTemp)
.enter()
.append("rect")
  .attr("x", (d,i) => i * (width/12))
  .attr("y", d => scaleYPos(d))
  .attr("width", barWidth)
  .attr("height", function(d,i){
    return height - scaleYPos(d)
  })

 .style("fill", function(d){
   if(d>27){
     return "#DF4F39";
   }
    if(d>21){
     return "#E17364";
   }
    else if(d>17){
     return "#37A23B";
   }
    else if(d>15){
     return "#B5E5B6";
   }
    else if (d>13){
     return "#3C7CDE";
    }
    else if(d>8){
      return"#CFE2FD"
    }
    return "#E2E3E7"
    
 })
 .on('mouseenter', function(actual,i){
   d3.selectAll('.value')
    .attr('opacity',0)
    d3.select(this)
      .transition()
      .duration(600)
      .attr('opacity', 0.6)
 })
 .on('mouseleave', function(){
   d3.selectAll('.value')
    .attr('opacity',1)
    d3.select(this)
      .transition()
      .duration(300)
      .attr('opacity', 1)
 })

 //add the y and x axis
const axisGroup = svg.append("g");

//add the y Axis
axisGroup
  .append("g")
  .call(d3.axisLeft(scaleYPos));

// X axis:
axisGroup
  .append("g")
  .attr("transform", "translate (0," + height + ")")
  .call(d3.axisBottom(scaleXPos))
  .selectAll('text')
  .attr("transform", "rotate(-55)" )
  .attr("dx", "-.9em")
  .attr("dy", "-.40em")
  .style("text-anchor", "end");
