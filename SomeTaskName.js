module.exports = async (taskData) => {
  // 要做的任务
  let a = 1;
  setInterval(() => {
    console.log(++a);
  }, 1000);
};
