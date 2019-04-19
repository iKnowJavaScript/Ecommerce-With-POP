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

