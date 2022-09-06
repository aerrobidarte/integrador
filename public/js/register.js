window.addEventListener("load", function () {
  if (document.URL.startsWith("http://localhost")) {
    url = `http://localhost:3010`;
  } else {
    url = ""; // cambiar al deploy
  }
  
  let user = document.getElementById("name");
  let email = document.getElementById("email");
  let password = document.getElementById("password");

  let nameAlert = document.getElementById("nameAlert");
  let emailAlert = document.getElementById("emailAlert");
  let emailValidAlert = document.getElementById("emailValidAlert");
  let usedEmail = document.getElementById("usedEmail");
  let passAlert = document.getElementById("passAlert");


  user.addEventListener("focusout", userFunction);
  password.addEventListener("focusout", mouseLeavePass);
  email.addEventListener("focusout", validEmailFunction);
  email.addEventListener("blur", () => {
    askRegister(email.value);
  });

  function askRegister(checking) {
    fetch(`${url}/users/register/${checking}`)
      .then((res) => {
        return res.json();
      })
      .then((respuesta) => {
        if (respuesta >= 1) {
          usedEmail.style.display = "block";
          return;
        } else {
          usedEmail.style.display = "none";
          return;
        }
      });
  }


  function userFunction() {
    if (user.value.length < 5) {
      nameAlert.style.display = "block";
      return false;
    } else {
      nameAlert.style.display = "none";
      return true;
    }
  }

  function validEmailFunction() {

    const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (email.value.length < 7) {
      emailAlert.style.display = "block";
      emailValidAlert.style.display = "none";
      
    } else {
      emailAlert.style.display = "none";
      if (!email.value.match(validRegex)) {
        emailValidAlert.style.display = "block";
        
      } else {
        emailValidAlert.style.display = "none";
        
      }
    }
  }


  function mouseLeavePass() {
    if (password.value.length < 8) {
      passAlert.style.display = "block";;
    } else {
      passAlert.style.display = "none";
    }
  }
});
