// pages/category/index.js
import {request} from "../../request/index.js";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        categoryLeftList:[],
        categoryRightList:[],
        currentIndex:0,
        scrollTop:1,
    },

    categoryList:[],


    /**
     * 生命周期函数--监听页面加载
     */  
    onLoad: function (options) {
        /*
        1.判断本地存储是否有的旧的数据
        {time:date.now(),data:[...]}
        2.不存在就发送请求
        3.有旧的数据，且没有过期，就使用本地的数据。
        */
        const Cates=wx.getStorageSync('cates');
        if(!Cates){
            this.getcategoryList();
        }else{
            if(Date.now-Cates.time>1000*10){
                this.getcategoryList();
            }else{
                //把旧数据存放进categoryList中
                this.categoryList=Cates.data;
                let LeftMenuList=this.categoryList.map(v=>v.cat_name);
                let RightMenuList=this.categoryList[0].children;
                this.setData({       
                    //左侧菜单栏数据     
                    categoryLeftList:LeftMenuList,
                    //右侧内容数据   
                    categoryRightList:RightMenuList,
                    scrollTop:0  
                    })
            }
        }
       
    },
    //获取分类页面的数据   
    async getcategoryList(e){
    //     request({url:"/categories"})
    //     .then(result=>{  
    //             this.categoryList=result;
    //             //把接口的数据存入本地存储中
    //             wx.setStorageSync('cates', {time:Date.now(),data:this.categoryList})
    //             let LeftMenuList=this.categoryList.map(v=>v.cat_name);
    //             let RightMenuList=this.categoryList[0].children;
               
    //         this.setData({  
    //         //左侧菜单栏数据  
    //         categoryLeftList:LeftMenuList,
    //         //右侧内容数据   
    //         categoryRightList:RightMenuList   
    //         })
    //     });
               const result=await request({url:"/categories"});
                this.categoryList=result;
                //把接口的数据存入本地存储中
                wx.setStorageSync('cates', {time:Date.now(),data:this.categoryList})
                let LeftMenuList=this.categoryList.map(v=>v.cat_name);
                let RightMenuList=this.categoryList[0].children;
               
            this.setData({  
            //左侧菜单栏数据  
            categoryLeftList:LeftMenuList,
            //右侧内容数据   
            categoryRightList:RightMenuList   
            })
    },    

    //左侧菜单栏点击事件
    handleItemTap(e){
        /*
        1.通过点击事件获取索引
        2.赋值给data中的currentindex
        3.根据不同的索引来渲染右侧的内容
        */
        const index=e.target.dataset.currentindex;
        this.setData({
                //  currentIndex:e.target.dataset.currentindex
                currentIndex:index
        })
        let RightMenuList=this.categoryList[index].children
        this.setData({
        categoryRightList:RightMenuList 
        
        })
    }   

})