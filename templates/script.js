var defaultbutton = document.getElementById("default");
var lengthbutton = document.getElementById("length");
var svg = document.getElementById("svg");
var defaultlist = [1,1,1];
var sizelist = [85,24,10];

var numtopercent = function(list){
    var total = list[0] + list[1] + list[2];
    list[0] = list[0]/total;
    list[1] = list[1]/total;
    list[2] = list[2]/total;
    return list;
}

var update = function(e){
    var current1 = 0;
    var current2 = 0;
    var current3 = 0;
    var mult = 0.65;
    var bigr = svg.getAttribute("width")/2;
    var data = [];
    if(this.getAttribute("id") == "default"){
	data = numtopercent(defaultlist);
    }
    else{
	data = numtopercent(sizelist);
    }
    console.log(data);
    var circles = d3.select("#svg").selectAll("circle.category");

    circles.data(data)
	.transition()
	.duration(2000)
	.attr("cx",
	      function(d){
		  if(d==0){
		      d=0.0001;
		  }
		  console.log(current1);
		  console.log(d);
		  var x1, y1, x2, y2, x3, y3, M1x, M1y, M2x, M2y, m1, m2, cx;
		  x1 = (bigr*mult*Math.cos(current1*Math.PI*2) + bigr);
		  y1 = (bigr*mult*Math.sin(current1*Math.PI*2) + bigr);
		  x2 = (bigr*Math.cos((current1 + (d/2))*Math.PI*2) + bigr);
		  y2 = (bigr*Math.sin((current1 + (d/2))*Math.PI*2) + bigr);
		  x3 = (bigr*mult*Math.cos((current1+d)*Math.PI*2) + bigr);
		  y3 = (bigr*mult*Math.sin((current1+d)*Math.PI*2) + bigr);
		  if( y2==y1 || y2==y3){
		      y2++;
		  }
		  if( x2==x1 || x2==x3){
		      x2++;
		  }
/*		  var line1 = document.createElementNS("http://www.w3.org/2000/svg","line");
		  line1.setAttribute("x1",x1);
		  line1.setAttribute("y1",y1);
		  line1.setAttribute("x2",x2);
		  line1.setAttribute("y2",y2);
		  line1.setAttribute("stroke","#000000");
		  svg.appendChild(line1);
		  var line2 = document.createElementNS("http://www.w3.org/2000/svg","line");
		  line2.setAttribute("x1",x2);
		  line2.setAttribute("y1",y2);
		  line2.setAttribute("x2",x3);
		  line2.setAttribute("y2",y3);
		  line2.setAttribute("stroke","#000000");
		  svg.appendChild(line2);
		  var line3 = document.createElementNS("http://www.w3.org/2000/svg","line");
		  line3.setAttribute("x1",x1);
		  line3.setAttribute("y1",y1);
		  line3.setAttribute("x2",x3);
		  line3.setAttribute("y2",y3);
		  line3.setAttribute("stroke","#000000");
		  svg.appendChild(line3);*/
		  current1 += d;
		  M1x = 0.5*(x1+x2);
		  M1y = 0.5*(y1+y2);
		  M2x = 0.5*(x2+x3);
		  M2y = 0.5*(y2+y3);
		  m1 = (x1-x2)/(y2-y1);
		  m2 = (x2-x3)/(y3-y2);
		  cx = (M1y - M2y + (m2*M2x) - (m1*M1x))/(m2-m1);
		  return cx;
	      })
	.attr("cy",
	      function(d){
		  if(d==0){
		      d=0.0001;
		  }
		  var x1, y1, x2, y2, x3, y3, M1x, M1y, M2x, M2y, m1, m2, cx,cy;
		  x1 = (bigr*mult*Math.cos(current2*Math.PI*2) + bigr);
		  y1 = (bigr*mult*Math.sin(current2*Math.PI*2) + bigr);
		  x2 = (bigr*Math.cos((current2 + (d/2))*Math.PI*2) + bigr);
		  y2 = (bigr*Math.sin((current2 + (d/2))*Math.PI*2) + bigr);
		  x3 = (bigr*mult*Math.cos((current2+d)*Math.PI*2) + bigr);
		  y3 = (bigr*mult*Math.sin((current2+d)*Math.PI*2) + bigr);
		  if( y2==y1 || y2==y3){
		      y2++;
		  }
		  if( x2==x1 || x2==x3){
		      x2++;
		  }
		  current2 += d;
		  M1x = 0.5*(x1+x2);
		  M1y = 0.5*(y1+y2);
		  M2x = 0.5*(x2+x3);
		  M2y = 0.5*(y2+y3);
		  m1 = (x1-x2)/(y2-y1);
		  m2 = (x2-x3)/(y3-y2);
		  cx = (M1y - M2y + (m2*M2x) - (m1*M1x))/(m2-m1);
		  cy = M1y + (m1*(cx-M1x));
		  return cy;
	      }
	     )
	.attr("r",
	      function(d){
		  if(d==0){
		      d=0.0001;
		  }
		  var x1, y1, x2, y2, x3, y3, M1x, M1y, M2x, M2y, m1, m2, cx,cy,r;
		  x1 = (bigr*mult*Math.cos(current3*Math.PI*2) + bigr);
		  y1 = (bigr*mult*Math.sin(current3*Math.PI*2) + bigr);
		  x2 = (bigr*Math.cos((current3 + (d/2))*Math.PI*2) + bigr);
		  y2 = (bigr*Math.sin((current3 + (d/2))*Math.PI*2) + bigr);
		  x3 = (bigr*mult*Math.cos((current3 + d)*Math.PI*2) + bigr);
		  y3 = (bigr*mult*Math.sin((current3 + d)*Math.PI*2) + bigr);
		  if( y2==y1 || y2==y3){
		      y2++;
		  }
		  if( x2==x1 || x2==x3){
		      x2++;
		  }
		  current3 += d;
		  M1x = 0.5*(x1+x2);
		  M1y = 0.5*(y1+y2);
		  M2x = 0.5*(x2+x3);
		  M2y = 0.5*(y2+y3);
		  m1 = (x1-x2)/(y2-y1);
		  m2 = (x2-x3)/(y3-y2);
		  cx = (M1y - M2y + (m2*M2x) - (m1*M1x))/(m2-m1);
		  cy = M1y + (m1*(cx-M1x));
		  r = Math.sqrt(((cx-x1)*(cx-x1)) + ((cy-y1)*(cy-y1)));
		  return r;
	      }
	     );

}

defaultbutton.addEventListener("click",update);
lengthbutton.addEventListener("click",update);
