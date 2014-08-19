function addTodo() {
    var toAdd = $("input[name=add-item]").val();
    //toAdd = '<div class="item">' + toAdd + '</div>';
    $(".list").append(
    	'<div class="row">' +
    	  '<div class="unchecked"></div>' +
		  '<div class="item" contenteditable>' + toAdd + '</div>' +
    	  '<div class="trash"><span class="icon">&#9747</span></div>' +
    	'</div>'
    	);

    $("input[name=add-item]").val("");
}

$(document).ready(function(){
    $("#add").click(addTodo);

    $(document).on('click', '.trash', function() {
        $(this).parent('.row').remove();
    });

    $(document).on('click', ".unchecked", function() {
        $(this).next('.item').toggleClass('strike');
        $(this).toggleClass('checked');
    });

    $("input[name=add-item]").keypress(function(e){
        if(e.which == 13){//Enter key pressed
            addTodo;
        }
    });


});

