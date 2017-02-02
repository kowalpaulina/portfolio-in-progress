var wys=0;
$(document).ready(function(){
    move();
    wys_nav=$('.main-nav').height();
    mark();
    scroll();
    hamburger();
    overlay();
});

$(window).load(function(){
    preloader();
});

function preloader()
{var overlay_preloader=$('#overlay_preloader');
 $('#overlay_preloader').addClass('loaded');
 $('body').removeClass('loading');
}

function move(){
    $('.name').waypoint(function(direction){
        if(direction=="down"){
            $('nav').addClass('move');
        }else{$('nav').removeClass('move')}},{offset:'60px'});}

function mark(){
    $(window).scroll(function(){
        wys_nav=$('.main-nav').height();
        wys_top=$(window).scrollTop()+wys_nav+5;
        $('section').each(function(){
            nav=$('nav');
            offset=$(this).offset().top;
            if(nav.hasClass('move'))
                if(wys_top>=$(this).offset().top){
                    $('.btn .move').removeClass('active');
                    $('.btn').removeClass('active');
                    $('#'+$(this).data('type')).addClass('active');
                }});});}

function scroll(){
    $('.btn').on('click',function(){
        wys_nav=$('.main-nav').height();
        button=$(this).attr('id');
        miejsce=$('.'+button).offset().top;
        place_nav_wys=miejsce-=wys_nav+1;
        $('body, html').animate({scrollTop:place_nav_wys+'px'},1200);
        return false;});}

function hamburger(){$('.mobile-circle-menu').click(function(){navigation=$('.main-nav');icon=$('.mobile-circle-menu i');navigation.slideToggle(200);if(icon.hasClass('ion-navicon')){icon.addClass('ion-android-close');icon.removeClass('ion-navicon');}else{icon.removeClass('ion-android-close');icon.addClass('ion-navicon');}});}function overlay(){$('.mentors-photo').on('mouseenter touchstartbtap',function(){description=$(this).children().data('desc');title=$(this).children().data('title');$(this).append('<div class="overlay"></div>');overlay=$(this).children('.overlay');overlay.html('<h3>'+title+'</h3><p>'+description+'</p>');overlay.fadeIn(800);preventDefault;});$('.mentors-photo').on('mouseleave vmouseover',function(){overlay.fadeOut(500);});}