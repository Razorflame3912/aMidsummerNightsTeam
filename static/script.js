var defaultbutton = document.getElementById("default");
var lengthbutton = document.getElementById("length");
var svg = document.getElementById("svg");
var defaultlist = [1,1,1];
var sizelist = [150,0,60];
var variabledata = [[150,0,60],
		    [50,10,15,30,10,5,30,0,0,0,0,0,0,0,0,0],
		    [0,0,0,0,0,0,0,0,0,0],
		    [5,12,13,2,20,1,1,1,1,4]];

var defcomedy = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
var deftragedy = [1,1,1,1,1,1,1,1,1,1];
var defhistory = [1,1,1,1,1,1,1,1,1,1];


var numtopercent = function(list){
    var total = 0;
    for(i in list){
	total += list[i];
    }
    if(total == 0){
	var newlist = [];
	for(var i = 0;i<list.length;i++){
	    newlist.push(-1);
	}
	return newlist;
    }
    for(i in list){
	list[i] = list[i]/total;
    }
    //console.log(list);
    return list;
}

var calc = function(d,arg,mult,current,bigr,offx,offy){
    var x1, y1, x2, y2, x3, y3, M1x, M1y, M2x, M2y, m1, m2, cx,cy;
    x1 = (bigr*mult*Math.cos(current*Math.PI*2) + offx);
    y1 = (bigr*mult*Math.sin(current*Math.PI*2) + offy);
    x2 = (bigr*Math.cos((current + (d/2))*Math.PI*2) + offx);
    y2 = (bigr*Math.sin((current + (d/2))*Math.PI*2) + offy);
    x3 = (bigr*mult*Math.cos((current+d)*Math.PI*2) + offx);
    y3 = (bigr*mult*Math.sin((current+d)*Math.PI*2) + offy);
    /*//console.log(x1);
    console.log(y1);
    console.log(x2);
    console.log(y2);
    console.log(x3);
    console.log(y3);*/
/*      var line1 = document.createElementNS("http://www.w3.org/2000/svg","line");
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
    if( y2==y1 || y2==y3){
	y2++;
    }
    if( x2==x1 || x2==x3){
	x2++;
    }
    M1x = 0.5*(x1+x2);
    M1y = 0.5*(y1+y2);
    M2x = 0.5*(x2+x3);
    M2y = 0.5*(y2+y3);
    m1 = (x1-x2)/(y2-y1);
    m2 = (x2-x3)/(y3-y2);
    cx = (M1y - M2y + (m2*M2x) - (m1*M1x))/(m2-m1);
    cy = M1y + (m1*(cx-M1x));
    r = Math.sqrt(((cx-x1)*(cx-x1)) + ((cy-y1)*(cy-y1)));
    console.log(x1);
    console.log(y1);
    console.log(x2);
    console.log(y2);
    console.log(x3);
    console.log(y3);
    console.log(M1x);
    console.log(M1y);
    console.log(M2x);
    console.log(M2y);
    console.log(m1);
    console.log(m2);
    if(arg=="cx"){
	console.log(cx);
	return cx;
    }
    else if(arg=="cy"){
	console.log(cy);
	return cy;
    }
    else{
	console.log(r);
	return r;
    }
    
    
}


var update = function(e){
    var current1 = 0;
    var current2 = 0;
    var current3 = 0;
    var mult = 0.6;
    var bigr = parseFloat(svg.getAttribute("width"))/2;
    var data = [];
    var comedydata, tragedydata, historydata;
    var listcx = [0,0,0];
    var listcy = [0,0,0];
    var listr = [0,0,0];
    var icx = 0;
    var icy = 0;
    var ir = 0;
    
    if(this.getAttribute("id") == "default"){
	data = numtopercent(defaultlist);
	comedydata = numtopercent(defcomedy);
	tragedydata = numtopercent(deftragedy);
	historydata = numtopercent(defhistory);
    }
    else{
	$.ajax({
	    async: false,
	    url: '/count',
	    data : {},
	    type: 'GET',
	    success: function(d) {
		console.log(d);
		variabledata = JSON.parse(d);
	    } //end success callback
	});//end ajax call
	data = numtopercent(variabledata[0]);
	comedydata = numtopercent(variabledata[1]);
	tragedydata = numtopercent(variabledata[2]);
	historydata = numtopercent(variabledata[3]);
    }
    //console.log(data);
    var circles = d3.select("#svg").selectAll("circle.category");

    circles.data(data)
	.transition()
	.duration(2000)
	.attr("cx",
	      function(d){
		  d = zerocheck(d,"big");
		  var ret = calc(d,"cx",mult,current1,bigr,bigr,bigr);
		  current1 += d;
		  listcx[icx]=ret;
		  icx += 1;
		  return ret;
	      })
	.attr("cy",
	      function(d){
		  d = zerocheck(d,"big");
		  var ret = calc(d,"cy",mult,current2,bigr,bigr,bigr);
		  current2 += d;
		  listcy[icy]=ret;
		  icy += 1;

		  return ret;
	      }
	     )
	.attr("r",
	      function(d){
		  d = zerocheck(d,"big");
		  if(d==0){
		      d=0.0001;
		  }
		  else if(d<0){
		      d = (1/3);
		      
		   //   console.log("VALUE OF D: " + d);
		  }
		  var ret = calc(d,"r",mult,current3,bigr,bigr,bigr);
		  current3 += d;
		  listr[ir]=ret;
		  ir += 1;
		  return ret;
	      }
	     );
    
	subupdate("comedy",comedydata,listcx[0],listcy[0],listr[0]);
	subupdate("tragedy",tragedydata,listcx[1],listcy[1],listr[1]);
	subupdate("history",historydata,listcx[2],listcy[2],listr[2]);

}

var zerocheck = function(d,type){
    if(d==0){
	d=0.0001;
    }
    else if(d<0){
	var denominator;
	if(type=="comedy"){
	    denominator = 17;
	}
	else if(type == "big"){
	    denominator = 3;
	}
	else{
	    denominator = 10;
	}
	d = (1/denominator);		      
    }
    return d;
}

var subupdate = function(type,data,offx,offy,bigr){
    var current1 = 0;
    var current2 = 0;
    var current3 = 0;
    var mult = 0.8;/*
    var parentcircle = document.getElementById(type+"bubble");
    var offx = parseFloat(parentcircle.getAttribute("cx"));
    var offy = parseFloat(parentcircle.getAttribute("cy"));
    var bigr = parseFloat(parentcircle.getAttribute("r"));*/
    var circles = d3.select("#svg").selectAll("circle."+type);
    //console.log(offx);
    //console.log(offy);
    //console.log(bigr);
    //console.log(circles);
    //console.log(data);
    
    circles.data(data)
	.transition()
	.duration(2000)
	.attr("cx",
	      function(d){
		  d = zerocheck(d,type);
		  var ret = calc(d,"cx",mult,current1,bigr,offx,offy);
		  current1 += d;
		  return ret;
	      })
	.attr("cy",
	      function(d){
		  d = zerocheck(d,type);
		  var ret = calc(d,"cy",mult,current2,bigr,offx,offy);
		  current2 += d;
		  return ret;
	      }
	     )
	.attr("r",
	      function(d){
		  d = zerocheck(d,type);
		  var ret = calc(d,"r",mult,current3,bigr,offx,offy);
		  current3 += d;
		  return ret;
	      }
	     );
    
}

defaultbutton.addEventListener("click",update);
lengthbutton.addEventListener("click",update);
