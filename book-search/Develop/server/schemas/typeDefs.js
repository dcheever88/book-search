// import gql tagged template function
const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type Query {
        me: User
        users: [User]
        user(username: String!): User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: STring!): Auth
        saveBook(bookData: BookInput!): User
        removeBook(bookId: ID!): User
    }

    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedbooks: [Book]
    }

    type Book {
        bookId: ID
        title: String
        authors: [String]
        description: String
        image: String
        link: string
    }

    type Auth {
        token: ID!
        user: User
    }

    type BookInput {
        bookId: ID
        authors: [String]
        description: String
        title: String
        image: String
        link: String
    }

`;

// export typeDefs
module.exports = typeDefs;