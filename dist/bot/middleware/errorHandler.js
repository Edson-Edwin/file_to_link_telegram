"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const grammy_1 = require("grammy");
function errorHandler(err) {
    const ctx = err.ctx;
    console.error(`Error while handling update ${ctx.update.update_id}:`);
    const e = err.error;
    if (e instanceof grammy_1.GrammyError) {
        console.error('Error in request:', e.description);
    }
    else if (e instanceof grammy_1.HttpError) {
        console.error('Could not contact Telegram:', e);
    }
    else {
        console.error('Unknown error:', e);
    }
}
