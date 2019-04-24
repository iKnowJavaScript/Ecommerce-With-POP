const { User } = require("./main/User");
const { Admin } = require("./main/Admin");
const { Order } = require("./main/Order");

const user = new User("Martins", "martins@gmail", "pass1234");
 const user1 = new User("Joseph", "joseph@gmail", "pass1234");
const user2 = new User("Sodiq", "sodiq@gmail", "pass1234");
const user3 = new User("Charles", "charles@gmail", "anotherPass");
console.log(user.save())
/console.log(user1.save());
console.log(user2.save());
console.log(user3.save());


console.log(user.updateDetail("New Martins", "martins@gmail", "newPassForMartins"))

console.log(user.findById(2))
console.log(user.findUserByName("Joseph"))

console.log(user.createOrder("iPhone X"))
console.log(user.createOrder("iPhone X"))
console.log(user3.createOrder(["Bread", "Tecno l5", "Headphone"]))

 const admin = new Admin("Admin", "admin@gmail.com", "adminPass1234")
 admin.save();

console.log(admin.readAllUser())

console.log(admin.deleteUser("joseph@gmail"))
console.log(admin.deleteAllUser())

console.log(admin.getAllOrders())
console.log(admin.readSingleOrder(2))

console.log(admin.updateOrder(2, "Samsung"))

console.log(admin.deleteOrder(3))

admin.deleteAllOrder()