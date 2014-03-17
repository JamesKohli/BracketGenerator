$(document).ready(function(){

//define our team list!
var teams = ['(1) FLA', '(16) ALBY/MSM', '(8) COLO', '(9) PITT', '(5) VCU', '(12) SFA', '(4) UCLA', '(13) TLSA', 
		'(6) OSU', '(11) DAY', '(3) SYR', '(14) WMU', '(7) UNM', '(10) STAN', '(2) KU', '(15) EKY', 
'(1) UVA', '(16) CCAR', '(8) MEM', ' (9) GW', '(5) CIN', ' (12) HARV', '(4) MSU', '(13) DEL', 
		'(6) UNC', '(11) PROV', '(3) ISU', '(14) NCCU', '(7) CONN', '(10) JOES', '(2) VILL', '(15) MILW', 
'(1) ARIZ', '(16) WEB', '(8) GONZ', '(9) OKST', '(5) OKLA', '(12) NDSU', '(4) SDSU', '(13) NMSU', 
	'(6) BAY', '(11) NEB', '(3) CREI', '(14) ULL', '(7) ORE', '(10) BYU', '(2) WIS', '(15) AMER', 
'(1) WICH', '(16) CP/TXSO', '(8) UK', '(9) KSU', '(5) SLU', '(12) NCST/XAV', '(4) LOU', '(13) MAN', 
		'(6) MASS', '(11) IOWA/TENN', '(3) DUKE', '(14) MER', '(7) TEX', '(10) ASU', '(2) MICH', '(15) WOF', ]
	
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


function refreshBracket() {
	var $bracket = $('#bracket');
	$bracket.empty()
    $bracket.bracket({
	  skipConsolationRound: true,
      init: tournament  })
  }


  
})