	var d = new Date();
	var month_name = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	var month = d.getMonth();//0-11
	var year = d.getFullYear(); //2015
	var da1 = d.getDate();
	//var day_name = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
	
	commonEx();
	
	$("#next1s").on("click", function(){
		if(month<11){
			month = month +1;
		}
		else{
			month = 0;
			year = year +1;
		}
		commonEx();
	});
	
	$("#prev1s").on("click", function(){
		if(month>0){
			month = month -1;
			year = year;
		}
		else{
			month = 11;
			year = year - 1;
		}
		commonEx();
	});
	
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
		var tr = $('<tr>');
		var d_arry = ["Switzerland","Global","UK","Germany","France","Italy","Spain"];
		//row for the day letters
		table.append(tr);

		//Create days row blank row 2
		for(var i=0; i<d_arry.length; i++){
			var contries = $('<td>').append(d_arry[i]);
			let ol = $('<tr>').append(contries);
			for(var c=1; c<=days; c++){
				var r1= $('<td>').append(c);
				let x = new Date(year+'-'+ (month+1) +'-'+c);
				r1.attr('class', Date.parse(x));
				ol.append(r1);
			}
			table.append(ol);
		}
		return table;
	}