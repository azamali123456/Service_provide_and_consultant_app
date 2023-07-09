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

const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";
mongoose.connect(
  "mongodb+srv://aazam7246:dTGqRKMRhGSo0WH9@cluster0.7lsx0xx.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

connection.once("connected", () => {
  console.log("Databae is connected");
});
connection.on("error", (error) => {
  console.log("Database error", error);
});
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
  return "Wellcome to backend!";
});

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Rana Zawar App",
      version: "1.0.0",
    },
    servers: [
      {
        url: "https://crowded-ruby-flannel-nightgown.cyclic.app",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
        },
      },
    },
    tags: [
      {
        name: "Add Question",
      },
      {
        name: "Add Answer",
      },
      {
        name: "auth",
      },
      {
        name: "Services",
      },
      {
        name: "course",
      },
      {
        name: "product",
      },
    ],
    paths: {
      "/user/question/:id": {
        post: {
          tags: ["Add Question"],
          summary: "create question",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  example: {
                    statement: "What is propper noun?",
                    tags: ["prs", "prs", "question"],
                    viewState: "false",
                  },
                },
              },
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description: "Successful response",
              content: {
                "application/json": {},
              },
            },
          },
        },
        get: {
          tags: ["Add Question"],
          summary: "get Specific user question",
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description: "Successful response",
              content: {
                "application/json": {},
              },
            },
          },
        },
      },
      "/user/question": {
        get: {
          tags: ["Add Question"],
          summary: "get all question",
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description: "Successful response",
              content: {
                "application/json": {},
              },
            },
          },
        },
      },
      "/user/question/to/expert": {
        get: {
          tags: ["Add Question"],
          summary: "get  user question to admin",
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description: "Successful response",
              content: {
                "application/json": {},
              },
            },
          },
        },
      },
      "/user/question/my/questions": {
        get: {
          tags: ["Add Question"],
          summary: "get my question",
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description: "Successful response",
              content: {
                "application/json": {},
              },
            },
          },
        },
      },
      "/user/question/myquestions/answer": {
        get: {
          tags: ["Add Question"],
          summary: "get my question answer",
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description: "Successful response",
              content: {
                "application/json": {},
              },
            },
          },
        },
      },
      "/user/answer": {
        post: {
          tags: ["Add Answer"],
          summary: "create answer",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  example: {
                    ansStatement: "This is answer of yors question",
                    questionId: "644ab78f3120cd246957c9b2",
                    viewState: "false",
                  },
                },
              },
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
          parameters: [
            {
              name: "ansStatement",
              in: "query",
              schema: {
                type: "string",
              },
              example: "Yes",
            },
          ],
          responses: {
            200: {
              description: "Successful response",
              content: {
                "application/json": {},
              },
            },
          },
        },
        get: {
          tags: ["Add Answer"],
          summary: "get all answer",
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description: "Successful response",
              content: {
                "application/json": {},
              },
            },
          },
        },
      },
      "/user/answer": {
        delete: {
          tags: ["Add Answer"],
          summary: "Delete Answer",
          requestBody: {
            content: {
              "multipart/form-data": {
                schema: {
                  type: "object",
                  properties: {
                    title: {
                      type: "string",
                      example: "laptop",
                    },
                    discription: {
                      type: "string",
                      example: "This is laptop.",
                    },
                    department: {
                      type: "string",
                      example: "IT product",
                    },
                    createdBy: {
                      type: "string",
                      example: "643c11645fa88451e84c6ff0",
                    },
                  },
                },
              },
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description: "Successful response",
              content: {
                "application/json": {},
              },
            },
          },
        },
        patch: {
          tags: ["Add Answer"],
          summary: "Update Answer",
          requestBody: {
            content: {
              "multipart/form-data": {
                schema: {
                  type: "object",
                  properties: {
                    title: {
                      type: "string",
                      example: "laptop",
                    },
                    discription: {
                      type: "string",
                      example: "This is laptop.",
                    },
                    department: {
                      type: "string",
                      example: "IT product",
                    },
                    createdBy: {
                      type: "string",
                      example: "643c11645fa88451e84c6ff0",
                    },
                  },
                },
              },
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description: "Successful response",
              content: {
                "application/json": {},
              },
            },
          },
        },
      },
      "/user/question/:id": {
        get: {
          tags: ["Add Answer"],
          summary: "get Specific user answer",
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description: "Successful response",
              content: {
                "application/json": {},
              },
            },
          },
        },
      },
      "/user/answer/my/answers": {
        get: {
          tags: ["Add Answer"],
          summary: "get my answer",
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description: "Successful response",
              content: {
                "application/json": {},
              },
            },
          },
        },
      },
      "/auth/forgetPassword": {
        post: {
          tags: ["auth"],
          summary: "forgetPassword",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  example: {
                    email: "aazam7246@gmail.com",
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Successful response",
              content: {
                "application/json": {},
              },
            },
          },
        },
      },
      "/auth/register": {
        post: {
          tags: ["auth"],
          summary: "signUp",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  example: {
                    email: "aazam7246@gmail.com",
                    name: "Azam Ali",
                    password: "azamali",
                    userType: "Admin",
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Successful response",
              content: {
                "application/json": {},
              },
            },
          },
        },
      },
      "/auth/login": {
        post: {
          tags: ["auth"],
          summary: "login",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  example: {
                    email: "aazam7246@gmail.com",
                    password: "12345",
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Successful response",
              content: {
                "application/json": {},
              },
            },
          },
        },
      },
      "/auth/otpVerify": {
        post: {
          tags: ["auth"],
          summary: "resetPassword",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  example: {
                    otp: "5020",
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Successful response",
              content: {
                "application/json": {},
              },
            },
          },
        },
      },
      "/auth/passwordReset": {
        post: {
          tags: ["auth"],
          summary: "resetPassword",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  example: {
                    email: "azam@gmail.com",
                    password: "41265",
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Successful response",
              content: {
                "application/json": {},
              },
            },
          },
        },
      },
      "/auth/:id": {
        delete: {
          tags: ["auth"],
          summary: "Delete User",
          requestBody: {
            content: {
              "multipart/form-data": {
                schema: {
                  type: "object",
                  properties: {
                    title: {
                      type: "string",
                      example: "laptop",
                    },
                    discription: {
                      type: "string",
                      example: "This is laptop.",
                    },
                    department: {
                      type: "string",
                      example: "IT product",
                    },
                    createdBy: {
                      type: "string",
                      example: "643c11645fa88451e84c6ff0",
                    },
                  },
                },
              },
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description: "Successful response",
              content: {
                "application/json": {},
              },
            },
          },
        },
        patch: {
          tags: ["auth"],
          summary: "Update User",
          requestBody: {
            content: {
              "multipart/form-data": {
                schema: {
                  type: "object",
                  properties: {
                    title: {
                      type: "string",
                      example: "laptop",
                    },
                    discription: {
                      type: "string",
                      example: "This is laptop.",
                    },
                    department: {
                      type: "string",
                      example: "IT product",
                    },
                    createdBy: {
                      type: "string",
                      example: "643c11645fa88451e84c6ff0",
                    },
                  },
                },
              },
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description: "Successful response",
              content: {
                "application/json": {},
              },
            },
          },
        },
      },
      "/services": {
        post: {
          tags: ["Services"],
          summary: "services",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  example: {
                    title: "HRM",
                    discription: "We provide best HRM services.",
                    imageUrl: "image1637gyt7yy.png",
                    subServices: [
                      {
                        title: "HRM",
                        discription: "We provide best HRM services.",
                        imageUrl: "image1637gyt7yy.png",
                      },
                      {
                        title: "HRM",
                        discription: "We provide best HRM services.",
                        imageUrl: "image1637gyt7yy.png",
                      },
                    ],
                  },
                },
              },
            },
          },
          responses: {
            200: {
              description: "Successful response",
              content: {
                "application/json": {},
              },
            },
          },
        },
        get: {
          tags: ["Services"],
          summary: "services",
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description: "Successful response",
              content: {
                "application/json": {},
              },
            },
          },
        },
      },
      "/services/:id": {
        delete: {
          tags: ["Services"],
          summary: "Delete Services",
          requestBody: {
            content: {
              "multipart/form-data": {
                schema: {
                  type: "object",
                  properties: {
                    title: {
                      type: "string",
                      example: "laptop",
                    },
                    discription: {
                      type: "string",
                      example: "This is laptop.",
                    },
                    department: {
                      type: "string",
                      example: "IT product",
                    },
                    createdBy: {
                      type: "string",
                      example: "643c11645fa88451e84c6ff0",
                    },
                  },
                },
              },
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description: "Successful response",
              content: {
                "application/json": {},
              },
            },
          },
        },
        patch: {
          tags: ["Services"],
          summary: "update Services",
          requestBody: {
            content: {
              "multipart/form-data": {
                schema: {
                  type: "object",
                  properties: {
                    title: {
                      type: "string",
                      example: "laptop",
                    },
                    discription: {
                      type: "string",
                      example: "This is laptop.",
                    },
                    department: {
                      type: "string",
                      example: "IT product",
                    },
                    createdBy: {
                      type: "string",
                      example: "643c11645fa88451e84c6ff0",
                    },
                  },
                },
              },
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description: "Successful response",
              content: {
                "application/json": {},
              },
            },
          },
        },
      },
      "/admin/course": {
        get: {
          tags: ["product"],
          summary: "my product by name",
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description: "Successful response",
              content: {
                "application/json": {},
              },
            },
          },
        },
        post: {
          tags: ["product"],
          summary: "Add Products",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  example: {
                    department: "Management",
                    title: "HR Business Management",
                    discription: "Management",
                    createdBy: "643c11645fa88451e84c6ff0",
                  },
                },
              },
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description: "Successful response",
              content: {
                "application/json": {},
              },
            },
          },
        },
      },
      "/admin/product": {
        post: {
          tags: ["product"],
          summary: "create product",
          requestBody: {
            content: {
              "multipart/form-data": {
                schema: {
                  type: "object",
                  properties: {
                    title: {
                      type: "string",
                      example: "laptop",
                    },
                    discription: {
                      type: "string",
                      example: "This is laptop.",
                    },
                    type: {
                      type: "string",
                      example: "IT product",
                    },
                    createdBy: {
                      type: "string",
                      example: "643c11645fa88451e84c6ff0",
                    },
                  },
                },
              },
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description: "Successful response",
              content: {
                "application/json": {},
              },
            },
          },
        },
      },
      "/admin/product:id": {
        delete: {
          tags: ["product"],
          summary: "Delete Product",
          requestBody: {
            content: {
              "multipart/form-data": {
                schema: {
                  type: "object",
                  properties: {
                    title: {
                      type: "string",
                      example: "laptop",
                    },
                    discription: {
                      type: "string",
                      example: "This is laptop.",
                    },
                    department: {
                      type: "string",
                      example: "IT product",
                    },
                    createdBy: {
                      type: "string",
                      example: "643c11645fa88451e84c6ff0",
                    },
                  },
                },
              },
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description: "Successful response",
              content: {
                "application/json": {},
              },
            },
          },
        },
        patch: {
          tags: ["product"],
          summary: "update Product",
          requestBody: {
            content: {
              "multipart/form-data": {
                schema: {
                  type: "object",
                  properties: {
                    title: {
                      type: "string",
                      example: "laptop",
                    },
                    discription: {
                      type: "string",
                      example: "This is laptop.",
                    },
                    department: {
                      type: "string",
                      example: "IT product",
                    },
                    createdBy: {
                      type: "string",
                      example: "643c11645fa88451e84c6ff0",
                    },
                  },
                },
              },
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description: "Successful response",
              content: {
                "application/json": {},
              },
            },
          },
        },
      },
      "/admin/course": {
        post: {
          tags: ["course"],
          summary: "create course",
          requestBody: {
            content: {
              "multipart/form-data": {
                schema: {
                  type: "object",
                  properties: {
                    title: {
                      type: "string",
                      example: "laptop",
                    },
                    discription: {
                      type: "string",
                      example: "This is laptop.",
                    },
                    department: {
                      type: "string",
                      example: "IT product",
                    },
                    createdBy: {
                      type: "string",
                      example: "643c11645fa88451e84c6ff0",
                    },
                  },
                },
              },
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description: "Successful response",
              content: {
                "application/json": {},
              },
            },
          },
        },
        get: {
          tags: ["course"],
          summary: " Get  All course ",
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description: "Successful response",
              content: {
                "application/json": {},
              },
            },
          },
        },
      },
      "/admin/course/:id": {
        delete: {
          tags: ["course"],
          summary: "Delete course",
          requestBody: {
            content: {
              "multipart/form-data": {
                schema: {
                  type: "object",
                  properties: {
                    title: {
                      type: "string",
                      example: "laptop",
                    },
                    discription: {
                      type: "string",
                      example: "This is laptop.",
                    },
                    department: {
                      type: "string",
                      example: "IT product",
                    },
                    createdBy: {
                      type: "string",
                      example: "643c11645fa88451e84c6ff0",
                    },
                  },
                },
              },
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description: "Successful response",
              content: {
                "application/json": {},
              },
            },
          },
        },
        patch: {
          tags: ["course"],
          summary: "update course",
          requestBody: {
            content: {
              "multipart/form-data": {
                schema: {
                  type: "object",
                  properties: {
                    title: {
                      type: "string",
                      example: "laptop",
                    },
                    discription: {
                      type: "string",
                      example: "This is laptop.",
                    },
                    department: {
                      type: "string",
                      example: "IT product",
                    },
                    createdBy: {
                      type: "string",
                      example: "643c11645fa88451e84c6ff0",
                    },
                  },
                },
              },
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description: "Successful response",
              content: {
                "application/json": {},
              },
            },
          },
        },
      },
      "/admin/course/department/:name": {
        get: {
          tags: ["course"],
          summary: " Get course By Department name ",
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            200: {
              description: "Successful response",
              content: {
                "application/json": {},
              },
            },
          },
        },
      },
    },
  },

  apis: ["./index.js"],
};

const specs = swaggerJsdoc(options);

swaggerUI.setup(specs, { customCssUrl: CSS_URL });
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
