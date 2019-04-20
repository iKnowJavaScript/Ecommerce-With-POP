const { Order } = require("../main/Order");

jest.mock("../fs");

let order = new Order();

describe("Testing Order Instances and saving it to Database", function() {
  it("creating new Order instance", function() {
    expect(order).toBeDefined();
  });

  it("Saving instances to Database", function() {
    expect(order.makeOrder("Cup", 3)).toMatch(
      /Order Succesfully Added to Database/
    );
  });
});

describe("Read all Order from the Database", function() {
  it("Should return all orders form the DB", function() {
    let newOrder = new Order();
    newOrder.makeOrder("Tea", 2);
    let orderDB = order.readAll();

    expect(orderDB).toBeDefined();
    expect(orderDB).toHaveLength(2);
  });
});

describe("Read a single Order from the Database", function() {
  it("Return Error if input is wrong", function() {
    let orderDB = order.readSingle("oldOrder");

    expect(orderDB).toMatch(/Input a valid Order ID/);
  });
  it("Return false if order is not found", function() {
    let orderDB = order.readSingle(123456);

    expect(orderDB).toMatch(/Order not found/);
  });
  it("Return order object if found", function() {
    let orderDB = order.readSingle(2);

    expect(orderDB).toBeDefined();
    expect(orderDB).toHaveProperty("product");
  });
});

describe("Update  an Order from the Database", function() {
  it("Return Error if input is wrong format", function() {
    expect(order.update("one", "update")).toMatch(/Order Id must be Number/);
    expect(order.update(1, "")).toMatch(/Invalid Product/);
  });
  it("Return false if order is not found", function() {
    expect(order.update(122, "update")).toMatch(/Product not found/);
  });
  it("Return Succes if found", function() {
    console.log(order.all)
    expect(order.update(2, "updated")).toMatch(/Updated Succesfully/);
  });
});

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
