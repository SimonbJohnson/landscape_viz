function initDash(tools,i,row){
	tools = tools.sort(function(a,b){
		var textA = a['Tool Name'].toUpperCase();
	    var textB = b['Tool Name'].toUpperCase();
	    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
	});
	tool = tools[i];
		if(i%4==0){
			$('#viz').append('<div id="row'+i+'" class="row"></div>');
			row=i
		}
		$('#row'+row).append('<div id="toolviz'+i+'" class="toolviz col-md-3"><p class="toolname">'+tool['Tool Name']+'</p>'+svg+'</div>');
		let id = tool['Tool Name'].replace(/ /g,'_').toLowerCase();
		$('#svg253').attr('id',tool['map id']+'_'+id);
		$('#toolviz'+i).find('.opensource').hide();
		$('#toolviz'+i).find('.userreach').hide();
		$('#toolviz'+i).find('.training').hide();
		$('#toolviz'+i).find('.community').hide();
		$('#toolviz'+i).find('.database').hide();
		let year = 2020-tool['Community Age in years'];
		$('#toolviz'+i).find('#text4').html(year);
		let update = tool['Years since last update capped at 5 (max = 5 )'];
		$('#toolviz'+i).find('#text8').html(update);
		if(tool['Open source']==0){
			$('#toolviz'+i).find('#_x31__Staus_Private').show();
		}
		if(tool['Open source']==1){
			$('#toolviz'+i).find('#_x32__Staus_Open_Access').show();
		}
		if(tool['Open source']==2){
			$('#toolviz'+i).find('#_x33__Staus_Open_Source').show();
		}
		if(tool['Open source']==3){
			$('#toolviz'+i).find('#_x34__Staus_Robust').show();
		}
		if(tool['Wide spread usage (max = 3)']==1){
			$('#toolviz'+i).find('#_x31__User_Reach').show();
		}
		if(tool['Wide spread usage (max = 3)']==2){
			$('#toolviz'+i).find('#_x31__User_Reach').show();
			$('#toolviz'+i).find('#_x32__User_Reach').show();
		}
		if(tool['Wide spread usage (max = 3)']==3){
			$('#toolviz'+i).find('#_x31__User_Reach').show();
			$('#toolviz'+i).find('#_x32__User_Reach').show();
			$('#toolviz'+i).find('#_x33__User_Reach').show();
		}
		if(tool['online training']==1){
			$('#toolviz'+i).find('#_x31__Training').show();
			
		}
		if(tool['face to face']==1){
			$('#toolviz'+i).find('#_x32__Training').show();	
		}
		if(tool['Databank size']==0){
			$('#toolviz'+i).find('#Community_1_1_').show();
			if(tool['Community size']>1){
				$('#toolviz'+i).find('#Community_2').show();
			}
			if(tool['Community size']>2){
				$('#toolviz'+i).find('#Community_3').show();
			}
			if(tool['Community size']>3){
				$('#toolviz'+i).find('#Community_4').show();
			}
		} else {
			if(tool['Databank size']>0){
				$('#toolviz'+i).find('#Database_1').show();
			}
			if(tool['Databank size']>1){
				$('#toolviz'+i).find('#Database_2').show();
			}
			if(tool['Databank size']>2){
				$('#toolviz'+i).find('#Database_3').show();
			}
			if(tool['Databank size']>3){
				$('#toolviz'+i).find('#Database_4').show();
			}
			if(tool['Databank size']>4){
				$('#toolviz'+i).find('#Database_5').show();
			}						
		}
		if(tool['Years since last update capped at 5 (max = 5 )']>1 || tool['Community Age in years']<3 ){
			$('#toolviz'+i).find('#Update_Robust').hide();
		} else {
			$('#toolviz'+i).find('#Update').hide();
		}
		if(tool['Part of wider software community (max = 1)']==0){
			$('#toolviz'+i).find('#System_Connections').hide();		
		}
	i=i+1;
	window.scrollTo(0,document.body.scrollHeight);		
	setTimeout(function(){
		initDash(tools,i,row)
	},250);
}

initDash(tools,0,0);