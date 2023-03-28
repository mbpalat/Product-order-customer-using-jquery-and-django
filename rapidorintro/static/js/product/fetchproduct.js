
    fetchproducts();


    $('.hidemodal').on('click',function(){
        hidemodal();
    })
    

    function deleteproduct(cid){
            let url = '/product/deleteproduct/'+cid
                axios.get(url).then((response) => {
                let data = response.data
                })
                window.location.reload()
        }

    function editproduct(cid){
            $('.save').hide();
            $('.update').show();
            $('.modal').show();
            $('.modal-title').text('Edit Product'); 
            let url = '/product/fetchsingleproduct/'+cid
            axios.get(url).then((response) => {
                let data = response.data
                var product = data.products[0]
                $('#id').val(product.id);
                $('#name').val(product.name);
                $('#code').val(product.code);
                $('#unit').val(product.unit);
                $('#price').val(product.price);
                $('#tax').val(product.tax);
                $('#percent').val(product.percent);
            })
        }

    function hidemodal(){
            $('.modal').hide();
        }

    function addproduct(){
        $('#id').val('');
        $('#name').val('');
        $('#code').val('');
        $('#unit').val('');
        $('#price').val('');
        $('#tax').val('');
        $('#percent').val('');
        $('.modal-title').text('Add Product');
            $('.save').show();
            $('.update').hide();
            $('.modal').show();
        }

    function saveproduct(){
            if($('#name').val() && $('#code').val() && $('#unit').val() &&
                $('#price').val() && $('#tax').val() && $('#percent').val()){
                let url = '/product/saveproduct'
                let body =  {
                    'name'       : $('#name').val(),
                    'code'       : $('#code').val(),
                    'unit'       : $('#unit').val(),
                    'price'      : $('#price').val(),
                    'tax'        : $('#tax').val(),
                    'percent'    : $('#percent').val(),
                }
                axios.post(url, body).then((response) => {
                    let data = response.data
                })
            }
            $('.modal').hide();
            window.location.reload()
        }

    function updateproduct(){ 
        if($('#name').val() && $('#code').val() && $('#unit').val() &&
            $('#price').val() && $('#tax').val() && $('#percent').val()){
                let url = '/product/editproduct'
                let body =  {
                    'id'         : $('#id').val(),
                    'name'       : $('#name').val(),
                    'code'       : $('#code').val(),
                    'unit'       : $('#unit').val(),
                    'price'      : $('#price').val(),
                    'tax'        : $('#tax').val(),
                    'percent'    : $('#percent').val(),
                }
                axios.post(url, body).then((response) => {
                    let data = response.data
                })
            }
            $('.modal').hide();
            window.location.reload()
        }
    

    function fetchproducts() {
            let url = '/product/fetchproducts'
            axios.get(url).then((response) => {
                let data = response.data
                this.products = data.productlist
                $(".producttbody").empty();
                var row = '';
                var tr = '';
                let dataproduct = response.data;
                $.each(dataproduct.productlist, function(key,inv){
                tr = '<tr>'+
                    '<td>'+inv.id +'</td>'+
                    '<td>'+inv.name +'</td>'+
                    '<td>'+inv.code +'</td>'+
                    '<td>'+inv.unit +'</td>'+
                    '<td>'+inv.price +'</td>'+
                    '<td>'+inv.tax +'</td>'+
                    '<td>'+inv.percent +'</td>'+
                    '<td><button class="btn btn-outline-secondary " onclick="editproduct('+inv.id+')" >'+
                        '<img src="/static/assets/pencil-square.svg" %}" >     '+
                        'Edit</button></td>'+
                    '<td><button class="btn btn-outline-danger" onclick="deleteproduct('+inv.id+')" >'+
                        '<img src="/static/assets/trash3.svg" class="text-white" >    '+
                        'Delete</button></td>'+
                    '</tr>'
                row = row + tr ;
            })
            $(".producttbody").append(row);
            })
    }
    

