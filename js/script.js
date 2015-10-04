$(document).ready(function () {
    $.ajax({
        type: "get",
        url: "content/xml/general.xml",
        dataType: "xml",
        success: function (xml) {
            $("#abbreviation").append(
                $(xml).find("abbreviation").text()
            );
            $("#title span").append(
                $(xml).find("competent").text() + " " + $(xml).find("title").text()
            );
            $(".information.slider-content").append(
                $('<div>').attr("class", "image").append(
                    $('<span>').append(
                        $(xml).find("about").find("image").text()
                    ).css("display", "none"),
                    $('<canvas>').append()
                ),
                $('<div>').attr("class", "text").append(
                    $('<header>').append(
                        $(xml).find("about").find("header").text()
                    ),
                    $('<p>').append(
                        $(xml).find("about").find("paragraph").text()
                    )
                )
            )
        }
    })
    .done(function () {
    })
    .fail(function () {
    });
    $.ajax({
        type: "get",
        url: "content/xml/projects.xml",
        dataType: "xml",
        success: function (xml) {
            $(xml).find("project").each(function (index) {
                $('<div>').attr("class", "project").append(
                    $('<div>').attr("class", "overview").append(
                        $('<div>').attr("class", "text").append(
                            $('<h3>').append(
                                $(this).find("title").text()
                            ),
                            $('<p>').append(
                                $(this).find("overview").find("paragraph").text()
                            )
                        ),
                        $('<div>').attr("class", "image").append(
                            $('<span>').append(
                                $(this).find("overview").find("image").text()
                            ).css("display", "none")
                        )
                    ),
                    $('<div>').attr("class", "detail").append(
                        $('<span>').append(
                            $(this).find("detail").find("image").text()
                        ).css("display", "none")
                    )
                ).appendTo('#projects');
                $(".info.slider-content").append(
                    $('<p>').append(
                        $(this).find("detail").find("paragraph").text()
                    )
                );
                $(".center .button.name").append(
                    $('<span>').append(
                        $(this).find("title").text()
                    )
                );
            });
        }
    })
    .done(function () {
        $(".project").eq(0).addClass("moveFromLeft");
        $(".project.moveFromLeft .overview .image").append(
            $('<img>').attr("src", $(".project.moveFromLeft .overview .image span").text()).css("display", "none").attr("onload", '$(this).parent().css({' +
                '"background-image":"url("+$(this).attr("src")+")"' + ',' +
                '"background-size":"80%"' +
            '})')
        );
        $(".left").children(".left-arrow").click(function () {
            $(".slider-button").removeClass("active");
            $(".slider-content").removeClass("active");
            $(".project .detail").scrollTop(0);
            if ($(".moveFromRight").length) {
                $(".moveFromRight")
                    .removeClass("moveFromRight rotateRightSideFirst rotateLeftSideFirst")
                    .addClass("rotateRightSideFirst")
                        .prevOrLast()
                            .addClass("moveFromRight").bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function () {
                                $(this).removeClass("rotateRightSideFirst rotateLeftSideFirst")
                            });
            }
            if ($(".moveFromLeft").length) {
                $(".moveFromLeft")
                    .removeClass("moveFromLeft rotateRightSideFirst rotateLeftSideFirst")
                    .addClass("rotateRightSideFirst")
                        .prevOrLast()
                            .addClass("moveFromRight").bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function () {
                                $(this).removeClass("rotateRightSideFirst rotateLeftSideFirst")
                            });
            }
            if ($(".project.moveFromRight .overview .image").css("background-image").indexOf("loader.gif")) {
                $(".project.moveFromRight .overview .image").append(
                    $('<img>').attr("src", $(".project.moveFromRight .overview .image span").text()).css("display", "none").attr("onload", '$(this).parent().css({' +
                        '"background-image":"url("+$(this).attr("src")+")"' + ',' +
                        '"background-size":"80%"' +
                    '})')
                );
            }

        });
        $(".right").children(".right-arrow").click(function () {
            $(".slider-button").removeClass("active");
            $(".slider-content").removeClass("active");
            $(".project .detail").scrollTop(0);
            if ($(".moveFromRight").length) {
                $(".moveFromRight")
                    .removeClass("moveFromRight rotateRightSideFirst rotateLeftSideFirst")
                    .addClass("rotateLeftSideFirst")
                        .nextOrFirst()
                            .addClass("moveFromLeft").bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function () {
                                $(this).removeClass("rotateRightSideFirst rotateLeftSideFirst")
                            });
            }
            if ($(".moveFromLeft").length) {
                $(".moveFromLeft")
                    .removeClass("moveFromLeft rotateRightSideFirst rotateLeftSideFirst")
                    .addClass("rotateLeftSideFirst")
                        .nextOrFirst()
                            .addClass("moveFromLeft").bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd", function () {
                                $(this).removeClass("rotateRightSideFirst rotateLeftSideFirst")
                            });
            }
            if ($(".project.moveFromLeft .overview .image").css("background-image").indexOf("loader.gif")) {
                $(".project.moveFromLeft .overview .image").append(
                    $('<img>').attr("src", $(".project.moveFromLeft .overview .image span").text()).css("display", "none").attr("onload", '$(this).parent().css({' +
                        '"background-image":"url("+$(this).attr("src")+")"' + ',' +
                        '"background-size":"80%"' +
                    '})')
                );
            }

        });
        $(".button.up-arrow").click(function () {
            $(".slider-button").removeClass("active");
            $(".slider-content").removeClass("active");
            $(".project.active .detail").stop(true, true).animate({
                scrollTop: ($(".project.active .detail").scrollTop() - $(".project.active .detail").height())
            }, 500);
        });
        $(".button.down-arrow").click(function () {
            $(".slider-button").removeClass("active");
            $(".slider-content").removeClass("active");
            $(".project.active .detail").stop(true, true).animate({
                scrollTop: ($(".project.active .detail").scrollTop() + $(".project.active .detail").height())
            }, 500);
        });
        $(".slider-button").click(function () {
            if ($(this).is(".active")) {
                $(this).removeClass("active");
                $("." + $(this).attr("id").split("#").join("")).removeClass("active");
            }
            else {
                $(".slider-button").removeClass("active");
                $(".slider-content").removeClass("active");
                $(this).addClass("active");
                $("." + $(this).attr("id").split("#").join("")).addClass("active");
            }
            if ($(this).attr("id") == "information") {
                if ($(".information.slider-content.active .image").css("background-image").indexOf("loader.gif")) { 
                    $(".information.slider-content.active .image").append(
                        $('<img>').attr("src", $(".information.slider-content.active .image span").text()).css("display", "none").attr("onload", '$(this).parent().css({' +
                            '"background-image":"url("+$(this).attr("src")+")"' + ',' +
                            '"background-size":"cover"' +
                        '})')
                    );
                }
                
            }
        });
        $(".overview .center").children(".open").click(function () {
            $(".slider-button").removeClass("active");
            $(".slider-content").removeClass("active");
            $(".info.slider-content p").removeClass("active");
            $(".center .button.name span").removeClass("active");
            $(".navigation").addClass("active");
            $("#projects").children(".project").each(function () {
                if ($(this).is(".moveFromLeft") || $(this).is(".moveFromRight")) {
                    $(this).addClass("active").addClass("overflow-hidden").bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function () {
                        $(this).removeClass("overflow-hidden");
                    });
                    $(".info.slider-content p").eq($(this).index()).addClass("active");
                    $(".center .button.name span").eq($(this).index()).addClass("active");
                }
            });
            if (!$(".project.active .detail img").length) {
                $(".project.active .detail").append(
                    $('<img>').attr("src", $(".project.active .detail span").text()).css("display", "none").attr("onload", '$(this).css("display", "block").attr("width", "100%")')
                );
            }
        });
        $(".detail .left").children(".close").click(function () {
            $(".slider-button").removeClass("active");
            $(".slider-content").removeClass("active");

            $(".navigation").removeClass("active");
            $("#projects").children(".project").removeClass("active").addClass("overflow-hidden").bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function () {
                $(this).removeClass("overflow-hidden");
            });
        });
        $("body").on('keydown', function (e) { if (e.keyCode == 9) e.preventDefault() });








        //         onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=http://glowonglue.com', 'facebook-share-dialog', 'width=626,height=436'); return false;"
        // onclick="window.open('http://www.linkedin.com/shareArticle?mini=true&url=http://glowonglue.com', 'linkedin-share-dialog', 'width=520,height=570'); return false;"
        //onclick="window.open('http://www.twitter.com/share?url=http://glowonglue.com', 'twitter-share-dialog', 'width=620,height=470'); return false;"









    })
    .fail(function () {
    });
});
jQuery.fn.nextOrFirst = function (selector) {
    var next = this.next(selector);
    return (next.length) ? next : this.prevAll(selector).last();
}
jQuery.fn.prevOrLast = function (selector) {
    var prev = this.prev(selector);
    return (prev.length) ? prev : this.nextAll(selector).last();
}
