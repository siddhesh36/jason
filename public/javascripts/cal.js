	var d = new Date();
	var month_name = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	var month = d.getMonth();//0-11
	var year = d.getFullYear(); //2015
	var da1 = d.getDate();
	//var day_name = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
	
	function endOfMonth(date)
	{
	   
	return new Date(date.getFullYear(), date.getMonth() + 1, 0);
   
	}
	function pad2(number) {
   
		return (number < 10 ? '0' : '') + number;
	  
    }
	var eom = endOfMonth(d).getDate(); // Get last date of month
	commonEx();
	//var days_1 = new Date(year, month+1, 0).getDate();
	//var con = getCountry(days_1);
	//$("#calendar-dates").append(con);
	
	function commonEx(){
		var first_date = month_name[month] + " " + 1 + " " + year;
		var tmp = new Date(first_date).toDateString();
		var first_day = tmp.substring(0,3);
		//var day_no = day_name.indexOf(first_day);
		var days = new Date(year, month+1, 0).getDate();
		calender = getCalender(days);
		$("#calendar-month-year").html(month_name[month]+ " " + year);
		$("#calendar-dates").empty();
		$("#calendar-dates").append(calender);
	}
	
	function getCalender(days){
		var table = $('<table>');
		//Create days row blank
		var row = $('<tr>');
		var headrow = $('<thead>');
		for(var c=0; c<=days; c++){
			var r1 = $('<td>');
			if(c == 0 ){r1.append("Date");
			} else {
				r1.append(c);
				var monpad = month+1;
				var tp = pad2(c);
				var x = year+'-'+ pad2(monpad) +'-'+tp;
				r1.attr('class', x);
			}
			row.append(r1);
			headrow.append(row);
		}
		table.append(headrow);
		var headbody = $('<tbody>');
		var d_arry = ["All","Global","Europe","Austria","Denmark","Finland","France","Germany","Iceland","Italy","Jersey","Luxembourg","Monaco","Netherlands","Norway","Russia","Spain","Sweden","Switzerland","Turkey","United Kingdom","North America","Canada","US","Asia Pacific","Australia","China","Hong Kong","India","Indonesia","Japan","Korea","Malaysia","New Zealand","Philippines","Singapore","Taiwan","Thailand","Middle East & Africa","Bahrain","Israel","Lebanon","Qatar","Saudi Arabia","South Africa","United Arab Emirates","Latin America","Bahamas","Brazil","Chile","Colombia","Mexico","Panama"];
		var shortd_arry = ["all","global","eu","at","dk","fi","fr","de","is","it","je","lu","mc","nl","no","ru","es","se","ch","tr","uk","na","ca","us","ap","au","cn","hk","in","id","jp","kr","my","nz","ph","sg","tw","th","mea","bh","il","lb","qa","sa","za","ae","la","bs","br","cl","co","mx","pa"];
		var frow1 = $('<tr>');
		for(var d=0; d<=days; d++){
			frow1.append($('<td>'));
		}
		headbody.append(frow1);
		for(var i=0; i<d_arry.length; i++){
			var ol = $('<tr>');
			var contries = $('<td>').append(d_arry[i]);
			ol.append(contries);
			var r2= $('<td>').attr('colSpan', 31).addClass(shortd_arry[i]);
			ol.append(r2);
			headbody.append(ol);
			table.append(headbody);
		}
		return table;
	}
	var path = window.location.pathname;
	var page = path.split("/").pop();
	if (page == "index-promotion"){
		$(".promo").addClass("active");
		$(".teaser").removeClass("active");
	}
	if(page == "index-teaser"){
		$(".teaser").addClass("active");
		$(".promo").removeClass("active");
	}
