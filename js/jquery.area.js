;(function($){
	/**
	 * created by xidige.com.
	 * 中国加油，武汉加油；
	 */
	var pluginName='area';
	var countryOfAfrica={"DJ":1,"LR":1,"LS":1,"LY":1,"UG":1,"MA":1,"DZ":1,"MG":1,"ML":1,"EG":1,"MR":1,"ZA":1,"MU":1,"MW":1,"ER":1,"MZ":1,"AO":1,"ET":1,"ZM":1,"NA":1,"NE":1,"NG":1,"ZW":1,"BF":1,"RW":1,"BI":1,"BJ":1,"SC":1,"YT":1,"SD":1,"RE":1,"SS":1,"TZ":1,"GQ":1,"BW":1,"SH":1,"EH":1,"SL":1,"KE":1,"GA":1,"SN":1,"SO":1,"CD":1,"ST":1,"GH":1,"KM":1,"CF":1,"CG":1,"CI":1,"GM":1,"SZ":1,"GN":1,"CM":1,"TD":1,"GW":1,"CV":1,"TG":1,"TN":1};
	var countryOfAmericas={"TT":1,"PR":1,"HN":1,"PY":1,"DO":1,"HT":1,"VE":1,"PM":1,"DM":1,"BL":1,"MF":1,"TC":1,"VI":1,"BO":1,"FK":1,"EC":1,"MQ":1,"UY":1,"MS":1,"AI":1,"MX":1,"VC":1,"US":1,"AR":1,"AW":1,"NI":1,"JM":1,"BM":1,"BR":1,"BS":1,"AG":1,"BB":1,"BZ":1,"GD":1,"CA":1,"GF":1,"SR":1,"KN":1,"SV":1,"GL":1,"GP":1,"CL":1,"CO":1,"GT":1,"KY":1,"VG":1,"CR":1,"PA":1,"CU":1,"GY":1,"PE":1,"LC":1};
	var countryOfAsia={"YE":1,"QA":1,"ID":1,"MM":1,"MN":1,"IL":1,"AE":1,"UZ":1,"AF":1,"IN":1,"IQ":1,"MV":1,"MY":1,"AM":1,"LA":1,"GE":1,"PS":1,"HK":1,"MO":1,"KP":1,"KR":1,"BD":1,"IR":1,"BN":1,"VN":1,"AZ":1,"NP":1,"JO":1,"JP":1,"BH":1,"SA":1,"SY":1,"BT":1,"SG":1,"KG":1,"KH":1,"OM":1,"CN":1,"KW":1,"KZ":1,"TH":1,"TJ":1,"CY":1,"LB":1,"PH":1,"TL":1,"TM":1,"PK":1,"TR":1,"LK":1};
	var countryOfEurope={"DE":1,"PT":1,"DK":1,"LT":1,"LU":1,"HR":1,"UA":1,"HU":1,"MC":1,"IE":1,"EE":1,"AD":1,"MT":1,"IS":1,"AL":1,"IT":1,"ES":1,"AT":1,"AX":1,"RO":1,"NL":1,"BA":1,"NO":1,"FI":1,"BE":1,"BG":1,"FO":1,"LV":1,"FR":1,"SJ":1,"GB":1,"MD":1,"RU":1,"SE":1,"GG":1,"IM":1,"JE":1,"SI":1,"BY":1,"SK":1,"SM":1,"GI":1,"CH":1,"GR":1,"VA":1,"ME":1,"RS":1,"MK":1,"CZ":1,"PL":1,"LI":1};
	var countryOfOceania={"TV":1,"FJ":1,"NR":1,"NU":1,"NZ":1,"SB":1,"MH":1,"WS":1,"KI":1,"MP":1,"CK":1,"PW":1,"WF":1,"GU":1,"AS":1,"AU":1,"NF":1,"NC":1,"FM":1,"PF":1,"PG":1,"TK":1,"TO":1,"PN":1,"VU":1};
	
	var defaults={
		initData:function(){return [];},
		selected:function(area){return true;},
		africa:'Africa',
		americas:'Americas',
		asia:'Asia',
		europe:'Europe',
		oceania:'Oceania',
		other:'Other',
	};
	
	function Area(element,options){
		this.eleObj=$(element);
		this.settings=$.extend({},defaults,options);
		this._init();
	}
	
	Area.prototype={
		_init:function(){
			if(typeof this.settings.initData ==='function'){
				this._areas=this.settings.initData();
			}else{
				this._areas=this.settings.initData;
			}
			this.eleObj.addClass('area-list-block fadeInUp animated');
			
			this.eleObj.append('<div class="row"><div class="col-xs-12 bg-success area-block" id="area_block_4"></div>'+
					'<div class="col-xs-12 bg-info area-block" id="area_block_3"></div>'+
					'<div class="col-xs-12 bg-warning area-block" id="area_block_2"></div>'+
					'<div class="col-xs-12 area-block" id="area_block_1">'+
					'<h4>'+this.settings['africa']+'</h4><div class="africa"></div>'+
					'<h4>'+this.settings['americas']+'</h4><div class="americas"></div>'+
					'<h4>'+this.settings['asia']+'</h4><div class="asia"></div>'+
					'<h4>'+this.settings['europe']+'</h4><div class="europe"></div>'+
					'<h4>'+this.settings['oceania']+'</h4><div class="oceania"></div>'+
					'<h4>'+this.settings['other']+'</h4><div class="other"></div>'+
					'</div></div>');
			
			var _this=this;
			this.eleObj.on('click','label',function(e){
				e.preventDefault();
				var cObj=$(this);
				_this.eleObj.find('label').removeClass('selected');
				cObj.addClass('selected');
				_this._showAreaBlock(cObj.data('id'));
				_this.settings.selected({'id':cObj.data('id'),'name':cObj.data('name')});
			});
			
			this._showAreaBlock('');
			
			return this.eleObj;
		},
		_showAreaBlock:function(areaId){
			if(!!areaId || areaId==''){
				var alen=areaId.length+2;
				var alevel=alen/2;
				if(alevel>4){
					return;
				}
				for (var i = alevel; i <= 4; i++) {
					if(i<=1){
						continue;
					}
					this.eleObj.find('#area_block_'+i).html('');
				}
				
				if(alevel==1){  //第一个级别的，按不同洲去分开显示，不在各洲的，就单独一个区域显示
					var africaAreablock=this.eleObj.find('#area_block_1 .africa');
					var americasAreablock=this.eleObj.find('#area_block_1 .americas');
					var asiaAreablock=this.eleObj.find('#area_block_1 .asia');
					var europeAreablock=this.eleObj.find('#area_block_1 .europe');
					var oceaniaAreablock=this.eleObj.find('#area_block_1 .oceania');
					var otherAreablock=this.eleObj.find('#area_block_1 .other');
					
					$.each(this._areas,function(_id,_name){
						if(_id.length==alen && _id.indexOf(areaId)==0){
							if(countryOfAsia[_id]){
								asiaAreablock.append('<label data-id="'+_id+'" data-name="'+_name+'">'+_name+'</label>');
							}else if(countryOfAfrica[_id]){
								africaAreablock.append('<label data-id="'+_id+'" data-name="'+_name+'">'+_name+'</label>');
							}else if(countryOfAmericas[_id]){
								americasAreablock.append('<label data-id="'+_id+'" data-name="'+_name+'">'+_name+'</label>');
							}else  if(countryOfEurope[_id]){
								europeAreablock.append('<label data-id="'+_id+'" data-name="'+_name+'">'+_name+'</label>');
							}else if(countryOfOceania[_id]){
								oceaniaAreablock.append('<label data-id="'+_id+'" data-name="'+_name+'">'+_name+'</label>');
							}else{
								otherAreablock.append('<label data-id="'+_id+'" data-name="'+_name+'">'+_name+'</label>');
							}
						}
					});
					
				}else{  //其他级别的，直接显示即可
					var areablock=this.eleObj.find('#area_block_'+alevel);
					areablock.html('');
					
					$.each(this._areas,function(_id,_name){
						if(_id.length==alen && _id.indexOf(areaId)==0){
							areablock.append('<label data-id="'+_id+'" data-name="'+_name+'">'+_name+'</label>');
						}
					});
				}
				
			}
		},
	};
	$.fn[pluginName]=function(options){
		return this.each(function(){
			//如果还没有初始化的，才会初始化
			if(!$.data(this,'_plugin_'+pluginName)){
				$.data(this,'_plugin_'+pluginName,new Area(this,options));
			}
			
		});
	}
})(jQuery);
