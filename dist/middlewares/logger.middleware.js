"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerGlobal = LoggerGlobal;
function LoggerGlobal(req, res, next) {
    const currentTime = new Date().toISOString();
    console.log(`Estas ejecuntando un metodo ${req.method} en la ruta ${req.url}, ${currentTime}`);
    next();
}
//# sourceMappingURL=logger.middleware.js.map