const { Order } = require("../main/Order");

jest.mock("../fs");


describe("Testing Order Instances and saving it to Database", function() {
  it("creating new Order instance", function() {
    let order = new Order(["cup", "tea"]);

    expect(order).toBeDefined();
  });

  it("Saving instances to Database", function() {
    let order = new Order("Cup");

    expect(order.makeOrder("Cup", 3)).toMatch("Order Succesfully Added to Database");
  });
});
