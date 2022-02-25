import { gql, useMutation, useQuery } from "@apollo/client";
import React, { ChangeEvent, Key, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Table,
} from "reactstrap";

function CreateBook() {
  const [formIsSubmitted, setFormIsSubmitted] = useState(false);
  const [formState, setFormState] = useState({
    authorId: "",
    name: "",
    genre: "",
  });

  const AUTHOR_QUERY = gql`
    {
      authors {
        id
        name
      }
    }
  `;
  const authors = useQuery(AUTHOR_QUERY)?.data?.authors;

  const CREATE_PRODUCT_MUTATION = gql`
    mutation addBook($name: String!, $genre: String!, $authorId: ID!) {
      addBook(name: $name, genre: $genre, authorId: $authorId) {
        id
        name
      }
    }
  `;

  const [addBook] = useMutation(CREATE_PRODUCT_MUTATION, {
    variables: {
      genre: formState.genre,
      name: formState.name,
      authorId: formState.authorId,
    },
  });

  const submitForm = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setFormIsSubmitted(true);
    addBook();
  };

  const bindingFieldsToFormState = (
    e: React.FormEvent<HTMLInputElement>
  ): void => {
    setFormState({
      ...formState,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  type authorType = {
    id: Key;
    name: String;
  };

  return (
    <div className="container mt-5">
      <Form onSubmit={(e) => submitForm(e)}>
        <FormGroup>
          <Label for="name">name</Label>
          <Input
            id="name"
            name="name"
            placeholder="book name"
            type="text"
            onChange={(e) => bindingFieldsToFormState(e)}
            invalid={formIsSubmitted && formState.name == ""}
          />
          <FormFeedback>
            {formIsSubmitted &&
              formState.name == "" &&
              "name field is required"}
          </FormFeedback>
        </FormGroup>
        <FormGroup>
          <Label for="genre">Genre</Label>
          <Input
            id="genre"
            name="genre"
            placeholder="book genre"
            type="text"
            onChange={(e) => bindingFieldsToFormState(e)}
            invalid={formIsSubmitted && formState.genre == ""}
          />
          <FormFeedback>
            {formIsSubmitted &&
              formState.genre == "" &&
              "genre field is required"}
          </FormFeedback>
        </FormGroup>

        <FormGroup>
          <Label for="authors">Authors</Label>
          <Input
            id="authors"
            name="authorId"
            type="select"
            onChange={(e) => bindingFieldsToFormState(e)}
            placeholder="choose"
            defaultValue=""
            invalid={formIsSubmitted && formState.authorId == ""}
          >
            <option value="" disabled>
              Select your option
            </option>
            {authors &&
              authors.map((author: authorType) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
          </Input>
          <FormFeedback>
            {formIsSubmitted &&
              formState.authorId == "" &&
              "author field is required"}
          </FormFeedback>
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    </div>
  );
}

export default CreateBook;
