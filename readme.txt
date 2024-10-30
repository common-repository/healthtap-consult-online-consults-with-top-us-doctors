=== HealthTap Concierge ===
Contributors: healthtap, marcel.puyat
Donate link: https://www.healthtap.com/what_we_make/members/prime
Tags: health, doctor, medical, health tips, tips, medical advice, doctor advice, healthtap, health tap
Requires at least: 4.1.0
Tested up to: 4.1.0
Stable tag: 0.1
License: GPLv2
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Enables visitors to your site to locate and book a virtual consult with a HealthTap Concierge doctor near them who specializes in a given health topic. 

== Description ==

HealthTap Concierge is the groundbreaking digital health service that allows consumers to consult with doctors via HD video or text chat from any mobile device, personal computer, or even smartwatch.

With this widget, your visitors can type in a health question (2,000-character limit), and based upon their location and type of question, they will receive a list of doctors in their geographic area who specialize in that health topic.

They can then select a doctor, enter their email address, and click on the “send question” button to automatically create a HealthTap account and go to the HealthTap Concierge page. There they have the option to connect with the doctor in real time over video or text chat, or to send the question and have it answered asynchronously.

Provides a high-value way for visitors to interact with your site.

Where the data comes from:

The data on doctors and their information all comes from HealthTap. The plugin code makes a jsonp ajax request to www.healthtap.com/widget/get_experts.json to populate the widget with all the information on the doctors. Through this ajax request, HealthTap's servers use the visitor's question and his/her location via the IP address (note we do not track/collect any information on this computed location) to display appropriate experts on this health topic.

Where visitor data goes:

No data is collected unless a visitor clicks on the "Send question" button.

On clicking the "Send question" button (and after entering his/her email address into the prompt), a free account is created for the visitor and he/she is then taken a page (https://www.healthtap.com/experts/:id/message) where he/she can book a virtual consult with the selected expert to ask this question.

== Installation ==

1. Unzip `htap-consult.zip`
2. Upload `htap-consult` to the `/wp-content/plugins/` directory
3. Activate the plugin through the 'Plugins' menu in Wordpress

== Frequently Asked Questions ==

= How can I add my own custom styles to the widget? =

At this time, we have not provided a settings page to provide an interface for adjusting appearance settings. You are able to edit the css file (htap-consult.css) to adjust the appearance as you wish.

== Screenshots ==

1. screenshot-1.png

== Changelog ==

= 0.1 =
* First release.

== Upgrade Notice ==

No upgrades at this time.