export const request=(params)=>{
    wx.showLoading({
        title: '加载中',
      })
    let ajaxTime=0;
    const BaseUrl="https://api-hmugo-web.itheima.net/api/public/v1";
    return new Promise((resolve,reject)=>{
        ajaxTime++;
        wx.request({
           ...params,
           url:BaseUrl+params.url,
            success:(result)=>{
                resolve(result.data.message);
            },
            fail:(err)=>{
                reject(err);
            },
            complete:()=>{
                ajaxTime--;
                //请求次数为0时，提示框消失
                if(ajaxTime===0){
                    wx.hideLoading();      
                }
                else{
                    
                }
                   
            }
          })    
    })
}   