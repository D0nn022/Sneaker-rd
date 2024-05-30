//SHOW MENU
const menu = $(".nav__menu");

const showMenu = $(".menu__toggle");

showMenu.click(function(){
    menu.toggleClass("show");
});

//HIDE MENU
const hideMenu = $(".nav__link");

hideMenu.click(function() {
    menu.removeClass("show");
});

// SCROLL ACTIVE
const navSlide= $("section[id]");

$(window).scroll(scrollActive);

function scrollActive(){
    const scrollY = window.pageYOffset;

    navSlide.each(function(){
        let sectionHeight = $(this).outerHeight();
        let sectionTop = $(this).offset().top - 50;
        let sectionId = $(this).attr("id");

        const navLink = $(`.nav__menu a[href="#${sectionId}"]`);

        if(navLink.length > 0){
            if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
              navLink.addClass("active");
            } else{
              navLink.removeClass("active");
            }
        }
    });
};

//SHOW & HIDE CART
const cart = $(".cart");

const toggleCart = $(".cart__toggle");

toggleCart.click(function(){
    cart.toggleClass("show__cart");
});

//ADD CART & DELETE CART
const buttonAdd = $(".button-light");
const cartContainer = $(".cart");
const totalElement = $(".cart__cost");

let total = 0;

buttonAdd.each(function(){
    $(this).click(function(){
        const productSection = $(this).parent();

        const productName = productSection.find(".sneaker__name").text();
        const productPrice = productSection.find(".sneaker__preci").text();
        const productTotal = parseFloat(productPrice.replace("$", "").replace(",", ""));
        const productImg = productSection.find(".sneaker__img").attr("src");

//ADD
        const newCart = $("<section></section>").addClass("cart__container").html(`
        <img class="cart__img" src="${productImg}"/>
        <h3 class="cart__name">${productName}</h3>
        <p class="cart__price">$${productTotal}</p>
        <i class='bx bx-message-alt-x remove'></i>
      `);

      const totalRow = totalElement.parent();
      cartContainer.find(totalRow).before(newCart);

    //ADD PRICE
      total += productTotal;
      totalElement.text(`Total: $${total.toFixed(2)}`);

// REMOVE 
      const removeProduct = newCart.find(".remove");

      removeProduct.click(function(){
        $(this).closest(".cart__container").remove();

    //REMOVE PRICE
        total -= productTotal;
        totalElement.text(`Total: $${total.toFixed(2)}`);
      });
    });
});

//SHOW MODAL
const modal = $(".modal");
const showModal = $(".button");
const hideModal = $(".remove");

// Evento de clic para mostrar el modal
showModal.on("click", function() {
  const modalParent = $(this).parent();
  const modalSection = modalParent.parent();
  const modalImg = modalSection.find(".new__sneaker-img").attr("src");

  const newModal = $("<div></div>")
    .addClass("modal__content")
    .html(`
      <i class='bx bx-message-alt-x remove'></i>
      <img class="modal__img" src="${modalImg}">
    `);

  modal.empty().append(newModal);
  modal.show();
});

modal.on("click", ".remove", function() {
  modal.hide();
});
