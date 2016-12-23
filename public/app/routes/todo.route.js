"use strict";
var todo_component_1 = require('../components/todo.component');
var simpletodo_component_1 = require('../components/simpletodo.component');
var category_todo_component_1 = require('../components/category-todo.component');
exports.TodoRoutes = [
    {
        path: 'new-todo', component: todo_component_1.TodoComponent,
        children: [
            { path: '', component: simpletodo_component_1.SimpleTodo },
            { path: 'todo', component: simpletodo_component_1.SimpleTodo },
            { path: 'category', component: category_todo_component_1.CategoryTodo }
        ]
    }
];
//# sourceMappingURL=todo.route.js.map