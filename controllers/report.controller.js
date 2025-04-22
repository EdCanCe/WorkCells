const Report = require("../models/report.model");
const sessionVars = require("../util/sessionVars");
const puppeteer = require("puppeteer");

exports.getRoot = (request, response, next) => {
    response.render("reportsMenu", {
        ...sessionVars(request),
    });
};

exports.getEmployeeRotation = (request, response, next) => {
    // fecha actual
    const now = new Date();
    // fecha de inicio del mes actual
    const start = new Date(now.getFullYear(), now.getMonth(), 1)
        .toISOString()
        .split("T")[0];
    // fecha del ultimo día del mes actual
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0)
        .toISOString()
        .split("T")[0];
    // información de usuarios activos, inactivos y departamentos
    const activeUsers = Report.getInfoActives(start, end);
    const inactiveUsers = Report.getInfoInactives(start, end);
    const departments = Report.getAllDepartments();
    // fecha inicial del año
    const startYear = new Date(now.getFullYear(), 0, 1)
        .toISOString()
        .split("T")[0];
    // fecha final del año
    const endYear = new Date(now.getFullYear(), 11, 31)
        .toISOString()
        .split("T")[0];
    // cantidad de empleados activos e inactivos por mes del año actual
    const activesPerMonth = Report.getActivesPerMonth(startYear, endYear);
    const inactivesPerMonth = Report.getInactivesPerMonth(startYear, endYear);
    // recibir las promesas de todas las consultas
    Promise.all([
        activeUsers,
        inactiveUsers,
        departments,
        activesPerMonth,
        inactivesPerMonth,
    ])
        .then(
            ([
                [activeUsers],
                [inactiveUsers],
                [departments],
                [activesPerMonth],
                [inactivesPerMonth],
            ]) => {
                response.render("reportRotation", {
                    ...sessionVars(request),
                    activeUsers: activeUsers,
                    inactiveUsers: inactiveUsers,
                    departments: departments,
                    activesPerMonth: activesPerMonth,
                    inactivesPerMonth: inactivesPerMonth,
                    activeSize: activeUsers.length,
                    inactiveSize: inactiveUsers.length,
                    currentMonthStart: start,
                    currentMonthEnd: end,
                });
            }
        )
        .catch((err) => {
            console.error(err);
            next(err);
        });
};

exports.getOneonOneDepartment = (request, response, next) => {
    const now = new Date();
    const start = new Date(now.getFullYear(), now.getMonth(), 1)
        .toISOString()
        .split("T")[0];
    // fecha del ultimo día del mes actual
    const end = new Date(now.getFullYear(), now.getMonth() + 1, 0)
        .toISOString()
        .split("T")[0];

    const departmentID = request.params.departmentID;
    console.log("ID del departamento:", departmentID);

    Report.fetchDepartment()
        .then(([departments]) => {
            if (!departmentID) {
                return response.render("oneOnOne", {
                    ...sessionVars(request),
                    departments,
                    workload: [],
                    physicalHealth: [],
                    acknowledgement: [],
                    workLifeBalance: [],
                    emotionalHealth: [],
                    currentMonthStart: start,
                    currentMonthEnd: end,
                });
            }

            return Promise.all([
                Report.getAnswerWorkload(departmentID),
                Report.getAnswerPhysicalHealth(departmentID),
                Report.getAnswerAcknowledgement(departmentID),
                Report.getAnswerWorkLifeBalance(departmentID),
                Report.getAnswerEmotionalHealth(departmentID),
            ]).then(
                ([
                    [workloadRows],
                    [physicalHealthRows],
                    [acknowledgementRows],
                    [workLifeBalanceRows],
                    [emotionalHealthRows],
                ]) => {
                    console.log("Respuestas Workload:", workloadRows);
                    console.log(
                        "Respuestas Physical Health:",
                        physicalHealthRows
                    );
                    console.log(
                        "Respuestas Acknowledgement:",
                        acknowledgementRows
                    );
                    console.log(
                        "Respuestas Work-Life Balance:",
                        workLifeBalanceRows
                    );
                    console.log(
                        "Respuestas Emotional Health Balance:",
                        emotionalHealthRows
                    );
                    // Si es AJAX (JSON), sólo devolvemos los arreglos
                    if (
                        request.xhr ||
                        request.headers.accept.includes("application/json")
                    ) {
                        return response.json({
                            workload: workloadRows,
                            physicalHealth: physicalHealthRows,
                            acknowledgement: acknowledgementRows,
                            workLifeBalance: workLifeBalanceRows,
                            emotionalHealth: emotionalHealthRows,
                            currentMonthStart: start,
                            currentMonthEnd: end,
                        });
                    }

                    // Render normal con todos los datos
                    response.render("oneOnOne", {
                        ...sessionVars(request),
                        departments,
                        workload: workloadRows,
                        physicalHealth: physicalHealthRows,
                        acknowledgement: acknowledgementRows,
                        workLifeBalance: workLifeBalanceRows,
                        emotionalHealth: emotionalHealthRows,
                        selectedDepartmentID: departmentID,
                        currentMonthStart: start,
                        currentMonthEnd: end,
                    });
                }
            );
        })
        .catch((error) => next(error));
};

exports.getRotationPDF = async (request, response, next) => {
    const urlLocal = "http://localhost:3000/reports/staffRotation";
    const urlDeploy = "https://tec1.nuclea.solutions/reports/staffRotation";
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    const cookieHeader = request.headers.cookie;
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    await page.setExtraHTTPHeaders({ Cookie: cookieHeader });
    /**
     * ! Alert: Cuando esté en producción cambiar por la variable de urlDeploy
     */
    await page.goto(urlLocal, {
        waitUntil: "networkidle0",
    });

    await page.waitForSelector("#rotationChart");
    await page.waitForFunction(() => {
        const canvas = document.getElementById("rotationChart");
        return canvas && canvas.offsetHeight > 0;
    });
    await delay(1000);

    await page.emulateMediaType("print");

    const height = await page.evaluate(
        () => document.documentElement.scrollHeight
    );

    const pdf = await page.pdf({
        printBackground: true,
        width: "1122px", // A4 landscape
        height: `${height}px`,
    });

    await browser.close();

    response
        .status(200)
        .set({
            "Content-Type": "application/pdf",
            "Content-Disposition": 'attachment; filename="reporte.pdf"',
            "Content-Length": pdf.length,
        })
        .end(pdf);
};
