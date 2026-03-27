$(document).ready(function(){
  //변수선언
  const body =$("body");
  const hd = "#hd-header";
  const ft = "#hd-footer";
  let bodyHeight = body.height();
  let viewportW = window.innerWidth; //7,8번줄 줄 외워. 자바스크립트에서 이렇게 사용함
  let viewportH = window.innerHeight; 
  let scTop = $(window).scrollTop(); //화면이 스크롤되는 양.(결국은 높이가 됨) 루트 전역(전체영역) 변수
  let hdHeight = $(hd).height();
  let ftHeight = $(ft).height();
  let ftTop = $(ft).offset().top;
  const mainMenu = ".depth1";
  const subMenu = ".depth2";
  let speed = 300;
  
  // 사이트맵, 모바일 GNB구현
  const sitemap =".sitemap";
  const familySite =".family-site";
  const smBtn = ".sitemap-btn";
  const fmBtn = ".family-btn";
  const closeBtn = ".close-btn";
  const smMainMenu = ".sm-depth1 > a";
  const smSubMenu = ".sm-depth2";

    // 부드러운 스크롤 기본 사용
  const lenis = new Lenis();
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // 반응형 구현
  rwd();
  $(window).resize(function(){
    rwd();
    smReset();
    bodyHeight =body.height();
    hdHeight = $(hd).height();
    ftHeight = $(ft).height();
  });

  $(window).scroll(function(){
    if(!body.hasClass("main") || body.hasClass("mo")){ // 첫화면이 아니라면
      scTop = $(window).scrollTop(); //화면이 스크롤되는 양 업데이트
      if(scTop > hdHeight){ //화면에서 헤더가 보이지 않을 정도로 문서가 스크롤되는
        $(hd).addClass("fixed");
      }else {
        $(hd).removeClass("fixed");
      }
    }
  });
  // lang-btn 클릭 시 lang-list show
  // 언어선택 : 언어선택 버튼을 클릭하면 언어리스트가 슬라이드(토글)
  $(".lang-btn").click(function(){
    // $(".lang-list").slideToggle(300);
    $(this).next().slideToggle(speed);
  });
  // PC GNB 구현 : depth1에 마우스가 진입하면 depth2가 슬라이드다운
  $(mainMenu).mouseenter(function(){
    $(this).children(subMenu).stop().slideDown(speed);
  });
  // PC GNB 구현 : depth1에 마우스가 떠나면 depth2가 슬라이드업
  $(mainMenu).mouseleave(function(){
    $(this).children(subMenu).stop().slideUp(speed);
  });

  //메인메뉴를 클릭하면
    $(smMainMenu).click(function() {
      if(!body.hasClass("pc")) { //느낌표 확인
        $(this).parent().siblings().find(smSubMenu).slideUp(300);
        $(this).parent().find(smSubMenu).slideToggle(300);
      }
    });
  
  // 사이트맵 버튼을 클릭하면
  $(smBtn).click(function() { //해상도 표시
    body.addClass("fixed");
    $(sitemap).addClass("active");
  });

  // 패밀리사이트 버튼을 클릭하면
  $(fmBtn).click(function() {
    body.addClass("fixed");
    $(familySite).addClass("active");
  });

  //닫기버튼 클릭
  $(closeBtn).click(function() {
    body.removeClass("fixed");
    $(this).parent().removeClass("active");
  });

  function rwd() {
    viewportW = window.innerWidth;
    viewportH = window.innerHeight;
    // console.log(viewportW, viewportH);
    if(viewportW < 768){
      body.removeClass("tb pc").addClass("mo");
    } else if(viewportW >= 768 && viewportW < 1280 ){
      body.removeClass("mo pc").addClass("tb");
    } else {
      body.removeClass("mo tb").addClass("pc");
    }
  }

  function smReset() {
    $(smSubMenu).attr("style", "");
  }

// ------------------------------------------------------------------
// 혹시 스크롤 속도가 느리면 lerp: 0.2수치를 높여서 사용
// ------------------------------------------------------------------
//  const lenis = new Lenis({
//     lerp: 0.2,
//     smoothWheel: true,
//     smoothTouch: false
//   });
//   function raf(time) {
//       lenis.raf(time)
//       requestAnimationFrame(raf);
//   }
//   requestAnimationFrame(raf);  
});