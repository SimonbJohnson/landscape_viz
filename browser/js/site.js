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
	    url: 'data/browser_data.json', 
	    dataType: 'json',
	});

	var countriesCall = $.ajax({ 
	    type: 'GET', 
	    url: 'data/countries.json', 
	    dataType: 'json',
	});

	$.when(paperCall,paperDepartmentCall,departmentCall,countriesCall).then(function(paperArgs,paperDepartmentArgs,departmentArgs,countriesArgs){
		initDash(paperArgs[0],paperDepartmentArgs[0],departmentArgs[0]);
		generateDropDowns(countriesArgs[0],paperArgs[0],paperDepartmentArgs[0],departmentArgs[0])
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

function generateDropDowns(countrylist,papers,links,institutes){
	let countries = ['No filter'];
	let subregions = ['No filter'];
	let continents = ['No filter'];
	let northsouth = ['No filter'];
	countrylist.forEach(function(geo){
		if(countries.indexOf(geo['Country'])==-1){
			countries.push(geo['Country']);
		}
		if(subregions.indexOf(geo['Sub Region'])==-1){
			subregions.push(geo['Sub Region']);
		}
		if(continents.indexOf(geo['Continent'])==-1){
			continents.push(geo['Continent']);
		}
		if(northsouth.indexOf(geo['South or North'])==-1){
			northsouth.push(geo['South or North']);
		}
	});
	generateDropDown('country',countries,papers,links,institutes);
	generateDropDown('subregion',subregions,papers,links,institutes);
	generateDropDown('continent',continents,papers,links,institutes);
	generateDropDown('northsouth',northsouth,papers,links,institutes);
}

function generateDropDown(id,list,papers,links,institutes){
	let html = '<p>'+id+': <select id="dropdown'+id+'"></select></p>';
	let ids = ['country','subregion','continent','northsouth'];
	$('#dropdowns').append(html);
	list.forEach(function(l){
		$('#dropdown'+id).append('<option>'+l+'</option>')
	});
	$('#dropdown'+id+'').on('change',function(e){
		let value = $('#dropdown'+id+'').val();
		filteredInstitutes = filter(id,value,institutes);
		initDash(papers,links,filteredInstitutes);
		ids.forEach(function(d){
			if(d!=id){
				$('#dropdown'+d).val('No filter');
			}
		});
	});
}

function filter(key,value,institutes){
	if(value!='No filter'){
		institutes = institutes.filter(function(d){
			return d[key] == value;
		});
	}
	return institutes
}

function initDash(papers,links,institutes){
	$('#viz').html('');
	institutes.forEach(function(institute,i){
		let score  = Math.round( institute['score'] * 100 ) / 100;
		$('#viz').append('<h3>'+institute['name']+'</h3><div class="row"><div class="col-md-2"><p class="score">'+score+'</p></div><div id="details'+i+'" class="col-md-10"></div>');
		departments = institute['departments']
		departments.sort(function(a,b){
			    var textA = a.name.toUpperCase();
			    var textB = b.name.toUpperCase();
			    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
		})
		departments.forEach(function(department,j){
			let name = department['name'];
			let id = department['id'];
			$('#details'+i).append('<p id="inst'+i+'department'+j+'">'+name+'</p><div id="inst'+i+'department'+j+'papers"></div>');
			$('#inst'+i+'department'+j).on('click',function(){
				matchingPapers = getPapers([id],papers,links);
				let html = '';
				matchingPapers.forEach(function(paper){
					let title = paper['title'];
					let url  = 'https://www.ncbi.nlm.nih.gov/pubmed/'+paper['pmid'];
					html += '<p><a href="'+url+'" target="_blank">'+title+'</a></p>';
				});
				$('#inst'+i+'department'+j+'papers').append(html);
				$('#inst'+i+'department'+j+'papers').addClass('papers');
			});
		});
	});
}

loadData()