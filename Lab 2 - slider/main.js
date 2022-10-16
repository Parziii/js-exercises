class Slider {
  #bulletsContainer;
  #slidesContainer;
  #nextBtn;
  #prevBtn;
  #currentIndex = 0;


  //init
  constructor() {
    this.#bulletsContainer = document.querySelector(".bullets");
    this.#slidesContainer = document.querySelector(".slides");
    this.#nextBtn = document.querySelector(".next-btn");
    this.#prevBtn = document.querySelector(".prev-btn");

    //button prev + next action
    this.#nextBtn.onclick = () => this.#goToNextSlide();
    this.#prevBtn.onclick = () => this.#goToPrevSlide();

    //create buttons div
    this.#initBullets();

    //take button by parent, take index and go to slide
    document.querySelectorAll(".bullet").forEach((bullet, index) => {
      bullet.onclick = () => this.#goToSlideByIndex(index);
    });
  }

  //create "bullet" button and add it to parent slide
  #initBullets() {
    const createBullet = () => {
      const div = document.createElement("div");
      div.classList.add("bullet");

      return div;
    };

    this.#slidesContainer.querySelectorAll(".slide").forEach(() => {
      this.#bulletsContainer.appendChild(createBullet());
    });
  }

  #goToSlideByIndex(index) {
    const slidesWidth = document
      .querySelector(".slide")
      .getBoundingClientRect().width;

    let translationValue = 0;

    translationValue = index === 0 ? 0 : slidesWidth * index;

    this.#slidesContainer.querySelectorAll(".slide").forEach((slide) => {
      slide.style.transform = `translateX(-${translationValue}px)`;
    });

    this.#currentIndex = index === 0 ? 1 : index;
  }

  #goToNextSlide() {
    this.#currentIndex++;

    const slidesWidth = document
      .querySelector(".slide")
      .getBoundingClientRect().width;

    this.#slidesContainer.querySelectorAll(".slide").forEach((slide) => {
      slide.style.transform = `translateX(-${
        slidesWidth * this.#currentIndex
      }px)`;
    });
  }

  #goToPrevSlide() {
    this.#currentIndex--;

    const slidesWidth = document
      .querySelector(".slide")
      .getBoundingClientRect().width;

    this.#slidesContainer.querySelectorAll(".slide").forEach((slide) => {
      slide.style.transform = `translateX(-${
        slidesWidth * this.#currentIndex
      }px)`;
    });
  }
}

const slider = new Slider();
