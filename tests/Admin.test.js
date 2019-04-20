const { Admin } = require("../main/Admin");
const { User } = require("../main/User");
const { Order } = require("../main/Order");

jest.mock("../fs");

let martins = new User("Martins", "martins@gmail.com", "pass1234");
let victor = new User("Victor", "victor@gmail.com", "pass1234");
let admin = new Admin("Admin", "admin@gmail.com", "admin01");
martins.save();
victor.save();

let newOrder = new Order();
newOrder.makeOrder("Tea", 2);

describe("Testing Admin Instances and saving it to Database", function() {
  it("creating new Admin instance", function() {
    expect(admin).toBeDefined();
  });
  it("Checking if isAdmin is false", function() {
    expect(admin.isAdmin).toBeTruthy();
  });
  it("Saving instances to Database", function() {
    expect(admin.save()).toMatchObject(admin);
  });

  it("Checking Admin instances with JS 'instanceOf' ", function() {
    expect(admin instanceof Admin).toBeTruthy();
  });
});

describe("Updating Admin details", function() {
  it("Validating input before updating the Databae", function() {
    expect(admin.updateDetail(4444, "realAdmin@gmail.com", "newPass")).toMatch(
      /Input a valid details/
    );
  });

  it("Checking Email before accepting changes", function() {
    expect(
      admin.updateDetail("NewVictor", "martins@gmail.com", "pass1234")
    ).toMatch(/User with this email already exist/);
  });
  it("Updating details on Validating inputs", function() {
    expect(
      admin.updateDetail("Admin", "realAdmin@gmail.com", "newPass")
    ).toMatch(/Updated Succesfully/);
  });
});

describe("Find user by their Id", function() {
  it("Input must be a Number", function() {
    expect(admin.findById("user1")).toMatch(/Please input a valid userId/);
  });
  it("Input must not be Empty", function() {
    expect(admin.findById()).toMatch(/Please input a valid userId/);
  });
  it("ID must be a valid registered user ID", function() {
    expect(admin.findById(3333)).toMatch(/Not found/);
  });
  it("Should not be able to find Admin", function() {
    expect(admin.findById(3)).toMatch(/Not found/);
  });
  it("Return a valid user if input is a valid User ID", function() {
    expect(martins.findById(2)).toEqual({
      id: 2,
      name: "Victor",
      email: "victor@gmail.com",
      isAdmin: false,
      password: "pass1234"
    });
  });
});

describe("Find user by their Name", function() {
  it("Input must be a String", function() {
    expect(admin.findUserByName(2)).toMatch(/Input must be a valid username/);
  });
  it("Input must not be Empty", function() {
    expect(admin.findUserByName()).toMatch(/Input must be a valid username/);
  });
  it("Name must be a valid registered User Name", function() {
    expect(admin.findUserByName("Lekan")).toMatch(/Not found/);
  });
  it("Should not be able to find Admin", function() {
    expect(admin.findUserByName("Admin")).toMatch(/Not found/);
  });
  it("Return a valid user if input is a valid User Name", function() {
    expect(admin.findUserByName("Martins")).toEqual({
      id: 1,
      name: "Martins",
      email: "martins@gmail.com",
      isAdmin: false,
      password: "pass1234"
    });
  });
});

describe("Creating Orders", function() {
  it("Product must be a String", function() {
    expect(admin.createOrder(2)).toMatch(/Invalid Product Name/);
  });
  it("Input must not be Empty", function() {
    expect(admin.createOrder()).toMatch(/Invalid Product Name/);
  });
  it("Return a valid Order object", function() {
    expect(admin.createOrder("iPhone X")).toBeDefined();
  });
});

describe("Reading all Users", function() {
  it("Get all Users from Database", function() {
    let userDB = admin.readAllUser();
    expect(userDB).toHaveLength(2);
  });
});

describe("Deleting a single User", function() {
  it("Checking Input", function() {
    expect(admin.deleteUser()).toMatch(/Input must be a valid email address/);
  });
  it("When user was not found in the database", function() {
    expect(admin.deleteUser("lilMail.com")).toMatch(
      /No such username in the database/
    );
  });
  it("Success on operation successfull", function() {
    let user = new User("newUser", "user@gmail.com", "pass1234");
    user.save();
    expect(admin.deleteUser("user@gmail.com")).toMatch(/User has been deleted/);
  });
});

describe("Deleting all User", function() {
  it("Should delete All Users except Admins", function() {
    expect(admin.deleteAllUser()).toEqual([
      {
        id: 3,
        name: "Admin",
        email: "realAdmin@gmail.com",
        isAdmin: true,
        password: "newPass"
      }
    ]);
  });
});

//Order Test Case
describe("Read all Order from the Database", function() {
  it("Should return all orders form the DB", function() {
    let orderDB = admin.getAllOrders();

    expect(orderDB).toBeDefined();
    expect(orderDB).toHaveLength(1);
  });
});

describe("Read a single Order from the Database", function() {
  it("Return Error if input is wrong", function() {
    let orderDB = admin.readSingleOrder("oldOrder");

    expect(orderDB).toMatch(/Input a valid Order ID/);
  });
  it("Return false if order is not found", function() {
    let orderDB = admin.readSingleOrder(123456);

    expect(orderDB).toMatch(/Order not found/);
  });
  it("Return order object if found", function() {
    let orderDB = admin.readSingleOrder(1);

    expect(orderDB).toBeDefined();
    expect(orderDB).toHaveProperty("product");
  });
});

describe("Update  an Order from the Database", function() {
  it("Return Error if input is wrong format", function() {
    expect(admin.updateOrder("one", "update")).toMatch(
      /Order Id must be Number/
    );
    expect(admin.updateOrder(1, "")).toMatch(/Invalid Product/);
  });
  it("Return false if order is not found", function() {
    expect(admin.updateOrder(122, "update")).toMatch(/Product not found/);
  });
  it("Return Succes if found", function() {
    expect(admin.updateOrder(1, "updated")).toMatch(/Updated Succesfully/);
  });
});

describe("Delete an Order from the Database", function() {
  it("Return Error if input is wrong format", function() {
    expect(admin.deleteOrder("one")).toMatch(/Input must be a valid order ID/);
  });
  it("Return false if order is not found", function() {
    expect(admin.deleteOrder(122222222222222, "update")).toMatch(
      /Product not found/
    );
  });
  it("Return Succes if found", function() {
    expect(admin.deleteOrder(1)).toMatch(/Order has been deleted/);
  });
});

describe("Delete all Order from the Database", function() {
  it("Return empty array", function() {
    expect(admin.deleteAllOrder()).toHaveLength(0);
  });
});
