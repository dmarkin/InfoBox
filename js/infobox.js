/* 1. In row 25 of file 'src/info_box.json' it were mistake ('field' instead of 'img')
 2. In row 24 of file 'src/info_box.json' it were mistake (duplicating header)
 3. Not included images for big find button - I have created them
 4. It is not clear how to use dottedHozLine.png
 5. It is possible, but ineffective to create all markup with JS/jQuery
 */

jQuery(document).ready(

    function () {
        var urlRequest = "src/info_box.json",
            currentProduct = 0,
            productInfo,
            ANIMATION_TIME = 400,
            numOfProducts;

        // getting info about product from "server"
        $.ajax({
            type: "GET",
            url: urlRequest,
            data: "string",
            dataType: "json",
            mimeType: "application/json",   //avoid FF syntax error
            cache: false   //avoid IE requests caching problems
        })
            .success(function (response) {
                var productInfoString = JSON.stringify(response);
                productInfo = JSON.parse(productInfoString);
                numOfProducts = productInfo.length;
                fillInfobox(productInfo[currentProduct]);
            })
            .error(function (errorMessage) {
                $('h2').html(errorMessage.statusText);
            });

        // filling Infobox
        function fillInfobox(obj) {
            var $descr = $('.ib-description');
            if ($descr.hasClass('ib-show-details')) {
                $descr.removeClass('ib-show-details').addClass('ib-hide-details');
                $('.ib-details').html('show details');
            }

            $('h2').html(obj.title);
            $('.ib-description-text').html(obj.description);
            $('.ib-notes-text').html(obj.note);
            $('.ib-product-info').hide().fadeIn(ANIMATION_TIME);
            $('.ib-product-photo').html('<img src="img/' + obj.img + '" title="' + obj.title + '" />').hide().fadeIn(ANIMATION_TIME);
        }

        // add events listeners and call function
        (function eventsInfobox() {
            $('.ib-left-button')
                .on('mouseenter', function () {
                    $(this).css({'backgroundImage': 'url("img/button_bg_orange_left.png")', 'cursor': 'pointer'})
                        .find('.gray-arrow-left').attr('src', 'img/btn_ic_brn_left.png')
                        .end().find('.gray-button-label-left').css('color', '#FFF');
                })
                .on('mouseleave', function () {
                    $(this).css('backgroundImage', 'url("img/button_bg_white_left.png")')
                        .find('.gray-arrow-left').attr('src', 'img/btn_ic_gray_left.png')
                        .end().find('.gray-button-label-left').css('color', '#a1a1a1');
                })
                .on('click', function () {
                    if (currentProduct > 0) {
                        currentProduct -= 1;
                    }
                    else {
                        currentProduct = numOfProducts - 1;
                    }
                    fillInfobox(productInfo[currentProduct]);
                });

            $('.ib-right-button')
                .on('mouseenter', function () {
                    $(this).css({'backgroundImage': 'url("img/button_bg_orange_right.png")', 'cursor': 'pointer'})
                        .find('.gray-arrow-right').attr('src', 'img/btn_ic_brn_right.png')
                        .end().find('.gray-button-label-right').css('color', '#FFF');
                })
                .on('mouseleave', function () {
                    $(this).css('backgroundImage', 'url("img/button_bg_white_right.png")')
                        .find('.gray-arrow-right').attr('src', 'img/btn_ic_gray_right.png')
                        .end().find('.gray-button-label-right').css('color', '#a1a1a1');
                })
                .on('click', function () {
                    if (currentProduct < numOfProducts - 1) {
                        currentProduct += 1;
                    }
                    else {
                        currentProduct = 0;
                    }
                    fillInfobox(productInfo[currentProduct]);
                });

            $('.ib-find-button')
                .on('mouseenter', function () {
                    $(this).css({'backgroundImage': 'url("img/button_find_orange_right.png")', 'cursor': 'pointer'})
                        .find('.orange-button-label-right').css('color', '#FFF');
                })
                .on('mouseleave', function () {
                    $(this).css('backgroundImage', 'url("img/button_find_white_right.png")')
                        .find('.orange-button-label-right').css('color', '#ed6c20');
                });

            $('.ib-details').on('click', function () {
                var $descr = $('.ib-description');
                var $photo = $('.ib-product-photo');
                var $details = $('.ib-details');
                if ($descr.hasClass('ib-hide-details')) {
                    $photo.fadeOut(ANIMATION_TIME, function () {
                        $details.html('hide details');
                        $descr.removeClass('ib-hide-details').addClass('ib-show-details');
                    });
                }
                else {
                    $photo.fadeIn(ANIMATION_TIME);
                    $details.html('show details');
                    $descr.removeClass('ib-show-details').addClass('ib-hide-details');
                }
            });
        })();
    });