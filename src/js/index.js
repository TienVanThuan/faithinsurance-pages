let mySwiper = new Swiper(".swiper-container", {
    // Optional parameters
    loop: true, // ループの指定
    effect: "fade", //フェードの指定
    autoplay: {
    delay: 4000, //４秒後に次のスライドへ
    disableOnInteraction: false //ユーザー側で操作してもスライドを止めない
    },
    speed: 2000, //２秒かけてフェードで切り替わる
});

// const heroHook = document.querySelectorAll('.p-hero-message-hook');
// const heroTxt = document.querySelectorAll('.p-hero-message-txt');
// window.addEventListener('load', function(){
//     console.log("load：リソースファイルを全て読み込みました。");
//     heroHook.addClass();
// });

// window.addEventListener('DOMContentLoaded', function(){
//     console.log("DOMContentLoaded：HTMLを読み込みました。");
// });

// element.classList.add('animate__animated', 'animate__bounceOutLeft');

// map
$('#map-tab').find('li').click(function(){
    $(this).addClass('is-active').siblings().removeClass('is-active');
});

$(function() {
  let tabs = $(".map-tab-btn"); // map-tab-btnのクラスを全て取得し、変数tabsに配列で定義
  $(".map-tab-btn").on("click", function() { // tabをクリックしたらイベント発火
    $(".is-active").removeClass("is-active"); // activeクラスを消す
    $(this).addClass("is-active"); // クリックした箇所にactiveクラスを追加
    const index = tabs.index(this); // クリックした箇所がタブの何番目か判定し、定数indexとして定義
    $(".gmap").removeClass("is-show").eq(index).addClass("is-show"); // showクラスを消して、contentクラスのindex番目にshowクラスを追加
  })
})
