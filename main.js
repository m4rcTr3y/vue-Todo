Vue.component('v-todo',{
  props:["todo","func","edit"],
  methods:{
  
  },
  computed:{
    compTodo:function(){
        var text = this.todo.text;
        if(text.split('').length>=16){
          return text.split('').splice(0,12).join('')+'....'
        }
        else{
          return text
        }
    }
  },
  template:`
     <div class="todo" >
     <p>{{compTodo}}</p>
     <div class="todo-opt" >
     <button v-on:click="$root.delTodo(todo)"><i class="fa fa-trash" ></i></button>
     <button v-on:click="edit(todo)"><i class="fa fa-edit" ></i></button>
     <button v-if="compTodo != todo.text" v-on:click="func(todo)"><i class="fa fa-eye" ></i></button>
     
     </div>
     </div>
  
  `
});

Vue.component('v-view',{
  props:['todo'],
  template:`
    <div v-if="todo.show == true" class="todo-view">
      <div class="view-cont">
      <button class="btn" v-on:click="$root.viewer.show = false"> <i class="fa fa-times"></i></button>
      
       <h1>Todo ({{todo.id}})</h1>
      
       <p>{{todo.data}}</p>
     </div>
    </div>
  `

});


Vue.component('v-edit',{
  props:['todo', 'reff'],
  template:`
    <div v-if="todo.edit == true" class="todo-view">
      <div class="view-cont">
       
       <h1>Edit Todo ({{todo.id}})</h1>
       <input type="text" v-model="reff[todo.id-1].text" >
       <button class="edit" v-on:click="todo.edit=false"> <i class="fa fa-check"></i> </button>
       
     </div>
    </div>
  `

});


var app = new Vue({
    el:'#app',
    data: {
      todo:'',
      viewer: {data:'',show:false,id:''},
      editor: {edit: false,item:''},
      todos:[
      {id:1,text:"my name is mark"},
      {id:2,text:"hey i am mark is my name blah blah"}
      ]
    },
    methods:{
       addTodo:function(){
          this.todos.push({id:this.todos.length+1,text:this.todo});
          this.todo = ''; 
       },
       show:function(todo){
         this.viewer.data = todo.text;
         this.viewer.show = true;
         this.viewer.id = todo.id
         },
         delTodo:function(todo){
           this.todos.splice(this.todos.indexOf(todo),1);
           
         },
         editing:function(item){
           this.editor.id = item.id;
           this.editor.edit = true;
         }
             
       }
});