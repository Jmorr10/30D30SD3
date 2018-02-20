self.ICHTL = (function () {

    // Used to toggle the menu on small screens when clicking on the menu button
    function toggleMenu () {
        $("header").toggleClass("open");
    }

    // Loads and displays information about the available suites.
    function roomModal (room) {
        var modal = $("#roomModal"),
            modalBody = $("#roomBody"),
            titles = modal.find('.ttl'),
            pages = modalBody.children(".pg"),
            leftArrow = $('#leftArrow'),
            rightArrow = $('#rightArrow');

        // Make sure that the elements were found, since jQuery will return an empty result
        if (!elementExists($([
                modal,
                modalBody,
                titles,
                pages,
                leftArrow,
                rightArrow
            ]))
        ) {
            return false;
        }

        // Hide all titles and pages first
        titles.removeClass("show");
        pages.removeClass("show");

        titles.filter('.' + room).addClass("show");
        pages.filter(".pg." + room).first().addClass("show");

        // Reset our arrows states.
        leftArrow.attr("class", "invisible");
        rightArrow.attr("class", "visible");

        // Keep track of which modal is showing by storing it
        modal.data("currentRoom", room);

        modal.modal('show');
    }

    // Accepts a boolean argument, 'backwards', which indicates whether or not the previous page
    // should be displayed.
    function modalChangePage (backwards) {
        var modal = $("#roomModal"),
            modalBody = $("#roomBody"),
            pages = modalBody.children(".pg"),
            room = "." + modal.data("currentRoom"),
            currentPage = pages.filter(".show").first(),
            rightArrow = $('#rightArrow'),
            leftArrow = $('#leftArrow'),
            nextPage =  (backwards) ?  currentPage.prevAll(room).not(".show").first()
                : currentPage.nextAll(room).not(".show").first(),
            isLastPage = (backwards) ? nextPage.prevAll(room).not(".show").length == 0
                : nextPage.nextAll(room).not(".show").length == 0,
            arrowClass = (isLastPage) ? "invisible" : "visible";

        // Make sure that the elements were found, since jQuery will return an empty result
        if (!elementExists($([
                modal,
                modalBody,
                pages,
                currentPage,
                nextPage,
                rightArrow,
                leftArrow]))
        ) {
            return false;
        }

        // Swap pages
        currentPage.removeClass("show");
        nextPage.addClass("show");

        // Scroll to top of modal for reading/viewing new content.
        modal.animate({ scrollTop: 0 }, 'slow');


        // Determine which arrows should be showing.
        rightArrow.attr("class", arrowClass);

        if (nextPage.length != 0) {
            leftArrow.attr('class', "visible");
        }

        if (backwards && isLastPage) {
            leftArrow.attr("class", "invisible");
            rightArrow.attr("class", "visible");
        }
    }

    // Loads and displays information about activities/amenities into the info modal using AJAX.
    function infoModal (page) {
        $('#infoText').load("fragments/" + page.toLowerCase() + ".html");

        $('#infoModalTitle').text("Information - " + page);

        $('#infoImg').attr('src', "img/" + page.toLowerCase() + ".jpg")
            .attr("alt", "Image of " + page);

        $('#infoModal').modal("show");
    }

    // This function simply closes the model and allows the anchor tag to continue its normal behavior.
    function bookRoom () {
        $('#roomModal').modal('hide');

        // Return true to allow the anchor tag to navigate to its href.
        return true;
    }

    // Alerts the user that the form has been submitted
    function submitForm (el, ev) {
        var form = $(el).closest("form");

        if (form.checkValidity()) {
            ev.preventDefault();
            form.reset();
            alert("Form successfully submitted!");
        }
    }

    // This utility function checks to see if any of the jQuery objects provided in 'arg' are empty.
    // This is accomplished by iterating over the objects and checking the 'length' property.
    function elementExists (arg) {
        var exists = true;
        arg.each(function () {
            if (this.length == 0) {
                exists = false;
            }
        });
        return exists;
    }

    return {
        "toggleMenu" : toggleMenu,
        "roomModal" : roomModal,
        "modalChangePage" : modalChangePage,
        "infoModal" : infoModal,
        "bookRoom" : bookRoom,
        "submitForm" : submitForm
    };
})();