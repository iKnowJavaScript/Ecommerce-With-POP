const { Order } = require("../main/Order");

jest.mock("../fs");

// describe("Testing Order Instances and saving it to Database", function() {
//   it("creating new Order instance", function() {
//     let order = new Order(["cup", "tea"]);

//     expect(order).toBeDefined();
//   });

//   it("Saving instances to Database", function() {
//     let order = new Order("Cup");

//     expect(order.makeOrder("Cup22", 3)).toMatch(
//       /Order Succesfully Added to Database/
//     );
//   });
// });

// describe("Read all Order from the Database", function() {
//   it("Should return all orders form the DB", function() {
//     let order = new Order("Cup");
//     order.makeOrder("Cup", 2);
//     let orderDB = order.readAll();

//     expect(orderDB).toBeDefined();
//   });
// });

// describe("Read a single Order from the Database", function() {
//   let order;
//   beforeEach(function() {
//     order = new Order();
//     order.makeOrder("Cup", 2);
//   });
//   it("Return Error if input is wrong format", function() {
//     let orderDB = order.readSingle("oldOrder");

//     expect(orderDB).toMatch(/Input a valid Order ID/);
//   });
//   it("Return false if order is not found", function() {
//     let orderDB = order.readSingle(123456);

//     expect(orderDB).toMatch(/Order not found/);
//   });
//   it("Return order object if found", function() {
//     let orderDB = order.readSingle(1);

//     expect(orderDB).toBeDefined();
//   });
// });

// describe("Update  an Order from the Database", function() {
//   let order;
//   beforeEach(function() {
//     order = new Order();
//     order.makeOrder("Cup", 2);
//   });
//   it("Return Error if input is wrong format", function() {
//     expect(order.update("one", "update")).toMatch(/Order Id must be Number/);
//     expect(order.update(1, "")).toMatch(/Invalid Product/);
//   });
//   it("Return false if order is not found", function() {
//     expect(order.update(122, "update")).toMatch(
//       /Product not found/
//     );
//   });
//   it("Return Succes if found", function() {
//     order.makeOrder("Cupee", 2);
//     console.log("All ",order.readAll());
//     console.log("order :",order)
//     expect(order.update(1, "update")).toMatch(/Updated Succesfully/);
//   });
// });

// describe("Delete an Order from the Database", function() {
//   let order;
//   let order2;
//   beforeEach(function() {
//     order = new Order();
//     order.makeOrder("Cup", 2);
//     order2 = new Order();
//     order2.makeOrder("Cap", 4);
//   });
//   it("Return Error if input is wrong format", function() {
//     expect(order.deleteById("one")).toMatch(/Input must be a valid order ID/);
//   });
//   it("Return false if order is not found", function() {
//     expect(order.deleteById(122222222222222, "update")).toMatch(
//       /Product not found/
//     );
//   });
//   it("Return Succes if found", function() {
//     order.makeOrder("Cup", 2);
//     expect(order.deleteById(2)).toMatch(/Order has been deleted/);
//   });
// });

// describe("Delete all Order from the Database", function() {
//   let order;
//   let order2;
//   beforeEach(function() {
//     order = new Order();
//     order.makeOrder("Cup", 2);
//     order2 = new Order();
//     order2.makeOrder("Cap", 4);
//   });
//   it("Return empty array", function() {
//     expect(order.deleteAll()).toHaveLength(0);
//   });
// });
