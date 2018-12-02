// document.getElementById("note").innerHTML = "";

function convert() {
  var binstring = "";
  var input = document.getElementById("tx").value;
  var width = Number(document.getElementById("wd").value);

  for (var i = 0; i < input.length; i++) {
    binstring += input[i].charCodeAt(0).toString(2);
  }
  var len = binstring.length;

  make(width, Math.ceil(len/width), binstring);

  document.getElementById("note").innerHTML = "<p>Binary characters: " + len + " |   Rows: " + Math.ceil(len/width) + "</p>";

}
var make = function(h, w, d){
  d3.selectAll("svg").remove();

  //TECHNICALLY HEIGHT AND WIDTH ARE SWITCHED
  var svg = d3.select("#tile").append("svg")
    .attr("height", w * 20)
    .attr("width", h * 20);

  var tileArr = [];
  for (var i = 0; i < w; i++){
    for (var j = 0; j < h; j++){
      var obj = {x: j * 20, y: i*20, c:d[(i*h)+j]};
      tileArr.push(obj);
    }
  }

  var tiles = svg.selectAll("rect").data(tileArr);
  tiles.enter().append("rect")
    .merge(tiles)
    .attr("x", function(d){return d.x; })
    .attr("y", function(d){return d.y; })
    .attr("width", 20)
    .attr("height", 20)
    .attr("fill", function(d){
      if(d.c=="0"){return "#000000";}
      if(d.c=="1"){return "#FFFFFF";}
      else{return "#999999";}
    })
    .attr("stroke", "grey");
}

function saveSvg(svgEl, name) {
    svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    var svgData = svgEl.outerHTML;
    var preface = '<?xml version="1.0" standalone="no"?>\r\n';
    var svgBlob = new Blob([preface, svgData], {type:"image/svg+xml;charset=utf-8"});
    var svgUrl = URL.createObjectURL(svgBlob);
    var downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = name;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}
