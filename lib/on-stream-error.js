/**
 * Basic error handler; puts message to the screen, stops the stream
 * @param {Object} error - Error event
 */
module.exports = function(error) {
    console.error(error.message);
    this.emit('end');
}