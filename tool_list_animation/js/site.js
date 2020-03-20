function initDash(tools,i,row){
	tools = tools.sort(function(a,b){
		var textA = a['Tool Name'].toUpperCase();
	    var textB = b['Tool Name'].toUpperCase();
	    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
	});
	tool = tools[i];
		$('#viz').html('<p class="toolname">'+tool['Tool Name']+'</p>'+svg);
		let id = tool['Tool Name'].replace(/ /g,'_').toLowerCase();
		$('#svg253').attr('id',tool['map id']+'_'+id);
		$('#viz').find('.opensource').hide();
		$('#viz').find('.userreach').hide();
		$('#viz').find('.training').hide();
		$('#viz').find('.community').hide();
		$('#viz').find('.database').hide();
		let year = 2020-tool['Community Age in years'];
		$('#viz').find('#text4').html(year);
		let update = tool['Years since last update capped at 5 (max = 5 )'];
		$('#viz').find('#text8').html(update);
		if(tool['Open source']==0){
			$('#viz').find('#_x31__Staus_Private').show();
		}
		if(tool['Open source']==1){
			$('#viz').find('#_x32__Staus_Open_Access').show();
		}
		if(tool['Open source']==2){
			$('#viz').find('#_x33__Staus_Open_Source').show();
		}
		if(tool['Open source']==3){
			$('#viz').find('#_x34__Staus_Robust').show();
		}
		if(tool['Wide spread usage (max = 3)']==1){
			$('#viz').find('#_x31__User_Reach').show();
		}
		if(tool['Wide spread usage (max = 3)']==2){
			$('#viz').find('#_x31__User_Reach').show();
			$('#viz').find('#_x32__User_Reach').show();
		}
		if(tool['Wide spread usage (max = 3)']==3){
			$('#viz').find('#_x31__User_Reach').show();
			$('#viz').find('#_x32__User_Reach').show();
			$('#viz').find('#_x33__User_Reach').show();
		}
		if(tool['online training']==1){
			$('#viz').find('#_x31__Training').show();
			
		}
		if(tool['face to face']==1){
			$('#viz').find('#_x32__Training').show();	
		}
		if(tool['Databank size']==0){
			$('#viz').find('#Community_1_1_').show();
			if(tool['Community size']>1){
				$('#viz').find('#Community_2').show();
			}
			if(tool['Community size']>2){
				$('#viz').find('#Community_3').show();
			}
			if(tool['Community size']>3){
				$('#viz').find('#Community_4').show();
			}
		} else {
			if(tool['Databank size']>0){
				$('#viz').find('#Database_1').show();
			}
			if(tool['Databank size']>1){
				$('#viz').find('#Database_2').show();
			}
			if(tool['Databank size']>2){
				$('#viz').find('#Database_3').show();
			}
			if(tool['Databank size']>3){
				$('#viz').find('#Database_4').show();
			}
			if(tool['Databank size']>4){
				$('#viz').find('#Database_5').show();
			}						
		}
		if(tool['Years since last update capped at 5 (max = 5 )']>1 || tool['Community Age in years']<3 ){
			$('#viz').find('#Update_Robust').hide();
		} else {
			$('#viz').find('#Update').hide();
		}
		if(tool['Part of wider software community (max = 1)']==0){
			$('#viz').find('#System_Connections').hide();		
		}
	i=i+1;
	if(i>240){
		i=0;
	}
	window.scrollTo(0,document.body.scrollHeight);		
	setTimeout(function(){
		initDash(tools,i,row)
	},250);
}

initDash(tools,0,0);