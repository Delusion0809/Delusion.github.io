$(function(){

    var layer=layui.layer
    var form=layui.form
    var laypage = layui.laypage;

     // 定义一个查询的参数对象，将来请求数据的时候需要将请求参数提交到服务器
     var q={
        pagenum:1, //页码值,默认请求第一页的数据
        pagesize:2, //每页显示几条数据，默认每页2条
        cate_id:'', //文章分类的Id
        state:'' //文章的发布状态
    }

    // 定义美化时间的过滤器
    template.defaults.imports.dataFormat=function(data){
        const dt=new Date(data)

        var y=dt.getFullYear()
        var m=padZero(dt.getMonth()+1)
        var d=padZero(dt.getDate())

        var hh=padZero(dt.getHours())
        var mm=padZero(dt.getMinutes())
        var ss=padZero(dt.getSeconds())
        return y+'-'+m+'-'+d+' '+hh+':'+mm+':'+ss
    }

    // 定义补0的函数
    function padZero(n){
        return n>9?n:'0'+n
    }

   

    initTable()
    initCate()

    // 获取文章列表数据的方法
    function initTable(){
        $.ajax({
            method:'get',
            url:'/my/article/list',
            data:q,
            success:function(res){
                console.log(res)
                if(res.status!==0){
                    return layer.msg('获取文章列表失败！')
                }
                layer.msg('获取文章列表成功！')
 
                // 使用模板引擎渲染页面的数据
                var htmlstr=template('tpl-table',res)
                $('tbody').html(htmlstr)
                // 调用渲染分页的方法
                renderPage(res.total)
            }
        })
    }
  

    // 初始化文章分类的方法
    function initCate(){
        $.ajax({
            method:'get',
            url:'/my/article/cates',
            success:function(res){
                console.log(res)
                if(res.status!==0){
                    return layer.msg('获取分类数据失败！')
                }

                // 调用模板引擎渲染分类的可选项
                var htmlstr=template('tpl-cate',res)
                $('[name=cate_id]').html(htmlstr)
                form.render() 
            }
        })
    }

    // 为筛选表单绑定submit事件
    $('#form-search').on('submit',function(e){
        e.preventDefault()
        // 获取表单中选中项的值
        var cate_id=$('[name=cate_id]').val()
        var state=$('[name=state]').val()
        console.log(cate_id)

        // 为查询参数对象q中对应的属性赋值
        q.cate_id=cate_id
        q.state=state 

        // 根据最新的筛选条件，重新渲染表格的数据
        initTable()
    })


    // 定义渲染分页的方法
    function renderPage(total){
        laypage.render({
            elem:'pageBox', //分页容器的Id
            count:total, //总数据条数
            limit:q.pagesize, //每页显示几条数据
            curr:q.pagenum, //设置默认被选中的分页
            layout:['count','limit','prev','page','next','skip'],
            limits:[2,3,5,10],
            // 分页发生切换的时候，触发jump回调
            // 触发jump回调的两种方法
            // 1.点击页码值
            // 2.调用laypage.render()就会自动调用jump()
            jump:function(obj,first){
                // console.log(first) 可以通过first的值来判断是哪种方式触发的jump()回调
                // 把最新的条目数，赋值到q这个查询参数对象的pagesize
                q.pagenum=obj.curr
                q.pagesize=obj.limit
                // 根据最新的q渲染筛选后的表格数据
                if(!first){
                    initTable()
                }
            }
        })
        }

    // 通过代理的形式，为删除按钮绑定点击事件
    $('tbody').on('click','.btn-del',function(){
            // 获取删除按钮的个数
        var len=$('.btn-del').length
        console.log(len)
        var id=$(this).attr('data-id')
        // 询问用户是否要删除数据
        layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
            //do something
            $.ajax({
                method:'get',
                url:'/my/article/delete/'+id,
                success:function(res){
                    if(res.status!==0){
                        return layer.msg('删除文章失败！')
                    }
                    layer.msg('删除文章成功！')
                    // 当数据删除完成后，需要判断当前这一页中，是否还有剩余的数据
                    // 如果没有剩余的数据了，则让页码值-1之后，重新调用initTable()方法
                    if(len===1){
                        // 如果len=1，证明删除完毕之后，页面上没有任何数据了
                        q.pagenum=q.pagenum===1?1:q.pagenum-1
                    }
                    initTable()
                    
                }

            })
            layer.close(index);
          });
    }) 
})