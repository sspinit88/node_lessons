const path = require('path');
// path.dirname(process.mainModule.filename) - автоматически определяет корень проекта
module.exports = path.dirname(process.mainModule.filename);
