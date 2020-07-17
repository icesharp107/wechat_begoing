
Page({
    data:{
        avactarUrl:'./user-unlogin.png',  //头像图片
        userInfo:[],
        logged:false,      
        takeSession:false,
        requestResult:''
    },
    onLoad:function(){
        if(!wx.cloud){
            wx.redirectTo({ url:'../chooseLib',})
            return
        }
    },
    //获取用户信息--头像
    onGetUserInfo:function(e){
        if(!this.data.logged && e.detail.userInfo){  //没有头像且有用户信息
            this.setDate({
                logged:true,
                avactarUrl:e.detail.userInfo.avactarUrl,
                userInfo:e.detail.userInfo
            })
        }
    },
    // 获取用户id,就是就是调用login云函数，
    onGetOpenid:function(){
        wx.cloud.callFunction({
            name:'login',
            data:{},
            success:res=>{
                console.log('成功会返回用户openid',res.result.openid)
                wx.navigateTo({ url:'../userConsole', })
            },
            fail:err=>{
                console.error('调用云login失败',err)
                wx.navigateTo({ url:'../deployFunctions', })
            }
        })
    },
  //上传图片
    doUpload:function(){
        wx.chooseImage({  //选择图片，数量、类型
            count:1,
            sizeType:['compressed'],
            soureceType:['album','cammera'],
            success:function (res){
                wx.showLoading({ title:'上传中'})

                const filePath = res.temFilePaths[0]

                const cloudPatyh = 'my-image'+filePath.match(/\.[^.]+?$/)[0]
                    //上传图片
                wx.cloud.uploadFile({})

            },
            fail:err=>{ console.log(e) }
        })
    },
})