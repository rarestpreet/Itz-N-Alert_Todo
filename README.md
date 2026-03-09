# Itz-N-Alert_Todo (Spring Boot)

A simple **Todo List** web application built using **Spring Boot** that allows users to manage their daily tasks. The application provides a clean interface where users can **create, view, update, and delete** tasks.

Built a full-stack application using Spring Boot with a simple frontend (**HTML, CSS, JavaScript**) and an **H2 in-memory database**.

---

## Features

- Add new tasks
- View all tasks
- Update task status
- Delete tasks
- Store tasks using database
- Simple frontend interface

---

## Tech Stack

- **Backend Framework:** Spring Boot, JPA
- **Language:** Java
- **Database:** H2
- **Build Tool:** Gradle
- **API Style:** RESTful APIs

---

## Project Structure

```text
src
└── main
    ├── java/com/arpit/todo_list
    │   ├── config
    │   ├── controller
    │   ├── model
    │   ├── repository
    │   ├── service
    │   └── TodoListApplication.java
    │
    └── resources
        ├── static
        │   ├── index.html
        │   ├── option.js
        │   ├── script.js
        │   └── style.css
        │
        ├── application.properties
        └── import.sql
```

---

## Database Access (H2 Console)

You can access the H2 database console at:

- `http://localhost:8080/h2-console`

Use:
- **JDBC URL:** `jdbc:h2:mem:todo`
- **Username:** `sa`
- **Password:** *(leave empty)*

---

## Getting Started

### 1️. Clone the repository

```bash
git clone https://github.com/rarestpreet/todoList.git
```

### 2️. Open the project

Open the project in **IntelliJ IDEA** or **Spring Tool Suite**.

### 3️. Run the application

Run the main class:

- `TodoListApplication.java`

The application will start at:

- `http://localhost:8080`

---

## Application Interface

The frontend interface allows users to:
- Add tasks
- Mark tasks as completed
- Remove tasks

The UI is built using simple HTML, CSS, and JavaScript served directly by Spring Boot.

---

## Learning Objectives

This project demonstrates:

- Spring Boot application structure
- REST API development
- CRUD operations using Spring Data JPA
- Integration of frontend with backend
- Working with an H2 in-memory database

---

## Future Improvements

- Task deadlines and reminders
- Priority levels for tasks
- Persistent database (MySQL/PostgreSQL)
- REST API documentation using Swagger / OpenAPI

---

## Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch
3. Commit your changes
4. Open a pull request
