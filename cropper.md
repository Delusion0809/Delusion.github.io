cropper������������:

(1)
    <script src="/assets/lib/jquery.js"></script>
    <script src="/assets/lib/cropper/Cropper.js"></script>
    <script src="/assets/lib/cropper/jquery-cropper.js"></script>

(2)
    <link rel="stylesheet" href="/assets/lib/cropper/cropper.css">

(3)
    <div class="row1">
                <!-- ͼƬ�ü����� -->
                <div class="cropper-box">
                    <!-- ��� img ��ǩ����Ҫ�������������ʼ��Ϊ�ü����� -->
                    <img id="image" src="/assets/images/sample.jpg" />
                </div>
                <!-- ͼƬ��Ԥ������ -->
                <div class="preview-box">
                    <div>
                        <!-- ���Ϊ 100px ��Ԥ������ -->
                        <div class="img-preview w100"></div>
                        <p class="size">100 x 100</p>
                    </div>
                    <div>
                        <!-- ���Ϊ 50px ��Ԥ������ -->
                        <div class="img-preview w50"></div>
                        <p class="size">50 x 50</p>
                    </div>
                </div>
            </div>

            <!-- �ڶ��еİ�ť���� -->
            <div class="row2">
                <!-- ͨ��accept���ԣ�����ָ���������û�ѡ��ʲô���͵��ļ� -->
                <input type="file" id="file" accept="image/png,image/jpeg">
                <button type="button" class="layui-btn" id="btnChooseImage">�ϴ�</button>
                <button type="button" class="layui-btn layui-btn-danger" id="btnUpload">ȷ��</button>
            </div>

(4)
    $(function () {
        // 1.1 ��ȡ�ü������ DOM Ԫ��(��ĳ��ͼƬ��ʼ��Ϊ�ü�����)
        var $image = $('#image')
        // 1.2 ����ѡ��
        const options = {
            // �ݺ��
            aspectRatio: 1,
            // ָ��Ԥ������
            preview: '.img-preview'
        }
    
        // 1.3 �����ü�����
        $image.cropper(options)
    
    })