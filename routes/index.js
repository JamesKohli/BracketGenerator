
/*
 * GET home page.
 */

exports.index = function(array){
	return function(req, res){
		var table = "";
		//console.log(array);
		
		var rowCount = 0;
		

		array.forEach(function(row){
			rowCount++;
			var colCount = 0;
			table = table.concat('<tr><td><b>' + rowCount + '</b></td>');
			row.forEach(function(column){
				colCount++;
				//table = table.concat('<td id=' + rowCount + '-' + colCount + '>' + column + '</td>')
				if (colCount > rowCount){
					table = table.concat('<td> <fieldset disabled><input type="number" class="form-control"></input></fieldset></td>')
				} else {
					table = table.concat('<td> <input id=' + rowCount + '-' + colCount + ' type="number" class="form-control" value="' + column + '"></input></td>')
				}
			})
			table = table.concat('</tr>');
		})

		res.render('index', { title: "Bracket Generator", predictions: table});
		console.log('rendering table on client machine')
	}
}