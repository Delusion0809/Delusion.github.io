$(function(){
    $.ajaxPrefilter(function(options){
        // 统一拼接ajax请求时的url地址
        options.url='http://www.liulongbin.top:3007'+options.url
         
        // 统一为有权限的接口,设置headers请求头
        //   indexof查找指定字符串中是否存在查找值，如不存在则返回-1
          if(options.url.indexOf('/my')!==-1){
            options.headers={
                Authorization:localStorage.getItem('token') || ''
            }
          }

        // *****控制用户的权限******

          //全局统一挂载complete回调函数
          options.complete=function(res){
            // 在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
            if(res.responseJSON.status===1 && res.responseJSON.message==='身份认证失败！'){
                // 1.强制清空token
                localStorage.removeItem('token')
                // 2.强制跳转到登录页面
                location.href='/login.html'
            }
          }
       
    })

})