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

  /* function setDefaultArrivalDate() {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    arrivalDateInput.value = formattedDate;
  } */

  //document.addEventListener("DOMContentLoaded", setDefaultArrivalDate);

  let departurePicker;

  const arrivalPicker = flatpickr("#arrival", {
    dateFormat: "d.m.Y",
    minDate: "today",
    onChange: function (selectedDates) {
      if (selectedDates.length > 0) {
        const minDeparture = new Date(selectedDates[0]);
        minDeparture.setDate(minDeparture.getDate() + 1); // следующий день
        departurePicker.set("minDate", minDeparture);
        departurePicker.setDate(minDeparture, true);
      }
    },
  });

  departurePicker = flatpickr("#departure", {
    dateFormat: "d.m.Y",
    minDate: "today",
  });

  const openPopupBtn = document.getElementById("openPopup");
  const popupOverlay = document.getElementById("popupOverlay");
  const closePopupBtn = document.getElementById("closePopup");

  if (openPopupBtn !== null) {
    openPopupBtn.addEventListener("click", () => {
      const arrival = document.getElementById("arrival").value;
      const departure = document.getElementById("departure").value;
      const guests = document.getElementById("guests").value;

      if (!arrival || !departure || !guests) {
        alert("Пожалуйста, заполните все поля");
        return;
      }

      document.getElementById("popupArrival").textContent = arrival;
      document.getElementById("popupDeparture").textContent = departure;
      document.getElementById("popupGuests").textContent = guests;
      popupOverlay.style.display = "flex";
    });

    closePopupBtn.addEventListener("click", () => {
      popupOverlay.style.display = "none";
    });

    popupOverlay.addEventListener("click", (e) => {
      if (e.target === popupOverlay) {
        popupOverlay.style.display = "none";
      }
    });
  }

  /* const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  const captionText = document.getElementById("caption");
  const closeBtn = document.querySelector(".close");

  document.querySelectorAll(".block-two img").forEach((img) => {
    img.addEventListener("click", () => {
      modal.style.display = "block";
      modalImg.src = img.src;
      captionText.innerHTML = img.alt;
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  }); */

  const burger = document.getElementById("burger");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileClose = document.getElementById("mobileClose");

  burger.addEventListener("click", () => {
    mobileMenu.classList.add("active");
    document.documentElement.style.overflow = "hidden"; // блокируем scroll у <html>
  });

  mobileClose.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    document.documentElement.style.overflow = ""; // возвращаем scroll
  });
});
