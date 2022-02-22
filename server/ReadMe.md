### install steps
#### npm i express --save
#### npm install graphql express-graphql --save
#### npm install nodemon --save
#### npm install mongoose --save


### Kill server note 
#### lsof -i:8080
#### kill pid

### write mutation ..
```javascript
mutation {
  addAuthor(name:"Refaat",age:26){
    name
  }
}
```
