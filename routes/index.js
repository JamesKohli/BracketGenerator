
/*
 * GET home page.
 */

exports.index = function(array){
	return function(req, res){
		var table = "";
		//console.log(array);

		array.forEach(function(row){
			table = table.concat('<tr>');
			row.forEach(function(column){
				table = table.concat('<td>' + column + '</td>')
			})
			table = table.concat('</tr>');
		})

		res.render('index', { title: 'Bracket Generator', predictions: table});
		console.log(table)
	}
}