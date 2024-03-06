const crypto = require("crypto");

const algorithm = 'aes-256-ccm';
const key = crypto.randomBytes(256 / 8);
const iv = 'TestText';
const plainText = "7638792F423F4528482B4D6250655368";
const secretKey = '4B6250655368566D5971337336763979';

const imageNotFound = 'iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAAAAABVicqIAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAHdElNRQfnAQMGCDbrrmTnAAAAAW9yTlQBz6J3mgAAA7dJREFUaN7tmc1upDAMx/v+T9HbnuaQQy655cItEhcUKVIUKbLkSH6JtQPMMJ1p+RhYdVuiUiBAfrFj/wmZt/IPytsJOSEn5JtDMPm1JeS1kNBtKGkNBEvewug84hpL0iZI95TxJcRDwbK4JF8hz574CpLKmoJhkyXfANK3h8NQYx+PR1gCwXc+Qn9yEGQIQZ8OhNxyKR8GQT9JwqMgMMl0OAoyVZ78X0PweHdhTfFh7EPZD5Lh7hT81JB9INJmuJNZCBPGPpBwdczkthhixtv1VyFh4v6n5WUI3l6VcVq7JwSnr+P4ySMvWzKRkFs9JNgTAr57pGQ/yO8+kKneXlWkOtDn3SDxYeqT8jj5g50gz+ZgV9s87AKZmUx63AHyYdDv7Zja8gIE/dPuP7FlOwSXzO57ynZIXMB49X2ydHIfXoAs/0qJWyEZ/GJIF2mjJSsYfPc2yIZyQk7Ir4LgqkQcyyezpU8XcGD9Co6PuBJS1ix5zDzwC1buTsgJ+fGQ5YqwDILTHT7UH2DJfcu0AwQbKNFwu9nIF0K2vZonq7VNBclpY8ycQXMQ0ED+3RHZd/48pPbSSG1QbUqN4wrjUoy7QLSCpJRATKfZINKevUSyGc+7XSC2cY0zDAEFpmNnafEcF7EkxtlV10UQA8qA5iadpc5S8YaNMFprJKuMbuYGfxmE2q4wBI1S6gJSKddaQ+KuMhvKCyFEqDOlC6RsWo4CKzWqqxCajeJZiKoQ7qzK1LCrOAy431ZZqxoZeAnhuUGZTUaOT6i5EbAkWeTAIM6JztWm6y9fMOOwNRl/19DgJFqS899dhbdD6m8uNUAJc0ZxBUjpV1GxHvE1SEDj7XWTP6g3LIB4w02IClLgbDOBChillarLAWg5T1qOMMeJaEVfGs/p4qg0vCFLqFfK+DkIte+O45Kb9MoP/xB0Gt4kfCD9thy02HBGkuWkcQ2huQTOG6DWYnhUgAeIUYkhNGig11TbHnzJCcnnUVWXWdHmEWLMACHKKs9BWAkFknTtDul4B2GpRBLfFJFJvEGC7kqFlGreDMSiSgwJIyTcQRrXXiF5ColRwwgZrn8Foail5dowH5cP7uJd3wFqmsmYBLI8SPI4C9BHmXkCIfsncADJ6zYbdz8m/TqbcTwonk9E+wsrpkCSqpACrJ4zEMf2Jg6VUpwyRrna6Ni18QCM5ne83AQ84twbZNupFXf90bp50LGHZJRkqglXwIchs64Jdj3I3RjVvuolDDnMCfwkG3+udp2QE7Jf+Qtb2rfLsviCWwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMy0wMS0wM1QwNjowNzoyMyswMDowMPo6JlwAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjMtMDEtMDNUMDY6MDc6MjMrMDA6MDCLZ57gAAAAAElFTkSuQmCC';

const eventTypes = [
    {
        label: "BIRTHDAY",
        short: "BI",
        colorBg: "#FCE4EC",
        color: "#C2185B",
        annual: true,
        allDay: true,
        isCompanyEvent: false
    },
    {
        label: "HOUSE WARMING",
        short: "HW",
        colorBg: "#EDE7F6",
        color: "#512DA8",
        annual: false,
        allDay: true,
        isCompanyEvent: false
    },
    {
        label: "WEDDING ANNIVERSARY",
        short: "WA",
        colorBg: "#FFEBEE",
        color: "#D32F2F",
        annual: true,
        allDay: true,
        isCompanyEvent: false
    },
    {
        label: "DEATH ANNIVERSARY",
        short: "DA",
        colorBg: "#F9FBE7",
        color: "#AFB42B",
        annual: true,
        allDay: true,
        isCompanyEvent: false
    },
    {
        label: "HOLIDAY",
        short: "HO",
        colorBg: "#F3E5F5",
        color: "#7B1FA2",
        annual: false,
        allDay: true,
        isCompanyEvent: true
    },
    {
        label: "PUBLIC HOLIDAY",
        short: "PH",
        colorBg: "#E8EAF6",
        color: "#303F9F",
        annual: false,
        allDay: true,
        isCompanyEvent: false
    },
    {
        label: "TASK",
        short: "TA",
        colorBg: "#E3F2FD",
        color: "#1976D2",
        annual: false,
        allDay: false,
        isCompanyEvent: true
    },
    {
        label: "LEAVE",
        short: "LE",
        colorBg: "#E1F5FE",
        color: "#0288D1",
        annual: false,
        allDay: false,
        isCompanyEvent: true
    },
    {
        label: "TEAM OUTING",
        short: "TO",
        colorBg: "#E0F7FA",
        color: "#0097A7",
        annual: false,
        allDay: false,
        isCompanyEvent: true
    },
    {
        label: "TRAINING SESSION",
        short: "TS",
        colorBg: "#E0F2F1",
        color: "#00796B",
        annual: false,
        allDay: false,
        isCompanyEvent: false
    },
    {
        label: "MEETING",
        short: "ME",
        colorBg: "#E8F5E9",
        color: "#388E3C",
        annual: false,
        allDay: false,
        isCompanyEvent: true
    },
    {
        label: "EMERGENCY",
        short: "EM",
        colorBg: "#FBE9E7",
        color: "#E64A19",
        annual: false,
        allDay: false,
        isCompanyEvent: false
    },
    {
        label: "TRIP",
        short: "TR",
        colorBg: "#F1F8E9",
        color: "#689F38",
        annual: false,
        allDay: false,
        isCompanyEvent: false
    },
    {
        label: "INTERVIEW",
        short: "IN",
        colorBg: "#FFFDE7",
        color: "#FBC02D",
        annual: false,
        allDay: false,
        isCompanyEvent: false
    },
    {
        label: "EVENT",
        short: "EV",
        colorBg: "#FFFDE7",
        color: "#FBC02D",
        annual: false,
        allDay: false,
        isCompanyEvent: false
    }
];

module.exports = { algorithm, key, iv, plainText, secretKey, imageNotFound, eventTypes };
