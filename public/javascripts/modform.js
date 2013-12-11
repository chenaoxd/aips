function renderForm(){
    for(var item in s_form){
        $("#render-container").append(item);
    }
}

$(function(){
    renderForm();
});
