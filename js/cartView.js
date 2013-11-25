var cart = new CartModel();
var total = 0;

$(function(){
        renderFood(com.dawgpizza.menu);
        renderDrink(com.dawgpizza.menu);
        renderDessert(com.dawgpizza.menu);
        renderTotal();
        $('.addOrder').click(addToCart);
});

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