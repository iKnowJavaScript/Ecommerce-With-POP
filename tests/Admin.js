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
    expect(admin2.findById(15)).toBeDefined();
  });
});

describe("Find Admin/User by their Name", function() {
  let admin1;
  let admin2;
  let user;
  beforeEach(function() {
    admin1 = new Admin("Martins", "martins@gmail.com", "pass1234");
    admin1.save();
    admin2 = new Admin("Victor", "victor@gmail.com", "pa234");
    admin2.save();
    user = new User("New User", "new@gmail.com", "pa234");
    user.save();
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
    expect(admin1.findUserByName("New User")).toEqual({
      id: 17,
      name: "New User",
      email: "new@gmail.com",
      isAdmin: false,
      password: "pa234"
    });
  });
});

describe("Creating Orders", function() {
  let admin;
  beforeEach(function() {
    admin = new Admin("Martins", "martins@gmail.com", "pass1234");
    admin.save();
  });
  it("Input must be a String", function() {
    expect(admin.createOrder(2)).toMatch(/Invalid Input/);
  });
  it("Input must not be Empty", function() {
    expect(admin.createOrder()).toMatch(/Invalid Input/);
  });
  it("Return a valid Order object", function() {
    expect(admin.createOrder("iPhone X")).toBeDefined();
  });
});

describe("Reading all Users", function() {
  let admin;
  let user1;
  let user2;
  beforeEach(function() {
    admin = new Admin("Martins", "admin@gmail.com", "pass1234");
    // user1 = new User("Martins", "martins@gmail.com", "pass1234");
    // user1.save();
    // user2 = new User("Victor", "victor@gmail.com", "pa234");
    // user2.save();
  });
  it("Get all Users from Database", function() {
    expect(admin.readAllUser()).toBeDefined();
  });
  it("To contain just two added user", function() {
    let userDB = admin.readAllUser();
    expect(userDB).toHaveLength(1);
  });
});

describe("Deleting a single User", function() {
  it("Checking Input", function() {
    let admin;
    let user;
    admin = new Admin("Martins", "admin@gmail.com", "pass1234");
    user = new User("Martins", "martins@gmail.com", "pass1234");
    user.save();
    expect(admin.deleteUser()).toMatch(/Input must be a valid email address/);
  });
  it("When user was not found in the database", function() {
    let admin;
    let user;
    admin = new Admin("Martins", "admin@gmail.com", "pass1234");
    user = new User("Martins", "martins@gmail.com", "pass1234");
    user.save();
    expect(admin.deleteUser("lilMail.com")).toMatch(
      /No such username in the database/
    );
  });
  it("Success on operation successfull", function() {
    let admin;
    let user;
    admin = new Admin("Martins", "admin@gmail.com", "pass1234");
    user = new User("Martins", "newmail.com", "pass1234");
    user.save();
    expect(admin.deleteUser("newmail.com")).toMatch(/User has been deleted/);
  });
});

describe("Deleting all User", function() {
  it("Checking Input", function() {
    let admin;
    let user;
    admin = new Admin("Martins", "admin@gmail.com", "pass1234");
    user = new User("Martins", "martins@gmail.com", "pass1234");
    user.save();
    expect(admin.deleteAllUser()).toEqual([]);
  });
});
