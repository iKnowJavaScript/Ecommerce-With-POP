const {Admin} = require("../main/Admin")

jest.mock("../fs"); 

describe("Testing Admin Instances and saving it to Database", function() {
  it("Creating new Admin instance", function() {
    let admin = new Admin("Martins", "test@gmail.com", "pass1234");

    expect(admin).toBeDefined();
  });
  it("Checking if isAdmin is true", function() {
    let admin = new Admin("Martins", "test@gmail.com", "pass1234");

    expect(admin.isAdmin).toBeTruthy()
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
