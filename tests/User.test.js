const { User } = require("../main/User");

jest.mock("../fs");

let martins = new User("Martins", "martins@gmail.com", "pass1234");
let victor = new User("Victor", "victor@gmail.com", "pass1234");

describe("Testing User Instances and saving it to Database", function() {
  it("creating new User instance", function() {
    expect(martins).toBeDefined();
  });
  it("Checking if isAdmin is false", function() {
    expect(martins.isAdmin).toBeFalsy();
  });
  it("Saving instances to Database", function() {
    expect(martins.save()).toMatchObject(martins);
  });
  it("Should return Error when trying to register a multiple member with thesame details", function() {
    let anotherMartins = new User("Martins", "martins@gmail.com", "pass1234");
    martins.save();
    expect(anotherMartins.save()).toMatch(/ERROR REGISTERING/);
  });

  it("New User instances with JS 'instanceOf' ", function() {
    expect(martins instanceof User).toBeTruthy();
  });
});

describe("Updating user details", function() {
  it("Validating user input before updating the Databae", function() {
    expect(martins.updateDetail(4444, "martins@gmail.com", "newPass")).toMatch(
      /Input a valid details/
    );
  });

  it("Checking Email before accepting changes", function() {
    victor.save();
    expect(
      victor.updateDetail("NewVictor", "martins@gmail.com", "pass1234")
    ).toMatch(/User with this email already exist/);
  });
  it("Updating user details on Valid inputs", function() {
    expect(
      martins.updateDetail("NewMartins", "martins@gmail.com", "newPass")
    ).toMatch(/Updated Succesfully/);
  });
});

describe("Find user by their Id", function() {
  it("Input must be a Number", function() {
    expect(martins.findById("user1")).toMatch(/Please input a valid userId/);
  });
  it("Input must not be Empty", function() {
    expect(martins.findById()).toMatch(/Please input a valid userId/);
  });
  it("ID must be a valid registered user ID", function() {
    expect(martins.findById(3333)).toMatch(/Not found/);
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
    expect(martins.findUserByName(2)).toMatch(/Input must be a valid username/);
  });
  it("Input must not be Empty", function() {
    expect(martins.findUserByName()).toMatch(/Input must be a valid username/);
  });
  it("Name must be a valid registered User Name", function() {
    expect(martins.findUserByName("Lekan")).toMatch(/Not found/);
  });
  it("Return a valid user if input is a valid User Name", function() {
    expect(victor.findUserByName("NewMartins")).toEqual({
      id: 1,
      name: "NewMartins",
      email: "martins@gmail.com",
      isAdmin: false,
      password: "newPass"
    });
  });
});

describe("Creating Orders", function() {
  it("Product must be a String", function() {
    expect(victor.createOrder(2)).toMatch(/Invalid Product Name/);
  });
  it("Input must not be Empty", function() {
    expect(victor.createOrder()).toMatch(/Invalid Product Name/);
  });
  it("Return a valid Order object", function() {
    
    expect(victor.createOrder("iPhone X")).toBeDefined();
  });
});
