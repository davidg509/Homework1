// Create Item

$(function(){
	function itemModel(input){
		this.type = input.type;
		this.name = input.name;
		this.size = input.size;
		this.price = input.price;
		this.quantity = input.quantity;
	}

	function cartModel(){
		this.name = null;
		this.address1 = null;
		this.address2 = null;
		this.zip = null;
		this.phone = null;
		this.nextUrl = null;
		this.nextCaption = null;
		this.items = [];

		this.clearItems = function(){
			this.items = [];
		}

		this.addInfo = function(input){
			this.name = input.name;
			this.address1 = input.addrerss1;
			this.address2 = input.address2;
			this.zip = input.zip;
			this.phone = input.phone;
			this.nextUrl = input.nextUrl;
			this.nextCaption = input.nextCaption;
			this.items = input.item;
		}

		this.alreadyInCart = function(item){
			for(var idx = 0; i < item.length; ++idx){
				if(this.items[i].name == item.name && this.item[i].size == item.size){
					return i;
				}else{
					return -1;
				}
			}
		}

		this.duplicateItems = function(item){
			var inCart = alreadyInCart(item);
			if(inCart == -1){
				this.items.push(item)
			}else{
				this.items[i].quanity++;
			}

		}

		this.removeItem = function(item){
			var idx = this.items.indexOf(item)
			if(idx > -1){
				this.items.splice(idx, 1);
			}
		}

	}

}