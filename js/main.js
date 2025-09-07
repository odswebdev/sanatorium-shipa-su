$(document).ready(function () {
  // Получаем кнопку и добавляем обработчик клика
  const scrollDownBtn = document.getElementById("scrollDownBtn");

  // Функция прокрутки страницы вниз
  scrollDownBtn.addEventListener("click", () => {
    window.scrollTo({
      top: window.innerHeight, // Прокрутка на 1 экран вниз
      behavior: "smooth", // Плавная прокрутка
    });
  });

  /* --- Механизм бронирования --- */
  let departurePicker = null; // глобальная переменная
  let arrivalPicker = null;
  let selectedArrival = null;
  let selectedDeparture = null;

  const arrivalInput = document.getElementById("arrival");
  const arrivalField = document.querySelector(
    ".form__field.form__field--arrival"
  );
  const departureInput = document.getElementById("departure");
  const departureField = document.querySelector(
    ".form__field.form__field--departure"
  );

  // Функция позиционирования календаря
  function positionCalendar(field, picker) {
    const rect = field.getBoundingClientRect();
    const calendarEl = picker.$datepicker;
    calendarEl.style.position = "fixed";
    calendarEl.style.top = rect.bottom + "px";
    calendarEl.style.left = rect.left + "px";
    calendarEl.style.width = rect.width + "px";
    calendarEl.style.zIndex = 9999;
  }

  if (arrivalInput && arrivalField) {
    const arrivalCalendarContainer = document.createElement("div");
    document.body.appendChild(arrivalCalendarContainer);

    const arrivalPicker = new AirDatepicker(arrivalInput, {
      container: arrivalCalendarContainer,
      startDate: new Date(),
      autoClose: true,
      minDate: new Date(),
      buttons: [
        {
          content: "Сегодня",
          onClick(dp) {
            const today = new Date();
            dp.selectDate(today);
            selectedArrival = today;
            if (
              departurePicker &&
              selectedDeparture &&
              selectedDeparture < selectedArrival
            ) {
              selectedDeparture = null;
              departurePicker.update();
            }
            dp.update();
          },
        },
        {
          content: "Очистить",
          onClick(dp) {
            dp.clear();
            selectedArrival = null;
            //   if (departurePicker) departurePicker.update();
          },
        },
      ],
      onSelect({ date }) {
        selectedArrival = date || null; // выбранная дата заезда

        // Если дата выезда раньше заезда — сброс выезда
        if (
          selectedDeparture &&
          selectedArrival &&
          selectedDeparture < selectedArrival
        ) {
          selectedDeparture = null;
        }

        // Обновляем календарь выезда, чтобы подсветить диапазон
        if (departurePicker) {
          //    departurePicker.update();
        }
      },
    });

    ["focus", "mousedown", "click"].forEach((evt) =>
      arrivalInput.addEventListener(evt, (e) => e.preventDefault())
    );

    arrivalField.addEventListener("click", (e) => {
      e.stopPropagation();
      if (arrivalPicker.visible) arrivalPicker.hide();
      else {
        arrivalPicker.show();
        positionCalendar(arrivalField, arrivalPicker);
      }
    });

    document.addEventListener("click", () => {
      if (arrivalPicker.visible) arrivalPicker.hide();
    });

    window.addEventListener("resize", () => {
      if (arrivalPicker.visible) positionCalendar(arrivalField, arrivalPicker);
    });
    window.addEventListener("scroll", () => {
      if (arrivalPicker.visible) positionCalendar(arrivalField, arrivalPicker);
    });
  }

  // --- Календарь выезда ---
  if (departureInput && departureField) {
    const departureCalendarContainer = document.createElement("div");
    document.body.appendChild(departureCalendarContainer);

    departurePicker = new AirDatepicker(departureInput, {
      container: departureCalendarContainer,
      startDate: new Date(),
      autoClose: true,
      minDate: new Date(),
      visible: false,
      showOn: "",
      buttons: [
        {
          content: "Сегодня",
          onClick(dp) {
            const today = new Date();
            dp.selectDate(today); // выбираем сегодняшнюю дату
            dp.show(); // открываем календарь
            if (dp === departurePicker) {
              selectedDeparture = today;
            } else if (dp === arrivalPicker) {
              selectedArrival = today;
              // если выезд раньше заезда — сброс
              if (selectedDeparture && selectedDeparture < selectedArrival) {
                selectedDeparture = null;
                if (departurePicker) departurePicker.update();
              }
            }
            dp.update(); // обновляем отображение
          },
        },
        {
          content: "Очистить",
          onClick(dp) {
            dp.clear();
            if (dp === departurePicker) selectedDeparture = null;
            if (dp === arrivalPicker) selectedArrival = null;
            //   if (departurePicker) departurePicker.update();
            //  if (arrivalPicker) arrivalPicker.update();
          },
        },
      ],
      onSelect({ date }) {
        selectedDeparture = date || null;
        //   departurePicker.update();
      },
      onRenderCell({ date, cellType }) {
        if (cellType !== "day") return;

        const t = date.getTime();
        const arrivalTime = selectedArrival ? selectedArrival.getTime() : null;
        const departureTime = selectedDeparture
          ? selectedDeparture.getTime()
          : null;

        if (arrivalTime && t === arrivalTime)
          return { classes: "custom-arrival" };
        if (departureTime && t === departureTime)
          return { classes: "custom-departure" };
        if (
          arrivalTime &&
          departureTime &&
          t > arrivalTime &&
          t < departureTime
        )
          return { classes: "custom-range" };
      },
    });

    ["focus", "mousedown", "click"].forEach((evt) =>
      departureInput.addEventListener(evt, (e) => e.preventDefault())
    );

    departureField.addEventListener("click", (e) => {
      e.stopPropagation();
      if (departurePicker.visible) departurePicker.hide();
      else {
        departurePicker.show();
        positionCalendar(departureField, departurePicker);
      }
    });

    document.addEventListener("click", () => {
      if (departurePicker.visible) departurePicker.hide();
    });

    window.addEventListener("resize", () => {
      if (departurePicker.visible)
        positionCalendar(departureField, departurePicker);
    });
    window.addEventListener("scroll", () => {
      if (departurePicker.visible)
        positionCalendar(departureField, departurePicker);
    });
  }

  /**** ******/

  const readMoreBtn = document.getElementById("readMoreBtn");
  const aboutText = document.getElementById("aboutText");

  if (readMoreBtn && aboutText) {
    readMoreBtn.addEventListener("click", () => {
      if (aboutText.classList.contains("about__desc--collapsed")) {
        // Получаем полную высоту текста
        const fullHeight = aboutText.scrollHeight + "px";
        aboutText.style.maxHeight = fullHeight;
        aboutText.classList.remove("about__desc--collapsed");
      } else {
        aboutText.style.maxHeight = "150px";
        aboutText.classList.add("about__desc--collapsed");
      }

      readMoreBtn.textContent = aboutText.classList.contains(
        "about__desc--collapsed"
      )
        ? "Читать полностью"
        : "Скрыть";
    });
  }

  /**** Слайдер Rooms *****/

  const heroSlider = new Swiper(".hero-slider__swiper", {
    loop: true,
    navigation: {
      nextEl: ".hero-slider__button--next",
      prevEl: ".hero-slider__button--prev",
    },
    slidesPerView: 1,
    spaceBetween: 20,
    breakpoints: {
      768: {
        slidesPerView: 1,
      },
      1024: {
        slidesPerView: 1,
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

  let swiper6 = new Swiper(".gallery__slider", {
    slidesPerView: 4,
    spaceBetween: 20,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      320: {
        slidesPerView: 1 /* 2 слайда на планшетах */,
      },
      768: {
        slidesPerView: 2 /* 2 слайда на планшетах */,
      },
      1024: {
        slidesPerView: 3 /* 3 слайда на больших экранах */,
      },
      1280: {
        slidesPerView: 4 /* 4 слайда на самых больших экранах */,
      },
    },
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

  if (burger && mobileMenu) {
    function openMenu() {
      mobileMenu.style.display = "flex";
      setTimeout(
        () => mobileMenu.classList.add("header__mobile-menu--open"),
        10
      );
      burger.classList.add("active");
      document.documentElement.style.overflow = "hidden";
    }

    function closeMenu() {
      mobileMenu.classList.remove("header__mobile-menu--open");
      burger.classList.remove("active");
      document.documentElement.style.overflow = "";
      setTimeout(() => (mobileMenu.style.display = "none"), 300);
    }

    burger.addEventListener("click", () => {
      mobileMenu.classList.contains("header__mobile-menu--open")
        ? closeMenu()
        : openMenu();
    });

    mobileMenu.addEventListener("click", (e) => {
      if (e.target === mobileMenu) closeMenu();
    });
  }

  // Получаем элементы
  const customSelectWrapper = document.querySelector(".form__field--guests");

  if (customSelectWrapper) {
    const bookingField = customSelectWrapper.querySelector(".form__field");
    const customSelect = bookingField.querySelector(".form__select");
    const options = customSelect.querySelector(".form__options");
    const optionItems = options.querySelectorAll(".form__option");

    // Переносим список опций в body
    document.body.appendChild(options);

    // Функция позиционирования списка
    function positionOptions() {
      const rect = bookingField.getBoundingClientRect();
      options.style.position = "fixed";
      options.style.top = rect.bottom + "px";
      options.style.left = rect.left + "px";
      options.style.width = rect.width + "px";
    }

    // Открытие/закрытие select по клику на booking-field
    bookingField.addEventListener("click", (e) => {
      e.stopPropagation();
      customSelect.classList.toggle("open");

      if (customSelect.classList.contains("open")) {
        positionOptions();
        options.style.opacity = "1";
        options.style.pointerEvents = "auto";
      } else {
        options.style.opacity = "0";
        options.style.pointerEvents = "none";
      }
    });

    // Выбор опции
    optionItems.forEach((option) => {
      option.addEventListener("click", () => {
        customSelect.querySelector(".form__select-trigger").textContent =
          option.textContent;
        customSelect.classList.remove("open");
        options.style.opacity = "0";
        options.style.pointerEvents = "none";
      });
    });

    // Закрытие при клике вне select
    document.addEventListener("click", () => {
      customSelect.classList.remove("open");
      options.style.opacity = "0";
      options.style.pointerEvents = "none";
    });

    // Перепозиционирование списка при ресайзе окна
    window.addEventListener("resize", () => {
      if (customSelect.classList.contains("open")) {
        positionOptions();
      }
    });

    // (Опционально) Скролл при прокрутке, чтобы список оставался на месте
    window.addEventListener("scroll", () => {
      if (customSelect.classList.contains("open")) {
        positionOptions();
      }
    });
  }

  const openPopupBtns = document.querySelectorAll(".book-btn"); // все кнопки с классом
  const popupOverlay = document.getElementById("popupOverlay");
  const closePopupBtn = document.getElementById("closePopup");
  const popupSuccess = document.getElementById("popupSuccess");

  // Поля из формы
  const guestsSelect = document.querySelector(
    ".form__select .form__select-trigger"
  );

  // Навешиваем на все кнопки
  openPopupBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      document.getElementById("popupArrival").textContent =
        arrivalInput.value || "—";
      document.getElementById("popupDeparture").textContent =
        departureInput.value || "—";
      document.getElementById("popupGuests").textContent =
        guestsSelect.textContent || "—";

      popupOverlay.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  // Закрытие popup
  closePopupBtn.addEventListener("click", () => {
    popupOverlay.classList.remove("active");
    document.body.style.overflow = "";
    popupSuccess.style.display = "none";
  });

  popupOverlay.addEventListener("click", (e) => {
    if (e.target === popupOverlay) {
      popupOverlay.classList.remove("active");
      document.body.style.overflow = "";
      popupSuccess.style.display = "none";
    }
  });

  // Валидация и отправка формы
  document.getElementById("popupSubmit").addEventListener("click", (e) => {
    e.preventDefault();

    const name = document.getElementById("popupName").value.trim();
    const email = document.getElementById("popupEmail").value.trim();
    const phone = document.getElementById("popupPhone").value.trim();
    const comment = document.getElementById("popupComment").value.trim();
    const arrival = document.getElementById("popupArrival").textContent;
    const departure = document.getElementById("popupDeparture").textContent;
    const guests = document.getElementById("popupGuests").textContent;

    if (!name || !email || !phone) {
      alert("Пожалуйста, заполните все обязательные поля!");
      return;
    }

    // EmailJS отправка
    const templateParams = {
      name,
      email,
      phone,
      comment,
      arrival,
      departure,
      guests,
    };

    emailjs
      .send("service_me74cro", "template_quxeqcr", templateParams)
      .then(() => {
        popupSuccess.style.display = "block";
        document.querySelector(".popup__form").style.display = "none";
        setTimeout(() => {
          popupOverlay.classList.remove("active");
          document.body.style.overflow = "";
          popupSuccess.style.display = "none";
          document.querySelector(".popup__form").style.display = "block";
        }, 1000);
      })
      .catch((err) => alert("Ошибка отправки: " + err.text));
  });
});
