$(document).ready(function () {
  const gallerySwiper = new Swiper(".gallery-swiper", {
    slidesPerView: 4,
    spaceBetween: 20,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      320: {
        // мобила
        slidesPerView: 1,
        spaceBetween: 15,
      },
      768: {
        // планшет
        slidesPerView: 2,
        spaceBetween: 20,
      },
      1025: {
        // пк
        slidesPerView: 4,
        spaceBetween: 30,
      },
    },
  });

  $(".swiper-slide").on("click", function () {
    var imgSrc = $(this).data("img");
    $("#modalImage").attr("src", imgSrc);
    $("#imageModal").fadeIn();
  });

  $(".close-modal, #imageModal").on("click", function (e) {
    if (e.target !== this) return;
    $("#imageModal").fadeOut();
  });

  const swiper = new Swiper(".slider", {
    slidesPerView: 3,
    spaceBetween: 30,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".custom-pagination",
      clickable: true,
    },
    mousewheel: true,
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });

  new Swiper(".mySwiper", {
    slidesPerView: 2,
    spaceBetween: 30,
    centeredSlides: true,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      640: {
        slidesPerView: 1,
      },
      1024: {
        slidesPerView: 2,
      },
    },
  });

  // Swiper init
  new Swiper(".slider__swiper", {
    loop: true,
    pagination: { el: ".swiper-pagination", clickable: true },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // Modal
  $("#openModal").click(function () {
    $("#modal").fadeIn();
  });

  $("#closeModal, .modal__overlay").click(function () {
    $("#modal").fadeOut();
    $("#contactForm")[0].reset();
    $(".form__success").hide();
  });

  // Mobile menu
  $("#burger").click(function () {
    //   $("#mobileMenu").toggleClass("active");
  });

  // Form validation
  $("#contactForm").submit(function (e) {
    e.preventDefault();
    const name = $('input[name="name"]').val().trim();
    const email = $('input[name="email"]').val().trim();
    const message = $('textarea[name="message"]').val().trim();

    if (!name || !email || !message) {
      alert("Пожалуйста, заполните все поля.");
      return;
    }

    // Здесь может быть AJAX-запрос
    $(".form__success").fadeIn();
    $(this)[0].reset();
  });

  // Переключение мобильного меню
  $("#burger").on("click", function () {
    //    $("#mobileMenu").toggleClass("open");
    //    $(this).toggleClass("open");
  });

  // Активная ссылка
  function setActiveLink(selector) {
    $(selector).each(function () {
      if (this.href === window.location.href) {
        $(this).addClass("active");
      }
    });
  }

  setActiveLink(".nav__link");
  setActiveLink(".mobile-menu__link");

  $(".accordion-header").click(function () {
    const item = $(this).closest(".accordion-item");

    if (item.hasClass("active")) {
      item.removeClass("active");
      item.find(".icon-circle").removeClass("active");
      item.find(".arrow").html("&#9660;");
    } else {
      $(".accordion-item").removeClass("active");
      $(".icon-circle").removeClass("active");
      $(".arrow").html("&#9660;");

      item.addClass("active");
      item.find(".icon-circle").addClass("active");
      item.find(".arrow").html("&#9650;");
    }
  });

  const swiper2 = new Swiper(".mySwiper2", {
    slidesPerView: 1,
    spaceBetween: 30,
    navigation: {
      nextEl: ".swiper-button-next.custom-arrow",
      prevEl: ".swiper-button-prev.custom-arrow",
    },
    loop: true,
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });

  const swiper3 = new Swiper(".youtube-swiper", {
    slidesPerView: 1.2,
    spaceBetween: 20,
    centeredSlides: true,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 1.5,
      },
      1024: {
        slidesPerView: 2.2,
      },
    },
  });

  $(".faq-toggle").on("click", function () {
    const $this = $(this);
    const $content = $this.closest(".faq-item").find(".faq-content");

    if ($content.is(":visible")) {
      $content.slideUp();
      $this.text("+");
    } else {
      $(".faq-content").slideUp(); // закрыть остальные
      $(".faq-toggle").text("+");
      $content.slideDown();
      $this.text("–");
    }
  });

  $(".consult-btn").on("click", function () {
    if (!$("#agree").is(":checked")) {
      alert("Пожалуйста, примите политику конфиденциальности");
      return false;
    }
    // Отправка формы или другое действие
    alert("Заявка отправлена!");
  });

  /* const select1 = document.querySelector('.custom-select');
  const selected = select1.querySelector('.selected');
  const options = select1.querySelector('.options');
  const optionItems = select1.querySelectorAll('.option');

  selected.addEventListener('click', () => {
    options.style.display = options.style.display === 'block' ? 'none' : 'block';
  });

  optionItems.forEach(option => {
    option.addEventListener('click', () => {
      selected.innerHTML = option.innerHTML;
      options.style.display = 'none';
    });
  }); */

  // Получаем элементы даты заезда и даты выезда
  const arrivalDateInput = document.getElementById("arrival-date");
  const departureDateInput = document.getElementById("departure-date");

  // Функция для обновления минимальной даты выезда
  function updateDepartureDate() {
    const arrivalDate = new Date(arrivalDateInput.value);
    arrivalDate.setDate(arrivalDate.getDate() + 1);
    const minDepartureDate = arrivalDate.toISOString().split("T")[0];
    departureDateInput.setAttribute("min", minDepartureDate);
    if (new Date(departureDateInput.value) < arrivalDate) {
      departureDateInput.value = minDepartureDate;
    }
  }

  arrivalDateInput.addEventListener("change", updateDepartureDate);
  document.addEventListener("DOMContentLoaded", updateDepartureDate);

  // Функция для проверки формы перед отправкой
  function validateBookingForm(event) {
    const arrivalDate = new Date(arrivalDateInput.value);
    const departureDate = new Date(departureDateInput.value);

    if (departureDate <= arrivalDate) {
      event.preventDefault();
      alert("Дата выезда должна быть позже даты заезда!");
      return false;
    }

    const guestsSelect = document.getElementById("guests");
    if (guestsSelect.value === "") {
      event.preventDefault();
      alert("Пожалуйста, выберите количество гостей.");
      return false;
    }

    return true;
  }

  const bookingForm = document.querySelector(".booking-form");
  bookingForm.addEventListener("submit", validateBookingForm);

  function setDefaultArrivalDate() {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    arrivalDateInput.value = formattedDate;
  }

  document.addEventListener("DOMContentLoaded", setDefaultArrivalDate);
});
