fetchorder();

var id = '';
var customerid = '';
var customer   = '';
var viewurl    = '';
var orderlineordernumber = '';
var ordernumber = ''; 
var orderlinenumber = '';
var productid = '';
var productname = '';
var productcode = '';

        function deleteorder(oid){
            let url = '/order/deleteorder/'+oid
            axios.get(url).then((response) => {
                let data = response.data
            })
            window.location.reload()
        }

        function editorder(oid){
            $('.save').hide();
            $('.update').show();
            $('.modal').show();
            $('.modal-title').text('Edit Order') ;
            let url = '/order/fetchsingleorder/'+oid
            axios.get(url).then((response) => {
                let data = response.data
                var order = data.orders[0]
                $('#id').val(order.id);
                $('#ordernumber').val(order.ordernumber);
                $('#customer').val(order.customer);
                $('#customerid').val(order.customerid);
                customer = order.customer;
                ordernumber = order.ordernumber;
                customerid = order.customerid;
                id = order.id;
            })
        }

        function hidemodal(){
            $('.modal').hide();
            window.location.reload();
        }

        function fetchorder(){
            console.log('id'+id);
            let url = '/order/fetchsingleorder/'+id
            axios.get(url).then((response) => {
                let data = response.data
                var order = data.orders[0]
                $('#id').val(order.id);
                $('#ordernumber').val(order.ordernumber);
                $('#customer').val(order.customer);
                $('#customerid').val(order.customerid);
                customerid = order.customerid;
                customer   = order.customer;
                ordernumber = order.ordernumber; 
            })
            $('.order').show();
            $('.orderline').hide();
            $('.fetch').hide();
            $('.update').show();            
        }

        function addorder(){
            $('#id').val('');
            $('#ordernumber').val('');
            $('#customer').val('');
            $('#customerid').val('');
            $('.modal-title').text('Add Order');
            $('.save').show();
            $('.update').hide();
            $('.modal').show();
        }

        function saveorder(){
            if($('#ordernumber').val() && $('#customerid').val()){
                let curl = '/customer/fetchsinglecustomer/'+$('#customerid').val()
                axios.get(curl).then((response) => {
                    let data = response.data
                    var customer    = data.customers[0]
                    customer = customer.customername
                    let url = '/order/saveorder'
                    let body =  {
                        'ordernumber'    : $('#ordernumber').val(),
                        'customer'       : customer,
                        'customerid'     : $('#customerid').val(),
                    }
                    axios.post(url, body).then((response) => {
                        let data = response.data;
                        $('#id').val(data.id);
                        id = data.id;
                    })
                })
            }
            customerid = $('#customerid').val();
            ordernumber = $('#ordernumber').val();
            $('.order').hide();
            $('.orderline').show();
            $('.save').hide();
            $('.fetch').show();
            $('.modaltitle').text('Add Order Line');
        }

        function updateorder(){ 
            if($('#ordernumber').val() && $('#customerid').val()){
                let curl = '/customer/fetchsinglecustomer/'+$('#customerid').val()
                axios.get(curl).then((response) => {
                    let data = response.data
                    var customer    = data.customers[0]
                    customer   = customer.customername
                    let url = '/order/editorder'
                    let body =  {
                    'id'             : $('#id').val(),
                    'ordernumber'    : $('#ordernumber').val(),
                    'customer'       : customer,
                    'customerid'     : $('#customerid').val(),
                }
                ordernumber = $('#ordernumber').val();
                axios.post(url, body).then((response) => {
                    let data = response.data
                    let url = '/order/fetchorderlinesbyord/'+ordernumber
                    axios.get(url).then((response) => {
                        let data = response.data
                        $(".orderlinestbody").empty();
                        var row = '';
                        var tr = '';
                        $.each(data.orderlinelist, function(key,inv){
                        tr = '<tr >'+  
                            '<td>'+inv.id+'</td>'+
                            '<td>'+inv.ordernumber+'</td>'+
                            '<td>'+inv.orderlinenumber+'</td>'+
                            '<td>'+inv.productcode+'</td>'+  
                            '<td>'+inv.productname+'</td>'+
                            '<td>'+inv.quantity+'</td>'+
                            '<td>'+inv.price+'</td>'+  
                            '<td><button class="btn btn-outline-danger" onclick="deleteorderline('+inv.id+')">'+
                                    '<img src="/static/assets/trash3.svg" class="text-white" >'+
                                    'Delete</button></td>'+  
                            '</tr>'   
                        row = row + tr ;
                        })
                        $(".orderlinestbody").append(row);
                        })
                        })
                    })
            }
            $('.order').hide();
            $('.orderline').show();
            $('.update').hide();
            $('.fetch').show();
            $('.modal-title').text('Edit Order Line');
            
        }
        
        $('#customerid').on('change',function(){
            customerid = $('#customerid').val();
        })

        $('#productid').on('change',function(){
            productid = $('#productid').val();
        })

        function vieworderline(oid){
            viewurl = "vieworderlines/"+oid
            window.location.href = viewurl 
        }

        function editorderline(oid){
            viewurl = "orderlines/"+oid
            window.location.href = viewurl
        }

    function saveorderline(){
            if(ordernumber && $('#orderlinenumber').val() && productid && 
            $('#quantity').val() && $('#price').val()){
                    let url = '/product/fetchsingleproduct/'+productid
                    axios.get(url).then((response) => {
                        let data = response.data
                        var product = data.products[0]
                        productid            = product.id
                        productname          = product.name
                        productcode          = product.code
                        let ourl = '/order/saveorderline'
                        let body =  {
                            'ordernumber'     :   $('#ordernumber').val(),
                            'orderlinenumber' :   $('#orderlinenumber').val(),
                            'productcode'     :   productcode,
                            'productname'     :   productname,
                            'customerid'      :   customerid,
                            'productid'       :   productid,
                            'quantity'        :   $('#quantity').val(),
                            'price'           :   $('#price').val(),
                        }
                        axios.post(ourl, body).then((response) => {
                            let data = response.data
                            let url = '/order/fetchorderlinesbyord/'+$('#ordernumber').val()
                            axios.get(url).then((response) => {
                                let data = response.data                                
                                $(".orderlinestbody").empty();
                                var row = '';
                                var tr = '';
                                $.each(data.orderlinelist, function(key,inv){
                                tr = '<tr >'+  
                                    '<td>'+inv.id+'</td>'+
                                    '<td>'+inv.ordernumber+'</td>'+
                                    '<td>'+inv.orderlinenumber+'</td>'+
                                    '<td>'+inv.productcode+'</td>'+  
                                    '<td>'+inv.productname+'</td>'+
                                    '<td>'+inv.quantity+'</td>'+
                                    '<td>'+inv.price+'</td>'+  
                                    '<td><button class="btn btn-outline-danger" onclick="deleteorderline('+inv.id+')">'+
                                            '<img src="/static/assets/trash3.svg" class="text-white" >'+
                                            'Delete</button></td>'+  
                                    '</tr>'   
                                row = row + tr ;
                                })
                                $(".orderlinestbody").append(row);
                            })
                        })
                    })
                
            }
        }

    function deleteorderline(oid){
            let url = '/order/deleteorderline/'+oid
            axios.get(url).then((response) => {
                let data = response.data
                let url = '/order/fetchorderlinesbyord/'+ordernumber
                axios.get(url).then((response) => {
                    let data = response.data
                    $(".orderlinestbody").empty();
                    var row = '';
                    var tr = '';
                    $.each(data.orderlinelist, function(key,inv){
                    tr = '<tr >'+  
                        '<td>'+inv.id+'</td>'+
                        '<td>'+inv.ordernumber+'</td>'+
                        '<td>'+inv.orderlinenumber+'</td>'+
                        '<td>'+inv.productcode+'</td>'+  
                        '<td>'+inv.productname+'</td>'+
                        '<td>'+inv.quantity+'</td>'+
                        '<td>'+inv.price+'</td>'+  
                        '<td><button class="btn btn-outline-danger" onclick="deleteorderline('+inv.id+')">'+
                                '<img src="/static/assets/trash3.svg" class="text-white" >'+
                                'Delete</button></td>'+  
                        '</tr>'   
                    row = row + tr ;
                    })
                    $(".orderlinestbody").append(row);
                })
            })
        }
        
       
    function fetchorder() {
            let url = '/order/fetchorders'
            axios.get(url).then((response) => {
                let data = response.data
                $(".ordertbody").empty();
                var row = '';
                var tr = '';
                $.each(data.orderlist, function(key,inv){
                
                tr = '<tr >'+  
                    '<td>'+inv.id+'</td>'+
                    '<td>'+inv.ordernumber+'</td>'+
                    '<td>'+inv.customer+'</td>'+
                    '<td>'+inv.date+'</td>'+  
                    '<td><button  class="btn btn-outline-secondary" onclick="vieworderline('+inv.id+','+inv.customerid+')">'+
                            '<img src="/static/assets/eye.svg" class="text-white" >'+
                            'View</button>'+
                        '<button  class="btn btn-outline-secondary" onclick="editorderline('+inv.id+','+inv.customerid+')">'+
                            '<img src="/static/assets/pencil-square.svg" class="text-white" >'+
                            'Edit</button></td>'+
                    '<td><button class="btn btn-outline-secondary" onclick="editorder('+inv.id+')">'+
                            '<img src="/static/assets/pencil-square.svg" class="text-white" >'+
                            'Edit</button></td>'+
                    '<td><button class="btn btn-outline-danger" onclick="deleteorder('+inv.id+')">'+
                            '<img src="/static/assets/trash3.svg" class="text-white" >'+
                            'Delete</button></td>'+  
                    '</tr>'   
                row = row + tr ;

            })
            $(".ordertbody").append(row);
            })
            
            let curl = '/customer/fetchcustomers'
            axios.get(curl).then((response) => {
                let data = response.data;
                $('#customerid').empty();
                var opt = '<option >Please Select Customer</option>';
                var ss  = '';
                $.each(data.customerlist, function(key,inv){
                   ss = '<option value='+inv.id+'>'+inv.customername+'</option>';
                   opt = opt + ss;
                });
                $('#customerid').append(opt);
            })

            let purl = '/product/fetchproducts'
            axios.get(purl).then((response) => {
                let data = response.data;
                $('#productid').empty();
                var opt = '<option >Please Select Product</option>';
                var ss  = '';
                $.each(data.productlist, function(key,inv){
                   ss = '<option value='+inv.id+'>'+inv.name+'</option>';
                   opt = opt + ss;
                });
                $('#productid').append(opt);
            })
            $('.orderline').hide();
            $('.fetch').hide();
    }   

