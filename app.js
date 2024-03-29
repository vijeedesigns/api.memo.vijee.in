const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

global.appRoot = path.resolve(__dirname);

const server = express();

// Set up Global configuration access
dotenv.config();

server.use(
    cors({
        origin: "*",
    })
);

server.use(bodyParser.json({ limit: "200mb" }));
server.use(bodyParser.text({ limit: "200mb" }));
server.use(bodyParser.urlencoded({ limit: "200mb", extended: true }));

server.use(express.static("assets"));

server.get("/", (req, res) => {
    res.send(`<div>
        <div>Hello!</div>
        <div>Welcome to memo.vijee.in API.</div>
        <div>V1.0.2</div>
        <div>20240306</div>
    </div>`);
});

const { RouteAuth } = require("./src/routes/route-auth");
server.use("/auth", RouteAuth);

const RouteUsers = require("./src/routes/route-users");
server.use("/users", RouteUsers);

const RouteExpenses = require("./src/routes/route-expenses");
server.use("/expenses", RouteExpenses);

const RouteExpenseAccounts = require("./src/routes/route-expense-accounts");
server.use("/expense-accounts", RouteExpenseAccounts);

const RouteMonthlyExpenses = require("./src/routes/route-monthly-expenses");
server.use("/monthly-expenses", RouteMonthlyExpenses);

const RouteEvents = require("./src/routes/route-events");
server.use("/events", RouteEvents);

const RouteTransactions = require("./src/routes/route-transactions");
server.use("/transactions", RouteTransactions);

const RouteDues = require("./src/routes/route-dues");
server.use("/dues", RouteDues);

const { RouteImage } = require("./src/routes/route-image");
server.use("/image", RouteImage);

const RouteCompanies = require("./src/routes/route-companies");
server.use("/companies", RouteCompanies);

const RouteLocker = require("./src/routes/route-locker");
server.use("/notes", RouteLocker);

const RouteUploads = require("./src/routes/route-uploads");
server.use("/uploads", RouteUploads);

const RoutePayslips = require("./src/routes/route-payslips");
server.use("/payslips", RoutePayslips);

const RouteAncestry = require("./src/routes/route-ancestry");
server.use("/ancestry", RouteAncestry);

const RoutePhotos = require("./src/routes/route-photos");
server.use("/photos", RoutePhotos);

const RouteProjects = require("./src/routes/route-projects");
server.use("/projects", RouteProjects);

const RouteFinancialCalculation = require("./src/routes/route-financial-calculations");
server.use("/financial-calculations", RouteFinancialCalculation);

const RouteContacts = require("./src/routes/route-contacts");
server.use("/contacts", RouteContacts);

const RouteExcels = require("./src/routes/route-excels");
server.use("/excels", RouteExcels);

server.listen(process.env.PORT, () => {
    console.log(`api.memo.vijee.in app listening on port ${process.env.PORT}`);
});
