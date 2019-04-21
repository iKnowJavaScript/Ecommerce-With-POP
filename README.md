# Ecommerce-With-POP

Using Prototype Oriented Programming in Javascript to create a simple e-commerce platform with user, admin and order object

> User Object should be able to perforrm all the operations and should be available to their Instances through Prototype Inheritance.

- Create a new user
- Read a single user by his ID
- Update the details of a user
- Search for a user by his name and return false if the user is not found but returns the user object if the user is found.
- Create a new order

> Admin Object should be able to perform all the Operations a User can Perform Including these -

- Delete a user
- Delete all users
- Read all users
- Read all the orders
- Read one order by its ID
- Update order details
- Delete one order
- Delete all orders

> And Order object that contains the following properties
- user_id
- timeOfOrder
- dateOfOrder
- Id (Auto increment)
- Products in the order

** **

## Data Storage
A json file was used to store and manipulate data in order to properly visualise the flow of data, this was implemented using Node fs Module.

** **

## Testing
Jest was used to test every functionality of this Project.   
** **
Feel free to clone and `npm init` to get the feel of the app and `npm test` before adding more functionality if you wish.
** **
## Acknowledgments
** **
* This was a tutorial to further deepens my Knowledge in Object Prototypal Inheritance in JavaScript so feel free to add to it.  
