"use strict";

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _morgan = _interopRequireDefault(require("morgan"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _notifications = _interopRequireDefault(require("./routes/notifications"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _swaggerJsdoc = _interopRequireDefault(require("swagger-jsdoc"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PORT = process.env.PORT || 4001;

_dotenv["default"].config();

var app = (0, _express["default"])();
var options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Library Notification API",
      version: "1.0.0",
      description: "Notification services API",
      contact: {
        name: "API Support ( Duy Nguyen)",
        url: "https://github.com/duynguyen27091997",
        email: "wasahara11111@gmail.com"
      }
    },
    servers: [{
      url: "http://localhost:4001",
      description: "Notification services API"
    }]
  },
  apis: ["./src/routes/*.js"]
};
var specs = (0, _swaggerJsdoc["default"])(options);
app.use("/api-docs", _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(specs)); //config app
// create a write stream (in append mode)

var accessLogStream = _fs["default"].createWriteStream(_path["default"].join(process.cwd(), 'logs', 'access.log'), {
  flags: 'a'
}); // setup the logger


app.use((0, _morgan["default"])(':method :url :status :res[content-length] - :response-time ms', {
  stream: accessLogStream
}));
app.use((0, _cors["default"])());
app.use("/notifications", _notifications["default"]);
app.listen(PORT, function () {
  console.log("Server runs on port " + PORT);
});