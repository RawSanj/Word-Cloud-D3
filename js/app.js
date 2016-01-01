var app = angular.module('plotText', ['ngAnimate', 'ui.bootstrap']);

app.controller('plotTextController', ['$scope', '$timeout', '$http', function($scope, $timeout, $http){
	
	//Hide and Display section when JS libs are available or not.
    jQuery("#hideIfNoJS").removeClass("hidden");
    jQuery("#hideIfJS").addClass("hidden");

    //Styling File Input button
    $(":file").filestyle({buttonName: "btn-info"});

    //Alerts
	$scope.alerts = [];

    $scope.dataSet = [{size : 160, text : "Java"},{size : 80, text : "HTML"},{size : 50, text : "CSS"},{size : 90, text : "JavaScript"},{size : 100, text : "C++"},{size : 80, text : ".Net"},{size : 70, text : "C#"},{size : 20, text : "Scala"},{size : 180, text : "Spring"},{size : 50, text : "Clojure"},{size : 160, text : "Python"},{size : 30, text : "Ruby"},{size : 50, text : "Rails"},{size : 160, text : "AngularJs"},{size : 80, text : "EmberJs"},{size : 160, text : "D3.js"},{size : 140, text : "Hibernate"},{size : 120, text : "MongoDb"},{size : 100, text : "MySql"},{size : 170, text : "Node.Js"},{size : 110, text : "Polymer"},{size : 10,text : "AppleScript"},{size : 20,text : "Bash"},{size : 80,text : "CoffeeScript"},{size : 70,text : "Cobra"},{size : 120,text : "Erlang"},{size : 140,text : "ECMAScript"},{size : 100,text : "Fortran"},{size : 120,text : "GoLang"},{size : 160,text : "Groovy"},{size : 60,text : "Haskell"},{size : 30,text : "Jython"},{size : 10,text : "KRYPTON"},{size : 10,text : "LotusScript"},{size : 90,text : "MATLAB"},{size : 100,text : "NoSql"},{size : 110,text : "Pearl"},{size : 20,text : "PowerShell"},{size : 30,text : "SciLab"},{size : 70,text : "VBScript"},{size : 160,text : "Php"},{size : 120,text : "Sql"}, {size : 40, text : "ASP.NET"},{size : 60, text : "ASP.NET MVC"},{size : 20, text : "ASP.NET Razor"},{size : 20, text : "ASP.NET vNext"},{size : 70, text : "COBOL on Wheelchair"},{size : 50, text : "Apache Cocoon"},{size : 20, text : "ColdFusion on Wheels"},{size : 20, text : "ColdSpring Framework"},{size : 20, text : "Cotonti"},{size : 20, text : "Dancer (software)"},{size : 80, text : "Django (web framework)"},{size : 20, text : "Fluid UI"},{size : 20, text : "FuelPHP"},{size : 80, text : "Google Apps Script"},{size : 90, text : "Grails (framework)"},{size : 20, text : "Jamroom"},{size : 100, text : "Java Platform"},{size : 80, text : "JavaServer Faces"},{size : 50, text : "Javeline platform"},{size : 20, text : "JBND"},{size : 70, text : "JBoss Seam"},{size : 20, text : "JHipster"},{size : 90, text : "Joomla"},{size : 70, text : "JQuery Mobile"},{size : 20, text : "Jspx-bay"},{size : 20, text : "JVx (Framework)"},{size : 30, text : "JWt (Java web toolkit)"},{size : 50, text : "Laravel"},{size : 20, text : "Lift (web framework)"},{size : 70, text : "Lithium (PHP framework)"},{size : 100, text : "MEAN"},{size : 20, text : "Moobile.js"},{size : 20, text : "Mozilla Skywriter"},{size : 20, text : "SilverStripe"},{size : 30, text : "Sinatra (software)"},{size : 20, text : "SISCWeb"},{size : 40, text : "SiteMesh"},{size : 20, text : "Slimweb"},{size : 20, text : "Snap (web framework)"},{size : 20, text : "Solution stack"},{size : 60, text : "Spark (software)"},{size : 40, text : "Spring Framework"},{size : 70, text : "Spring Roo"},{size : 20, text : "Stripes (framework)"},{size : 90, text : "Apache Struts"},{size : 100, text : "Apache Struts 2"},{size : 70, text : "Sun Web Developer Pack"},{size : 60, text : "SymbolicWeb"},{size : 90, text : "Vaadin"},{size : 20, text : "Vibe.d"},{size : 70, text : "VRaptor"}];
	drawChart($scope.dataSet);
	function handleFileSelect(evt) {
	    var files = evt.target.files; // FileList object
	    var file = files[0];
		var textType = /text.*/;
		$scope.dataSet = [];

		if (file.type.match(textType)) {
			var reader = new FileReader();

			reader.onload = function(e) {
				var stringToReplace = reader.result;
				var desired = stringToReplace.replace(/[^\w\s]/gi, ' ');
				desired = desired.replace(/(?:\r\n|\r|\n|\t)/g, ' ');
				desired = desired.split(' ');
				desired = desired.filter(function(n){ return n != "" }); 
				$scope.rawdata = desired;
			}
			reader.readAsText(file);	

		} else {
			//alert("file not supported!");
			$('#myModal2').modal('show');
		}	      
	  }

  	document.getElementById('textFiles').addEventListener('change', handleFileSelect, false);

  	$scope.triggerDrawChart = function () {
  		$('#myModal').modal('show');
  	}

	$scope.drawChart = function() {
		$('#myModal').modal('hide');
		$timeout(function() {
			$scope.dataSet = compressArray($scope.rawdata);
			drawChart($scope.dataSet);
		}, 400);
	};

 	function compressArray(original) {

		var compressed = [];
		// make a copy of the input array
		var copy = original.slice(0);
					 
		// first loop goes over every element
		for (var i = 0; i < original.length; i++) {
	 
			var myCount = 0;	
			// loop over every element in the copy and see if it's the same
			for (var w = 0; w < copy.length; w++) {
				if (original[i] == copy[w]) {
					// increase amount of times duplicate is found
					myCount++;
					// sets item to undefined
					delete copy[w];
				}
			}
	 
			if (myCount > 0) {
				var a = new Object();
				a.text= original[i];
				a.size= myCount;
				compressed.push(a);
			}
		}
	 
		return compressed;
	};

  	function drawChart (data) {
  		//console.log(data);
  		jQuery("#chart svg").remove();
		var frequency_list = data;
  	 	var len = frequency_list.length;
  	 	
  	 	// Define the div for the tooltip
		var div = d3.select("body").append("div")	
		    .attr("class", "tooltip")				
		    .style("opacity", 0);

		var maxSize = d3.max(data, function(d) { return d.size});

		//Define Size of Text
		var pixScale = d3.scale.linear()
	        .domain([0, maxSize])
	        .range([10, 180]);

	    //console.log(pixScale.domain());

	    var color = d3.scale.category20();
	    	color.domain([100,0]);
	            
	    var width = 960, height = 500;

	    d3.layout.cloud().size([(width-100), (height-100)])
	            .words(frequency_list)
	            .rotate(0)
	            .fontSize(function(d) { return d.size; })
	            .on("end", draw)
	            .start();

	    function draw(words) {
	        var chart = d3.select("#chart").append("svg")
	                .attr("width", width)
	                .attr("height", height)
	                .attr("class", "wordcloud")
	        var g = chart.append("g")
	                // without the transform, words words would get cutoff to the left and top, they would
	                // appear outside of the SVG area
	             //   .call(d3.behavior.zoom().scaleExtent([1, 8]).on("zoom", zoom))
	                .attr("transform", "translate(380,250)")
	                .selectAll("text")
	                .data(words)
	                .enter().append("text")
	                .style("font-size", function(d) { return Math.floor(pixScale(d.size)) + "px"; })
	                .style("fill", function(d, i) { return color(i); })
	                .attr("transform", function(d) {
	                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
	                })
	                .text(function(d) { return d.text; })
	                .on("mouseover", function(d) {		
			            div.transition()		
			                .duration(400)		
			                .style("opacity", .9);		
			            div	.html("<span style='line-height: 25px;'>" + "<i>Wors : </i>'"+ d.text +"'<br><em>Count :  </em><strong>"  + d.size + "</strong></span>")	
			                .style("left", (d3.event.pageX) + "px")		
			                .style("top", (d3.event.pageY - 28) + "px");	
			            })					
			        .on("mouseout", function(d) {		
			            div.transition()		
			                .duration(500)		
			                .style("opacity", 0);	
			        });

			// function zoom() {
			// 	g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
			// }
	    };
	    $scope.alerts.push({ type: 'success', msg: 'Word Cloud created successfully!'});
	    $timeout(function() {
			$scope.alerts.pop();
		}, 1500);
	};

	//for any other error	
	$(window).on("error", function(evt) {

	    console.log("jQuery error event:", evt);
	    var e = evt.originalEvent; // get the javascript event
	    console.log("original event:", e);
	    if (e.message) { 
	        //alert("Error:\n\t" + e.message + "\nLine:\n\t" + e.lineno + "\nFile:\n\t" + e.filename);
	        $('#myModal2').modal('show');
	    } else {
	        //alert("Error:\n\t" + e.type + "\nElement:\n\t" + (e.srcElement || e.target));
	        $('#myModal2').modal('show');
	    }
	});

}]);
