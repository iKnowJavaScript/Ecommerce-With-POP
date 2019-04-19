const { Admin } = require("../main/Admin");

jest.mock("../fs");

describe("Testing Admin Instances and saving it to Database", function() {
  it("Creating new Admin instance", function() {
    let admin = new Admin("Martins", "test@gmail.com", "pass1234");

    expect(admin).toBeDefined();
  });
  it("Checking if isAdmin is true", function() {
    let admin = new Admin("Martins", "test@gmail.com", "pass1234");

    expect(admin.isAdmin).toBeTruthy();
  });
  it("Saving instances to Database", function() {
    let admin = new Admin("Martins", "test@gmail.com", "pass1234");

    expect(admin.save()).toMatchObject(admin);
  });

  it("New Admin instances with JS 'instanceOf' ", function() {
    let admin = new Admin("Martins", "test@gmail.com", "pass1234");

    expect(admin instanceof Admin).toBeTruthy();
  });
});

describe("Updating Admin details", function() {
  let admin;
  beforeEach(function() {
    admin = new Admin("Martins", "martins@gmail.com", "pass1234");
    admin.save();
  });
  it("Validating Admin input before updating the Databae", function() {
    expect(admin.updateDetail(4444, "martins@gmail.com", "newPass")).toMatch(
      /Input a valid details/
    );
  });
  it("Updating Admin details on Valid inputs", function() {
    expect(admin.updateDetail("New", "martins@gmail.com", "newPass")).toMatch(
      /Updated Succesfully/
    );
  });
});

describe("Find Admin/User by their Id", function() {
  let admin1;
  let admin2;
  beforeEach(function() {
    admin1 = new Admin("Martins", "martins@gmail.com", "pass1234");
    admin1.save();
    admin2 = new Admin("Victor", "victor@gmail.com", "pa234");
    admin2.save();
  });
  it("Input must be a Number", function() {
    expect(admin1.findById("admin1")).toMatch(/Please input a valid userId/);
  });
  it("Input must not be Empty", function() {
    expect(admin2.findById()).toMatch(/Please input a valid userId/);
  });
  it("Id must be a valid registered user ID", function() {
    expect(admin2.findById(33)).toMatch(/Not found/);
  });
  it("Return a valid user if input is a valid User ID", function() {
    expect(admin2.findById(1)).toBeDefined();
  });
});

describe("Find Admin/User by their Name", function() {
  let admin1;
  let admin2;
  beforeEach(function() {
    admin1 = new Admin("Martins", "martins@gmail.com", "pass1234");
    admin1.save();
    admin2 = new Admin("Victor", "victor@gmail.com", "pa234");
    admin2.save();
  });
  it("Input must be a String", function() {
    expect(admin1.findUserByName(2)).toMatch(/Input must be a valid username/);
  });
  it("Input must not be Empty", function() {
    expect(admin2.findUserByName()).toMatch(/Input must be a valid username/);
  });
  it("Name must be a valid registered User Name", function() {
    expect(admin2.findUserByName("Lekan")).toMatch(/Not found/);
  });
  it("Return a valid user if input is a valid User Name", function() {
    expect(admin2.findUserByName("Martins")).toBeDefined();
  });
});
