function loadData(){

	var departmentCall = $.ajax({ 
	    type: 'GET', 
	    url: 'data/browser_data_sub.json', 
	    dataType: 'json',
	});

	$.when(departmentCall).then(function(departmentArgs){
		initDash(departmentArgs);
	});
}

function initDash(institutes){
	institutes.forEach(function(institute,i){
		let score  = Math.round( institute['score'] * 100 ) / 100;
		$('#viz').append('<h3>'+institute['name']+'</h3><div class="row"><div class="col-md-2"><p class="score">'+score+'</p></div><div id="details'+i+'" class="col-md-10"></div>');
		departments = institute['departments']
		departments.sort(function(a,b){
			return b.score - a.score;
		})
		departments.forEach(function(department,j){
			let name = department['name']
			let number = department['subDepartments'].length
			let score = department['score']
			if(j<10){
				$('#details'+i).append('<div id="inst'+i+'sub'+j+'" class="row"></div>')
				$('#inst'+i+'sub'+j).append('<div class="col-md-3"><p class="subdet">Score: '+score+'</p><p class="subdet cluster">Cluster: '+number+'</p></div>')
				$('#inst'+i+'sub'+j).append('<div class="col-md-9"><p>'+name+'</p></div>')
			}
		});
	});
}

loadData()