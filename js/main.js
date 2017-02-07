var wys=0;
$(document).ready(function(){
    move();
    wys_nav=$('.main-nav').height();
    mark();
    scroll();
    hamburger();
    overlay();
    cookieVisibility();
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


//cookies fron http://grafmag.pl/artykuly/tworzymy-wlasny-komunikat-o-wykorzystaniu-plikow-cookies/

(function() {
//copyright JGA 2013 under MIT License
  var monster={set:function(e,t,n,r){var i=new Date,s="",o=typeof t,u="";r=r||"/",n&&(i.setTime(i.getTime()+n*24*60*60*1e3),s="; expires="+i.toGMTString());if(o==="object"&&o!=="undefined"){if(!("JSON"in window))throw"Bummer, your browser doesn't support JSON parsing.";u=JSON.stringify({v:t})}else u=escape(t);document.cookie=e+"="+u+s+"; path="+r},get:function(e){var t=e+"=",n=document.cookie.split(";"),r="",i="",s={};for(var o=0;o<n.length;o++){var u=n[o];while(u.charAt(0)==" ")u=u.substring(1,u.length);if(u.indexOf(t)===0){r=u.substring(t.length,u.length),i=r.substring(0,1);if(i=="{"){s=JSON.parse(r);if("v"in s)return s.v}return r=="undefined"?undefined:unescape(r)}}return null},remove:function(e){this.set(e,"",-1)},increment:function(e,t){var n=this.get(e)||0;this.set(e,parseInt(n,10)+1,t)},decrement:function(e,t){var n=this.get(e)||0;this.set(e,parseInt(n,10)-1,t)}};

    if (monster.get('cookieinfo') === 'true') {
        return false;
    }

    var container = document.createElement('div'),
        link = document.createElement('a');

    container.setAttribute('id', 'cookieinfo');
    container.setAttribute('class', 'cookie-alert');
    container.innerHTML = '<h6>Ta strona wykorzystuje pliki cookie</h6><p class="in-active">Używam informacji zapisanych za pomocą plików cookies w celu zapewnienia maksymalnej wygody w korzystaniu ze strony. Mogą też korzystać z nich współpracujące firmy badawcze oraz reklamowe. Jeżeli wyrażasz zgodę na zapisywanie informacji zawartej w cookies kliknij na &bdquo;x&rdquo; w prawym górnym rogu tej informacji. Jeśli nie wyrażasz zgody, ustawienia dotyczące plików cookies możesz zmienić w swojej przeglądarce. <a id="cookies-info" href="http://ciasteczka.eu/#jak-wylaczyc-ciasteczka" target="_blank">Dowiedź się jak to zrobić<a></p>';

    link.setAttribute('href', '#');
    link.setAttribute('title', 'Zamknij');
    link.setAttribute('id', 'cookie-close')
    link.innerHTML = 'x';

    function clickHandler(e) {
        if (e.preventDefault) {
            e.preventDefault();
        } else {
            e.returnValue = false;
        }

        container.setAttribute('style', 'opacity: 1');

        var interval = window.setInterval(function() {
            container.style.opacity -= 0.01;

            if (container.style.opacity <= 0.02) {
                document.body.removeChild(container);
                window.clearInterval(interval);
            }
        }, 4);
    }

    if (link.addEventListener) {
        link.addEventListener('click', clickHandler);
    } else {
        link.attachEvent('onclick', clickHandler);
    }

    container.appendChild(link);
    document.body.appendChild(container);

    monster.set('cookieinfo', 'true', 100);

    return true;                 
})();

function cookieVisibility(){
var windowWidth = $(window).width();
var CookieDetails = $('#cookieinfo p');
var cookieInfo = $('#cookieinfo');

if(windowWidth == 400){
    CookieDetails.addClass("in-active");
}

if(CookieDetails.hasClass("in-active")){
    cookieInfo.on('mouseenter touchstartbtap',function(){
        CookieDetails.removeClass("in-active");
    });
}
}
