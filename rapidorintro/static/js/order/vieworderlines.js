fetchOrder();

        function gotoprev(){
            window.location.href = "/order";
        }

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
                      '</tr>'

                row = row + tr ;
            })
            $(".orderlinestbody").append(row);
            })

        }

