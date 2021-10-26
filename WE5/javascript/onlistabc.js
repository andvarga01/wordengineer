function onListAbc(abc) {
	var html = '<table class="table" id="abc_table">';
	html += '</tr>';

	for (i in abc.elemek) {
		console.log(i);
		html += '<tr><td><font size="+5">'+ i +'</font></td><td colspan="2"></tr>'
		var desc = abc.elemek[i]["desc"];
		for (x in desc) {
			html += '<tr>';
			// key = x; val = desc[x];
			//console.log("(" + x + ") "+ desc[x]);
			for (y in desc[x]) {
				s = desc[x][y];
				s = s.replace(/{.*}/,"")
				html += '<td></td><td>'+ s +'</td><td>'+ x +'</td>';
			html += '</tr>';
			}
		}
	}
	html += '</table>';
	return html;
}
