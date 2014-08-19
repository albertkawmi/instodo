function addTodo() {
    var toAdd = $("input[name=checkListItem]").val();
    //toAdd = '<div class="item">' + toAdd + '</div>';
    $(".list").append(
    	'<div class="row">' +
    	  '<div class="unchecked"></div>' +
		  '<div class="item" contenteditable>' + toAdd + '</div>' +
    	  '<div class="trash"><span class="icon">&#9747</span></div>' +
    	'</div>'
    	);

    $("input[name=checkListItem]").val("");
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


});

