<template>
  <div>
    <div class="record" id="record">
      <b-alert
        class="successAlert"
        :show="dismissCountDown"
        dismissible
        variant="success"
        @dismissed="dismissCountDown=0"
        @dismiss-count-down="countDownChanged"
      >记账成功</b-alert>

      <div>
        <ul v-for="(item, index) of list" :key="index" class="ulstyle">
          <li
            @click="everytag(item)"
            :class="{ biaostyle: item.isactive, biaotwostyle: item.isactive2 }"
          >{{ item.content }}</li>
        </ul>
      </div>
      <div>
        <b-form-input v-model="text" placeholder="备注"></b-form-input>
      </div>
      <div>
        <div>
          <b-tabs content-class="mt-3" justified>
            <b-tab title="支出" @click="tab_in = false" active>
              <div class="wallet">
                <b-icon icon="wallet"></b-icon>
                <span style="float:right">{{ input_num }}</span>
              </div>
            </b-tab>
            <b-tab title="收入" @click="tab_in = true">
              <div class="wallet">
                <b-icon icon="wallet"></b-icon>
                <span style="float:right">{{ input_num }}</span>
              </div>
            </b-tab>
          </b-tabs>
        </div>
      </div>
      <div>
         <div>
           <b-button-group>
              <b-button @click="input(1)" squared class="num-button" variant="info">1</b-button>
              <b-button @click="input(2)" squared class="num-button" variant="info">2</b-button>
              <b-button @click="input(3)" squared class="num-button" variant="info">3</b-button>
              <b-button @click="del()" squared class="num-button" variant="info">删除</b-button>
              </b-button-group>
           <b-button-group>
              <b-button @click="input(4)" squared class="num-button" variant="info">4</b-button>
              <b-button @click="input(5)" squared class="num-button" variant="info">5</b-button>
              <b-button @click="input(6)" squared class="num-button" variant="info">6</b-button>
              <b-button @click="clear()" squared class="num-button" variant="info">清空</b-button>
           </b-button-group>
           <b-button-group>
              <b-button @click="input(7)" squared class="num-button" variant="info">7</b-button>
              <b-button @click="input(8)" squared class="num-button" variant="info">8</b-button>
              <b-button @click="input(9)" squared class="num-button" variant="info">9</b-button>
              <b-button @click="pushmoney()" squared class="num-button-ok" variant="info">OK</b-button>
           </b-button-group>
           <b-button-group>
              <b-button @click="input(0)" squared class="num-button-zero" variant="info">0</b-button>
               <b-button @click="add_point()" squared class="num-button" variant="info">.</b-button>
           </b-button-group>
          </div>
      </div>
    </div>
    <b-nav justified class="bg-light fixed-bottom">
      <b-nav-item>
        <b-icon icon="plus-circle-fill"></b-icon>
        <br />
        <small>记账</small>
      </b-nav-item>
      <b-nav-item @click="$router.push({ path: '/tag' })">
        <b-icon icon="tag"></b-icon>
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
      input_num: "0",
      point: false,
      tag: ["衣", "食", "行"],
      income: "",
      outcome: "",
      text: "",
      list: "",
      tab_in: false,
      choosetag: [],
      // 记账成功后b-alert时间
      dismissSecs: 3,
      dismissCountDown: 0
    };
  },
  mounted() {
    var tags = localStorage.getItem("tags");
    var list = null;
    
    if (tags === undefined || tags === null) {// 如果 localStorage 不存在tags
      list = this.tag;
      window.localStorage.tags = JSON.stringify(list);
    } else {
      list = JSON.parse(tags);
    }
    var length = list.length;
    for (var i = 0; i < length;i++) {
      var temp = list[i];
      list[i] = {
        isactive: true, // 代表初始样式
        isactive2: false,
        content: temp
      };
    }
    this.list = list;
    window.scrollTo(0, 400);
  },
  methods: {
    input(num) {
      // 如果是刚开始输入
      if (this.input_num === "0") {
        this.input_num = num+'';
      } else {
        this.input_num += num;
      }
    },
    // 点击小数点时
    add_point() {
      // 如果没有点过小数点
      if (!this.point) {
        this.point = true;
        this.input_num += ".";
      }
    },
    // 清空
    clear() {
      this.input_num = "0";
      this.point = false;
    },
    // 回删
    del() {
      var length = this.input_num.length;
      if (this.input_num.charAt(length - 1) === ".") {
        this.point = false;
      }
      this.input_num = this.input_num.substr(0, this.input_num.length - 1);
    },
    // 用于b-alert success
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },

    pushmoney() {
      if(this.input_num === "0") {
        return
      }
      var pointlast = this.input_num.indexOf(".");
      var length = this.input_num.length;
      var result = this.input_num.substr(pointlast + 1, length);
      var plength = result.length;
      if (plength > 2 && pointlast !== -1) {
        alert("请输入正确金额");
        this.input_num = "0";
        return;
      } else {
        this.income = parseFloat(this.input_num);
        this.point = false;
      }
      //将每个tag标签转换为未点击状态，并更新界面
      var listlength = this.list.length;
      for (var j = 0; j < listlength; j++) {
        this.list[j].isactive = true;
        this.list[j].isactive2 = false;
      }
      // 读取数据并转换成json格式
      var json = {};
      json.tags = this.choosetag;
      json.remark = this.text;
      json.money = this.input_num;
      let date = new Date();
      json.date = this.dateFormat("YYYY-mm-dd", date);
      // window.localStorage.income.clear()
      if (this.tab_in === true && this.input_num !== "0") {
        // 如果第一次记账
        var incomeArray = [];
        if (window.localStorage.inmoney === undefined) {
          incomeArray = [json];
          window.localStorage.inmoney = JSON.stringify(incomeArray);
        } else {
          // 添加到后面
          incomeArray = JSON.parse(window.localStorage.inmoney);
          incomeArray.push(json);
          window.localStorage.inmoney = JSON.stringify(incomeArray);
        }
        this.choosetag = [];
      } else if (this.tab_in === false && this.input_num !== "0") {
        // 如果第一次记账
        var outputArray = [];
        if (window.localStorage.output === undefined) {
          outputArray = [json];
          window.localStorage.output = JSON.stringify(outputArray);
        } else {
          // 添加到后面
          outputArray = JSON.parse(window.localStorage.output);
          outputArray.push(json);
          window.localStorage.output = JSON.stringify(outputArray);
        }
      }
      this.input_num = "0";
      this.choosetag = [];
      this.showAlert();
    },
    everytag(item) {
      item.isactive = !item.isactive;
      item.isactive2 = !item.isactive2;
      if (item.isactive2 === true) {
        //如果便签选中那么总标签加起来，否则未选中删除
        this.choosetag.push(item.content);
      } else if (item.isactive2 === false) {
        var itemText = item.content
        var delItemIndex = this.choosetag.indexOf(itemText) 
        // console.log(delItemIndex)
        this.choosetag.splice(delItemIndex,1)
        // this.choosetag.pop(item.content);
      }
    },
    // 日期格式转换
    dateFormat(fmt, date) {
      let ret;
      const opt = {
        "Y+": date.getFullYear().toString(), // 年
        "m+": (date.getMonth() + 1).toString(), // 月
        "d+": date.getDate().toString(), // 日
        "H+": date.getHours().toString(), // 时
        "M+": date.getMinutes().toString(), // 分
        "S+": date.getSeconds().toString() // 秒
      };
      for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
          fmt = fmt.replace(
            ret[1],
            ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
          );
        }
      }
      return fmt;
    }
  }
};
</script>

<style>

.record {
  padding-bottom: 60px;
  padding-top: 215px;
}
.btn-group{
  width: 100%;
  height: 64px;
}
.btn-group3{
   width: 70%;
  height: 64px;
}
/* .num-button {
  width: 25%;
  height: 64px;
  padding-top: 0px;
}
.num-button-zero {
  width: 50%;
  height: 64px;
  padding-top: 0px;
}
.num-button-ok {
  width: 25%;
  height: 128px;
  float: right;
} */
.input-num {
  text-align: right;
}
.biaostyle {
  color: aliceblue;
  background-color: rgb(191, 191, 191);
  border-radius: 5rem;
  align-items: flex-start;
}
.ulstyle {
  display: flex;
  /* justify-content: space-between; */
  flex-direction: row;
  flex-wrap: nowrap;
  display: inline-block;
  list-style: none;
}
.biaotwostyle {
  background-color: rgb(117, 93, 93);
  border: 2rem;
  border: 2rem;
  border-radius: 5rem;
  align-items: flex-start;
}
.wallet{
  display: flex;
  justify-content: space-between;
}
</style>