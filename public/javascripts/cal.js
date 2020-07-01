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

	var eom = endOfMonth(d);
	commonEx();
	var days_1 = new Date(year, month+1, 0).getDate();
	var con = getCountry(days_1);
	$("#calendar-country").append(con);
	
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
		let row = $('<tr>');
		for(var c=0; c<=days; c++){
			if(c == 0 ){var r1 = $('<td>').append("Date")
		    } else {
			var r1 = $('<td>').append(c);
			}
			let x = new Date(year+'-'+ (month+1) +'-'+c);
			r1.attr('class', Date.parse(x));
			row.append(r1);
		}
		table.append(row);
		return table;
	}

function getCountry(days){
	var table = $('<table>');
	var d_arry = ["Switzerland","Global","UK","Germany","France","Italy","Spain"];
	var shortd_arry = ["ch","global","uk","de","fr","it","es"];
	var frow1 = $('<tr>');
	for(var c=0; c<=days; c++){
		frow1.append($('<td>'));
	}
	table.append(frow1);
	for(var i=0; i<d_arry.length; i++){
		let ol = $('<tr>');
		var contries = $('<td>').append(d_arry[i]);
		ol.append(contries);
		let r2= $('<td>').attr('colSpan', '' + days + '').addClass(shortd_arry[i]);
		ol.append(r2);
		table.append(ol);
	}
	return table;
}