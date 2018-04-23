var defaultbutton = document.getElementById("default");
var lengthbutton = document.getElementById("length");
//var vocabbutton = document.getElementById("vocab");
var wordbutton = document.getElementById("word");
var wordbar = document.getElementById("wordbar");
var svg = document.getElementById("svg");
var circs = document.getElementsByTagName("circle");
var plays = $(".comedy, .tragedy, .history");
var comedyplays = $(".comedy");
var tragedyplays = $(".tragedy");
var historyplays = $(".history");
var circsizelist = [];
var searchedword = "";
var defaultlist = [1,1,1];
var sizelist = [150,0,60];
var variabledata = [[150,0,60],
		    [50,10,15,30,10,5,30,0,0,0,0,0,0,0,0,0],
		    [0,0,0,0,0,0,0,0,0,0],
		    [5,12,13,2,20,1,1,1,1,4]];

var defcomedy = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
var deftragedy = [1,1,1,1,1,1,1,1,1,1];
var defhistory = [1,1,1,1,1,1,1,1,1,1];
var circles = d3.select("#svg").selectAll("circle.category");
var comedycircles = d3.select("#svg").selectAll("circle.comedy");
var tragedycircles = d3.select("#svg").selectAll("circle.tragedy");
var historycircles = d3.select("#svg").selectAll("circle.history");
var playtitle = document.getElementById("playtitle");
var searchinfo = document.getElementById("status");
var val = document.getElementById("val");
console.log(playtitle);
var comedies = ["All's Well That Ends Well", "As You Like It", "The Comedy of Errors", "Cymbeline", "Love's Labour's Lost", "Measure For Measure", "The Merchant of Venice", "The Merry Wives of Windsor", "A Midsummer Night's Dream", "Much Ado About Nothing","The Taming of the Shrew", "The Tempest", "Troilus and Cressida", "Twelfth Night", "The Two Gentlemen of Verona", "The Winter's Tale"]

var tragedies = ["Antony and Cleopatra", "Coriolanus", "Hamlet", "Julius Caesar", "King Lear", "Macbeth", "Othello", "Romeo and Juliet", "Timon of Athens", "Titus Andronicus"]

var histories = ["Henry IV, Part 1", "Henry IV, Part 2", "Henry V", "Henry VI, Part 1", "Henry VI, Part 2", "Henry VI, Part 3", "Henry VIII", "King John","Richard II", "Richard III"]


var numtopercent = function(list){
    var list2 = [];
    for(i in list){
	list2.push(list[i]);
    }
    
    var total = 0;
    for(i in list2){
	total += list2[i];
    }
    if(total == 0){
	var newlist = [];
	for(var i = 0;i<list2.length;i++){
	    newlist.push(-1);
	}
	return newlist;
    }
    for(i in list2){
	list2[i] = list2[i]/total;
    }
    //console.log(list);
    return list2;
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
     /*var line1 = document.createElementNS("http://www.w3.org/2000/svg","line");
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
    if(m1==m2){
	m1+= 0.01;
    }
    cx = (M1y - M2y + (m2*M2x) - (m1*M1x))/(m2-m1);
    cy = M1y + (m1*(cx-M1x));
    r = Math.sqrt(((cx-x1)*(cx-x1)) + ((cy-y1)*(cy-y1)));
    /*console.log(x1);
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
    console.log(m2);*/
    if(arg=="cx"){
	//console.log(cx);
	return cx;
    }
    else if(arg=="cy"){
	//console.log(cy);
	return cy;
    }
    else{
	//console.log(r);
	return r;
    }
    
    
}


var update = function(e){
    //console.log((e));
    if((e.type == "keydown" && e.key=="Enter") || e.type == "click"){
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
	    searchedword = "def";
	    searchinfo.innerHTML = 'Plays set to equal values';
	    data = numtopercent(defaultlist);
	    comedydata = numtopercent(defcomedy);
	    tragedydata = numtopercent(deftragedy);
	    historydata = numtopercent(defhistory);
	}
	else{
	    if (this.getAttribute("id") == "length"){
		searchedword = "";
		searchinfo.innerHTML = 'Results by overall word count';
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
	    }
	    else if(this.getAttribute("id") == "vocab"){
		$.ajax({
		    async: false,
		    url: '/vocab',
		    data : {},
		    type: 'GET',
		    success: function(d) {
			console.log(d);
			variabledata = JSON.parse(d);
		    } //end success callback
		});//end ajax call
	    }
	    else{
		searchedword = wordbar.value;
		searchinfo.innerHTML = 'Results for: "' + searchedword + '"';
		$.ajax({
		    async: false,
		    url: '/search',
		    data : {word : searchedword},
		    type: 'GET',
		    success: function(d) {
			console.log(d);
			variabledata = JSON.parse(d);
		    } //end success callback
		});//end ajax call
	    }
	    
	    data = numtopercent(variabledata[0]);
	    comedydata = numtopercent(variabledata[1]);
	    tragedydata = numtopercent(variabledata[2]);
	    historydata = numtopercent(variabledata[3]);
	}
	//console.log(data);

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
	setTimeout(reorder,2001);
    }

}

var zerocheck = function(d,type){
    if(d==0){
	d=0.0001;
    }
    if(d==1){
	d=0.9999;
    }
    else if(d<0){
	var denominator;
	if(type=="comedy"){
	    denominator = 16;
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
    var selectedcircs;
    //console.log(offx);
    //console.log(offy);
    //console.log(bigr);
    //console.log(circles);
    //console.log(data);
    if(type == "comedy"){
	selectedcircs = comedycircles;
    }
    else if (type == "tragedy"){
	selectedcircs = tragedycircles;
    }
    else{
	selectedcircs = historycircles;
    }
    selectedcircs.data(data)
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
	     )
    	.attr("val",
	      function(d,i){
		  var which = 0;
		  if(type == "comedy"){
		      which = 1;
		  }
		  else if(type == "tragedy"){
		      which = 2;
		  }
		  else{
		      which = 3;
		  }
		  console.log(variabledata[which][i]);
		  return variabledata[which][i];
	      }
	     );

}

var reorder = function(){
    var circlist = [];
    while ($(".comedy, .tragedy, .history").length > 0){
	//console.log(document.getElementsByTagName("circle"));
	//console.log(document.getElementsByTagName("circle").length);
	circlist.push($(".comedy, .tragedy, .history")[$(".comedy, .tragedy, .history").length -1]);
	console.log(circlist);
	//console.log(svg.childNodes);
	svg.removeChild(circlist[circlist.length-1]);
    }
    console.log(circlist);

    
    circlist.sort(function(a,b){return parseFloat(a.getAttribute("r")) - parseFloat(b.getAttribute("r"));});
    
    while (circlist.length > 0){
	svg.appendChild(circlist.pop());
    }
    

}
var getinfo = function(e){
    //circsizelist = [];
    circsizelist.push(this.getAttribute("r"));
    console.log(circsizelist);
}

var highlight = function(e){
    //console.log(this.getAttribute("r"));
    //console.log(this.getAttribute("id"));
    this.setAttribute("fill","rgba(50,50,50,0.5)");
    this.setAttribute("stroke-width","4");
    this.style.position = "relative";
    this.style.zIndex = "1";
    var text = document.createElementNS("http://www.w3.org/2000/svg","text");
    text.setAttribute("x", this.getAttribute("cx"));
    text.setAttribute("y", this.getAttribute("cy"));
    //text.setAttribute("textLength", parseFloat(this.getAttribute("r"))*1.5);
    text.setAttribute("lengthAdjust", "spacingAndGlyphs");
    text.setAttribute("text-anchor","middle");
    text.setAttribute("alignment-baseline","middle");
    text.setAttribute("fill","#000000");
    text.setAttribute("stroke","#000000");
    text.setAttribute("stroke-width","1");
    text.setAttribute("font-size", 3.25*parseFloat(this.getAttribute("r"))/this.getAttribute("id").length + "px");
    text.setAttribute("id","selected");
    text.innerHTML = this.getAttribute("id");
    text.style.zIndex = "100";
    //console.log(svg.childNodes[54]);

    svg.insertBefore(text,this);
    
    
    playtitle.innerHTML = this.getAttribute("id");
    
    //console.log(searchedword.length);
    if(searchedword.length == 0){
	//console.log("Total words: " + this.getAttribute("val"));
	console.log(val);
	var stuff = "Total words: " + this.getAttribute("val");
	val.innerHTML = stuff;
    }
    else if(searchedword == "def"){
	val.innerHTML = "";
    }
    else{
	val.innerHTML = 'Occurrences of ' + '"' + searchedword + '": ' + this.getAttribute("val");
    }
    if(this.className["baseVal"].includes("comedy")){
	playtitle.style.color = "green";
    }
    else if(this.className["baseVal"].includes("tragedy")){
	playtitle.style.color = "crimson";
    }
    else{
	playtitle.style.color = "blue";
    }
    e.stopPropagation();
};

var dehighlight = function(e){
    console.log(this.getAttribute("r"));
    this.setAttribute("fill","rgba(100,100,100,0.5)");
    this.setAttribute("stroke-width","1.5");
    this.style.position = "static";
    this.style.zIndex = "-1";
    svg.removeChild(document.getElementById("selected"));
	//e.stopPropagation();
};
//console.log(circs);

for(var i = 0; i < comedyplays.length; i++){
    comedyplays[i].setAttribute("id",comedies[i]);
}

for(var i = 0; i < tragedyplays.length; i++){
    tragedyplays[i].setAttribute("id",tragedies[i]);
}

for(var i = 0; i < historyplays.length; i++){
    historyplays[i].setAttribute("id",histories[i]);
}

for(var i = 0; i < plays.length; i++){
    //console.log(plays[i]);
    //circs[i].addEventListener("mouseover",getinfo,true);
    plays[i].style.zIndex = "-1";
}
    plays.mouseenter(highlight);
    plays.mouseleave(dehighlight);

defaultbutton.addEventListener("click",update);
lengthbutton.addEventListener("click",update);
//vocabbutton.addEventListener("click",update);
wordbutton.addEventListener("click", update);
wordbar.addEventListener("keydown", update);
