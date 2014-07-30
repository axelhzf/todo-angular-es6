var _ = require("underscore");
var angular = require("angular");
var Controller = require("../lib/Controller");
var Storage = require("../lib/Storage");
var TodoItem = require("../models/TodoItem");

class TodoController extends Controller {
  constructor ($scope, $routeParams, $filter) {
    super($scope);

    this.$routeParams = $routeParams;
    this.$filter = $filter;

    this.storage = new Storage(TodoItem);
    this.$.todos = this.storage.get();
    this.$.newTodo = "";
    this.$.editedTodo = null;

    this.$.$watch('todos', this.onTodosChange.bind(this), true);
    this.$.$on('$routeChangeSuccess', this.onRouteChange.bind(this));
  }

  onTodosChange (newValue, oldValue) {
    this.$.remainingCount = _.where(this.$.todos, {completed: false}).length;
    this.$.completedCount = this.$.todos.length - this.$.remainingCount;
    this.$.allChecked = !this.$.remainingCount;
    if (newValue !== oldValue) {
      this.storage.put(this.$.todos);
    }
  }

  onRouteChange () {
    var status = this.$.status = this.$routeParams.status || '';

    if (status === "active") {
      this.$.statusFilter = { completed: false };
    } else if (status === "completed") {
      this.$.statusFilter = { completed: true };
    } else {
      this.$.statusFilter = null;
    }
  }

  addTodo () {
    var newTodo = this.$.newTodo.trim();
    if (!newTodo.length) {
      return;
    }
    var todoItem = new TodoItem({title: newTodo, completed: false});
    this.$.todos.push(todoItem);
    this.$.newTodo = "";
  }

  editTodo (todo) {
    this.$.editedTodo = todo;
    this.$.originalTodo = new TodoItem(_.pick(todo, "title", "completed"));
  }

  doneEditing (todo) {
    this.$.editedTodo = null;
    todo.title = todo.title.trim();
    if (!todo.title) {
      this.removeTodo(todo);
    }
  }

  revertEditing (todo) {
    console.log("revert editing");
    this.$.todos[this.$.todos.indexOf(todo)] = this.$.originalTodo;
    this.doneEditing(this.$.originalTodo);
  }

  removeTodo (todo) {
    this.$.todos.splice(this.$.todos.indexOf(todo), 1);
  }

  clearCompletedTodos () {
    this.$.todos = _.reject(this.$.todos, todo => {
      todo.completed;
    });
  }

  markAll (completed) {
    _.each(this.$.todos, todo => {
      todo.completed = !completed;
    })
  }

}

module.exports = TodoController;