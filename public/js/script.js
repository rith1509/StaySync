// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()
// Add this code to your public/js/script.js file

document.addEventListener("DOMContentLoaded", () => {
    const taxSwitch = document.getElementById("taxSwitch");
    if (taxSwitch) {
        taxSwitch.addEventListener("change", () => {
            const prices = document.querySelectorAll(".listing-price");
            prices.forEach(priceElement => {
                const originalPrice = parseFloat(priceElement.dataset.originalPrice);
                let newPrice;
                let priceText;

                if (taxSwitch.checked) {
                    // Calculate price with 18% tax
                    newPrice = Math.round(originalPrice * 1.18);
                    priceText = `₹${newPrice.toLocaleString('en-IN')} / night <small>(incl. taxes)</small>`;
                } else {
                    // Revert to original price
                    newPrice = originalPrice;
                    priceText = `₹${newPrice.toLocaleString('en-IN')} / night`;
                }
                
                priceElement.innerHTML = priceText;
            });
        });
    }
});