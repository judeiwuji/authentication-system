function computePasswordStrength(totalPassed, totalTests) {
  const strength = (totalPassed / totalTests) * 100;
  const pwdStrength = $('#pwd_strength');
  const label = $('#pwd_strength_label');
  pwdStrength.css({ width: strength + '%' });

  if (strength <= 25) {
    pwdStrength.css({ backgroundColor: 'red' });
    label.text('Weak');
  } else if (strength <= 50) {
    pwdStrength.css({ backgroundColor: '#fbc531' });
    label.text('Good');
  } else if (strength <= 75) {
    pwdStrength.css({ backgroundColor: 'yellow' });
    label.text('Better');
  } else if (strength <= 80) {
    pwdStrength.css({ backgroundColor: '#4cd137' });
    label.text('Almost there');
  } else {
    pwdStrength.css({ backgroundColor: '#44bd32' });
    label.text('Strong');
  }
}

function validatePassword() {
  $('#passwordRequirements').collapse('show');
  const password = $('#password').val();
  let isValid = true;
  let passed = 0;
  const tests = [
    { pass: password.length >= 8, target: '#pwd_len' },
    { pass: /[A-Z]{1,}/.test(password), target: '#pwd_upper' },
    { pass: /[a-z]{1,}/.test(password), target: '#pwd_lower' },
    { pass: /[0-9]{1,}/.test(password), target: '#pwd_digit' },
    {
      pass: /[~!@#$%^&*()_+=?/\\|]{1,}/.test(password),
      target: '#pwd_special',
    },
  ];

  for (const test of tests) {
    if (test.pass) {
      toggleClass($(test.target), 'error', 'success');
      passed += 1;
    } else {
      toggleClass($(test.target), 'success', 'error');
      isValid = false;
    }
  }
  computePasswordStrength(passed, tests.length);
  return isValid;
}

$(function () {
  $('[data-toggle="tooltip"').tooltip();

  var copyTimeout;
  $(document).on('click', '.copyToClipboard', function (event) {
    if (copyTimeout) {
      clearTimeout(copyTimeout);
    }
    var element = $(event.currentTarget);
    var text = element.data().text;

    element.tooltip('dispose');
    element.attr('title', 'copied');
    element.data('trigger', 'manual');
    navigator.clipboard.writeText(text);
    element.tooltip('show');

    copyTimeout = setTimeout(() => {
      element.tooltip('dispose');
    }, 1000);
  });

  $('#password').on('keyup', function (event) {
    validatePassword();
  });
});
