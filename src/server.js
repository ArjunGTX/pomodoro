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

      // habit routes (private)
      this.get("habits", getHabitsHandler.bind(this));
      this.get("habits/:habitId", getHabitHandler.bind(this));
      this.post("habits", createHabitHandler.bind(this));
      this.post("habits/:habitId", editHabitHandler.bind(this));
      this.delete("habits/:habitId", deleteHabitHandler.bind(this));
    },
  });
  return server;
}
