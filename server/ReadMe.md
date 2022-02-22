\*\* install
[1] npm i express --save
[2] npm install graphql express-graphql --save
[2] npm install nodemon --save

HINTS

- lsof -i:8080
- kill pid

//write mutation ..
mutation {
  addAuthor(name:"Refaat",age:26){
    name
  }
}
