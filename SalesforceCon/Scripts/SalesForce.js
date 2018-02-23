$(document).ready(function () {

    var urlget = sessionStorage.getItem('Url');

    $('#' + urlget).addClass('active');
    
    $('.navbar-nav li').click(function () {

        var url = $(this).attr('id');
        sessionStorage.setItem('Url', url);
    }); 
});


//$().ready(function () {
//    if (document.referrer != 'http://localhost:10078/') {
//        history.pushState(null, null, 'login');
//        window.addEventListener('popstate', function () {
//            history.pushState(null, null, 'login');
//        });
//    }
//});


$(document).ready(function () {
   
    $('.logReport').on('click', function () {       
        $('.k-state-selected').removeClass('k-state-selected');
        $(this).addClass('k-state-selected');
        $("a.k-link:contains('Request')").addClass('k-state-selected');
    });

    $('#SameAsBillingAddress').change(function () {
        debugger;
        if ($(this).prop("checked") == true) {

            $('#ShippingAddress1').val($('#BillingAddress1').val());
            $('#ShippingAddress2').val($('#BillingAddress2').val());
            $('#ShippingCity').val($('#BillingCity').val());
            $('#ShippingState').val($('#BillingState').val());
            $('#ShippingCountry').val($('#BillingCountry').val());
            $('#ShippingPostalCode').val($('#BillingPostalCode').val());
            $('#ShippingPhoneNumber').val($('#BillingPhoneNumber').val());

        }
    });

});