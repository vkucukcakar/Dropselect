/*!
* dropselect - v1.2.0
*
* jQuery plugin to make Bootstrap dropdown to "behave like" html select element
* Requires jQuery, Bootstrap
*
* @license
*
* Copyright (c) 2015 Volkan Kucukcakar.
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
* of this software and associated documentation files (the "Software"), to deal
* in the Software without restriction, including without limitation the rights
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
* copies of the Software, and to permit persons to whom the Software is
* furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
* SOFTWARE.
*/ 
;(function($, window, document, undefined) {
 
    $.fn.dropselect = function(method, param) {
        switch (method){
            
            // Concstructor: Example: $('.dropselect').dropselect();
            case undefined:
            case '':
                this.filter( ".dropdown, .dropup" ).each(function() {
                    // element a
                    $(this).find('.dropdown-menu a').attr('href','').addClass('dropselect-option').css('cursor','pointer');
                    $(this).find('.dropdown-menu a[data-selected="selected"]').each(function() {
                        // Set label from initial selected element
                        $(this).parents('.dropdown, .dropup').find('button[data-toggle="dropdown"] .dropdown-label').html( $(this).text() );
                        // Set hidden input value from initial selected element
                        $(this).parents('.dropdown, .dropup').find('input[type="hidden"]').val( $(this).attr('data-value') );
                    });
                    //Click event function
                    $(this).find('.dropdown-menu a').on('click',function(event){
                        // Focus selected dropdown
                        $(this).parents('.dropdown, .dropup').find('button[data-toggle="dropdown"]').focus();
                        // Update label from selected element
                        $(this).parents('.dropdown, .dropup').find('button[data-toggle="dropdown"] .dropdown-label').html( $(this).text() );
                        // Update hidden input value from selected element
                        $(this).parents('.dropdown, .dropup').find('input[type="hidden"]').val( $(this).attr('data-value') );
                        //Decide to call onchange handler later
                        var trigger_change=( 'selected'==$(this).attr('data-selected') ) ? false : true;
                        // Unselect all
                        $(this).parents('.dropdown, .dropup').find('a').removeAttr('data-selected');
                        // Select current
                        $(this).attr('data-selected','selected');
                        //Manually trigger change event
                        if (trigger_change)
                            $(this).trigger('change');
                        //Prevent default click event
                        event.preventDefault();
                    });                            
                }); 
                return this;
            
            // Manually select by value. Example: $('.dropselect').dropselect('select','anyval');
            case 'select':
                //Decide to call onchange handler later
                var trigger_change=( 'selected'==$(this).filter('.dropdown, .dropup').find('.dropdown-menu a[data-value="'+param+'"]').attr('data-selected') ) ? false : true;
                // Unselect all
                $(this).filter('.dropdown, .dropup').find('.dropdown-menu a').removeAttr('data-selected');
                // Select current
                $(this).filter('.dropdown, .dropup').find('.dropdown-menu a[data-value="'+param+'"]').attr('data-selected','selected');
                // Update label from selected element
                $(this).filter('.dropdown, .dropup').find('button[data-toggle="dropdown"] .dropdown-label').html( $(this).filter('.dropdown, .dropup').find('.dropdown-menu a[data-selected="selected"]').text() );
                // Update hidden input value from selected element
                $(this).filter('.dropdown, .dropup').find('input[type="hidden"]').val( $(this).filter('.dropdown, .dropup').find('.dropdown-menu a[data-selected="selected"]').attr('data-value') );
                //Manually trigger change event
                if (trigger_change)
                    $(this).filter('.dropdown, .dropup').find('.dropdown-menu a').trigger('change');
                return this;
                break;
            
            // Get selected option value. Example: var anyvalue=$('#mydropselect').dropselect('value');
            case 'value':
                return $(this).filter('.dropdown, .dropup').find('a.dropselect-option[data-selected="selected"]').attr('data-value');
                
        }//switch
        
    };//function
 
})(jQuery, window, document);