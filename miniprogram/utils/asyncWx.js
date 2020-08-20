export const getSetting=()=>{
  return new Promise((resolve,reject)=>{
    wx.getSetting({
    success:(result)=>{
      resolve(result)
    },
    fail:(err)=>{
      reject(err)
    }
    });
  });
}   

export const chooseAddress=()=>{
  return new Promise((resolve,reject)=>{
    wx.chooseAddress({
    success:(result)=>{
      resolve(result);
    },
    fail:(err)=>{
      reject(err)
    },
    })
  });
}
export const openSetting=()=>{
  
  return new Promise((resolve,reject)=>{
    wx.openSetting({
    success:(result)=>{
      resolve(result);
    },
    fail:(err)=>{
      reject(err)
    }
  })
  });
}
/** 
 * promise 形式 showModel
 * @param {object} 
*/
export const showModal=({content})=>{
  return new Promise((resolve,rejcet)=>{
    wx.showModal({  
      title:'提示',    
      content:content,  
      success:(res)=>{   
        resolve(res)
      },
      fail:(err)=>{
        rejcet(err)
      }
    })
  });
}
export const login=()=>{
  return new Promise((resolve,reject)=>{
    wx.login({
      timeout:10000,
      success: (result)=>{
          resolve(result)
      },
      fail: (err)=>{
        reject(err)
      },
      complete: ()=>{}
  });

  })
}