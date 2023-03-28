
        fetchOrder();

        var id = '';
        var ordernumber = '';  
        var orderlinenumber = ''; 
        var productcode = ''; 
        var productname = '';  
        var customerid = ''; 
        var date = ''; 
        var productid = '';  
        var quantity = ''; 
        var price = '';

        function deleteorderline(oid){
            let url = '/order/deleteorderline/'+oid
            axios.get(url).then((response) => {
                let data = response.data
            })
            window.location.reload()
        }

        function editorderline(cid){
            $('.save').hide();
            $('.update').show();
            $('.modal').show();
            $('.modal-title').text('Edit Order Line');
            let url = '/order/fetchsingleorderline/'+cid
            axios.get(url).then((response) => {
                let data = response.data
                var orderline = data.orderline[0]
                $('#id').val(orderline.id);
                $('#ordernumber').val(orderline.ordernumber);  
                $('#orderlinenumber').val(orderline.orderlinenumber); 
                $('#productcode').val(orderline.productcode); 
                $('#productname').val(orderline.productname);  
                $('#customerid').val(orderline.customerid); 
                $('#date').val(orderline.date); 
                $('#productid').val(orderline.productid);  
                $('#quantity').val(orderline.quantity); 
                $('#price').val(orderline.price); 

                id = orderline.id;
                ordernumber = orderline.ordernumber;  
                orderlinenumber = orderline.orderlinenumber; 
                productcode = orderline.productcode; 
                productname = orderline.productname;  
                customerid = orderline.customerid; 
                date = orderline.date; 
                productid = orderline.productid;  
                quantity = orderline.quantity; 
                price = orderline.price; 
            })
        }

        function hidemodal(){
            $('.modal').hide();
        }

        function addorderline(){
            $('#id').val('') ;
            $('#ordernumber').val();
            $('#orderlinenumber').val('');
            $('#productcode').val('');
            $('#productname').val('');
            $('#customerid').val('');
            $('#date').val('');
            $('#productid').val('');
            $('#quantity').val('');
            $('#price').val('');
            $('#modaltitle').val('Add Order Line');
            $('.save').show();
            $('.update').hide();
            $('.modal').show();
        }

        function saveorderline(){
            if(ordernumber && $('#orderlinenumber').val() && productid && 
            $('#quantity').val() && $('#price').val()){
                    let url = '/product/fetchsingleproduct/'+productid
                    axios.get(url).then((response) => {
                        let data = response.data
                        var product = data.products[0]
                        productid         = product.id
                        productname       = product.name
                        productcode       = product.code
                        let ourl = '/order/saveorderline'
                        let body =  {
                            'ordernumber'     :   ordernumber,
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
                        })
                    })
                
            }
            $('.modal').hide();
            window.location.reload()
        }


        function updateorderline(){ 
            if(ordernumber && $('#orderlinenumber').val() && productid && 
            $('#quantity').val() && $('#price').val()){
                    let url = '/product/fetchsingleproduct/'+productid
                    axios.get(url).then((response) => {
                        let data = response.data
                        var product = data.products[0]
                        productid         = product.id
                        productname       = product.name
                        productcode       = product.code
                        let url = '/order/editorderline'
                        let body =  {
                            'id'              :   id,
                            'ordernumber'     :   ordernumber,
                            'orderlinenumber' :   $('#orderlinenumber').val(),
                            'productcode'     :   productcode,
                            'productname'     :   productname,
                            'customerid'      :   customerid,
                            'productid'       :   productid,
                            'quantity'        :   $('#quantity').val(),
                            'price'           :   $('#price').val(),
                        }
                        axios.post(url, body).then((response) => {
                            let data = response.data
                        })
                    })
            }
            $('.modal').hide();
            window.location.reload()
        }

        function gotoprev(){
            window.location.href = "/order";
        }

        $('#productid').on('change',function(){
            productid = $('#productid').val();
        })

        function fetchOrder() {
            var href = window.location.href;
            var oidslash = href.lastIndexOf('/');
            ordernumber = href.substring(oidslash+1);

            let url = '/order/fetchorderlinesbyord/'+ordernumber
            axios.get(url).then((response) => {
                let data = response.data
                $(".orderlinestbody").empty();
                var row = '';
                var tr = '';
                var count = 0;
                 $.each(data.orderlinelist, function(key,inv){
                    count= key + 1;
                tr = '<tr>'+
                      '<td>'+count+'</td>'+
                    //   '<td>'+inv.ordernumber +'</td>'+
                      '<td>'+inv.orderlinenumber +'</td>'+
                      '<td>'+inv.productcode +'</td>'+
                      '<td>'+inv.productname +'</td>'+
                      '<td>'+inv.quantity +'</td>'+
                      '<td>'+inv.price +'</td>'+
                      '<td><button class="btn btn-outline-secondary " onclick="editorderline('+inv.id+')" >'+
                          '<img src="/static/assets/pencil-square.svg" %}" >     '+
                          'Edit</button></td>'+
                      '<td><button class="btn btn-outline-danger" onclick="deleteorderline('+inv.id+')" >'+
                          '<img src="/static/assets/trash3.svg" class="text-white" >    '+
                          'Delete</button></td>'+
                      '</tr>'

                row = row + tr ;
            })
            $(".orderlinestbody").append(row);
            })

            let curl = '/product/fetchproducts'
            axios.get(curl).then((response) => {
                let data = response.data;
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
            })

            let ourl = '/order/fetchsingleorder/'+ordernumber
            axios.get(ourl).then((response) => {
                let data = response.data
                var order = data.orders[0]
                ordernumber    = order.id
                customerid     = order.customerid
            })
    }
    


