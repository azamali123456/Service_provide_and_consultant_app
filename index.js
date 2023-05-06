import express from "express";
import bodyparser from "body-parser";
import cors from "cors";
import useRouter from "./routes/user.js";
import channalRouter from "./routes/channal.js";
import jobRouter from "./routes/job.js";
import questionRouter from "./routes/question.js";
import serviceRouter from "./routes/service.js";
import answerRouter from "./routes/answer.js";
import courseRouter from "./routes/course.js";
import productRouter from "./routes/product.js";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { EventEmitter } from "events";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerUI from "swagger-ui-express";

const eventEmitter = new EventEmitter();
const PORT = process.env.PORT || 3000;
const app = express();
app.use("./images", express.static("./images"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
const connection = mongoose.connection;
connection.once("connected", () => {
  console.log("Databae is connected");
});
connection.on("error", (error) => {
  console.log("Database error", error);
});
const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";
mongoose.connect(
  "mongodb+srv://aazam7246:dTGqRKMRhGSo0WH9@cluster0.7lsx0xx.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// For Login and Signup ( He may be job creater --- OR --- crate a channal and complete jobs  )
app.use("/auth", useRouter);
// User Create  Services
app.use("/services", serviceRouter);
// User Create Professional Channel for Job
app.use("/user/channal", channalRouter);
// User Create Professional Channel for Job
app.use("/user/job", jobRouter);
// User Create Question
app.use("/user/question", questionRouter);
// User Create Answer
app.use("/user/answer", answerRouter);
// Admin Create Course
app.use("/admin/course", courseRouter);
// Admin Create Product
app.use("/admin/product", productRouter);
// Backend Website Port
app.listen(3000, () => {
  console.log("Server is connected");
  // eventEmitter.on("start", (PORT) => {
  //   console.log(`app is started ${PORT}`);
  // });
  console.log(`app is started ${PORT}`);
  return "Hello World!";
});

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "1.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
    },
    servers: [
      {
        url: "https://service-provide-and-consultant-app.vercel.app/",
      },
    ],
    paths: {
      //Technologies
      "/services": {
        post: {
          tags: ["Services"],
          summary: "Add",
          operationId: "Add",
          parameters: [],
          requestBody: {
            content: {
              "application/x-www-form-urlencoded": {
                encoding: {},
                schema: {
                  required: ["name", "imageUrl", "service_id", "color"],
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                      example: "pagetwo",
                    },
                    imageUrl: {
                      type: "file",
                    },
                    service_id: {
                      type: "string",
                      example: "asdf",
                    },
                    color: {
                      type: "string",
                      example: "two",
                    },
                  },
                },
              },
            },
            required: false,
          },
          responses: {
            200: {
              description: "",
              headers: {},
            },
          },
          deprecated: false,
          servers: [
            {
              url: "https://mercurysole.herokuapp.com/",
              variables: {},
            },
          ],
        },
        get: {
          tags: ["Technology"],
          summary: "technologies",
          operationId: "GetAllTechnologies",
          parameters: [],
          responses: {
            200: {
              description: "",
              headers: {},
            },
          },
          deprecated: false,
          servers: [
            {
              url: "https://mercurysole.herokuapp.com/",
              variables: {},
            },
          ],
        },
      },

      "/services/{id}": {
        patch: {
          tags: ["Services"],
          summary: "Update",
          operationId: "Update",
          parameters: [
            {
              name: "id",
              in: "path",
              description: "",
              required: true,
              style: "simple",
              schema: {
                type: "string",
                example: "6343d2efb1d95db29eef3daa",
              },
            },
          ],
          requestBody: {
            content: {
              "application/x-www-form-urlencoded": {
                encoding: {},
                schema: {
                  required: ["name", "imageUrl", "color", "service_id"],
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                      example: "asdf",
                    },
                    imageUrl: {
                      type: "file",
                    },
                    color: {
                      type: "string",
                      example: "asdf",
                    },
                    service_id: {
                      type: "string",
                      example: "test",
                    },
                  },
                },
              },
            },
            required: false,
          },
          responses: {
            200: {
              description: "",
              headers: {},
            },
          },
          deprecated: false,
          servers: [
            {
              url: "https://mercurysole.herokuapp.com/technologies",
              variables: {},
            },
          ],
        },
        get: {
          tags: ["Technology"],
          summary: "Get By ID",
          operationId: "GetByID",
          parameters: [
            {
              name: "id",
              in: "path",
              description: "",
              required: true,
              style: "simple",
              schema: {
                type: "string",
                example: "6340137d9996cd973403c170",
              },
            },
          ],
          responses: {
            200: {
              description: "",
              headers: {},
            },
          },
          deprecated: false,
          servers: [
            {
              url: "https://mercurysole.herokuapp.com/",
              variables: {},
            },
          ],
        },
        delete: {
          tags: ["Technology"],
          summary: "Delete",
          operationId: "Delete",
          parameters: [
            {
              name: "id",
              in: "path",
              description: "",
              required: true,
              style: "simple",
              schema: {
                type: "string",
                example: "6343d2efb1d95db29eef3daa",
              },
            },
          ],
          responses: {
            200: {
              description: "",
              headers: {},
            },
          },
          deprecated: false,
          // servers: [
          //   {
          //     url: "https://technologies",
          //     variables: {},
          //   },
          // ],
        },
      },
      //Pages
      "/auth/login": {
        post: {
          tags: ["Auth"],
          summary: "Login User",
          operationId: "Login",
          parameters: [],
          requestBody: {
            content: {
              "application/x-www-form-urlencoded": {
                encoding: {},
                schema: {
                  required: ["email", "password"],
                  type: "object",
                  properties: {
                    email: {
                      type: "string",
                    },
                    password: {
                      type: "string",
                    },
                  },
                },
              },
            },
            required: false,
          },
          responses: {
            200: {
              description: "",
              headers: {},
            },
          },
          deprecated: false,
          servers: [
            {
              url: "http://localhost:3000",
              variables: {},
            },
          ],
        },
      },
      "/": {
        post: {
          tags: ["Pages"],
          summary: "Add",
          operationId: "Add",
          parameters: [],
          requestBody: {
            content: {
              "application/x-www-form-urlencoded": {
                encoding: {},
                schema: {
                  required: ["pageName"],
                  type: "object",
                  properties: {
                    pageName: {
                      type: "string",
                      example: "pagetwo",
                    },
                  },
                },
              },
            },
            required: false,
          },
          responses: {
            200: {
              description: "",
              headers: {},
            },
          },
          deprecated: false,
          servers: [
            {
              url: "https://mercurysole.herokuapp.com/page",
              variables: {},
            },
          ],
        },
        // Services
      },
      "/question": {
        post: {
          tags: ["Question"],
          summary: "Add",
          operationId: "Add",
          parameters: [],
          requestBody: {
            content: {
              "application/x-www-form-urlencoded": {
                encoding: {},
                schema: {
                  required: ["name", "imageUrl", "discription", "color"],
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                      example: "pagetwo",
                    },
                    imageUrl: {
                      type: "file",
                    },
                    discription: {
                      type: "string",
                      example: "asdf",
                    },
                    color: {
                      type: "string",
                      example: "two",
                    },
                  },
                },
              },
            },
            required: false,
          },
          responses: {
            200: {
              description: "",
              headers: {},
            },
          },
          deprecated: false,
          servers: [
            {
              url: "https://mercurysole.herokuapp.com/",
              variables: {},
            },
          ],
        },
        get: {
          tags: ["Services"],
          summary: "Get All",
          operationId: "GetAllTechnologies",
          parameters: [],
          responses: {
            200: {
              description: "",
              headers: {},
            },
          },
          deprecated: false,
          servers: [
            {
              url: "https://mercurysole.herokuapp.com/",
              variables: {},
            },
          ],
        },
      },
      "/services/technologies": {
        get: {
          tags: ["Services"],
          summary: "Get All",
          operationId: "GetAllTechnologies",
          parameters: [],
          responses: {
            200: {
              description: "",
              headers: {},
            },
          },
          deprecated: false,
          servers: [
            {
              url: "https://mercurysole.herokuapp.com/",
              variables: {},
            },
          ],
        },
      },

      "/services/{id}": {
        patch: {
          tags: ["Services"],
          summary: "Update",
          operationId: "Update",
          parameters: [
            {
              name: "id",
              in: "path",
              description: "",
              required: true,
              style: "simple",
              schema: {
                type: "string",
                example: "6343d2efb1d95db29eef3daa",
              },
            },
          ],
          requestBody: {
            content: {
              "application/x-www-form-urlencoded": {
                encoding: {},
                schema: {
                  required: ["name", "imageUrl", "color", "description"],
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                      example: "asdf",
                    },
                    imageUrl: {
                      type: "file",
                    },
                    color: {
                      type: "string",
                      example: "asdf",
                    },
                    discription: {
                      type: "string",
                      example: "test",
                    },
                  },
                },
              },
            },
            required: false,
          },
          responses: {
            200: {
              description: "",
              headers: {},
            },
          },
          deprecated: false,
          servers: [
            {
              url: "https://mercurysole.herokuapp.com/services",
              variables: {},
            },
          ],
        },
        get: {
          tags: ["Services"],
          summary: "Get By ID",
          operationId: "GetByID",
          parameters: [
            {
              name: "id",
              in: "path",
              description: "",
              required: true,
              style: "simple",
              schema: {
                type: "string",
                example: "6340137d9996cd973403c170",
              },
            },
          ],
          responses: {
            200: {
              description: "",
              headers: {},
            },
          },
          deprecated: false,
          servers: [
            {
              url: "https://mercurysole.herokuapp.com/",
              variables: {},
            },
          ],
        },
        delete: {
          tags: ["Services"],
          summary: "Delete",
          operationId: "Delete",
          parameters: [
            {
              name: "id",
              in: "path",
              description: "",
              required: true,
              style: "simple",
              schema: {
                type: "string",
                example: "6343d2efb1d95db29eef3daa",
              },
            },
          ],
          responses: {
            200: {
              description: "",
              headers: {},
            },
          },
          deprecated: false,
          // servers: [
          //   {
          //     url: "https://technologies",
          //     variables: {},
          //   },
          // ],
        },
      },
      //Job card
      "/jobcard": {
        post: {
          tags: ["jobcard"],
          summary: "Add",
          operationId: "Add",
          parameters: [],
          requestBody: {
            content: {
              "application/x-www-form-urlencoded": {
                encoding: {},
                schema: {
                  required: [
                    "name",
                    "skills",
                    "description",
                    "experience",
                    "location",
                    "color",
                  ],
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                      example: "Azam Ali",
                    },
                    skills: {
                      type: "string",
                      example: "asdf",
                    },
                    description: {
                      type: "string",
                      example: "asdf",
                    },
                    color: {
                      type: "string",
                      example: "red",
                    },
                    experience: {
                      type: "string",
                      example: "3 Year",
                    },
                    location: {
                      type: "string",
                      example: "RYK",
                    },
                  },
                },
              },
            },
            required: false,
          },
          responses: {
            200: {
              description: "",
              headers: {},
            },
          },
          deprecated: false,
          servers: [
            {
              url: "https://mercurysole.herokuapp.com/",
              variables: {},
            },
          ],
        },
        get: {
          tags: ["jobcard"],
          summary: "Get All",
          operationId: "GetAlljobcard",
          parameters: [],
          responses: {
            200: {
              description: "",
              headers: {},
            },
          },
          deprecated: false,
          servers: [
            {
              url: "https://mercurysole.herokuapp.com/",
              variables: {},
            },
          ],
        },
      },
      "/jobcard/{id}": {
        patch: {
          tags: ["jobcard"],
          summary: "Update",
          operationId: "Update",
          parameters: [
            {
              name: "id",
              in: "path",
              description: "",
              required: true,
              style: "simple",
              schema: {
                type: "string",
                example: "6343d2efb1d95db29eef3daa",
              },
            },
          ],
          requestBody: {
            content: {
              "application/x-www-form-urlencoded": {
                encoding: {},
                schema: {
                  required: [
                    "name",
                    "skills",
                    "description",
                    "experience",
                    "location",
                    "color",
                  ],
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                      example: "Azam Ali",
                    },
                    skills: {
                      type: "string",
                      example: "asdf",
                    },
                    description: {
                      type: "string",
                      example: "asdf",
                    },
                    color: {
                      type: "string",
                      example: "red",
                    },
                    experience: {
                      type: "string",
                      example: "3 Year",
                    },
                    location: {
                      type: "string",
                      example: "RYK",
                    },
                  },
                },
              },
            },
            required: false,
          },
          responses: {
            200: {
              description: "",
              headers: {},
            },
          },
          deprecated: false,
          servers: [
            {
              url: "https://mercurysole.herokuapp.com/",
              variables: {},
            },
          ],
        },
        get: {
          tags: ["jobcard"],
          summary: "Get By ID",
          operationId: "GetByID",
          parameters: [
            {
              name: "id",
              in: "path",
              description: "",
              required: true,
              style: "simple",
              schema: {
                type: "string",
                example: "6340137d9996cd973403c170",
              },
            },
          ],
          responses: {
            200: {
              description: "",
              headers: {},
            },
          },
          deprecated: false,
          servers: [
            {
              url: "https://mercurysole.herokuapp.com/",
              variables: {},
            },
          ],
        },
        delete: {
          tags: ["jobcard"],
          summary: "Delete",
          operationId: "Delete",
          parameters: [
            {
              name: "id",
              in: "path",
              description: "",
              required: true,
              style: "simple",
              schema: {
                type: "string",
                example: "6343d2efb1d95db29eef3daa",
              },
            },
          ],
          responses: {
            200: {
              description: "",
              headers: {},
            },
          },
          deprecated: false,
          servers: [
            {
              url: "https://mercurysole.herokuapp.com/",
              variables: {},
            },
          ],
        },
      },

      //Projects
      "/projects": {
        post: {
          tags: ["Projects"],
          summary: "Add",
          operationId: "Add",
          parameters: [],
          requestBody: {
            content: {
              "application/x-www-form-urlencoded": {
                encoding: {},
                schema: {
                  required: [
                    "name",
                    "catagories_id",
                    "imageUrl",
                    "discription",
                    "color",
                  ],
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                      example: "Azam Ali",
                    },
                    catagories_id: {
                      type: "string",
                      example: "asdf",
                    },
                    description: {
                      type: "string",
                      example: "asdf",
                    },
                    color: {
                      type: "string",
                      example: "red",
                    },

                    imageUrl: {
                      type: "string",
                      example: "RYK",
                    },
                  },
                },
              },
            },
            required: false,
          },
          responses: {
            200: {
              description: "",
              headers: {},
            },
          },
          deprecated: false,
          servers: [
            {
              url: "https://mercurysole.herokuapp.com/",
              variables: {},
            },
          ],
        },
        get: {
          tags: ["Projects"],
          summary: "Get All",
          operationId: "GetAllprojects",
          parameters: [],
          responses: {
            200: {
              description: "",
              headers: {},
            },
          },
          deprecated: false,
          servers: [
            {
              url: "https://mercurysole.herokuapp.com/",
              variables: {},
            },
          ],
        },
      },
      "/projects/{id}": {
        patch: {
          tags: ["Projects"],
          summary: "Update",
          operationId: "Update",
          parameters: [
            {
              name: "id",
              in: "path",
              description: "",
              required: true,
              style: "simple",
              schema: {
                type: "string",
                example: "6343d2efb1d95db29eef3daa",
              },
            },
          ],
          requestBody: {
            content: {
              "application/x-www-form-urlencoded": {
                encoding: {},
                schema: {
                  required: [
                    "name",
                    "catagories_id",
                    "imageUrl",
                    "discription",
                    "color",
                  ],
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                      example: "Azam Ali",
                    },
                    catagories_id: {
                      type: "string",
                      example: "asdf",
                    },
                    description: {
                      type: "string",
                      example: "asdf",
                    },
                    color: {
                      type: "string",
                      example: "red",
                    },

                    imageUrl: {
                      type: "string",
                      example: "RYK",
                    },
                  },
                },
              },
            },
            required: false,
          },
          responses: {
            200: {
              description: "",
              headers: {},
            },
          },
          deprecated: false,
          servers: [
            {
              url: "https://mercurysole.herokuapp.com/",
              variables: {},
            },
          ],
        },
        get: {
          tags: ["Projects"],
          summary: "Get By ID",
          operationId: "GetByID",
          parameters: [
            {
              name: "id",
              in: "path",
              description: "",
              required: true,
              style: "simple",
              schema: {
                type: "string",
                example: "6340137d9996cd973403c170",
              },
            },
          ],
          responses: {
            200: {
              description: "",
              headers: {},
            },
          },
          deprecated: false,
          servers: [
            {
              url: "https://mercurysole.herokuapp.com/",
              variables: {},
            },
          ],
        },
        delete: {
          tags: ["Projects"],
          summary: "Delete",
          operationId: "Delete",
          parameters: [
            {
              name: "id",
              in: "path",
              description: "",
              required: true,
              style: "simple",
              schema: {
                type: "string",
                example: "6343d2efb1d95db29eef3daa",
              },
            },
          ],
          responses: {
            200: {
              description: "",
              headers: {},
            },
          },
          deprecated: false,
          servers: [
            {
              url: "https://mercurysole.herokuapp.com/",
              variables: {},
            },
          ],
        },
      },

      "/catagories": {
        post: {
          tags: ["categories"],
          summary: "Add",
          operationId: "Add",
          parameters: [],
          requestBody: {
            content: {
              "application/x-www-form-urlencoded": {
                encoding: {},
                schema: {
                  required: ["name"],
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                      example: "Javascrit",
                    },
                  },
                },
              },
            },
            required: false,
          },
          responses: {
            200: {
              description: "",
              headers: {},
            },
          },
          deprecated: false,
          servers: [
            {
              url: "https://mercurysole.herokuapp.com/",
              variables: {},
            },
          ],
        },
        get: {
          tags: ["categories"],
          summary: "Get All",
          operationId: "GetAllcategories",
          parameters: [],
          responses: {
            200: {
              description: "",
              headers: {},
            },
          },
          deprecated: false,
          servers: [
            {
              url: "https://mercurysole.herokuapp.com/",
              variables: {},
            },
          ],
        },
      },
      "/catagories/{id}": {
        patch: {
          tags: ["categories"],
          summary: "Update",
          operationId: "Update",
          parameters: [
            {
              name: "id",
              in: "path",
              description: "",
              required: true,
              style: "simple",
              schema: {
                type: "string",
                example: "6343d2efb1d95db29eef3daa",
              },
            },
          ],
          requestBody: {
            content: {
              "application/x-www-form-urlencoded": {
                encoding: {},
                schema: {
                  required: ["name"],
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                      example: "Azam Ali",
                    },
                  },
                },
              },
            },
            required: false,
          },
          responses: {
            200: {
              description: "",
              headers: {},
            },
          },
          deprecated: false,
          servers: [
            {
              url: "https://mercurysole.herokuapp.com/",
              variables: {},
            },
          ],
        },
        get: {
          tags: ["categories"],
          summary: "Get By ID",
          operationId: "GetByID",
          parameters: [
            {
              name: "id",
              in: "path",
              description: "",
              required: true,
              style: "simple",
              schema: {
                type: "string",
                example: "6340137d9996cd973403c170",
              },
            },
          ],
          responses: {
            200: {
              description: "",
              headers: {},
            },
          },
          deprecated: false,
          servers: [
            {
              url: "https://mercurysole.herokuapp.com/",
              variables: {},
            },
          ],
        },
        delete: {
          tags: ["categories"],
          summary: "Delete",
          operationId: "Delete",
          parameters: [
            {
              name: "id",
              in: "path",
              description: "",
              required: true,
              style: "simple",
              schema: {
                type: "string",
                example: "6343d2efb1d95db29eef3daa",
              },
            },
          ],
          responses: {
            200: {
              description: "",
              headers: {},
            },
          },
          deprecated: false,
          servers: [
            {
              url: "https://mercurysole.herokuapp.com/",
              variables: {},
            },
          ],
        },
      },
      "/iptv": {
        post: {
          tags: ["Iptv"],
          summary: "Add",
          operationId: "Add",
          parameters: [],
          requestBody: {
            content: {
              "application/x-www-form-urlencoded": {
                encoding: {},
                schema: {
                  required: ["name", "imageUrl", "discription", "color"],
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                      example: "pagetwo",
                    },
                    imageUrl: {
                      type: "string",
                    },
                    discription: {
                      type: "string",
                      example: "asdf",
                    },
                    color: {
                      type: "string",
                      example: "two",
                    },
                  },
                },
              },
            },
            required: false,
          },
          responses: {
            200: {
              description: "",
              headers: {},
            },
          },
          deprecated: false,
          servers: [
            {
              url: "https://mercurysole.herokuapp.com/",
              variables: {},
            },
          ],
        },
        get: {
          tags: ["Iptv"],
          summary: "Iptv",
          operationId: "GetAllIptvs",
          parameters: [],
          responses: {
            200: {
              description: "",
              headers: {},
            },
          },
          deprecated: false,
          servers: [
            {
              url: "https://mercurysole.herokuapp.com/",
              variables: {},
            },
          ],
        },
      },
      "/iptv/{id}": {
        patch: {
          tags: ["Iptv"],
          summary: "Update",
          operationId: "Update",
          parameters: [
            {
              name: "id",
              in: "path",
              description: "",
              required: true,
              style: "simple",
              schema: {
                type: "string",
                example: "6343d2efb1d95db29eef3daa",
              },
            },
          ],
          requestBody: {
            content: {
              "application/x-www-form-urlencoded": {
                encoding: {},
                schema: {
                  required: ["name", "imageUrl", "color", "description"],
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                      example: "asdf",
                    },
                    imageUrl: {
                      type: "string",
                    },
                    color: {
                      type: "string",
                      example: "asdf",
                    },
                    service_id: {
                      type: "string",
                      example: "test",
                    },
                  },
                },
              },
            },
            required: false,
          },
          responses: {
            200: {
              description: "",
              headers: {},
            },
          },
          deprecated: false,
          servers: [
            {
              url: "https://mercurysole.herokuapp.com/iptv",
              variables: {},
            },
          ],
        },
        get: {
          tags: ["Iptv"],
          summary: "Get By ID",
          operationId: "GetByID",
          parameters: [
            {
              name: "id",
              in: "path",
              description: "",
              required: true,
              style: "simple",
              schema: {
                type: "string",
                example: "6340137d9996cd973403c170",
              },
            },
          ],
          responses: {
            200: {
              description: "",
              headers: {},
            },
          },
          deprecated: false,
          servers: [
            {
              url: "https://mercurysole.herokuapp.com/",
              variables: {},
            },
          ],
        },
        delete: {
          tags: ["Iptv"],
          summary: "Delete",
          operationId: "Delete",
          parameters: [
            {
              name: "id",
              in: "path",
              description: "",
              required: true,
              style: "simple",
              schema: {
                type: "string",
                example: "6343d2efb1d95db29eef3daa",
              },
            },
          ],
          responses: {
            200: {
              description: "",
              headers: {},
            },
          },
          deprecated: false,
          // servers: [
          //   {
          //     url: "https://technologies",
          //     variables: {},
          //   },
          // ],
        },
      },
      "/career": {
        post: {
          tags: ["career"],
          summary: "Add",
          operationId: "Add",
          parameters: [],
          requestBody: {
            content: {
              "application/x-www-form-urlencoded": {
                encoding: {},
                schema: {
                  required: ["name", "imageUrl", "discription", "color"],
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                      example: "pagetwo",
                    },
                    imageUrl: {
                      type: "string",
                    },
                    discription: {
                      type: "string",
                      example: "asdf",
                    },
                    color: {
                      type: "string",
                      example: "two",
                    },
                  },
                },
              },
            },
            required: false,
          },
          responses: {
            200: {
              description: "",
              headers: {},
            },
          },
          deprecated: false,
          servers: [
            {
              url: "https://mercurysole.herokuapp.com/",
              variables: {},
            },
          ],
        },
        get: {
          tags: ["career"],
          summary: "Career",
          operationId: "GetAllcareer",
          parameters: [],
          responses: {
            200: {
              description: "",
              headers: {},
            },
          },
          deprecated: false,
          servers: [
            {
              url: "https://mercurysole.herokuapp.com/",
              variables: {},
            },
          ],
        },
      },
      "/career/{id}": {
        patch: {
          tags: ["career"],
          summary: "Update",
          operationId: "Update",
          parameters: [
            {
              name: "id",
              in: "path",
              description: "",
              required: true,
              style: "simple",
              schema: {
                type: "string",
                example: "6343d2efb1d95db29eef3daa",
              },
            },
          ],
          requestBody: {
            content: {
              "application/x-www-form-urlencoded": {
                encoding: {},
                schema: {
                  required: ["name", "imageUrl", "color", "description"],
                  type: "object",
                  properties: {
                    name: {
                      type: "string",
                      example: "asdf",
                    },
                    imageUrl: {
                      type: "string",
                    },
                    color: {
                      type: "string",
                      example: "asdf",
                    },
                    service_id: {
                      type: "string",
                      example: "test",
                    },
                  },
                },
              },
            },
            required: false,
          },
          responses: {
            200: {
              description: "",
              headers: {},
            },
          },
          deprecated: false,
          servers: [
            {
              url: "https://mercurysole.herokuapp.com/iptv",
              variables: {},
            },
          ],
        },
        get: {
          tags: ["career"],
          summary: "Get By ID",
          operationId: "GetByID",
          parameters: [
            {
              name: "id",
              in: "path",
              description: "",
              required: true,
              style: "simple",
              schema: {
                type: "string",
                example: "6340137d9996cd973403c170",
              },
            },
          ],
          responses: {
            200: {
              description: "",
              headers: {},
            },
          },
          deprecated: false,
          servers: [
            {
              url: "https://mercurysole.herokuapp.com/",
              variables: {},
            },
          ],
        },
        delete: {
          tags: ["career"],
          summary: "Delete",
          operationId: "Delete",
          parameters: [
            {
              name: "id",
              in: "path",
              description: "",
              required: true,
              style: "simple",
              schema: {
                type: "string",
                example: "6343d2efb1d95db29eef3daa",
              },
            },
          ],
          responses: {
            200: {
              description: "",
              headers: {},
            },
          },
          deprecated: false,
          // servers: [
          //   {
          //     url: "https://technologies",
          //     variables: {},
          //   },
          // ],
        },
      },
      "/applicant": {
        post: {
          tags: ["Applicant"],
          summary: "Add",
          operationId: "Add",
          parameters: [],
          requestBody: {
            content: {
              "application/x-www-form-urlencoded": {
                encoding: {},
                schema: {
                  required: ["firstName", "lastName", "roll", "email", "phone"],
                  type: "object",
                  properties: {
                    firstName: {
                      type: "string",
                      example: "pagetwo",
                    },
                    lastName: {
                      type: "string",
                    },
                    roll: {
                      type: "string",
                      example: "asdf",
                    },
                    email: {
                      type: "string",
                      example: "two",
                    },
                    phone: {
                      type: "string",
                      example: "two",
                    },
                  },
                },
              },
            },
            required: false,
          },
          responses: {
            200: {
              description: "",
              headers: {},
            },
          },
          deprecated: false,
          servers: [
            {
              url: "https://mercurysole.herokuapp.com/",
              variables: {},
            },
          ],
        },
        get: {
          tags: ["Applicant"],
          summary: "Applicant",
          operationId: "GetAllcareer",
          parameters: [],
          responses: {
            200: {
              description: "",
              headers: {},
            },
          },
          deprecated: false,
          servers: [
            {
              url: "https://mercurysole.herokuapp.com/",
              variables: {},
            },
          ],
        },
      },
      "/applicant/{id}": {
        patch: {
          tags: ["Applicant"],
          summary: "Update",
          operationId: "Update",
          parameters: [
            {
              name: "id",
              in: "path",
              description: "",
              required: true,
              style: "simple",
              schema: {
                type: "string",
                example: "6343d2efb1d95db29eef3daa",
              },
            },
          ],
          requestBody: {
            content: {
              "application/x-www-form-urlencoded": {
                encoding: {},
                schema: {
                  required: ["firstName", "lastName", "roll", "email", "phone"],
                  type: "object",
                  properties: {
                    firstName: {
                      type: "string",
                      example: "pagetwo",
                    },
                    lastName: {
                      type: "string",
                    },
                    roll: {
                      type: "string",
                      example: "asdf",
                    },
                    email: {
                      type: "string",
                      example: "two",
                    },
                    phone: {
                      type: "string",
                      example: "two",
                    },
                  },
                },
              },
            },
            required: false,
          },
          responses: {
            200: {
              description: "",
              headers: {},
            },
          },
          deprecated: false,
          servers: [
            {
              url: "https://mercurysole.herokuapp.com/iptv",
              variables: {},
            },
          ],
        },
        get: {
          tags: ["Applicant"],
          summary: "Get By ID",
          operationId: "GetByID",
          parameters: [
            {
              name: "id",
              in: "path",
              description: "",
              required: true,
              style: "simple",
              schema: {
                type: "string",
                example: "6340137d9996cd973403c170",
              },
            },
          ],
          responses: {
            200: {
              description: "",
              headers: {},
            },
          },
          deprecated: false,
          servers: [
            {
              url: "https://mercurysole.herokuapp.com/",
              variables: {},
            },
          ],
        },
        delete: {
          tags: ["Applicant"],
          summary: "Delete",
          operationId: "Delete",
          parameters: [
            {
              name: "id",
              in: "path",
              description: "",
              required: true,
              style: "simple",
              schema: {
                type: "string",
                example: "6343d2efb1d95db29eef3daa",
              },
            },
          ],
          responses: {
            200: {
              description: "",
              headers: {},
            },
          },
          deprecated: false,
          // servers: [
          //   {
          //     url: "https://technologies",
          //     variables: {},
          //   },
          // ],
        },
      },
    },
    tags: [
      {
        name: "Auth",
      },
      {
        name: "Services",
      },
      {
        name: "Question",
      },
      {
        name: "Answers",
      },
      {
        name: "Projects",
      },
      {
        name: "categories",
      },
      {
        name: "Iptv",
      },
      {
        name: "career",
      },
      {
        name: "Applicant",
      },
    ],
  },

  apis: ["./index.js"],
};

const specs = swaggerJsdoc(options);

swaggerUI.setup(specs, { customCssUrl: CSS_URL });
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
