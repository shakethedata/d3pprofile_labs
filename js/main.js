/*
*    main.js
*    Lab line chart
*/

var margin = { left:80, right:100, top:50, bottom:100 },
    height = 500 - margin.top - margin.bottom, 
    width = 800 - margin.left - margin.right;

var svg = d3.select("#chart-area").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + 
        ", " + margin.top + ")");

// Scales
var x = d3.scaleLinear().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// Axis generators
var xAxisCall = d3.axisBottom()
var yAxisCall = d3.axisLeft()
    .ticks(6);

// Axis groups
var xAxis = g.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")");
var yAxis = g.append("g")
    .attr("class", "y axis")
    
// Y-Axis label
yAxis.append("text")
    .attr("class", "axis-title")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .attr("fill", "#5D6971")
    .text("AST");


var data = [{"PARAM":"ALT","ADY":"-1","AVAL":40},
    {"PARAM":"ALT","ADY":"1","AVAL":60},
    {"PARAM":"ALT","ADY":"21","AVAL":45},
    {"PARAM":"ALT","ADY":"42","AVAL":40},
    {"PARAM":"ALT","ADY":"63","AVAL":46},
    {"PARAM":"ALT","ADY":"84","AVAL":34},
    {"PARAM":"AST","ADY":"-1","AVAL":30},
    {"PARAM":"AST","ADY":"1","AVAL":40},
    {"PARAM":"AST","ADY":"21","AVAL":35},
    {"PARAM":"AST","ADY":"42","AVAL":30},
    {"PARAM":"AST","ADY":"63","AVAL":45},
    {"PARAM":"AST","ADY":"84","AVAL":24}]

var lbParam = $("#lb-param-select").val();
var data = data.filter(function(d){
        if (lbParam == "AST") {return d.PARAM == "AST"};
        if (lbParam == "ALT") {return d.PARAM == "ALT"};
    });

    

// Line path generator
var line = d3.line()
    .x(function(d) { return x(d.ADY); })
    .y(function(d) { return y(d.AVAL); });

// Set scale domains
x.domain(d3.extent(data, function(d) { return d.ADY; }));
y.domain([0,100]);

// Generate axes once scales have been set
xAxis.call(xAxisCall.scale(x))
yAxis.call(yAxisCall.scale(y))

// Add line to chart
g.append("path")
    .attr("class", "line")
    .attr("fill", "none")
    .attr("stroke", "grey")
    .attr("stroke-with", "3px")
    .attr("d", line(data));

    /******************************** Tooltip Code ********************************/

    var focus = g.append("g")
        .attr("class", "focus")
        .style("display", "none");

    focus.append("line")
        .attr("class", "x-hover-line hover-line")
        .attr("y1", 0)
        .attr("y2", height);

    focus.append("line")
        .attr("class", "y-hover-line hover-line")
        .attr("x1", 0)
        .attr("x2", width);

    focus.append("circle")
        .attr("r", 7.5);

    focus.append("text")
        .attr("x", 15)
        .attr("dy", ".31em");

    g.append("rect")
        .attr("class", "overlay")
        .attr("width", width)
        .attr("height", height)
        .on("mouseover", function() { focus.style("display", null); })
        .on("mouseout", function() { focus.style("display", "none"); })
        .on("mousemove", mousemove);

    function mousemove() {
        var x0 = x.invert(d3.mouse(this)[0]),
            i = d3.bisect(data, x0, 1),
            d0 = data[i - 1],
            d1 = data[i],
            d1 = data[2],
            d0 = data[1]
            d = x0 - d0.ADY > d1.ADY - x0 ? d1 : d0;
        focus.attr("transform", "translate(" + x(d.ADY) + "," + y(d.AVAL) + ")");
        focus.select("text").text(d.AVAL);
        focus.select(".x-hover-line").attr("y2", height - y(d.AVAL));
        focus.select(".y-hover-line").attr("x2", -x(d.ADY));
    }


    /******************************** Tooltip Code ********************************/



