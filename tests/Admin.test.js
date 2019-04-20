const { Admin } = require("../main/Admin");
const { User } = require("../main/User");

jest.mock("../fs");

let martins = new User("Martins", "martins@gmail.com", "pass1234");
let victor = new User("Victor", "victor@gmail.com", "pass1234");
let admin = new Admin("Admin", "admin@gmail.com", "admin01");
martins.save();
victor.save();

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

// describe("Reading all Users", function() {
//   let admin;
//   let user1;
//   let user2;
//   beforeEach(function() {
//     admin = new Admin("Martins", "admin@gmail.com", "pass1234");
//     // user1 = new User("Martins", "martins@gmail.com", "pass1234");
//     // user1.save();
//     // user2 = new User("Victor", "victor@gmail.com", "pa234");
//     // user2.save();
//   });
//   it("Get all Users from Database", function() {
//     expect(admin.readAllUser()).toBeDefined();
//   });
//   it("To contain just two added user", function() {
//     let userDB = admin.readAllUser();
//     expect(userDB).toHaveLength(1);
//   });
// });

// describe("Deleting a single User", function() {
//   it("Checking Input", function() {
//     let admin;
//     let user;
//     admin = new Admin("Martins", "admin@gmail.com", "pass1234");
//     user = new User("Martins", "martins@gmail.com", "pass1234");
//     user.save();
//     expect(admin.deleteUser()).toMatch(/Input must be a valid email address/);
//   });
//   it("When user was not found in the database", function() {
//     let admin;
//     let user;
//     admin = new Admin("Martins", "admin@gmail.com", "pass1234");
//     user = new User("Martins", "martins@gmail.com", "pass1234");
//     user.save();
//     expect(admin.deleteUser("lilMail.com")).toMatch(
//       /No such username in the database/
//     );
//   });
//   it("Success on operation successfull", function() {
//     let admin;
//     let user;
//     admin = new Admin("Martins", "admin@gmail.com", "pass1234");
//     user = new User("Martins", "newmail.com", "pass1234");
//     user.save();
//     expect(admin.deleteUser("newmail.com")).toMatch(/User has been deleted/);
//   });
// });

// describe("Deleting all User", function() {
//   it("Checking Input", function() {
//     let admin;
//     let user;
//     admin = new Admin("Martins", "admin@gmail.com", "pass1234");
//     user = new User("Martins", "martins@gmail.com", "pass1234");
//     user.save();
//     expect(admin.deleteAllUser()).toEqual([]);
//   });
// });
