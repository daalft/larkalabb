/**
 * Created by David on 12/9/2016.
 */
// Auxiliary JS file for Lärka
// Main lärka coding should be in Typescript/Angular

$(document).ready(function() {

});

function nclose() {
    $('#notice1').css("display","none");
}

// Auxiliary function to automatically close XS menu on click link
$(document).on('click','#menuxs.in',function(e) {
    if( $(e.target).is('a') && $(e.target).attr('class') !== 'dropdown-toggle' ) {
        $(this).collapse('hide');
        console.log("hiding");
    }
    console.log("Click");
});

function vh_audioStarted () {
  console.log("Larka: VH audio started");
  $('.liwrix-play-button').addClass('liwrix-play-button-inactive');
}

function vh_audioEnded () {
  $('.liwrix-play-button').removeClass('liwrix-play-button-inactive');
}

function dismissInfo() {
  console.log("dimissing");
  $('#datainfo').css('display', 'none');
}
