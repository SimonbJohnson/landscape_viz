function loadData(){

	var paperCall = $.ajax({ 
	    type: 'GET', 
	    url: 'data/papers.json', 
	    dataType: 'json',
	});

	var paperDepartmentCall = $.ajax({ 
	    type: 'GET', 
	    url: 'data/papers_departments.json', 
	    dataType: 'json',
	});

	var departmentCall = $.ajax({ 
	    type: 'GET', 
	    url: 'data/orgs_with_reduced.json', 
	    dataType: 'json',
	});

	$.when(paperCall,paperDepartmentCall,departmentCall).then(function(paperArgs,paperDepartmentArgs,departmentArgs){
		initDash(paperArgs[0],paperDepartmentArgs[0],departmentArgs[0]);
	});
}

function getPapers(departmentIDs,papers,links){
	
	let paperIDs = getLinks(departmentIDs,links);
	let matchingPapers = getPapersfromIDs(papers,paperIDs);
	return matchingPapers;
}

function getLinks(departmentIDs,links){
	let paperIDs = []
	links.forEach(function(link){
		if(departmentIDs.indexOf(link[1])>-1){
			if(paperIDs.indexOf(link[0])==-1){
				paperIDs.push(link[0])
			}
		}
	});
	return paperIDs
}

function getPapersfromIDs(papers,paperIDs){
	let papersMatch = [];
	paperIDs.forEach(function(id){
		paperID = 'paper'+id;
		papersMatch.push(papers[paperID]);
	});
	return papersMatch;
}

function initDash(papers,links,departments){
	departments.forEach(function(department,i){
		let score  = Math.round( department['score'] * 100 ) / 100;
		$('#viz').append('<h3>'+department['name']+'</h3><div class="row"><div class="col-md-2"><p class="score">'+score+'</p></div><div class="col-md-10"><div id="tabs'+i+'"></div></div></div>');
		tabsHTML = '<ul class="nav nav-tabs"><li class="active"><a data-toggle="tab" href="#papers'+i+'">Papers</a></li><li><a data-toggle="tab" href="#departments'+i+'">Departments</a></li></ul>';
		tabsHTML += '<div class="tab-content"><div id="papers'+i+'" class="tab-pane fade in active"></div><div id="departments'+i+'" class="tab-pane fade"></div></div>';
		$('#tabs'+i).html(tabsHTML);
		departmentIDs = [];
		department.nodes.forEach(function(node){
			$('#departments'+i).append('<p>'+node.name+'</p>');
			departmentIDs.push(node.id);
		});
		matchingPapers = getPapers(departmentIDs,papers,links);
		matchingPapers.forEach(function(paper){
			$('#papers'+i).append('<p><a href="https://www.ncbi.nlm.nih.gov/pubmed/'+paper.pmid+'" target="_blank">'+paper.title+'</a></p>');
		});
	});
}

loadData()