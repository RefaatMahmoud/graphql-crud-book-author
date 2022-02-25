const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = require("graphql");
const Author = require("../app/models/Author");
const Book = require("../app/models/Book");
const { books, authors } = require("../data");

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        //return authors.find((author) => author.id == parent.authorId);
        return Author.findById(parent.authorId);
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    age: {
      type: GraphQLInt,
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        //return books.filter((book) => book.authorId == parent.id);
        return Book.find({ authorId: parent.id });
      },
    },
  }),
});

//prepare Root query
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return Book.find();
      },
    },
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //return books.find((book) => book.id == args.id);
        return Book.findById(args.id);
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return Author.find();
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //return authors.find((author) => author.id == args.id);
        return Author.findById(args.id);
      },
    },
  },
});

//Mutation
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age,
        });
        return author.save();
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        if (args.name == "") throw new Error("name field is required !");
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
        });
        return book.save();
      },
    },
    updateBook: {
      type: BookType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        if (args.id == "") throw new Error("id field is required !");
        let bookUpdatetd = Book.updateOne(
          { _id: args.id },
          {
            name: args.name,
            genre: args.genre,
            authorId: args.authorId,
          },
          (err, data) => {
            if (err) return err;
            return data;
          }
        );
        if (bookUpdatetd) return Book.findById(args.id);
      },
    },
    deleteBook: {
      type: BookType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        if (args.id == "") throw new Error("id field is required !");
        return Book.deleteOne({ _id: args.id });
      },
    },
  },
});

//export root schema
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
