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