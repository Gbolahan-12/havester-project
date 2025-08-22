// Target and Raised values
const targetAmount = 5000;
let raisedAmount = 0;

// Elements
const raisedElement = document.getElementById("raised");
const progressBar = document.getElementById("progress");
const donationForm = document.getElementById("donationForm");

// Handle Donation Form
donationForm.addEventListener("submit", function(e) {
  e.preventDefault();

  const amount = parseFloat(document.getElementById("amount").value);
  const email = document.getElementById("email").value;

  if (amount > 0 && email) {
    // Initialize Paystack
    let handler = PaystackPop.setup({
      key: 'pk_test_84e431d8d32c5d4bd76fb2e7be17b746bda09d05',
      email: email,
      amount: amount * 100,
      currency: "NGN",
      ref: '' + Math.floor((Math.random() * 1000000000) + 1),

      callback: function(response) {
        alert('Payment complete! Reference: ' + response.reference);

        // Update raised amount after it successful payment
        raisedAmount += amount;
        raisedElement.textContent = raisedAmount;

        // Update progress bar
        const percentage = Math.min((raisedAmount / targetAmount) * 100, 100);
        progressBar.style.width = percentage + "%";

        document.getElementById("amount").value = "";
        document.getElementById("email").value = "";
      },

      onClose: function() {
        alert('Transaction was not completed, window closed.');
      }
    });

    handler.openIframe();
  } else {
    alert("Please enter a valid amount and email.");
  }
});
