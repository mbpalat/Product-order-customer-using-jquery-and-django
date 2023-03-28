fetchCustomers();

$(".hidemodal").on('click',function(){
    hidemodal();    
})


function deletecustomer(cid){
    let url = '/customer/deletecustomer/'+cid
    axios.get(url).then((response) => {
        let data = response.data
        $('#msg').val(data.message)
    })
    window.location.reload()
}

function editcustomer(cid){  
    $('.title').text('Edit Customer') ;
    let url = '/customer/fetchsinglecustomer/'+cid
    axios.get(url).then((response) => {
        let data = response.data
        var customer = data.customers[0]
        $('#id').val(customer.id);
        $('#customername').val(customer.customername);
        $('#username').val(customer.username);
        $('#mobile').val(customer.mobile); 
    })
    $('.save').hide();
    $('.update').show();
    $('.modal').show();
}

function hidemodal(){
    $('.modal').hide();
}

function addcustomer(){
    $('#id').val('');
    $('#customername').val('');
    $('#username').val('');
    $('#mobile').val('');
    $('.title').text('Add Customer');
    $('.save').show();
    $('.update').hide();
    $('.modal').show();
}

function savecustomer(){
    if($('#customername').val() && $('#username').val() && $('#mobile').val()){
        let url = '/customer/savecustomer'
        let body =  {
            'customername'  : $('#customername').val(),
            'username'      : $('#username').val(),
            'mobile'        : $('#mobile').val(),
        }
        axios.post(url, body).then((response) => {
            let data = response.data
        })
    }
    $('.modal').hide();
    window.location.reload()
}

function updatecustomer(){ 
    if($('#customername').val() && $('#username').val() && $('#mobile').val()){
        let url = '/customer/editcustomer'
        let body =  {
            'id'             : $('#id').val(),
            'customername'   : $('#customername').val(),
            'username'       : $('#username').val(),     
            'mobile'         : $('#mobile').val(),
        }
        axios.post(url, body).then((response) => {
            let data = response.data
        })
    }
    $('.modal').hide();
    window.location.reload()
}

function fetchCustomers(){
    let url = '/customer/fetchcustomers'
    axios.get(url).then((response) => {
        $(".customertbody").empty();
        var row = '';
        var tr = '';
        let data = response.data
         $.each(data.customerlist, function(key,inv){
        tr = '<tr>'+
              '<td>'+inv.id +'</td>'+
              '<td>'+inv.customername +'</td>'+
              '<td>'+inv.username +'</td>'+
              '<td>'+inv.mobile +'</td>'+
              '<td><button class="btn btn-outline-secondary " onclick="editcustomer('+inv.id+')" >'+
                  '<img src="/static/assets/pencil-square.svg" %}" >     '+
                  'Edit</button></td>'+
              '<td><button class="btn btn-outline-danger" onclick="deletecustomer('+inv.id+')" >'+
                  '<img src="/static/assets/trash3.svg" class="text-white" >    '+
                  'Delete</button></td>'+
              '</tr>'
        row = row + tr ;
    })
    $(".customertbody").append(row);
    })
}



