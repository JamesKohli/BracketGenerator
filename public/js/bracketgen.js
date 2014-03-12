$(document).ready(function(){

//define our team list!
var teams = [' #1 (1)', ' #2 (16)', ' #3 (8)', ' #4 (9)', ' #5 (5)', ' #6 (12)', ' #7 (4)', ' #8 (13)', 
		' #9 (6)', ' #10 (11)', ' #11 (3)', ' #12 (14)', ' #13 (7)', ' #14 (10)', ' #15 (2)', ' #16 (15)', 
' #17 (1)', ' #18 (16)', ' #19 (8)', ' #20 (9)', ' #21 (5)', ' #22 (12)', ' #23 (4)', ' #24 (13)', 
		' #25 (6)', ' #26 (11)', ' #27 (3)', ' #28 (14)', ' #29 (7)', ' #30 (10)', ' #31 (2)', ' #32 (15)', 
' #33 (1)', ' #34 (16)', ' #35 (8)', ' #36 (9)', ' #37 (5)', ' #38 (12)', ' #39 (4)', ' #40 (13)', 
		' #41 (6)', ' #42 (11)', ' #43 (3)', ' #44 (14)', ' #45 (7)', ' #46 (10)', ' #47 (2)', ' #48 (15)', 
' #49(1)', ' #50 (16)', ' #51 (8)', ' #52 (9)', ' #53 (5)', ' #54 (12)', ' #55 (4)', ' #56 (13)', 
		' #57 (6)', ' #58 (11)', ' #59 (3)', ' #60 (14)', ' #61 (7)', ' #62 (10)', ' #63 (2)', ' #64 (15)', ]
	
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
	simulateRound()
	refreshBracket();
});
$('#simulateTournament').click(function(){
	resetBracket();	
	for (var x=0; x<6; x++){
		simulateRound();
	}	
	refreshBracket();	
})
$('#resetBracket').click(function() {resetBracket()})

function simulateRound() {
	console.log('Running round simulation')
	roundResults = {scores: [], nextSeeds: []};
	//iterate through each matchup
	for (var x=0; x<seedMatchups.length; x++){
		//get the seeds
		//get the probability for those seeds
		var highSeed = Math.min(seedMatchups[x][0], seedMatchups[x][1])
		var lowSeed = Math.max(seedMatchups[x][0], seedMatchups[x][1])	
		var upsetPercentage = $('#'+ lowSeed + '-' + highSeed).text()
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