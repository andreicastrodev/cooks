import view from "./View.js";
import anime from "animejs/lib/anime.es.js";

class AnimationView extends view {
  constructor() {
    super();
    this.AnimateSidebar();
    this.AnimateSidebarContent();
    this.AnimateNav();
    this.AnimateLandingImg();
    this.AnimateLandingHeading();
    this.AnimateLandingSpan();
  }

  AnimateSidebar() {
    anime({
      targets: `.sidebar`,
      translateX: [-400, 0],
      easing: "easeOutExpo",
      duration: 1000,
      opacity: [0, 1],
    });
  }
  AnimateSidebarContent() {
    anime({
      targets: `.sidebar__box`,
      easing: "easeOutExpo",
      duration: 500,
      translateX: [-400, 0],
      delay: (el, i) => {
        return 1000 + 250 * i;
      },
    });
  }

  AnimateNav() {
    anime({
      targets: `.navAnim`,
      translateY: [-400, 0],
      easing: "easeOutExpo",
      duration: 500,
      delay: (el, i) => {
        return 1000 + 150 * i;
      },
    });
  }

  AnimateResults() {
    anime({
      targets: `.content__preview`,
      easing: "easeOutExpo",
      opacity: [0, 1],
      delay: (el, i) => {
        return 1000 + 250 * i;
      },
    });
  }

  AnimateLandingImg() {
    anime({
      targets: `.landing__img`,
      easing: "easeOutExpo",
      translateX: [800, 0],
      delay: 2000,
      duration: 1500,
    });
  }
  AnimateLandingHeading() {
    anime({
      targets: `.landing__header`,
      easing: "easeOutExpo",
      opacity: [0, 1],
      delay: 3000,
      duration: 1000,
    });
  }

  AnimateLandingSpan() {
    anime({
      targets: `.landing__span`,
      easing: "easeOutExpo",
      opacity: [0, 1],
      delay: 4000,
      duration: 1000,
    });
  }

  AnimatePopups() {
    anime({
      targets: `.overlay `,
      easing: "easeOutExpo",
      opacity: [0, 1],
      duration: 100,
      begin: function () {
        document.querySelector(".overlay").style.visibility = `visible`;
      },
    });
  }

  AnimatePopupContent() {
    anime({
      targets: `.popup__content `,
      easing: "easeOutExpo",
      opacity: [0, 1],
      delay: 500,
      duration: 300,
      begin: function () {
        document.querySelector(".popup__content").style.visibility = `visible`;
      },
    });
  }
}
export default new AnimationView();
