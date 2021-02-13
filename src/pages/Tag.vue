<template>
<div>
  <div  class="tagstyle">
    <b-list-group>
      <b-list-group-item
        button
        v-for="(item,index) in list"
        :key="index"
        @click="editTag(index)"
      >{{item}}</b-list-group-item>
    </b-list-group>
    <!-- <div class="addnewtag">
      <b-button variant="outline-primary" @click="click">新增标签</b-button>
    </div> -->
   <div class="addnewtag">
    <b-button v-b-modal.modal-prevent-closing>新增标签</b-button>
    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Submit Your tag"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="新增标签"
          label-for="name-input"
          invalid-feedback="Name is required"
          :state="nameState"
        >
          <b-form-input
            id="name-input"
            v-model="name"
            :state="nameState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
  </div>
  <b-nav justified class="fixed-bottom bg-light" >
      <b-nav-item  @click="$router.push({ path: '/' })"> 
          <b-icon icon="plus-circle"></b-icon>
        <br />
        <small>记账</small>
      </b-nav-item>
      <b-nav-item >
          <b-icon icon="tag-fill"></b-icon>
        <br />
        <small>标签</small>
      </b-nav-item>
      <b-nav-item @click="$router.push({ path: '/stastic' })">
          <b-icon icon="bar-chart"></b-icon>
        <br />
        <small>统计</small>
      </b-nav-item>
    </b-nav>
</div>
</template>

<script>
export default {
  data() {
    return {
      list: ["衣", "食", "行"],
      name: '',
      nameState: null,
    };
  },
  mounted() {
    this.list = JSON.parse(localStorage.getItem("tags"));
  },
  methods: {
    editTag(index) {
      this.$router.push({ path: "/edit", query: { id: index } });
    },
    // click() {
    //   var length=this.list.length;
    //   var flag=true
    //   for(var i=0;i<length;i++){
    //     if(this.message===this.list[i])
    //     {
    //       this.message='标签已存在'
    //       flag=false
    //       break
    //     }
    //   }
    //   if (message&&flag===true) {
    //     this.list.push(message);
    //     window.localStorage.setItem("tags", JSON.stringify(this.list));
    //     // 滑轮滑到底部
    //     window.scrollTo(9999999, 9999999)
    //   }
    // }

      checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.nameState = valid
        return valid
      },
      resetModal() {
        this.name = ''
        this.nameState = null
      },
      handleOk(bvModalEvt) {
        // Prevent modal from closing
        bvModalEvt.preventDefault()
        // Trigger submit handler
        this.handleSubmit()
      },
      handleSubmit() {
        // Exit when the form isn't valid
        if (!this.checkFormValidity()) {
          return
        }
        // Push the name to submitted names
        this.list.push(this.name)
        window.localStorage.setItem("tags", JSON.stringify(this.list));
        // Hide the modal manually
        this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-closing')
        })
      }
    }
};
</script>

<style scoped >
.tagstyle {
  padding-bottom: 120px;
}
#inputstyle {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.addnewtag{
  display:flex;
  justify-content:center;
  margin-top: 30px;
}
</style>