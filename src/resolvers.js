const msg = "Hello, very happy to learn graphql !"
let users = [
  { id: 1, name: 'Jake', email: 'jake@gmail.com', age: 17 },
  { id: 2, name: 'Paul', email: 'paul@gmail.com', age: 21 }
]

const resolvers = {
  Query: {
    hello: (parent /* root */, args, context, info ) => msg,
    age: () => {
      return 25
    },
    users: () => users,
    user: (parent, { id } ) => {
      console.log(parent);
      return users.find(u => u.id = id)
    }
  },
  Mutation: {
    createUser: (parent, { id, name, email, age }) => {
      let checkId = users.findIndex(u => u.id == id)
      if (checkId == -1) {
        let newUser = { id, name, email, age }
        users.push(newUser)
        return newUser
      }
      throw new Error("ID already taken")
    },
    deleteUser: (parent, { id }) => {
      console.log(id);
      let checkId = users.findIndex(u => u.id == id)
      console.log(checkId);
      if (checkId != -1) {
        users.splice(checkId, 1)
        console.log(users);
        return true
      }
      throw new Error("Unknown ID")
    }
  }
}

export default resolvers