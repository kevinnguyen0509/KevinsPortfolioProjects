export function createScrollingFeature() {
  $(".logo-container__logo").click(function () {
    $("html, body").animate({ scrollTop: $("html").offset().top }, 1000);
  });

  $("#home").click(function () {
    $("html, body").animate({ scrollTop: $("html").offset().top }, 1000);
  });

  $("#growth").click(function () {
    $("html, body").animate(
      { scrollTop: $("#growth-title").offset().top },
      1000
    );
  });

  $("#moat").click(function () {
    $("html, body").animate({ scrollTop: $("#moat-title").offset().top }, 900);
  });
  $("#debt").click(function () {
    $("html, body").animate({ scrollTop: $("#debt-title").offset().top }, 800);
  });
}
