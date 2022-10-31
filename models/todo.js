// models/todo.js
"use strict";
const { Model ,Op} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static async addTask(params) {
      return await Todo.create(params);
    }
    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      // FILL IN HERE
      const overdueitems=await Todo.overdue();
      const todolist=overdueitems.map(todos => todos.displayableString()).join("\n");
      console.log(todolist);
      console.log("\n");

      console.log("Due Today");
      // FILL IN HERE
      const duetodayitems=await Todo.dueToday();
      const todolist1=duetodayitems.map(todos => todos.displayableString()).join("\n");
      console.log(todolist1);
      console.log("\n");

      console.log("Due Later");
      // FILL IN HERE
      const duelateritems=await Todo.dueLater();
      const todolist2=duelateritems.map(todos => todos.displayableString()).join("\n");
      console.log(todolist2);
    }

    static async overdue() {
      // FILL IN HERE TO RETURN OVERDUE ITEMS
      const today=new Date();
      return Todo.findAll({
        where:{
          dueDate:{
          [Op.lt]: today,
          
          }
         // completed : false
        },
        order:[
          ['id','ASC']
        ]
      });
    }

    static async dueToday() {
      // FILL IN HERE TO RETURN ITEMS DUE tODAY
      const today=new Date();
      return Todo.findAll({
        where:{
          dueDate:{
            [Op.eq]:today
          },
        },
        order:[
          ['id','ASC']
        ]
      });
    }

    static async dueLater() {
      // FILL IN HERE TO RETURN ITEMS DUE LATER
      const today=new Date();
      return Todo.findAll({
        where:{
          dueDate:{
            [Op.gt]:today
          },
        },
        order:[
          ['id','ASC']
        ]
      });
    }

    static async markAsComplete(id) {
      // FILL IN HERE TO MARK AN ITEM AS COMPLETE
      return Todo.update({completed:true},{
        where:{
          id:id,
        }
      });
    }

    displayableString() {
      const today=new Date().toLocaleDateString("en-CA");
      let checkbox = this.completed ? "[x]" : "[ ]";
      return `${this.id}. ${checkbox} ${this.title} ${this.dueDate ==today ? ' ' : this.dueDate}`;
      //return `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`;
    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};
