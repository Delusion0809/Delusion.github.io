$(function () {
    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'
          ],
        samePwd:function(value){
            if(value===$('[name=oldPwd]').val()){
                return '新旧密码不能相同'
            }
        },
        repwd:function(value){
            if(value!==$('[name=newPwd]').val()){
                return '两次密码不一致' 
            }
        }
    })

    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'post',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success:function(res){
                console.log(res);
                if(res.status!==0){
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新用户信息成功！')

                // 调用父页面中的方法，重新渲染头像和信息
                
                // window代表当前所在的iframe页面
                // window.parent即为父页面index.html
                window.parent.getUserInfo()
            }
        })
    })
})