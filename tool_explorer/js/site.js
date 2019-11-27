function initDash(tools){
	createToolViz(tools)
	$('#tooltypeselect').on('change',function(){
		filter = $('#tooltypeselect').val();
		if(filter == 0){
			console.log('no filter');
			createToolViz(tools);
		} else {
			filterTools = tools.filter(function(t){
				if(t['Ecosystem'].indexOf(filter)>-1){
					return true;
				} else {
					return false;
				}
			});
			createToolViz(filterTools);
		}
	});
}

function createToolViz(tools){

	$('#loadingModal').off("shown.bs.modal");
	$('#loadingModal').on("shown.bs.modal", function(e) {
		renderTools(tools);
		console.log(tools);
		$('#loadingModal').modal('hide');
	});
	
	console.log('showing modal');
	$('#loadingModal').modal('show');
	
}

function renderTools(tools){
	console.log('rendering');
	console.log(tools);
	$('#viz').html('');
	tools = tools.sort(function(a,b){
		var textA = a['Tool Name'].toUpperCase();
	    var textB = b['Tool Name'].toUpperCase();
	    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
	});
	let row=0;
	tools.forEach(function(tool,i){
		if(i%4==0){
			$('#viz').append('<div id="rowtitle'+i+'" class="row"></div>');
			$('#viz').append('<div id="row'+i+'" class="row"></div>');
			row=i
		}
		$('#rowtitle'+row).append('<div class="col-md-3"><p class="tooltitle">'+tool['short name']+' ('+tool['map id']+')</p></div>');
		let id = tool['Tool Name'].replace(/ /g,'_').replace(':','_').replace('/','_').toLowerCase();
		let imageName = tool['map id']+'_'+id+'.svg';
		$('#row'+row).append('<div id="toolviz'+i+'" class="toolviz col-md-3"><img src="images/tools/'+imageName+'" /></div>');
		$('#toolviz'+i).on('click',function(){
			showTool(tool);
		});
	});	
}

function showTool(tool){
	console.log('pop-up');
	$('#tool_name').html(tool['short name']);
	$('#tool_description').html(tool['short description']);
	let id = tool['Tool Name'].replace(/ /g,'_').toLowerCase();
	let imageName = tool['map id']+'_'+id+'.svg';
	$('#tool_viz').html('<img width="80%" src="images/tools/'+imageName+'" />');
	if(tool['Tool link']!=''){
		let link = tool['Tool link'];
		if(link.length>30){
			link = link.substr(0,28)+'...';
		}
		$('#tool_toollink').html('<p><b>Tool link:</b> <a href="'+tool['Tool link']+'">'+link+'</a>');
	}
	if(tool['Paper link']!=''){
		let link = tool['Paper link'];
		if(link.length>30){
			link = link.substr(0,28)+'...';
		}
		$('#tool_paperlink').html('<p><b>Paper link:</b> <a href="'+tool['Paper link']+'">'+link+'</a>');
	}
	if(tool['Contact']!=''){
		$('#tool_contact').html('<b>Contact:</b> '+tool['Contact']);
	}
	if(tool['wider network']!=''){
		$('#tool_network').html('<b>Wider Network:</b> '+tool['wider network']);
	}
	$('#tool_datatypes').html('<b>Data Types:</b> '+tool['Data types']);
	if(tool['Medical Area'].indexOf('All')==-1 && tool['Medical Area'].indexOf('Generalisable Tool')==-1){
		$('#tool_medicalarea').html('<b>Medical Area:</b> '+tool['Medical Area']);
	}
	$('#tool_partners').html('<b>Partners:</b> '+tool['Partners']);
	$('#tool_ecosystems').html('<b>Ecosystems:</b> ');
	tool['Ecosystem'].forEach(function(e){
		let index = parseInt(e)-1;
		$('#tool_ecosystems').append(ecosystems[index]+', ');
	});
	$('#toolModal').modal('show');
}

function processData(tools){
	tools.forEach(function(t){
		if(isNaN(t['Ecosystem'])){
			t['Ecosystem'] = t['Ecosystem'].split(',');
		} else {
			t['Ecosystem'] = [String(t['Ecosystem'])];
		}
		t['Medical Area'] = t['Medical Area'].split(',');
		t['Medical Area'] = t['Medical Area'].filter(function(d){
			if(d == 'Other'){
				return false;
			} else {
				return true;
			}
		});
	});
	return tools;
}

let ecosystems = [
	'Ecosystem 1 - Pooled Data',
    'Ecosystem 2 - Federated Data',
    'Ecosystem 3 - Common Data Models',
    'Ecosystem 4 - Trust, privacy and security',
    'Ecosystem 5 - NLP',
    'Ecosystem 6 - Biosignal',
    'Ecosystem 7 - Biomedical Imaging',
    'Ecosystem 8 - Phenotyping',
    'Ecosystem 9 - Other'
];

tools = processData(tools);
initDash(tools);