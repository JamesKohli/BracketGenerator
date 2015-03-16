$(document).ready(function(){

//define our team list!
var teams = ['(1) UK', '(16) HAM/MAN', '(8) CIN', '(9) PUR', '(5) WVU', '(12) BUFF', '(4) MD', '(13) VALP', 
		'(6) BUT', '(11) TEX', '(3) ND', '(14) NE', '(7) WICH', '(10) IND', '(2) KU', '(15) NMSU', 
'(1) VILL', '(16) LAF', '(8) NCST', '(9) LSU', '(5) UNI', '(12) WYO', '(4) LOU', '(13) UCI', 
	'(6) PROV', '(11) BSU/DAY', '(3) OKLA', '(14) ALB', '(7) MSU', '(10) UGA', '(2) UVA', '(15) BEL',
'(1) WIS', '(16) CCAR', '(8) ORE', ' (9) OKST', '(5) ARK', ' (12) WOF', '(4) UNC', '(13) HARV', 
		'(6) XAV', '(11) BYU/MISS', '(3) BAY', '(14) GAST', '(7) VCU', '(10) OSU', '(2) ARIZ', '(15) TXSO',  
'(1) DUKE', '(16) UNF/RMU', '(8) SDSU', '(9) SJU', '(5) UTAH', '(12) SFA', '(4) GTWN', '(13) EWU', 
		'(6) SMU', '(11) UCLA', '(3) ISU', '(14) UAB', '(7) IOWA', '(10) DAV', '(2) GONZ', '(15) NDSU', ]
	
var seeds = [1, 16, 8, 9, 5, 12, 4, 13, 6, 11, 3, 14, 7, 10, 2, 15, 
			1, 16, 8, 9, 5, 12, 4, 13, 6, 11, 3, 14, 7, 10, 2, 15, 
			1, 16, 8, 9, 5, 12, 4, 13, 6, 11, 3, 14, 7, 10, 2, 15, 
			1, 16, 8, 9, 5, 12, 4, 13, 6, 11, 3, 14, 7, 10, 2, 15]
	

//set up inital matchups
var matchups = []
var seedMatchups = []
var results = []
//iterate through the list of teams, and pair them off into matchups 2 at a time
for (var n=0;n<teams.length;n+=2){
	var newMatchup = [teams[n], teams[n + 1]]
	var seedMatchup = [seeds[n], seeds[n+1]]
	
	console.log('creating matchup ' + newMatchup)
	//take our new matchup and add it to our list of matchups
	matchups.push(newMatchup);
	seedMatchups.push(seedMatchup);
}

//using these matchups, create a tournament object. It has no results yet.
var tournament = { teams: matchups, results: []}
console.log(tournament)
refreshBracket();

//on button press
$('#simulateRound').click(function(){
	if ($('td').hasClass('has-error')){
		console.log('Error with probabilities chart')
		alert('Please fix errors in probabilities chart. All values must be numbers between 0 and 1. You can refresh the page to reset the defaults.')
		return;
	}
	simulateRound()
	refreshBracket();
});
$('#simulateTournament').click(function(){
	if ($('td').hasClass('has-error')){
		console.log('Error with probabilities chart')
		alert('Please fix errors in probabilities chart. All values must be numbers between 0 and 1. You can refresh the page to reset the defaults.')
		return;
	}
	resetBracket();	
	for (var x=0; x<6; x++){
		simulateRound();
	}	
	refreshBracket();	
})
$('#resetBracket').click(function() {resetBracket()})

//validation for inputs
$('input').change(function() {
    $input = $(this);
	n= $input.val()
	console.log(n)
	if (!isNaN(parseFloat(n)) && isFinite(n) && n <= 1 && n >= 0){
		console.log('Valid input')
		$input.parent('td').removeClass('has-error').addClass('has-success');		
	} else {
		console.log('Invalid input')
		$input.parent('td').removeClass('has-success').addClass('has-error');		
	}
})

function simulateRound() {
	console.log('Running round simulation')
	
	
	roundResults = {scores: [], nextSeeds: []};
	//iterate through each matchup
	for (var x=0; x<seedMatchups.length; x++){
		//get the seeds
		//get the probability for those seeds
		var highSeed = Math.min(seedMatchups[x][0], seedMatchups[x][1])
		var lowSeed = Math.max(seedMatchups[x][0], seedMatchups[x][1])	
		var upsetPercentage = $('#'+ lowSeed + '-' + highSeed).val()
		console.log('High seed ' + highSeed + ' vs low seed ' + lowSeed + ' with upset % ' + upsetPercentage);	
		//calculate who won 
		//push results
		//push matchup and seeds
		var matchupResult = [1, 1]		
		//Handle mirror matchups
		if (highSeed == lowSeed){
			console.log('Mirror matchup!')
			if (Math.random() > .5){
				roundResults.scores.push([1,2])
				//roundResults.nextTeams.push
			} else {
				roundResults.scores.push([2,1])
			}			
			roundResults.nextSeeds.push(highSeed)
		} else if (Math.random() > upsetPercentage)
		{
			matchupResult[seedMatchups[x].indexOf(highSeed)] = 2
			//console.log(matchupResult)
			roundResults.scores.push(matchupResult)
			roundResults.nextSeeds.push(highSeed)
			
		} else {
			matchupResult[seedMatchups[x].indexOf(lowSeed)] = 2
			//console.log(matchupResult)
			roundResults.scores.push(matchupResult)
			roundResults.nextSeeds.push(lowSeed)
		}				
	}	
	//set up next seedMatchups
	seedMatchups = []
	for (var x=0; x<roundResults.nextSeeds.length; x+=2){
		seedMatchups.push([roundResults.nextSeeds[x], roundResults.nextSeeds[x+1]])
	}	
	//update results and bracket
	console.log(roundResults)
	results.push(roundResults.scores)
	tournament.results= results;
}


function resetBracket(){
	//reset tourney
	console.log('Resetting bracket');
	matchups = []
	seedMatchups = []
	results = []
	for (var n=0;n<teams.length;n+=2){
		var newMatchup = [teams[n], teams[n + 1]]
		var seedMatchup = [seeds[n], seeds[n+1]]		
		console.log('creating matchup ' + newMatchup)
		matchups.push(newMatchup);
		seedMatchups.push(seedMatchup);
	}	
	tournament = { teams: matchups, results: []}
	refreshBracket()
}

function setTeamsTable(){
var teamsHtml = ""

	teams.forEach(function(team){
		teamsHtml = teamsHtml.concat('<tr><td>'+team+'</td><td><input id="' + team + 'hcap" value="0" type="number" class="form-control"></input></td></tr>')
	})

$('#teams').append(teamsHtml);
}

function createSeedHandicaps(){

}

//setTeamsTable()

/* Called whenever bracket is modified
 *
 * data:     changed bracket object in format given to init
 * userData: optional data given when bracket is created.
 */
function saveFn(data, userData) {
  var json = jQuery.toJSON(data)
  $('#saveOutput').text('POST '+userData+' '+json)
  /* You probably want to do something like this
  jQuery.ajax("rest/"+userData, {contentType: 'application/json',
                                dataType: 'json',
                                type: 'post',
                                data: json})
  */
}

function refreshBracket() {
	var $bracket = $('#bracket');
	$bracket.empty()
    $bracket.bracket({
	  skipConsolationRound: true,
      init: tournament,
	  save: saveFn,
      userData: "http://myapi"})
  }


  
})