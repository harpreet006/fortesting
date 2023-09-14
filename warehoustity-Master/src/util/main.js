export function slickheightequal () {
    let herovideo = document.getElementsByClassName("slick-height-equal");
    for (let index = 0; index < herovideo.length; index++) {
      let element = herovideo[index];
      var slide = element.getElementsByClassName("slick-slide");
      for (let index = 0; index < slide.length; index++) {
        let element1 = slide[index];
        // console.log(element1);
        element1.getElementsByTagName("div")[0].classList.add("h-100");
      }
    }
  };

  export function slickwidthequal () {
    let herovideo = document.getElementsByClassName("slick-width-equal");
    for (let index = 0; index < herovideo.length; index++) {
      let element = herovideo[index];
      var slide = element.getElementsByClassName("slick-slide");
      for (let index = 0; index < slide.length; index++) {
        let element1 = slide[index];
        // console.log(element1);
        element1.getElementsByTagName("div")[0].classList.add("w-100");
      }
    }
  };

  export function PricingAddClassHover () {
    let mycards = document.getElementsByClassName("card-add-active-on-hover"); 
    for (let index = 0; index < mycards.length; index++) {
      let element = mycards[index];
      var getchildcards = element.getElementsByClassName("card-hover");
      for (let index = 0; index < getchildcards.length; index++) {
        let element1 = getchildcards[index];
        // console.log(element1);
        element1.addEventListener("mouseover", function(){
          for (let index = 0; index < getchildcards.length; index++) {
            let element1 = getchildcards[index];
            element1.classList.remove("active");
          }
          this.classList.add("active");
        })
      }
    }
  };


