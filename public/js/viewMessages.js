const getMessages = () => {
 const messagesRef = firebase.database().ref("/message");
 messagesRef.on('value', (snapshot) => {
     const data = snapshot.val();
     checkPasscode(data); 
 });
}

var passwordAttempts = 0; 
var secondsPast = 0; 

function checkPasscode(messages) {
    const passcodeAttempt = document.querySelector('#passcode').value;
    const messageDiv = document.querySelector('#message');
    let found = false; 
    for (message in messages) {
        const messageData = messages[message];
        if (messageData.passcode === passcodeAttempt) {
            const passcodeInput = document.querySelector('#passcodeInput');
            messageDiv.innerHTML = messageData.phrase;
            passcodeInput.style.display = 'none';
            found = true; 
            messageDiv.style.color = "black"; 
        }
    }   
    if (!found) {
        passwordAttempts++; 
        messageDiv.innerHTML = `Incorrect Passcode! ${5 - passwordAttempts} attempts remaining.`;
        messageDiv.style.color = "red"; 
        if (passwordAttempts >= 3) {
            // alert(`${passwordAttempts} wrong attempts registered, ${5 - passwordAttempts} attempts left.`)
            if (passwordAttempts == 5) {
                const viewMessageButton = document.getElementById("viewMsg");
                console.log(viewMessageButton);
                messageDiv.innerHTML = `Incorrect Passcode! 0 attempts remaining. Button is locked for 5 seconds.`
                viewMessageButton.disabled = true; 
                secondsPast = 0; 
                timer = setInterval(reactivateButton, 1000); 
            }
        }
    }
}

function reactivateButton() {
    secondsPast++; 
    const viewMessageButton = document.getElementById("viewMsg");
    const messageDiv = document.querySelector('#message');
    messageDiv.innerHTML = `Incorrect Passcode! 0 attempts remaining. Button is locked for ${5 - secondsPast} seconds.`
    console.log("yay");
    if (secondsPast == 5) {
        passwordAttempts = 0; 
        messageDiv.innerHTML = "";        
        viewMessageButton.disabled = false;  
        clearInterval(timer);
        
    }
}
