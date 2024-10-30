<?php 
  if(!isset($width))$width=295;
  if(!isset($height))$height=640;
  if(!isset($ht_code))$ht_code='';
?>

<div id="htapWidgetConsultdoc" data-code="<?php echo htmlspecialchars($ht_code); ?>" style="height:<?php echo $height; ?>px;width:<?php echo $width; ?>px;">
  <div class="htapHeader">
    <a class="htapLogoBg" href="https://www.healthtap.com" target="_blank" ></a>
    <form id="htapQuestionForm" class="htapConsultQuestionForm">
      <textarea id="htapQuestionInput" class="htapQuestionInputConsult" maxlength="150" placeholder="Ask a health question..."></textarea>
    </form>
  </div>
  <div class="htapMainContainer">
    <div class="htapSpinner htapSpinnerConsult" style="display: none; margin-top: 50px">
      Finding doctors...
    </div>
    <div class="htapFormSection htapSelectDoctors">
      <div class="htapIntroCopy">
        <div>Ask a question and connect with the doctor</div>
        <div>of your choice, such as:</div>
      </div>
      <div class="htapSuggestedDoctors"></div>
    </div>    
  </div>
  <form id="htapQuestionForm" class="htapConsultSendForm">
    <p id="htapEnterEmailLabel">Where should we send doctor answers?</p>
    <input id="htapEmailInput" class="htapConsultEmailInput" type="email" placeholder="Enter your email address"></input>
    <a class="htapBtn htapConsultQuestion htapInactive" id="htapAskQuestion">
      Send question
    </a>
  </form>
  <?php if($show_logo){ ?>
    <a href="https://www.healthtap.com" target="_blank" class="htapFooter">
      <div class="htapFooterLogo"></div>
    </a>
  <?php } ?>
</div>
