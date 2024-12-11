"use client";

import CreateModel from "@/components/modal/create.modal";
import { useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";

interface IProps {
  blogs: IBlogs[];
}
export default function TableContent(props: IProps) {
  const { blogs } = props;

  const [showModalCreate, setShowModalCreate] = useState<boolean>(false);
  const [showModalUpdate, setShowModalUpdate] = useState<boolean>(false);
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          marginBottom: "30px",
        }}
      >
        <h3>Table blogs</h3>
        <Button
          variant="secondary"
          onClick={() => {
            setShowModalCreate(true);
          }}
        >
          Add New
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {blogs?.map((item: IBlogs) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.title}</td>
                <td>{item.author}</td>
                <td>
                  <Button variant="primary">View</Button>
                  <Button variant="warning" className="mx-3">
                    Edit
                  </Button>
                  <Button variant="danger">Delete</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <CreateModel
        showModalCreate={showModalCreate}
        setShowModalCreate={setShowModalCreate}
      />
    </>
  );
}
