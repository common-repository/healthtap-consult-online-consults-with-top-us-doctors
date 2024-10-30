<?php
/*
Plugin Name: HealthTap Consult
Plugin URI: http://www.wpexplorer.com/
Description: Enables visitors to your site to locate and book a virtual consult with a HealthTap Concierge doctor near them who specializes in a given health topic.
Version: 1.0
Author: HealthTap
Author URI: https://www.healthtap.com/
License: GPL2
*/



/* ---------- Settings menu ------------ */

/* ---------- End of settings menu ---------- */


define( 'HTAP_CONSULT_VERSION', '1.0' );
define( 'HTAP_CONSULT_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
define( 'HTAP_CONSULT_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );



/* Widget front-end scripts and styles */
function htap_consult_add_widget_scripts() {
	wp_enqueue_script('consult-script', plugins_url('htap-consult.js', __FILE__), array('jquery'));
	wp_enqueue_style('consult-style', plugins_url('htap-consult.css', __FILE__));
}
add_action('wp_enqueue_scripts', 'htap_consult_add_widget_scripts');

function htap_consult_add_admin_widget_scripts() {
  if(get_option('htap_consult_activate')=='yes'){
    update_option('htap_consult_activate','no');
	  wp_enqueue_script('consult-script-activate', plugins_url('htap-consult-activated.js', __FILE__), array('jquery'));
  }
}
add_action('admin_enqueue_scripts', 'htap_consult_add_admin_widget_scripts');

class htap_consult extends WP_Widget {

	// constructor
	function htap_consult() {
        parent::WP_Widget(false, $name = __('HealthTap Consult', 'wp_widget_plugin') );
    }

	// widget form creation
	function form($instance) { 
	
	  $dimensions=$this->get_dimensions($instance['width'],$instance['height']);
    $width=$dimensions['width'];
    $height=$dimensions['height'];
    $checked = $instance['opt-in-branding']=='yes';
    $ht_code = $instance['ht_code'];
    
	?>
	<p>
	<label for="<?php echo $this->get_field_id('ht_code'); ?>"><?php _e('HealthTap Ambassador Code', 'wp_widget_plugin'); ?></label>
	<input autocomplete="off" placeholder="Enter Code..." id="<?php echo $this->get_field_id('ht_code'); ?>" name="<?php echo $this->get_field_name('ht_code'); ?>" type="text" value="<?php echo $ht_code; ?>" />
	</p>
	<p>
	<label for="<?php echo $this->get_field_id('width'); ?>"><?php _e('Width', 'wp_widget_plugin'); ?></label>
	<input autocomplete="off" placeholder="between 230 and 375" id="<?php echo $this->get_field_id('width'); ?>" name="<?php echo $this->get_field_name('width'); ?>" type="text" value="<?php echo $width; ?>" />
	</p>
	<p>
	<label for="<?php echo $this->get_field_id('height'); ?>"><?php _e('Height', 'wp_widget_plugin'); ?></label>
	<input autocomplete="off" placeholder="between 300 and 1000" id="<?php echo $this->get_field_id('height'); ?>" name="<?php echo $this->get_field_name('height'); ?>" type="text" value="<?php echo $height; ?>" />
	</p>
	<p>
	<label for="<?php echo $this->get_field_id('opt-in-branding'); ?>"><?php _e('Show HealthTap Branding', 'wp_widget_plugin'); ?></label>
	<input autocomplete="off" id="<?php echo $this->get_field_id('opt-in-branding'); ?>" name="<?php echo $this->get_field_name('opt-in-branding'); ?>" type="checkbox" value="yes" <?php if($checked===true){ ?>checked<?php } ?> />
	</p>	
	<?php
	
	}
	
	
	

	function update($new_instance, $old_instance) {
      
      $dimensions=$this->get_dimensions($new_instance['width'],$new_instance['height']);
      $instance = $old_instance;
      
      $instance['width']=$dimensions['width'];
      $instance['height']=$dimensions['height'];
      $instance['opt-in-branding']=$new_instance['opt-in-branding']=='yes' ? 'yes' : 'no';
      $instance['ht_code']=$new_instance['ht_code'];
      
      return $instance;
      
	}
	

	function widget($args, $instance) {
	   	extract( $args );

	   	echo $before_widget;

      $ht_code = $instance['ht_code'];
	   	$width = $instance['width'];
	   	$height = $instance['height'];
      $show_logo = $instance['opt-in-branding']=='yes';
	   	// Display the widget
	   	require('htap-consult-markup.php');

	   	echo $after_widget;
	}
	
	
	function get_dimensions($width,$height){
	
	  $width=preg_replace('/[^0-9]+/','',strval($width));
	  $height=preg_replace('/[^0-9]+/','',strval($height));
	  
	  $width = ctype_digit(strval($width)) ? $width : 300;
    $height = ctype_digit(strval($height)) ? $height : 550;

    if($width < 230)$width=230;
    elseif($width > 375)$width=375;
    
    if($height < 300)$height=300;  
    elseif($height > 1000)$height=1000;  
    
    return array('width'=>$width,'height'=>$height);	
	
	}
	
	public static function plugin_activation(){	
	  
	  update_option('htap_consult_activate','yes');
	}
	
}

add_action('widgets_init', create_function('', 'return register_widget("htap_consult");'));
register_activation_hook( __FILE__, array( 'htap_consult', 'plugin_activation' ) );
	
?>
