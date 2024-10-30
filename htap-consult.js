(function(){

  var $=jQuery;
  
  var $widgets;
  
  $(document).ready(function(){
    
    $widgets = $('[id=htapWidgetConsultdoc]').each(function(){ setupWidget($(this)); });
	  
	  
  });
  
  function setupWidget($widget){

    var widgetCode=$widget.attr('data-code');
      
    $widget.find('.htapConsultQuestion').click(createAccount);
	  $widget.find('.htapQuestionInputConsult').keyup(checkTimer).trigger('keyup');
	  $widget.find('.htapFooter').click(function(){window.open('https://www.healthtap.com')});
	  $widget.on('click','.htapBtn-select-expert',function(){
	  
	    selectExpert($(this));
	    
	  });

    var timerRunning;
    function checkTimer() {
	
	    if(timerRunning)clearTimeout(timerRunning);
	    timerRunning=setTimeout(loadData, 350);
	    
    }

    var requestCount=0;
    var submitForm;
    
    function loadData() {

      if(!$widget.find('.htapQuestionInputConsult').val()){
        $widget.find('.htapSuggestedDoctors').empty();
        $widget.find('.htapIntroCopy').show();
      
    	  $widget.css('height','auto');
        var starString = getStarString(99);
        var htmlElem = '<div class="htapDoctorPanel">'
                +'<div class="htapDoctor">'
                  +'<div style="background-image: url(https://edc2.healthtap.com/ht-staging/people2/avatars/020/691/245/20691245/big_c/20691245x1428009387.png?1428009387);" class="htapAvatar"></div>'
                  +'<div class="placeholderDoctorName">'+truncate("Dr. Jay Wohlgemuth", 19)+'</div>'
                  +'<span class="htapStarWrap">'
                  + starString
                  +'</span>'
                +'</div>'
              +'</div>';

        dataHtml = htmlElem;

        $widget.find('.htapSpinnerConsult').hide();
        $widget.find('.htapSuggestedDoctors').append(dataHtml);
        return;
      }   

      $widget.find('.htapSuggestedDoctors').empty();
      $widget.find('.htapSpinnerConsult').show();
      $widget.find('.htapSpinnerConsult').html('Finding doctors...');
      $widget.find('.htapIntroCopy').hide();
      
      var h=$widget.height()-($widget.find('.htapHeader').height()||0)-($widget.find('.htapFooter').height()||0)-($widget.find('.htapQuestionForm').height()||0);
    	$widget.css('height','auto');
      
      $.ajax({
            dataType: "jsonp",
            requestCount:++requestCount,
            url: "https://www.healthtap.com/widget/get_experts.json?search_string=" + $widget.find('.htapQuestionInputConsult').val(),
            success: function(data) {
              
              //calling abort for jsonp request triggers the error callback which is not ideal
              //so instead just check we are on the last request              
              if(requestCount !== this.requestCount)return; 
              
            	$widget.find('.htapSuggestedDoctors').empty();
            	var dataHtml = "";
            	var expertInfo;
            	
            	if(data.length){
              	for (var i = 0; i < 1; i++) {
              		expertInfo = data[i].person;
              		var locationString = expertInfo.city == null || expertInfo.city == "" ? expertInfo.state : expertInfo.city + ", " + expertInfo.state;
              		var starString = getStarString(expertInfo.doc_score);
              		var htmlElem = '<div class="htapDoctorPanel">'
                    			+'<div class="htapDoctor">'
	                    			+'<div style="background-image: url('+expertInfo.avatar+');" class="htapAvatar"></div>'
	                    			+'<a href="https://www.healthtap.com/experts/'+expertInfo.id+'" class="htapDoctorName">'+truncate("Dr. " + expertInfo.name + " " + expertInfo.last_name, 19)+'</a>'
	                    			+'<div class="htapSpecialty">'+truncate(expertInfo.specialty, 19)+'</div>'        
	                    			+'<span class="htapStarWrap">'
	                    			+ starString
	                    			+'</span>'
	                    			+'<div class="htapPolis">'
	                    			+'<div class="htapLocationIcon"></div>'+locationString
	                    			+'</div>'       
	                    			//+'<div class="htapBtn htapBtn-select-expert" data-expert-id="'+expertInfo.id+'" >Select</div>'
                    			+'</div>'
                    		+'</div>';

                  dataHtml += htmlElem;
              	}
            	}
            	
            	$widget.find('.htapSpinnerConsult').hide();
            	$widget.find('.htapSuggestedDoctors').append(dataHtml);
            	$widget.find('.htapConsultEmailInput').on('focus', function() {
            		$(this).removeClass('htapRedGlow');
            	});
            	if(expertInfo)autoselectExpert(expertInfo.id);
            },
            error: function() {
            	$widget.find('.htapSpinnerConsult').html('Server error');
            }
        });
    }

    function getStarString(docScore) {
	    var string = "";
	    for(var i = 1; i < (parseInt(docScore)+5)/20; i++ ){
		    string += '<div class="htapFilledStar"></div>';
	    }
	    if ((parseInt(docScore) * 2 / 20.0)%2%1 < 0.5){
		    string += '<div class="htapHalfStar"></div>';
	    }
	    return string;
    }

    function truncate(string, len) {
	    if (string.length > len) {
		    return string.substring(0, len) + "...";
	    } else {
		    return string
	    }
    }

    function validateEmail(emailString) {
	    if (emailString == null || emailString.length == 0) {
		    return false;
	    }
	    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(emailString);
    }

    
    function selectExpert($btn) {
	    
	    var expert_id=$btn.attr('data-expert-id');
	    var $widget=$btn.closest('[id=htapWidgetConsultdoc]');	  
	    var $selected=$widget.find('.htapBtn-select-expert.htapSelected').removeClass('htapSelected');
	    if($selected[0]!==$btn[0]){
	      
	      $btn.addClass('htapSelected');
	      $widget.find('.htapConsultQuestion').removeClass('htapInactive');
	      $widget.data('consult-url','https://www.healthtap.com/experts/'+expert_id+'/message');

      }else{
      
        $widget.find('.htapConsultQuestion').addClass('htapInactive');
        $widget.data('consult-url','');
	    
      }
	    
    }
    
    function autoselectExpert(expert_id){
      $widget.find('.htapConsultQuestion').removeClass('htapInactive');
      $widget.data('consult-url','/experts/'+expert_id+'/message');
    }
    
    this.submitUsage = function(){
    
      var data = {
        "data[][event_category]": 'ambassador_widget',
        "data[][version]": '2.0',
        "data[][value]": window.location.href,
        "data[][event_name]": 'wordpress_send_question'
      };
    
      return $.ajax({
          type: 'POST',
          url: 'https://www.healthtap.com/api/v2/register_feel_good_mobile_event.json?key=mQjw1P9PDaxX0niO5yiy',
          data: $.param( data )
        });
      
    };

    
    function createAccount(e) {
    
      e.preventDefault();
      var $widget=$(this).closest('[id=htapWidgetConsultdoc]');
	    var sendQuestionButton = $widget.find('.htapConsultQuestion');
	    var consultURL = $widget.data('consult-url');
	    
	    if (sendQuestionButton.hasClass('htapInactive') || !consultURL || consultURL=='' ) {
		    return;
	    }
	    
	    var emailAddr = $widget.find('.htapConsultEmailInput').val();
        if (!validateEmail(emailAddr)) {
        
        	var htapEmailInput = $widget.find('.htapConsultEmailInput');
        	htapEmailInput.val('');
        	htapEmailInput.attr('placeholder', 'Enter a valid email address');
        	htapEmailInput.addClass('htapRedGlow');
        	
        } else {
		      
		      sendQuestionButton.html('Loading...');
	        if(!submitForm){
              
            submitForm=$('<form style="display:none !important;" method="post" action="https://www.healthtap.com/widget/create_customer" target="_blank" >\
              <input type="hidden" value="" name="email" />\
              <input type="hidden" value="true" name="auto_signup" />\
              <input type="hidden" value="mQjw1P9PDaxX0niO5yiy" name="key" />\
              <input type="hidden" value="" name="redirect_to" />\
            </form>').appendTo('body');
          
          }
          
          submitForm.find('[name=email]').val(emailAddr);
          submitForm.find('[name=redirect_to]').val(consultURL+'?from_seo=1&promo_code='+encodeURIComponent(widgetCode)+'&referrer='+encodeURIComponent(widgetCode)+'&question='+encodeURIComponent($widget.find('.htapQuestionInputConsult').val()));            
          $.when(submitUsage()).always(function(){
            submitForm.submit();
            sendQuestionButton.html('Send question');
          });
          
          
	    }
    }
    
  }
  
})();
