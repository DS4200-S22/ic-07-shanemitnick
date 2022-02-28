/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your bar charts in this file 


// Set dimensions and margins for plots 
const width = 900; 
const height = 450; 
const margin = {left:50, right:50, bottom:50, top:50}; 
const yTooltipOffset = 15; 


// TODO: What does this code do? 
// create a svg inside of the selected div. adding attributes for height, width, and a viewbox.
const svg1 = d3
  .select("#hard-coded-bar")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

// Hardcoded barchart data
const data1 = [
  {name: 'A', score: 92},
  {name: 'B', score: 15},
  {name: 'C', score: 67},
  {name: 'D', score: 89},
  {name: 'E', score: 53},
  {name: 'F', score: 91},
  {name: 'G', score: 18}
];

/*

  Axes

*/ 

// TODO: What does this code do?
// Determines the maximum Y value
let maxY1 = d3.max(data1, function(d) { return d.score; });

// TODO: What does each line of this code do?
// determines the scale for our yBar -> mapping data values to pixel values
let yScale1 = d3.scaleLinear()
            .domain([0,maxY1])
            .range([height-margin.bottom,margin.top]); 

// TODO: What does each line of this code do?
// determines the scale to be used for for the xScale - changing the data to pixel values
// adds a bit of padding and determines the range for our scale to have
let xScale1 = d3.scaleBand()
            .domain(d3.range(data1.length))
            .range([margin.left, width - margin.right])
            .padding(0.1); 

// TODO: What does each line of this code do?
// adds the left axis to the scale (the YScale1 that we just created)
svg1.append("g")
   .attr("transform", `translate(${margin.left}, 0)`) 
   .call(d3.axisLeft(yScale1)) 
   .attr("font-size", '20px'); 

// TODO: What does each line of this code do?
// adds our X axis to the scale. -- to show names of categories formatting the tickFormat
// to be the name of the grade
svg1.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`) 
    .call(d3.axisBottom(xScale1) 
            .tickFormat(i => data1[i].name))  
    .attr("font-size", '20px'); 

/* 

  Tooltip Set-up  

*/

// TODO: What does each line of this code do?
// selects our hard-coded-bar, appending the div tooltip with id tooltip with opacity 0
const tooltip1 = d3.select("#hard-coded-bar") 
                .append("div") 
                .attr('id', "tooltip1") 
                .style("opacity", 0) 
                .attr("class", "tooltip"); 

// TODO: What does each line of this code do?
// this adds the HTML below to the tooltip and changes it from 0 to 1.
const mouseover1 = function(event, d) {
  tooltip1.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") 
          .style("opacity", 1);  
}

// TODO: What does each line of this code do?
// this changes the x and y values of the the tooltip1 so it moves with the mouse.
const mousemove1 = function(event, d) {
  tooltip1.style("left", (event.x)+"px") 
          .style("top", (event.y + yTooltipOffset) +"px"); 
}

// TODO: What does this code do?
// this changes the opacity to 0 when the mouse leaves a d3 object.
const mouseleave1 = function(event, d) { 
  tooltip1.style("opacity", 0); 
}

/* 

  Bars 

*/

// TODO: What does each line of this code do?
// select anything with class bar. (empty selection in the moment)
// for every row in data1, append a rectangle with class bar
// sets the x position based on the xScale, same with Y
// determines the height of the bar based on the scale of score.
// determine the width based on the amount of space we have (D3 calculated)
// finally add our mouseover, mousemove, mouseleave functions.
svg1.selectAll(".bar") 
   .data(data1) 
   .enter()  
   .append("rect") 
     .attr("class", "bar") 
     .attr("x", (d,i) => xScale1(i)) 
     .attr("y", (d) => yScale1(d.score)) 
     .attr("height", (d) => (height - margin.bottom) - yScale1(d.score))
     .attr("width", xScale1.bandwidth()) 
     .on("mouseover", mouseover1) 
     .on("mousemove", mousemove1)
     .on("mouseleave", mouseleave1);











const svg2 = d3
  .select("#csv-bar")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);


d3.csv("data/barchart.csv").then(data => {
  console.log(data);

svg2.append("g")
  .attr("transform", `translate(${margin.left}, 0)`) 
  .call(d3.axisLeft(yScale1)) 
  .attr("font-size", '20px'); 

svg2.append("g")
  .attr("transform", `translate(0,${height - margin.bottom})`) 
  .call(d3.axisBottom(xScale1) 
          .tickFormat(i => data1[i].name))  
  .attr("font-size", '20px'); 


svg2.selectAll(".bar") 
.data(data) 
.enter()  
.append("rect") 
  .attr("class", "bar") 
  .attr("x", (d,i) => xScale1(i)) 
  .attr("y", (d) => yScale1(d.score)) 
  .attr("height", (d) => (height - margin.bottom) - yScale1(d.score))
  .attr("width", xScale1.bandwidth()) 
  .on("mouseover", mouseover1) 
  .on("mousemove", mousemove1)
  .on("mouseleave", mouseleave1);


});