const { User } = require("../main/User");

jest.mock("../fs");

describe("Testing User Instances and saving it to Database", function() {
  it("creating new User instance", function() {
    let martins = new User("Martins", "test@gmail.com", "pass1234");

    expect(martins).toBeDefined();
  });
  it("Saving instances to Database", function() {
    let martins = new User("Martins", "test@gmail.com", "pass1234");

    expect(martins.save()).toMatchObject(martins);
  });

  it("New User instances with JS 'instanceOf' ", function() {
    let martins = new User("Martins", "test@gmail.com", "pass1234");

    expect(martins instanceof User).toBeTruthy();
  });
});

describe("Updating user details", function() {
  let martins, victor;
  beforeEach(function() {
    martins = new User("Martins", "martins@gmail.com", "pass1234");
    victor = new User("Victor", "victor@gmail.com", "pass1234");
    martins.save();
    victor.save();
  });
  it("Validating user input before updating the Databae", function() {
    expect(martins.updateDetail(4444, "martins@gmail.com", "newPass")).toMatch(
      /Input a valid details/
    );
  });
  it("Checking Email before accepting changes", function() {
    expect(
      victor.updateDetail("NewVictor", "martins@gmail.com", "pass1234")
    ).toMatch(/User with this email already exist/);
  });
  it("Updating user details on Valid inputs", function() {
    expect(martins.updateDetail("New", "martins@gmail.com", "newPass")).toMatch(
      /Updated Succesfully/
    );
  });
});

