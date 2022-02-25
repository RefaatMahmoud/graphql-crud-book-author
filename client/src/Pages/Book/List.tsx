import { gql, useQuery } from "@apollo/client";
import { Key } from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "reactstrap";

function ListBook() {
  const PRODUCT_QUERY = gql`
    {
      books {
        id
        name
        genre
        author {
          id
          name
        }
      }
    }
  `;

  const { data } = useQuery(PRODUCT_QUERY);

  type bookType = {
    id: Key;
    name: String;
    genre: String;
    author: {
      name: String;
    };
  };

  return (
    <div className="container mt-5">
      <Link to={"/book/create"} className="btn btn-primary pull-right">
        Create book
      </Link>
      {!data && <div>Loading ..</div>}
      {data && (
        <Table striped>
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Author</th>
            </tr>
          </thead>
          <tbody>
            {data.books.map((book: bookType) => (
              <tr key={book.id}>
                <td>{book.name}</td>
                <td>{book.genre}</td>
                <td>{book?.author.name}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default ListBook;
