function initDash(tools){
	tools = tools.sort(function(a,b){
		var textA = a['Tool Name'].toUpperCase();
	    var textB = b['Tool Name'].toUpperCase();
	    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
	});
	let row=0;
	tools.forEach(function(tool,i){
		if(i%4==0){
			$('#viz').append('<div id="row'+i+'" class="row"></div>');
			row=i
		}
		$('#row'+row).append('<div id="toolviz'+i+'" class="toolviz col-md-3"><p>'+tool['Tool Name']+'</p>'+svg+'</div>');
		let id = tool['Tool Name'].replace(/ /g,'_').toLowerCase();
		$('#svg910').attr('id',tool['map id']+'_'+id);
		$('#toolviz'+i).find('.opensource').hide();
		$('#toolviz'+i).find('#System_Connections').hide();
		$('#toolviz'+i).find('.userreach').hide();
		$('#toolviz'+i).find('.training').hide();
		$('#toolviz'+i).find('.community').hide();
		let year = 2020-tool['Community Age in years'];
		$('#toolviz'+i).find('#text8').html(year);
		let update = tool['Years since last update capped at 5 (max = 5 )'];
		$('#toolviz'+i).find('#text10').html(update);
		if(tool['Open source']==0){
			$('#toolviz'+i).find('#_1_Staus_Private').show();
		}
		if(tool['Open source']==1){
			$('#toolviz'+i).find('#_2_Staus_Open_Access').show();
		}
		if(tool['Open source']==2){
			$('#toolviz'+i).find('#_3_Staus_Open_Source').show();
		}
		if(tool['Open source']==3){
			$('#toolviz'+i).find('#_4_Staus_Robust').show();
		}
		if(tool['Wide spread usage (max = 3)']==1){
			$('#toolviz'+i).find('#_1_User_Reach').show();
		}
		if(tool['Wide spread usage (max = 3)']==2){
			$('#toolviz'+i).find('#_1_User_Reach').show();
			$('#toolviz'+i).find('#_2_User_Reach').show();
		}
		if(tool['Wide spread usage (max = 3)']==3){
			$('#toolviz'+i).find('#_1_User_Reach').show();
			$('#toolviz'+i).find('#_2_User_Reach').show();
			$('#toolviz'+i).find('#_3_User_Reach').show();
		}
		if(tool['online training']==1){
			$('#toolviz'+i).find('#_1_Training').show();
			
		}
		if(tool['face to face']==0){
			$('#toolviz'+i).find('#_2_Training').show();	
		}
		$('#toolviz'+i).find('#Community_1').show();
		if(tool['Community size (max = 5)']>1){
			$('#toolviz'+i).find('#Community_2').show();
		}
		if(tool['Community size (max = 5)']>2){
			$('#toolviz'+i).find('#Community_3').show();
		}
		if(tool['Community size (max = 5)']>3){
			$('#toolviz'+i).find('#Community_4').show();
		}
		if(tool['Community size (max = 5)']>4){
			$('#toolviz'+i).find('#Community_5').show();
		}
		if(tool['Years since last update capped at 5 (max = 5 )']>1){
			$('#toolviz'+i).find('#Update_Robust').hide();
		}		
	});
}

initDash(tools);