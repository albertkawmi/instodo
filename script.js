function addTodo() {
    var toAdd = $("input[name=checkListItem]").val();
    //toAdd = '<div class="item">' + toAdd + '</div>';
    $(".list").append(
    	'<div class="row">' +
    	'<div class="check-box"><input type="checkbox" name="tick" value="0"></div>' +
		'<div class="item">' + toAdd + '</div>' +
    	'<div class="trash">x</div>' +
    	'</div>'
    	);
}

$(document).ready(function(){
    $("#button").click(addTodo);
    
    $(document).on('click', '.item', function(){
        $(this).remove();
    });
});

$(".trash").click(function() {
  $(this).closest("div").remove();
});