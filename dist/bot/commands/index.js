"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupCommands = setupCommands;
const start_1 = require("./start");
const admin_1 = require("./admin");
const upload_1 = require("./upload");
function setupCommands(bot) {
    (0, start_1.setupStart)(bot);
    (0, admin_1.setupAdmin)(bot);
    (0, upload_1.setupUploadListener)(bot);
}
