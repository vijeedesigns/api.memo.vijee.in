const TABLES = {
    USERS: 'table-users',
    COMPANIES: 'memo-companies',
    CONTACTS: 'memo-contacts',
    DUES: 'memo-dues',
    EXCELS: 'memo-excels',
    FINANCIAL_CALCULATIONS: 'memo-financial-calculations',
    MONTHLY_EXPENSES: 'memo-monthly-expenses',
    MONTHLY_EXPENSE_STATUS: 'memo-monthly-expense-statuses',
    NOTES: 'memo-notes',
    PAYSLIPS: 'memo-payslips',
    PHOTOS: 'memo-photos',
    PROJECTS: 'memo-projects'
}

const QUERY = {
    // Users
    GET_USER_BY_EMAIL: username => "SELECT * FROM `" + TABLES.USERS + "` WHERE email = '" + username + "' LIMIT 1",
    // Companies
    GET_COMPANIES: () => "SELECT * FROM `" + TABLES.COMPANIES + "`",
    GET_COMPANY: guid => "SELECT * FROM `" + TABLES.COMPANIES + "` WHERE guid='" + guid + "'",
    ADD_COMPANY: body => "INSERT INTO `" + TABLES.COMPANIES + "` " + body,
    EDIT_COMPANY: body => "UPDATE `" + TABLES.COMPANIES + "` " + body,
    DELETE_COMPANY: guid => "DELETE FROM `" + TABLES.COMPANIES + "` WHERE guid='" + guid + "'",
    // Contacts
    GET_CONTACTS: () => "SELECT * FROM `" + TABLES.CONTACTS + "`",
    GET_CONTACT: guid => "SELECT * FROM `" + TABLES.CONTACTS + "` WHERE guid='" + guid + "'",
    ADD_CONTACT: body => "INSERT INTO `" + TABLES.CONTACTS + "` " + body,
    EDIT_CONTACT: body => "UPDATE `" + TABLES.CONTACTS + "` " + body,
    DELETE_CONTACT: guid => "DELETE FROM `" + TABLES.CONTACTS + "` WHERE guid='" + guid + "'",
    // Dues
    GET_DUES: () => "SELECT * FROM `" + TABLES.DUES + "`",
    GET_DUE: guid => "SELECT * FROM `" + TABLES.DUES + "` WHERE guid='" + guid + "'",
    ADD_DUE: body => "INSERT INTO `" + TABLES.DUES + "` " + body,
    EDIT_DUE: body => "UPDATE `" + TABLES.DUES + "` " + body,
    DELETE_DUE: guid => "DELETE FROM `" + TABLES.DUES + "` WHERE guid='" + guid + "'",
    // Excels
    GET_EXCELS: () => "SELECT * FROM `" + TABLES.EXCELS + "`",
    GET_EXCEL: guid => "SELECT * FROM `" + TABLES.EXCELS + "` WHERE guid='" + guid + "'",
    ADD_EXCEL: body => "INSERT INTO `" + TABLES.EXCELS + "` " + body,
    EDIT_EXCEL: body => "UPDATE `" + TABLES.EXCELS + "` " + body,
    DELETE_EXCEL: guid => "DELETE FROM `" + TABLES.EXCELS + "` WHERE guid='" + guid + "'",
    // Financial calculations
    GET_FINANCIAL_CALCULATIONS: () => "SELECT * FROM `" + TABLES.FINANCIAL_CALCULATIONS + "`",
    GET_FINANCIAL_CALCULATION: guid => "SELECT * FROM `" + TABLES.FINANCIAL_CALCULATIONS + "` WHERE guid='" + guid + "'",
    ADD_FINANCIAL_CALCULATION: body => "INSERT INTO `" + TABLES.FINANCIAL_CALCULATIONS + "` " + body,
    EDIT_FINANCIAL_CALCULATION: body => "UPDATE `" + TABLES.FINANCIAL_CALCULATIONS + "` " + body,
    DELETE_FINANCIAL_CALCULATION: guid => "DELETE FROM `" + TABLES.FINANCIAL_CALCULATIONS + "` WHERE guid='" + guid + "'",
    // Monthly expenses
    GET_MONTHLY_EXPENSES: () => "SELECT * FROM `" + TABLES.MONTHLY_EXPENSES + "`",
    GET_MONTHLY_EXPENSE: guid => "SELECT * FROM `" + TABLES.MONTHLY_EXPENSES + "` WHERE guid='" + guid + "'",
    ADD_MONTHLY_EXPENSE: body => "INSERT INTO `" + TABLES.MONTHLY_EXPENSES + "` " + body,
    EDIT_MONTHLY_EXPENSE: body => "UPDATE `" + TABLES.MONTHLY_EXPENSES + "` " + body,
    DELETE_MONTHLY_EXPENSE: guid => "DELETE FROM `" + TABLES.MONTHLY_EXPENSES + "` WHERE guid='" + guid + "'",
    // Monthly expenses status
    GET_MONTHLY_EXPENSES_STATUSES: () => "SELECT * FROM `" + TABLES.MONTHLY_EXPENSE_STATUS + "`",
    GET_MONTHLY_EXPENSE_STATUS: guid => "SELECT * FROM `" + TABLES.MONTHLY_EXPENSE_STATUS + "` WHERE guid='" + guid + "'",
    GET_MONTHLY_EXPENSE_STATUS_WITH_YEAR_AND_MONTH: (month, year) => "SELECT * FROM `" + TABLES.MONTHLY_EXPENSE_STATUS + "` WHERE month='" + month + "' AND year='" + year + "'",
    ADD_MONTHLY_EXPENSE_STATUS: body => "INSERT INTO `" + TABLES.MONTHLY_EXPENSE_STATUS + "` " + body,
    EDIT_MONTHLY_EXPENSE_STATUS: body => "UPDATE `" + TABLES.MONTHLY_EXPENSE_STATUS + "` " + body,
    DELETE_MONTHLY_EXPENSE_STATUS: guid => "DELETE FROM `" + TABLES.MONTHLY_EXPENSE_STATUS + "` WHERE guid='" + guid + "'",
    // Notes
    GET_NOTES: () => "SELECT * FROM `" + TABLES.NOTES + "`",
    GET_NOTE: guid => "SELECT * FROM `" + TABLES.NOTES + "` WHERE guid='" + guid + "'",
    ADD_NOTE: body => "INSERT INTO `" + TABLES.NOTES + "` " + body,
    EDIT_NOTE: body => "UPDATE `" + TABLES.NOTES + "` " + body,
    DELETE_NOTE: guid => "DELETE FROM `" + TABLES.NOTES + "` WHERE guid='" + guid + "'",
    // Payslips
    GET_PAYSLIPS: () => "SELECT * FROM `" + TABLES.PAYSLIPS + "`",
    GET_PAYSLIP: guid => "SELECT * FROM `" + TABLES.PAYSLIPS + "` WHERE guid='" + guid + "'",
    ADD_PAYSLIP: body => "INSERT INTO `" + TABLES.PAYSLIPS + "` " + body,
    EDIT_PAYSLIP: body => "UPDATE `" + TABLES.PAYSLIPS + "` " + body,
    DELETE_PAYSLIP: guid => "DELETE FROM `" + TABLES.PAYSLIPS + "` WHERE guid='" + guid + "'",
    // Photos
    GET_PHOTOS: () => "SELECT * FROM `" + TABLES.PHOTOS + "`",
    GET_PHOTO: guid => "SELECT * FROM `" + TABLES.PHOTOS + "` WHERE guid='" + guid + "'",
    ADD_PHOTO: body => "INSERT INTO `" + TABLES.PHOTOS + "` " + body,
    EDIT_PHOTO: body => "UPDATE `" + TABLES.PHOTOS + "` " + body,
    DELETE_PHOTO: guid => "DELETE FROM `" + TABLES.PHOTOS + "` WHERE guid='" + guid + "'",
    // Projects
    GET_PROJECTS: () => "SELECT * FROM `" + TABLES.PROJECTS + "`",
    GET_PROJECT: guid => "SELECT * FROM `" + TABLES.PROJECTS + "` WHERE guid='" + guid + "'",
    ADD_PROJECT: body => "INSERT INTO `" + TABLES.PROJECTS + "` " + body,
    EDIT_PROJECT: body => "UPDATE `" + TABLES.PROJECTS + "` " + body,
    DELETE_PROJECT: guid => "DELETE FROM `" + TABLES.PROJECTS + "` WHERE guid='" + guid + "'",
};

module.exports = { QUERY };
