import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //请求的所有数据
    data: {},
    //全屏遮罩显示
    isMark: false,
    //购物车遮罩显示
    isShopShow: false,
    //购买列表
    buyList:[]
  },
  getters: {
    //商品总价
    allPrice: (state, getters) => {
      let all = 0;
      state.buyList.forEach(item=>{
        all += item.price * item.count;
      });
      return all;
    },
    //各商品数量
    buyListCount: (state, getters) => {
      let countObj = {};
      state.buyList.forEach(item => {
        countObj[item.goodsName] = item.count;
      });
      return countObj;
    }
  },
  mutations: {
    //初始请求所有数据
    getData (state, payload) {
      state.data = payload;
    },
    //改变遮罩显示
    changeMark(state, payload) {
      state.isMark =  payload;
    },
    /*
    * 增加购买商品项
    */
    addProduct(state, payload){
      // payload = {
      //   goodsName: 'xxx',
      //   price: 112,
      // }
      for(let i=0; i<state.buyList.length; i++){
        //购物车已存在该商品，增加个数
        if(state.buyList[i]['goodsName'] == payload.goodsName){
          state.buyList[i].count = state.buyList[i].count + 1;
          return ;
        };
      };
      //购物车还不存在该商品
      state.buyList.push({
        goodsName: payload.goodsName,
        price: payload.price,
        count: 1,
      });
    },
    /*
    * 减少购买商品项
    */
    decreaseProduct(state, payload){
      for(let i=0; i<state.buyList.length; i++){
        //减少商品个数
        if(state.buyList[i]['goodsName'] == payload.goodsName){
          state.buyList[i].count = state.buyList[i].count - 1;
          //个数为 0时，就从buyList中清除掉
          if(state.buyList[i].count == 0){
            state.buyList.splice(i,1);
          };
          return ;
        };
      };
    },
    //每项商品的个数的集合
    getGoodsCount(state, payload){
        let a = state.buyList.filter(item=>{
            return item.name == payload;
        });
        if(a.length != 0){
            return a[0].count;
        }else{
            return 0;   
        }
    },
    //底部购物车显示与否
    changeShopShow(state){
      state.isShopShow = !state.isShopShow;
    },
    //清空购物车
    clearBuyList(state){
      state.buyList = [];
      state.isShopShow = false;
    }
  },
  actions: {
    //提交订单
    uploadOrder ({ dispatch, commit, state, getters }, payload) {
      alert("商品总价："+getters.allPrice*1);
      alert("配送费："+state.data.seller.deliveryPrice*1);
      alert("总计："+(state.data.seller.deliveryPrice*1+getters.allPrice*1));
    }
  },
  
  strict: process.env.NODE_ENV != 'production'
})