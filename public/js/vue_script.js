/*function MenuItem(n, ingr, kcal, glu, veg, img) {
    this.name = n; 							//Name of burger
    this.ingridients = ingr;		//kilocalories in burger
    this.kiloCalories = kcal;		//kilocalories in burger
    this.gluten = glu;					//Gluten or Gluten-free
    this.vegetarian = veg;			//Vegetarian or not
    this.image = img;           //Image of burger
}*/

//var foodlist = []
// Objects are then instantiated using the new keyword
//foodlist.push( theWierdBurger = new MenuItem('the Wierd Burger','90 g halloumi, Lettuce, Tomato, Cheese', '700 kcal', false, true,"http://media2.giphy.com/media/3oriO4WnYwNTZLKv5K/giphy.gif"));
//foodlist.push( theWierderBurger = new MenuItem('the Wierder Burger','90 g beef patty, Lettuce, Tomato, Cheese, Bacon', '750 kcal', false, false,"http://media1.giphy.com/media/l4q8eZbcBSSKyeNby/giphy.gif"));
//foodlist.push( theWierdestBurger = new MenuItem('the Wierdest Burger','90 g bean patty, Lettuce, Tomato, Cheese, Pickled onions', '500 kcal', true, true,"https://i.pinimg.com/originals/6d/83/72/6d83726e1912296f4cc4b021ad5e2a37.jpg"));
//foodlist.push( theSuperBurger = new MenuItem('the Super Burger','180 g bean patty, Lettuce, Tomato, Cheese, Pickled onions, Apple', '1000 kcal', false, true, "img/luther-burger.jpg"));
//foodlist.push( theSupperBurger = new MenuItem('the Supper Burger', '180 g beef patty, Bacon, cheese', '300 kcal', true, false, "img/small-burger.jpg"));
var socket = io();

var vm = new Vue({
  el: '#burgermenu',
  data: {
    burgers : foodlist,
    chosenburger: [],
    fullname: "",
    mail: "",
    payment: "",
    gender : "",
    orderlist: "",
    orders: {},
    details:{},
    oID: 0
  },
  created: function () {
      socket.on('initialize', function (data) {
        this.oID = (Object.keys(data.orders).length);
      }.bind(this));

      socket.on('currentQueue', function (data) {
        this.orders = data.orders;
      }.bind(this));
    },
  methods: {
        /*markDone: function () {
            this.orderlist = "Your order: " + this.chosenburger + " " + this.fullname + " " + this.mail + " " + this.payment + " " + this.gender
        },*/
        displayOrder: function (event) {
          console.log("display")
          var offset = {x: event.currentTarget.getBoundingClientRect().left,
                        y: event.currentTarget.getBoundingClientRect().top};
                                   this.details= { x: event.clientX - 10 - offset.x,
                                                   y: event.clientY - 10 - offset.y };
        },
        getNext: function () {
        var lastOrder = Object.keys(this.orders).reduce( function (last, next) {
          return Math.max(last, next);
        }, 0);
        return lastOrder + 1;
      },
        addOrder: function (event) {
          this.orderlist = "Your order: " + this.chosenburger + " " + this.fullname + " " + this.mail + " " + this.payment + " " + this.gender +
          socket.emit("addOrder", { orderId: this.getNext(),
            details: this.details,
            orderItems: this.chosenburger,
            orderFullname: this.fullname,
            orderMail: this.mail,
            orderPayment: this.payment,
            orderGender: this.gender
       });
     }
    }
})
