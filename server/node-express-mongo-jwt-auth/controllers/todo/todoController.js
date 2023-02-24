const asyncHandler = require('express-async-handler');
const Todo = require('../../models/todo/todoModel');

// @desc    create todo
// @route   POST /todos
// @access  private
const createTodo = asyncHandler(async (req, res) => {
    const { todo, description } = req.body

    if (!todo || !description) {
        res.status(400)
        throw new Error('Please add a valid todo title and description');
    }

    const createdTodo = await Todo.create({
        todo,
        description,
        user: req.user.id,
        // status: 'new'   // default
    })

    res.status(201).json(createdTodo);
})

// @desc    get user todos
// @route   GET /todos
// @access  private
const getAllTodos = asyncHandler(async (req, res) => {

    const todo = await Todo.find({ user: req.user.id })

    res.status(200).json(todo)
})

// @desc    get user's single todo by id
// @route   GET /todos/:id
// @access  private
const getTodo = asyncHandler(async (req, res) => {

    const todo = await Todo.findById(req.params.id)

    if (!todo) {
        res.status(404)
        throw new Error('Todo Not found')
    }

    if (todo.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not authorized')
    }

    res.status(200).json(todo)
})

// @dedc    delete a todo
// route    DELETE /todos/:id
// @access  private
const deleteTodo = asyncHandler(async (req, res) => {

    const todo = await Todo.findById(req.params.id)

    if (!todo) {
        res.status(404)
        throw new Error('Todo not found')
    }

    if (todo.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('Not authorized')
    }

    await todo.remove()

    res.status(200).json({ success: true })
});

// @desc    update todo
// @route   PUT /todos/:id
// @access  private
const updateTodo = asyncHandler(async (req, res) => {

    const todo = await Todo.findById(req.params.id)

    if (!todo) {
        res.status(404)
        throw new Error('Todo not found')
    }

    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true })    // third argument { new: true } helps print the update in console

    res.status(200).json(updatedTodo)
});

module.exports = {
    createTodo,
    getAllTodos,
    getTodo,
    deleteTodo,
    updateTodo
}
