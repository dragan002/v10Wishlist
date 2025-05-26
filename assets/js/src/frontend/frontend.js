(function ($) {
  'use strict';

  // When the document is ready
  $(document).ready(function () {
    // Handle click on the "Add to Wishlist" button
    $('.wpls-add-to-wishlist-button').on('click', function (e) {
      e.preventDefault();

      const $button = $(this);
      const productId = $button.data('product-id');

      // Disable the button to prevent multiple clicks
      $button.prop('disabled', true);

      // console.log(wpls_jquery_data); // For debugging

      // Make AJAX request
      $.ajax({
        url: wpls_jquery_data.ajax_url,
        type: 'POST',
        data: {
          action: 'wpls_add_to_wishlist',
          product_id: productId,
          nonce: wpls_jquery_data.nonce
        },
        success: function (response) {
          if (response.success) {
            // Show success message
            alert(wpls_jquery_data.add_success);

            document.dispatchEvent(new CustomEvent('wpls_wishlist_updated'));
          } else {
            // Show error message
            alert(response.data.message || wpls_jquery_data.add_error);
          }
        },
        error: function () {
          // Show generic error message
          alert(wpls_jquery_data.add_error);
        },
        complete: function () {
          // Re-enable the button
          $button.prop('disabled', false);
        }
      });
    });
  });

})(jQuery);