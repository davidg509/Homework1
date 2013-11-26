//document ready function

$(function(){
    render(com.dawgpizza.menu.pizzas, com.dawgpizza.menu.drinks, com.dawgpizza.menu.dessert);
    function render(pizzas, drinks, desserts){
            var idx;
            var pizza;

            pizzas=com.dawgpizza.menu.pizzas; // (Pizza array. com.pizza.menu is the total object. Three arrays within this object)
            drink=com.dawgpizza.menu.drinks;
            dessert=com.dawgpizza.menu.dessert;

            var pizzaVariable = $('.templatePizza');
            var drinksVariable = $('.templateDrinks');
            var dessertVariable = $('.templateDessert');

            for (idx = 0; idx < com.dawgpizza.menu.pizzas.length; ++idx) {
                pizza = com.dawgpizza.menu.pizzas[idx];

                var clone=pizzaVariable.clone();
                clone.find('.name').html(pizza.name);
                clone.find('.description').html(pizza.description);
                clone.find('.butname').html("Small: $" + pizza.prices[0]).attr({
                    "data-name": pizza.name,
                    "data-price": pizza.prices[0]
                })
                clone.find('.butname2').html("Medium: $" + pizza.prices[1]).attr({
                    "data-name": pizza.name,
                    "data-price": pizza.prices[1]
                })
                clone.find('.butname3').html("Large: $" + pizza.prices[2]).attr({
                    "data-name": pizza.name,
                    "data-price": pizza.prices[2]
                })

                $('div.pizzaheading').append(clone);

            }

            for (idx = 0; idx < com.dawgpizza.menu.drinks.length; ++idx) {
                drinks = com.dawgpizza.menu.drinks[idx];

                var clone=drinksVariable.clone();
                clone.find('.name').html(drinks.name);
                clone.find('.drinkname').html("$" + drinks.price).attr({
                    "data-name" : drinks.name,
                    "data-price" : drinks.price
                });
                $('div.drinksheading').append(clone);
            }
            for (idx = 0; idx < com.dawgpizza.menu.desserts.length; ++idx) {
                desserts = com.dawgpizza.menu.desserts[idx];

                var clone=dessertVariable.clone();
                clone.find('.name').html(desserts.name);
                clone.find('.dessertname').html("$" + desserts.price).attr({
                    "data-name" : desserts.name,
                    "data-price" : desserts.price
                });
                $('div.dessertheading').append(clone);
            }
    }
    //create a cart model as a simple object with
    //the properties we eventually need to post to
    //the server
    var cart = {
        name: null,
        address1: null,
        zip: null,
        phone: null,
        items: [] //empty array
    }; //cart data

    //click event handler for all buttons with the
    //style class 'add-to-cart'
    $('.add-to-cart').click(function(){
        //use the attributes on the button to construct
        //a new cart item object that we can add to the
        //cart's items array
        var newCartItem = {
            type: this.getAttribute('data-type'),
            name: this.getAttribute('data-name'),
            size: this.getAttribute('data-size'),
            price: this.getAttribute('data-price')
        };

        //push the new item on to the items array
        cart.items.push(newCartItem);

        //render the cart's contents to the element
        //we're using to contain the cart information
        //note that you would need a <div> or some
        //other grouping element on the page that has a
        //style class of 'cart-container'
        renderCart(cart, $('.cart-items-container'));
    });

   $('.remove-all').click(function(){
        cart.items = [];
        renderCart(cart, $('.cart-items-container'));

    });

    $('.place-order').click(function(){
            $('#myModal').modal()
    });
    $(".submit-order").click(function(){
        var info = $('.modal-body');
        var input = {
            name : info.find('input[name="first-name"]').val(),
            address1 : info.find('input[name="addr-1"]').val(),
            zip : info.find('input[name="zip"]').val(),
            phone : info.find('input[name="phone"]').val()
        };
        cart.name = input.name;
        cart.address1 = input.address1;
        cart.zip = input.zip;
        cart.phone = input.phone;
        var myCart = cart;
        //var json = JSON.stringify(myCart);
        //$('.cartform').val(json);
        $("#jsonForm").val(JSON.stringify(myCart));
        $(".cartform").trigger('submit');

    });

}); //doc ready

// renderCart()
// renders the current cart information to the screen
// parameters are:
//  - cart (object) reference to the cart model
//  - container (jQuery object) reference to the container <div>
//
function renderCart(cart, container) {
    var idx, item;

    
    //empty the container of whatever is there currently
    container.empty();

    //for each item in the cart...
    var template = $('.cart-item-template');
    var instance;
    for (idx = 0; idx < cart.items.length; ++idx) {
        item = cart.items[idx];

        //TODO: code to render the cart item
        instance = template.clone();
        instance.find('.title').html(item.name);
        instance.find('.price').html(item.price);
        instance.find('.size').html(item.size);
        instance.find('.remove-item').attr({
            'data-index': idx 
        });
        container.append(instance);



    } 

    $('.remove-item').click(function(){
        var idxToRemove = this.getAttribute('data-index');
        cart.items.splice(idxToRemove, 1);
        renderCart(cart, $('.cart-items-container'));
    });


    var total = 0;
    for(var idx = 0; idx < cart.items.length; idx++){
        var item = cart.items[idx].price;
        total += parseInt(item);

    }

    var num = total * 0.095;
    var taxes = num.toFixed(2);
    var grandTotal = parseFloat(total) + parseFloat(taxes);

    $('.total-price').html(total);
    $('.total-tax').html(taxes);
    $('.total-grand').html(grandTotal);

    //TODO: code to render sub-total price of the cart
    //the tax amount (see instructions), 
    //and the grand total


} //renderCart()

// postCart()
// posts the cart model to the server using
// the supplied HTML form
// parameters are:
//  - cart (object) reference to the cart model
//  - cartForm (jQuery object) reference to the HTML form
//
function postCart(cart, cartForm) {
    //find the input in the form that has the name of 'cart'    
    //and set it's value to a JSON representation of the cart model
    cartForm.find('input[name="cart"]').val(JSON.stringify(cart));

    //submit the form--this will navigate to an order confirmation page
    cartForm.submit();

} //postCart()


 



