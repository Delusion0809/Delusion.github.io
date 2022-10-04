$(function(){
    var layer=layui.layer
    var form=layui.form
    // 定义加载文章分类的方法
    initCate()
    initEditor()

    function initCate(){
        $.ajax({
            method:'get',
            url:'/my/article/cates',
            success:function(res){
                if(res.status!==0){
                    return layer.msg('初始化文章分类失败！')
                }
                console.log(res);
                //调用模板引擎，渲染分类的下拉菜单
                var htmlstr=template('tpl-cate',res)
                $('[name=cate_id]').html(htmlstr)
                form.render() 
            }
        })
    }

    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域 
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)


    $('#btnChooseImage').on('click',function(){
        $('#coverFile').click()
    })

    // 监听coverFile的change事件，获取用户选择的文件
    $('#coverFile').on('change',function(e){
        console.log(e.target.files[0])
        // 获取到文件的列表数组
        var files=e.target.files
        // 判断用户是否选择了文件
        if(files.length===0){
            return 
        }
        // 根据文件，创建对应的URL地址
        var newImgURL=URL.createObjectURL(files[0])
        console.log(newImgURL)
        // 为裁剪区域重新设置图片
        $image
            .cropper('destroy')
            .attr('src',newImgURL)
            .cropper(options)

    })

    // 定义文章的发布状态
    var art_state='已发布'
    
    // 为存为草稿按钮，绑定单击事件处理函数
    $('#btnSave2').on('click',function(){
        art_state='草稿'
    })

    // 为表单绑定Submit提交事件
    $('#form-pub').on('submit',function(e){
        // 1.阻止表单的默认提交行为
        e.preventDefault()
        // 2.基于form表单，快速创建一个FormData对象
        var fd=new FormData($(this)[0])
        // 将文章的发布状态，存到fd中
        fd.append('state',art_state)
        // 将封面裁剪过后的图片，输出为一个文件对象
        $image
            .cropper('getCroppedCanvas',{
                width:400,
                height:200
            })
            .toBlob(function(blob){
                // 将Canvas画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                // 将文件对象，存储到fd中
                fd.append('cover_img',blob)

                // 发起ajax数据请求
                publishArticle(fd)
            })
    })

    // 定义一个发布文章的方法
    function publishArticle(fd){
        $.ajax({
            method:'post',
            url:'/my/article/add',
            data:fd,
            // 注意：如果向服务器提交的是FormData格式的数据，必须添加两个配置项
            contentType:false,
            processData:false,
            success:function(res){
                console.log(res)
                if(res.status!==0){
                    return layer.msg('发布文章失败！')
                }
                layer.msg('发布文章成功！')
                // 发布文章成功后，跳转文章列表页面
                location.href='/article/article_list.html'
            }
            
        })
    }
})