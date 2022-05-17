import { Server, Model, RestSerializer } from "miragejs";

import {
  loginHandler,
  signupHandler,
} from "./backend/controllers/AuthController";
import {
  createHabitHandler,
  deleteHabitHandler,
  editHabitHandler,
  getHabitHandler,
  getHabitsHandler,
} from "./backend/controllers/HabitController";
import { users } from "./backend/db/users";

export function makeServer({ environment = "development" } = {}) {
  let server = new Server({
    serializers: {
      application: RestSerializer,
    },
    environment,
    models: {
      user: Model,
    },

    // Runs on the start of the server
    seeds(server) {
      server.logging = false;
      users.forEach((item) =>
        server.create("user", {
          ...item,
          habits: [],
          archives: [],
          labels: [],
        })
      );
    },

    routes() {
      this.namespace = "api";
      // auth routes (public)
      this.post("/auth/signup", signupHandler.bind(this));
      this.post("/auth/login", loginHandler.bind(this));

      // todo routes (private)
      this.get("todo", getHabitsHandler.bind(this));
      this.get("todo/:todoId", getHabitHandler.bind(this));
      this.post("todo", createHabitHandler.bind(this));
      this.post("todo/:todoId", editHabitHandler.bind(this));
      this.delete("todo/:todoId", deleteHabitHandler.bind(this));
    },
  });
  return server;
}
