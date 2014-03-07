$(document).ready(function(){

//define our team list!
var teams = ['Team #1 (1)', 'Team #2 (16)', 'Team #3 (8)', 'Team #4 (9)', 'Team #5 (5)', 'Team #6 (12)', 'Team #7 (4)', 'Team #8 (13)', 
		'Team #9 (6)', 'Team #10 (11)', 'Team #11 (3)', 'Team #12 (14)', 'Team #13 (7)', 'Team #14 (10)', 'Team #15 (2)', 'Team #16 (15)', 
		'Team #17 (1)', 'Team #18 (2)', 'Team #19 (3)', 'Team #20 (4)', 'Team #21 (5)', 'Team #22 (6)', 'Team #23 (7)', 'Team #24 (8)', 
		'Team #25 (9)', 'Team #26 (10)', 'Team #27 (11)', 'Team #28 (12)', 'Team #29 (13)', 'Team #30 (14)', 'Team #31 (15)', 'Team #32 (16)', 
		'Team #33 (1)', 'Team #34 (2)', 'Team #35 (3)', 'Team #36 (4)', 'Team #37 (5)', 'Team #38 (6)', 'Team #39 (7)', 'Team #40 (8)', 
		'Team #41 (9)', 'Team #42 (10)', 'Team #43 (11)', 'Team #44 (12)', 'Team #45 (13)', 'Team #46 (14)', 'Team #47 (15)', 'Team #48 (16)', 
		'Team #49 (1)', 'Team #50 (2)', 'Team #51 (3)', 'Team #52 (4)', 'Team #53 (5)', 'Team #54 (6)', 'Team #55 (7)', 'Team #56 (8)', 
		'Team #57 (9)', 'Team #58 (10)', 'Team #59 (11)', 'Team #60 (12)', 'Team #61 (13)', 'Team #62 (14)', 'Team #63 (15)', 'Team #64 (16)']
	
var seeds = [1, 16, 8, 9, 5, 12, 4, 13, 6, 11, 3, 14, 7, 10, 2, 15, 
			1, 16, 8, 9, 5, 12, 4, 13, 6, 11, 3, 14, 7, 10, 2, 15, 
			1, 16, 8, 9, 5, 12, 4, 13, 6, 11, 3, 14, 7, 10, 2, 15, 
			1, 16, 8, 9, 5, 12, 4, 13, 6, 11, 3, 14, 7, 10, 2, 15]
	

//set up inital matchups
var matchups = []
var seedMatchups = []
for (var n=0;n<teams.length;n+=2){
	var newMatchup = [teams[n], teams[n + 1]]
	var seedMatchup = [seeds[n], seeds[n+1]]
	
	console.log('creating matchup ' + newMatchup)
	matchups.push(newMatchup);
	seedMatchups.push(seedMatchup);
}

var tournament = { teams: matchups, seeds: seedMatchups, results: []}


$(function() {
    $('#bracket').bracket({
      init: tournament /* data to initialize the bracket with */ })
  })
  
})