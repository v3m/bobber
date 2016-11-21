$(document).ready(function() {

//Global variables//
    var html = $('html');
    var body = $('body');
    var header = $('header');
    var aboutUs = $('#about-us');
    var projects = $('#projects');
    var containerForm = $('#container-form');
    var form = $('.myForm');
    var mail = $('.email');
    var inp = $('.inp');
    var selectCountry = $('.select-country');
    var pattern = /^[\w\.\d-_]+@[\w\.\d-_]+\.\w{2,4}$/i;
    var popupMask = $('.popup-mask');
    var redstarPopup = $('.redstar-popup');
    var popupQuery = $('.query-popup');
    var counter = 0;
    var mailsComp = [
        'alextest@gmail.com',
        "peter.test@itncorp.com",
        "daniel.test@itncorp.com",
        "bruce.test@itncorp.com",
        "bondar.test@dyninno.com",
        "svetlana.example@dyninno.com",
        "abbas.example@itncorp.com",
        "marina.example@itncorp.com",
        "jeffrey.example@itncorp.com"
    ];

    var formPopup = function () {
        popupMask.show();
        popupQuery.show();
    };

    var popupClose = function () {
        event.preventDefault();
        redstarPopup.hide();
        popupMask.hide();
    };

    $.fn.serializeObject = function () {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };

// Input + Mail Reset //
    inp.on('focus', function () {

        var ths = $(this);

        if(ths.val() == 'Error'){
            ths.removeClass('form-error');
            ths.val('');
        } else {
            ths.removeClass('form-error');
        }
    });

// Select Reset //
    selectCountry.on('focus', function () {
        selectCountry.removeClass('form-error');
    });

// PopUp //
    $('.red-open').on('click', function () {
        popupMask.show();
        redstarPopup.show();
    });

    $('.popup-close').on('click', function () {
        popupClose();
    });

//Scroll TO BUTTONS//
    $('.scroll').on('click', function () { 

        var elementClick = $(this).attr("href");

        var destination = $(elementClick).offset().top;

        var isChrome = !!window.chrome;

     if (isChrome){
       body.animate( { scrollTop: destination }, 1100 );
     } else{
       html.animate( { scrollTop: destination }, 1100 );
        }
   });

//Autocomplete Mail
    mail.autocomplete({
        source: mailsComp,
        minLength: 2
    });

//Form SUBMIT//
    form.on('submit', function (event) {
        event.preventDefault();
    });

//input Error//
    function inputError() {
        inp.each(function () {

            var ths = $(this);

            if (ths.val() == '' || ths.val() == 'Error') {
                ths.addClass('form-error').val('Error');
                counter++;
            }
        });
    }

//email Error//
    function emailCheck() {
        if (pattern.test(mail.val())) {
           mail.removeClass('form-error');
        } else {
            mail.addClass('form-error');
            counter++;
        }
    }

//select Check Error //
    function selectError() {
        if (selectCountry.val()){
            selectCountry.removeClass('form-error');
        } else {
            selectCountry.addClass('form-error');
            counter++;
        }
    }

//SELECT AJAX GET//
    $.ajax({
        dataType: 'json',
        url: "/api/countries",
        type: 'GET',
        success: function (data) {
            for (var i = 0; i < data.response.data.length; i++) {
                selectCountry.append('<option value="' + data.response.data[i] + '">'+ data.response.data[i] + '</option>');
            }
        }
    });

//Send Query Button FORM SEND//
    $('.btn-send-form').on('click', function () {
        counter = 0;
        emailCheck();
        inputError();
        selectError();

        if(counter > 0){
            console.log('Error');
        } else {
            var data = form.serializeObject();
            console.log(data);
            formPopup();
        }
    });

// Understood Button Form Reset + Console.Log//
    $('.understood').on('click', function () {
        form[0].reset();
        popupClose();
    });
});