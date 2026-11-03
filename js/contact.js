(() => {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("contact-status");
  const submit = form?.querySelector('button[type="submit"]');

  if (!form || !status || !submit) return;

  const email = form.querySelector("#contact-email");
  const phone = form.querySelector("#contact-phone");
  const emailFeedback = form.querySelector("#contact-email-error");
  const phoneFeedback = form.querySelector("#contact-phone-feedback");

  const validateField = (field) => {
    const isEmail = field === email;
    const feedback = isEmail ? emailFeedback : phoneFeedback;
    field.setCustomValidity("");
    const valid = isEmail
      ? field.validity.valid && /^[^@\s]+@[^@\s.]+(\.[^@\s.]+)+$/.test(field.value)
      : field.value === "" || /^[0-9]{10}$/.test(field.value);
    const message = isEmail
      ? "Please enter a valid email address, like name@example.com."
      : "Please enter a valid 10-digit phone number.";

    field.setCustomValidity(valid ? "" : message);
    field.setAttribute("aria-invalid", String(!valid));
    feedback.dataset.valid = String(valid);
    feedback.textContent = valid
      ? ""
      : message;
    return valid;
  };

  [email, phone].forEach((field) => {
    field.addEventListener("blur", () => validateField(field));
    field.addEventListener("input", () => {
      if (field.hasAttribute("aria-invalid")) validateField(field);
    });
    field.addEventListener("invalid", () => validateField(field));
  });
  form.addEventListener("reset", () => {
    [email, phone].forEach((field) => {
      field.setCustomValidity("");
      field.removeAttribute("aria-invalid");
    });
    [emailFeedback, phoneFeedback].forEach((feedback) => {
      feedback.textContent = "";
      delete feedback.dataset.valid;
    });
  });

  // Avoid duplicate requests if a cached main script still contains the old handler.
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    event.stopImmediatePropagation();
    if (submit.disabled) return;
    validateField(email);
    validateField(phone);
    if (!form.reportValidity()) return;

    if (form.action.includes("YOUR_FORM_ID")) {
      status.textContent = "This form is not configured yet. Please connect on LinkedIn instead.";
      return;
    }

    submit.disabled = true;
    submit.textContent = "Sending...";
    status.textContent = "Sending your message...";

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);

    try {
      const data = new FormData(form);
      const response = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
        signal: controller.signal,
      });

      if (!response.ok) {
        status.textContent = response.status === 429
          ? "Too many submissions. Please wait a few minutes before trying again, or connect on LinkedIn."
          : "Your message could not be sent. Please try again, or connect on LinkedIn.";
        return;
      }

      form.reset();
      status.textContent = "Thank you! Your message has been sent successfully.";
    } catch (error) {
      status.textContent = error.name === "AbortError"
        ? "The request timed out. Delivery could not be confirmed. Please try again later or connect on LinkedIn."
        : "Unable to connect. Please check your internet connection and try again, or connect on LinkedIn.";
    } finally {
      clearTimeout(timeout);
      submit.disabled = false;
      submit.textContent = "Send Message";
    }
  }, { capture: true });
})();
