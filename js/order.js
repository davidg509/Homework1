



function render(pizzas, drinks, desserts){
	var idx;
	var pizza;

	pizzas=com.dawgpizza.menu.pizzas; // (Pizza array. com.pizza.menu is the total object. Three arrays within this object)
	drink=com.dawgpizza.menu.pizza;
	dessert=com.dawgpizza.menu.pizza;

	var pizzaVariable = $('.templatePizza');

	for (idx = 0; idx < com.dawgpizza.menu.pizzas.length; ++idx) {
	    pizza = com.dawgpizza.menu.pizzas[idx];

	    var clone=pizzaVariable.clone();
	    clone.find('.name').html(pizza.name);
	    clone.find('.description').html(pizza.description);
	    // buttons or list go here
	    clone.find('.prices').html("$" + pizza.prices[0] + "/" + "$" + pizza.prices[1] + "/" + "$" + pizza.prices[2]);

	    $('div.pizzaheading').append(clone);

	}

	for (idx = 0; idx < com.dawgpizza.menu.drinks.length; ++idx) {
	    drinks = com.dawgpizza.menu.drinks[idx];

	    var clone=pizzaVariable.clone();
	    clone.find('.name').html(drinks.name);
	    clone.find('.prices').html("$" + drinks.price);
	    $('div.drinksheading').append(clone);
	}
	for (idx = 0; idx < com.dawgpizza.menu.desserts.length; ++idx) {
	    desserts = com.dawgpizza.menu.desserts[idx];

	    var clone=pizzaVariable.clone();
	    clone.find('.name').html(desserts.name);
	    clone.find('.prices').html("$" + desserts.price);
	    $('div.dessertheading').append(clone);
	}
}



$(function(){
	render(com.dawgpizza.menu.pizzas, com.dawgpizza.menu.drinks, com.dawgpizza.menu.dessert);
	// called button name.click.(methodname)

	//add cart method
});