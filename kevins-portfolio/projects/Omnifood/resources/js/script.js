$(document).ready(function () {
  $(".js--section-features").waypoint(
    function (direction) {
      if (direction == "down") {
        $("nav").addClass("sticky");
        $(".js--nav").addClass("animate__animated animate__fadeInDown");
      } else {
        $("nav").removeClass("sticky");
      }
    },
    {
      offset: "25%",
    }
  );

  /*Scrolling */
  $(".js--scroll-to-plan").click(function () {
    $("html, body").animate(
      { scrollTop: $(".js--section-plans").offset().top },
      1000
    );
  });

  $(".js--scroll-to-start").click(function () {
    $("html, body").animate(
      { scrollTop: $(".js--section-features").offset().top },
      800
    );
  });

  /* Navigation scroll*/
  $(function () {
    $('a[href*="#"]:not([href="#"])').click(function () {
      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        var target = $(this.hash);
        target = target.length
          ? target
          : $("[name=" + this.hash.slice(1) + "]");
        if (target.length) {
          $("html, body").animate(
            {
              scrollTop: target.offset().top,
            },
            800
          );
          return false;
        }
      }
    });
  });

  $(".js--wp-1").waypoint(
    function (direction) {
      $(".js--wp-1").addClass("animate__animated animate__fadeInDown");
      $(".js--box-1").addClass(
        "animate__animated animate__fadeInLeft animate__delay-.5ms"
      );
      $(".js--box-2").addClass(
        "animate__animated animate__fadeInUp animate__delay-.5ms"
      );

      $(".js--box-3").addClass(
        "animate__animated animate__fadeInUp animate__delay-.8s"
      );

      $(".js--box-4").addClass(
        "animate__animated animate__fadeInRight animate__delay-.8s"
      );
    },
    {
      offset: "40%",
    }
  );
  /*Iphone image*/
  $(".js--how-it-works").waypoint(
    function (direction) {
      $(".js--how-it-works-phone").addClass(
        "animate__animated animate__fadeInUp"
      );
    },
    {
      offset: "76%",
    }
  );
});

/*cities section*/
$(".js--current-cities").waypoint(
  function (direction) {
    $(".js--current-cities").addClass("animate__animated animate__fadeInDown");
    $(".js--current-cities-details").addClass(
      "animate__animated animate__fadeInUp"
    );
  },
  {
    offset: "50%",
  }
);

/*price section*/
$(".js--price1").waypoint(
  function (direction) {
    $(".js--price1").addClass("animate__animated animate__pulse");
    $(".js--price2").addClass(
      "animate__animated animate__pulse animate__delay-1s"
    );
    $(".js--price3").addClass("animate__animated animate__pulse");
  },
  {
    offset: "50%",
  }
);
