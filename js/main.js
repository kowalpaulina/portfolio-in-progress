var wys=0;
$(document).ready(function(){
    move();
    wys_nav=$('.main-nav').height();
    mark();
    scroll();
    hamburger();
    overlay();
});

var heightNav=$('.main-nav').height(); //wys_nav
var nav=$('nav');
var navigation=$('.main-nav');
var icon=$('.mobile-circle-menu i');
var form = document.querySelector(".form");
var contactSection = document.querySelector(".contact");
var box;
var messageBox;
var msg;
var fields = form.querySelectorAll("input, textarea");

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
        var topHeight=$(window).scrollTop()+heightNav+5; //wys_top
        $('section').each(function(){
            if(nav.hasClass('move'))
                if(topHeight>=$(this).offset().top){
                    $('.btn .move').removeClass('active');
                    $('.btn').removeClass('active');
                    $('#'+$(this).data('type')).addClass('active');
                }});});}

function scroll(){
    $('.btn').on('click',function(){
        var button=$(this).attr('id');
        var btnOffset=$('.'+button).offset().top; //miejsce
        var placeToScroll=btnOffset-=heightNav+1; //place_nav_wys
        $('body, html').animate({scrollTop:placeToScroll+'px'},1200);
        return false;});}

function hamburger(){
    $('.mobile-circle-menu').click(function(){
        navigation.slideToggle(200);
        if(icon.hasClass('ion-navicon')){
            icon.addClass('ion-android-close');
            icon.removeClass('ion-navicon');
        }else{
            icon.removeClass('ion-android-close');
            icon.addClass('ion-navicon');}});}

function overlay(){
    $('.mentors-photo').on('mouseenter touchstartbtap',function(){
        var description=$(this).children().data('desc');
        var title=$(this).children().data('title');$(this).append('<div class="overlay"></div>');
        overlay=$(this).children('.overlay');overlay.html('<h3>'+title+'</h3><p>'+description+'</p>');overlay.fadeIn(800);});$('.mentors-photo').on('mouseleave vmouseover',function(){overlay.fadeOut(500);});}

function showMessage(box, msg) {
    messageBox = document.querySelector(box);
    messageBox.innerHTML = msg;
    messageBox.style.display = 'block';
}

function sendEmail(e) {

        e.preventDefault();
        fields = form.querySelectorAll("input, textarea");
        var data = {};    

    $(".form").serializeArray().map(function(x){data[x.name] = x.value;}); 
    
    //doesn't work in IE, Edge
    //fields.forEach(field => data[field.name] = field.value);
    
        $('.error').css("display","none");
        //document.querySelectorAll(".error").style.display = "none";
    
        $.ajax({
            type:"POST",
            cache: false,
            dataType:'json',
            url:"mail.php",
            data:data}).done(function(data){ 
            console.log(data);
        if(data.error){
            
            if(data.error.fnameError){
                    box = '.error-fname';
                    msg = data.error.fnameError;
                    showMessage(box, msg);
            }
    
            if(data.error.emailError){
                    box = '.error-email';
                    msg = data.error.emailError;
                    showMessage(box, msg);
                };
    
            if(data.error.messageError){
                    box = '.error-message';
                    msg = data.error.messageError;
                    showMessage(box, msg);
                }
            
        } else if(data.success){
            box = '.valid-information';
            msg = "Dziękuję " + data.dataPerson.fname + ', ' + data.success;
            showMessage(box, msg);
            form.classList.add("inActive");
            contactSection.classList.add("newHight");
        
        }
            
        else if(data.errorSentMail){
            box = '.valid-information';
            msg = data.errorSentMail;
            showMessage(box, msg);
        }
           
    });
};
form.addEventListener("submit", sendEmail, false);