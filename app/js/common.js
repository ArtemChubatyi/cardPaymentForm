
function GetPaymentForm() {
	const root = document.querySelector('.wrapper');
	const amountField = document.getElementById('amount');
	const editButton = document.querySelector('.button__edit');
	const submitButton = document.querySelector('.button__submit');
	const stored = document.getElementById('store');
	const emailField = document.querySelector('.email-field');
	const pay = document.querySelector('.pay');


	function completedPayment(rootHeight, value) {
		let paymentValue = value;
		root.style.height = rootHeight + 'px';
		root.style.justifyContent = 'space-between';
		function hashCode(stringValue) {
			var hash = 0, i, chr;
			if (stringValue.length === 0) return hash;
			for (i = 0; i < stringValue.length; i++) {
				chr = stringValue.charCodeAt(i);
				hash = ((hash << 5) - hash) + chr;
				hash |= 0;
			}
			return ((hash * Math.random()) * 10);
		};

		let render = `
			<div class="close"><svg aria-hidden="true" data-prefix="far" data-icon="times-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-times-circle fa-w-16 fa-3x"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm101.8-262.2L295.6 256l62.2 62.2c4.7 4.7 4.7 12.3 0 17l-22.6 22.6c-4.7 4.7-12.3 4.7-17 0L256 295.6l-62.2 62.2c-4.7 4.7-12.3 4.7-17 0l-22.6-22.6c-4.7-4.7-4.7-12.3 0-17l62.2-62.2-62.2-62.2c-4.7-4.7-4.7-12.3 0-17l22.6-22.6c4.7-4.7 12.3-4.7 17 0l62.2 62.2 62.2-62.2c4.7-4.7 12.3-4.7 17 0l22.6 22.6c4.7 4.7 4.7 12.3 0 17z" class=""></path></svg></div>
			<div class="success__icon"><svg aria-hidden="true" data-prefix="fas" data-icon="check-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-check-circle fa-w-16 fa-7x"><path fill="currentColor" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z" class=""></path></svg></div>
			<div class="success__message">
			<span class="success__amount"></span>
			<p class="text">Your payment is complete.</p>
			</div>
			<div class="verification-code">
			<p class="verification-title">Verification code:</p>
			<p class="verification-hashCode"></p>
			</div>
			<button class="receipt">View receipt</button>
		`
		root.innerHTML = render;
		document.querySelector('.success__amount').innerText = '$' + paymentValue;
		document.querySelector('.verification-hashCode').innerText = hashCode(paymentValue);
		const close = document.querySelector('.close');
		close.addEventListener('click', reload, false);

	};
	function getLoader(rootHeight) {
		root.style.height = rootHeight + 'px';
		root.style.justifyContent = 'center';
		let renderLoader = `
		<div class="loader" id="loader-2">
          <span></span>
          <span></span>
          <span></span>
		</div>
		`;
		root.innerHTML = renderLoader;
	}
	function reload() {
		location.reload();
	}
	const listener = (event) => {
		let target = event.target;
		if (target === editButton && amountField.disabled === true) {
			amountField.disabled = false;
			amountField.focus();
			amountField.addEventListener("keypress", function (e) {
				if (e.keyCode === 13) {
					e.preventDefault();
					amountField.disabled = true;
				}
			});
		} else if (amountField.disabled === false && target !== amountField) {
			amountField.disabled = true;
		} else if (target === stored) {
			if (emailField.style.display === 'block') {
				emailField.style.display = 'none';
				emailField.required = false;
			} else if (emailField.style.display === 'none') {
				emailField.style.display = 'block';
				emailField.required = true;
			}
		} else if (target === submitButton) {
			let rootPreviousHeight = root.offsetHeight;
			getLoader(rootPreviousHeight);
			setTimeout(completedPayment, 2000, rootPreviousHeight, amountField.value);
		}
	}
	const changeAmount = () => {
		pay.innerText = 'Pay ' + amountField.value + '$';
	}
	document.body.addEventListener('click', listener, false);
	amountField.addEventListener('change', changeAmount, false);


	document.getElementById('amount').addEventListener('change', function () {
		let fieldWrap = document.querySelector('.payment-amount');
		let errorClass = document.querySelector('.amount-error');
		if (!event.target.validity.valid && errorClass === null) {
			let fieldError = document.createElement('div');
			fieldError.innerText = 'Enter the amount from $ 1 to $ 99,999';
			fieldError.classList.add('amount-error');
			fieldWrap.appendChild(fieldError);
		} else if (event.target.validity.valid && errorClass !== null) {
			fieldWrap.removeChild(errorClass);
		}
	}, false);

	document.getElementById('name').addEventListener('change', function () {
		let fieldWrap = document.querySelector('.name');
		let errorClass = document.querySelector('.name-error');
		if (!event.target.validity.valid && errorClass === null) {
			let fieldError = document.createElement('div');
			fieldError.innerText = 'Enter valid name';
			fieldError.classList.add('name-error');
			fieldWrap.appendChild(fieldError);
		} else if (event.target.validity.valid && errorClass !== null) {
			fieldWrap.removeChild(errorClass);
		}
	}, false);

	document.getElementById('card-number').addEventListener('change', function () {
		let fieldWrap = document.querySelector('.card');
		let errorClass = document.querySelector('.card-error');
		if (!event.target.validity.valid && errorClass === null) {
			let fieldError = document.createElement('div');
			fieldError.innerText = 'Enter a 16-digit card number';
			fieldError.classList.add('card-error');
			fieldWrap.appendChild(fieldError);
		} else if (event.target.validity.valid && errorClass !== null) {
			fieldWrap.removeChild(errorClass);
		}
	}, false);

	document.getElementById('expiry-date').addEventListener('change', function () {
		let fieldWrap = document.querySelector('.date');
		let errorClass = document.querySelector('.date-error');
		if (!event.target.validity.valid && errorClass === null) {
			let fieldError = document.createElement('div');
			fieldError.innerText = 'Enter a date in format MM/YY';
			fieldError.classList.add('date-error');
			fieldWrap.appendChild(fieldError);
		} else if (event.target.validity.valid && errorClass !== null) {
			fieldWrap.removeChild(errorClass);
		}
	}, false);

	document.getElementById('security-code').addEventListener('change', function () {
		let fieldWrap = document.querySelector('.code');
		let errorClass = document.querySelector('.code-error');
		if (!event.target.validity.valid && errorClass === null) {
			let fieldError = document.createElement('div');
			fieldError.innerText = 'Enter a 3-digit security code';
			fieldError.classList.add('code-error');
			fieldWrap.appendChild(fieldError);
		} else if (event.target.validity.valid && errorClass !== null) {
			fieldWrap.removeChild(errorClass);
		}
	}, false);

}

let paymentForm = new GetPaymentForm();

