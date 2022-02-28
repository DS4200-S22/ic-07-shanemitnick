/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your scatterplot in this file 
// Set dimensions and margins for plots 
const widthScat = 900; 
const heightScat = 450; 
const marginScat = {left:50, right:50, bottom:50, top:50}; 
const yTooltipOffsetScat = 15; 


// get data


// set scales

// add axis's

const svg3 = d3.select("#csv-scatter")
        .append("svg")
        .attr("width", widthScat - marginScat.left - marginScat.right)
        .attr("height", heightScat - marginScat.top - marginScat.bottom)
        .attr("viewBox", [0, 0, widthScat, heightScat]);



const tooltip2 = d3.select("#csv-scatter") 
.append("div") 
.attr('id', "tooltip2") 
.style("opacity", 0) 
.attr("class", "tooltip"); 

const mouseover2 = function(event, d) {
tooltip2.html("Day: " + d.day + "<br> Score: " + d.score + "<br>") 
.style("opacity", 1);  
}

// TODO: What does each line of this code do?
// this changes the x and y values of the the tooltip1 so it moves with the mouse.
const mousemove2 = function(event, d) {
tooltip2.style("left", (event.pageX)+"px") 
.style("top", (event.pageY + yTooltipOffsetScat) +"px"); 
}

// TODO: What does this code do?
// this changes the opacity to 0 when the mouse leaves a d3 object.
const mouseleave2 = function(event, d) { 
tooltip2.style("opacity", 0);
}


d3.csv("data/scatter.csv").then(data => {

  console.log(data);

  let xScale3 = d3.scaleLinear()
                .domain([0,7])
                .range([marginScat.left, widthScat-marginScat.right]);
  
  let yScale3 = d3.scaleLinear()
                  .domain([0, 95])
                  .range([heightScat-marginScat.bottom, marginScat.top]);

  


  svg3.append("g")
        .attr("transform", `translate(${marginScat.left}), 0`)
        .call(d3.axisLeft(yScale3))
        .attr("font-size", "20px");
  
  svg3.append("g")
        .attr("transform", `translate(0, ${heightScat - marginScat.bottom})`)
        .call(d3.axisBottom(xScale3))
        .attr("font-size", '20px');


  svg3.selectAll("circle") 
  .data(data) // this is passed into the anonymous function
  .enter()  
  .append("circle")
    .attr("cx", (d) => { return xScale3(d.day); }) // use x for cx
    .attr("cy", (d) => { return yScale3(d.score); }) // use y for cy
    .attr("r", 10)  // set r 
    .attr("fill", "black")
    .on("mouseover", mouseover2) 
    .on("mousemove", mousemove2)
    .on("mouseleave", mouseleave2);

})


