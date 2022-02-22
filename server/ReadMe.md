### run server
#### $ npm start

### Kill server note 
#### $ lsof -i:8080
#### $ kill pid

## Graphql Notes
### query to find single book
```javascript
{
  book(id:"62156631440b49d3adf63e64"){
    id
    name,
    author{
      id,
      name
    }
  }
}
```

### query to get all books with author relation
```javascript
{
  books {
    id
    name,
    author{
      id,
      name
    }
  }
}
```

### mutation to add author ..
```javascript
mutation {
  addAuthor(name:"Refaat",age:26){
    name
  }
}
```
