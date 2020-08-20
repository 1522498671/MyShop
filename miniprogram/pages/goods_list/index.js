// pages/goods_list/index.js
//商品列表页面
import {request} from "../../request/index.js"
Page({

    /**
     * 页面的初始数据
     */  
    data: {
        tabs:[
            { 
                 id:0,
                name:'综合',
                isActive:true
            },
            { 
                id:1,
               name:'销量',
               isActive:false
           },
           { 
            id:2,
           name:'价格',
           isActive:false
           }
        ],
        goodsListLeft:[],   
        goodsListmoddile:[],
        goodsListRight:[], 
       //商品总条数
         
    },
        //定义商品列表的请求参数
         queryParms:{
            query:'',
            cid:'',
            pagenum:1,
            pagesize:10
           
         },
         //定义商品总页数
         totalPage:'',
    onLoad:function(options){
       const {query}=options;
       this.queryParms.query=query;
        this.getgoodsListLeft();
    },
    //用户下拉刷新事件
    onPullDownRefresh(){
        this.setData({
            goodsListLeft:[],
        }),
        this.queryParms.pagenum=1;
        this.getgoodsListLeft();
    },
    onReachBottom:function(){
            if(this.queryParms.pagenum>=this.totalPage){
                wx.showToast({
                    title: '到底了没有更多数据了',
                    icon: 'success',
                    duration: 2000
                  })
            }else{
                this.queryParms.pagenum++;
                this.getgoodsListLeft();
            }
         

      
    },
    handleTapItemChange(e){
        const {index}=e.detail;
        let {tabs}=this.data;
        tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
        this.setData({
            tabs:tabs
        })
    },
    async getgoodsListLeft(){
        const result=await request({url:"/goods/search",data:this.queryParms});
        // console.log(result);
        this.setData({
            goodsListLeft:[...this.data.goodsListLeft,...result.goods]
        })
        const totalPage=Math.ceil(result.total/this.queryParms.pagesize);
        this.totalPage=totalPage;  
        if(result.total===0){
            wx.showToast({
                title: '该商品没有数据',
                icon: 'success',
                duration: 2000
              });
        }
        //在请求结束之后停止刷新
        wx.stopPullDownRefresh();
    }



})