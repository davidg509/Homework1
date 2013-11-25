


$(function(){
        var cart = {};
        render(com.dawgpizza.menu.pizzas, com.dawgpizza.menu.drinks, com.dawgpizza.menu.dessert);
        renderTotal();
        $('.add-to-cart').click(addToCart());
});

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
            	"data.price":pizza.prices[0]
            })
            clone.find('.butname2').html("Medium: $" + pizza.prices[1]).attr({
            	"data-name": pizza.name,
            	"data.price":pizza.prices[1]
            })
            clone.find('.butname3').html("Large: $" + pizza.prices[2]).attr({
            	"data-name": pizza.name,
            	"data.price":pizza.prices[2]
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


function renderTotal(){
        $(".total-price").html(total);
};

function removeFromCart(){
        var item = new ItemModel({
                name: $(this).attr("data-name"),
                size: $(this).attr("data-size")
        });

        total -= parseInt($(this).attr("data-price"));

        cart.removeItem(item);
        $(this).remove();
                renderTotal();

}

function addToCart () {
        var type = $(this).data("type");
        var name = $(this).data("name");
        var size = "";        
        if (type == "pizza") {
                size = $(this).data("size");
        };
        var price = $(this).data("price");

        var item = new ItemModel({
                name: name,
                type: type,
                size: size,
                price: price,
                qty: 1
        });

        var itemHtml = $(".template-cart-item").clone().removeClass("template-cart-item");
        
        itemHtml.html(name + " " + size + " $" + price);
        $(".cart-items-container").append(itemHtml);

        itemHtml.click(removeFromCart);
        itemHtml.attr({
                "data-name" : name,
                "data-type": type,
                "data-size": size,
                "data-price": price,
        });


        cart.addItem(item);
        total += parseInt(price);
                renderTotal();

}
