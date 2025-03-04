const STORAGE_KEY = 'feedback-form-state';

let formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');
const textArea = form.querySelector('.text-input');
const emailInput = form.querySelector('.feedback-form-email');

populateForm();

form.addEventListener('submit', onFormSubmit);
form.addEventListener('input', onFormInput);

// Function 1
// 1 - overrides the standard behavior
// 2 - delete messages from the storage
// 3 - clear the form

function onFormSubmit(event) {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  localStorage.removeItem(STORAGE_KEY);
  formData = { email: '', message: '' };
  form.reset();
}

// Function 2
// 1 - get the value of the field
// 2 - save it to the storage

function onFormInput(event) {
  formData[event.target.name] = event.target.value.trim();

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

// Function 3

function populateForm() {
  const savedData = localStorage.getItem(STORAGE_KEY);

  if (savedData) {
    formData = JSON.parse(savedData);
    emailInput.value = formData.email || '';
    textArea.value = formData.message || '';
  }
}
