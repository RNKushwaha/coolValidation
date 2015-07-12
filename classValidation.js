	Array.prototype.contains = function(v) {
		for(var i = 0; i < this.length; i++) {
			if(this[i] === v) return true;
		}
		return false;
	};

	Array.prototype.unique = function() {
		var arr = [];
		for(var i = 0; i < this.length; i++) {
			if(!arr.contains(this[i])) {
				arr.push(this[i]);
			}
		}
		return arr; 
	}

		function validate(obj){
		try{
			var openform=1;
			var names= labelname="";
			var first=0;
			jQuery("#validatedit").find("input, select, textarea").each(function(e){
			$this=jQuery(this);
			if( $this.hasClass("requiredFld") ){
				names= $this.attr('name');
		  
				  if( $this.val()=="" ){
					  if( $this.parent().parent().hasClass("hidden") || $this.parent().hasClass("hidden") ){
						}else{
							openform=0;
							if( first==0) labelname+=$this.parent().find("label").text()+"\n";//.get(0).nodeValue
							else labelname+=", "+ $this.parent().find("label").text()+"\n";//get(0).nodeValue;
							first=1; //$this.parent().parent().find("label").contents().get(0).nodeValue;
						}
				 }
			}	
		})
		// for radio buttons
		$nameArr=[];
		jQuery("#validatedit").find("input.requiredFld:radio").each(function(e){
			 $this=jQuery(this);
			 names= $this.attr('name');
			 $nameArr.push(names);
		})
		//alert($nameArr.toString());
		var unique = $nameArr.unique(); 
		//alert(unique.toString());
		for(var j=0; j< unique.length;j++){
			 $filled=0; 
			 jQuery(":radio[name="+unique[j]+"]").each(function(){
				if( jQuery(this).prop("checked")==true || jQuery(this).prop("checked")=='checked' ) {
					$filled=1;
				}
			 });
			 
			if( $filled==0 ){
				openform=0;
				if( first==0) labelname+=jQuery(":radio[name="+unique[j]+"]").parent().find("label").text()+"\n";//.get(0).nodeValue
				else labelname+=", "+ jQuery(":radio[name="+unique[j]+"]").parent().find("label").text()+"\n";//get(0).nodeValue;
					first=1;
				}	
		}
		//for checkbox
		$nameArr=[];
		   jQuery("#validatedit").find("input.requiredFld:checkbox").each(function(e){
			 $this=jQuery(this);
			 names= $this.attr('name');
			 $nameArr.push(names);
		})
		  var unique = $nameArr.unique(); 
		for(var j=0; j< unique.length;j++){
			$filled=0; 
			jQuery(":checkbox[name="+unique[j]+"]").each(function(){
				if( jQuery(this).prop("checked")==true || jQuery(this).prop("checked")=='checked' ) {
					$filled=1;
				}
		   });
		 
			if( $filled==0 ){
				openform=0;
				if( first==0) labelname+=jQuery(":checkbox[name="+unique[j]+"]").parent().find("label").text()+"\n";//.get(0).nodeValue
				else labelname+=", "+ jQuery(":checkbox[name="+unique[j]+"]").parent().find("label").text()+"\n";//get(0).nodeValue;
					first=1;
			}	
		}
			if(!openform){
				labelname= labelname.replace(/\*/g, "");
				alert("Fill all manadatory fields!\n"+labelname);
				return false;
			}
		} catch(e){ alert(e); return false;}
	}
