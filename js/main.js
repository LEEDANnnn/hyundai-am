$(function(){
  //변수
  const body = $("body");
  const gotoTop = $(".gototop");
  const hd = "#hd-header";
  let scTop = $(window).scrollTop();

  //푸터 복제 //작은따옴표가 생긴 건 역슬래쉬+" 하면 됨
  let ftSection = "<section class=\"section fp-auto-height\" id=\"main-ft\"></section>";
  let ftElement = $(".footer-container").clone();
  let fullPageCreated = false;

  normalFunction();
  fullPageResize();
  $(window).resize(function(){
    normalFunction();
    fullPageResize();
  });

  function createFullPage(){
    if(!fullPageCreated) {
      $("#hd-main").append(ftSection);//맨끝에 삽입된다는 뜻:append
      $("#main-ft").append(ftElement);
      $("#hd-main").fullpage({
        //풀페이지 옵션 추가
        licenseKey: null,
        menu: "#fp-nav-hor",
        anchors: ["Main","Product","Sustainability","News","Career","Info"],
        afterLoad: function(origin, destination, direction){
          let loadedSection = this;
          // console.log(destination.index);
          $("#pf-gnb-hor > a").removeClass("active");
          $("#pf-gnb-hor").fadeIn(300);
          if(destination.index == 0) {
            $("#hd-header").addClass("dark-mode");
            $("#pf-gnb-hor").removeClass("light");
            $("#pf-gnb-hor > a").eq(0).addClass("active");
          } else if(destination.index == 1){
            $("#hd-header").removeClass("dark-mode");
            $("#pf-gnb-hor").addClass("light");
            $("#pf-gnb-hor > a").eq(1).addClass("active");
          } else if(destination.index == 2){
            $("#hd-header").addClass("dark-mode");
            $("#pf-gnb-hor").removeClass("light");
            $("#pf-gnb-hor > a").eq(2).addClass("active");
          } else if(destination.index == 3){
            $("#hd-header").removeClass("dark-mode");
            $("#pf-gnb-hor").addClass("light");
            $("#pf-gnb-hor > a").eq(3).addClass("active");
          } else if(destination.index == 4){
            $("#hd-header").addClass("dark-mode");
            $("#pf-gnb-hor").removeClass("light");
            $("#pf-gnb-hor > a").eq(4).addClass("active");
          } else if(destination.index == 5){
            $("#pf-gnb-hor").fadeOut(300);
          }
        }
      });
      fullPageCreated = true;
    }
  }

  function fullPageResize() {
    if (!body.hasClass("mo")) {
      createdFullPage();
      $(".gototop").click(function(){
				$.fn.fullpage.moveTo(1);
			});
    } else {
      $(".gototop").click(function(){
        $("html, body").stop().animate({
          scrollTop: 0
        }, 600, "linear");
      });
    
      if(fullPageCreated){
        $.fn.fullpage.destroy("all"); // 풀페이지 날리기
        $("#pf-gnb-hor").fadeOut(300);
        $("#main-ft").remove();
        fullPageCreated = false;
      }
    }
  }

  //모바일에서만 실행
  function normalFunction(){
    if(body.hasClass("mo")) {
      // 각 섹션별 헤더디자인 구현(다크모드)
      // 1. each() 문법으로 완성
      let sections = []; //각 섹션별(.wh) 위치를 담을 배열
      const updateSectionPos = () => { //화살표 함수. 비교연산자아님!! 내가 속한 구간은 this로 봄
        sections = [];
        $(".main-section.wh").each(function(){//내용은 그룹괄호, 블럭괄호 안에서 엔터 치고 적어야 한다.
          sections.push({ //뭔가 집어넣을 때 push
            top: $(this).offset().top,
            bottom: $(this).offset().top + $(this).height()
          }); 
        }); 
        //console.log(sections);
      } 
      updateSectionPos();
      $(window).on("resize", updateSectionPos);
      $(window).on("scroll", () => {
        scTop = $(window).scrollTop();
        let isDark = false; //배경이 어두운 영역이 맞는지 확인하는 변수
        for(const section of sections){
          if(scTop >= section.top && scTop < section.bottom){ //최소값
            isDark = true;
            break;
          } //bottom 닫은 것
        }; //아래 isDark가 참일 때 isDark 만 써도 됨. for문 받은 것
        if(isDark == true){
          $(hd).addClass("dark-mode");
        } else {
          $(hd).removeClass("dark-mode");
        }
      }); //scroll 받은 것
    }
  } 
}); //전체 제이쿼리