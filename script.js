////// Function Definitions ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function saveLocal() {

    var status = $('.container')
                .clone(true)       /* get a clone of the element and from it */
                .find('.new-list') /* retrieve the new-list button, then */
                .remove()          /* remove it, */
                .end()             /* return to the previous selection and */
                .html() ; 
    //console.log(status);
    localStorage.setItem("status", status);
}

function addItem(element) {
        
        var itemValue = element.val();

        var appendRow = $('#new-row')
                        .clone(true)
                        .html()
                        .replace('Empty Item', itemValue) ;

        element.parentsUntil('add-row').siblings('.list').append(appendRow);

        element.val("");
        element.focus();
        
        }

function makeSortable() {
    $('.list').sortable({ handle: '.tickbox', connectWith: '.list' }); // All lists sortable and interconnected. Tickbox is a handle to drag with.
    //$('.list').disableSelection(); // Not needed because I'm using a handle and need my divs to be contenteditable
    $('.container').sortable({ handle: '.list-handle'});
}

function welcomeList() {
    var welcome = $('#list-template')
                .clone(true)
                .find('.list-title')
                .html("Instodo")
                .end()
                .html();

    $('.new-list').before(welcome);
    makeSortable();      
}

function newList() {$('.set-height').addClass('template');
    var blankList = $('#list-template')
                .clone(true)
                .find('.row')
                .remove()
                .end()
                .html();

    $('.new-list').before(blankList);

    makeSortable();   
}

////// Main Function ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(document).on('ready pagecreate',function(){ 

////// If no stored data create the 'welcome' list by default
    if(localStorage.getItem("status") && localStorage.getItem("status") !== "") {
        $(document).find('.container').prepend(localStorage.getItem("status"));
        makeSortable();
    } else {
        welcomeList();
    }
    

////// Add todo items by click or by enter key    
    $(document).on( 'click tap','.add-button', function() {
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
                return e.which != 13;
            }
        });

////// Delete row on swipeleft
    $(document).on('swipeleft', '.row', function() {
        $(this).parent('.row').remove();
    });    

////// Show crosses on row hover
    $(document).on('mouseover', '.row', function(){
        $(this).children('.delete-item').removeClass('hidden');
    });

    $(document).on('mouseleave', '.row', function(){
        $(this).children('.delete-item').addClass('hidden');
    });

////// Delete a row
    $(document).on('click touchstart', '.delete-item', function() {
        $(this).parent('.row').remove();
    });

////// Toggle 'ticked' for tickboxes
    $(document).on('click touchstart', '.tickbox', function() {
        $(this).next('.item').toggleClass('strike');
        $(this).toggleClass('ticked');
    });

////// Add a new list
    $(document).on('click tap', '.new-list', newList);

////// Delete a list
    $(document).on('click touchstart', '.delete-list', function() {
        $(this).parent('.list-holder').remove();
    });

////// Save everything on window unload
    $(window).bind("beforeunload", saveLocal);

////// END Main Function ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
});
