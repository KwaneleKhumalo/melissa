const eName = document.querySelector('.name');
const eMessage = document.querySelector('.materialize-textarea');
const eMail = document.querySelector('.email');
let message = document.querySelector('.mail-message')

const emailForm = document.querySelector('.contact-form')

emailForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const url = 'http://localhost:3000/sendmail';

    // form-validation
    if(eName.value === '')
    {
        message.textContent = `Please enter your NAME`
        message.style.color = 'red';
        return false
    }
    else if(eMail.value === '')
    {
        message.textContent = `Please enter a valid EMAIL`
        message.style.color = 'red';
        return false
    }
    else if(eMessage.value === '')
    {
        message.textContent = `Please enter your MESSAGE`
        message.style.color = 'red';
        return false
    }
    else
    {
        message.textContent = `Message has been sent! Thank you for your interest!`
        message.style.color = `rgb(39, 185, 39)`
    }
    
    // Email Data
    const emailData = 
    {
        to: 'ngemakwanele1@gmail.com',
        from: `${eMail.value}`,
        subject: `${eName.value} from Website`,
        body: `${eMessage.value}\n\n${eMail.value}`
    };
    const sendMail = await axios.post(url, emailData);
    eMail.value = '';
    eMessage.value = '';
    eName.value = '';
    message.textContent = '';
   return sendMail;
    
});
