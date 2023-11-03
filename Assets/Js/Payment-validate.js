const form = document.querySelector('#payment form');

const full_name = document.querySelector('input[name="fullName"]');
const phone_number = document.querySelector('input[name="phoneNumber"]');
const email_address = document.querySelector('input[name="emailAddress"]');
const region = document.querySelector('select[name="Region"]');
const city = document.querySelector('input[name="city"]');
const full_address = document.querySelector('input[name="fullAddress"]');

const errorMessage = document.querySelectorAll('.errorMessage');

const thank_for_order = document.querySelector('.thank-for-order');

const is_payment_valid = {
    full_name: false,
    phone_number: false,
    email_address: false,
    region: false,
    city: false,
    full_address: false,
};;


const validate_payment_form = () => {

    if (!full_name.value) {
        full_name.classList.add('invalid');
        errorMessage[1].innerText = 'These Input Are Required';
        is_payment_valid.full_name = false ;
    }
    else if (full_name.value.length < 8) {
        full_name.classList.add('invalid');
        errorMessage[1].innerText = 'These Input Are Required';
        is_payment_valid.full_name = false ;
    }
    else {
        full_name.classList.remove('invalid');
        full_name.classList.add('valid');
        errorMessage[0].innerText = '';
        is_payment_valid.full_name = true;

        let full_name_value = full_name.value;
        console.log(full_name_value);
    }


    if (!phone_number.value) {
        phone_number.classList.add('invalid');
        errorMessage[1].innerText = 'These Input Are Required';
        is_payment_valid.phone_number = false;
    }
    else if (phone_number.value.length < 10) {
        phone_number.classList.add('invalid');
        errorMessage[1].innerText = 'These Input Are Required';
        is_payment_valid.phone_number = false;
    }
    else {
        phone_number.classList.remove('invalid');
        phone_number.classList.add('valid');
        errorMessage[0].innerText = '';
        is_payment_valid.phone_number = true;
    }


    if (!email_address.value) {
        email_address.classList.add('invalid');
        errorMessage[1].innerText = 'These Input Are Required';
        is_payment_valid.email_address = false;
    }
    else {
        email_address.classList.remove('invalid');
        email_address.classList.add('valid');
        errorMessage[1].innerText = '';
        is_payment_valid.email_address = true;
    }

    if (region.value === '0') {
        region.classList.add('invalid');
        errorMessage[2].innerText = 'These Input Are Required';
        is_payment_valid.region = false;
    } else {
        region.classList.remove('invalid');
        region.classList.add('valid');
        errorMessage[2].innerText = '';
        is_payment_valid.region = true;
    }

    if (!city.value) {
        city.classList.add('invalid');
        errorMessage[2].innerText = 'These Input Are Required';
        is_payment_valid.city = false;
    } else {
        city.classList.remove('invalid');
        city.classList.add('valid');
        errorMessage[2].innerText = '';
        is_payment_valid.city = true;
    }

    if (!full_address.value) {
        full_address.classList.add('invalid');
        errorMessage[2].innerText = 'These Input Are Required';
        is_payment_valid.full_address = false;
    }
    else {
        full_address.classList.remove('invalid');
        full_address.classList.add('valid');
        errorMessage[2].innerText = '';
        is_payment_valid.full_address = true;
    }
}

const validate_in_input = (elm) => {
    elm.addEventListener('input', () => {
        validate_payment_form();
    })
}

validate_in_input(full_name);
validate_in_input(phone_number);
validate_in_input(email_address);
validate_in_input(region);
validate_in_input(city);
validate_in_input(full_address);


form.addEventListener('submit', (e) => {
    e.preventDefault();
    validate_payment_form();

    const allFieldsValid = Object.values(is_payment_valid).every((valid) => valid);

    if (allFieldsValid) {
        form.submit();
        form.remove();

        thank_for_order.classList.remove('show');


    } else {
        console.log("Input's are empty");
    }
})



