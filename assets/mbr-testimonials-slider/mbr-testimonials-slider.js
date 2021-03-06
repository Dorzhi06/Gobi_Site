var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.findInternal = function(a, b, c) {
    a instanceof String && (a = String(a));
    for (var d = a.length, e = 0; e < d; e++) {
        var f = a[e];
        if (b.call(c, f, e, a)) return {
            i: e,
            v: f
        }
    }
    return {
        i: -1,
        v: void 0
    }
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
    a != Array.prototype && a != Object.prototype && (a[b] = c.value)
};
$jscomp.getGlobal = function(a) {
    return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(a, b, c, d) {
    if (b) {
        c = $jscomp.global;
        a = a.split(".");
        for (d = 0; d < a.length - 1; d++) {
            var e = a[d];
            e in c || (c[e] = {});
            c = c[e]
        }
        a = a[a.length - 1];
        d = c[a];
        b = b(d);
        b != d && null != b && $jscomp.defineProperty(c, a, {
            configurable: !0,
            writable: !0,
            value: b
        })
    }
};
$jscomp.polyfill("Array.prototype.find", function(a) {
    return a ? a : function(a, c) {
        return $jscomp.findInternal(this, a, c).v
    }
}, "es6", "es3");

function setActiveCarouselItem(a) {
    var b = a.querySelector(".carousel-item");
    a = a.querySelector(".carousel-indicators > li");
    b.classList.add("active");
    a && a.classList.add("active")
}

function initTestimonialsCarousel(a) {
    var b = a.getAttribute("id") + "-carousel",
        c = "5" === a.getAttribute("data-bs-version");
    a.querySelectorAll(".carousel").forEach(function(a) {
        return a.setAttribute("id", b)
    });
    a.querySelector(".carousel-controls") && a.querySelectorAll(".carousel-controls").forEach(function(a) {
        a.querySelectorAll("a").forEach(function(a) {
            a.setAttribute("href", "#" + b);
            c ? a.setAttribute("data-bs-target", "#" + b) : a.setAttribute("data-target", "#" + b)
        })
    });
    a.querySelectorAll(".carousel-indicators > li").forEach(function(a) {
        c ? a.setAttribute("data-bs-target", "#" + b) : a.setAttribute("data-target", "#" + b)
    });
    setActiveCarouselItem(a)
}
var $, isJQuery = "function" == typeof jQuery;
isJQuery && ($ = jQuery);
var isBuilder = document.querySelector("html").classList.contains("is-builder");
if (isBuilder && isJQuery) $(document).on("add.cards", function(a) {
    $(a.target).hasClass("testimonials-slider") && initTestimonialsCarousel(a.target)
}).on("changeParameter.cards", function(a, b, c) {
    "testimonialsSlides" === b && 0 == $(a.target).find(".carousel-item.active").length && setActiveCarouselItem(a.target)
});
else "undefined" === typeof window.initTestimonialsPlugin && (window.initTestimonialsPlugin = !0, document.querySelectorAll(".testimonials-slider").forEach(function(a) {
    initTestimonialsCarousel(a)
}));