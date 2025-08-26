/**
 * 
 */
var formloadedonce=false;
function generatecaptcha(){
	var from=Math.floor(Math.random() * 10);
	var to=Math.floor(Math.random() * 10);
	var symbolnumber=Math.floor(Math.random() * 10);
	var captcha="";
	var captchaval="";
	if(symbolnumber<6)
	{		
		captcha=from+" + "+to;
		captchaval=from+to;		
	}
	else
	{
	if(from>to)
	{
		captcha=from+" - "+to;
		captchaval=from-to;	
	}
	else
	{
		captcha=to+" - "+from;
		captchaval=to-from;	
	}
	}
	$(".captchaimage").html(captcha);
	$(".captcha").val("");
	$("#captchacode").val(captchaval);

}
$("#SendOTP").click(function(){

	$("#NewRegistration").hide();
	$("#VerifyOTP").show();
});
$("#gotoNewRegistration").click(function(){
	$("#VerifyOTP").hide();
	$("#NewRegistration").show();

});
$("#GotoOldDetailRegistration").click(function(){
	window.location.href="OldCandidateDetailRegistration.jsp";
});
$(".year").datepicker({
    format: "yyyy",
    minViewMode: "years"
});
$(".month").datepicker({
    format: "MM",
    viewMode: "months", 
    minViewMode: "months"
});
$('input.alphanumeric').keypress(function (e) {
    var regex = new RegExp("^[a-zA-Z0-9]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }
    e.preventDefault();
    $("#loader").hide();
    return false;
});
$('input.text').keypress(function (e) {
    var regex = new RegExp("^[a-zA-Z0-9 \/@.,_-]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }
    
    e.preventDefault();
    $("#loader").hide();
    return false;
});
$('input.alpahnumeric').keypress(function (e) {
    var regex = new RegExp("^[a-zA-Z0-9 ]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }
    
    e.preventDefault();
    $("#loader").hide();
    return false;
});
$('input.number').keypress(function (e) {
    var regex = new RegExp("^[0-9]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }

    e.preventDefault();
    $("#loader").hide();
    return false;
});
$('input.decimal').keypress(function (e) {
    var regex = new RegExp("^[0-9.]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
        return true;
    }

    e.preventDefault();
    $("#loader").hide();
    return false;
});
/*function checkdateformat(str){
	var parms = str.split(/[\-]/);
	  var yyyy = parseInt(parms[2],10);
	  var mm   = parseInt(parms[1],10);
	  var dd   = parseInt(parms[0],10);
	  var date = new Date(yyyy,mm-1,dd,0,0,0,0);
	  return mm === (date.getMonth()+1) && dd === date.getDate() && yyyy === date.getFullYear();
}*/
function checkdateformat(str){
	
	var parms = str.split(/[\-]/);
	  var yyyy = parms[2];
	  var mm   = parms[1];
	  var dd   = parms[0];
	  var date = new Date(yyyy,mm-1,dd);
	
	  return date;
	
}
function checkpassword(strpassword)
{
	 var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
     if(strongRegex.test(strpassword))
     {
    	 return true;
     }
     else
     {
    	return false;
         
     }

}
////////////////////////////////////////////////////////////////TextEditor/////////////////////////////////////////////////////////////////

function textView(label){
	$($("#"+label).siblings("#viewText")).hide();
	$("#"+label).show();
 window[label]=CKEDITOR.replace(label,
{
        extraPlugins: 'FMathEditor',
		allowedContent: true,
        removePlugins: 'uploadimage,uploadwidget,uploadfile,filetools,filebrowser',
        height: 320,
        
        removeButtons: 'PasteFromWord'
      });
	CKEDITOR.config.width = '100%';     
	CKEDITOR.config.height = 300; 
	$($("#"+label).parent().siblings("#close")).show();
	$($("#"+label).parent().siblings("#saveTextEd")).show();
	$($("#"+label).parent().siblings("#editor2")).hide();
	$($("#"+label).parent().siblings("#editor3")).hide();

}
function showText(label){
console.log(label);
var editor_data = CKEDITOR.instances[label].getData();  
if (editor_data!=null ||editor_data!="")
	{  
	$("#"+label).html(editor_data);
	}
	$("#"+label).show();
window[label].destroy();
$($("#"+label).parent().siblings("#close")).hide();
$($("#"+label).parent().siblings("#saveTextEd")).hide();
$($("#"+label).siblings("#viewText")).show();

}
function saveToTextEditor(label,previewLabel)
{		
		var editor_data = CKEDITOR.instances[label].getData();  
		console.log(editor_data);
		if (editor_data==null ||editor_data=="")
		{   alert("TextArea is Empty!!!");
			return;
		}
		else
		{
		$("#"+label).html(editor_data);
		$($("#"+label).parent().siblings("#close")).hide();
		$($("#"+label).parent().siblings("#saveTextEd")).hide();
		$("#cke_"+label).hide();	
		
		$($("#"+label).parent().siblings("#editor3")).show();
		$("#"+previewLabel).html(editor_data);
	//	$($($($($("#"+label).parent()).siblings("#editor3")).children("div.panel.panel-default.Left")).children("#editorPreview")).html(editor_data);
		var img=null;
 		var node = document.getElementById(previewLabel);
		node.crossOrigin='Anonymous';
    	domtoimage.toPng(node,{ "cacheBust":true }).then(function (dataUrl) {
        img = new Image();
		img.crossOrigin = 'Anonymous';
    	img.src = dataUrl;
		console.log(dataUrl);
		var jsonObject = new Object();
		jsonObject["pdfid"]=$($("#"+label).parent().siblings("#docid")).val();
		jsonObject["base64img"]=dataUrl;
		//jsonObject["htmlData"]=$($($($($("#"+label).parent()).siblings("#editor3")).children("div.panel.panel-default.Left")).children("#editorPreview")).html().replace(/\n/g, "").replace(/"/g,"");
		jsonObject["htmlData"]=editor_data.replace(/\n/g, "");//.replace(/"/g,"");
		jsonObject["fname"]=$('#FormName').val();
	
		 $.ajax({
		type : 'POST',
		url : '/GenerateEditorPdf', //calling servlet      
		dataType: 'JSON',
		async: false,
		data : {
			jsonPost : JSON.stringify(jsonObject)
		},
		success : function(data) {
		 
			  if(data.status=="success"){
		     
		       $($("#"+label).parent().siblings("#docid")).val(data.docid);
		    	showsticky("Pdf saved Successfully","");
		      	$($("#"+label).parent().siblings("#TextEditorPreview")).html("<a title='click to view' target='_blank' href='/PreviewTxtEditor.jsp?pdf="+data.docid+"' style='cursor:pointer;float:left;'><img title='click to view' style='width: 30px;height: 30px;' src='/img/pdficon.png'></img></a><a title='click to view' target='_blank' href='/PreviewTxtEditor.jsp?pdf="+data.docid+"' style='cursor:pointer;float:left;'><span style='float: left;color: orange;font-weight: bolder;'>click to view</span></a>")
				
				}
		    
		      },
		      error : function(xhr, ajaxOptions) {
			alert(xhr.status + " :: " + xhr.statusText);
		}
		     
			});	
		
		
		    }).catch(function (error) {
		        console.error('oops, something went wrong!', error);});
		}
		window[label].destroy();
		$("#"+label).hide(); 
		
		}


function deleteTxtEntry(label)
{
	var docid=$($("#"+label).parent().siblings("#docid")).val();
	var deleteObject= new Object();
	deleteObject["docid"]=docid;
	deleteObject["action"]="delete";
	 $.ajax({
		type : 'POST',
		url : '/GenerateEditorPdf', //calling servlet      
		dataType: 'JSON',
		async: false,
		
		data : {
			jsonPost : JSON.stringify(deleteObject)
		},
		success : function(data) {
		 
			  if(data.status=="success"){
		    	showsticky("TextEditor Details deleted from database","");
				$($("#"+label).parent().siblings("#editor3")).hide();
				$($("#"+label).parent().siblings("#TextEditorPreview")).html("");
				$($("#"+label).parent().siblings("#docid")).val(0);
				$($("#"+label).parent().siblings("#editor2")).show();
				$($("#"+label).siblings("#viewText")).show();

		    }
		    
		      },
		      error : function(xhr, ajaxOptions) {
			alert(xhr.status + " :: " + xhr.statusText);
		}
		     
			});	
	
	
}

var filtereddata="";
function getfiletered()
{
	var FormDetails="";
	for(var i=0;i<$("#AllFields .form  div input:visible").length;i++)
	{		
		if($($("#AllFields .form  div input:visible")[i]).attr("name")!=undefined){
			if($($("#AllFields .form  div input:visible")[i]).attr("type")=="checkbox")
			{
				if($($("#AllFields .form  div input:visible")[i]).parent("div").is(":visible"))
    			{
				if($($("#AllFields .form  div input:visible")[i]).is(':checked'))
				{
					if($($("#AllFields .form div input:visible")[i]).parent().parent().is(":visible"))
					{
					var name=$($("#AllFields .form  div input:visible")[i]).siblings("label").attr("displayname");
					FormDetails=FormDetails+'"'+name+'"'+':'+'"'+"1"+'"'+',';
					}
				}
				else
				{
					if($($("#AllFields .form div input:visible")[i]).parent().parent().is(":visible"))
					{
					var name=$($("#AllFields .form  div input:visible")[i]).siblings("label").attr("displayname");
					FormDetails=FormDetails+'"'+name+'"'+':'+'"'+"0"+'"'+',';
					}
				}
    			}
				else{
					if($($("#AllFields .form div input:visible")[i]).parent().parent().is(":visible"))
					{
					var name=$($("#AllFields .form  div input")[i]).siblings("label").attr("displayname");
					FormDetails=FormDetails+'"'+name+'"'+':'+'"'+"0"+'"'+',';
					}
				}
		    }
		    else
		    {
		    	if($($("#AllFields .form  div input:visible")[i]).hasClass("captcha"))
		    	{
		    	}
		    	else
		    	{
		    		if($($("#AllFields .form  div input:visible")[i]).attr("type")=="radio")
		        	{		    			
		    			
		        	}
		    		else
		    		{
		    			if($($("#AllFields .form  div input:visible")[i]).parent("div").is(":visible"))
		    			{
		    				if($($("#AllFields .form  div input:visible")[i]).hasClass("month"))
		    				{	
		    					if($($("#AllFields .form div input:visible")[i]).parent().parent().is(":visible"))
						     	{	    					
		    					 var name=$($("#AllFields .form  div input:visible")[i]).parent().find("label:first").attr("displayname");
						      	 var val=getmonth($($("#AllFields .form  div input:visible")[i]).val());
						         FormDetails=FormDetails+'"'+name+'"'+':'+'"'+val+'"'+',';
							   }
		    				}
		    				else
		    				{
		    				    if($($("#AllFields .form  div input:visible")[i]).hasClass("masktext"))
		    				    {	
		    				    	if($($("#AllFields .form div input:visible")[i]).parent().parent().is(":visible"))
		    						{
		    				     	 var name=$($("#AllFields .form  div input:visible")[i]).parent().siblings("label").attr("displayname");
						        	 var val=$($("#AllFields .form  div input:visible")[i]).siblings("span.maskval").html()+$($("#AllFields .form  div input")[i]).val();
						             FormDetails=FormDetails+'"'+name+'"'+':'+'"'+val+'"'+',';
		    						}
		    				    }
		    		             else
		    		            {	
		    		            	 if($($("#AllFields .form div input:visible")[i]).parent().parent().is(":visible"))
		    						{
				                      var name=$($("#AllFields .form  div input:visible")[i]).siblings("label").attr("displayname");
				      	              var val=$($("#AllFields .form  div input:visible")[i]).val();
				      	              if(name!="undefined")
				                      FormDetails=FormDetails+'"'+name+'"'+':'+'"'+val+'"'+',';	
		    						}
		    			        }
		    				}
		    		    } 
		    			else
		    			{
		    			  if($($("#AllFields .form  div input:visible")[i]).hasClass("uploadtablefile"))
		    			  {		    
		    				  if($($("#AllFields .form div input:visible")[i]).parent().parent().is(":visible"))
		  					   {
		    					 var name=$($("#AllFields .form  div input:visible")[i]).parent().siblings("label").attr("displayname");
		    					 //var val=$($("#AllFields .form  div input:visible")[i]).parent().find("input[type=hidden]").val();
		    					 var val=$($("#AllFields .form  div input:visible")[i]).parent().find("#doc_id").val();
						         FormDetails=FormDetails+'"'+name+'"'+':'+'"'+val+'"'+',';
		  					   }
		    				 }
		    				else
		    				{
		    				if($($("#AllFields .form  div input:visible")[i]).parent().parent().is(":visible"))
		    				{
		    					
		    				     var name=$($("#AllFields .form  div input:visible")[i]).siblings("label").attr("displayname");
					      	     var val="0";
					      	     if(name!="undefined")
					             FormDetails=FormDetails+'"'+name+'"'+':'+'"'+val+'"'+',';
		    					
		    				}
		    				}
		 		    		
		    			}
		    		}
		    	}
			  }
		}				 
	}
	var alltextarea=$("#AllFields .form  textarea:visible");
	for(var i=0;i<alltextarea.length;i++)
	{		
			 var name=$(alltextarea[i]).siblings("label").attr("displayname");
			 var val=$(alltextarea[i]).val();
	      	 FormDetails=FormDetails+'"'+name+'"'+':'+'"'+val+'"'+',';
	}
	var radiowithyesno=$("#AllFields .form  label.radiowithyesno:visible");
	
	for(var i=0;i<radiowithyesno.length;i++)
	{		
			 var name=$(radiowithyesno[i]).attr("displayname");
			 var val='N';
			 if($(radiowithyesno[i]).siblings(".radiowithyesno-YES").prop("checked"))
			 {
				 if($(radiowithyesno[i]).siblings(".radiowithyesno-YES:visible").length>0)
					 {
					 val='Y'
					 }
				
			 }
	      	 FormDetails=FormDetails+'"'+name+'"'+':'+'"'+val+'"'+',';

	}
	var radioclass=$("#AllFields .form  div.radiodiv:visible");
	for(var i=0;i<radioclass.length;i++)
	{		  
		var val="0";
		var name=$(radioclass[i]).find("label:first").attr("displayname");
		if($(radioclass[i]).find("input[type=radio]:checked").length>0)
		{
			val=$(radioclass[i]).find("input[type=radio]:checked").val();
		}
		FormDetails=FormDetails+'"'+name+'"'+':'+'"'+val+'"'+',';		
	}
	var allselects=$("#AllFields .form  div select.singleselect:visible");
	for(var i=0;i<allselects.length;i++)
	{
	 if($(allselects[i]).parent("div").is(":visible"))
	 {	
		var name=$(allselects[i]).siblings("label").attr("displayname");
		var val=$(allselects[i]).val();
	    if(val==null||val=="")
		{
		val="0";
		}
	    FormDetails=FormDetails+'"'+name+'"'+':'+'"'+val+'"'+',';
	  }
	else
	{
		var name=$(allselects[i]).siblings("label").attr("displayname");
		FormDetails=FormDetails+'"'+name+'"'+':'+'"'+'0'+'"'+',';
	}
	}
	
	var allselectswithother=$("#AllFields .form  div select.selectwithother:visible");
	for(var i=0;i<allselectswithother.length;i++)
	{
	 if($(allselectswithother[i]).parent("div").is(":visible"))
	 {	
		var name=$(allselectswithother[i]).siblings("label").attr("displayname");
		var val=$(allselectswithother[i]).val();
	    if(val==null||val=="")
		{
		val="0";
		}
	    FormDetails=FormDetails+'"'+name+'"'+':'+'"'+val+'"'+',';		   
	  }	
	}
	
	var allmultiselects=$("#AllFields .form  div select.multiselect:visible");
	for(var i=0;i<allmultiselects.length;i++)
	{		
	 var val="0";
	  var name=$(allmultiselects[i]).siblings("label").attr("displayname");
	  if($(allmultiselects[i]).parent("div").is(":visible"))
	  {
		 val=$(allmultiselects[i]).val();		
	    if(val==null||val=="")
		{
		val="0";
		}
	    else
	    {
	    	while(val.toString().indexOf(",")>-1)
	    	val=val.toString().replace(",","-");	    	
	    }
	  }	  
	  FormDetails=FormDetails+'"'+name+'"'+':'+'"'+val+'"'+',';   
	}
	FormDetails=FormDetails+listboxdata();
	FormDetails=FormDetails+'FormName'+':'+'"'+$("#FormName").val()+'"'+','; 
	FormDetails=FormDetails+'tableid'+':'+'"'+$("#tableid").val()+'"'+','; 
	FormDetails="{"+FormDetails.substring(0,FormDetails.length-1)+"}";
	var gettabledatainjson="";
	gettabledatainjson="{"+gettabledatainjson;
	gettabledatainjson=gettabledatainjson+'"table_ID"'+':'+'"Get_col_data"'+',';
	gettabledatainjson=gettabledatainjson+'"filters"'+':'+FormDetails+',';	
	gettabledatainjson=gettabledatainjson+'"formupdateid"'+':'+'"'+$("#formupdateid").val()+'"'+'}';
	filtereddata=gettabledatainjson;
	getcolswidth(filtereddata);
}

function getcolswidth(dataval){
	var cols="";
	$.ajax({
        type: "get",
         data: {tabledata: dataval.trim()},
        url: "/gettablestructuredata",
		dataType: 'JSON',
		asysnc: false,
        success: function (data) {
        	if(data.toString.length!=0){
	        	var cols=data.rows[0][0];
	        	if(JSON.parse(cols)[0].width!="0")
	        	{
	        	  tablecolwidth=cols;
	        	  
	        	}
        	}
        	adddatatablestructure();
        }
	});
}
var tablecolwidth;
function Posttable(formdata,isvalid)
{	
	
  var tables=$("#AllFields .edittable:visible");	
  var formdetails=formdata;
  var tablenames='[';
  for(var table=0;table<tables.length;table++)
  {
	var tablename=$($($("#AllFields .edittable:visible")[table]).find("table")).attr("id");	
	tablenames=tablenames+'"'+$($($("#AllFields .edittable:visible")[table]).find("table")).attr("id")+'",';
	var valid=true;

	if(isvalid==0)
	{		
		valid=true;		
	}	
	if(isvalid==1)
	{
	var trs=$("#"+tablename+" tbody tr:not(.editableaddrow)");
	var ths=$("#"+tablename+" thead th");
	var trlen=trs.length;
	for(var tr=0;tr<trlen;tr++)
	{
	var tds=$(trs[tr]).find("td");
	for(var i=0;i<tds.length;i++)
	{
			if($(tds[i]).find("select").length>0)
			{			
				
				if($(tds[i]).find("select").attr("requiredval")=="1")
				{
					    if($(tds[i]).find("select").val()==""||$(tds[i]).find("select").val()=="0")
						{					    	
					    	$(tds[i]).find("select").focus();
					    	$(tds[i]).find("select").addClass("requiredfield");
					    	valid=false;
					    	
						}
					    else
					    {
					    	if($(tds[i]).find("select").hasClass("requiredfielderror"))
					    	{
					    		$(tds[i]).find("select").focus();
						    	$(tds[i]).find("select").addClass("requiredfield");
						    	valid=false;
						    }
					    	else{
					    	$(tds[i]).find("select").removeClass("requiredfield");
					    	}
					    }
				}
				
			}
			if($(tds[i]).find("input").length>0&&($(tds[i]).find("input").attr("type")!="search"))
			{ 
				if($(tds[i]).find("input[type=file]").length>0)
				{
					if($(tds[i]).find("input[type=file]").attr("requiredval")=="1")
					   {
						   if($(tds[i]).find("input[type=hidden]").val()=="0"||$(tds[i]).find("input[type=hidden]").val()==""||$(tds[i]).find("input[type=hidden]").val()=="null")
							{									   
							   $(tds[i]).find("input[type=file]").focus();
							   $(tds[i]).find("input[type=file]").addClass("requiredfield");
							   valid=false;					       
							}
						   else
						   {
							   if($(tds[i]).find("input[type=file]").hasClass("requiredfielderror"))
						    	{
						    		$(tds[i]).find("input[type=file]").focus();
							    	$(tds[i]).find("input[type=file]").addClass("requiredfield");
							    	valid=false;
							    }
						    	else{
						    	$(tds[i]).find("input[type=file]").removeClass("requiredfield");
						    	}
							   
						   }
					   }
				}
				else if($(tds[i]).find("input.date").length>0)
				{
					if($($(tds[i]).find("input.date")).val()!=undefined && $($(tds[i]).find("input.date")).val()!='')
					{
					var checkDate=checkdateformat(($($(tds[i]).find("input.date")).val()));
					if(checkDate=='Invalid Date'|| checkDate==undefined)
					{
					$($(tds[i]).find("input.date:visible")).css("border-color","red"); 
					$($(tds[i]).find("input.date:visible")).addClass("requiredval"); 
					valid=false; 
					}
					else
					{   $($(tds[i]).find("input.date:visible")).css("border-color",""); 
						$(tds[i]).find("input").removeClass("requiredfield");	
					}	
					}
				}
				else
				{
					if($(tds[i]).find("input").attr("requiredval")=="1")
					   {
						if($(tds[i]).find("input").attr("type")=="checkbox")
						{
						
						}
						else{
						   if($(tds[i]).find("input").val()==""||$(tds[i]).find("input").val()=="null")
							{									   
							   $(tds[i]).find("input").focus();
							   $(tds[i]).find("input").addClass("requiredfield");
							   valid=false;					       
							}
						   else
						   {
							   if($(tds[i]).find("input").hasClass("requiredfielderror"))
						    	{
						    		$(tds[i]).find("input").focus();
							    	$(tds[i]).find("input").addClass("requiredfield");
							    	valid=false;
							    }
						    	else{
						    	$(tds[i]).find("input").removeClass("requiredfield");
						    	}
						   }
					   }
					  }
				}
						  				
		 }	
	   }
	 }
	}
	if(!valid)
		{ $("#loader").hide();
		return false;		
		}
	if(valid)
	{
	$("#"+tablename+" input").removeClass("requiredfield");
	$("#"+tablename+" select").removeClass("requiredfield")
	var trs=$("#"+tablename+" tbody tr:not(.editableaddrow,.dontpost)");
	var ths=$("#"+tablename+" thead th");
	var jsonval="";
	var rows="";
	var trlen=trs.length;
	for(var i=0;i<trlen;i++)
	{
		var tds=$(trs[i]).find("td");		
		jsonval+="{";
		rows="";
		var len=tds.length;
		if($(tds[len-1]).find("button").length>0)
		{			
			len=len-1;
		}
		for(var j=0;j<len;j++)
		{
			    var key=$(ths[j]).find("input[type=hidden]").val();
			    var val;						   
				if($(tds[j]).find("input").length>0&&($(tds[j]).find("input").attr("type")!="search"))
				{	
					if($(tds[j]).find("input[type=hidden]").length>0)
					{
						//val=$(tds[j]).find("input[type=hidden]").val();
						if($(tds[j]).find("#doc_id").length>0)
						{
						  val=$(tds[j]).find("#doc_id").val();
						}
						else
						{
						val=$(tds[j]).find("input[type=hidden]").val();
						}
					}
					else
					{
						if($(tds[j]).find("input").attr("type")=="checkbox")
						{
							if($(tds[j]).find("input[type=checkbox]").prop("checked"))
								{
								val="1";
								}
							else
								{
								val="0";
								}
						}
						else
						{
						val=$(tds[j]).find("input").val();
						}
					}
								
				}
				else
				{
					if($(tds[j]).find("select").length>0)
					{	
						if($(tds[j]).find("select").hasClass("selectwithother"))
						{
							/*if($(tds[j]).find("select").val()=="selectwithothervalue")
							{								
							    //val='"'+"OTHER"+key+'"'+':'+'"'+$(tds[j]).find("select").find("option:selected").html().trim()+'"'+',';		
								//val=val+'"'+key+'"'+':'+'"'+$(tds[j]).find("select").find("option:selected").attr("otherid")+'"'+',';
								//key="addasitis";
								val=$(tds[j]).find("select").val();
							}
							else
							{
								val=$(tds[j]).find("select").val();
							}*/
							val=$(tds[j]).find("select").val();
						}
						else
						{
						val=$(tds[j]).find("select").val();
						}
					}
					else
					{
					val=$(tds[j]).html().trim();
					}					
					
				}
				/*if(key=="addasitis"){
					rows+=val;
				}
				else
				{*/
				if(j+1==len)
				{
					if(key=="Upload_Document")
					{
						
						rows+='"'+key+'":"'+val+'"';
					}
					else
					{
					rows+='"'+key+'":"'+val+'"';
					}
				}
				else
				{
					if(key=="Upload_Document")
					{
						rows+='"'+key+'":"'+val+'",';
					}
					else{
					rows+='"'+key+'":"'+val+'",';
					}
				}
				//}
								
			}
		if(i+1==trlen)
		{
			jsonval+=rows+"}";
		}
		else
		{
		jsonval+=rows+"},";
		}
	 }
	if(table!=tables.length)
	{	
	formdetails=formdetails+'"'+tablename+'":['+jsonval+']'+",";
	}
	if(table==tables.length)
	{
	formdetails=formdetails+'"'+tablename+'":['+jsonval+']'+"";
	}
	}
 }
  formdetails=formdetails+'"groupname"'+':'+tablenames.substring(0,tablenames.length-1)+"]"+''; 
  return formdetails;
}

function PostForm(label,buttontype,msg,component){
	$("button.btn-primary:visible").attr("disabled","true");
	setTimeout(function(){$("button.btn-primary:visible").removeAttr("disabled");}, 5000);
	
	
	$("#loader").show();
	getsessiontime();
	
	var isvalidate=true;
	var FormDetails="";
 if(buttontype=="saveandnext"||buttontype=="save")
  {
	var allforminputs=$("#AllFields .form input:visible");
	for(var i=0;i<$("#AllFields .form input:visible").length;i++)
	{   	
		if($($("#AllFields .form input:visible")[i]).parents(".group").attr("display")==undefined||$($("#AllFields .form input:visible")[i]).parents(".group").attr("display")!="none")
		{
    	    if($($("#AllFields .form input:visible")[i]).attr("required")!=undefined)
    		{
    		   if($($("#AllFields .form  input:visible")[i]).attr("type")=="radio")
    			{ 			   		
    		    }
    		    else
    			{
    			if($($("#AllFields .form  input:visible")[i]).attr("type")=="text")
    			{
    			if($($("#AllFields .form  input:visible")[i]).val()=="")
    			{
    			isvalidate=false;    			
    			$($("#AllFields .form  input:visible")[i]).addClass("requiredfield");   						   			
    			} 
    		    else
    		    {
    			 $($("#AllFields .form  input:visible")[i]).removeClass("requiredfield");
    		    }
    			}
    			else
    			if($($("#AllFields .form  input:visible")[i]).attr("type")=="checkbox")
    			{
    			if(!$($("#AllFields .form  input:visible")[i]).prop("checked"))
    			{
    			isvalidate=false;    	
    			$($("#AllFields .form  input:visible")[i]).addClass("requiredfield");  
    			$($("#AllFields .form  input:visible")[i]).siblings("label").css("color","red");  						   			
    			} 
    		    else
    		    {
    		     $($("#AllFields .form  input:visible")[i]).siblings("label").css("color","black");  
    			 $($("#AllFields .form  input:visible")[i]).removeClass("requiredfield");
    		    }
    			}
    			else
     		   {
     			if($($("#AllFields .form  input:visible")[i]).val()=="")
        			{
        			isvalidate=false;    			
        			$($("#AllFields .form  input:visible")[i]).addClass("requiredfield"); 						   			
        			}   
     		     }    			
    			}    		      		    
    		}	
		else
		{
			 $($("#AllFields .form  input:visible")[i]).removeClass("requiredfield");
		}
		}
	}
	
	for(var i=0;i<$("#AllFields .form  select:visible").length;i++)
	{   	
		if($($("#AllFields .form select:visible")[i]).hasClass("selectListBox"))
		{}
		else{
		if($($("#AllFields .form select:visible")[i]).parent().parent().is(":visible"))
		{
    	if($($("#AllFields .form  select:visible")[i]).attr("required")!=undefined||$($("#AllFields .form  select:visible")[i]).parent().attr("required")!=undefined)
    		{
    		if($($("#AllFields .form  select:visible")[i]).val()=="0"||$($("#AllFields .form  select:visible")[i]).val()==null)
    			{
    			isvalidate=false;    			
    			$($("#AllFields .form  select:visible")[i]).addClass("requiredfield");  					    			
    			}
    		else
    		{
    			$($("#AllFields .form  select:visible")[i]).removeClass("requiredfield");
    		}
    		}
		}
		else
		{
			$($("#AllFields .form  select:visible")[i]).removeClass("requiredfield");
		}
		} 	
	 }
	for(var i=0;i<$("#AllFields .form input.date:visible").length;i++)
	{   	
		if($($("#AllFields .form input.date:visible")[i]).parent().parent().is(":visible"))
		{
    	    if($($("#AllFields .form input.date:visible")[i]).attr("required")!=undefined||$($("#AllFields .form input.date:visible")[i]).parent().attr("required")!=undefined)
    		{   		   	
    			if($($("#AllFields .form  input.date:visible")[i]).val()!="")
    			{
    				
    			$($("#AllFields .form  input.date:visible")[i]).removeClass("requiredfield");
    					
    			} 
    			
    		    else
    		    {
    			 $($("#AllFields .form  input.date:visible")[i]).addClass("requiredfield");
    		    }    			  	        
    		 }
    	    if($($("#AllFields .form  input.date:visible")[i]).val()!='' && $($("#AllFields .form  input.date:visible")[i]).val()!=undefined )
    		{
    		 var date = checkdateformat($($("#AllFields .form  input.date:visible")[i]).val());
             	if(date=='Invalid Date' || date==undefined)
    			{
    			$($("#AllFields .form  input.date:visible")[i]).css("border-color","red"); 
    			$($("#AllFields .form  input.date:visible")[i]).addClass("invalideFormat"); 
    			isvalidate=false; 
    			}
    		else
    			{
    			$($("#AllFields .form  input.date:visible")[i]).css("border-color",""); 
    			$($("#AllFields .form  input.date:visible")[i]).removeClass("invalideFormat");  
    			}
    		}

	    }
	}
	for(var i=0;i<$("#AllFields .form textarea:visible").length;i++)
	{   	
		if($($("#AllFields .form textarea:visible")[i]).parent().parent().is(":visible"))
		{
    	    if($($("#AllFields .form textarea:visible")[i]).attr("required")!=undefined||$($("#AllFields .form textarea:visible")[i]).parent().attr("required")!=undefined)
    		{   		   	
    			if($($("#AllFields .form textarea:visible")[i]).val()!="")
    			{
    				
    			$($("#AllFields .form textarea:visible")[i]).removeClass("requiredfield");
    					
    			} 
    		    else
    		    {
    			 $($("#AllFields .form teaxtarea:visible")[i]).addClass("requiredfield");
    		    }    			  	        
    		 }
	    }
    	}
	 for(var i=0;i<$("#AllFields .form input[type=file]:visible").length;i++)
	 {   	
		if($($("#AllFields .form input[type=file]:visible")[i]).parent().parent().is(":visible"))
		{
    	    if($($("#AllFields .form input[type=file]:visible")[i]).attr("required")!=undefined||$($("#AllFields .form input[type=file]:visible")[i]).parent().attr("required")!=undefined)
    		{   		   	
    			if($($("#AllFields .form input[type=file]:visible")[i]).val()!=""||$($("#AllFields .form input[type=file]:visible")[i]).val()!="0")
    			{
    				
    			$($("#AllFields .form input[type=file]:visible")[i]).removeClass("requiredfield");
    					
    			} 
    		    else
    		    {
    			 $($("#AllFields .form input[type=file]:visible")[i]).addClass("requiredfield");
    		    }    			  	        
    		 }
	    }
    	}
	    for(var i=0;i<$("#AllFields .form input[type=email]:visible").length;i++)
		{   
	    	if($($("#AllFields .form input[type=email]:visible")[i]).parent().parent().is(":visible")){
	    	if($($("#AllFields .form input[type=email]:visible")[i]).attr("required")!=undefined||$($("#AllFields .form input[type=email]:visible")[i]).parent().attr("required")!=undefined)
    		{
	    	var emaildata=$("#AllFields .form input[type=email]:visible")[i];
	    	
	    	if($(emaildata).val()!=""){
		    	 var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
		 	    if (!filter.test($(emaildata).val())) {	 	    	
		 	    	$(emaildata).addClass("requiredfield");	 	        
		 	    }
		 	   else
		    	{
		 		  $(emaildata).removeClass("requiredfield");
		    	}
		    	}
    		}	
	      }
		}
	    for(var i=0;i<$("#AllFields .form input:visible").length;i++)
		{   
	    	
	    	if($($("#AllFields .form input:visible")[i]).attr("condition")!="null")
    		{
	    		$($("#AllFields .form input:visible")[i]).blur();
    		}
	   	
		}
	    for(var i=0;i<$("#AllFields .form select:visible").length;i++)
		{   
	    	if($($("#AllFields .form select:visible")[i]).attr("condition")!="null")
    		{
	    		$($("#AllFields .form select:visible")[i]).blur()
    		}
	   	
		}
	    for(var i=0;i<$(".requiredradio:visible").length;i++)
		{  
	    if($($(".requiredradio:visible")[i]).parent().find("input[type=radio]:checked").length==0)
	    {
	    	$($(".requiredradio:visible")[i]).parent().find("label:first").css("color","red");
	    	isvalidate=false;
	    	$('html, body').animate({
		        scrollTop:$(".requiredradio:visible:first").offset().top-200
		    }, 1000);
	    	showsticky("Please correct fields marked red","");
	    }
	    else
	    {
	    	$($(".requiredradio:visible")[i]).parent().find("label:first").css("color","black");
	    }
		}
	    
	    for(var i=0;i<$(".radiowithyesnodiv:visible").length;i++)
		{  
	    if($($(".radiowithyesnodiv:visible")[i]).find("input[type=radio]:checked").length==0)
	    {
	    	$($(".radiowithyesnodiv:visible")[i]).find("label:first").css("color","red");    	
	    	isvalidate=false;
	    	$('html, body').animate({
		        scrollTop:$(".radiowithyesnodiv:visible:first").offset().top-200
		    }, 1000);
	    	showsticky("Please correct fields marked red","");
	    }
	    else
	    {
	    	$($(".radiowithyesnodiv:visible")[i]).find("label:first").css("color","black");
	    }
		}
	if(($("#AllFields .form .requiredfield:visible").length>0)&&isvalidate){
		isvalidate=false;
		}
	else if(($("#AllFields .form .notproceedfurther:visible").length>0)&&isvalidate){
		isvalidate=false;
		}
	else if(($("#AllFields .form .requiredfielderror:visible").length>0)&&isvalidate){
		isvalidate=false;
		}
	else if(($("#AllFields .form .requiredfielderrorlength:visible").length>0)&&isvalidate){
		isvalidate=false;
		}
    if(($("#hascaptcha").val()=="true"))
	{
		if(($("#Captcha").val()!=$("#captchacode").val()))
		{
			isvalidate=false;			
			$("#Captcha").addClass("requiredfield");						
		}
		else
		{
			$("#Captcha").removeClass("requiredfield");	
		}
	}
   }
	if(!isvalidate)
		{ 
		if($("#AllFields .form .requiredfield:visible:first").length>0){
		 $('html, body').animate({
		        scrollTop: $("#AllFields div .requiredfield:visible:first").offset().top-200
		    }, 1000);
		 showsticky("Please correct fields marked red","");
		 generatecaptcha();
		}
		else if($("#AllFields .form .requiredfielderror:visible:first").length>0){
			
			 $('html, body').animate({
			        scrollTop: $("#AllFields div .requiredfielderror:visible:first").offset().top-200
			    }, 1000);
			 showsticky("Please correct fields marked red","");
			}
		else if($("#AllFields .form .invalideFormat:visible:first").length>0){
			 $('html, body').animate({
			        scrollTop: $("#AllFields div .invalideFormat:visible:first").offset().top-200
			    }, 1000);
			 showsticky("Please correct fields marked red","");
			}
		else 
			if($("#AllFields .form .requiredfielderrorlength:visible:first").length>0){
			
			 $('html, body').animate({
			        scrollTop: $("#AllFields div .requiredfielderrorlength:visible:first").offset().top-200
			    }, 1000);
			 showsticky("Please correct fields marked red","");
			}		
		else
		{
			if($("#AllFields .form .notproceedfurther:visible:first").length>0){
			
				 $('html, body').animate({
				        scrollTop: $("#AllFields div .notproceedfurther:visible:first").offset().top-200
				    }, 1000);
				 showsticky("Please correct fields marked red","");
				}
		}		
		$("#loader").hide();
		$("button.btn-primary:visible").removeAttr("disabled");
		return false;		
     }	   
	if(isvalidate)
	{
	
	for(var i=0;i<$("#AllFields .form  div input:visible").length;i++)
	{		
		if($($("#AllFields .form  div input:visible")[i]).attr("name")!=undefined){
			if($($("#AllFields .form  div input:visible")[i]).attr("type")=="checkbox")
			{
				if($($("#AllFields .form  div input:visible")[i]).parent("div").is(":visible"))
    			{
				if($($("#AllFields .form  div input:visible")[i]).is(':checked'))
				{
					if($($("#AllFields .form div input:visible")[i]).parent().parent().is(":visible"))
					{
					var name=$($("#AllFields .form  div input:visible")[i]).siblings("label").attr("displayname");
					FormDetails=FormDetails+'"'+name+'"'+':'+'"'+"1"+'"'+',';
					}
				}
				else
				{
					if($($("#AllFields .form div input:visible")[i]).parent().parent().is(":visible"))
					{
					var name=$($("#AllFields .form  div input:visible")[i]).siblings("label").attr("displayname");
					FormDetails=FormDetails+'"'+name+'"'+':'+'"'+"0"+'"'+',';
					}
				}
    			}
				else{
					if($($("#AllFields .form div input:visible")[i]).parent().parent().is(":visible"))
					{
					var name=$($("#AllFields .form  div input")[i]).siblings("label").attr("displayname");
					FormDetails=FormDetails+'"'+name+'"'+':'+'"'+"0"+'"'+',';
					}
				}
		    }
		    else
		    {
		    	if($($("#AllFields .form  div input:visible")[i]).hasClass("captcha"))
		    	{
		    	}
		    	else
		    	{
		    		if($($("#AllFields .form  div input:visible")[i]).attr("type")=="radio")
		        	{		    			
		    			
		        	}
		    		else
		    		{
		    			if($($("#AllFields .form  div input:visible")[i]).parent("div").is(":visible"))
		    			{
		    				if($($("#AllFields .form  div input:visible")[i]).hasClass("month"))
		    				{	
		    					if($($("#AllFields .form div input:visible")[i]).parent().parent().is(":visible"))
						     	{	    					
		    					 var name=$($("#AllFields .form  div input:visible")[i]).parent().find("label:first").attr("displayname");
						      	 var val=getmonth($($("#AllFields .form  div input:visible")[i]).val());
						         FormDetails=FormDetails+'"'+name+'"'+':'+'"'+val+'"'+',';
							   }
		    				}
		    				else
		    				{
		    				    if($($("#AllFields .form  div input:visible")[i]).hasClass("masktext"))
		    				    {	
		    				    	if($($("#AllFields .form div input:visible")[i]).parent().parent().is(":visible"))
		    						{
		    				     	 var name=$($("#AllFields .form  div input:visible")[i]).parent().siblings("label").attr("displayname");
						        	 var val=$($("#AllFields .form  div input:visible")[i]).siblings("span.maskval").html()+$($("#AllFields .form  div input")[i]).val();
						             FormDetails=FormDetails+'"'+name+'"'+':'+'"'+val+'"'+',';
		    						}
		    				    }
		    		             else
		    		            {	
		    		            	 if($($("#AllFields .form div input:visible")[i]).parent().parent().is(":visible"))
		    						{
				                      var name=$($("#AllFields .form  div input:visible")[i]).siblings("label").attr("displayname");
				      	              var val=$($("#AllFields .form  div input:visible")[i]).val();
				      	              if(name!="undefined"&&name!=undefined)
				                      FormDetails=FormDetails+'"'+name+'"'+':'+'"'+val+'"'+',';	
		    						}
		    			        }
		    				}
		    		    } 
		    			else
		    			{
		    			  if($($("#AllFields .form  div input:visible")[i]).hasClass("uploadtablefile"))
		    			  {		    
		    				  if($($("#AllFields .form div input:visible")[i]).parent().parent().is(":visible"))
		  					   {
		    					 var name=$($("#AllFields .form  div input:visible")[i]).parent().siblings("label").attr("displayname");
		    					 //var val=$($("#AllFields .form  div input:visible")[i]).parent().find("input[type=hidden]").val();
		    					 var val=$($("#AllFields .form  div input:visible")[i]).parent().find("#doc_id").val();
						         FormDetails=FormDetails+'"'+name+'"'+':'+'"'+val+'"'+',';
		  					   }
		    				 }
		    				else
		    				{
		    				if($($("#AllFields .form  div input:visible")[i]).parent().parent().is(":visible"))
		    				{
		    					
		    				     var name=$($("#AllFields .form  div input:visible")[i]).siblings("label").attr("displayname");
					      	     var val="0";
					      	     if(name!="undefined"&&name!=undefined)
					             FormDetails=FormDetails+'"'+name+'"'+':'+'"'+val+'"'+',';
		    					
		    				}
		    				}
		 		    		
		    			}
		    		}
		    	}
			  }
		}				 
	}
	var alltextarea=$("#AllFields .form  textarea:visible");
	for(var i=0;i<alltextarea.length;i++)
	{		
			 var name=$(alltextarea[i]).siblings("label").attr("displayname");
			 var val=$(alltextarea[i]).val();
	      	 FormDetails=FormDetails+'"'+name+'"'+':'+'"'+val+'"'+',';
	}
	var radiowithyesno=$("#AllFields .form  label.radiowithyesno:visible");
	
	for(var i=0;i<radiowithyesno.length;i++)
	{		
			 var name=$(radiowithyesno[i]).attr("displayname");
			 var val='N';
			 if($(radiowithyesno[i]).siblings(".radiowithyesno-YES").prop("checked"))
			 {
				 if($(radiowithyesno[i]).siblings(".radiowithyesno-YES:visible").length>0)
					 {
					 val='Y'
					 }
				
			 }
	      	 FormDetails=FormDetails+'"'+name+'"'+':'+'"'+val+'"'+',';

	}
	var radioclass=$("#AllFields .form  div.radiodiv:visible");
	for(var i=0;i<radioclass.length;i++)
	{		  
		var val="0";
		var name=$(radioclass[i]).find("label:first").attr("displayname");
		if($(radioclass[i]).find("input[type=radio]:checked").length>0)
		{
			val=$(radioclass[i]).find("input[type=radio]:checked").val();
		}
		FormDetails=FormDetails+'"'+name+'"'+':'+'"'+val+'"'+',';		
	}
	var allcameraval=$("#AllFields .form  .camera:visible");
	for(var i=0;i<allcameraval.length;i++)
	{		
			 var name=$(allcameraval[i]).find("label").attr("displayname");
			 var val=$(allcameraval[i]).find("#my_camera_val").val();
	      	 FormDetails=FormDetails+'"'+name+'"'+':'+'"'+val+'"'+',';
	}
	var allMultipleFileUpload=$("#AllFields .form  .MultifileUpload:visible");
	for(var i=0;i<allMultipleFileUpload.length;i++)
	{		
			 var name=$(allMultipleFileUpload[i]).find("label").attr("displayname");
			 var id= $($(allMultipleFileUpload[i]).find("label")).parent("div").attr("id")
			 var val=window[id+'idss']
	      	 FormDetails=FormDetails+'"'+name+'"'+':'+'"'+val+'"'+',';
	}
	var allTextEditor=$("#AllFields .form  .TextEditor:visible");
	for(var i=0;i<allTextEditor.length;i++)
	
	{		
			
			var name=$(allTextEditor[i]).find("label").attr("displayname");
			var val1=$($(allTextEditor[i]).find("#docid")).val();
		
				var id_=$(allTextEditor[i]).attr("id");
			    var val2=$("#"+id_+"editor2").val().replace(/\n/g, "").replace(/"/g, "'");
			    val2=val2.replace(/'/g, "\\'");
			
			FormDetails=FormDetails+'"'+name+'"'+':'+'["'+val1+'",'+'"'+val2+'"]'+',';// docid and editor html both

			
	}

	var allselects=$("#AllFields .form  div select.singleselect:visible");
	for(var i=0;i<allselects.length;i++)
	{
	 if($(allselects[i]).parent("div").is(":visible"))
	 {	
		var name=$(allselects[i]).siblings("label").attr("displayname");
		var val=$(allselects[i]).val();
	    if(val==null||val=="")
		{
		val="0";
		}
	    FormDetails=FormDetails+'"'+name+'"'+':'+'"'+val+'"'+',';
	  }
	else
	{
		var name=$(allselects[i]).siblings("label").attr("displayname");
		FormDetails=FormDetails+'"'+name+'"'+':'+'"'+'0'+'"'+',';
	}
	}
	
	var allselectswithother=$("#AllFields .form  div select.selectwithother:visible");
	for(var i=0;i<allselectswithother.length;i++)
	{
	 if($(allselectswithother[i]).parent("div").is(":visible"))
	 {	
		var name=$(allselectswithother[i]).siblings("label").attr("displayname");
		var val=$(allselectswithother[i]).val();
		/*if(val=="selectwithothervalue")
		{
			val=$(allselectswithother[i]).find("option:selected").attr("otherid");
			FormDetails=FormDetails+'"'+name+'"'+':'+'"'+val+'"'+',';
			FormDetails=FormDetails+'"'+"OTHER"+name+'"'+':'+'"'+$(allselectswithother[i]).find("option:selected").html().trim()+'"'+',';
		}
		else
		{*/
	    if(val==null||val=="")
		{
		val="0";
		}
	    FormDetails=FormDetails+'"'+name+'"'+':'+'"'+val+'"'+',';		   
	  }	
	}
	
	var allmultiselects=$("#AllFields .form  div select.multiselect:visible");
	for(var i=0;i<allmultiselects.length;i++)
	{		
	 var val="0";
	  var name=$(allmultiselects[i]).siblings("label").attr("displayname");
	  if($(allmultiselects[i]).parent("div").is(":visible"))
	  {
		 val=$(allmultiselects[i]).val();		
	    if(val==null||val=="")
		{
		val="0";
		}
	    else
	    {
	    	while(val.toString().indexOf(",")>-1)
	    	val=val.toString().replace(",","-");	    	
	    }
	  }	  
	  FormDetails=FormDetails+'"'+name+'"'+':'+'"'+val+'"'+',';   
	}
	FormDetails=FormDetails+listboxdata();
	if($("#AllFields .edittable:visible").length>0)
	{
		  var validatetable="0";
		  if(buttontype=="saveandnext"||buttontype=="save")
			{
			  validatetable="1";
			}
        	FormDetails=FormDetails+",";
            var tabledata=Posttable(FormDetails.substring(0,FormDetails.length-1),validatetable);
            if(tabledata){
             if(tabledata!="")
             {
            	FormDetails=tabledata+",";
             }
             }
             else
             {
                	isvalidate=false;
             }		 
                                        
        	
	}
	if(isvalidate)
	{
	var actionid=$("#formupdateid").val();
	var action=$("#formaction").val();
	
	if(component=="confirm")
	{
	$("#confirmpopupdiv").show();	
	$(".cancelconfirmpopup").css("background","rgb(37, 61, 82)");	
	$("#confirmpopupdiv p.msg").html(msg.replace(/\\n/g,"\n"));
	 postFormDetails=FormDetails;
	 postlabel=label;
	 postbuttontype=buttontype;
	 postactionid=actionid;
	 postaction=action;		
	}
	else if(component=="geneartereport")
	{
		$("#loader").show();    
		var filters='{'+FormDetails.substring(0,FormDetails.length-1)+'}';
		GenerateReport(filters);
	}
	else if(component=="pdf")
	{
		var sessionurl="GeneratePDf";
		var url="/";
		$.ajax({
	          type: "get",
	          url: url+sessionurl,
	          data: {pdfid:msg,update_id:$("#formupdateid").val()},	          
	          async: false,
	          success: function (data) {
	        	 FormDetails=FormDetails+'"pdf"'+':'+'"'+data.split("-")[0]+'"'+',';   
	        	 postdatatoserver(FormDetails,label,buttontype,actionid,action);	
	    		
	          },
	          error: function (e) {	
	          }
	      });
	}
	else if(component=="pdfbuttondownload")
	{
		var sessionurl="GeneratePDf";
		var url="/";
		$.ajax({
	          type: "get",
	          url: url+sessionurl,
	          data: {pdfid:msg,update_id:$("#formupdateid").val()},	          
	          async: false,
	          success: function (data) {
		        	 if(data=="0"||data==undefined||data=="undefined"||data=="")
					 {
							 showsticky("Something went wrong.\n please try again or contact helpsedk","");
					 }
		        	  else
		        	  {
		        	  pdfdata=data;       	 
		        	  FormDetails=FormDetails+'"pdf"'+':'+'"'+data.split("-")[0]+'"'+',';   
		        	  postdatatoserver(FormDetails,label,buttontype,actionid,action);
		        	  }
		    		
		          },
	          error: function (e) {	
	          }
	      });
	}
	else
	{
		postdatatoserver(FormDetails,label,buttontype,actionid,action);	
		
	}
	}
}
}
var pdfdata;
function GenerateReport(filters)
{
	
	var gettabledatainjson="";
	gettabledatainjson="{"+gettabledatainjson;
	gettabledatainjson=gettabledatainjson+'"table_ID"'+':'+'"'+$("#tableid").val()+'"'+',';
	gettabledatainjson=gettabledatainjson+'"FormName"'+':'+'"'+$("#FormName").val()+'"'+',';
	gettabledatainjson=gettabledatainjson+'"filters"'+':'+filters+',';	
	gettabledatainjson=gettabledatainjson+'"formupdateid"'+':'+'"'+$("#formupdateid").val()+'"'+'}';
	reportajaxjson("example2",gettabledatainjson,true,true);	
}
$("#reportorientation").change(function(){
	
	gettabledatainjson();
});
function gettabledatainjson()
{   
	$("#loader").show();
    var gettabledatainjson;
	gettabledatainjson='{"table_ID"'+':'+'"'+$("#tableid").val()+'"'+',';
	gettabledatainjson=gettabledatainjson+'"FormName"'+':'+'"'+$("#FormName").val()+'"'+',';
	gettabledatainjson=gettabledatainjson+'"formupdateid"'+':'+'"'+$("#formupdateid").val()+'"}';	
	reportajaxjson("example2",gettabledatainjson,false,true);	
}
function reportajaxjson(tableid,dataval,reload,isdatatable)
{
	
	var sessionurl="gettablestructuredata";
	var url="/";
	$.ajax({
        type: "get",
        data: {tabledata: dataval.trim()},
        url: url+sessionurl,
		dataType: 'JSON',
        success: function (data) {
       
        if(isdatatable){
        if(reload)
        {         
        	$("#"+tableid).dataTable().fnDestroy();        	
        }
        }
        if(data.hasval=="true")
        {
        var imagecolid="0";
        var hasid=false;       
        var cols="";
        for(var i=0;i<data.cols.length;i++)
        {       	
          if(data.cols[i]=="id")
          {
        	  hasid=true;        	  
          }
         else
         {
          if(data.cols[i].split("_").length>1)
           {       	  
        	  if(data.cols[i].split("_")[0]=="image")
        		  {
        		  imagecolid=i;
        		  cols+="<th>"+data.cols[i].split("_")[1]+"</th>";
        		  }
        	  else
        		  {
        		  cols+="<th>"+data.cols[i]+"</th>";
        		  }
           }
            else
             {
             cols+="<th>"+data.cols[i]+"</th>";
            }
         }
        }
         $("#"+tableid+" thead").html("<tr>"+cols+"</tr>");     
        var rows="";
        for(var i=0;i<data.rows.length;i++)
        {
			var rowcolor="";
        	rows+="<tr>";
        	var rowstrt=0;
        	if(hasid)
    		{
        		rowstrt=1;
    		}
        	for(var j=rowstrt;j<data.rows[i].length;j++)
            {
        		if(hasid)           
        	 {
        		url="/";
           
			var sendtoform=window.location.pathname.split("/")[1]+"/"+window.location.pathname.split("/")[2]+"/";  
			var text = data.rows[i][j];
			var isColor;
			if(text!=null&&  text!='' && text!="null") 
			isColor = text.substring(0, 3);
			var color ='';
			if (isColor =='#%_') 
			
			   {
				if(text.substring(3,10)!=null&& text.substring(3,10)!='' && text.substring(3,10)!="null")
					
					rowcolor = text.substring(3, 10);
				if(text.substring(10,text.length)!=null&& text.substring(10,text.length)!='' && text.substring(10,text.length)!="null")
				{
					var value=text.substring(10,text.length);
					rows+="<td bgcolor='" +rowcolor+ "'><a style='font-weight: normal;' href="+url+sendtoform+data.rows[i][0]+">"+value+"</a></td>";
				}   
				
				}
			else if (isColor =='##_') 
			   {
				if(text.substring(3,10)!=null&& text.substring(3,10)!='' && text.substring(3,10)!="null")// check whether the substring is null
					color = text.substring(3, 10);
				if(text.substring(10,text.length)!=null&& text.substring(10,text.length)!='' && text.substring(10,text.length)!="null")
					{
						var value=text.substring(10,text.length);
						rows+="<td bgcolor='" +color+ "'><a style='font-weight: normal;' href="+url+sendtoform+data.rows[i][0]+">"+value+"</a></td>";
					}   
				
				}
				else
				{
					if (rowcolor!=null&& rowcolor!='' && rowcolor!="null")
					rows+="<td bgcolor='" +rowcolor+ "'><a style='font-weight: normal;' href="+url+sendtoform+data.rows[i][0]+">"+data.rows[i][j]+"</a></td>";
					else
					rows+="<td><a style='font-weight: normal;' href="+url+sendtoform+data.rows[i][0]+">"+data.rows[i][j]+"</a></td>";
				}
			 }
				
        		else
        	 {
        		 if(imagecolid!="0"&&imagecolid==j) 			
        		 {
        			
        			 rows+="<td><img width=100px height=100px src='data:image/jpg;base64,"+data.rows[i][j]+"'/></td>";  
        			 
        		 }
        		 /*else if(pagecolid!="0"&&pagecolid==j)        				
        		 {
        			
        		 }*/
        		 else 
        		 {
	
					var text = data.rows[i][j];
					if(text!=null&&  text!='' && text!="null")
					isColor = text.substring(0, 3);
					var color ='';
					if (isColor =='#%_') 
					   {
						if(text.substring(3,10)!=null&& text.substring(3,10)!='' && text.substring(3,10)!="null")
						
						rowcolor = text.substring(3, 10);//get color
						if(text.substring(10,text.length)!=null&& text.substring(10,text.length)!='' && text.substring(10,text.length)!="null")
						{
						var value=text.substring(10,text.length);
						rows+="<td bgcolor='" +rowcolor+ "'>"+value+"</td>"; 
						}
						
						}
						else if (isColor =='##_') 
					   {
						if(text.substring(3,10)!=null&& text.substring(3,10)!='' && text.substring(3,10)!="null")
						color = text.substring(3, 10);
						if(text.substring(10,text.length)!=null&& text.substring(10,text.length)!='' && text.substring(10,text.length)!="null")
						{
						var value=text.substring(10,text.length);
						rows+="<td bgcolor='" +color+ "'>"+value+"</td>"; 
						}
						
						}
						else
						{
						if (rowcolor!=null&& rowcolor!='' && rowcolor!="null")
						rows+="<td bgcolor='" +rowcolor+ "'>"+data.rows[i][j]+"</td>";
						else						
						rows+="<td>"+data.rows[i][j]+"</td>";
						}
					 }
								
		        	 }
        		  
        		}
             
        	rows+="</tr>";
        }           
        $("#"+tableid+" tbody").html(rows);
        if(isdatatable){
        if(reload)
        { 
        	$("#loader").hide();        	 
        	
        	getfiletered()
        }
        else
        {
        	
        	getfiletered()
        	 $("#loader").hide();  
        }
        }
        else
        {
        	$("#loader").hide();  
        }
        }
        else
        {
        	showalert("No Record Found","");
        }
       $("#loader").hide();     
       },
        error: function (e) {	
        	 $("#loader").hide();   
        }
    });
}


function getcomponenttabledata()
{		
	var allcomponenttables=$(".componenttable");
	for(var i=0;i<allcomponenttables.length;i++)
	{    
		var gettabledatainjson;
		gettabledatainjson='{"table_ID"'+':'+'"'+$(allcomponenttables[i]).attr("value")+'"'+',';
		gettabledatainjson=gettabledatainjson+'"FormName"'+':'+'"'+$("#FormName").val()+'"'+',';
		gettabledatainjson=gettabledatainjson+'"formupdateid"'+':'+'"'+$("#formupdateid").val()+'"}';	
		reportajaxjson($(allcomponenttables[i]).attr("id"),gettabledatainjson,false,true);	
	}	
}
/*
function adddatatablestructure()
{
	if(tablecolwidth!=undefined)
    {
		console.log(JSON.parse(tablecolwidth));
		var tablecoljsonwidth=JSON.parse(tablecolwidth);
    	var reportorientation=$("#reportorientation").val();
    	if(reportorientation=="landscape")
    	{
    		
    		$('#example2').DataTable( {
    	    "aaSorting":[],
    	    dom: 'lBfrtip',
    	    //autoWidth:         true, 
    	    paging:         true, 
    	    columnDefs: tablecoljsonwidth,
    	    destroy: true,
    	    buttons: [{
    	    	extend : 'excel',
    	    	 title : function() {
    	    		 var filters="";
    	             if($("button.btn-primary:visible").html().indexOf("Generate Report")>-1)
    	             {
    	             	var divs=$(".group div");
    	             	for(var i=0;i<divs.length;i++)
    	             	{
    	             		
    	             		if($($(divs[i]).find("label:first")).html()!="undefined"&&$($(divs[i]).find("label:first")).html()!=undefined){
    	             			filters+=$($(divs[i]).find("label:first")).html();
	    	             		if($(divs[i]).find("input[type=text]").length>0)
	    	             		{
	    	             			filters+=" : "+$($(divs[i]).find("input")).val().trim()+"\n";
	    	             		}
	    	             		if($(divs[i]).find("select").length>0)
	    	             		{
	    	             			filters+=" : "+$($(divs[i]).find("select option:selected")).text().trim()+"\n";
	    	    	             	
	    	             		}
	    	             		if($(divs[i]).find("input[type=checkbox]").length>0)
	    	             		{

		                			filters+=" : "+$($(divs[i]).find("input[type=checkbox]:checked")).length+"\n";
	    	             			//filters+=$($(divs[i]).find("input[type=checkbox]")).prop("checked").trim()+"\n";
	    	             		}
    	             		}
    	             	}
    	            // }
    	             return $("#FormDisplayName").val()+" :   "+filters;
    	         },
    	         text : '<i class="fa fa-file-excel-o"> Export Excel</i>'
    	        },
    	        {
    	        	extend : 'pdfHtml5',             
    	            title : function() {
    	                return $("#FormDisplayName").val();
    	            },            
    	            pageSize : 'Legal',          
    	            orientation : 'landscape',
    	            text : '<i class="fa fa-file-pdf-o"> Export PDF</i>',
    	            titleAttr : 'PDF',
    	            customize : function(doc) { 
    	            	doc.pageMargins = [20, 40, 20,40 ];
    	            	doc.defaultStyle.alignment='center';
    	            	doc.defaultStyle.fontSize=11;
    	            	doc.content[1].table.dontBreakRows = true; 
    	            	var tableth=$("#example2 thead").find("th").length;
    	            	var widthjsonarr=[];
    	            	for(var i=0;i<tablecoljsonwidth.length;i++)
    	            	{
    	            		widthjsonarr[i]=tablecoljsonwidth[i].width;
    	            		
    	            	}
    	            	var allrows=$("#example2").find("tr");	            		            	
    	            	
    	            	for(var rows=0;rows<allrows.length;rows++)
    	            	{
    	            	   var rowdata=$(allrows[rows]).find("td");
    	            	   
    	            	   for(var tds=0;tds<rowdata.length;tds++)
    		            	{
    	            		   if($(rowdata[tds]).find("img").length>0)
    	            		    {	  
    	            			   var rowdataval=doc.content[1].table.body[rows];
    	            			   doc.content[1].table.body[rows].splice(tds,1);	            			  
    	            			   var rowdatavals=[];	            			  
    	            			   var docrows=0;
    	            			   var docrowsval=0;
    	            			   while(docrows<rowdataval.length+1)
    	   		            	   {
    	            				   if(docrows==tds)
    	            					   {
    	            					   rowdatavals.push({image:$(rowdata[tds]).find("img").attr("src"),width:50});  
    	            					   docrows=docrows+1;
    	            					   }
    	            				   else
    	            					   {
    	            					   rowdatavals.push(rowdataval[docrowsval]);  
    	            					   docrows=docrows+1;
    	            					   docrowsval=docrowsval+1;
    	            					   }
    	   		            	   }
    	            			   doc.content[1].table.body[rows]=rowdatavals;
                                   	            				  
    	            			 }	            			  	            			   
    	            		    
    		            	}
    	            	   
    	            	}            	
    	                doc.content[1].table.widths =widthjsonarr;  
    	                var text="CENTRAL EXAMINATION ORGANISATION, OFFICE OF THE DIRECTOR GENERAL OF CIVIL AVIATION, RK PURAM,New Delhi\n";
    	                var filters="";
    	                if($("button.btn-primary:visible").html().indexOf("Generate Report")>-1)
    	                {
    	                	var divs=$(".group div");
    	                	for(var i=0;i<divs.length;i++)
    	                	{
    	                		if(filters=="")
    	                		{
    	                		//filters+="Fitered Parameters:\n"
    	                		}
    	                		if($($(divs[i]).find("label:first")).html()!="undefined"&&$($(divs[i]).find("label:first")).html()!=undefined){
    	                			filters+=$($(divs[i]).find("label:first")).html();
    	    	             		if($(divs[i]).find("input[type=text]").length>0)
    	    	             		{
    	    	             			filters+=" : "+$($(divs[i]).find("input")).val().trim()+"\n";
    	    	             		}
    	    	             		if($(divs[i]).find("select").length>0)
    	    	             		{
    	    	             			filters+=" : "+$($(divs[i]).find("select option:selected")).text().trim()+"\n";
    	    	    	             	
    	    	             		}
    	    	             		if($(divs[i]).find("input[type=checkbox]").length>0)
    	    	             		{

    		                			filters+=" : "+$($(divs[i]).find("input[type=checkbox]:checked")).length+"\n";
    	    	             			//filters+=$($(divs[i]).find("input[type=checkbox]")).prop("checked").trim()+"\n";
    	    	             		}
    	                		
    	                		}
    	                	//}
    	                }
    	                	
    	                var d = new Date();
    	                var month = d.getMonth()+1;
    	                var day = d.getDate();
    	                var output = d.toString().substring(0,d.toString().indexOf("GMT"))+"";
    	                if($("#PostType").val()=="AME1")
    	                {
    	                doc['footer']=(function(page, pages) {
    	                    return {
    	                        columns: [
    	                        	//output.substring(0,output.indexOf("GMT")),
    	                        	{	                               
    	                                alignment: 'left',
    	                                text: output
    	                            }
    	                        	,
    	                            {	                               
    	                                alignment: 'center',
    	                                text:  filters.replace(/\n/g,"    "),
    	                                bold: true
    	                            }
    	                        	,
    	                            
    	                            {	                               
    	                                alignment: 'right',
    	                                text: ['page ', { text: page.toString() },  ' of ', { text: pages.toString()+"  "+$("#FormDisplayName").val() }]
    	                            }
    	                        ],
    	                        margin: [20,0,10,10]
    	                    }
    	                });
    	                }
    	                else
    	                {
    	                	doc['footer']=(function(page, pages) {
        	                    return {
        	                        columns: [
        	                        	//output.substring(0,output.indexOf("GMT")),
        	                        	{	                               
        	                                alignment: 'left',
        	                                text: output
        	                            }
        	                        	,
        	                            
        	                            {	                               
        	                                alignment: 'right',
        	                                text: ['page ', { text: page.toString() },  ' of ', { text: pages.toString() }]
        	                            }
        	                        ],
        	                        margin: [20,0,10,10]
        	                    }
        	                });
    	                }
    	                doc.content.splice(0, 1, {
    	                    text: [
    	                    {
    	                      text: text,
    	                      bold: true,
    	                      fontSize: 10,
    	                      color:'#13789b'
    	                    },
    	                    {
    	                        text:$("#FormDisplayName").val()+"\n",
    	                        bold: true,
    	                        fontSize: 18,
    	                        underline:true,
    	                        alignment:'center',
    	                        color:'#2f687c'
    	                      }
    	                    ,
    	                    {
    	                        text: filters,
    	                        bold: true,
    	                        fontSize: 12,
    	                        alignment:'left'
    	                      }
    	                    
    	                    ],
    	                    margin: [0, 0, 0, 12],
    	                    alignment: 'center'
    	                  });
    	            }
    	            
    	        }
    	    ]
    	} );}
    	else{$('#example2').DataTable( {
    	    "aaSorting":[],
    	    dom: 'lBfrtip',
    	   // autoWidth:         true, 
    	    paging:         true, 
    	    columnDefs: tablecoljsonwidth,
    	    destroy: true,
    	    buttons: [{
    	    	extend : 'excel',
    	    	 title : function() {
    	    		 var filters="";
    	             if($("button.btn-primary:visible").html().indexOf("Generate Report")>-1)
    	             {
    	             	var divs=$(".group div");
    	             	for(var i=0;i<divs.length;i++)
    	             	{
    	             		
    	             		if($($(divs[i]).find("label:first")).html()!="undefined"&&$($(divs[i]).find("label:first")).html()!=undefined){
    	             			filters+=$($(divs[i]).find("label:first")).html();
	    	             		if($(divs[i]).find("input[type=text]").length>0)
	    	             		{
	    	             			filters+=" : "+$($(divs[i]).find("input")).val().trim()+"\n";
	    	             		}
	    	             		if($(divs[i]).find("select").length>0)
	    	             		{
	    	             			filters+=" : "+$($(divs[i]).find("select option:selected")).text().trim()+"\n";
	    	    	             	
	    	             		}
	    	             		if($(divs[i]).find("input[type=checkbox]").length>0)
	    	             		{

		                			filters+=" : "+$($(divs[i]).find("input[type=checkbox]:checked")).length+"\n";
	    	             			//filters+=$($(divs[i]).find("input[type=checkbox]")).prop("checked").trim()+"\n";
	    	             		}
    	             		}
    	             	}
    	            // }
    	             return $("#FormDisplayName").val()+" :   "+filters;
    	         },
    	         text : '<i class="fa fa-file-excel-o"> Export Excel</i>'
    	        },
    	        {
    	        	extend : 'pdfHtml5',             
    	            title : function() {
    	                return $("#FormDisplayName").val();
    	            },            
    	            pageSize : 'Legal',          
    	            orientation : 'portrait',              
    	            text : '<i class="fa fa-file-pdf-o"> Export PDF</i>',
    	            titleAttr : 'PDF',
    	            customize : function(doc) { 
    	            	doc.pageMargins = [20, 40, 20,40 ];
    	            	doc.defaultStyle.alignment='center';
    	            	doc.defaultStyle.fontSize=11;
    	            	doc.content[1].table.dontBreakRows = true; 
    	            	var tableth=$("#example2 thead").find("th").length;
    	            	var widthjsonarr=[];
    	            	for(var i=0;i<tablecoljsonwidth.length;i++)
    	            	{
    	            		widthjsonarr[i]=tablecoljsonwidth[i].width;
    	            		
    	            	}

    	            	var allrows=$("#example2").find("tr");	            		            	
    	            	
    	            	for(var rows=0;rows<allrows.length;rows++)
    	            	{
    	            	   var rowdata=$(allrows[rows]).find("td");
    	            	   
    	            	   for(var tds=0;tds<rowdata.length;tds++)
    		            	{
    	            		   if($(rowdata[tds]).find("img").length>0)
    	            		    {	  
    	            			   var rowdataval=doc.content[1].table.body[rows];
    	            			   doc.content[1].table.body[rows].splice(tds,1);	            			  
    	            			   var rowdatavals=[];	            			  
    	            			   var docrows=0;
    	            			   var docrowsval=0;
    	            			   while(docrows<rowdataval.length+1)
    	   		            	   {
    	            				   if(docrows==tds)
    	            					   {
    	            					   rowdatavals.push({image:$(rowdata[tds]).find("img").attr("src"),width:50});  
    	            					   docrows=docrows+1;
    	            					   }
    	            				   else
    	            					   {
    	            					   rowdatavals.push(rowdataval[docrowsval]);  
    	            					   docrows=docrows+1;
    	            					   docrowsval=docrowsval+1;
    	            					   }
    	   		            	   }
    	            			   doc.content[1].table.body[rows]=rowdatavals;
                                   	            				  
    	            			 }	            			  	            			   
    	            		    
    		            	}
    	            	   
    	            	}            	
    	                doc.content[1].table.widths =widthjsonarr;  
    	                var text="CENTRAL EXAMINATION ORGANISATION, OFFICE OF THE DIRECTOR GENERAL OF CIVIL AVIATION, RK PURAM,New Delhi\n";
    		            var filters="";
    	                if($("button.btn-primary:visible").html().indexOf("Generate Report")>-1)
    	                {
    	                	var divs=$(".group div");
    	                	for(var i=0;i<divs.length;i++)
    	                	{
    	                		if(filters=="")
    	                		{
    	                		//filters+="Fitered Parameters:\n"
    	                		}
    	                		if($($(divs[i]).find("label:first")).html()!="undefined"&&$($(divs[i]).find("label:first")).html()!=undefined){
    	                			filters+=$($(divs[i]).find("label:first")).html();
    	    	             		if($(divs[i]).find("input[type=text]").length>0)
    	    	             		{
    	    	             			filters+=" : "+$($(divs[i]).find("input")).val().trim()+"\n";
    	    	             		}
    	    	             		if($(divs[i]).find("select").length>0)
    	    	             		{
    	    	             			filters+=" : "+$($(divs[i]).find("select option:selected")).text().trim()+"\n";
    	    	    	             	
    	    	             		}
    	    	             		if($(divs[i]).find("input[type=checkbox]").length>0)
    	    	             		{

    		                			filters+=" : "+$($(divs[i]).find("input[type=checkbox]:checked")).length+"\n";
    	    	             			//filters+=$($(divs[i]).find("input[type=checkbox]")).prop("checked").trim()+"\n";
    	    	             		}
    	                		
    	                		}
    	                	//}
    	                }
    	                	
    	                var d = new Date();
    	                var month = d.getMonth()+1;
    	                var day = d.getDate();
    	                var output = d.toString().substring(0,d.toString().indexOf("GMT"))+"";
    	                if($("#PostType").val()=="AME1")
    	                {
    	                doc['footer']=(function(page, pages) {
    	                    return {
    	                        columns: [
    	                        	//output.substring(0,output.indexOf("GMT")),
    	                        	{	                               
    	                                alignment: 'left',
    	                                text: output
    	                            }
    	                        	,
    	                            {	                               
    	                                alignment: 'center',
    	                                text:  filters.replace(/\n/g,"    "),
    	                                bold: true
    	                            }
    	                        	,
    	                            
    	                            {	                               
    	                                alignment: 'right',
    	                                text: ['page ', { text: page.toString() },  ' of ', { text: pages.toString()+"  "+$("#FormDisplayName").val() }]
    	                            }
    	                        ],
    	                        margin: [20,0,10,10]
    	                    }
    	                });
    	                }
    	                else
    	                {
    	                	doc['footer']=(function(page, pages) {
        	                    return {
        	                        columns: [
        	                        	//output.substring(0,output.indexOf("GMT")),
        	                        	{	                               
        	                                alignment: 'left',
        	                                text: output
        	                            }
        	                        	,
        	                            
        	                            {	                               
        	                                alignment: 'right',
        	                                text: ['page ', { text: page.toString() },  ' of ', { text: pages.toString() }]
        	                            }
        	                        ],
        	                        margin: [20,0,10,10]
        	                    }
        	                });
    	                }
    	                doc.content.splice(0, 1, {
    	                    text: [
    	                    {
    	                      text: text,
    	                      bold: true,
    	                      fontSize: 10,
    	                      color:'#13789b'
    	                    },
    	                    {
    	                        text:$("#FormDisplayName").val()+"\n",
    	                        bold: true,
    	                        fontSize: 18,
    	                        underline:true,
    	                        alignment:'center',
    	                        color:'#2f687c'
    	                      }
    	                    ,
    	                    {
    	                        text: filters,
    	                        bold: true,
    	                        fontSize: 12,
    	                        alignment:'left'
    	                      }
    	                    
    	                    ],
    	                    margin: [0, 0, 0, 12],
    	                    alignment: 'center'
    	                  });
    	            }
    	            
    	        }
    	    ]
    	} );}
    	
    }
    if(tablecolwidth==undefined)
    {
    	var reportorientation=$("#reportorientation").val();
    	if(reportorientation=="landscape")
    	{
    		
    		$('#example2').DataTable( {
    	    "aaSorting":[],
    	    dom: 'lBfrtip',
    	    //autoWidth:         true, 
    	    paging:         true, 
    	    destroy: true,
    	    buttons: [{
    	    	extend : 'excel',
    	    	 title : function() {
    	    		 var filters="";
    	             if($("button.btn-primary:visible").html().indexOf("Generate Report")>-1)
    	             {
    	             	var divs=$(".group div");
    	             	for(var i=0;i<divs.length;i++)
    	             	{
    	             		
    	             		if($($(divs[i]).find("label:first")).html()!="undefined"&&$($(divs[i]).find("label:first")).html()!=undefined){
    	             			filters+=$($(divs[i]).find("label:first")).html();
	    	             		if($(divs[i]).find("input[type=text]").length>0)
	    	             		{
	    	             			filters+=" : "+$($(divs[i]).find("input")).val().trim()+"\n";
	    	             		}
	    	             		if($(divs[i]).find("select").length>0)
	    	             		{
	    	             			filters+=" : "+$($(divs[i]).find("select option:selected")).text().trim()+"\n";
	    	    	             	
	    	             		}
	    	             		if($(divs[i]).find("input[type=checkbox]").length>0)
	    	             		{

		                			filters+=" : "+$($(divs[i]).find("input[type=checkbox]:checked")).length+"\n";
	    	             			//filters+=$($(divs[i]).find("input[type=checkbox]")).prop("checked").trim()+"\n";
	    	             		}
    	             		}
    	             	}
    	            // }
    	             return $("#FormDisplayName").val()+" :   "+filters;
    	         },
    	         text : '<i class="fa fa-file-excel-o"> Export Excel</i>'
    	        },
    	        {
    	        	extend : 'pdfHtml5',             
    	            title : function() {
    	                return $("#FormDisplayName").val();
    	            },            
    	            pageSize : 'Legal',          
    	            orientation : 'landscape',              
    	            text : '<i class="fa fa-file-pdf-o"> Export PDF</i>',
    	            titleAttr : 'PDF',
    	            customize : function(doc) { 
    	            	doc.pageMargins = [20, 40, 20,40 ];
    	            	doc.defaultStyle.fontSize=11;
    	            	doc.defaultStyle.alignment='center';
    	            	var tableth=$("#example2 thead").find("th").length;
    	            	var tablecolwidth=parseInt(100/tableth);
    	            	var widtharr=[];
    	            	for(var i=0;i<tableth;i++)
    	            	{
    	            		widtharr[i]=tablecolwidth+"%";
    	            	}
    	            	var allrows=$("#example2").find("tr");	            		            	
    	            	
    	            	for(var rows=0;rows<allrows.length;rows++)
    	            	{
    	            	   var rowdata=$(allrows[rows]).find("td");
    	            	   
    	            	   for(var tds=0;tds<rowdata.length;tds++)
    		            	{
    	            		   if($(rowdata[tds]).find("img").length>0)
    	            		    {	  
    	            			   var rowdataval=doc.content[1].table.body[rows];
    	            			   doc.content[1].table.body[rows].splice(tds,1);	            			  
    	            			   var rowdatavals=[];	            			  
    	            			   var docrows=0;
    	            			   var docrowsval=0;
    	            			   while(docrows<rowdataval.length+1)
    	   		            	   {
    	            				   if(docrows==tds)
    	            					   {
    	            					   rowdatavals.push({image:$(rowdata[tds]).find("img").attr("src"),width:100});  
    	            					   docrows=docrows+1;
    	            					   }
    	            				   else
    	            					   {
    	            					   rowdatavals.push(rowdataval[docrowsval]);  
    	            					   docrows=docrows+1;
    	            					   docrowsval=docrowsval+1;
    	            					   }
    	   		            	   }
    	            			   doc.content[1].table.body[rows]=rowdatavals;
                                   	            				  
    	            			 }	            			  	            			   
    	            		    
    		            	}
    	            	   
    	            	}            	
    	                // doc.content[1].table.widths =widtharr;  
    	                var text="CENTRAL EXAMINATION ORGANISATION, OFFICE OF THE DIRECTOR GENERAL OF CIVIL AVIATION, RK PURAM,New Delhi\n";
    	                var filters="";
    	                if($("button.btn-primary:visible").html().indexOf("Generate Report")>-1)
    	                {
    	                	var divs=$(".group div");
    	                	for(var i=0;i<divs.length;i++)
    	                	{
    	                		if(filters=="")
    	                		{
    	                		//filters+="Fitered Parameters:\n"
    	                		}
    	                		if($($(divs[i]).find("label:first")).html()!="undefined"&&$($(divs[i]).find("label:first")).html()!=undefined){
    	                			filters+=$($(divs[i]).find("label:first")).html();
    	    	             		if($(divs[i]).find("input[type=text]").length>0)
    	    	             		{
    	    	             			filters+=" : "+$($(divs[i]).find("input")).val().trim()+"\n";
    	    	             		}
    	    	             		if($(divs[i]).find("select").length>0)
    	    	             		{
    	    	             			filters+=" : "+$($(divs[i]).find("select option:selected")).text().trim()+"\n";
    	    	    	             	
    	    	             		}
    	    	             		if($(divs[i]).find("input[type=checkbox]").length>0)
    	    	             		{

    		                			filters+=" : "+$($(divs[i]).find("input[type=checkbox]:checked")).length+"\n";
    	    	             			//filters+=$($(divs[i]).find("input[type=checkbox]")).prop("checked").trim()+"\n";
    	    	             		}
    	                		
    	                		}
    	                	//}
    	                }
    	                	
    	                var d = new Date();
    	                var month = d.getMonth()+1;
    	                var day = d.getDate();
    	                var output = d.toString().substring(0,d.toString().indexOf("GMT"))+"";
    	                if($("#PostType").val()=="AME1")
    	                {
    	                doc['footer']=(function(page, pages) {
    	                    return {
    	                        columns: [
    	                        	//output.substring(0,output.indexOf("GMT")),
    	                        	{	                               
    	                                alignment: 'left',
    	                                text: output
    	                            }
    	                        	,
    	                            {	                               
    	                                alignment: 'center',
    	                                text:  filters.replace(/\n/g,"    "),
    	                                bold: true
    	                            }
    	                        	,
    	                            
    	                            {	                               
    	                                alignment: 'right',
    	                                text: ['page ', { text: page.toString() },  ' of ', { text: pages.toString()+"  "+$("#FormDisplayName").val() }]
    	                            }
    	                        ],
    	                        margin: [20,0,10,10]
    	                    }
    	                });
    	                }
    	                else
    	                {
    	                	doc['footer']=(function(page, pages) {
        	                    return {
        	                        columns: [
        	                        	//output.substring(0,output.indexOf("GMT")),
        	                        	{	                               
        	                                alignment: 'left',
        	                                text: output
        	                            }
        	                        	,
        	                            
        	                            {	                               
        	                                alignment: 'right',
        	                                text: ['page ', { text: page.toString() },  ' of ', { text: pages.toString() }]
        	                            }
        	                        ],
        	                        margin: [20,0,10,10]
        	                    }
        	                });
    	                }
    	                doc.content.splice(0, 1, {
    	                    text: [
    	                    {
    	                      text: text,
    	                      bold: true,
    	                      fontSize: 10,
    	                      color:'#13789b'
    	                    },
    	                    {
    	                        text:$("#FormDisplayName").val()+"\n",
    	                        bold: true,
    	                        fontSize: 18,
    	                        underline:true,
    	                        alignment:'center',
    	                        color:'#2f687c'
    	                      }
    	                    ,
    	                    {
    	                        text: filters,
    	                        bold: true,
    	                        fontSize: 12,
    	                        alignment:'left'
    	                      }
    	                    
    	                    ],
    	                    margin: [0, 0, 0, 12],
    	                    alignment: 'center'
    	                  });
    	            }
    	            
    	        }
    	    ]
    	} );}
    	else{$('#example2').DataTable( {
    	    "aaSorting":[],
    	    dom: 'lBfrtip',
    	    destroy: true,
    	    buttons: [{
    	    	extend : 'excel',
    	    	 title : function() {
    	    		 var filters="";
    	             if($("button.btn-primary:visible").html().indexOf("Generate Report")>-1)
    	             {
    	             	var divs=$(".group div");
    	             	for(var i=0;i<divs.length;i++)
    	             	{
    	             		
    	             		if($($(divs[i]).find("label:first")).html()!="undefined"&&$($(divs[i]).find("label:first")).html()!=undefined){
    	             			filters+=$($(divs[i]).find("label:first")).html();
	    	             		if($(divs[i]).find("input[type=text]").length>0)
	    	             		{
	    	             			filters+=" : "+$($(divs[i]).find("input")).val().trim()+"\n";
	    	             		}
	    	             		if($(divs[i]).find("select").length>0)
	    	             		{
	    	             			filters+=" : "+$($(divs[i]).find("select option:selected")).text().trim()+"\n";
	    	    	             	
	    	             		}
	    	             		if($(divs[i]).find("input[type=checkbox]").length>0)
	    	             		{

		                			filters+=" : "+$($(divs[i]).find("input[type=checkbox]:checked")).length+"\n";
	    	             			//filters+=$($(divs[i]).find("input[type=checkbox]")).prop("checked").trim()+"\n";
	    	             		}
    	             		}
    	             	}
    	            // }
    	             return $("#FormDisplayName").val()+" :   "+filters;
    	         },
    	         text : '<i class="fa fa-file-excel-o"> Export Excel</i>'
    	        },
    	        {
    	        	extend : 'pdfHtml5',             
    	            title : function() {
    	                return $("#FormDisplayName").val();
    	            },            
    	            pageSize : 'Legal',          
    	            orientation : 'portrait',              
    	            text : '<i class="fa fa-file-pdf-o"> Export PDF</i>',
    	            titleAttr : 'PDF',
    	            customize : function(doc) { 
    	            	doc.pageMargins = [20, 40, 20,40 ];
    	            	doc.defaultStyle.fontSize=11;
    	            	doc.defaultStyle.alignment='center';
    	            	var tableth=$("#example2 thead").find("th").length;
    	            	var tablecolwidth=parseInt(100/tableth);
    	            	var widtharr=[];
    	            	for(var i=0;i<tableth;i++)
    	            	{
    	            		widtharr[i]=tablecolwidth+"%";
    	            	}
    	            	
    	            	var allrows=$("#example2").find("tr");	            		            	
    	            	
    	            	for(var rows=0;rows<allrows.length;rows++)
    	            	{
    	            	   var rowdata=$(allrows[rows]).find("td");
    	            	   
    	            	   for(var tds=0;tds<rowdata.length;tds++)
    		            	{
    	            		   if($(rowdata[tds]).find("img").length>0)
    	            		    {	  
    	            			   var rowdataval=doc.content[1].table.body[rows];
    	            			   doc.content[1].table.body[rows].splice(tds,1);	            			  
    	            			   var rowdatavals=[];	            			  
    	            			   var docrows=0;
    	            			   var docrowsval=0;
    	            			   while(docrows<rowdataval.length+1)
    	   		            	   {
    	            				   if(docrows==tds)
    	            					   {
    	            					   rowdatavals.push({image:$(rowdata[tds]).find("img").attr("src"),width:100});  
    	            					   docrows=docrows+1;
    	            					   }
    	            				   else
    	            					   {
    	            					   rowdatavals.push(rowdataval[docrowsval]);  
    	            					   docrows=docrows+1;
    	            					   docrowsval=docrowsval+1;
    	            					   }
    	   		            	   }
    	            			   doc.content[1].table.body[rows]=rowdatavals;
                                   	            				  
    	            			 }	            			  	            			   
    	            		    
    		            	}
    	            	   
    	            	}            	
    	                // doc.content[1].table.widths =widtharr;  
    	                var text="CENTRAL EXAMINATION ORGANISATION, OFFICE OF THE DIRECTOR GENERAL OF CIVIL AVIATION, RK PURAM,New Delhi\n";
    		            var filters="";
    	                if($("button.btn-primary:visible").html().indexOf("Generate Report")>-1)
    	                {
    	                	var divs=$(".group div");
    	                	for(var i=0;i<divs.length;i++)
    	                	{
    	                		if(filters=="")
    	                		{
    	                		//filters+="Fitered Parameters:\n"
    	                		}
    	                		if($($(divs[i]).find("label:first")).html()!="undefined"&&$($(divs[i]).find("label:first")).html()!=undefined){
    	                			filters+=$($(divs[i]).find("label:first")).html();
    	    	             		if($(divs[i]).find("input[type=text]").length>0)
    	    	             		{
    	    	             			filters+=" : "+$($(divs[i]).find("input")).val().trim()+"\n";
    	    	             		}
    	    	             		if($(divs[i]).find("select").length>0)
    	    	             		{
    	    	             			filters+=" : "+$($(divs[i]).find("select option:selected")).text().trim()+"\n";
    	    	    	             	
    	    	             		}
    	    	             		if($(divs[i]).find("input[type=checkbox]").length>0)
    	    	             		{

    		                			filters+=" : "+$($(divs[i]).find("input[type=checkbox]:checked")).length+"\n";
    	    	             			//filters+=$($(divs[i]).find("input[type=checkbox]")).prop("checked").trim()+"\n";
    	    	             		}
    	                		
    	                		}
    	                	//}
    	                }
    	                	
    	                var d = new Date();
    	                var month = d.getMonth()+1;
    	                var day = d.getDate();
    	                var output = d.toString().substring(0,d.toString().indexOf("GMT"))+"";
    	                if($("#PostType").val()=="AME1")
    	                {
    	                doc['footer']=(function(page, pages) {
    	                    return {
    	                        columns: [
    	                        	//output.substring(0,output.indexOf("GMT")),
    	                        	{	                               
    	                                alignment: 'left',
    	                                text: output
    	                            }
    	                        	,
    	                            {	                               
    	                                alignment: 'center',
    	                                text:  filters.replace(/\n/g,"    "),
    	                                bold: true
    	                            }
    	                        	,
    	                            
    	                            {	                               
    	                                alignment: 'right',
    	                                text: ['page ', { text: page.toString() },  ' of ', { text: pages.toString()+"  "+$("#FormDisplayName").val() }]
    	                            }
    	                        ],
    	                        margin: [20,0,10,10]
    	                    }
    	                });
    	                }
    	                else
    	                {
    	                	doc['footer']=(function(page, pages) {
        	                    return {
        	                        columns: [
        	                        	//output.substring(0,output.indexOf("GMT")),
        	                        	{	                               
        	                                alignment: 'left',
        	                                text: output
        	                            }
        	                        	,
        	                            
        	                            {	                               
        	                                alignment: 'right',
        	                                text: ['page ', { text: page.toString() },  ' of ', { text: pages.toString() }]
        	                            }
        	                        ],
        	                        margin: [20,0,10,10]
        	                    }
        	                });
    	                }
    	               
    	                doc.content.splice(0, 1, {
    	                    text: [
    	                    {
    	                      text: text,
    	                      bold: true,
    	                      fontSize: 10,
    	                      color:'#13789b'
    	                    },
    	                    {
    	                        text:$("#FormDisplayName").val()+"\n",
    	                        bold: true,
    	                        fontSize: 18,
    	                        underline:true,
    	                        alignment:'center',
    	                        color:'#2f687c'
    	                      }
    	                    ,
    	                    {
    	                        text: filters,
    	                        bold: true,
    	                        fontSize: 12,
    	                        alignment:'left'
    	                      }
    	                    
    	                    ],
    	                    margin: [0, 0, 0, 12],
    	                    alignment: 'center'
    	                  });
    	            }
    	            
    	        }
    	    ]
    	} );}
    	
    }
	
	
}
*/


function adddatatablestructure()
{
	//var reportfontsize=parseInt($("#reportfontsize").val());
	var reportfontsize=8;
    if(Number.isInteger(parseInt($("#reportfontsize").val())))
    {
    	reportfontsize=parseInt($("#reportfontsize").val());
    }
    var pagelengthval=10;
    if($("#PostType").val()=="PLT")
    {
    	pagelengthval=100;

    }
    	
	if(tablecolwidth!=undefined)
    {
		console.log(JSON.parse(tablecolwidth));
		var tablecoljsonwidth=JSON.parse(tablecolwidth);
    	var reportorientation=$("#reportorientation").val();
    	if(reportorientation=="landscape")
    	{
    		
    		$('#example2').DataTable( {
    	    "aaSorting":[],
    	    "pageLength":pagelengthval,
    	    dom: 'lBfrtip',
    	    //autoWidth:         true, 
    	    paging:         true, 
    	    columnDefs: tablecoljsonwidth,
    	    destroy: true,
    	    buttons: [{
    	    	extend : 'excel',
    	    	 title : function() {
    	    		 var filters="";  var filtersheader="";
    	             /*if($("button.btn-primary:visible").html().indexOf("Generate Report")>-1)
    	             {*/
    	             	var divs=$(".group div:visible");
    	             	for(var i=0;i<divs.length;i++)
    	             	{
    	             		
    	             		if($($(divs[i]).find("label:first")).html()!="undefined"&&$($(divs[i]).find("label:first")).html()!=undefined){
    	             			filters+=$($(divs[i]).find("label:first"))[0].innerText.split("\n")[0];
	    	             		if($(divs[i]).find("input[type=text]").length>0)
	    	             		{
	    	             			filters+=" : "+$($(divs[i]).find("input")).val().trim()+"\n";
	    	             		}
	    	             		if($(divs[i]).find("select").length>0)
	    	             		{
	    	             			filters+=" : "+$($(divs[i]).find("select option:selected")).text().trim()+"\n";
	    	    	             	
	    	             		}
	    	             		if($(divs[i]).find("input[type=checkbox]").length>0)
	    	             		{

	    	             			filters+=" : "+$($(divs[i]).find("input[type=checkbox]:checked")).length+"\n";
	    	             			//filters+=$($(divs[i]).find("input[type=checkbox]")).prop("checked").trim()+"\n";
	    	             		}
    	             		}
    	             		if($($(divs[i]).find("label:first")).html()!="undefined"&&$($(divs[i]).find("label:first")).html()!=undefined&&$($(divs[i]).find("label:first")).attr("filterdata")=="1"){
    	             			/*filtersheader+=$($(divs[i]).find("label:first")).html();*/
    	             			filtersheader+=$($(divs[i]).find("label:first"))[0].innerText.split("\n")[0];
	    	             		if($(divs[i]).find("input[type=text]").length>0)
	    	             		{
	    	             			filtersheader+=" : "+$($(divs[i]).find("input")).val().trim()+"\n";
	    	             		}
	    	             		if($(divs[i]).find("select").length>0)
	    	             		{
	    	             			filtersheader+=" : "+$($(divs[i]).find("select option:selected")).text().trim()+"\n";
	    	    	             	
	    	             		}
	    	             		if($(divs[i]).find("input[type=checkbox]").length>0)
	    	             		{

	    	             			filtersheader+=" : "+$($(divs[i]).find("input[type=checkbox]:checked")).length+"\n";
	    	             			//filters+=$($(divs[i]).find("input[type=checkbox]")).prop("checked").trim()+"\n";
	    	             		}
    	             		}

    	             	}
    	            // }
    	             return $("#FormDisplayName").val()+" :   "+filters;
    	         },
    	         text : '<i class="fa fa-file-excel-o"> Export Excel</i>'
    	        },
    	        {
    	        	extend : 'pdfHtml5',             
    	            title : function() {
    	                return $("#FormDisplayName").val();
    	            }, 
    	            exportOptions: {
    	                stripNewlines: true
    	            },
    	            /*pageSize : 'Legal',  */        
    	            orientation : 'landscape',
    	            text : '<i class="fa fa-file-pdf-o"> Export PDF</i>',
    	            titleAttr : 'PDF',
    	            customize : function(doc) { 
    	            	//doc.pageMargins = [20, 40, 20,40 ];
    	            	doc.defaultStyle.alignment='center';
    	            	doc.defaultStyle.fontSize=reportfontsize;
    	            	doc.content[1].table.dontBreakRows = true;
    	            	doc.content[1].table.keepWithHeaderRows = true;
    	            	
    	            	var tableth=$("#example2 thead").find("th").length;
    	            	var widthjsonarr=[];
    	            	for(var i=0;i<tablecoljsonwidth.length;i++)
    	            	{
    	            		widthjsonarr[i]=tablecoljsonwidth[i].width;
    	            		
    	            	}
    	            	var allrows=doc.content[1].table.body;	            		            	
    	            	
    	            	for(var rows=0;rows<allrows.length;rows++)
    	            	{
    	            	   var rowdata=doc.content[1].table.body[rows];
    	            	   
    	            	   for(var tds=0;tds<rowdata.length;tds++)
    		            	{
    	            		   //doc.content[1].table.body[rows][tds].text=doc.content[1].table.body[rows][tds].text.replace(/\s\s+/g, '\n');
    	            		   var datavalue=doc.content[1].table.body[rows][tds].text;
    	            		   var splitdata=datavalue.split("  ");
    	            		   console.log(splitdata);
    	            		   var datavals="";
    	            		   for(var i=0;i<splitdata.length;i++)
    	            		   {
    	            		   if(datavals=="")
    	            			   datavals=datavals+splitdata[i];
    	            			   //datavals=datavals+"\n"+splitdata[i];
    	            		   else
    	            			   datavals=datavals+"\n"+splitdata[i];
    	            		   }
    	            		   
    	            		   doc.content[1].table.body[rows][tds].text=datavals;

    	            		   if(rows>0&&$($($("#example2 tbody tr")[rows-1]).find("td")[tds]).find("img").length>0)
    	            		    {	  
    	            			   var rowdataval=doc.content[1].table.body[rows];
    	            			   doc.content[1].table.body[rows].splice(tds,1);	            			  
    	            			   var rowdatavals=[];	            			  
    	            			   var docrows=0;
    	            			   var docrowsval=0;
    	            			   console.log(doc.content[1].table.body[rows]);
    	            			   while(docrows<rowdataval.length+1)
    	   		            	   {
    	            				   if(docrows==tds)
    	            					   {
    	            					   rowdatavals.push({image:$($($("#example2 tbody tr")[rows-1]).find("td")[tds]).find("img").attr("src"),width:50});  
    	            					   docrows=docrows+1;
    	            					   }
    	            				   else
    	            					   {
    	            					   rowdatavals.push(rowdataval[docrowsval]);  
    	            					   docrows=docrows+1;
    	            					   docrowsval=docrowsval+1;
    	            					   }
    	   		            	   }
    	            			   doc.content[1].table.body[rows]=rowdatavals;
                                   	            				  
    	            			 }
    	            		   else
    	            		   {
    	            			   
    	            			   //doc.content[1].table.body[rows][tds].text=doc.content[1].table.body[rows][tds].text.replace(/\s\s+/g, '\n');
    	            			   var datavalue=doc.content[1].table.body[rows][tds].text;
        	            		   var splitdata=datavalue.split("  ");
        	            		   console.log(splitdata);
        	            		   var datavals="";
        	            		   for(var i=0;i<splitdata.length;i++)
        	            		   {
        	            		   if(datavals=="")
        	            			  datavals=datavals+splitdata[i];
        	            			  // datavals=datavals+"\n"+splitdata[i];
        	            		   else
        	            			   datavals=datavals+"\n"+splitdata[i];
        	            		   }
        	            		   
        	            		   doc.content[1].table.body[rows][tds].text=datavals;

    	            		   }
    	            		    
    		            	}
    	            	   
    	            	}            	
    	                doc.content[1].table.widths =widthjsonarr;  
    	                var text="CENTRAL EXAMINATION ORGANISATION, OFFICE OF THE DIRECTOR GENERAL OF CIVIL AVIATION, RK PURAM,New Delhi";
    	                var filters="";  var filtersheader="";
    	               /* if($("button.btn-primary:visible").html().indexOf("Generate Report")>-1)
    	                {*/
    	                var divs=$(".group div:visible");
	                	for(var i=0;i<divs.length;i++)
	                	{
	                		var alignkey="";
	                		var aligndata="";
    	             		if($($(divs[i]).find("label:first")).html()!="undefined"&&$($(divs[i]).find("label:first")).html()!=undefined)
    	             		{
    	             			var alignvalue= $($(divs[i]).find("label:first")).attr("filterdata");
    	             			var align="";
    	             			var header="";
    	             			var fontsize="12";
    	             			var width1="0";
    	             			var colourdata="0";
    	             			var alignvaluearray=alignvalue.split("_");
    	             			align="left";
    	             			/*if(alignvaluearray[1]!=undefined)
    	             			{
    	             				fontsize=alignvaluearray[1];
    	             			}*/
    	             			if(alignvaluearray[2]!=undefined&&alignvaluearray[2]!="0")
    	             			{
    	             				width1=alignvaluearray[2];
    	             			}
    	             			if(alignvaluearray[3]!=undefined&&alignvaluearray[3]!="0")
    	             			{
    	             				colourdata=alignvaluearray[3];
    	             			}
    	             			/*alignkey=$($(divs[i]).find("label:first")).html();  */   
    	             			alignkey=$($(divs[i]).find("label:first"))[0].innerText.split("\n")[0];   
    	             			if($(divs[i]).find("input[type=text]").length>0)
	    	             		{
    	             				aligndata=$($(divs[i]).find("input")).val().trim();
	    	             		}
	    	             		if($(divs[i]).find("select").length>0)
	    	             		{
	    	             			aligndata=$($(divs[i]).find("select option:selected")).text().trim();
	    	    	             	
	    	             		}
	    	             		if($(divs[i]).find("input[type=checkbox]").length>0)
	    	             		{

	    	             			aligndata=$($(divs[i]).find("input[type=checkbox]:checked")).length;
	    	             			//filters+=$($(divs[i]).find("input[type=checkbox]")).prop("checked").trim();
	    	             		}
	    	             		if(filters=="")
	    	             		{
	    	             			if(width1=="0")
	    	             			{
	    	             				if(colourdata=="0")
    	    	             			{
	    	             					filters=filters+'{"alignment":"'+align+'","text":"'+alignkey.trim()+":"+aligndata+'","fontSize": '+fontsize+'}';
    	    	             			}
    	    	             			else
    	    	             			{
    	    	             				filters=filters+'{"alignment":"'+align+'","text":"'+alignkey.trim()+":"+aligndata+'","fontSize": '+fontsize+',"color": "'+colourdata+'"}';
    	    	    	             			
    	    	             			}
	    	             		   }
	    	             		   else
	    	             		   {
	    	             			if(colourdata=="0")
  	    	             			{
	    	             				filters=filters+'{"alignment":"'+align+'","text":"'+alignkey.trim()+":"+aligndata+'","fontSize": '+fontsize+',"width": '+width1+'}';
  	    	             			}
  	    	             			else
  	    	             			{
  	    	             				filters=filters+'{"alignment":"'+align+'","text":"'+alignkey.trim()+":"+aligndata+'","fontSize": '+fontsize+',"width": '+width1+',"color": "'+colourdata+'"}';
  	    	    	             			
  	    	             			}
	    	             		   }
	    	             		}
	    	             		else
	    	             		{
	    	             			if(width1=="0")
	    	             			{
	    	             				if(colourdata=="0")
    	    	             			{
	    	             					filters=filters+","+'{"alignment":"'+align+'","text":"'+alignkey.trim()+":"+aligndata+'","fontSize": '+fontsize+'}';
    	    	             			}
    	    	             			else
    	    	             			{
    	    	             				filters=filters+","+'{"alignment":"'+align+'","text":"'+alignkey.trim()+":"+aligndata+'","fontSize": '+fontsize+',"color": "'+colourdata+'"}';
    	    	    	             			
    	    	             			}
	    	             		   }
	    	             		   else
	    	             		   {
	    	             			if(colourdata=="0")
  	    	             			{
	    	             				filters=filters+","+'{"alignment":"'+align+'","text":"'+alignkey.trim()+":"+aligndata+'","fontSize": '+fontsize+',"width": '+width1+'}';
  	    	             			}
  	    	             			else
  	    	             			{
  	    	             				filters=filters+","+'{"alignment":"'+align+'","text":"'+alignkey.trim()+":"+aligndata+'","fontSize": '+fontsize+',"width": '+width1+',"color": "'+colourdata+'"}';
  	    	    	             			
  	    	             			}
	    	             		   }
	    	             		}
    	             		}
    	             		alignkey="";
	                		aligndata="";	             		
    	             		if($($(divs[i]).find("label:first")).html()!="undefined"&&$($(divs[i]).find("label:first")).html()!=undefined&&$($(divs[i]).find("label:first")).attr("filterdata")!="0")
    	             		{
    	             			var alignvalue= $($(divs[i]).find("label:first")).attr("filterdata");
    	             			var align="";
    	             			var header="";
    	             			var fontsize="10";
    	             			var width1="0";
    	             			var colourdata="0";
    	             			var alignvaluearray=alignvalue.split("_");
    	             			switch(alignvaluearray[0])
    	             			{
    	             			case "1":
    	             				align="left";
    	             				break;
    	             			case "2":
    	             				align="right";
    	             				break;
    	             			case "3":
    	             				align="center";
    	             				break; 
    	             			}
    	             			if(alignvaluearray[1]!=undefined)
    	             			{
    	             				fontsize=alignvaluearray[1];
    	             			}
    	             			if(alignvaluearray[2]!=undefined&&alignvaluearray[2]!="0")
    	             			{
    	             				width1=alignvaluearray[2];
    	             			}
    	             			if(alignvaluearray[3]!=undefined&&alignvaluearray[3]!="0")
    	             			{
    	             				colourdata=alignvaluearray[3];
    	             			}
    	             			/*alignkey=$($(divs[i]).find("label:first")).html(); */
    	             			alignkey=$($(divs[i]).find("label:first"))[0].innerText.split("\n")[0];   
    	             			if($(divs[i]).find("input[type=text]").length>0)
	    	             		{
    	             				aligndata=$($(divs[i]).find("input")).val().trim();
	    	             		}
	    	             		if($(divs[i]).find("select").length>0)
	    	             		{
	    	             			aligndata=$($(divs[i]).find("select option:selected")).text().trim();
	    	    	             	
	    	             		}
	    	             		if($(divs[i]).find("input[type=checkbox]").length>0)
	    	             		{

	    	             			aligndata=$($(divs[i]).find("input[type=checkbox]:checked")).length;
	    	             			//filters+=$($(divs[i]).find("input[type=checkbox]")).prop("checked").trim();
	    	             		}
	    	             		if(filtersheader=="")
	    	             		{
	    	             			if(width1=="0")
	    	             			{
	    	             				if(colourdata=="0")
    	    	             			{
    	    	             		    filtersheader=filtersheader+'{"alignment":"'+align+'","text":"'+alignkey.trim()+":"+aligndata+'","fontSize": '+fontsize+'}';
    	    	             			}
    	    	             			else
    	    	             			{
    	    	             			filtersheader=filtersheader+'{"alignment":"'+align+'","text":"'+alignkey.trim()+":"+aligndata+'","fontSize": '+fontsize+',"color": "'+colourdata+'"}';
    	    	    	             			
    	    	             			}
	    	             		   }
	    	             		   else
	    	             		   {
	    	             			if(colourdata=="0")
  	    	             			{
  	    	             		    filtersheader=filtersheader+'{"alignment":"'+align+'","text":"'+alignkey.trim()+":"+aligndata+'","fontSize": '+fontsize+',"width": '+width1+'}';
  	    	             			}
  	    	             			else
  	    	             			{
  	    	             			filtersheader=filtersheader+'{"alignment":"'+align+'","text":"'+alignkey.trim()+":"+aligndata+'","fontSize": '+fontsize+',"width": '+width1+',"color": "'+colourdata+'"}';
  	    	    	             			
  	    	             			}
	    	             		   }
	    	             		}
	    	             		else
	    	             		{
	    	             			if(width1=="0")
	    	             			{
	    	             				if(colourdata=="0")
    	    	             			{
    	    	             		    filtersheader=filtersheader+","+'{"alignment":"'+align+'","text":"'+alignkey.trim()+":"+aligndata+'","fontSize": '+fontsize+'}';
    	    	             			}
    	    	             			else
    	    	             			{
    	    	             			filtersheader=filtersheader+","+'{"alignment":"'+align+'","text":"'+alignkey.trim()+":"+aligndata+'","fontSize": '+fontsize+',"color": "'+colourdata+'"}';
    	    	    	             			
    	    	             			}
	    	             		   }
	    	             		   else
	    	             		   {
	    	             			if(colourdata=="0")
  	    	             			{
  	    	             		    filtersheader=filtersheader+","+'{"alignment":"'+align+'","text":"'+alignkey.trim()+":"+aligndata+'","fontSize": '+fontsize+',"width": '+width1+'}';
  	    	             			}
  	    	             			else
  	    	             			{
  	    	             			filtersheader=filtersheader+","+'{"alignment":"'+align+'","text":"'+alignkey.trim()+":"+aligndata+'","fontSize": '+fontsize+',"width": '+width1+',"color": "'+colourdata+'"}';
  	    	    	             			
  	    	             			}
	    	             		   }
	    	             		}
    	             		}
	                	//}
	                }
	                var filterheaderdata=$("#filterheaderdata").val();
	                if(!(Number.isInteger(parseInt(filterheaderdata.substring(0,1)))))
	                {
	                	filterheaderdata="0";
	                }
	                var filterheaderdatavalue="";
	                if(filterheaderdata!=undefined&&filterheaderdata!="0")
	                {
	                	var alignvalue= filterheaderdata;
             			var align="";
             			var header="";
             			var fontsize="10";
             			var width1="0";
             			var colourdata="0";
             			var alignvaluearray=alignvalue.split("_");
             			switch(alignvaluearray[0])
             			{
             			case "1":
             				align="left";
             				break;
             			case "2":
             				align="right";
             				break;
             			case "3":
             				align="center";
             				break; 
             			}
             			if(alignvaluearray[1]!=undefined)
             			{
             				fontsize=alignvaluearray[1];
             			}
             			if(alignvaluearray[2]!=undefined&&alignvaluearray[2]!="0")
             			{
             				width1=alignvaluearray[2];
             			}
             			if(alignvaluearray[3]!=undefined&&alignvaluearray[3]!="0")
             			{
             				colourdata=alignvaluearray[3];
             			}
             			aligndata=$("#FormHeader").val().trim();
             			if(width1=="0")
             			{
             				if(colourdata=="0")
	             			{
             					filterheaderdatavalue='{"alignment":"'+align+'","text":"'+aligndata+'","fontSize": '+fontsize+'}';
	             			}
	             			else
	             			{
	             				filterheaderdatavalue='{"alignment":"'+align+'","text":"'+aligndata+'","fontSize": '+fontsize+',"color": "'+colourdata+'"}';
	    	             			
	             			}
             		   }
             		   else
             		   {
             			if(colourdata=="0")
	             			{
             				filterheaderdatavalue='{"alignment":"'+align+'","text":"'+aligndata+'","fontSize": '+fontsize+',"width": '+width1+'}';
	             			}
	             			else
	             			{
	             			filterheaderdatavalue='{"alignment":"'+align+'","text":"'+aligndata+'","fontSize": '+fontsize+',"width": '+width1+',"color": "'+colourdata+'"}';
	    	             			
	             			}
             		   }	
	                }
	                
	                var filterdatajson=JSON.parse('{}');	
	                if(filterheaderdatavalue!="")
	                	{
	                	//[{"a":[{"a":"a"},{"a":"a"}]}]
	                	filterdatajson=JSON.parse('['+filterheaderdatavalue+","+filtersheader+']');
	                	}
	                else
	                	{
	                	filterdatajson=JSON.parse('['+filtersheader+']');
	                	}
	                // filters=JSON.parse('['+'{"text": "'+text+'","bold": true,"fontSize": 10,"color":"#13789b"},{"text":"'+$("#FormDisplayName").val()+'","bold": true,"fontSize": 18,"underline":true,"alignment":"center","color":"#2f687c"},'+filters+']');
	                if(filters!="")
                	{
	                	filters=JSON.parse('['+'{"text": "'+text+'","bold": true,"fontSize": 10,"color":"#13789b"},{"text":"'+$("#FormDisplayName").val()+'","bold": true,"fontSize": 18,"underline":true,"alignment":"center","color":"#2f687c"},'+filters+']');
                	}
                else
                	{
                	filters=JSON.parse('['+'{"text": "'+text+'","bold": true,"fontSize": 10,"color":"#13789b"},{"text":"'+$("#FormDisplayName").val()+'","bold": true,"fontSize": 18,"underline":true,"alignment":"center","color":"#2f687c"}'+']');
                	}
                
	                
	                var margintopfont=0;
	                for(var i=0;i<filterdatajson.length;i++)
	                {
	                	var fontsize1=filterdatajson[i].fontSize;
	                	margintopfont=margintopfont+1.3*fontsize1;
	                }
	                margintopfont=parseInt(margintopfont+20);
	                doc.pageMargins = [20, margintopfont, 20,40 ];  
    	                	
    	                var d = new Date();
    	                var month = d.getMonth()+1;
    	                var day = d.getDate();
    	                var output = d.toString().substring(0,d.toString().indexOf("GMT"))+"";
    	                if($("#PostType").val()=="AME1")
    	                {
    	                doc['footer']=(function(page, pages) {
    	                    return {
    	                        columns: [
    	                        	//output.substring(0,output.indexOf("GMT")),
    	                        	{	                               
    	                                alignment: 'left',
    	                                text: output
    	                            }
    	                        	,
    	                            {	                               
    	                                alignment: 'center',
    	                                text:  filters.replace(/\n/g,"    "),
    	                                bold: true
    	                            }
    	                        	,
    	                            
    	                            {	                               
    	                                alignment: 'right',
    	                                text: ['page ', { text: page.toString() },  ' of ', { text: pages.toString()+"  "+$("#FormDisplayName").val() }]
    	                            }
    	                        ],
    	                        margin: [20,0,10,10]
    	                    }
    	                });
    	                }
    	                else
    	                {
    	                	doc['footer']=(function(page, pages) {
        	                    return {
        	                        columns: [
        	                        	//output.substring(0,output.indexOf("GMT")),
        	                        	{	                               
        	                                alignment: 'left',
        	                                text: output
        	                            }
        	                        	,
        	                            
        	                            {	                               
        	                                alignment: 'right',
        	                                text: ['page ', { text: page.toString() },  ' of ', { text: pages.toString() }]
        	                            }
        	                        ],
        	                        margin: [20,0,10,10]
        	                    }
        	                });
    	                }
    	                doc['header']=(function(page, pages) {
    	            		if(page.toString()=="1")
    	            		{
    	            			return {  }
    	            		}
    	            		else
    	            		{
    	            		
    	                    return {
    	                    	
    	                        //columns:filterdatajson
    	                    	columns:[
							    //'first column is a simple text',
    	                    		filterdatajson
							  ],
    	                      margin: [20,10,20,100]
    	                    }
    	            		}
    	                });
    	                doc.content[0].text="";
    	                doc.content.splice(0, 1, {
    	                	columns:[
							    //'first column is a simple text',
	                    		filters] ,
    	                        margin: [0, (-margintopfont)+20, 0, 12],
    	                    //alignment: 'center'
    	                  });
    	               /* doc.content.splice(0, 1, {
    	                    text: [
    	                    {
    	                      text: text,
    	                      bold: true,
    	                      fontSize: 10,
    	                      color:'#13789b'
    	                    },
    	                    {
    	                        text:$("#FormDisplayName").val()+"\n",
    	                        bold: true,
    	                        fontSize: 18,
    	                        underline:true,
    	                        alignment:'center',
    	                        color:'#2f687c'
    	                      }
    	                    ,
    	                    {
    	                        text: filters,
    	                        bold: true,
    	                        fontSize: 12,
    	                        alignment:'left'
    	                      }
    	                    
    	                    ],
    	                    margin: [0, 0, 0, 12],
    	                    alignment: 'center'
    	                  });*/
    	            }
    	            
    	        }
    	    ]
    	} );}
    	else{$('#example2').DataTable( {
    	    "aaSorting":[],
    	    dom: 'lBfrtip',
    	   // autoWidth:         true, 
    	    paging:         true, 
    	    "pageLength":pagelengthval,
    	    
    	    columnDefs: tablecoljsonwidth,
    	    destroy: true,
    	    buttons: [{
    	    	extend : 'excel',
    	    	 title : function() {
    	    		 var filters="";  var filtersheader="";
    	             /*if($("button.btn-primary:visible").html().indexOf("Generate Report")>-1)
    	             {*/
    	             	var divs=$(".group div:visible");
    	             	for(var i=0;i<divs.length;i++)
    	             	{
    	             		
    	             		if($($(divs[i]).find("label:first")).html()!="undefined"&&$($(divs[i]).find("label:first")).html()!=undefined){
    	             			filters+=$($(divs[i]).find("label:first"))[0].innerText.split("\n")[0];
	    	             		if($(divs[i]).find("input[type=text]").length>0)
	    	             		{
	    	             			filters+=" : "+$($(divs[i]).find("input")).val().trim()+"\n";
	    	             		}
	    	             		if($(divs[i]).find("select").length>0)
	    	             		{
	    	             			filters+=" : "+$($(divs[i]).find("select option:selected")).text().trim()+"\n";
	    	    	             	
	    	             		}
	    	             		if($(divs[i]).find("input[type=checkbox]").length>0)
	    	             		{

	    	             			filters+=" : "+$($(divs[i]).find("input[type=checkbox]:checked")).length+"\n";
	    	             			//filters+=$($(divs[i]).find("input[type=checkbox]")).prop("checked").trim()+"\n";
	    	             		}
    	             		}
    	             		if($($(divs[i]).find("label:first")).html()!="undefined"&&$($(divs[i]).find("label:first")).html()!=undefined&&$($(divs[i]).find("label:first")).attr("filterdata")=="1"){
    	             			/*filtersheader+=$($(divs[i]).find("label:first")).html();*/
    	             			filtersheader+=$($(divs[i]).find("label:first"))[0].innerText.split("\n")[0];
	    	             		if($(divs[i]).find("input[type=text]").length>0)
	    	             		{
	    	             			filtersheader+=" : "+$($(divs[i]).find("input")).val().trim()+"\n";
	    	             		}
	    	             		if($(divs[i]).find("select").length>0)
	    	             		{
	    	             			filtersheader+=" : "+$($(divs[i]).find("select option:selected")).text().trim()+"\n";
	    	    	             	
	    	             		}
	    	             		if($(divs[i]).find("input[type=checkbox]").length>0)
	    	             		{

	    	             			filtersheader+=" : "+$($(divs[i]).find("input[type=checkbox]:checked")).length+"\n";
	    	             			//filters+=$($(divs[i]).find("input[type=checkbox]")).prop("checked").trim()+"\n";
	    	             		}
    	             		}
    	             	}
    	            // }
    	             return $("#FormDisplayName").val()+" :   "+filters;
    	         },
    	         text : '<i class="fa fa-file-excel-o"> Export Excel</i>'
    	        },
    	        {
    	        	extend : 'pdfHtml5',             
    	            title : function() {
    	                return $("#FormDisplayName").val();
    	            },  
    	            
    	            exportOptions: {
    	                stripNewlines: true
    	            },
    	            /*pageSize : 'Legal',  */        
    	            orientation : 'portrait',              
    	            text : '<i class="fa fa-file-pdf-o"> Export PDF</i>',
    	            titleAttr : 'PDF',
    	            customize : function(doc) { 
    	            	//doc.pageMargins = [20, 40, 20,40 ];
    	            	doc.defaultStyle.alignment='center';
    	            	doc.defaultStyle.fontSize=reportfontsize;
    	            	doc.content[1].table.dontBreakRows = true;
    	            	doc.content[1].table.keepWithHeaderRows = true;
    	            	
    	            	var tableth=$("#example2 thead").find("th").length;
    	            	var widthjsonarr=[];
    	            	for(var i=0;i<tablecoljsonwidth.length;i++)
    	            	{
    	            		widthjsonarr[i]=tablecoljsonwidth[i].width;
    	            		
    	            	}

    	            	var allrows=doc.content[1].table.body;	            		            	
    	            	
    	            	for(var rows=0;rows<allrows.length;rows++)
    	            	{
    	            	   var rowdata=doc.content[1].table.body[rows];
    	            	   
    	            	   for(var tds=0;tds<rowdata.length;tds++)
    		            	{
    	            		   //doc.content[1].table.body[rows][tds].text=doc.content[1].table.body[rows][tds].text.replace(/\s\s+/g, '\n');
      	            		  
    	            		   var datavalue=doc.content[1].table.body[rows][tds].text;
    	            		   var splitdata=datavalue.split("  ");
    	            		   console.log(splitdata);
    	            		   var datavals="";
    	            		   for(var i=0;i<splitdata.length;i++)
    	            		   {
    	            		   if(datavals=="")
    	            			   datavals=datavals+splitdata[i];
    	            			   //datavals=datavals+"\n"+splitdata[i];
    	            		   else
    	            			   datavals=datavals+"\n"+splitdata[i];
    	            		   }
    	            		   
    	            		   doc.content[1].table.body[rows][tds].text=datavals;

    	            		   if(rows>0&&$($($("#example2 tbody tr")[rows-1]).find("td")[tds]).find("img").length>0)
    	            		    {	  
    	            			   var rowdataval=doc.content[1].table.body[rows];
    	            			   doc.content[1].table.body[rows].splice(tds,1);	            			  
    	            			   var rowdatavals=[];	            			  
    	            			   var docrows=0;
    	            			   var docrowsval=0;
    	            			   console.log(doc.content[1].table.body[rows]);
    	            			   while(docrows<rowdataval.length+1)
    	   		            	   {
    	            				   if(docrows==tds)
    	            					   {
    	            					   rowdatavals.push({image:$($($("#example2 tbody tr")[rows-1]).find("td")[tds]).find("img").attr("src"),width:50});  
    	            					   docrows=docrows+1;
    	            					   }
    	            				   else
    	            					   {
    	            					   rowdatavals.push(rowdataval[docrowsval]);  
    	            					   docrows=docrows+1;
    	            					   docrowsval=docrowsval+1;
    	            					   }
    	   		            	   }
    	            			   doc.content[1].table.body[rows]=rowdatavals;
                                   	            				  
    	            			 }
    	            		   else
    	            		   {
    	            			   
    	            			  // doc.content[1].table.body[rows][tds].text=doc.content[1].table.body[rows][tds].text.replace(/\s\s+/g, '\n');
    	            			   var datavalue=doc.content[1].table.body[rows][tds].text;
        	            		   var splitdata=datavalue.split("  ");
        	            		   console.log(splitdata);
        	            		   var datavals="";
        	            		   for(var i=0;i<splitdata.length;i++)
        	            		   {
        	            		   if(datavals=="")
        	            			   datavals=datavals+splitdata[i];
        	            			   //datavals=datavals+"\n"+splitdata[i];
        	            		   else
        	            			   datavals=datavals+"\n"+splitdata[i];
        	            		   }
        	            		   
        	            		   doc.content[1].table.body[rows][tds].text=datavals;

    	            		   }
    	            		   
    	            		    
    		            	}
    	            	   
    	            	}            	
    	                doc.content[1].table.widths =widthjsonarr;  
    	                var text="CENTRAL EXAMINATION ORGANISATION, OFFICE OF THE DIRECTOR GENERAL OF CIVIL AVIATION, RK PURAM,New Delhi";
    		            var filters="";  var filtersheader="";
    	               /* if($("button.btn-primary:visible").html().indexOf("Generate Report")>-1)
    	                {*/
    		            var divs=$(".group div:visible");
	                	for(var i=0;i<divs.length;i++)
	                	{
	                		var alignkey="";
	                		var aligndata="";
    	             		if($($(divs[i]).find("label:first")).html()!="undefined"&&$($(divs[i]).find("label:first")).html()!=undefined)
    	             		{
    	             			var alignvalue= $($(divs[i]).find("label:first")).attr("filterdata");
    	             			var align="";
    	             			var header="";
    	             			var fontsize="12";
    	             			var width1="0";
    	             			var colourdata="0";
    	             			var alignvaluearray=alignvalue.split("_");
    	             			align="left";
    	             			/*if(alignvaluearray[1]!=undefined)
    	             			{
    	             				fontsize=alignvaluearray[1];
    	             			}*/
    	             			if(alignvaluearray[2]!=undefined&&alignvaluearray[2]!="0")
    	             			{
    	             				width1=alignvaluearray[2];
    	             			}
    	             			if(alignvaluearray[3]!=undefined&&alignvaluearray[3]!="0")
    	             			{
    	             				colourdata=alignvaluearray[3];
    	             			}
    	             			/*alignkey=$($(divs[i]).find("label:first")).html();  */   
    	             			alignkey=$($(divs[i]).find("label:first"))[0].innerText.split("\n")[0];   
    	             			if($(divs[i]).find("input[type=text]").length>0)
	    	             		{
    	             				aligndata=$($(divs[i]).find("input")).val().trim();
	    	             		}
	    	             		if($(divs[i]).find("select").length>0)
	    	             		{
	    	             			aligndata=$($(divs[i]).find("select option:selected")).text().trim();
	    	    	             	
	    	             		}
	    	             		if($(divs[i]).find("input[type=checkbox]").length>0)
	    	             		{

	    	             			aligndata=$($(divs[i]).find("input[type=checkbox]:checked")).length;
	    	             			//filters+=$($(divs[i]).find("input[type=checkbox]")).prop("checked").trim();
	    	             		}
	    	             		if(filters=="")
	    	             		{
	    	             			if(width1=="0")
	    	             			{
	    	             				if(colourdata=="0")
    	    	             			{
	    	             					filters=filters+'{"alignment":"'+align+'","text":"'+alignkey.trim()+":"+aligndata+'","fontSize": '+fontsize+'}';
    	    	             			}
    	    	             			else
    	    	             			{
    	    	             				filters=filters+'{"alignment":"'+align+'","text":"'+alignkey.trim()+":"+aligndata+'","fontSize": '+fontsize+',"color": "'+colourdata+'"}';
    	    	    	             			
    	    	             			}
	    	             		   }
	    	             		   else
	    	             		   {
	    	             			if(colourdata=="0")
  	    	             			{
	    	             				filters=filters+'{"alignment":"'+align+'","text":"'+alignkey.trim()+":"+aligndata+'","fontSize": '+fontsize+',"width": '+width1+'}';
  	    	             			}
  	    	             			else
  	    	             			{
  	    	             				filters=filters+'{"alignment":"'+align+'","text":"'+alignkey.trim()+":"+aligndata+'","fontSize": '+fontsize+',"width": '+width1+',"color": "'+colourdata+'"}';
  	    	    	             			
  	    	             			}
	    	             		   }
	    	             		}
	    	             		else
	    	             		{
	    	             			if(width1=="0")
	    	             			{
	    	             				if(colourdata=="0")
    	    	             			{
	    	             					filters=filters+","+'{"alignment":"'+align+'","text":"'+alignkey.trim()+":"+aligndata+'","fontSize": '+fontsize+'}';
    	    	             			}
    	    	             			else
    	    	             			{
    	    	             				filters=filters+","+'{"alignment":"'+align+'","text":"'+alignkey.trim()+":"+aligndata+'","fontSize": '+fontsize+',"color": "'+colourdata+'"}';
    	    	    	             			
    	    	             			}
	    	             		   }
	    	             		   else
	    	             		   {
	    	             			if(colourdata=="0")
  	    	             			{
	    	             				filters=filters+","+'{"alignment":"'+align+'","text":"'+alignkey.trim()+":"+aligndata+'","fontSize": '+fontsize+',"width": '+width1+'}';
  	    	             			}
  	    	             			else
  	    	             			{
  	    	             				filters=filters+","+'{"alignment":"'+align+'","text":"'+alignkey.trim()+":"+aligndata+'","fontSize": '+fontsize+',"width": '+width1+',"color": "'+colourdata+'"}';
  	    	    	             			
  	    	             			}
	    	             		   }
	    	             		}
    	             		}
    	             		alignkey="";
	                		aligndata="";	             		
    	             		if($($(divs[i]).find("label:first")).html()!="undefined"&&$($(divs[i]).find("label:first")).html()!=undefined&&$($(divs[i]).find("label:first")).attr("filterdata")!="0")
    	             		{
    	             			var alignvalue= $($(divs[i]).find("label:first")).attr("filterdata");
    	             			var align="";
    	             			var header="";
    	             			var fontsize="10";
    	             			var width1="0";
    	             			var colourdata="0";
    	             			var alignvaluearray=alignvalue.split("_");
    	             			switch(alignvaluearray[0])
    	             			{
    	             			case "1":
    	             				align="left";
    	             				break;
    	             			case "2":
    	             				align="right";
    	             				break;
    	             			case "3":
    	             				align="center";
    	             				break; 
    	             			}
    	             			if(alignvaluearray[1]!=undefined)
    	             			{
    	             				fontsize=alignvaluearray[1];
    	             			}
    	             			if(alignvaluearray[2]!=undefined&&alignvaluearray[2]!="0")
    	             			{
    	             				width1=alignvaluearray[2];
    	             			}
    	             			if(alignvaluearray[3]!=undefined&&alignvaluearray[3]!="0")
    	             			{
    	             				colourdata=alignvaluearray[3];
    	             			}
    	             			/*alignkey=$($(divs[i]).find("label:first")).html();  */
    	             			alignkey=$($(divs[i]).find("label:first"))[0].innerText.split("\n")[0];   
    	             			if($(divs[i]).find("input[type=text]").length>0)
	    	             		{
    	             				aligndata=$($(divs[i]).find("input")).val().trim();
	    	             		}
	    	             		if($(divs[i]).find("select").length>0)
	    	             		{
	    	             			aligndata=$($(divs[i]).find("select option:selected")).text().trim();
	    	    	             	
	    	             		}
	    	             		if($(divs[i]).find("input[type=checkbox]").length>0)
	    	             		{

	    	             			aligndata=$($(divs[i]).find("input[type=checkbox]:checked")).length;
	    	             			//filters+=$($(divs[i]).find("input[type=checkbox]")).prop("checked").trim();
	    	             		}
	    	             		if(filtersheader=="")
	    	             		{
	    	             			if(width1=="0")
	    	             			{
	    	             				if(colourdata=="0")
    	    	             			{
    	    	             		    filtersheader=filtersheader+'{"alignment":"'+align+'","text":"'+alignkey.trim()+":"+aligndata+'","fontSize": '+fontsize+'}';
    	    	             			}
    	    	             			else
    	    	             			{
    	    	             			filtersheader=filtersheader+'{"alignment":"'+align+'","text":"'+alignkey.trim()+":"+aligndata+'","fontSize": '+fontsize+',"color": "'+colourdata+'"}';
    	    	    	             			
    	    	             			}
	    	             		   }
	    	             		   else
	    	             		   {
	    	             			if(colourdata=="0")
  	    	             			{
  	    	             		    filtersheader=filtersheader+'{"alignment":"'+align+'","text":"'+alignkey.trim()+":"+aligndata+'","fontSize": '+fontsize+',"width": '+width1+'}';
  	    	             			}
  	    	             			else
  	    	             			{
  	    	             			filtersheader=filtersheader+'{"alignment":"'+align+'","text":"'+alignkey.trim()+":"+aligndata+'","fontSize": '+fontsize+',"width": '+width1+',"color": "'+colourdata+'"}';
  	    	    	             			
  	    	             			}
	    	             		   }
	    	             		}
	    	             		else
	    	             		{
	    	             			if(width1=="0")
	    	             			{
	    	             				if(colourdata=="0")
    	    	             			{
    	    	             		    filtersheader=filtersheader+","+'{"alignment":"'+align+'","text":"'+alignkey.trim()+":"+aligndata+'","fontSize": '+fontsize+'}';
    	    	             			}
    	    	             			else
    	    	             			{
    	    	             			filtersheader=filtersheader+","+'{"alignment":"'+align+'","text":"'+alignkey.trim()+":"+aligndata+'","fontSize": '+fontsize+',"color": "'+colourdata+'"}';
    	    	    	             			
    	    	             			}
	    	             		   }
	    	             		   else
	    	             		   {
	    	             			if(colourdata=="0")
  	    	             			{
  	    	             		    filtersheader=filtersheader+","+'{"alignment":"'+align+'","text":"'+alignkey.trim()+":"+aligndata+'","fontSize": '+fontsize+',"width": '+width1+'}';
  	    	             			}
  	    	             			else
  	    	             			{
  	    	             			filtersheader=filtersheader+","+'{"alignment":"'+align+'","text":"'+alignkey.trim()+":"+aligndata+'","fontSize": '+fontsize+',"width": '+width1+',"color": "'+colourdata+'"}';
  	    	    	             			
  	    	             			}
	    	             		   }
	    	             		}
    	             		}
	                	//}
	                }
	                var filterheaderdata=$("#filterheaderdata").val();
	                if(!(Number.isInteger(parseInt(filterheaderdata.substring(0,1)))))
	                {
	                	filterheaderdata="0";
	                }
	                var filterheaderdatavalue="";
	                if(filterheaderdata!=undefined&&filterheaderdata!="0")
	                {
	                	var alignvalue= filterheaderdata;
             			var align="";
             			var header="";
             			var fontsize="10";
             			var width1="0";
             			var colourdata="0";
             			var alignvaluearray=alignvalue.split("_");
             			switch(alignvaluearray[0])
             			{
             			case "1":
             				align="left";
             				break;
             			case "2":
             				align="right";
             				break;
             			case "3":
             				align="center";
             				break; 
             			}
             			if(alignvaluearray[1]!=undefined)
             			{
             				fontsize=alignvaluearray[1];
             			}
             			if(alignvaluearray[2]!=undefined&&alignvaluearray[2]!="0")
             			{
             				width1=alignvaluearray[2];
             			}
             			if(alignvaluearray[3]!=undefined&&alignvaluearray[3]!="0")
             			{
             				colourdata=alignvaluearray[3];
             			}
             			aligndata=$("#FormHeader").val().trim();
             			if(width1=="0")
             			{
             				if(colourdata=="0")
	             			{
             					filterheaderdatavalue='{"alignment":"'+align+'","text":"'+aligndata+'","fontSize": '+fontsize+'}';
	             			}
	             			else
	             			{
	             				filterheaderdatavalue='{"alignment":"'+align+'","text":"'+aligndata+'","fontSize": '+fontsize+',"color": "'+colourdata+'"}';
	    	             			
	             			}
             		   }
             		   else
             		   {
             			if(colourdata=="0")
	             			{
             				filterheaderdatavalue='{"alignment":"'+align+'","text":"'+aligndata+'","fontSize": '+fontsize+',"width": '+width1+'}';
	             			}
	             			else
	             			{
	             			filterheaderdatavalue='{"alignment":"'+align+'","text":"'+aligndata+'","fontSize": '+fontsize+',"width": '+width1+',"color": "'+colourdata+'"}';
	    	             			
	             			}
             		   }	
	                }
	                
	                var filterdatajson=JSON.parse('{}');	
	                if(filterheaderdatavalue!="")
	                	{
	                	//[{"a":[{"a":"a"},{"a":"a"}]}]
	                	filterdatajson=JSON.parse('['+filterheaderdatavalue+","+filtersheader+']');
	                	}
	                else
	                	{
	                	filterdatajson=JSON.parse('['+filtersheader+']');
	                	}
	                // filters=JSON.parse('['+'{"text": "'+text+'","bold": true,"fontSize": 10,"color":"#13789b"},{"text":"'+$("#FormDisplayName").val()+'","bold": true,"fontSize": 18,"underline":true,"alignment":"center","color":"#2f687c"},'+filters+']');
	                if(filters!="")
                	{
	                	filters=JSON.parse('['+'{"text": "'+text+'","bold": true,"fontSize": 10,"color":"#13789b"},{"text":"'+$("#FormDisplayName").val()+'","bold": true,"fontSize": 18,"underline":true,"alignment":"center","color":"#2f687c"},'+filters+']');
                	}
                else
                	{
                	filters=JSON.parse('['+'{"text": "'+text+'","bold": true,"fontSize": 10,"color":"#13789b"},{"text":"'+$("#FormDisplayName").val()+'","bold": true,"fontSize": 18,"underline":true,"alignment":"center","color":"#2f687c"}'+']');
                	}

	                var margintopfont=0;
	                for(var i=0;i<filterdatajson.length;i++)
	                {
	                	var fontsize1=filterdatajson[i].fontSize;
	                	margintopfont=margintopfont+1.3*fontsize1;
	                }
	                margintopfont=parseInt(margintopfont+20);
	                doc.pageMargins = [20, margintopfont, 20,40 ];  
    	                var d = new Date();
    	                var month = d.getMonth()+1;
    	                var day = d.getDate();
    	                var output = d.toString().substring(0,d.toString().indexOf("GMT"))+"";
    	                if($("#PostType").val()=="AME1")
    	                {
    	                doc['footer']=(function(page, pages) {
    	                    return {
    	                        columns: [
    	                        	//output.substring(0,output.indexOf("GMT")),
    	                        	{	                               
    	                                alignment: 'left',
    	                                text: output
    	                            }
    	                        	,
    	                            {	                               
    	                                alignment: 'center',
    	                                text:  filters.replace(/\n/g,"    "),
    	                                bold: true
    	                            }
    	                        	,
    	                            
    	                            {	                               
    	                                alignment: 'right',
    	                                text: ['page ', { text: page.toString() },  ' of ', { text: pages.toString()+"  "+$("#FormDisplayName").val() }]
    	                            }
    	                        ],
    	                        margin: [20,0,10,10]
    	                    }
    	                });
    	                }
    	                else
    	                {
    	                	doc['footer']=(function(page, pages) {
        	                    return {
        	                        columns: [
        	                        	//output.substring(0,output.indexOf("GMT")),
        	                        	{	                               
        	                                alignment: 'left',
        	                                text: output
        	                            }
        	                        	,
        	                            
        	                            {	                               
        	                                alignment: 'right',
        	                                text: ['page ', { text: page.toString() },  ' of ', { text: pages.toString() }]
        	                            }
        	                        ],
        	                        margin: [20,0,10,10]
        	                    }
        	                });
    	                }
    	                doc['header']=(function(page, pages) {
    	            		if(page.toString()=="1")
    	            		{
    	            			return {  }
    	            		}
    	            		else
    	            		{
    	            		
    	                    return {
    	                    	
    	                        //columns:filterdatajson
    	                    	columns:[
							    //'first column is a simple text',
    	                    		filterdatajson
							  ],
    	                      margin: [20,10,20,100]
    	                    }
    	            		}
    	                });
    	                doc.content[0].text="";
    	                doc.content.splice(0, 1, {
    	                	columns:[
							    //'first column is a simple text',
	                    		filters] ,
    	                        margin: [0, (-margintopfont)+20, 0, 12],
    	                    //alignment: 'center'
    	                  });
    	                /*doc.content.splice(0, 1, {
    	                    text: [
    	                    {
    	                      text: text,
    	                      bold: true,
    	                      fontSize: 10,
    	                      color:'#13789b'
    	                    },
    	                    {
    	                        text:$("#FormDisplayName").val()+"\n",
    	                        bold: true,
    	                        fontSize: 18,
    	                        underline:true,
    	                        alignment:'center',
    	                        color:'#2f687c'
    	                      }
    	                    ,
    	                    {
    	                        text: filters,
    	                        bold: true,
    	                        fontSize: 12,
    	                        alignment:'left'
    	                      }
    	                    
    	                    ],
    	                    margin: [0, 0, 0, 12],
    	                    alignment: 'center'
    	                  });
*/    	            }
    	            
    	        }
    	    ]
    	} );}
    	
    }
    if(tablecolwidth==undefined)
    {
    	var reportorientation=$("#reportorientation").val();
    	if(reportorientation=="landscape")
    	{
    		
    		$('#example2').DataTable( {
    	    "aaSorting":[],
    	    dom: 'lBfrtip',
    	    //autoWidth:         true, 
    	    "pageLength":pagelengthval,
    	    
    	    paging:         true, 
    	    destroy: true,
    	    buttons: [{
    	    	extend : 'excel',
    	    	 title : function() {
    	    		 var filters="";  var filtersheader="";
    	             /*if($("button.btn-primary:visible").html().indexOf("Generate Report")>-1)
    	             {*/
    	             	var divs=$(".group div:visible");
    	             	for(var i=0;i<divs.length;i++)
    	             	{
    	             		
    	             		if($($(divs[i]).find("label:first")).html()!="undefined"&&$($(divs[i]).find("label:first")).html()!=undefined){
    	             			filters+=$($(divs[i]).find("label:first"))[0].innerText.split("\n")[0];
	    	             		if($(divs[i]).find("input[type=text]").length>0)
	    	             		{
	    	             			filters+=" : "+$($(divs[i]).find("input")).val().trim()+"\n";
	    	             		}
	    	             		if($(divs[i]).find("select").length>0)
	    	             		{
	    	             			filters+=" : "+$($(divs[i]).find("select option:selected")).text().trim()+"\n";
	    	    	             	
	    	             		}
	    	             		if($(divs[i]).find("input[type=checkbox]").length>0)
	    	             		{

	    	             			filters+=" : "+$($(divs[i]).find("input[type=checkbox]:checked")).length+"\n";
	    	             			//filters+=$($(divs[i]).find("input[type=checkbox]")).prop("checked").trim()+"\n";
	    	             		}
    	             		}
    	             		if($($(divs[i]).find("label:first")).html()!="undefined"&&$($(divs[i]).find("label:first")).html()!=undefined&&$($(divs[i]).find("label:first")).attr("filterdata")=="1"){
    	             			/*filtersheader+=$($(divs[i]).find("label:first")).html();*/
    	             			filtersheader+=$($(divs[i]).find("label:first"))[0].innerText.split("\n")[0];
	    	             		if($(divs[i]).find("input[type=text]").length>0)
	    	             		{
	    	             			filtersheader+=" : "+$($(divs[i]).find("input")).val().trim()+"\n";
	    	             		}
	    	             		if($(divs[i]).find("select").length>0)
	    	             		{
	    	             			filtersheader+=" : "+$($(divs[i]).find("select option:selected")).text().trim()+"\n";
	    	    	             	
	    	             		}
	    	             		if($(divs[i]).find("input[type=checkbox]").length>0)
	    	             		{

	    	             			filtersheader+=" : "+$($(divs[i]).find("input[type=checkbox]:checked")).length+"\n";
	    	             			//filters+=$($(divs[i]).find("input[type=checkbox]")).prop("checked").trim()+"\n";
	    	             		}
    	             		}
    	             	}
    	            // }
    	             return $("#FormDisplayName").val()+" :   "+filters;
    	         },
    	         text : '<i class="fa fa-file-excel-o"> Export Excel</i>'
    	        },
    	        {
    	        	extend : 'pdfHtml5',             
    	            title : function() {
    	                return $("#FormDisplayName").val();
    	            },   
    	            
    	            exportOptions: {
    	                stripNewlines: true
    	            },
    	            /*pageSize : 'Legal',  */        
    	            orientation : 'landscape',              
    	            text : '<i class="fa fa-file-pdf-o"> Export PDF</i>',
    	            titleAttr : 'PDF',
    	            customize : function(doc) { 
    	            	//doc.pageMargins = [20, 40, 20,40 ];
    	            	doc.defaultStyle.fontSize=reportfontsize;
    	            	doc.defaultStyle.alignment='center';
    	            	doc.content[1].table.dontBreakRows = true;
    	            	doc.content[1].table.keepWithHeaderRows = true;
    	            	
    	            	var tableth=$("#example2 thead").find("th").length;
    	            	/*var tablecolwidth=parseInt(100/tableth);
    	            	var widtharr=[];
    	            	for(var i=0;i<tableth;i++)
    	            	{
    	            		widtharr[i]=tablecolwidth+"%";
    	            	}*/
    	            	var allrows=doc.content[1].table.body;	            		            	
    	            	
    	            	for(var rows=0;rows<allrows.length;rows++)
    	            	{
    	            	   var rowdata=doc.content[1].table.body[rows];
    	            	   
    	            	   for(var tds=0;tds<rowdata.length;tds++)
    		            	{
    	            		  // doc.content[1].table.body[rows][tds].text=doc.content[1].table.body[rows][tds].text.replace(/\s\s+/g, '\n');
    	            		   var datavalue=doc.content[1].table.body[rows][tds].text;
    	            		   var splitdata=datavalue.split("  ");
    	            		   console.log(splitdata);
    	            		   var datavals="";
    	            		   for(var i=0;i<splitdata.length;i++)
    	            		   {
    	            		   if(datavals=="")
    	            			   datavals=datavals+splitdata[i];
    	            			   //datavals=datavals+"\n"+splitdata[i];
    	            		   else
    	            			   datavals=datavals+"\n"+splitdata[i];
    	            		   }
    	            		   
    	            		   doc.content[1].table.body[rows][tds].text=datavals;

    	            		   if(rows>0&&$($($("#example2 tbody tr")[rows-1]).find("td")[tds]).find("img").length>0)
    	            		    {	  
    	            			   var rowdataval=doc.content[1].table.body[rows];
    	            			   doc.content[1].table.body[rows].splice(tds,1);	            			  
    	            			   var rowdatavals=[];	            			  
    	            			   var docrows=0;
    	            			   var docrowsval=0;
    	            			   console.log(doc.content[1].table.body[rows]);
    	            			   while(docrows<rowdataval.length+1)
    	   		            	   {
    	            				   if(docrows==tds)
    	            					   {
    	            					   rowdatavals.push({image:$($($("#example2 tbody tr")[rows-1]).find("td")[tds]).find("img").attr("src"),width:100});  
    	            					   docrows=docrows+1;
    	            					   }
    	            				   else
    	            					   {
    	            					   rowdatavals.push(rowdataval[docrowsval]);  
    	            					   docrows=docrows+1;
    	            					   docrowsval=docrowsval+1;
    	            					   }
    	   		            	   }
    	            			   doc.content[1].table.body[rows]=rowdatavals;
                                   	            				  
    	            			 }	            			  	            			   
    	            		   else
    	            		   {
    	            			   
    	            			   //doc.content[1].table.body[rows][tds].text=doc.content[1].table.body[rows][tds].text.replace(/\s\s+/g, '\n');
    	            			   var datavalue=doc.content[1].table.body[rows][tds].text;
        	            		   var splitdata=datavalue.split("  ");
        	            		   console.log(splitdata);
        	            		   var datavals="";
        	            		   for(var i=0;i<splitdata.length;i++)
        	            		   {
        	            		   if(datavals=="")
        	            			  // datavals=datavals+"\n"+splitdata[i];
        	            			   datavals=datavals+splitdata[i];
        	            		   else
        	            			   datavals=datavals+"\n"+splitdata[i];
        	            		   }
        	            		   
        	            		   doc.content[1].table.body[rows][tds].text=datavals;

    	            		   }
    		            	}
    	            	   
    	            	}            	
    	                // doc.content[1].table.widths =widtharr;  
    	                var text="CENTRAL EXAMINATION ORGANISATION, OFFICE OF THE DIRECTOR GENERAL OF CIVIL AVIATION, RK PURAM,New Delhi";
    	                var filters="";  var filtersheader="";
    	               /* if($("button.btn-primary:visible").html().indexOf("Generate Report")>-1)
    	                {*/
    	                var divs=$(".group div:visible");
	                	for(var i=0;i<divs.length;i++)
	                	{
	                		var alignkey="";
	                		var aligndata="";
    	             		if($($(divs[i]).find("label:first")).html()!="undefined"&&$($(divs[i]).find("label:first")).html()!=undefined)
    	             		{
    	             			var alignvalue= $($(divs[i]).find("label:first")).attr("filterdata");
    	             			var align="";
    	             			var header="";
    	             			var fontsize="12";
    	             			var width1="0";
    	             			var colourdata="0";
    	             			var alignvaluearray=alignvalue.split("_");
    	             			align="left";
    	             			/*if(alignvaluearray[1]!=undefined)
    	             			{
    	             				fontsize=alignvaluearray[1];
    	             			}*/
    	             			if(alignvaluearray[2]!=undefined&&alignvaluearray[2]!="0")
    	             			{
    	             				width1=alignvaluearray[2];
    	             			}
    	             			if(alignvaluearray[3]!=undefined&&alignvaluearray[3]!="0")
    	             			{
    	             				colourdata=alignvaluearray[3];
    	             			}
    	             			/*alignkey=$($(divs[i]).find("label:first")).html();  */
    	             			alignkey=$($(divs[i]).find("label:first"))[0].innerText.split("\n")[0];   
    	             			if($(divs[i]).find("input[type=text]").length>0)
	    	             		{
    	             				aligndata=$($(divs[i]).find("input")).val().trim();
	    	             		}
	    	             		if($(divs[i]).find("select").length>0)
	    	             		{
	    	             			aligndata=$($(divs[i]).find("select option:selected")).text().trim();
	    	    	             	
	    	             		}
	    	             		if($(divs[i]).find("input[type=checkbox]").length>0)
	    	             		{

	    	             			aligndata=$($(divs[i]).find("input[type=checkbox]:checked")).length;
	    	             			//filters+=$($(divs[i]).find("input[type=checkbox]")).prop("checked").trim();
	    	             		}
	    	             		if(filters=="")
	    	             		{
	    	             			if(width1=="0")
	    	             			{
	    	             				if(colourdata=="0")
    	    	             			{
	    	             					filters=filters+'{"alignment":"'+align+'","text":"'+alignkey.trim()+":"+aligndata+'","fontSize": '+fontsize+'}';
    	    	             			}
    	    	             			else
    	    	             			{
    	    	             				filters=filters+'{"alignment":"'+align+'","text":"'+alignkey.trim()+":"+aligndata+'","fontSize": '+fontsize+',"color": "'+colourdata+'"}';
    	    	    	             			
    	    	             			}
	    	             		   }
	    	             		   else
	    	             		   {
	    	             			if(colourdata=="0")
  	    	             			{
	    	             				filters=filters+'{"alignment":"'+align+'","text":"'+alignkey.trim()+":"+aligndata+'","fontSize": '+fontsize+',"width": '+width1+'}';
  	    	             			}
  	    	             			else
  	    	             			{
  	    	             				filters=filters+'{"alignment":"'+align+'","text":"'+alignkey.trim()+":"+aligndata+'","fontSize": '+fontsize+',"width": '+width1+',"color": "'+colourdata+'"}';
  	    	    	             			
  	    	             			}
	    	             		   }
	    	             		}
	    	             		else
	    	             		{
	    	             			if(width1=="0")
	    	             			{
	    	             				if(colourdata=="0")
    	    	             			{
	    	             					filters=filters+","+'{"alignment":"'+align+'","text":"'+alignkey.trim()+":"+aligndata+'","fontSize": '+fontsize+'}';
    	    	             			}
    	    	             			else
    	    	             			{
    	    	             				filters=filters+","+'{"alignment":"'+align+'","text":"'+alignkey.trim()+":"+aligndata+'","fontSize": '+fontsize+',"color": "'+colourdata+'"}';
    	    	    	             			
    	    	             			}
	    	             		   }
	    	             		   else
	    	             		   {
	    	             			if(colourdata=="0")
  	    	             			{
	    	             				filters=filters+","+'{"alignment":"'+align+'","text":"'+alignkey.trim()+":"+aligndata+'","fontSize": '+fontsize+',"width": '+width1+'}';
  	    	             			}
  	    	             			else
  	    	             			{
  	    	             				filters=filters+","+'{"alignment":"'+align+'","text":"'+alignkey.trim()+":"+aligndata+'","fontSize": '+fontsize+',"width": '+width1+',"color": "'+colourdata+'"}';
  	    	    	             			
  	    	             			}
	    	             		   }
	    	             		}
    	             		}
    	             		alignkey="";
	                		aligndata="";	             		
    	             		if($($(divs[i]).find("label:first")).html()!="undefined"&&$($(divs[i]).find("label:first")).html()!=undefined&&$($(divs[i]).find("label:first")).attr("filterdata")!="0")
    	             		{
    	             			var alignvalue= $($(divs[i]).find("label:first")).attr("filterdata");
    	             			var align="";
    	             			var header="";
    	             			var fontsize="10";
    	             			var width1="0";
    	             			var colourdata="0";
    	             			var alignvaluearray=alignvalue.split("_");
    	             			switch(alignvaluearray[0])
    	             			{
    	             			case "1":
    	             				align="left";
    	             				break;
    	             			case "2":
    	             				align="right";
    	             				break;
    	             			case "3":
    	             				align="center";
    	             				break; 
    	             			}
    	             			if(alignvaluearray[1]!=undefined)
    	             			{
    	             				fontsize=alignvaluearray[1];
    	             			}
    	             			if(alignvaluearray[2]!=undefined&&alignvaluearray[2]!="0")
    	             			{
    	             				width1=alignvaluearray[2];
    	             			}
    	             			if(alignvaluearray[3]!=undefined&&alignvaluearray[3]!="0")
    	             			{
    	             				colourdata=alignvaluearray[3];
    	             			}
    	             			/*alignkey=$($(divs[i]).find("label:first")).html(); */     
    	             			alignkey=$($(divs[i]).find("label:first"))[0].innerText.split("\n")[0];   
    	             			if($(divs[i]).find("input[type=text]").length>0)
	    	             		{
    	             				aligndata=$($(divs[i]).find("input")).val().trim();
	    	             		}
	    	             		if($(divs[i]).find("select").length>0)
	    	             		{
	    	             			aligndata=$($(divs[i]).find("select option:selected")).text().trim();
	    	    	             	
	    	             		}
	    	             		if($(divs[i]).find("input[type=checkbox]").length>0)
	    	             		{

	    	             			aligndata=$($(divs[i]).find("input[type=checkbox]:checked")).length;
	    	             			//filters+=$($(divs[i]).find("input[type=checkbox]")).prop("checked").trim();
	    	             		}
	    	             		if(filtersheader=="")
	    	             		{
	    	             			if(width1=="0")
	    	             			{
	    	             				if(colourdata=="0")
    	    	             			{
    	    	             		    filtersheader=filtersheader+'{"alignment":"'+align+'","text":"'+alignkey.trim()+":"+aligndata+'","fontSize": '+fontsize+'}';
    	    	             			}
    	    	             			else
    	    	             			{
    	    	             			filtersheader=filtersheader+'{"alignment":"'+align+'","text":"'+alignkey.trim()+":"+aligndata+'","fontSize": '+fontsize+',"color": "'+colourdata+'"}';
    	    	    	             			
    	    	             			}
	    	             		   }
	    	             		   else
	    	             		   {
	    	             			if(colourdata=="0")
  	    	             			{
  	    	             		    filtersheader=filtersheader+'{"alignment":"'+align+'","text":"'+alignkey.trim()+":"+aligndata+'","fontSize": '+fontsize+',"width": '+width1+'}';
  	    	             			}
  	    	             			else
  	    	             			{
  	    	             			filtersheader=filtersheader+'{"alignment":"'+align+'","text":"'+alignkey.trim()+":"+aligndata+'","fontSize": '+fontsize+',"width": '+width1+',"color": "'+colourdata+'"}';
  	    	    	             			
  	    	             			}
	    	             		   }
	    	             		}
	    	             		else
	    	             		{
	    	             			if(width1=="0")
	    	             			{
	    	             				if(colourdata=="0")
    	    	             			{
    	    	             		    filtersheader=filtersheader+","+'{"alignment":"'+align+'","text":"'+alignkey.trim()+":"+aligndata+'","fontSize": '+fontsize+'}';
    	    	             			}
    	    	             			else
    	    	             			{
    	    	             			filtersheader=filtersheader+","+'{"alignment":"'+align+'","text":"'+alignkey.trim()+":"+aligndata+'","fontSize": '+fontsize+',"color": "'+colourdata+'"}';
    	    	    	             			
    	    	             			}
	    	             		   }
	    	             		   else
	    	             		   {
	    	             			if(colourdata=="0")
  	    	             			{
  	    	             		    filtersheader=filtersheader+","+'{"alignment":"'+align+'","text":"'+alignkey.trim()+":"+aligndata+'","fontSize": '+fontsize+',"width": '+width1+'}';
  	    	             			}
  	    	             			else
  	    	             			{
  	    	             			filtersheader=filtersheader+","+'{"alignment":"'+align+'","text":"'+alignkey.trim()+":"+aligndata+'","fontSize": '+fontsize+',"width": '+width1+',"color": "'+colourdata+'"}';
  	    	    	             			
  	    	             			}
	    	             		   }
	    	             		}
    	             		}
	                	//}
	                }
	                var filterheaderdata=$("#filterheaderdata").val();
	                if(!(Number.isInteger(parseInt(filterheaderdata.substring(0,1)))))
	                {
	                	filterheaderdata="0";
	                }
	                var filterheaderdatavalue="";
	                if(filterheaderdata!=undefined&&filterheaderdata!="0")
	                {
	                	var alignvalue= filterheaderdata;
             			var align="";
             			var header="";
             			var fontsize="10";
             			var width1="0";
             			var colourdata="0";
             			var alignvaluearray=alignvalue.split("_");
             			switch(alignvaluearray[0])
             			{
             			case "1":
             				align="left";
             				break;
             			case "2":
             				align="right";
             				break;
             			case "3":
             				align="center";
             				break; 
             			}
             			if(alignvaluearray[1]!=undefined)
             			{
             				fontsize=alignvaluearray[1];
             			}
             			if(alignvaluearray[2]!=undefined&&alignvaluearray[2]!="0")
             			{
             				width1=alignvaluearray[2];
             			}
             			if(alignvaluearray[3]!=undefined&&alignvaluearray[3]!="0")
             			{
             				colourdata=alignvaluearray[3];
             			}
             			aligndata=$("#FormHeader").val().trim();
             			if(width1=="0")
             			{
             				if(colourdata=="0")
	             			{
             					filterheaderdatavalue='{"alignment":"'+align+'","text":"'+aligndata+'","fontSize": '+fontsize+'}';
	             			}
	             			else
	             			{
	             				filterheaderdatavalue='{"alignment":"'+align+'","text":"'+aligndata+'","fontSize": '+fontsize+',"color": "'+colourdata+'"}';
	    	             			
	             			}
             		   }
             		   else
             		   {
             			if(colourdata=="0")
	             			{
             				filterheaderdatavalue='{"alignment":"'+align+'","text":"'+aligndata+'","fontSize": '+fontsize+',"width": '+width1+'}';
	             			}
	             			else
	             			{
	             			filterheaderdatavalue='{"alignment":"'+align+'","text":"'+aligndata+'","fontSize": '+fontsize+',"width": '+width1+',"color": "'+colourdata+'"}';
	    	             			
	             			}
             		   }	
	                }
	                
	                var filterdatajson=JSON.parse('{}');	
	                if(filterheaderdatavalue!="")
	                	{
	                	//[{"a":[{"a":"a"},{"a":"a"}]}]
	                	filterdatajson=JSON.parse('['+filterheaderdatavalue+","+filtersheader+']');
	                	}
	                else
	                	{
	                	filterdatajson=JSON.parse('['+filtersheader+']');
	                	}
	                // filters=JSON.parse('['+'{"text": "'+text+'","bold": true,"fontSize": 10,"color":"#13789b"},{"text":"'+$("#FormDisplayName").val()+'","bold": true,"fontSize": 18,"underline":true,"alignment":"center","color":"#2f687c"},'+filters+']');
	                if(filters!="")
                	{
	                	filters=JSON.parse('['+'{"text": "'+text+'","bold": true,"fontSize": 10,"color":"#13789b"},{"text":"'+$("#FormDisplayName").val()+'","bold": true,"fontSize": 18,"underline":true,"alignment":"center","color":"#2f687c"},'+filters+']');
                	}
                else
                	{
                	filters=JSON.parse('['+'{"text": "'+text+'","bold": true,"fontSize": 10,"color":"#13789b"},{"text":"'+$("#FormDisplayName").val()+'","bold": true,"fontSize": 18,"underline":true,"alignment":"center","color":"#2f687c"}'+']');
                	}

	                var margintopfont=0;
	                for(var i=0;i<filterdatajson.length;i++)
	                {
	                	var fontsize1=filterdatajson[i].fontSize;
	                	margintopfont=margintopfont+1.3*fontsize1;
	                }
	                margintopfont=parseInt(margintopfont+20);
	                doc.pageMargins = [20, margintopfont, 20,40 ];      	                	
    	                var d = new Date();
    	                var month = d.getMonth()+1;
    	                var day = d.getDate();
    	                var output = d.toString().substring(0,d.toString().indexOf("GMT"))+"";
    	                if($("#PostType").val()=="AME1")
    	                {
    	                doc['footer']=(function(page, pages) {
    	                    return {
    	                        columns: [
    	                        	//output.substring(0,output.indexOf("GMT")),
    	                        	{	                               
    	                                alignment: 'left',
    	                                text: output
    	                            }
    	                        	,
    	                            {	                               
    	                                alignment: 'center',
    	                                text:  filters.replace(/\n/g,"    "),
    	                                bold: true
    	                            }
    	                        	,
    	                            
    	                            {	                               
    	                                alignment: 'right',
    	                                text: ['page ', { text: page.toString() },  ' of ', { text: pages.toString()+"  "+$("#FormDisplayName").val() }]
    	                            }
    	                        ],
    	                        margin: [20,0,10,10]
    	                    }
    	                });
    	                }
    	                else
    	                {
    	                	doc['footer']=(function(page, pages) {
        	                    return {
        	                        columns: [
        	                        	//output.substring(0,output.indexOf("GMT")),
        	                        	{	                               
        	                                alignment: 'left',
        	                                text: output
        	                            }
        	                        	,
        	                            
        	                            {	                               
        	                                alignment: 'right',
        	                                text: ['page ', { text: page.toString() },  ' of ', { text: pages.toString() }]
        	                            }
        	                        ],
        	                        margin: [20,0,10,10]
        	                    }
        	                });
    	                }
    	                doc['header']=(function(page, pages) {
    	            		if(page.toString()=="1")
    	            		{
    	            			return {  }
    	            		}
    	            		else
    	            		{
    	            		
    	                    return {
    	                    	
    	                        //columns:filterdatajson
    	                    	columns:[
							    //'first column is a simple text',
    	                    		filterdatajson
							  ],
    	                      margin: [20,10,20,100]
    	                    }
    	            		}
    	                });
    	                doc.content[0].text="";
    	                doc.content.splice(0, 1, {
    	                	columns:[
							    //'first column is a simple text',
	                    		filters] ,
    	                        margin: [0, (-margintopfont)+20, 0, 12],
    	                    //alignment: 'center'
    	                  });
    	                /*doc.content.splice(0, 1, {
    	                    text: [
    	                    {
    	                      text: text,
    	                      bold: true,
    	                      fontSize: 10,
    	                      color:'#13789b'
    	                    },
    	                    {
    	                        text:$("#FormDisplayName").val()+"\n",
    	                        bold: true,
    	                        fontSize: 18,
    	                        underline:true,
    	                        alignment:'center',
    	                        color:'#2f687c'
    	                      }
    	                    ,
    	                    {
    	                        text: filters,
    	                        bold: true,
    	                        fontSize: 12,
    	                        alignment:'left'
    	                      }
    	                    
    	                    ],
    	                    margin: [0, 0, 0, 12],
    	                    alignment: 'center'
    	                  });*/
    	            }
    	            
    	        }
    	    ]
    	} );}
    	else{$('#example2').DataTable( {
    	    "aaSorting":[],
    	    "pageLength":pagelengthval,
    	    
    	    dom: 'lBfrtip',
    	    destroy: true,
    	    buttons: [{
    	    	extend : 'excel',
    	    	 title : function() {
    	    		 var filters="";  var filtersheader="";
    	             /*if($("button.btn-primary:visible").html().indexOf("Generate Report")>-1)
    	             {*/
    	             	var divs=$(".group div:visible");
    	             	for(var i=0;i<divs.length;i++)
    	             	{
    	             		
    	             		if($($(divs[i]).find("label:first")).html()!="undefined"&&$($(divs[i]).find("label:first")).html()!=undefined){
    	             			filters+=$($(divs[i]).find("label:first"))[0].innerText.split("\n")[0];
	    	             		if($(divs[i]).find("input[type=text]").length>0)
	    	             		{
	    	             			filters+=" : "+$($(divs[i]).find("input")).val().trim()+"\n";
	    	             		}
	    	             		if($(divs[i]).find("select").length>0)
	    	             		{
	    	             			filters+=" : "+$($(divs[i]).find("select option:selected")).text().trim()+"\n";
	    	    	             	
	    	             		}
	    	             		if($(divs[i]).find("input[type=checkbox]").length>0)
	    	             		{

	    	             			filters+=" : "+$($(divs[i]).find("input[type=checkbox]:checked")).length+"\n";
	    	             			//filters+=$($(divs[i]).find("input[type=checkbox]")).prop("checked").trim()+"\n";
	    	             		}
    	             		}
    	             		if($($(divs[i]).find("label:first")).html()!="undefined"&&$($(divs[i]).find("label:first")).html()!=undefined&&$($(divs[i]).find("label:first")).attr("filterdata")=="1"){
    	             			/*filtersheader+=$($(divs[i]).find("label:first")).html();*/
    	             			filtersheader+=$($(divs[i]).find("label:first"))[0].innerText.split("\n")[0];
	    	             		if($(divs[i]).find("input[type=text]").length>0)
	    	             		{
	    	             			filtersheader+=" : "+$($(divs[i]).find("input")).val().trim()+"\n";
	    	             		}
	    	             		if($(divs[i]).find("select").length>0)
	    	             		{
	    	             			filtersheader+=" : "+$($(divs[i]).find("select option:selected")).text().trim()+"\n";
	    	    	             	
	    	             		}
	    	             		if($(divs[i]).find("input[type=checkbox]").length>0)
	    	             		{

	    	             			filtersheader+=" : "+$($(divs[i]).find("input[type=checkbox]:checked")).length+"\n";
	    	             			//filters+=$($(divs[i]).find("input[type=checkbox]")).prop("checked").trim()+"\n";
	    	             		}
    	             		}
    	             	}
    	            // }
    	             return $("#FormDisplayName").val()+" :   "+filters;
    	         },
    	         text : '<i class="fa fa-file-excel-o"> Export Excel</i>'
    	        },
    	        {
    	        	extend : 'pdfHtml5',             
    	            title : function() {
    	                return $("#FormDisplayName").val();
    	            },     
    	            
    	            exportOptions: {
    	                stripNewlines: true
    	            },
    	            /*pageSize : 'Legal',  */        
    	            orientation : 'portrait',              
    	            text : '<i class="fa fa-file-pdf-o"> Export PDF</i>',
    	            titleAttr : 'PDF',
    	            customize : function(doc) { 
    	            	//doc.pageMargins = [20, 40, 20,40 ];
    	            	doc.defaultStyle.fontSize=reportfontsize;
    	            	doc.defaultStyle.alignment='center';
    	            	doc.content[1].table.dontBreakRows = true;
    	            	doc.content[1].table.keepWithHeaderRows = true;
    	            	
    	            	var tableth=$("#example2 thead").find("th").length;
    	            	/*var tablecolwidth=parseInt(100/tableth);
    	            	var widtharr=[];
    	            	for(var i=0;i<tableth;i++)
    	            	{
    	            		widtharr[i]=tablecolwidth+"%";
    	            	}
    	            	*/
    	            	var allrows=doc.content[1].table.body;	            		            	
    	            	
    	            	for(var rows=0;rows<allrows.length;rows++)
    	            	{
    	            	   var rowdata=doc.content[1].table.body[rows];
    	            	   
    	            	   for(var tds=0;tds<rowdata.length;tds++)
    		            	{
    	            		   //doc.content[1].table.body[rows][tds].text=doc.content[1].table.body[rows][tds].text.replace(/\s\s+/g, '\n');
    	            		   var datavalue=doc.content[1].table.body[rows][tds].text;
    	            		   var splitdata=datavalue.split("  ");
    	            		   console.log(splitdata);
    	            		   var datavals="";
    	            		   for(var i=0;i<splitdata.length;i++)
    	            		   {
    	            		   if(datavals=="")
    	            			   datavals=datavals+splitdata[i];
    	            			   //datavals=datavals+"\n"+splitdata[i];
    	            		   else
    	            			   datavals=datavals+"\n"+splitdata[i];
    	            		   }
    	            		   
    	            		   doc.content[1].table.body[rows][tds].text=datavals;

    	            		   if(rows>0&&$($($("#example2 tbody tr")[rows-1]).find("td")[tds]).find("img").length>0)
    	            		    {	  
    	            			   var rowdataval=doc.content[1].table.body[rows];
    	            			   doc.content[1].table.body[rows].splice(tds,1);	            			  
    	            			   var rowdatavals=[];	            			  
    	            			   var docrows=0;
    	            			   var docrowsval=0;
    	            			   console.log(doc.content[1].table.body[rows]);
    	            			   while(docrows<rowdataval.length+1)
    	   		            	   {
    	            				   if(docrows==tds)
    	            					   {
    	            					   rowdatavals.push({image:$($($("#example2 tbody tr")[rows-1]).find("td")[tds]).find("img").attr("src"),width:100});  
    	            					   docrows=docrows+1;
    	            					   }
    	            				   else
    	            					   {
    	            					   rowdatavals.push(rowdataval[docrowsval]);  
    	            					   docrows=docrows+1;
    	            					   docrowsval=docrowsval+1;
    	            					   }
    	   		            	   }
    	            			   doc.content[1].table.body[rows]=rowdatavals;
                                   	            				  
    	            			 }
    	            		   else
    	            		   {
    	            			   
    	            			   //doc.content[1].table.body[rows][tds].text=doc.content[1].table.body[rows][tds].text.replace(/\s\s+/g, '\n');
    	            			   var datavalue=doc.content[1].table.body[rows][tds].text;
        	            		   var splitdata=datavalue.split("  ");
        	            		   console.log(splitdata);
        	            		   var datavals="";
        	            		   for(var i=0;i<splitdata.length;i++)
        	            		   {
        	            		   if(datavals=="")
        	            			   //datavals=datavals+"\n"+splitdata[i];
        	            			   datavals=datavals+splitdata[i];
        	            		   else
        	            			   datavals=datavals+"\n"+splitdata[i];
        	            		   }
        	            		   
        	            		   doc.content[1].table.body[rows][tds].text=datavals;

    	            		   }
    	            		    
    		            	}
    	            	   
    	            	}            	
    	                // doc.content[1].table.widths =widtharr;  
    	                var text="CENTRAL EXAMINATION ORGANISATION, OFFICE OF THE DIRECTOR GENERAL OF CIVIL AVIATION, RK PURAM,New Delhi";
    		            var filters="";  var filtersheader="";
    	               /* if($("button.btn-primary:visible").html().indexOf("Generate Report")>-1)
    	                {*/
    		            var divs=$(".group div:visible");
	                	for(var i=0;i<divs.length;i++)
	                	{
	                		var alignkey="";
	                		var aligndata="";
    	             		if($($(divs[i]).find("label:first")).html()!="undefined"&&$($(divs[i]).find("label:first")).html()!=undefined)
    	             		{
    	             			var alignvalue= $($(divs[i]).find("label:first")).attr("filterdata");
    	             			var align="";
    	             			var header="";
    	             			var fontsize="12";
    	             			var width1="0";
    	             			var colourdata="0";
    	             			var alignvaluearray=alignvalue.split("_");
    	             			align="left";
    	             			/*if(alignvaluearray[1]!=undefined)
    	             			{
    	             				fontsize=alignvaluearray[1];
    	             			}*/
    	             			if(alignvaluearray[2]!=undefined&&alignvaluearray[2]!="0")
    	             			{
    	             				width1=alignvaluearray[2];
    	             			}
    	             			if(alignvaluearray[3]!=undefined&&alignvaluearray[3]!="0")
    	             			{
    	             				colourdata=alignvaluearray[3];
    	             			}
    	             			/*alignkey=$($(divs[i]).find("label:first")).html(); */    
    	             			alignkey=$($(divs[i]).find("label:first"))[0].innerText.split("\n")[0];   
    	             			if($(divs[i]).find("input[type=text]").length>0)
	    	             		{
    	             				aligndata=$($(divs[i]).find("input")).val().trim();
	    	             		}
	    	             		if($(divs[i]).find("select").length>0)
	    	             		{
	    	             			aligndata=$($(divs[i]).find("select option:selected")).text().trim();
	    	    	             	
	    	             		}
	    	             		if($(divs[i]).find("input[type=checkbox]").length>0)
	    	             		{

	    	             			aligndata=$($(divs[i]).find("input[type=checkbox]:checked")).length;
	    	             			//filters+=$($(divs[i]).find("input[type=checkbox]")).prop("checked").trim();
	    	             		}
	    	             		if(filters=="")
	    	             		{
	    	             			if(width1=="0")
	    	             			{
	    	             				if(colourdata=="0")
    	    	             			{
	    	             					filters=filters+'{"alignment":"'+align+'","text":"'+alignkey.trim()+":"+aligndata+'","fontSize": '+fontsize+'}';
    	    	             			}
    	    	             			else
    	    	             			{
    	    	             				filters=filters+'{"alignment":"'+align+'","text":"'+alignkey.trim()+":"+aligndata+'","fontSize": '+fontsize+',"color": "'+colourdata+'"}';
    	    	    	             			
    	    	             			}
	    	             		   }
	    	             		   else
	    	             		   {
	    	             			if(colourdata=="0")
  	    	             			{
	    	             				filters=filters+'{"alignment":"'+align+'","text":"'+alignkey.trim()+":"+aligndata+'","fontSize": '+fontsize+',"width": '+width1+'}';
  	    	             			}
  	    	             			else
  	    	             			{
  	    	             				filters=filters+'{"alignment":"'+align+'","text":"'+alignkey.trim()+":"+aligndata+'","fontSize": '+fontsize+',"width": '+width1+',"color": "'+colourdata+'"}';
  	    	    	             			
  	    	             			}
	    	             		   }
	    	             		}
	    	             		else
	    	             		{
	    	             			if(width1=="0")
	    	             			{
	    	             				if(colourdata=="0")
    	    	             			{
	    	             					filters=filters+","+'{"alignment":"'+align+'","text":"'+alignkey.trim()+":"+aligndata+'","fontSize": '+fontsize+'}';
    	    	             			}
    	    	             			else
    	    	             			{
    	    	             				filters=filters+","+'{"alignment":"'+align+'","text":"'+alignkey.trim()+":"+aligndata+'","fontSize": '+fontsize+',"color": "'+colourdata+'"}';
    	    	    	             			
    	    	             			}
	    	             		   }
	    	             		   else
	    	             		   {
	    	             			if(colourdata=="0")
  	    	             			{
	    	             				filters=filters+","+'{"alignment":"'+align+'","text":"'+alignkey.trim()+":"+aligndata+'","fontSize": '+fontsize+',"width": '+width1+'}';
  	    	             			}
  	    	             			else
  	    	             			{
  	    	             				filters=filters+","+'{"alignment":"'+align+'","text":"'+alignkey.trim()+":"+aligndata+'","fontSize": '+fontsize+',"width": '+width1+',"color": "'+colourdata+'"}';
  	    	    	             			
  	    	             			}
	    	             		   }
	    	             		}
    	             		}
    	             		alignkey="";
	                		aligndata="";	             		
    	             		if($($(divs[i]).find("label:first")).html()!="undefined"&&$($(divs[i]).find("label:first")).html()!=undefined&&$($(divs[i]).find("label:first")).attr("filterdata")!="0")
    	             		{
    	             			var alignvalue= $($(divs[i]).find("label:first")).attr("filterdata");
    	             			var align="";
    	             			var header="";
    	             			var fontsize="10";
    	             			var width1="0";
    	             			var colourdata="0";
    	             			var alignvaluearray=alignvalue.split("_");
    	             			switch(alignvaluearray[0])
    	             			{
    	             			case "1":
    	             				align="left";
    	             				break;
    	             			case "2":
    	             				align="right";
    	             				break;
    	             			case "3":
    	             				align="center";
    	             				break; 
    	             			}
    	             			if(alignvaluearray[1]!=undefined)
    	             			{
    	             				fontsize=alignvaluearray[1];
    	             			}
    	             			if(alignvaluearray[2]!=undefined&&alignvaluearray[2]!="0")
    	             			{
    	             				width1=alignvaluearray[2];
    	             			}
    	             			if(alignvaluearray[3]!=undefined&&alignvaluearray[3]!="0")
    	             			{
    	             				colourdata=alignvaluearray[3];
    	             			}
    	             			/*alignkey=$($(divs[i]).find("label:first")).html(); */
    	             			alignkey=$($(divs[i]).find("label:first"))[0].innerText.split("\n")[0];   
    	             			if($(divs[i]).find("input[type=text]").length>0)
	    	             		{
    	             				aligndata=$($(divs[i]).find("input")).val().trim();
	    	             		}
	    	             		if($(divs[i]).find("select").length>0)
	    	             		{
	    	             			aligndata=$($(divs[i]).find("select option:selected")).text().trim();
	    	    	             	
	    	             		}
	    	             		if($(divs[i]).find("input[type=checkbox]").length>0)
	    	             		{

	    	             			aligndata=$($(divs[i]).find("input[type=checkbox]:checked")).length;
	    	             			//filters+=$($(divs[i]).find("input[type=checkbox]")).prop("checked").trim();
	    	             		}
	    	             		if(filtersheader=="")
	    	             		{
	    	             			if(width1=="0")
	    	             			{
	    	             				if(colourdata=="0")
    	    	             			{
    	    	             		    filtersheader=filtersheader+'{"alignment":"'+align+'","text":"'+alignkey.trim()+":"+aligndata+'","fontSize": '+fontsize+'}';
    	    	             			}
    	    	             			else
    	    	             			{
    	    	             			filtersheader=filtersheader+'{"alignment":"'+align+'","text":"'+alignkey.trim()+":"+aligndata+'","fontSize": '+fontsize+',"color": "'+colourdata+'"}';
    	    	    	             			
    	    	             			}
	    	             		   }
	    	             		   else
	    	             		   {
	    	             			if(colourdata=="0")
  	    	             			{
  	    	             		    filtersheader=filtersheader+'{"alignment":"'+align+'","text":"'+alignkey.trim()+":"+aligndata+'","fontSize": '+fontsize+',"width": '+width1+'}';
  	    	             			}
  	    	             			else
  	    	             			{
  	    	             			filtersheader=filtersheader+'{"alignment":"'+align+'","text":"'+alignkey.trim()+":"+aligndata+'","fontSize": '+fontsize+',"width": '+width1+',"color": "'+colourdata+'"}';
  	    	    	             			
  	    	             			}
	    	             		   }
	    	             		}
	    	             		else
	    	             		{
	    	             			if(width1=="0")
	    	             			{
	    	             				if(colourdata=="0")
    	    	             			{
    	    	             		    filtersheader=filtersheader+","+'{"alignment":"'+align+'","text":"'+alignkey.trim()+":"+aligndata+'","fontSize": '+fontsize+'}';
    	    	             			}
    	    	             			else
    	    	             			{
    	    	             			filtersheader=filtersheader+","+'{"alignment":"'+align+'","text":"'+alignkey.trim()+":"+aligndata+'","fontSize": '+fontsize+',"color": "'+colourdata+'"}';
    	    	    	             			
    	    	             			}
	    	             		   }
	    	             		   else
	    	             		   {
	    	             			if(colourdata=="0")
  	    	             			{
  	    	             		    filtersheader=filtersheader+","+'{"alignment":"'+align+'","text":"'+alignkey.trim()+":"+aligndata+'","fontSize": '+fontsize+',"width": '+width1+'}';
  	    	             			}
  	    	             			else
  	    	             			{
  	    	             			filtersheader=filtersheader+","+'{"alignment":"'+align+'","text":"'+alignkey.trim()+":"+aligndata+'","fontSize": '+fontsize+',"width": '+width1+',"color": "'+colourdata+'"}';
  	    	    	             			
  	    	             			}
	    	             		   }
	    	             		}
    	             		}
	                	//}
	                }
	                var filterheaderdata=$("#filterheaderdata").val();
	                if(!(Number.isInteger(parseInt(filterheaderdata.substring(0,1)))))
	                {
	                	filterheaderdata="0";
	                }
	                var filterheaderdatavalue="";
	                if(filterheaderdata!=undefined&&filterheaderdata!="0")
	                {
	                	var alignvalue= filterheaderdata;
             			var align="";
             			var header="";
             			var fontsize="10";
             			var width1="0";
             			var colourdata="0";
             			var alignvaluearray=alignvalue.split("_");
             			switch(alignvaluearray[0])
             			{
             			case "1":
             				align="left";
             				break;
             			case "2":
             				align="right";
             				break;
             			case "3":
             				align="center";
             				break; 
             			}
             			if(alignvaluearray[1]!=undefined)
             			{
             				fontsize=alignvaluearray[1];
             			}
             			if(alignvaluearray[2]!=undefined&&alignvaluearray[2]!="0")
             			{
             				width1=alignvaluearray[2];
             			}
             			if(alignvaluearray[3]!=undefined&&alignvaluearray[3]!="0")
             			{
             				colourdata=alignvaluearray[3];
             			}
             			aligndata=$("#FormHeader").val().trim();
             			if(width1=="0")
             			{
             				if(colourdata=="0")
	             			{
             					filterheaderdatavalue='{"alignment":"'+align+'","text":"'+aligndata+'","fontSize": '+fontsize+'}';
	             			}
	             			else
	             			{
	             				filterheaderdatavalue='{"alignment":"'+align+'","text":"'+aligndata+'","fontSize": '+fontsize+',"color": "'+colourdata+'"}';
	    	             			
	             			}
             		   }
             		   else
             		   {
             			if(colourdata=="0")
	             			{
             				filterheaderdatavalue='{"alignment":"'+align+'","text":"'+aligndata+'","fontSize": '+fontsize+',"width": '+width1+'}';
	             			}
	             			else
	             			{
	             			filterheaderdatavalue='{"alignment":"'+align+'","text":"'+aligndata+'","fontSize": '+fontsize+',"width": '+width1+',"color": "'+colourdata+'"}';
	    	             			
	             			}
             		   }	
	                }
	                
	                var filterdatajson=JSON.parse('{}');	
	                if(filterheaderdatavalue!="")
	                	{
	                	//[{"a":[{"a":"a"},{"a":"a"}]}]
	                	filterdatajson=JSON.parse('['+filterheaderdatavalue+","+filtersheader+']');
	                	}
	                else
	                	{
	                	filterdatajson=JSON.parse('['+filtersheader+']');
	                	}
	                // filters=JSON.parse('['+'{"text": "'+text+'","bold": true,"fontSize": 10,"color":"#13789b"},{"text":"'+$("#FormDisplayName").val()+'","bold": true,"fontSize": 18,"underline":true,"alignment":"center","color":"#2f687c"},'+filters+']');
	                if(filters!="")
                	{
	                	filters=JSON.parse('['+'{"text": "'+text+'","bold": true,"fontSize": 10,"color":"#13789b"},{"text":"'+$("#FormDisplayName").val()+'","bold": true,"fontSize": 18,"underline":true,"alignment":"center","color":"#2f687c"},'+filters+']');
                	}
                else
                	{
                	filters=JSON.parse('['+'{"text": "'+text+'","bold": true,"fontSize": 10,"color":"#13789b"},{"text":"'+$("#FormDisplayName").val()+'","bold": true,"fontSize": 18,"underline":true,"alignment":"center","color":"#2f687c"}'+']');
                	}

	                var margintopfont=0;
	                for(var i=0;i<filterdatajson.length;i++)
	                {
	                	var fontsize1=filterdatajson[i].fontSize;
	                	margintopfont=margintopfont+1.3*fontsize1;
	                }
	                margintopfont=parseInt(margintopfont+20);
	                doc.pageMargins = [20, margintopfont, 20,40 ];  
    	                var d = new Date();
    	                var month = d.getMonth()+1;
    	                var day = d.getDate();
    	                var output = d.toString().substring(0,d.toString().indexOf("GMT"))+"";
    	                if($("#PostType").val()=="AME1")
    	                {
    	                doc['footer']=(function(page, pages) {
    	                    return {
    	                        columns: [
    	                        	//output.substring(0,output.indexOf("GMT")),
    	                        	{	                               
    	                                alignment: 'left',
    	                                text: output
    	                            }
    	                        	,
    	                            {	                               
    	                                alignment: 'center',
    	                                text:  filters.replace(/\n/g,"    "),
    	                                bold: true
    	                            }
    	                        	,
    	                            
    	                            {	                               
    	                                alignment: 'right',
    	                                text: ['page ', { text: page.toString() },  ' of ', { text: pages.toString()+"  "+$("#FormDisplayName").val() }]
    	                            }
    	                        ],
    	                        margin: [20,0,10,10]
    	                    }
    	                });
    	                }
    	                else
    	                {
    	                	doc['footer']=(function(page, pages) {
        	                    return {
        	                        columns: [
        	                        	//output.substring(0,output.indexOf("GMT")),
        	                        	{	                               
        	                                alignment: 'left',
        	                                text: output
        	                            }
        	                        	,
        	                            
        	                            {	                               
        	                                alignment: 'right',
        	                                text: ['page ', { text: page.toString() },  ' of ', { text: pages.toString() }]
        	                            }
        	                        ],
        	                        margin: [20,0,10,10]
        	                    }
        	                });
    	                }
    	                doc['header']=(function(page, pages) {
    	            		if(page.toString()=="1")
    	            		{
    	            			return {  }
    	            		}
    	            		else
    	            		{
    	            		
    	                    return {
    	                    	
    	                        //columns:filterdatajson
    	                    	columns:[
							    //'first column is a simple text',
    	                    		filterdatajson
							  ],
    	                      margin: [20,10,20,100]
    	                    }
    	            		}
    	                });
    	                doc.content[0].text="";
    	                doc.content.splice(0, 1, {
    	                	columns:[
							    //'first column is a simple text',
	                    		filters] ,
    	                        margin: [0, (-margintopfont)+20, 0, 12],
    	                    //alignment: 'center'
    	                  });
    	                /*doc.content.splice(0, 1, {
    	                    text: [
    	                    {
    	                      text: text,
    	                      bold: true,
    	                      fontSize: 10,
    	                      color:'#13789b'
    	                    },
    	                    {
    	                        text:$("#FormDisplayName").val()+"\n",
    	                        bold: true,
    	                        fontSize: 18,
    	                        underline:true,
    	                        alignment:'center',
    	                        color:'#2f687c'
    	                      }
    	                    ,
    	                    {
    	                        text: filters,
    	                        bold: true,
    	                        fontSize: 12,
    	                        alignment:'left'
    	                      }
    	                    
    	                    ],
    	                    margin: [0, 0, 0, 12],
    	                    alignment: 'center'
    	                  });*/
    	            }
    	            
    	        }
    	    ]
    	} );}
    	
    }
	
	
}	
function downloadpdf(pdfid){
	 $("#loader").show();
	var req = new XMLHttpRequest();
	  req.open("GET", "/PDFViewer.jsp?pdf="+pdfid.split("-")[0], true);
	  req.responseType = "blob";

	  req.onload = function (event) {
	    var blob = req.response;
	  
	    var link=document.createElement('a');
	    link.href=window.URL.createObjectURL(blob);
	    link.download=pdfid.split("-")[1] + ".pdf";
	    link.click();
	  };

	  req.send();
	  $("#loader").hide();
}

var postFormDetails;
var postlabel;
var postbuttontype;
var postactionid;
var postaction;

function closeconfirmpopupdiv(ctrl)
{
	$("#"+ctrl).hide();	
	$("#loader").hide();
}
function okconfirmpopupdiv(ctrl)
{
	$("#"+ctrl).hide();
	postdatatoserver(postFormDetails,postlabel,postbuttontype,postactionid,postaction);	
}

var confirmval=false;

function postdatatoserver(formdata,label,buttontype,actionid,action)
{
	$("button.btn-primary:visible").attr("disabled","true");
	setTimeout(function(){$("button.btn-primary:visible").removeAttr("disabled");}, 5000);
	
	setdataforpost();
	getdataforpost();
    var iv = CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
    var salt = CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex); 
    var haspdf="0";
    if(formdata.indexOf('pdf')>-1)
    {
    	haspdf="1";
    }
    formdata=formdata.replace(/\\/g,"").trim();
	formdata="{"+formdata;
	formdata=formdata+'"formid"'+':'+'"'+$("#FormID").val()+'"'+',';
	formdata=formdata+'"formaction"'+':'+'"'+action+'"'+',';
	formdata=formdata+'"formupdateid"'+':'+'"'+actionid+'"'+',';
	formdata=formdata+'"FormName"'+':'+'"'+$("#FormName").val()+'"'+',';
	formdata=formdata+'"buttontype"'+':'+'"'+buttontype+'"'+',';
	formdata=formdata+'"postype"'+':'+'"'+$("#PostType").val()+'"'+',';	
	formdata=formdata+'"label"'+':'+'"'+label+'"'+',';
	formdata=formdata+'"Eformname"'+':'+'"'+$("#Eformname").val()+'"'+',';
	formdata=formdata+'"v80"'+':'+'"'+$("#v80").val()+'"'+',';
	formdata=formdata+'"k80"'+':'+'"'+$("#k80").val()+'"'+',';
	formdata=formdata+'"CSRFToken"'+':'+'"'+dataval1+'"'+',';
	var formdetailsdate=formdata.substring(0,formdata.length-1)+"}";
    var plaintext = formdetailsdate; 
    var passphrase = dataval;
    var ciphertext = encrypttext(salt, iv, passphrase, plaintext);	   
	var sendtoform=window.location.pathname.split("/")[1]+"/";
	if(window.location.pathname.split("/")[1].indexOf(".jsp")>-1||(window.location.pathname.split("/")[1]=="login"&&window.location.pathname.split("/").length==2))
	{
		sendtoform="Form/";
	}		
	var sessionurl="FormPost";
	

	var url="/";
	function ajaxPostCall(){
		$.ajax({
			   url: url+sessionurl,
			   async: false,
			   dataType: 'JSON',
			   data: {text1:salt,
				   text2:iv,
				   text:ciphertext},
			   type: 'post',  
			   success: function(data)
			   { 
				   
				  if(data.status=="tokenexpire")
				  {
					window.location.href="/Error.jsp";  
				   }
				   if(data.status.toLowerCase()=="success")
				  {
					   if(haspdf=="1"&&(pdfdata!="0"&&pdfdata!=""&&pdfdata!="undefined"&&pdfdata!=undefined))
						{
						 downloadpdf(pdfdata);
					    }
						else if(haspdf=="1")
						{
							 showsticky("Something went wrong.\n please try again or contact helpsedk","");
						}
				        formcondition($("#"+label));
				  if(data.Dashboard!=undefined)
				  {
					  if(data.Dashboard=="Yes")
					  {
						  sendtoform="Dashboard/";
					  }
					  
				  }
				  if(data.formname!=undefined)
				  {
				  if(data.Message!=undefined)
				  {
					   if(data.Message!="")
						   showsticky(data.Message.replace(/\\n/g,"\n"),url+sendtoform+data.formname);
				  }
				  else if(data.message!=undefined)
				  {
					   if(data.message!="")
						   showsticky(data.message.replace(/\\n/g,"\n"),url+sendtoform+data.formname);
				  }
				  else if(data.Note!=undefined)
				  {
					   if(data.Message!="")
						   showsticky(data.Note.replace(/\\n/g,"\n"),url+sendtoform+data.formname);
				  }
				  else
				 {
					  window.location.href=url+sendtoform+data.formname;
				 }				  
				   $("#loader").hide();
				 
					 
				  }
				  else
				  {					 					  
					  if(data.Message!=undefined)
					  {
						  if(data.Message!="")
							  showalert(data.Message.replace(/\\n/g,"\n"),"");
					  }
					  else if(data.message!=undefined)
					  {
						   if(data.message!="")
							   showalert(data.message.replace(/\\n/g,"\n"),"");
					  }
					  else if(data.Note!=undefined)
					  {
						   if(data.Message!="")
							   showsticky(data.Note.replace(/\\n/g,"\n"),"");
					  }					
					  
					  $("#loader").hide();
				  }	
				  }
				  else
				  {
				     if(data.status.toLowerCase()=="fail"||data.status.toLowerCase()=="failed")
				     {		
					  if(data.formname!=undefined)
					  {
					   if(data.Message!=undefined)
					  {
						   if(data.Message!="")
							   showsticky(data.Message.replace(/\\n/g,"\n"),url+sendtoform+data.formname);
					  }
					   if(data.message!=undefined)
						  {
							   if(data.message!="")
								   showsticky(data.message.replace(/\\n/g,"\n"),url+sendtoform+data.formname);
						  }
					   if(data.Note!=undefined)
						  {
							   if(data.Message!="")
								   showsticky(data.Note.replace(/\\n/g,"\n"),url+sendtoform+data.formname);
						  }	
								 
					  }
					  else
						  {
						  if(data.Message!=undefined)
						  {
							  if(data.Message!="")
								  	showalert(data.Message.replace(/\\n/g,"\n"),"");
							  		generatecaptcha();
						  }
						  if(data.message!=undefined)
						  {
							   if(data.message!="")
								   showalert(data.message.replace(/\\n/g,"\n"),"");
						  }
						  if(data.Note!=undefined)
						  {
							   if(data.Message!="")
								   showsticky(data.Note.replace(/\\n/g,"\n"),"");
						  }
						  }
					  $("#loader").hide();
				    }			 
				  else
				  {
				  $("#loader").hide();
				  showsticky("Something went wrong please try again.You are advised to login again to perform desired action.","");
				  }
				  }
				   $("button.btn-primary:visible").removeAttr("disabled");
			   },
			   error:function(data){
				   $("#loader").hide();
				   $("button.btn-primary:visible").removeAttr("disabled");
				  
			   }
			});
	}
	label1 = label.replace(/ /g,"\\ ")
	if ($("#"+label1).closest("div").css("display")=='none'){
		ajaxPostCall();
	}
	else{
		setTimeout(function() {ajaxPostCall()},10)
	}
	// 
}
function generatehash(str)
{
	return sha256_digest(str);
}

$(".password").change(function(){
	if($(this).val()!="")
	{
	var sha=generatehash($(this).val());
	$(this).val(sha);	
	}
});
$(".setpassword").change(function(){
	setdataforpost();
	getdataforpost();
	var ctrl=$(this);
	if($(ctrl).val()!="")
	{
		var passwordtext=$(this).val();
		 var ciphertext = encrypttext("1868ab6847bf07989d1895133ffc59ad", "809199451ea2463b986b358457fbb441", dataval, passwordtext);	     	
		var sessionurl="Setpassword";
		var url="/";
	    $.ajax({
		    url: url+sessionurl,
		    type: 'get',
		    data: {
				   text:ciphertext
				   },
		    success: function(data){	    	
		    	if(data.status=="success")
		    	{
		        $(ctrl).val(data.text);
		        $(ctrl).removeClass("requiredfielderror");
		        formcondition(ctrl);
		    	}
		    	else
		    	{  
		    		 $(ctrl).addClass("requiredfielderror");
   			         showsticky("Password must combination of lowercase alphabet, uppercase alphabet, number, special character and must be at least eight characters.","");
   			    
		    	}
		    	
		    },
		    error:function(data){
		    	 showsticky("Password must combination of lowercase alphabet, uppercase alphabet, number, special character and must be at least eight characters.","");
	   			    
		    }
		});
			
	}
});

function MultipeUploadImages(event)
{
 var formData = new FormData();
 var divid=event.parentElement.parentElement.id;
 var files = $("#"+"multiplefiles"+divid).get(0).files;
 for (var i = 0; i <files.length; i++) {
      formData.append(files[i].name, files[i]);}
 $.ajax({
          url: "/UploadMultipleFilesServlet",
          type: 'POST',
          cache: false,
          contentType: false,
          processData: false,
          data: formData,
          success: function (response) {
         var res= JSON.parse(response)
         alert('Images uploaded:'+res.ids)
		 console.log(res)
	     multipleids=res.ids.toString();
         window[divid+'idss']=res.ids.toLocaleString();
			
          //  $("#"+"multiplefiles"+divid).val("")
			
          },
          error: function (err) {
              alert("error : "+JSON.stringify(err));
          }
      });

}


function maxlength(input,len) {
	  var length = $(input).val().length;
	  var length = len-length;
	  $(this).text(length);
	};
	var formcount=0;	 
	 $("#AddNew").click(function(){
		 var grouptext="";
		 formcount++;
		 var group=$(this).attr('add');	
		 if(formcount!=0)
		 {
	     grouptext=grouptext+"<div class='Group "+group.replace(' ','_')+(formcount)+"'>"+$("."+group.replace(' ','_')).html()
		 +"<div class='col-md-12 col-sm-12 mb-12 break'><button remove='"+$(this).attr('add')+"' onclick='RemoveMe(this,"+formcount+")' id='Remove' " 
		 +"style='float:right;margin-top:2%' type='button' class='btn btn-primary'>Remove</button></div></div>";
		 }
		 else
	     {
		 grouptext=grouptext+"<div class='Group "+group.replace(' ','_')+(formcount)+"'>"+$("."+group.replace(' ','_')).html()+"</div>";			 
		 }
		 $(grouptext).insertAfter($(".Group").last());	
		 $("input[type=text]").val('');
		 $("input[type=text]").removeAttr('disabled');
	});
	function RemoveMe(e,removeme){	
		var group=$(e).attr('remove').split(',');	
		for(var i=0;i<group.length;i++)
		{
		$("."+group[i].replace(' ','_')+removeme).remove();
	    }
	 };	 
	 function HideIds(GroupIDs,id)
	 {
		 if($("#"+id).attr("type")=="radio")
		 {		
			 if($("#"+id).hasClass("radiowithyesno-YES"))
			 {
				 var allgroups=GroupIDs.split("-");
			     for(var i=0;i<allgroups.length;i++)
			     {			    	 			    	
			  	       $("."+allgroups[i]).hide();			    	
			     }			 			    
			 }
			 else if($("#"+id).hasClass("radiowithyesno-NO"))
			 {
				 var allgroups=GroupIDs.split("-");
			     for(var i=0;i<allgroups.length;i++)
			     {			    	 			    	
			  	       $("."+allgroups[i]).show();			    	
			     }			 			    
			 }
		   
			else
		    {
			if($("#"+id).prop("checked"))
		  	{
		     var allgroups=GroupIDs.split("-");
		     for(var i=0;i<allgroups.length;i++)
		     {
		    	 
		    	 if($("#"+id).val().toLowerCase().indexOf(allgroups[i].toLowerCase())>-1)
		    	 {
		  	       $("."+allgroups[i]).hide();
		    	 }
		    	 else
		    	 {
		    		 $("."+allgroups[i]).show();
		    	 }
		     }
		    }
		    else
		  	{
		  	var allgroups=GroupIDs.split("-");
		  	for(var i=0;i<allgroups.length;i++)
		  	{
		  	 
		  	  if($("#"+id).val().toLowerCase().indexOf(allgroups[i].toLowerCase())>-1)
		  	  {
		  	  $("."+allgroups[i]).show();
		  	  }
		    }
		  }
		 }
		}
		else
		{ 	
	     var allgroups=GroupIDs.split("-");
	     for(var i=0;i<allgroups.length;i++)
	     {
	  	 $("."+allgroups[i]).hide();
	     }
		}
	 }	
	
	 function Getdata(){
		 var data=JSON.parse(JSON.stringify([{id:'2',value:'File2'},{id:'3',value:'File3'}]));
		 var resultdata="";
		 resultdata+="<table>";
		 for(var i=0;i<data.length;i++)
		 {
			 resultdata+="<tr>";
			
			 resultdata+="<td>"+data[i].id+"</td>";			 
			 resultdata+="<td>"+data[i].value+"</td>";	
			 resultdata+="<tr>";
		 }
		 resultdata+="</table>";
		$("#Educational_Qualification").html(resultdata);
	 }
	
	    
	function HideIds(GroupIDs,id)
	{	
		if($("#"+id).attr("type")=="radio")
		{
			if($("#"+id).prop("checked"))
		  	{
		     var allgroups=GroupIDs.split("-");
		     for(var i=0;i<allgroups.length;i++)
		     {
		    	
		    	 if($("#"+id).val().toLowerCase()==allgroups[i].toLowerCase())
		    	 {
		  	       $("."+allgroups[i]).hide();
		    	 }
		    	 
		     }
		    }
		    else
		  	{
		  	var allgroups=GroupIDs.split("-");
		  	for(var i=0;i<allgroups.length;i++)
		  	{
		  	 
		  	  if($("#"+id).val().toLowerCase()==allgroups[i].toLowerCase())
		  	  {
		  	  $("."+allgroups[i]).show();
		  	  }
		  	  else
		  	  {
		  		$("."+allgroups[i]).hide();
		  	  }
		    }
		  	}	
		}
		else
		{
	  	if($("#"+id).prop("checked"))
	  	{
	     var allgroups=GroupIDs.split("-");
	     for(var i=0;i<allgroups.length;i++)
	     {
	  	 $("."+allgroups[i]).hide();
	     }
	     }
	     else
	  	{
	  	var allgroups=GroupIDs.split("-");
	  	for(var i=0;i<allgroups.length;i++)
	  	{
	  	  $("."+allgroups[i]).show();
	    }
	  	}
		}
 }
function ShowIds(GroupIDs,id)
{	 
	 if($("#"+id).attr("type")=="radio")
	 {		
		 if($("#"+id).hasClass("radiowithyesno-YES"))
		 {
			 var allgroups=GroupIDs.split("-");
		     for(var i=0;i<allgroups.length;i++)
		     {			    	 			    	
		  	       $("."+allgroups[i]).show();			    	
		     }			 			    
		 }
		 else if($("#"+id).hasClass("radiowithyesno-NO"))
		 {
			 var allgroups=GroupIDs.split("-");
		     for(var i=0;i<allgroups.length;i++)
		     {			    	 			    	
		  	       $("."+allgroups[i]).hide();			    	
		     }			 			    
		 }
	   
		else
	    {
		if($("#"+id).prop("checked"))
	  	{
	     var allgroups=GroupIDs.split("-");
	     for(var i=0;i<allgroups.length;i++)
	     {
	    	 
	    	 if($("#"+id).val().toLowerCase().indexOf(allgroups[i].toLowerCase())>-1)
	    	 {
	  	       $("."+allgroups[i]).show();
	    	 }
	    	 else
	    	 {
	    		 $("."+allgroups[i]).hide();
	    	 }
	     }
	    }
	    else
	  	{
	  	var allgroups=GroupIDs.split("-");
	  	for(var i=0;i<allgroups.length;i++)
	  	{
	  	 
	  	  if($("#"+id).val().toLowerCase().indexOf(allgroups[i].toLowerCase())>-1)
	  	  {
	  	  $("."+allgroups[i]).hide();
	  	  }
	    }
	  }
	 }
	}
	else
	{ 	
     var allgroups=GroupIDs.split("-");
     for(var i=0;i<allgroups.length;i++)
     {
  	 $("."+allgroups[i]).show();
     }
	}
    
  }
$(window).load(function(){
	if($("#tableid").val()!=0&&$("#tableid").val()!=""){
		$(".group select").change(function(){
			var gettabledatainjson="",filters="";
			gettabledatainjson="{"+gettabledatainjson;
			gettabledatainjson=gettabledatainjson+'"table_ID"'+':'+'"'+$("#tableid").val()+'"'+',';
			gettabledatainjson=gettabledatainjson+'"FormName"'+':'+'"'+$("#FormName").val()+'"'+',';
			gettabledatainjson=gettabledatainjson+'"formupdateid"'+':'+'"'+$("#formupdateid").val()+'"'+'}';
			reportajaxjson("example2",gettabledatainjson,true,true);
			});
		$(".group input").change(function(){
			var gettabledatainjson="",filters="";
			gettabledatainjson="{"+gettabledatainjson;
			gettabledatainjson=gettabledatainjson+'"table_ID"'+':'+'"'+$("#tableid").val()+'"'+',';
			gettabledatainjson=gettabledatainjson+'"FormName"'+':'+'"'+$("#FormName").val()+'"'+',';
			gettabledatainjson=gettabledatainjson+'"formupdateid"'+':'+'"'+$("#formupdateid").val()+'"'+'}';
			reportajaxjson("example2",gettabledatainjson,true,true);
			});
		};
		
	setInterval(function()
			{
				if($(".stickynote").css("display")=="block"){$(".stickynote .btn-primary").focus();};

				if($(".alertnote").css("display")=="block"){$(".alertnote .btn-primary").focus();};

				if($("#confirmpopupdiv").css("display")=="block"){$("#confirmpopupdiv button:first").focus();};
				if($(".selectotherblock").css("display")=="block"){$(".selectotherblock button:first").focus();};
				
				
				
			}, 1);
});
$(document).ready(function(){	
try
   {
	if ((window.top.location.host == "chromewebdata")||(window.top.location.host == "localhost")||(window.top.location.host == "pariksha.dgca.gov.in"))
	{
	  var origin=window.top.location.origin;
	   var pathname=window.top.location.pathname;
       // alert(pathname);
		/*if(pathname.includes("bing"))
		{
		window.location.href="/Error.jsp";
		}
		else */if(origin!="https://localhost" && origin!="https://pariksha.dgca.gov.in"){
			if(origin.indexOf("localhost")>0||origin=="null")
			 {
	              window.top.location.href="https://localhost:443"+pathname;
			 }
		   else
			 {
				 window.top.location.href="https://pariksha.dgca.gov.in"+pathname;
			 }

	      // alert(pathname);
	}
	}
	else
	{
		  document.body.innerHTML = "Access Denied";
	}
   }
catch(e)
   { 
	 document.body.innerHTML = "Access Denied";
	}
try
{

if($("#DefaultOrientaion").val()!=undefined)
	if($("#DefaultOrientaion").val().toString().toUpperCase()=="LANDSCAPE")
	{
		$("#reportorientation").val("landscape");
	}
	else
	{
		$("#reportorientation").val("portrait");
	}
	}
catch(e)
{ 
	 
	}



getsessiontime(); 

	(function ($) {
		  $.each(["show", "hide"], function (i, ev) {
		    var el = $.fn[ev];
		    $.fn[ev] = function () {
		      this.trigger(ev);
		      return el.apply(this, arguments);
		    };
		  });
		})(jQuery);
	 $("input").on("show", function() {
	       if($(this).attr("condition")!="null")
	        {
	    	   formcondition($(this));
	    	}
	   });

	 $("select").on("show", function() {
    if($(this).attr("condition")!="null")
		{
    	 formcondition($(this));
		}
  });
	$("#loader").hide();
	if($("#hascaptcha").val()=="true")
	{
	generatecaptcha();
	}
	
	if($("#FormHeader").val()=="N")
	{
	$(".navheader").hide();
	$(".navheaderadmin").hide();
	}
    else
    {
	$(".navheader >div >div").html($("#FormHeader").val());
	$(".navheaderadmin").html($("#FormHeader").val());
    }
	var divs=$("#AllFields div");
	for(var i=0;i<divs.length;i++){
		var divfont=$(divs[i]);
		if($(divfont).attr("fontsize")!=undefined)
        {
			var divfontsize=$(divfont).attr("fontsize");
			$(divfont).find('*').each(function () {
				 $(this).css("font-size",divfontsize+'px');
			    });					
	   }
	}
	$($('[required]').siblings("label")).append("<span class='required'>*</span>");
	$($('[required]').parent().siblings("label")).append("<span class='required'>*</span>");
	$('[data-toggle="tooltip"]').tooltip();   
      (function($){  	  
	    	  	    	  
	    	  $('.date').inputmask("datetime",{
	    		  mask: "1-2-y", 
	    	    placeholder: "DD-MM-YYYY", 
	    	    leapday: "-02-29", 
	    	    separator: "-", 
	    	    alias: "DD-MM-YYYY"
	    	  });	

	    	  $('.time').inputmask({
	    	  	        mask: "h:s",
	    	  	        placeholder: "hh:mm",
	    	  	        alias: "datetime",
	    	  	        hourFormat: "24"
	    	  	    });

	    	  	  $('.datetimestamp').inputmask("datetime",{
	    	  		  mask: "1-2-y h:s", 
	    	  	    placeholder: "DD-MM-YYYY hh:mm", 
	    	  	    leapday: "-02-29", 
	    	  	    separator: "-", 
	    	  	    alias: "DD-MM-YYYY hh:mm"
	    	  	  });	
	    	})(jQuery)
	    	
	    
	    $("table:visible").click();	   
        $("input[type=text]:visible").blur();	  
	    $("select:visible").change();	 
	    $("input[type=radio]:visible:checked").click();	
	   
		    
	   
	    $("table td input[type=file]:visible").change(function()
	    		  {
	    			 if($(this).parent().is(":visible"))
	    			 {
	    				 if($(this).attr("requiredval")!=undefined)
	    				    {
	    				if($(this).attr("requiredval")=="1")
	    				    {
	    					if($(this).val()!="")
	    					{
	    						$(this).removeClass("requiredfield");		
	    					}
	    					else
	    					{
	    						$(this).addClass("requiredfield");	
	    						
	    					}
	    					}
	    				    }
	    				
	    			 }
	    		  });
	    $("table td input:visible").blur(function()
	    		  {
	    			 if($(this).parent().is(":visible"))
	    			 {
	    				 if($(this).attr("requiredval")!=undefined)
	    				    {
	    				if($(this).attr("requiredval")=="1")
	    				    {
	    					if($(this).val()!="")
	    					{
	    						$(this).removeClass("requiredfield");		
	    					}
	    					else
	    					{
	    						$(this).addClass("requiredfield");	
	    						
	    					}
	    					}
	    				    }
	    				
	    			 }
	    		  });
	    $("table td select:visible").blur(function()
	    		  {
	    			 if($(this).parent().is(":visible"))
	    			 {
	    				 if($(this).attr("requiredval")!=undefined)
	    				    {
	    				if($(this).attr("requiredval")=="1")
	    				    {
	    					if($(this).val()!="0")
	    					{
	    						$(this).removeClass("requiredfield");		
	    					}
	    					else
	    					{
	    						$(this).addClass("requiredfield");		    						
	    					}
	    					}
	    				    }
	    				
	    			 }
	    		  });
	    $("select:visible").change(function()
	    		  {
	    			 if($(this).parent().is(":visible"))
	    			 {
	    				if($(this).attr("required")!=undefined||$(this).parent().attr("required")!=undefined)
	    				    {
	    					if($(this).val()!="0")
	    					{
	    						$(this).removeClass("requiredfield");		
	    					}
	    					else
	    					{
	    						$(this).addClass("requiredfield");	
	    						
	    					}
	    					}
	    				
	    			 }
	    		  });
	    $("input[type=text]:visible").blur(function()
	    		  {
	    			 if($(this).parent().is(":visible"))
	    			 {
	    				if($(this).attr("required")!=undefined)
	    				    {
	    					if($(this).val()!="")
	    					{
	    						$(this).removeClass("requiredfield");		
	    					}
	    					else
	    					{
	    						$(this).addClass("requiredfield");	
	    						
	    					}
	    					}
	    				   
	    				
	    			 }
	    		  });
	    $("input[type=email]:visible").blur(function()
	    		  {
	    			 if($(this).parent().is(":visible"))
	    			 {
	    				if($(this).attr("required")!=undefined||$(this).parent().attr("required")!=undefined)
	    				    {
	    					if($(this).val()!="")
	    					{
	    						var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    					 	    if (!filter.test($(this).val())) {	 	    	
    					 	    	$(this).addClass("requiredfield");	 
    					 	    	c
    					 	    }
    					 	    else{
	    						$(this).removeClass("requiredfield");
    					 	    }
	    					}
	    					else
	    					{
	    						$(this).addClass("requiredfield");
	    					}
	    					}
	    				
	    			 }
	    		  });
	    $("input[type=checkbox]:visible").change(function()
	    		  {
	    			 if($(this).parent().is(":visible"))
	    			 {
	    				if($(this).attr("required")!=undefined||$(this).parent().attr("required")!=undefined)
	    				    {
	    					if($(this).prop("checked"))
	    					{
	    						$(this).siblings("label").css("color","black");		
	    					}
	    					else
	    					{
	    						$(this).siblings("label").css("color","red");
	    						
	    						
	    					}
	    					}
	    				
	    			 }
	    		  });	
	    if($("#Hastable").val()=="true")
	    {
	    	gettabledatainjson();
	    }	    
	    getcomponenttabledata();
	 //   getsessiontime();
	    
//	    if($(".editabletotalcheckbox")!=undefined)
//	    {
//	    	 $(".editabletotalcheckbox").html("Total Checked: "+$(".edittable table input[type=checkbox]:not(.selectall):checked").length);
//	    	 $(".edittable table input[type=checkbox]").on("change", function() {    	
//	    		$(".editabletotalcheckbox").html("Total Checked: "+$(".edittable table input[type=checkbox]:not(.selectall):checked").length);
//	    	});	    	
//	    }
	    if($(".editabletotalcheckbox")!=undefined)
	    {
	 var alleditabletotals=$(".edittable table .editabletotalcheckbox"); // all n checkboxes
	 for (var i=0;i<alleditabletotals.length;i++)
	 {
	 //get each checkbox table id
	 var id=alleditabletotals[i].parentElement.parentElement.parentElement.parentElement.id // table_id
	 // no of checkboxes checked in that very table
	 $(alleditabletotals[i]).html('Total Checked='+$("#"+id+" input[type=checkbox]:not(.selectall):checked").length);
	 }
	     $(".edittable table input[type=checkbox]").on("change", function() {   // on change of  any checkbox in any table get all the ids of table and set the checkbox value in them again
	 for (var i=0;i<alleditabletotals.length;i++)
	 {
	 //get each checkbox table id
		 var id=alleditabletotals[i].parentElement.parentElement.parentElement.parentElement.id
	 $(alleditabletotals[i]).html('Total Checked='+$("#"+id+" input[type=checkbox]:not(.selectall):checked").length);
	 }     });    
	    }	    
	 /*   $("select").on("change", function() {
			 var allgroupsh3=$(".group:visible");
			  var startno=parseInt(($(".group:visible:first").find("h3:first").html().toString()).match(/\d+/)[0]);
			 for(var i=0;i<allgroupsh3.length;i++)
			 {
			   if($(allgroupsh3[i]).find("h3:first").length>0)
			  {
				   if(($(allgroupsh3[i]).find("h3:first").html().toString()).match(/\d+/)!=null)
				   {
				   var no=($(allgroupsh3[i]).find("h3:first").html().toString()).match(/\d+/)[0];
				   var group=$(allgroupsh3[i]).find("h3:first").html().replace(no,startno);			
				   $(allgroupsh3[i]).find("h3:first").html(group);
				   var alldivsingroup=$(allgroupsh3[i]).find("div:visible span.spanlabelling");
				   var spanstart=1;
				   for(var j=0;j<alldivsingroup.length;j++)
					 {
					   if($(alldivsingroup[j]).html().trim()!="");
					   {
					   $(alldivsingroup[j]).html(startno+"."+spanstart+". ");
					   spanstart++;
					   }
					 }
				   startno++;	
				   }
			  }			 		
			 }		 		    	     	
		   });
	    $("input[type=radio]").on("click", function() {
			 var allgroupsh3=$(".group:visible");
			 var startno=parseInt(($(".group:visible:first").find("h3:first").html().toString()).match(/\d+/)[0]);
			 for(var i=0;i<allgroupsh3.length;i++)
			 {
			   if($(allgroupsh3[i]).find("h3:first").length>0)
			   {
				   if(($(allgroupsh3[i]).find("h3:first").html().toString()).match(/\d+/)!=null)
				   {
				   var no=($(allgroupsh3[i]).find("h3:first").html().toString()).match(/\d+/)[0];
				   var group=$(allgroupsh3[i]).find("h3:first").html().replace(no,startno);			
				   $(allgroupsh3[i]).find("h3:first").html(group);
				   var alldivsingroup=$(allgroupsh3[i]).find("div:visible span.spanlabelling");
				   var spanstart=1;
				   for(var j=0;j<alldivsingroup.length;j++)
					 {
					   if($(alldivsingroup[j]).html().trim()!="");
					   {
					   $(alldivsingroup[j]).html(startno+"."+spanstart+". ");
					   spanstart++;
					   }
					 }
				   startno++;	
				   }
			  }			 		
			 }		 		    	     	
		   });
	    var allgroupsh3=$(".group:visible");
		 var startno=parseInt(($(".group:visible:first").find("h3:first").html().toString()).match(/\d+/)[0]);
		 for(var i=0;i<allgroupsh3.length;i++)
		 {
		   if($(allgroupsh3[i]).find("h3:first").length>0)
		  {
			   if(($(allgroupsh3[i]).find("h3:first").html().toString()).match(/\d+/)!=null)
			   {
			   var no=($(allgroupsh3[i]).find("h3:first").html().toString()).match(/\d+/)[0];
			   var group=$(allgroupsh3[i]).find("h3:first").html().replace(no,startno);			
			   $(allgroupsh3[i]).find("h3:first").html(group);
			   var alldivsingroup=$(allgroupsh3[i]).find("div:visible span.spanlabelling");
			   var spanstart=1;
			   for(var j=0;j<alldivsingroup.length;j++)
				 {
				   if($(alldivsingroup[j]).html().trim()!="");
				   {
				   $(alldivsingroup[j]).html(startno+"."+spanstart+". ");
				   spanstart++;
				   }
				 }
			   startno++;	
			 }
		   }			 		
		 }*/
		if($("#reload")!=undefined)
			{
			if($("#reload").val()=="true")
				{
				window.location.href="/Error.jsp";
				}
			}
		
		  $("input[type=radio]:visible:checked").click();	
		  formloadedonce=true;
});
function applygroup(){
	if($("#GroupsListString").val()!=undefined){
	var GroupsListString=$("#GroupsListString").val().split(",");
	for(var i=0;i<GroupsListString.length;i++)
		{
		if(GroupsListString[i].toString()!="")
		{
		  var groupfirst="#AllFields div."+GroupsListString[i].toString()+":first";
		  var grouplast="#AllFields div."+GroupsListString[i].toString()+":last";
		  var group="#AllFields div."+GroupsListString[i].toString();
		  if($(group).is(':visible')){
		  $("<div class='groupfirst Left col-md-12 col-sm-12 mb-12'>").insertBefore(groupfirst);
		  $("</div>").insertAfter(grouplast);
		  }
		  $(group).addClass("groupinner")
		}
	  }	
	}
}
/*var sessioninterval;
function getsessiontime(){
	
    var sessionurl="getsessiontime";
	var url="/";
   $.ajax({
	    url: url+sessionurl,
	    type: 'get',  
	    success: function(data){
	    	
	    	if(data.time>0 && data.time>1800)
	    		{	
	    		clearInterval(sessioninterval)
	    		 sessioninterval=setInterval(function(){ 
	    			 
	    			 showalert("Your Session is going to Expire in 2 minutes kindly save your details",""); },
	    			 (((data.time/6000)*1000)*60)-120000);	
	    		sessioninterval=setInterval(function(){ 

	    			window.location.href="/welcome.jsp";
	    			
	    			
	    		},((data.time/6000)*1000)*60);	
	    		}
	    	else
	    		{
	    		clearInterval(sessioninterval);
	    		}
	   
	    },
	    error:function(data){		    	
	    }
	});		
}
*/

var sessiontime=0;
var sessioninterval;

function sessionlogout(sessionblock)
{
	clearTimeout(sessioninterval);
	window.location.href="/welcome.jsp";
}

function sessionlogin(sessionblock)
{
	clearTimeout(sessioninterval);
	sessioninterval=setInterval(function(){ 
		$("#sessionpopupdiv").css("display","block");
		clearTimeout(sessioninterval);
		sessioninterval=setInterval(function(){ 
			clearTimeout(sessioninterval);
			window.location.href="/welcome.jsp";
		},(120000));
	 },((sessiontime*1000)-120000));
	$("#sessionpopupdiv").css("display","none");		
}


function getsessiontime(){
    var sessionurl="getsessiontime";
	var url="/";
   $.ajax({
	    url: url+sessionurl,
	    type: 'get',  
	    success: function(data){
	    	
	    if(data.time>0){
         sessiontime=data.time;
	    sessioninterval=setInterval(function(){ 
		$("#sessionpopupdiv").css("display","block");
		clearTimeout(sessioninterval);
		sessioninterval=setInterval(function(){ 
			clearTimeout(sessioninterval);
			window.location.href="/welcome.jsp";
		},(120000));
	    },((sessiontime*1000)-120000));
		
	    }
	    
	    },
	    error:function(data){		    	
	    }
	});		
}

var dataval="";
var dataval1="";
function getdataforpost(){
    var sessionurl="getdata";
	var url="/";
   $.ajax({
	    url: url+sessionurl,
	    type: 'get',
	    async:false,
	    success: function(data){	    	
	    	var datakey=data.data;
	    	var datakey2=data.data2;
	        var ciphertext = decrypttext("1868ab6847bf07989d1895133ffc59ad", "809199451ea2463b986b358457fbb441", datakey2, datakey);	  
	    	var jsonresponse=JSON.parse(ciphertext);
	        dataval= jsonresponse.data;
	    	dataval1= jsonresponse.data1;
	    	
	    },
	    error:function(data){
	    	
	    }
	});
	
}function setdataforpost(){
    var sessionurl="setdata";
	var url="/";
   $.ajax({
	    url: url+sessionurl,
	    type: 'get',
	    async:false,
	    success: function(data){
	    	
	    },
	    error:function(data){
	    	
	    }
	});
	
}
function decrypttext(salt, iv, passPhrase, cipherText){
	 var key = CryptoJS.PBKDF2(
		      passPhrase, 
		      CryptoJS.enc.Hex.parse(salt),
		      { keySize: 128/32, iterations: 1000 });
	  var cipherParams = CryptoJS.lib.CipherParams.create({
	    ciphertext: CryptoJS.enc.Base64.parse(cipherText)
	  });
	  var decrypted = CryptoJS.AES.decrypt(
	      cipherParams,
	      key,
	      { iv: CryptoJS.enc.Hex.parse(iv) });
	  return decrypted.toString(CryptoJS.enc.Utf8);
}
function encrypttext(salt, iv, passPhrase, plainText){
	 var key = CryptoJS.PBKDF2(
		      passPhrase, 
		      CryptoJS.enc.Hex.parse(salt),
		      { keySize: 128/32, iterations: 1000 });
	  var encrypted = CryptoJS.AES.encrypt(
	      plainText,
	      key,
	      { iv: CryptoJS.enc.Hex.parse(iv) });
	  return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
}
function listboxdata()
{
	var alllistbox=$(".listbox");
	var jsondata="";
	for(var i=0;i<alllistbox.length;i++)
	{
		var listdisplayname=$(alllistbox[i]).find("label").attr("displayname");
		var firstlistdata="";
		for(var j=0;j<$($(alllistbox[i]).find("select")[0]).find("option").length;j++)
		{
			firstlistdata=firstlistdata+$($($(alllistbox[i]).find("select")[0]).find("option")[j]).val()+",";
		}
		var secondlistdata="";
		for(var j=0;j<$($(alllistbox[i]).find("select")[2]).find("option").length;j++)
		{
			secondlistdata=secondlistdata+$($($(alllistbox[i]).find("select")[2]).find("option")[j]).val()+",";
		}
		jsondata=jsondata+'"'+listdisplayname+'":[{"left" :['+firstlistdata.substr(0,firstlistdata.length-1)+'],"right": ['+secondlistdata.substr(0,secondlistdata.length-1)+']}],';		
	}
	return jsondata;
}
function move(sens) {
var i, sourceSel, targetSel; 
if (sens == 'right1') {
sourceSel = document.getElementById('selectBoxOne'); 
targetSel = document.getElementById('selectBoxSecond');
} 

else if (sens == 'left1') {
sourceSel = document.getElementById('selectBoxSecond'); 
targetSel = document.getElementById('selectBoxOne');
}
else if (sens == 'right2'){
sourceSel = document.getElementById('selectBoxThree'); 
targetSel = document.getElementById('selectBoxOne');
}
else {
sourceSel = document.getElementById('selectBoxOne'); 
targetSel = document.getElementById('selectBoxThree');
}

i = sourceSel.options.length;
while (i--) {
if (sourceSel.options[i].selected) {
targetSel.appendChild(sourceSel.options[i]);
}
}
}


function toggleflightcrew(clsname)
{
$("."+clsname).slideToggle();
}
$('.nopaste').on("paste",function(e) {
    e.preventDefault();
 });

function setposttypesession(posttype,sendtopage)
{
var sessionurl="SetPostType";
var url="/";
$.ajax({
   url: url+sessionurl,
   dataType: 'JSON',
   data: {postype: JSON.stringify(posttype.trim())},
   type: 'get',  
   success: function(data){
	  window.location.href=sendtopage;
   },
   error:function(data){
	  
     }
});
}
function logout()
{
var sessionurl="Logout";
var url="/";
$.ajax({
   url: url+sessionurl,
   dataType: 'JSON',
   type: 'get', 
   async:false,
   success: function(data){
	 
   },
   error:function(data){
	  
     }
});
}
function ViewPDF(docid)
{ 

    var sessionurl="PDFViewer";
    var url="/";
	$.ajax({
		   url: url+sessionurl,
		   data: {'pdf': docid},
		   type: 'post',  
		   success: function(data){
			    var blob = new Blob([data], {
			        type: 'application/pdf'
			    });
			    var objectURL = URL.createObjectURL(blob);			  
			  
		   },
		   error:function(data){
			  
		     }
		});
}
function removerowintable(ctrl)
{
	var tablename=$(ctrl).parents("table").attr("id");
	$(ctrl).parent().parent().remove();	
	$("#"+tablename+" tr select").change();
	$("#"+tablename+" tr input").blur();
}

/*function addrowintable(tableid)
{
	$($("#"+tableid).find("tbody")).append("<tr>"+$("#"+tableid+" .editableaddrow").html()+"</tr>");
	$("#"+tableid+" .multiselect").siblings("span").remove();
	 $('.select2').select2();
	  $('.date').inputmask("datetime",{
		  mask: "1-2-y", 
	    placeholder: "DD-MM-YYYY", 
	    leapday: "-02-29", 
	    separator: "-", 
	    alias: "DD-MM-YYYY"
	  });	
	
}*/

function addrowintable(tableid)
{
	var totalrow=Math.random().toString().substring(2,Math.random().toString().length);
	
	$($("#"+tableid).find("tbody")).append("<tr id='totalrow"+totalrow+"'>"+$("#"+tableid+" .editableaddrow").html()+"</tr>");
	if($("#totalrow"+totalrow).find("input[type=file]").length>0)
	{
		$("#totalrow"+totalrow).find("input[type=file]").attr("id",$("#totalrow"+totalrow).find("input[type=file]").attr("id")+totalrow);
		$($("#totalrow"+totalrow).find("input[type=file]").parent("form")).attr("id",$($("#totalrow"+totalrow).find("input[type=file]").parent("form")).attr("id")+totalrow);
	}
	$("#"+tableid+" .multiselect").siblings("span").remove();
	 $('.select2').select2();
	  $('.date').inputmask("datetime",{
		  mask: "1-2-y", 
	    placeholder: "DD-MM-YYYY", 
	    leapday: "-02-29", 
	    separator: "-", 
	    alias: "DD-MM-YYYY"
	  });	

	  $('.time').inputmask({
	  	        mask: "h:s",
	  	        placeholder: "hh:mm",
	  	        alias: "datetime",
	  	        hourFormat: "24"
	  	    });

	  	  $('.datetimestamp').inputmask("datetime",{
	  		  mask: "1-2-y h:s", 
	  	    placeholder: "DD-MM-YYYY hh:mm", 
	  	    leapday: "-02-29", 
	  	    separator: "-", 
	  	    alias: "DD-MM-YYYY hh:mm"
	  	  });	
 
	  $('.uploadtablefile').change( function(event) {
	  	var documentno=documentsblob.length;
	  	var temppath = URL.createObjectURL(event.target.files[0]);	
	  	$("#photo"+event.target.id).remove();
	  	var files = event.target.files;
	      var file = files[0];
	      var acceptedfile="jpeg/jpg/pdf";
	      var validfile=false;
	      var filename=file.name.toLowerCase();
	      if($("#"+event.target.id).attr("accept")!=undefined)
	      {
	      	acceptedfile=$("#"+event.target.id).attr("accept");
	      } 
	      for(var filedata=0;filedata<acceptedfile.split(",").length;filedata++)
	      {
	      	for(var filedatachild=0;filedatachild<acceptedfile.split(",")[filedata].split("/").length;filedatachild++)
	          {
	      	 if(filename.indexOf(acceptedfile.split(",")[filedata].split("/")[filedatachild])>-1)
	      	 {
	      		validfile=true;
	      	 }
	          }
	      }   	
	      if(validfile)
	      {
	    
	  	
	      var docsize=$("#"+event.target.id).attr("docsize");
	 
	      if(docsize!=undefined&&parseInt(file.size)>parseInt(docsize))
	      {
	      	$("#"+event.target.id).val("");
	      	if(parseInt(docsize)>parseInt(1024*1024*10))
	      	{
	      	showsticky("Document size should not be greater then "+ parseInt(parseInt(docsize)/(1024*1024)) +" MB","");
	      	}
	      	else
	      	{
	      	showsticky("Document size should not be greater then "+ parseInt(parseInt(docsize)/(1024)) +" kB","");
	      	}
	      	
	      }
	      else
	      {   
	      if (file) 
	      {
	          var reader = new FileReader();
	          reader.onload = function(e) {
	          var base64=e.target.result;	 
	          $("#iframedocument").attr("src",temppath);
	  	    $("#documentmodel").show();
	  	    $("#documentmodelupload").attr("fileid",event.target.id);	
	  	    $("#iframedocument").contents().find("img").css("width","auto!important");
	  	    $("#iframedocument").contents().find("img").css("height","auto!important");
	          };
	          reader.readAsDataURL(file);
	      }
	     }
	      }

	    
	      else
	      {
	      	$("#"+event.target.id).val("");
	      	showalert("Please upload valid file","");
	      }
	  });

}


function addtable(rowtable)
{
var rowidid=$(rowtable).parent().parent().attr("id");
var tablename=rowidid.split("-")[0];
var tds=$("#"+rowidid+" td");
var valid=true;
var groupname=rowidid.split("-")[0];
var createtd="";
var inputselectval="";
var val="";
for(var i=0;i<tds.length-1;i++)
{
		if($(tds[i]).find("select").length>0)
		{		
			
			if($(tds[i]).find("select").attr("requiredval")=="1")
			{
				    if($(tds[i]).find("select").val()=="0"||$(tds[i]).find("select").val()=="")
					{				    	
				    	$(tds[i]).find("select").focus();
				    	$(tds[i]).find("select").addClass("requiredfield");
				    	valid=false;	
				    	 $("#loader").hide();
				    	return false;
					}
				    else
				    {
				    	if(!($(tds[i]).find("select").hasClass("requiredfielderror")))
				    	{
				    	$(tds[i]).find("select").removeClass("requiredfield");
				    	}
				    	else
				    	{
				    		$(tds[i]).find("select").focus();
					    	$(tds[i]).find("select").addClass("requiredfield");
					    	valid=false;	
					    	 $("#loader").hide();
					    	return false;
				    	}				    		
				   }
			}
			else
				{
				if(!($(tds[i]).find("select").hasClass("requiredfielderror")))
		    	{
		    	$(tds[i]).find("select").removeClass("requiredfield");
		    	}
		    	else
		    	{
		    		$(tds[i]).find("select").focus();
			    	$(tds[i]).find("select").addClass("requiredfield");
			    	valid=false;	
			    	 $("#loader").hide();
			    	return false;
		    	}	
				}
			
		}
		if($(tds[i]).find("input").length>0)
		{ 
			
		   if($(tds[i]).find("input").attr("requiredval")=="1")
		   {
			   if($(tds[i]).find("input").val()=="")
				{
				 
				   $(tds[i]).find("input").focus();
				   $(tds[i]).find("input").addClass("requiredfield");
				   valid=false;	
				   $("#loader").hide();
			       return false;
				}
			   else
			   {
				   if(!($(tds[i]).find("input").hasClass("requiredfielderror")))
			    	{
			    	$(tds[i]).find("input").removeClass("requiredfield");
			    	}
			    	else
			    	{
			    		$(tds[i]).find("input").focus();
				    	$(tds[i]).find("input").addClass("requiredfield");
				    	valid=false;	
				    	 $("#loader").hide();
				    	return false;
			    	}
				 
			   }
		   }
		   else
			   {
			   if(!($(tds[i]).find("input").hasClass("requiredfielderror")))
		    	{
		    	$(tds[i]).find("input").removeClass("requiredfield");
		    	}
		    	else
		    	{
		    		$(tds[i]).find("input").focus();
			    	$(tds[i]).find("input").addClass("requiredfield");
			    	valid=false;	
			    	 $("#loader").hide();
			    	return false;
		    	}
			   }
			
		}	
}
if(valid){
var inputselectval="";
for(var i=0;i<tds.length-1;i++)
   {
		if($(tds[i]).find("select").length>0)
		{		
			inputselectval="";
			val=$(tds[i]).find("select").find("option:selected").text();
			inputselectval="<input type='hidden' value='"+$(tds[i]).find("select").val()+"'/> ";
		}		
		else if($(tds[i]).find("input[type=file]").length>0)
		{
			inputselectval="";
			val="<input type='hidden' value='"+$(tds[i]).find("input[type=hidden]").val()+"'/> ";			
		    inputselectval="<a style='color:black!important;' target='_blank' " +
		    		"href='"+$(tds[i]).find("a").attr("href")+"'>" +"click to view</a>";			
		}
		else{
		if($(tds[i]).find("input[type=checkbox]").length>0)
		{  
				if($(tds[i]).find("input[type=checkbox]").prop("checked"))
				{
					inputselectval="";
					val="1";
				}
				else
				{
					inputselectval="";
				    val="0";
				}							
		}
		else
		{
		if($(tds[i]).find("input").length>0)
		{  
		inputselectval="";
		val=$(tds[i]).find("input").val();				
		}
		else
		{
		val="";
		}
		}
		}
		createtd+="<td>"+inputselectval+val+"</td>";
   }

$("#photo"+rowidid+"uploadfile").remove();
var removebtn='<td><button style="margin-top:0;" type="button" onclick="removetable(this);" class="button btn btn-primary">Remove</button></td>';
createtd=createtd+removebtn;
createtd="<tr id='"+groupname+"-1'>"+createtd+"</tr>";
$(createtd).insertBefore($("#"+rowidid));
var trs=$("#"+tablename+" tbody tr");
for(var i=0;i<trs.length;i++)
{
	$(trs[i]).removeAttr("id");
	$(trs[i]).attr("id",tablename+"-"+i);
	tds=$(trs[i]).find("td:last");
}
$("#"+rowidid.split("-")[0]+" tr:last td").find("input").val("");
$("#"+rowidid.split("-")[0]+" tr:last td").find("select").val("0");
}
}
function removetable(removetd){
	var rowidid=$(removetd).parent().parent().attr("id");
	var tablename=$(removetd).parent().parent().attr("id").split("-")[0];
	$("#"+rowidid).remove();
	var trs=$("#"+tablename+" tbody tr");
	for(var i=1;i<trs.length-1;i++)
	{
		$(trs[i]).removeAttr("id");
		$(trs[i]).attr("id",tablename+"-"+i);			
	}
	$("#"+tablename+" tr select").change();
	$("#"+tablename+" tr input").blur();
}
function selectwithother(ctrl)
{
	
}

var documentsblob = [];

$('.uploadtablefile').change( function(event) {
	var documentno=documentsblob.length;
	var temppath = URL.createObjectURL(event.target.files[0]);	
	$("#photo"+event.target.id).remove();
	var files = event.target.files;
    var file = files[0];
    var acceptedfile="jpeg/jpg/pdf";
    var validfile=false;
    var filename=file.name.toLowerCase();
    if($("#"+event.target.id).attr("accept")!=undefined)
    {
    	acceptedfile=$("#"+event.target.id).attr("accept");
    } 
    for(var filedata=0;filedata<acceptedfile.split(",").length;filedata++)
    {
    	for(var filedatachild=0;filedatachild<acceptedfile.split(",")[filedata].split("/").length;filedatachild++)
        {
    	 if(filename.indexOf(acceptedfile.split(",")[filedata].split("/")[filedatachild])>-1)
    	 {
    		validfile=true;
    	 }
        }
    }   	
    if(validfile)
    {
  
	
    var docsize=$("#"+event.target.id).attr("docsize");
    if(docsize!=undefined){
    if(parseInt(file.size)>parseInt(docsize))
    {
    	$("#"+event.target.id).val("");
    	if(parseInt(docsize)>parseInt(1024*1024*10))
    	{
    	showsticky("Document size should not be greater then "+ parseInt(parseInt(docsize)/(1024*1024)) +" MB","");
    	}
    	else
    	{
    	showsticky("Document size should not be greater then "+ parseInt(parseInt(docsize)/(1024)) +" kB","");
    	}
    	
    }
    else
    {   
    if (file) 
    {
        var reader = new FileReader();
        reader.onload = function(e) {
        var base64=e.target.result;	 
        $("#iframedocument").attr("src",temppath);
	    $("#documentmodel").show();
	    $("#documentmodelupload").attr("fileid",event.target.id);	
	    $("#iframedocument").contents().find("img").css("width","auto!important");
	    $("#iframedocument").contents().find("img").css("height","auto!important");
        };
        reader.readAsDataURL(file);
    }
   }
    }

  }
    else
    {
    	$("#"+event.target.id).val("");
    	showalert("Please upload valid file","");
    }
});
$("#documentmodelcancel").click(function(){
	  var id=$("#documentmodelupload").attr("fileid"); 
	  $("#"+id).val("");
	  $("#iframedocument").attr("src","");
	  $("#documentmodel").hide();
});
$("#documentmodelupload").click(function(){	
	  updateImage($("#documentmodelupload").attr("fileid"));	  
	  $("#documentmodel").hide();
});
function base64ImageToBlob(str) {
	  // extract content type and base64 payload from original string
	  var pos = str.indexOf(';base64,');
	  var type = str.substring(5, pos);
	  var b64 = str.substr(pos + 8);
	  // decode base64
	  var imageContent = atob(b64);
	  // create an ArrayBuffer and a view (as unsigned 8-bit)
	  var buffer = new ArrayBuffer(imageContent.length);
	  var view = new Uint8Array(buffer);
	  // fill the view, using the decoded base64
	  for(var n = 0; n < imageContent.length; n++) {
	    view[n] = imageContent.charCodeAt(n);
	  }
	  // convert ArrayBuffer to Blob
	  var blob = new Blob([buffer], { type: type });
	  return blob;
	}
function toggleul(ctrl)
{
	$(".treeview").find(".tree-menu").hide();	
	$(ctrl).find(".tree-menu").toggle();	
}
function getmonth(month)
{
	switch(month)
	{
	case "January":
		return 1;
		break;
	case "February":
		return 2;
		break;
	case "March":
		return 3;
		break;
	case "April":
		return 4;
		break;
	case "May":
		return 5;
		break;
	case "June":
		return 6;
		break;
	case "July":
		return 7;
		break;
	case "August":
		return 8;
		break;
	case "September":
		return 9;
		break;
	case "October":
		return 10;
		break;
	case "November":
		return 11;
		break;
	case "December":
		return 12;
		break;
	default:
		return 0;
		break;
	}
}
function updateImage(id) {	
	      var form = $('#form_document'+id)[0];
	      var data = new FormData(form);     
	      
	      var sessionurl="UploadDocument";
	      var url="/";
	      $.ajax({
	          type: "POST",
	          enctype: 'multipart/form-data',
	          url: url+sessionurl,
	          data: data,
	          processData: false,
	          contentType: false,
	          cache: false,
	          timeout: 600000,
	          success: function (data) {
	        	  if(data.indexOf("sucess")>-1)
	        	  {
	        		$($('#form_document'+id)[0]).parent().find("a").remove();
	        		$($('#form_document'+id)[0]).parent().find("img").remove();
	        		
	        	    var inputselectval="<div id='photo"+id+"'>";
	        		if($($('#form_document'+id)[0]).parent().find("input[type=hidden]").length>0)
	        		{
	        			$($($('#form_document'+id)[0]).parent().find(("input[type=hidden]:not(#fname)"))).val(data.split(":")[1]);
	        		}	        		
	        	    
	        	    if($($('#form_document'+id)[0]).parent().find("input[type=file]").length>0)
	        		{
	        	    	var filename=$("#"+id).val();
	        	    	 if(filename.indexOf("pdf")>-1)
            			  {
	        	    		 
	        	    		 $("<a title='click to view' target='_blank' href='"+url+"PDFViewer.jsp?pdf="+data.split(":")[1]+"' style='cursor:pointer;float:left;'><img title='click to view' style='width: 30px;height: 30px;' src='"+url+"img/pdficon.png'></img></a><a title='click to view' target='_blank' href='"+url+"PDFViewer.jsp?pdf="+data.split(":")[1]+"' style='cursor:pointer;float:left;'><span style='float: left;color: orange;font-weight: bolder;'>click to view</span></a>").insertAfter($($($('#form_document'+id)[0]).parent().find("input[type=file]")));
	        	    	  }
            			  else
            			  {
            				$("<a title='click to view' target='_blank' href='"+url+"PDFViewer.jsp?pdf="+data.split(":")[1]+"' style='cursor:pointer;float:left;'><img title='click to view' style='width: 30px;height: 30px;' src='"+url+"img/imageicon.png'></img></a><a title='click to view' target='_blank' href='"+url+"PDFViewer.jsp?pdf="+data.split(":")[1]+"' style='cursor:pointer;float:left;'><span style='float: left;color: orange;font-weight: bolder;'>click to view</span></a>").insertAfter($($($('#form_document'+id)[0]).parent().find("input[type=file]")));	            			
            			  }        	    	
	        		}	        	   
	        	    $(inputselectval).insertBefore("#"+id);
	        	    showsticky("File Uploaded Successfully","");
	        	  }
	        	  else
	        	  {	        		 
	        		  showsticky("Fail to upload file","");
	        	  }
	          },
	          error: function (e) {	
	          }
	      });
	}
$(".selectwithother").change(function(){
	if(($(this).val().toUpperCase())=="OTHERS"||($(this).val().toUpperCase())=="OTHER")
		{
		$("#selectwithotherpopup").show();
		}
	
});	
function closemodel(id)
{
$("#"+id).hide();	
}

function toggledata(id)
{
	$("#"+id).toggle();
}

function iframeonload(ctrl)
{
   $(ctrl).contents().find('img').attr("style","width:auto");
}
var redirecturl="";
function showsticky(msg,redirect)
{
	redirecturl=redirect;
	if(msg!=""&&msg!="null"&&msg!=null)
	{
	$(".stickynote p.msg").html(msg.replace(/\\n/g,"<br/><br/>"));
	$(".stickynote").show();
	}
}

function showalert(msg,redirect)
{
	redirecturl=redirect;
	if(msg!=""&&msg!="null"&&msg!=null)
	{
	$(".alertnote p.msg").html(msg.replace(/\\n/g,"<br/><br/>"));
	$(".alertnote").show();	
	}
	
}
var otherselectid=null;
var selectotheridvalue=0;
function showotherdialogue(otherid,selectid)
{
	otherselectid=otherid;
/*	if(($(otherid).find("option:selected").html().indexOf("OTHERS")>-1)||($(otherid).find("option:selected").html().indexOf("OTHER")>-1)||($(otherid).find("option:selected").html().indexOf("others")>-1)||($(otherid).find("option:selected").html().indexOf("other")>-1)||($(otherid).find("option:selected").html().indexOf("Others")>-1)||($(otherid).find("option:selected").html().indexOf("Other")>-1)){*/
	if(($(otherid).find("option:selected").html().indexOf("OTHERS")==0)||($(otherid).find("option:selected").html().indexOf("OTHER")==0)||($(otherid).find("option:selected").html().indexOf("others")==0)||($(otherid).find("option:selected").html().indexOf("other")==0)||($(otherid).find("option:selected").html().indexOf("Others")==0)||($(otherid).find("option:selected").html().indexOf("Other")==0))
	{	
		selectotheridvalue=$(otherid).val();
	    $(".selectotherblock").show();	
	}
	formcondition(otherid);
}
function selectotherblockadd(){
	$(".selectotherblock").hide();
	$(otherselectid).append("<option selected='selected' value='"+$("#textforselectwithother").val()+"'>"+$("#textforselectwithother").val()+"</option>");
	$("#textforselectwithother").val("");
}
function selectotherblockcancel(){
	$(".selectotherblock").hide();
}
function alertnoteclose()
{
	$(".alertnote").hide();	
	if(redirecturl!="")
	{
	window.location.href=redirecturl;
	}
}
function stickynoteclose()
{
	$(".stickynote").hide();
	if(redirecturl!="")
	{
	window.location.href=redirecturl;
	}
	
}
function editmastertable(ctrl)
{
	$(ctrl).parents("tr").find(".editrow").show();
	$(ctrl).parents("tr").find(".noneditrow").hide();
}
function updatemastertable(ctrl)
{
	var allkeys=$(ctrl).parents("table").find("thead th");
	var allval=$(ctrl).parents("tr").find("td:not(.noneditrow,.editrownotvisibledisplay)");
	var json="";
	var isvalid=true;
	for(var i=0;i<allval.length-1;i++)
	{	
	if($(allval[i]).find("select").length>0)
	{			
		
		if($(allval[i]).find("select").attr("requiredval")=="1")
		{
			    if($(allval[i]).find("select").val()==""||$(allval[i]).find("select").val()=="0")
				{					    	
			    	$(allval[i]).find("select").focus();
			    	$(allval[i]).find("select").addClass("requiredfield");
			    	isvalid=false;
			    	
				}
			    else
			    {
			    	if($(allval[i]).find("select").hasClass("requiredfielderror"))
			    	{
			    		$(allval[i]).find("select").focus();
				    	$(allval[i]).find("select").addClass("requiredfield");
				    	valid=false;
				    }
			    	else{
			    	$(allval[i]).find("select").removeClass("requiredfield");
			    	}
			    }
		}
		
	}
	else if($(allval[i]).find("input").length>0&&($(allval[i]).find("input").attr("type")!="search"))
	{ 
		if($(allval[i]).find("input[type=file]").length>0)
		{
			if($(allval[i]).find("input[type=file]").attr("requiredval")=="1")
			   {
				   if($(allval[i]).find("input[type=hidden]").val()=="0"||$(allval[i]).find("input[type=hidden]").val()==""||$(allval[i]).find("input[type=hidden]").val()=="null")
					{									   
					   $(allval[i]).find("input[type=file]").focus();
					   $(allval[i]).find("input[type=file]").addClass("requiredfield");
					   valid=false;					       
					}
				   else
				   {
					   if($(allval[i]).find("input[type=file]").hasClass("requiredfielderror"))
				    	{
				    		$(allval[i]).find("input[type=file]").focus();
					    	$(allval[i]).find("input[type=file]").addClass("requiredfield");
					    	isvalid=false;
					    }
				    	else{
				    	$(allval[i]).find("input[type=file]").removeClass("requiredfield");
				    	}
					   
				   }
			   }
		}
		else
		{
			if($(allval[i]).find("input").attr("requiredval")=="1")
			   {
				if($(allval[i]).find("input").attr("type")=="checkbox")
				{
				
				}
				else{
				   if($(allval[i]).find("input").val()==""||$(allval[i]).find("input").val()=="null")
					{									   
					   $(allval[i]).find("input").focus();
					   $(allval[i]).find("input").addClass("requiredfield");
					   isvalid=false;					       
					}
				   else
				   {
					   if($(allval[i]).find("input").hasClass("requiredfielderror"))
				    	{
				    		$(allval[i]).find("input").focus();
					    	$(allval[i]).find("input").addClass("requiredfield");
					    	isvalid=false;
					    }
				    	else{
				    	$(allval[i]).find("input").removeClass("requiredfield");
				    	}
				   }
			   }
			 }
		 }
				  				
      }
	else if($(allval[i]).find("textarea").length>0)
		{
		if($(allval[i]).find("textarea").attr("requiredval")=="1")
		   {
			 if($(allval[i]).find("textarea").val().trim()==""||$(allval[i]).find("textarea").val().trim()=="null")
				{									   
				   $(allval[i]).find("textarea").focus();
				   $(allval[i]).find("textarea").addClass("requiredfield");
				   isvalid=false;					       
				}
			   else
			   {
				   if($(allval[i]).find("textarea").hasClass("requiredfielderror"))
			    	{
			    		$(allval[i]).find("textarea").focus();
				    	$(allval[i]).find("textarea").addClass("requiredfield");
				    	isvalid=false;
				    }
			    	else{
			    	$(allval[i]).find("textarea").removeClass("requiredfield");
			    	}
			   }
		   }
		}
	}
	if(isvalid)
	{
	for(var i=0;i<allkeys.length-1;i++)
	{
		var key=$(allkeys[i]).find("input[type=hidden]").val();
		var val="";
		if($(allval[i]).find("input").length>0&&($(allval[i]).find("input").attr("type")!="search"))
		{	
			if($(allval[i]).find("input[type=hidden]").length>0)
			{
				val=$(allval[i]).find("input[type=hidden]").val();
			}
			else
			{
				if($(allval[i]).find("input").attr("type")=="checkbox")
				{
					if($(allval[i]).find("input[type=checkbox]").prop("checked"))
						{
						val="1";
						}
					else
						{
						val="0";
						}
				}
				else
				{
				val=$(allval[i]).find("input").val();
				}
			}
						
		}	
		else 
		if($(allval[i]).find("select").length>0)
		{	
			if($(allval[i]).find("select").hasClass("selectwithother"))
			{
				/*if($(allval[i]).find("select").val()=="selectwithothervalue")
				{								
					val='"'+"OTHER"+key+'"'+':'+'"'+$(allval[i]).find("select").find("option:selected").html().trim()+'"'+',';		
					val=val+'"'+key+'"'+':'+'"'+$(allval[i]).find("select").find("option:selected").attr("otherid")+'"'+',';
					key="addasitis";
					val=$(allval[i]).find("select").val();
				}
				else
				{
					val=$(allval[i]).find("select").val();
				}*/
				val=$(allval[i]).find("select").val();
			}
			else
			{
			val=$(allval[i]).find("select").val();
			}
		}
		else
		{
			if($(allval[i]).find("textarea").length>0)
			{	
				val=$(allval[i]).find("textarea").val();
			}
			else
			{
		      val=$(allval[i]).html().trim();
			}
		}	
		
		json+='"'+key+'":"'+val+'",';
		
	}
	postdatatoserver(json,'saveandnext','saveandnext','','');
	$(ctrl).parents("tr").find(".editrow").hide();
	$(ctrl).parents("tr").find(".noneditrow").show();
	}
}
function generatetablestructurereport()
{
	$("#loader").show();
	var FormDetails="";
	for(var i=0;i<$("#AllFields .form  div input:visible").length;i++)
	{		
		if($($("#AllFields .form  div input:visible")[i]).attr("name")!=undefined){
			if($($("#AllFields .form  div input:visible")[i]).attr("type")=="checkbox")
			{
				if($($("#AllFields .form  div input:visible")[i]).parent("div").is(":visible"))
    			{
				if($($("#AllFields .form  div input:visible")[i]).is(':checked'))
				{
					if($($("#AllFields .form div input:visible")[i]).parent().parent().is(":visible"))
					{
					var name=$($("#AllFields .form  div input:visible")[i]).siblings("label").attr("displayname");
					FormDetails=FormDetails+'"'+name+'"'+':'+'"'+"1"+'"'+',';
					}
				}
				else
				{
					if($($("#AllFields .form div input:visible")[i]).parent().parent().is(":visible"))
					{
					var name=$($("#AllFields .form  div input:visible")[i]).siblings("label").attr("displayname");
					FormDetails=FormDetails+'"'+name+'"'+':'+'"'+"0"+'"'+',';
					}
				}
    			}
				else{
					if($($("#AllFields .form div input:visible")[i]).parent().parent().is(":visible"))
					{
					var name=$($("#AllFields .form  div input")[i]).siblings("label").attr("displayname");
					FormDetails=FormDetails+'"'+name+'"'+':'+'"'+"0"+'"'+',';
					}
				}
		    }
		    else
		    {
		    	if($($("#AllFields .form  div input:visible")[i]).hasClass("captcha"))
		    	{
		    	}
		    	else
		    	{
		    		if($($("#AllFields .form  div input:visible")[i]).attr("type")=="radio")
		        	{		    			
		    			
		        	}
		    		else
		    		{
		    			if($($("#AllFields .form  div input:visible")[i]).parent("div").is(":visible"))
		    			{
		    				if($($("#AllFields .form  div input:visible")[i]).hasClass("month"))
		    				{	
		    					if($($("#AllFields .form div input:visible")[i]).parent().parent().is(":visible"))
						     	{	    					
		    					 var name=$($("#AllFields .form  div input:visible")[i]).parent().find("label:first").attr("displayname");
						      	 var val=getmonth($($("#AllFields .form  div input:visible")[i]).val());
						         FormDetails=FormDetails+'"'+name+'"'+':'+'"'+val+'"'+',';
							   }
		    				}
		    				else
		    				{
		    				    if($($("#AllFields .form  div input:visible")[i]).hasClass("masktext"))
		    				    {	
		    				    	if($($("#AllFields .form div input:visible")[i]).parent().parent().is(":visible"))
		    						{
		    				     	 var name=$($("#AllFields .form  div input:visible")[i]).parent().siblings("label").attr("displayname");
						        	 var val=$($("#AllFields .form  div input:visible")[i]).siblings("span.maskval").html()+$($("#AllFields .form  div input")[i]).val();
						             FormDetails=FormDetails+'"'+name+'"'+':'+'"'+val+'"'+',';
		    						}
		    				    }
		    		             else
		    		            {	
		    		            	 if($($("#AllFields .form div input:visible")[i]).parent().parent().is(":visible"))
		    						{
				                      var name=$($("#AllFields .form  div input:visible")[i]).siblings("label").attr("displayname");
				      	              var val=$($("#AllFields .form  div input:visible")[i]).val();
				      	              if(name!="undefined")
				                      FormDetails=FormDetails+'"'+name+'"'+':'+'"'+val+'"'+',';	
		    						}
		    			        }
		    				}
		    		    } 
		    			else
		    			{
		    			  if($($("#AllFields .form  div input:visible")[i]).hasClass("uploadtablefile"))
		    			  {		    
		    				  if($($("#AllFields .form div input:visible")[i]).parent().parent().is(":visible"))
		  					   {
		    					 var name=$($("#AllFields .form  div input:visible")[i]).parent().siblings("label").attr("displayname");
		    					 //var val=$($("#AllFields .form  div input:visible")[i]).parent().find("input[type=hidden]").val();
		    					 var val=$($("#AllFields .form  div input:visible")[i]).parent().find("#doc_id").val();
						         FormDetails=FormDetails+'"'+name+'"'+':'+'"'+val+'"'+',';
		  					   }
		    				 }
		    				else
		    				{
		    				if($($("#AllFields .form  div input:visible")[i]).parent().parent().is(":visible"))
		    				{
		    					
		    				     var name=$($("#AllFields .form  div input:visible")[i]).siblings("label").attr("displayname");
					      	     var val="0";
					      	     if(name!="undefined")
					             FormDetails=FormDetails+'"'+name+'"'+':'+'"'+val+'"'+',';
		    					
		    				}
		    				}
		 		    		
		    			}
		    		}
		    	}
			  }
		}				 
	}
	var alltextarea=$("#AllFields .form  textarea:visible");
	for(var i=0;i<alltextarea.length;i++)
	{		
			 var name=$(alltextarea[i]).siblings("label").attr("displayname");
			 var val=$(alltextarea[i]).val();
	      	 FormDetails=FormDetails+'"'+name+'"'+':'+'"'+val+'"'+',';
	}
	var radiowithyesno=$("#AllFields .form  label.radiowithyesno:visible");
	
	for(var i=0;i<radiowithyesno.length;i++)
	{		
			 var name=$(radiowithyesno[i]).attr("displayname");
			 var val='N';
			 if($(radiowithyesno[i]).siblings(".radiowithyesno-YES").prop("checked"))
			 {
				 if($(radiowithyesno[i]).siblings(".radiowithyesno-YES:visible").length>0)
					 {
					 val='Y'
					 }
				
			 }
	      	 FormDetails=FormDetails+'"'+name+'"'+':'+'"'+val+'"'+',';

	}
	var radioclass=$("#AllFields .form  div.radiodiv:visible");
	for(var i=0;i<radioclass.length;i++)
	{		  
		var val="0";
		var name=$(radioclass[i]).find("label:first").attr("displayname");
		if($(radioclass[i]).find("input[type=radio]:checked").length>0)
		{
			val=$(radioclass[i]).find("input[type=radio]:checked").val();
		}
		FormDetails=FormDetails+'"'+name+'"'+':'+'"'+val+'"'+',';		
	}
	var allselects=$("#AllFields .form  div select.singleselect:visible");
	for(var i=0;i<allselects.length;i++)
	{
	 if($(allselects[i]).parent("div").is(":visible"))
	 {	
		var name=$(allselects[i]).siblings("label").attr("displayname");
		var val=$(allselects[i]).val();
	    if(val==null||val=="")
		{
		val="0";
		}
	    FormDetails=FormDetails+'"'+name+'"'+':'+'"'+val+'"'+',';
	  }
	else
	{
		var name=$(allselects[i]).siblings("label").attr("displayname");
		FormDetails=FormDetails+'"'+name+'"'+':'+'"'+'0'+'"'+',';
	}
	}
	
	var allselectswithother=$("#AllFields .form  div select.selectwithother:visible");
	for(var i=0;i<allselectswithother.length;i++)
	{
	 if($(allselectswithother[i]).parent("div").is(":visible"))
	 {	
		var name=$(allselectswithother[i]).siblings("label").attr("displayname");
		var val=$(allselectswithother[i]).val();
	    if(val==null||val=="")
		{
		val="0";
		}
	    FormDetails=FormDetails+'"'+name+'"'+':'+'"'+val+'"'+',';		   
	  }	
	}
	
	var allmultiselects=$("#AllFields .form  div select.multiselect:visible");
	for(var i=0;i<allmultiselects.length;i++)
	{		
	 var val="0";
	  var name=$(allmultiselects[i]).siblings("label").attr("displayname");
	  if($(allmultiselects[i]).parent("div").is(":visible"))
	  {
		 val=$(allmultiselects[i]).val();		
	    if(val==null||val=="")
		{
		val="0";
		}
	    else
	    {
	    	while(val.toString().indexOf(",")>-1)
	    	val=val.toString().replace(",","-");	    	
	    }
	  }	  
	  FormDetails=FormDetails+'"'+name+'"'+':'+'"'+val+'"'+',';   
	}
	FormDetails=FormDetails+listboxdata();
	var filtersdata="{"+FormDetails.substring(0,FormDetails.length-1)+"}";
	
	var filtersdatapdf="{"+FormDetails.substring(0,FormDetails.length-1)+"}";
	
	FormDetails=FormDetails+'FormName'+':'+'"'+$("#FormName").val()+'"'+','; 
	FormDetails=FormDetails+'tableid'+':'+'"'+$("#tableid").val()+'"'+','; 
	FormDetails="{"+FormDetails.substring(0,FormDetails.length-1)+"}";
	
	var gettabledatainjson="";
	gettabledatainjson="{"+gettabledatainjson;
	gettabledatainjson=gettabledatainjson+'"table_ID"'+':'+$("#tableid").val()+',';
	gettabledatainjson=gettabledatainjson+'"FormName"'+':'+'"'+$("#FormName").val()+'"'+',';
	gettabledatainjson=gettabledatainjson+'"filters"'+':'+FormDetails+',';	
	gettabledatainjson=gettabledatainjson+'"formupdateid"'+':'+'"'+$("#formupdateid").val()+'"'+'}';
	filtereddata=gettabledatainjson;
	
	var filters="";
	var divs=$(".group div");
 	for(var i=0;i<divs.length;i++)
 	{	
 		if($($(divs[i]).find("label:first")).html()!="undefined"&&$($(divs[i]).find("label:first")).html()!=undefined){
 		var key=$(divs[i]).find("label:first").attr("displayname");
 		/*var key1=$($(divs[i]).find("label:first")).html();*/
 		var key1=$($(divs[i]).find("label:first"))[0].innerText.split("\n")[0];
 		var val="";
 		if($(divs[i]).find("input[type=text]").length>0)
 		{
 			val=$($(divs[i]).find("input")).val().trim()+"\n";
 		}
 		if($(divs[i]).find("select").length>0)
 		{
 			val=$($(divs[i]).find("select option:selected")).text().trim()+"\n";
 		}
 		if($(divs[i]).find("input[type=checkbox]").length>0)
 		{
 			val=$($(divs[i]).find("input[type=checkbox]")).prop().trim()+"\n";
 		}
 		filters=filters+'["'+key1.trim()+":"+val.trim()+'"]'+',';
 		filters=filters.trim();
 		}
 	}
 	filters='['+filters.substring(0,filters.length-1)+']';
	var gettabledatainjsontopdf="";
	gettabledatainjsontopdf="{"+gettabledatainjsontopdf;
	gettabledatainjsontopdf=gettabledatainjsontopdf+'"table_ID"'+':'+$("#tableid").val()+',';
	gettabledatainjsontopdf=gettabledatainjsontopdf+'"FormName"'+':'+'"'+$("#FormDisplayName").val()+'"'+',';
	gettabledatainjsontopdf=gettabledatainjsontopdf+'"filters"'+':'+FormDetails+',';	
	gettabledatainjsontopdf=gettabledatainjsontopdf+'"formupdateid"'+':'+'"'+$("#formupdateid").val()+'"'+'}';
	filtersdatapdf=gettabledatainjsontopdf;
	
	
        	var sessionurl="GenerateTableStructurePDF";
    		var url="/";
    		$.ajax({
    	          type: "get",
    	          url: url+sessionurl,
    	          data: {pdfid:11,filtereddata:filtersdatapdf,update_id:$("#formupdateid").val(),filters:filters.trim(),TableStructure:filtereddata},	          
    	          async: false,
    	          success: function (data) {
    	        	  $("#loader").hide();
    	        	  if(data.split('-')[0]!="0")
    	        	      downloadpdf(data);
    	        	  else
    	        		  showsticky("Something went wrong.\n please try again or contact helpsedk","");
    	    		
    	          },
    	          error: function (e) {	
    	        	  $("#loader").hide();
    	          }
    	 });    
}
function canceledittablemasteradd()
{
	$(".edittablemasteradddiv").hide();
}
function showeditablemasterdiv()
{
	$(".edittablemasteradddiv").show();
}
function cancelmastertable(ctrl)
{
$(ctrl).parents("tr").find(".editrow").hide();
$(ctrl).parents("tr").find(".noneditrow").show();	
}

function showsubmenu(ctrl)
{
	$(ctrl).show();
}
function hidesubmenu(ctrl)
{
	
	$(ctrl).hide();
}
function togglemenushow(ctrl)
{
	$(".nav-item ul").hide();
	$(ctrl).siblings("ul").show();
}

function togglemenuhide(ctrl)
{
	$(".nav-item ul").hide();
}
function turnpage(pageno)
{
	$(".edittablemaster tbody tr").hide();
	$(".edittablemaster tbody tr."+pageno+"").show();
	
}
/*--------------------------SHA-----------------------*/
function rotateRight(n,x) {
	return ((x >>> n) | (x << (32 - n)));
}
function choice(x,y,z) {
	return ((x & y) ^ (~x & z));
}
function majority(x,y,z) {
	return ((x & y) ^ (x & z) ^ (y & z));
}
function sha256_Sigma0(x) {
	return (rotateRight(2, x) ^ rotateRight(13, x) ^ rotateRight(22, x));
}
function sha256_Sigma1(x) {
	return (rotateRight(6, x) ^ rotateRight(11, x) ^ rotateRight(25, x));
}
function sha256_sigma0(x) {
	return (rotateRight(7, x) ^ rotateRight(18, x) ^ (x >>> 3));
}
function sha256_sigma1(x) {
	return (rotateRight(17, x) ^ rotateRight(19, x) ^ (x >>> 10));
}
function sha256_expand(W, j) {
	return (W[j&0x0f] += sha256_sigma1(W[(j+14)&0x0f]) + W[(j+9)&0x0f] + 
sha256_sigma0(W[(j+1)&0x0f]));
}

/* Hash constant words K: */
var K256 = new Array(
	0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
	0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
	0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
	0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
	0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
	0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
	0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
	0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
	0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
	0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
	0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
	0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
	0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
	0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
	0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
	0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
);

/* global arrays */
var ihash, count, buffer;
var sha256_hex_digits = "0123456789abcdef";

/* Add 32-bit integers with 16-bit operations (bug in some JS-interpreters: 
overflow) */
function safe_add(x, y)
{
	var lsw = (x & 0xffff) + (y & 0xffff);
	var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	return (msw << 16) | (lsw & 0xffff);
}

/* Initialise the SHA256 computation */
function sha256_init() {
	ihash = new Array(8);
	count = new Array(2);
	buffer = new Array(64);
	count[0] = count[1] = 0;
	ihash[0] = 0x6a09e667;
	ihash[1] = 0xbb67ae85;
	ihash[2] = 0x3c6ef372;
	ihash[3] = 0xa54ff53a;
	ihash[4] = 0x510e527f;
	ihash[5] = 0x9b05688c;
	ihash[6] = 0x1f83d9ab;
	ihash[7] = 0x5be0cd19;
}

/* Transform a 512-bit message block */
function sha256_transform() {
	var a, b, c, d, e, f, g, h, T1, T2;
	var W = new Array(16);

	/* Initialize registers with the previous intermediate value */
	a = ihash[0];
	b = ihash[1];
	c = ihash[2];
	d = ihash[3];
	e = ihash[4];
	f = ihash[5];
	g = ihash[6];
	h = ihash[7];

        /* make 32-bit words */
	for(var i=0; i<16; i++)
		W[i] = ((buffer[(i<<2)+3]) | (buffer[(i<<2)+2] << 8) | (buffer[(i<<2)+1] 
<< 16) | (buffer[i<<2] << 24));

        for(var j=0; j<64; j++) {
		T1 = h + sha256_Sigma1(e) + choice(e, f, g) + K256[j];
		if(j < 16) T1 += W[j];
		else T1 += sha256_expand(W, j);
		T2 = sha256_Sigma0(a) + majority(a, b, c);
		h = g;
		g = f;
		f = e;
		e = safe_add(d, T1);
		d = c;
		c = b;
		b = a;
		a = safe_add(T1, T2);
        }

	/* Compute the current intermediate hash value */
	ihash[0] += a;
	ihash[1] += b;
	ihash[2] += c;
	ihash[3] += d;
	ihash[4] += e;
	ihash[5] += f;
	ihash[6] += g;
	ihash[7] += h;
}

/* Read the next chunk of data and update the SHA256 computation */
function sha256_update(data, inputLen) {
	var i, index, curpos = 0;
	/* Compute number of bytes mod 64 */
	index = ((count[0] >> 3) & 0x3f);
        var remainder = (inputLen & 0x3f);

	/* Update number of bits */
	if ((count[0] += (inputLen << 3)) < (inputLen << 3)) count[1]++;
	count[1] += (inputLen >> 29);

	/* Transform as many times as possible */
	for(i=0; i+63<inputLen; i+=64) {
                for(var j=index; j<64; j++)
			buffer[j] = data.charCodeAt(curpos++);
		sha256_transform();
		index = 0;
	}

	/* Buffer remaining input */
	for(var j=0; j<remainder; j++)
		buffer[j] = data.charCodeAt(curpos++);
}

/* Finish the computation by operations such as padding */
function sha256_final() {
	var index = ((count[0] >> 3) & 0x3f);
        buffer[index++] = 0x80;
        if(index <= 56) {
		for(var i=index; i<56; i++)
			buffer[i] = 0;
        } else {
		for(var i=index; i<64; i++)
			buffer[i] = 0;
                sha256_transform();
                for(var i=0; i<56; i++)
			buffer[i] = 0;
	}
        buffer[56] = (count[1] >>> 24) & 0xff;
        buffer[57] = (count[1] >>> 16) & 0xff;
        buffer[58] = (count[1] >>> 8) & 0xff;
        buffer[59] = count[1] & 0xff;
        buffer[60] = (count[0] >>> 24) & 0xff;
        buffer[61] = (count[0] >>> 16) & 0xff;
        buffer[62] = (count[0] >>> 8) & 0xff;
        buffer[63] = count[0] & 0xff;
        sha256_transform();
}

/* Split the internal hash values into an array of bytes */
function sha256_encode_bytes() {
        var j=0;
        var output = new Array(32);
	for(var i=0; i<8; i++) {
		output[j++] = ((ihash[i] >>> 24) & 0xff);
		output[j++] = ((ihash[i] >>> 16) & 0xff);
		output[j++] = ((ihash[i] >>> 8) & 0xff);
		output[j++] = (ihash[i] & 0xff);
	}
	return output;
}

/* Get the internal hash as a hex string */
function sha256_encode_hex() {
	var output = new String();
	for(var i=0; i<8; i++) {
		for(var j=28; j>=0; j-=4)
			output += sha256_hex_digits.charAt((ihash[i] >>> j) & 0x0f);
	}
	return output;
}

/* Main function: returns a hex string representing the SHA256 value of the 
given data */
function sha256_digest(data) {
	sha256_init();
	sha256_update(data, data.length);
	sha256_final();
        return sha256_encode_hex();
}
/*-----------------------END SHA------------------------*/


$(".selectall").click(function(){
	var countth=0;
	var checkval=true;
	var checkvalue="1";
	if(!($(this).prop("checked")))
		{
		checkval=false;
		checkvalue="0"
		}
	
	for(var i=0;i<$(this).parents("table").find("th").length;i++)
	{
		if($($(this).parents("table").find("th")[i]).find(".selectall").length>0)
			{
			if(countth==0)
			countth=i;
			}
	}
	for(var i=0;i<$(this).parents("table").find("tbody tr").length;i++)
	{
		if($($($(this).parents("table").find("tbody tr")[i]).find("td")[countth]).find("input[type=checkbox]").length>0)
			{
			$($($(this).parents("table").find("tbody tr")[i]).find("td")[countth]).find("input[type=checkbox]").prop("checked",checkval);
			$($($(this).parents("table").find("tbody tr")[i]).find("td")[countth]).find("input[type=checkbox]").val(checkvalue);
			}
	}
	
	
});


$(".edittable table tbody tr input[type=checkbox]").click(function(){
	var countth=0;
	var checkval=true;
	var checkvalue="1";
	if(!($(this).prop("checked")))
		{
		checkval=false;
		checkvalue="0";
		$(this).val("0");
		}
	else
		{
		$(this).val("1");
		}
	
	for(var i=0;i<$(this).parents("table").find("th").length;i++)
	{
		if($($(this).parents("table").find("th")[i]).find(".selectall").length>0&&checkval==false)
			{
			$($(this).parents("table").find("th")[i]).find(".selectall").prop("checked",checkval);
			}
	}
	
});

/*-------------------------camera snap start------------------------------*/
function cameramodelcancel(){
	$('#my_camera').show();
	$('#cameramodelresults').hide();
}
$("#cameramodelclose").click(function(){
	Webcam.reset();
	$('#cameramodel').hide();
});
function showcamera()
{  ShowCam();
	Webcam.attach('#my_camera');
	 
	cameramodelcancel();
	$("#cameramodel").show();
	
}

function ShowCam(){
	Webcam.set({
	width: 300,
	height: 300,
	facingMode: "environment",
	image_format: 'jpeg',
	jpeg_quality: 100
});

}	
function take_snapshot() {
    Webcam.snap(function(data_uri) {
    	$('#my_camera').hide();
    	$('#cameramodelresults').show();
    	$("#cameramodelhiddendata").attr("fileid","my_camera");	
    	$($("#cameramodelresults").find("#base64image")).attr("src",data_uri);
    	});
}


function SaveSnap(){
    var file =  $("#base64image").attr("src");
    if(file === undefined || file === null)
    	{alert("File can not be blank.");
    	return}
    var jsonObject = new Object();
    jsonObject["base64image"]=file;
    jsonObject["fname"]=$('#FormName').val();
   

    $.ajax({
		type : 'POST',
		url : '/SaveImage', //calling servlet      
		dataType: 'JSON',
		asysnc: false,
		data : {
			jsonPost : JSON.stringify(jsonObject)
		},
		success : function(data) {
			     if(data.status=="success")
			     {
				     $("#my_camera_val").val(data.docid);
					 $("#cameramodel").hide();
					 $("#CameraPreview").html("<a title='click to view' target='_blank' href='/PDFViewer.jsp?pdf="+data.docid+"' style='cursor:pointer;float:left;'><img title='click to view' style='width: 30px;height: 30px;' src='/img/imageicon.png'></a><a title='click to view' " +
					 		"target='_blank' href='/PDFViewer.jsp?pdf="+data.docid+"' style='cursor:pointer;float:left;'><span style='float: left;color: orange;font-weight: bolder;'>click to view</span></a>");
					 showsticky("File Uploaded Successfully","");
				 }
			     else
			     {
				     showsticky("Fail to Upload File","");
				     $("#cameramodel").hide();
			     }
			     Webcam.reset();
		    },
		error : function(xhr, ajaxOptions) {
			alert(xhr.status + " :: " + xhr.statusText);
		}
	});
	
}


/*----------------------------------camera snap end-----------------------*/
