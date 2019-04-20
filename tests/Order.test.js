const { Order } = require("../main/Order");

jest.mock("../fs");

describe("Testing Order Instances and saving it to Database", function() {
  it("creating new Order instance", function() {
    let order = new Order(["cup", "tea"]);

    expect(order).toBeDefined();
  });

  it("Saving instances to Database", function() {
    let order = new Order("Cup");

    expect(order.makeOrder("Cup22", 3)).toMatch(
      /Order Succesfully Added to Database/
    );
  });
});

describe("Read all Order from the Database", function() {
  it("Should return all orders form the DB", function() {
    let order = new Order("Cup");
    order.makeOrder("Cup", 2);
    let orderDB = order.readAllOrders();
    console.log(orderDB);

    expect(orderDB).toBeDefined();
    expect(orderDB.length).toBe(1);
  });
});

describe("Read a single Order from the Database", function() {
  let order;
  beforeEach(function() {
    order = new Order();
    order.makeOrder("Cup", 2);
  });
  it("Return Error if input is wrong format", function() {
    let orderDB = order.readSingleOrder("oldOrder");

    expect(orderDB).toMatch(/Input a valid Order ID/);
  });
  it("Return false if order is not found", function() {
    let orderDB = order.readSingleOrder(123456);

    expect(orderDB).toMatch(/Order not found/);
  });
  it("Return order object if found", function() {
    let orderDB = order.readSingleOrder(1);

    expect(orderDB).toBeDefined();
  });
});
