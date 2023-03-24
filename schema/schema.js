const graphql = require("graphql")
// const _ = require("lodash")
const Book = require("../models/book")
const Author = require("../models/author")

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList} = graphql

// dummy data
let books = [
    {name: "Dust in the wind", genre:"Fantasy", id: 1, authorId: 1},
    {name: "The Final Empire", genre: "Fantasy", id: 2, authorId: 2},
    {name: "The Long Earth", genre: "Sci-Fi", id: 3, authorId: 3},
    {name: "The Hero of Ages", genre: "Sci-Fi", id: 4, authorId: 2},
    {name: "The Colour of Magic", genre: "Sci-Fi", id: 5, authorId: 3},
    {name: "The Light Fantastic", genre: "Sci-Fi", id: 6, authorId: 3},
]

let authors = [
    {name: "Patrick Rothfuss", age: 44, id:'1'},
    {name: "Brandon Sanderson", age: 42, id:'2'},
    {name: "Terry Pratchett", age: 66, id:'3'}
]

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args){
                
                Author.findById(parent, (err, data) => {
                    return data
                }) 
                
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args){
                let result = []
                books.forEach((row) => {
                    row.authorId == parent.id ? result.push(row) :  result
                })
                return result
            }
        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                // code to get data  from db or other souces
                let result = []
                books.forEach((row) => {
                    row.id == args.id ? result.push(row) :  result
                })
                return result[0]
                // return _.find(books, {id: args.id})
            }
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                let result = []
                authors.forEach((row) => {
                    row.id == args.id ? result.push(row) :  result
                })
                return result[0]
            }
        },

        books:{
            type: new GraphQLList(BookType),
            resolve(parent, args){
                return books
            }
        }
        ,

        authors:{
            type: new GraphQLList(AuthorType),
            resolve(parent, args){
                return authors
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})