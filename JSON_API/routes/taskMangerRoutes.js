const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
router
  .route('/tasks')
  .get(taskController.getTask)
  .post(taskController.postTask)
  .delete(taskController.deleteTask)
  .patch(taskController.editTask);

module.exports = router;
