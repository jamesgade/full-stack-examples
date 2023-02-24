const express = require('express');
const router = express.Router();
const { getAllTodos, createTodo, getTodo, deleteTodo, updateTodo } = require('../../controllers/todo/todoController');

const { protect } = require('../../middlewares/authMiddleware');

router.route('/').get(protect, getAllTodos);
router.route('/').post(protect, createTodo);
router.route('/:id').get(protect, getTodo);
router.route('/:id').put(protect, updateTodo);
router.route('/:id').delete(protect, deleteTodo);

module.exports = router;
