$(document).ready(function () {
    // 1. Initialize Bootstrap Tooltips and Popovers
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function (popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });

    // 2. jQuery Event Handling (Hover / Click)
    $('.project-card').hover(
        function () {
            // Adds border pulse via jQuery on hover
            $(this).addClass('border-warning');
        },
        function () {
            $(this).removeClass('border-warning');
        }
    );

    // 3. Show/Hide elements based on jQuery click (Interactive Section)
    $('#toggle-secret').click(function () {
        var msg = $('#secret-message');
        if (msg.hasClass('d-none')) {
            msg.removeClass('d-none').hide().slideDown(400); // Trigger hide/show dynamically
            $(this).html('<i class="bi bi-eye-slash-fill pe-1"></i> Hide Secret Message').removeClass('btn-outline-info').addClass('btn-info text-white');
        } else {
            msg.slideUp(400, function () {
                $(this).addClass('d-none');
            });
            $(this).html('<i class="bi bi-eye pe-1"></i> Reveal Hidden Message').removeClass('btn-info text-white').addClass('btn-outline-info');
        }
    });

    // Scroll smoothly to contact form from hero
    $('#btn-hero-contact').click(function () {
        $('html, body').animate({
            scrollTop: $("#contact").offset().top - 70
        }, 800);
    });

    // 4. Trigger Bootstrap Modal dynamically via jQuery
    $('.get-details-btn').click(function () {
        // Fetch data
        var projectName = $(this).attr('data-project');
        var desc = $(this).siblings('.card-text').text();

        // Assemble dynamic HTML
        var dynamicHtml = '<div class="text-center mb-4"><i class="bi bi-laptop display-1 text-primary"></i></div>';
        dynamicHtml += '<p class="lead text-center">In-depth overview for <strong>' + projectName + '</strong></p>';
        dynamicHtml += '<p class="text-muted">' + desc + '</p>';
        dynamicHtml += '<div class="alert alert-secondary mt-3"><ul><li>Frontend: React/Bootstrap</li><li>Backend: Node App</li><li>Database: MongoDB (Sample)</li></ul></div>';

        // Populate Modal
        $('#projectModalLabel').html('<i class="bi bi-folder-check"></i> ' + projectName);
        $('#projectModalBody').html(dynamicHtml);

        // Show Modal programmatically
        var myModal = new bootstrap.Modal(document.getElementById('projectModal'), {
            keyboard: true
        });
        myModal.show();
    });

    // 5. Form Validation using Bootstrap and jQuery
    $('#contactForm').on('submit', function (event) {
        var form = this;
        // Check HTML5 validity
        if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault(); // prevent reload for demo 

            // Show alert
            var alertHtml = '<div class="alert alert-success alert-dismissible fade show shadow" role="alert">' +
                '<strong><i class="bi bi-check-circle-fill"></i> Success!</strong> Your message has been sent.' +
                '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';

            // Append a wrapper to body if it doesn't exist
            if ($('#customAlertOverlay').length === 0) {
                $('body').append('<div id="customAlertOverlay"></div>');
            }
            $('#customAlertOverlay').html(alertHtml);

            // Reset form
            form.reset();
            $(form).removeClass('was-validated');
            return;
        }
        $(form).addClass('was-validated');
    });
});
