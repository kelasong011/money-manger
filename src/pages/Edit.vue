<template>
  <div>
    <p class="tag">编辑标签</p>
    <b-form-input v-model="editmessage"></b-form-input>
    <div class="btn-wrap">
      <b-button variant="danger" @click="delMessage">删除</b-button>
      <b-button variant="success" @click="postMessage">确认</b-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editmessage: "",
    };
  },
  mounted(){
      var key = this.$route.query.id;
      var message = JSON.parse(localStorage.getItem("tags"));
    //   console.log(message)
      this.editmessage = message[key];
  },
  methods: {
    delMessage() {
      var key = this.$route.query.id;
      var message = JSON.parse(localStorage.getItem("tags"));
      message.splice(key, 1);
      window.localStorage.setItem('tags',JSON.stringify(message));
      alert("删除"+this.editmessage+"成功");
      this.$router.push({path:'/tag'});
    },
    postMessage(){
         var key = this.$route.query.id
         var message = JSON.parse(localStorage.getItem("tags"))
         var flag = true
         for(var i=0;i<message.length;i++){
             if(this.editmessage===message[i]){
                 alert('您输入的标签已存在')
                 flag = false
                 break
             }
             if(flag){
                 message.splice(key,1,this.editmessage)
                 window.localStorage.setItem('tags',JSON.stringify(message))
                 alert('修改成功,改为：'+this.editmessage)
                 this.$router.push({path:'/tag'})
                 return
             }
             
         }
    }
    
  }
};
</script>

<style scoped>
.tag {
  width: 100%;
  text-align: center;
  height: 50px;
  background-color: rgb(141, 141, 141);
}
.btn-wrap {
  display: flex;
  justify-content: space-around;
}
</style>