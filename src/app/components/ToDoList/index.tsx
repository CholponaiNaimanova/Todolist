"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface User {
  _id: number;
  name: string;
  surname: string;
  phoneNumber: string;
}

const API = "https://api-v2.elchocrud.pro/api/v1/5a3aec41217293f9863a8e0569b9fc84/todo1";

const Todo = () => {
  const [nameUser, setNameUser] = useState("");
  const [surname, setSurname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [editId, setEditId] = useState<number | null>(null);

  const [todos, setTodos] = useState<User[]>([]);

  const getTodo = async () => {
    const { data } = await axios.get(API);
    setTodos(data);
  };

  const addHandleTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (nameUser.trim() && surname.trim() && phoneNumber.trim()) {
      const todo = { name: nameUser, surname, phoneNumber };

      if (editId) {
        await axios.patch(`${API}/${editId}`, todo);
        setEditId(null);
      } else {
        await axios.post(API, todo);
      }

      setNameUser("");
      setSurname("");
      setPhoneNumber("");
      getTodo();
    }
  };

  const deleteTodo = async (id: number) => {
    await axios.delete(`${API}/${id}`);
    setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
  };

  const startEditHandler = (user: User) => {
    setEditId(user._id);
    setNameUser(user.name);
    setSurname(user.surname);
    setPhoneNumber(user.phoneNumber);
  };

  useEffect(() => {
    getTodo();
  }, []);

  return (
    <div className="todo mt-[180px] flex">
      <div className="a">
      <form className="" onSubmit={addHandleTodo}>
        <div className="grid gap-6 mb-6 md:grid-cols-2 items-center">
          <div className="flex items-center flex-col gap-[30px]">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
              <input
                value={nameUser}
                onChange={(e) => setNameUser(e.target.value)}
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Surname</label>
              <input
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
              <input
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
              />
            </div>
            <div className="flex justify-center">
              <button type="submit" className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                {editId ? "Save Changes" : "Submit"}
              </button>
            </div>

            
          </div>
        </div>
      </form>
      </div>


  <div className="b sticky top-0 right-0 h-[300px] w-[300px]">
    {todos.map((el) => (
      <div key={el._id} className="todoList">
        <div className="text-white text-[20px] flex flex-col gap-[20px]">
          <div className="">
            <h1>Name:</h1>
            <p>{el.name}</p>
          </div>
          <div className="">
            <h1>Surname:</h1>
            <p>{el.surname}</p>
          </div>
          <div className="">
            <h1>Phone Number:</h1>
            <p>{el.phoneNumber}</p>
          </div>
          <div className="flex mb-[30px]">
            <div>
              <button
                type="button"
                onClick={() => startEditHandler(el)}
                className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
              >
                Edit
              </button>
            </div>
            <div>
              <button
                onClick={() => deleteTodo(el._id)}
                className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>


    </div>
  );
};

export default Todo;