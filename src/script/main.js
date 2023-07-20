//postJSON
$.getJSON("list.json", function (data) {
  console.log(data.post);
  let post = data.post;
  $.each(post, function (i, data) {
    $(".card-content .pagination").before(
      `<div class="card">
      <div class="card-image">
      <img src="${data.img}" alt="">
      </div>
      <div class="card-info">
      <h3>${data.title}</h3>
      <p>${data.description}</p>
      <a href="${data.link}" class="btn" target="_blank">Download</a>
      </div>
      </div>`
    );
    const idPost = document.querySelectorAll(".card-content .card");
    const description = document.querySelectorAll(".card .card-info p");
    description[i].addEventListener("click", function () {
      document.body.classList.add("active-popup");
      dataPost = post[i];
      const popupDesc = document.querySelector(".popup .popup-description");
      popupDesc.innerHTML = dataPost.description;
    });

    document
      .querySelector(".popup .close-btn")
      .addEventListener("click", () => {
        document.body.classList.remove("active-popup");
      });

    function getPageList(totalPages, page, maxLength) {
      function range(start, end) {
        return Array.from(Array(end - start + 1), (_, i) => i + start);
      }

      var sideWidth = maxLength < 9 ? 1 : 2;
      var leftWidth = (maxLength - sideWidth * 2 - 3) >> 1;
      var rightWidth = (maxLength - sideWidth * 2 - 3) >> 1;

      if (totalPages <= maxLength) {
        return range(1, totalPages);
      }

      if (page <= maxLength - sideWidth - 1 - rightWidth) {
        return range(1, maxLength - sideWidth - 1).concat(
          0,
          range(totalPages - sideWidth + 1, totalPages)
        );
      }

      if (page >= totalPages - sideWidth - 1 - rightWidth) {
        return range(1, sideWidth).concat(
          0,
          range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages)
        );
      }

      return range(1, sideWidth).concat(
        0,
        range(page - leftWidth, page + rightWidth),
        0,
        range(totalPages - sideWidth + 1, totalPages)
      );
    }

    $(function () {
      var numberOfItems = $(".card-content .card").length;
      var limitPerPage = 3; //How many card items visible per a page
      var totalPages = Math.ceil(numberOfItems / limitPerPage);
      var paginationSize = 5; //How many page elements visible in the pagination
      var currentPage;

      function showPage(whichPage) {
        if (whichPage < 1 || whichPage > totalPages) return false;

        currentPage = whichPage;

        $(".card-content .card")
          .hide()
          .slice((currentPage - 1) * limitPerPage, currentPage * limitPerPage)
          .show();

        $(".pagination li").slice(1, -1).remove();

        getPageList(totalPages, currentPage, paginationSize).forEach((item) => {
          $("<li>")
            .addClass("page-item")
            .addClass(item ? "current-page" : "dots")
            .toggleClass("active", item === currentPage)
            .append(
              $("<a>")
                .addClass("page-link")
                .attr({ href: "javascript:void(0)" })
                .text(item || "...")
            )
            .insertBefore(".next-page");
        });

        $(".previous-page").toggleClass("disable", currentPage === 1);
        $(".next-page").toggleClass("disable", currentPage === totalPages);
        return true;
      }

      $(".pagination").append(
        $("<li>")
          .addClass("page-item")
          .addClass("previous-page")
          .append(
            $("<a>")
              .addClass("page-link")
              .attr({ href: "javascript:void(0)" })
              .text("Prev")
          ),
        $("<li>")
          .addClass("page-item")
          .addClass("next-page")
          .append(
            $("<a>")
              .addClass("page-link")
              .attr({ href: "javascript:void(0)" })
              .text("Next")
          )
      );

      $(".card-content").show();
      showPage(1);

      $(document).on(
        "click",
        ".pagination li.current-page:not(.active)",
        function () {
          return showPage(+$(this).text());
        }
      );

      $(".next-page").on("click", function () {
        return showPage(currentPage + 1);
      });

      $(".previous-page").on("click", function () {
        return showPage(currentPage - 1);
      });
    });
  });
});

//Nav
const burger = document.querySelector(".burger");
const sidebar = document.querySelector(".sidebar");
const bgSidebar = document.querySelector(".bg-sidebar");

burger.addEventListener("click", function () {
  this.classList.toggle("change");
  sidebar.classList.toggle("change");
  bgSidebar.classList.toggle("change");
});

bgSidebar.addEventListener("click", function () {
  this.classList.remove("change");
  sidebar.classList.remove("change");
  burger.classList.remove("change");
});

const section = document.querySelectorAll("section");
const NavMenu = document.querySelectorAll(".sidebar li .btn-nav");

window.onscroll = () => {
  section.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 200;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      NavMenu.forEach((links) => {
        links.classList.remove("active");
        const navList = document.querySelector(
          ".sidebar li .btn-nav[href*=" + id + "]"
        );
        navList.classList.add("active");
      });
    }
  });
};

const header = document.querySelector("nav");
window.addEventListener("scroll", () => {
  header.classList.toggle("shadow", window.scrollY > 300);
});
const toTop = document.querySelector(".scrollTop");
window.addEventListener("scroll", () => {
  toTop.classList.toggle("active", window.scrollY > 300);
});

toTop.addEventListener("click", () => {
  window.scrollTo(0, 0);
});
