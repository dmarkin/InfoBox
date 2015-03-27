/*
 1. In row 24 of file 'src/info_box.json' it were mistake (duplicating header)
 2. In row 25 of file 'src/info_box.json' it were mistake ('field' instead of 'img')
 3. In the /img it's not included images for big find button - I have created them
 4. It is not clear how to use dottedHozLine.png
 5. It is possible, but ineffective to create all DOM markup with JS/jQuery
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
            cache: true   // false avoid IE requests caching problems?
        })
            .success(function (response) {
                var productInfoString = JSON.stringify(response);
                productInfo = JSON.parse(productInfoString);
                numOfProducts = productInfo.length;
                fillInfobox(productInfo[currentProduct]);
                eventsInfobox();
            })
            .error(function (errorMessage) {
                $('h2').text(errorMessage.statusText);
            });

        // filling Infobox
        function fillInfobox(obj) {
            var $descr = $('.ib-description');
            var $details = $('.ib-details');

            // clear details block
            if (!$descr.hasClass('ib-hiding-details')) {
                $descr.animate({'height': '35px'}, 0).removeClass('ib-scroll').addClass('ib-hiding-details');
            }

            var sourceImage = '<img src="img/' + obj.img + '" title="' + obj.title + '" />';
            $('h2').text(obj.title).hide().fadeIn(ANIMATION_TIME);
            $('.ib-description-text').text(obj.description).hide().fadeIn(ANIMATION_TIME);
            $('.ib-notes-text').text(obj.note);
            $details.text('show details').hide().fadeIn(ANIMATION_TIME);

            // .hide() in this case is easier because we don't need add and remove CSS class {display: none;} with many check-outs
            $('.ib-product-photo').html(sourceImage).hide().fadeIn(ANIMATION_TIME);
        }

        // add events listeners and call function
        function eventsInfobox() {
            $('.ib-left-button')
                .on('mouseenter', function () {
                    $(this).removeClass('sprite-button_bg_white_left')
                        .addClass('ib-active sprite-button_bg_orange_left')
                        .find('.sprite-btn_ic_gray_left')
                        .removeClass('sprite-btn_ic_gray_left').addClass('sprite-btn_ic_brn_left')
                        .end().find('.gray-button-label-left').addClass('white');
                })
                .on('mouseleave', function () {
                    $(this).removeClass('ib-active sprite-button_bg_orange_left')
                        .addClass('sprite-button_bg_white_left')
                        .find('.sprite-btn_ic_brn_left')
                        .removeClass('sprite-btn_ic_brn_left').addClass('sprite-btn_ic_gray_left')
                        .end().find('.gray-button-label-left').removeClass('white');
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
                    $(this).removeClass('sprite-button_bg_white_right')
                        .addClass('ib-active sprite-button_bg_orange_right')
                        .find('.sprite-btn_ic_gray_right')
                        .removeClass('sprite-btn_ic_gray_right').addClass('sprite-btn_ic_brn_right')
                        .end().find('.gray-button-label-right').addClass('white');
                })
                .on('mouseleave', function () {
                    $(this).removeClass('ib-active sprite-button_bg_orange_right')
                        .addClass('sprite-button_bg_white_right')
                        .find('.sprite-btn_ic_brn_right')
                        .removeClass('sprite-btn_ic_brn_right').addClass('sprite-btn_ic_gray_right')
                        .end().find('.gray-button-label-right').removeClass('white');
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
                    $(this).removeClass('sprite-button_find_white_right')
                        .addClass('ib-active sprite-button_find_orange_right')
                        .find('.orange-button-label-right').addClass('white');
                })
                .on('mouseleave', function () {
                    $(this).removeClass('ib-active sprite-button_find_orange_right')
                        .addClass('sprite-button_find_white_right')
                        .find('.orange-button-label-right').removeClass('white');
                });

            $('.ib-details').on('click', function () {
                var $descr = $('.ib-description');
                var $photo = $('.ib-product-photo');
                var $details = $('.ib-details');
                if ($descr.hasClass('ib-hiding-details')) {
                    $photo.fadeOut(ANIMATION_TIME, function () {
                        $descr.animate({'height': '235px'}, ANIMATION_TIME, function () {
                            $details.text('hide details');
                            $descr.removeClass('ib-hiding-details').addClass('ib-scroll');
                        });
                    });
                }
                else {
                    $photo.fadeIn(ANIMATION_TIME);
                    $descr.animate({'height': '35px'}, 0).removeClass('ib-scroll').addClass('ib-hiding-details');
                    $details.text('show details');
                }
            });
        }
    });