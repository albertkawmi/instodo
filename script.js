function saveLocal() {

    var status = $('.container')
                .clone(true)       /* get a clone of the element and from it */
                .find('.new-list') /* retrieve the button, then */
                .remove()          /* remove it, */
                .end()             /* return to the previous selection and */
                .html() ; 
    console.log(status);
    localStorage.setItem("status", status);
}

function addItem(element) {
        
        element.parentsUntil('add-row').siblings('.list').append(
                '<li class="row">' +
                '<div class="tickbox"></div>' +
                '<input class="item" value="' + element.val() + '">' +
                '<div class="delete-item"><span class="icon">&#9747;</span></div>' +
                '</li>'
                ); 

        element.val("");
        element.focus();
        saveLocal();
        }

function makeSortable() {
    $('.list').sortable({ handle: '.tickbox', connectWith: '.list' });
    $('.list').disableSelection(); 
}

function newList() {
////// Make all lists sortable, tickbox acts as a handle to drag rows
    $('.new-list').before($('#list-template').html());  
    makeSortable();      
}



$(document).ready(function(){ 

////// Create a list by default
    if(localStorage.getItem("status") && localStorage.getItem("status") !== "") {
        $(document).find('.container').prepend(localStorage.getItem("status"));
        makeSortable();
    } else {
        newList();
    }
    

////// Add todo items by click or by enter key
    
    $(document).on( 'click','.add-button', function() {
            addItem( $(this).siblings('input') );
        });
    
    $(document).on('keypress', '.input-box', function(e){
            if(e.which == 13){ //Enter key pressed
                addItem( $(this) );
            }
        });

////// Listen for enter key on any item and unfocus (blur)
    $(document).on('keypress', '.item', function(e){
            if(e.which == 13){ //Enter key pressed
                $(this).blur();
            }
        });   

////// Delete a row
    $(document).on('click', '.delete-item', function() {
        $(this).parent('.row').remove();
    });

////// Toggle 'ticked' for tickboxes
    $(document).on('click', '.tickbox', function() {
        $(this).next('.item').toggleClass('strike');
        $(this).toggleClass('ticked');
    });

////// Add a new list
    ///*
    $(document).on('click', '.new-list', newList);
    //*/

////// Delete a list
    $(document).on('click', '.delete-list', function() {
        $(this).parent('.list-holder').remove();
    });

////// END    
});