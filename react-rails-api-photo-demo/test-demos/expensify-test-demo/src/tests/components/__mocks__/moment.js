// mock out moment library - you can't import moment directly - without causing stackoverflow
const moment = require.requireActual('moment');

// export a fixed point in time, whether or not you pass in a value
export default (timestamp = 0) => {
  return moment(timestamp);
};