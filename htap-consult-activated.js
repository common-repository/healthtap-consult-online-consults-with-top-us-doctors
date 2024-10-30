(function(){
  if(window.jQuery){
    jQuery(function(){
      var data = {
        "data[][event_category]": 'ambassador_widget',
        "data[][version]": '2.0',
        "data[][value]": window.location.origin,
        "data[][event_name]": 'wordpress_install'
      };
    
      return jQuery.ajax({
          type: 'POST',
          url: 'https://www.healthtap.com/api/v2/register_feel_good_mobile_event.json?key=mQjw1P9PDaxX0niO5yiy',
          data: jQuery.param( data )
        });
    });
  }
})();
