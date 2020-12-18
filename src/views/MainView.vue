<template>
  <div class="container">
    <div class="btn-group">
      <button class="btn btn-ref mb-3" @click="getAllTodos">Refresh</button>
      <button class="btn btn-warning mb-3" @click="showAddModal">Add new Todo</button>
    </div>
    <div class="container">
    <ul >

      <li v-for="todoItem in todoList" v-bind:key="todoItem.id "  >

        <label>
          <input type="checkbox" v-model="todoItem.isDone"
                 @click="editTodo(todoItem.id, todoItem.text, !todoItem.isDone)">
        </label>

        <span>
          <strong>{{ todoItem.id }}</strong>
          <span v-if="todoItem.isDone" style="text-decoration: line-through ;">{{ todoItem.text }}</span>
          <span v-else> {{ todoItem.text }}</span>
        </span>
        &nbsp; &nbsp; &nbsp; &nbsp;
        <button class="btn-warning m-1" v-on:click="showEditTodo(todoItem.id, todoItem.text, todoItem.isDone)">
          Edit
        </button>
        <button class="nm btn btn-danger m-1" v-on:click="deleteTodo(todoItem.id)"> &times;</button>
      </li>
    </ul>
    </div>
    <b-modal
        ref="addNewTodoModal"
        centered
        title="Add new todo"
        @ok="addNewTodo"
    >
      <b-form-input
          v-model="modal.text"
      />
    </b-modal>
    <b-modal
        ref="editTodoModal"
        centered
        title="Edit todo"
        @ok="editTodoFromModal"
    >
      <b-form-input
          v-model="modal.text"
      />
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "MainView",
  data() {
    return {
      todoList: [{
        id: "",
        text: "",
        isDone: ""
      }],
      modal: {
        id: "",
        text: "",
        isDone: false
      }
    }
  },
  mounted() {
    this.getAllTodos()
  },
  methods: {
    addNewTodo() {
      this.$axios.post("/todos/",
          {text: this.modal.text}, {headers:{Authorization: JSON.parse(localStorage.getItem('user')).token}})
          .then(() => {
            this.getAllTodos()
          }).catch(error => alert(error))
    },
    getAllTodos() {
      this.$axios.get("/todos/",{headers:{Authorization: JSON.parse(localStorage.getItem('user')).token}}).then(response => {
        this.todoList = []
        this.todoList = response.data;
      })
          .catch((error) => {
            console.log(error)
          })
    },
    deleteTodo(id) {
      this.$axios.delete("/todos/", {
        data: {
          id: id
        }, headers:{Authorization: JSON.parse(localStorage.getItem('user')).token}
      }).then(() => {
        for (let i = 0; i < this.todoList.length; i++)
          if (id === this.todoList[i].id) {
            this.todoList.splice(i, 1)
          }
      }).catch(error => alert(error))
    },
    editTodoFromModal() {
      this.$axios.put("/todos/", {
        id: this.modal.id,
        text: this.modal.text,
        isDone: this.modal.isDone
      },{headers:{Authorization: JSON.parse(localStorage.getItem('user')).token}}).then(() => {
        this.getAllTodos()
      }).catch(error => alert(error))
    },
    editTodo(id, text, isDone) {
      console.log("ads")
      this.$axios.put("/todos/", {
        id: id,
        text: text,
        isDone: isDone
      },{headers:{Authorization: JSON.parse(localStorage.getItem('user')).token}}).then(() => {
        this.getAllTodos()
      }).catch(error => alert(error))
    },
    showAddModal() {
      this.$refs['addNewTodoModal'].show()
    },
    showEditTodo(id, text, isDone) {
      this.modal.id = id
      this.modal.text = text
      this.modal.isDone = isDone
      this.$refs['editTodoModal'].show()
    }
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.btn-ref
{
  background-color: #090705;
  color:#ffc201;
}


</style>
