// pages/auth/index.js
import {request} from "../../request/index.js"
import {login} from "../../utils/asyncWx.js"
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
   
    },    
    async handleGetUserInfo(e){
        const {encryptedData,rawData,iv,signature}=e.detail;
        const {code}=await login();
        const loginParams={encryptedData,rawData,iv,signature,code}
        let token=await request({url:"/users/wxlogin",method:"POST",data:loginParams});
        token=token?token:'BearereyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo'
        wx.setStorageSync("token", token);
        wx.navigateBack({  
            delta:1
        });
    }
    
})