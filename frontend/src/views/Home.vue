<template>
  <div id="container">
    <div>
      <img id="logo" src="../assets/logo.png" />
      <div id="login-form" v-if="isLoginForm">
        <input
          class="login-input"
          type="text"
          placeholder="Username"
          v-model="username"
        />
        <input
          class="login-input"
          type="password"
          placeholder="Password"
          v-model="password"
        />

        <div id="btn-group">
          <button class="btn" id="btn-login" @click="login">Sign In</button>
          <h4 class="link" @click="swapForm">Register</h4>
        </div>
        <h3 id="error-message" v-if="isError">{{ errorMessage }}</h3>
      </div>
      <div id="login-form" v-if="!isLoginForm">
        <input
          class="login-input"
          type="text"
          placeholder="Username"
          v-model="username"
        />
        <input
          class="login-input"
          type="password"
          placeholder="Password"
          v-model="password"
        />
        <input
          class="login-input"
          type="password"
          placeholder="Repeat Password"
          v-model="repeatPassword"
        />

        <div id="btn-group">
          <button class="btn" id="btn-login" @click="register">Sign Up</button>
          <h4 class="link" @click="swapForm">Login</h4>
        </div>
        <h3 id="pass-messge" v-if="isPass">{{ passMessage }}</h3>
        <h3 id="error-message" v-if="isError">{{ errorMessage }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import loginService from "@/services/login";
import registerService from "@/services/register";
export default {
  data() {
    return {
      username: "",
      password: "",
      isLoginForm: true,
      repeatPassword: "",
      isPass: false,
      isError: false,
      errorMessage: "",
      passMessage: ""
    };
  },
  methods: {
    resetInput() {
      this.username = "";
      this.password = "";
      this.repeatPassword = "";
    },
    swapForm() {
      this.isLoginForm = !this.isLoginForm;
      this.isError = false;
      this.isPass = false;
    },
    async login() {
      if (this.username !== "" && this.password !== "") {
        try {
          const { data } = await loginService(this.username, this.password);
          localStorage.setItem("token", data.jwt);
        } catch ({ response }) {
          this.isError = true;
          this.errorMessage = response.data.message;
          this.resetInput();
        }
      } else {
        this.isError = true;
        this.errorMessage = "Please input your username & password.";
        this.resetInput();
      }
    },
    async register() {
      if (this.username !== "" && this.password !== "") {
        if (this.password === this.repeatPassword) {
          try {
            await registerService(this.username, this.password);
            this.isError = false;
            this.isPass = true;
            this.passMessage = "registered Please Login";
            this.resetInput();
          } catch ({ response }) {
            this.isError = true;
            this.errorMessage = response.data.message;
            this.resetInput();
          }
        } else {
          this.isError = true;
          this.errorMessage = "Your password mismatch.";
          this.resetInput();
        }
      } else {
        this.isError = true;
        this.errorMessage = "Please input your username, password.";
        this.resetInput();
      }
    }
  }
};
</script>
<style scoped>
#container {
  display: flex;
  width: 80%;
  flex-grow: 2;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
}
#container > div {
  width: 100%;
}

#logo {
  display: block;
  margin: auto;
  width: 25%;
}

#login-form {
  width: 100%;
}

.login-input {
  font-size: 18px;
  padding-left: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  box-shadow: none !important;
  border: 1px solid #44afdd !important;
  width: 30%;
  height: 20px;
  border-radius: 20px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  display: block;
}
#btn-group {
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
  display: flex;
  justify-content: center;
  width: 30%;
}
#btn-login {
  background-color: #42a5f5;
  border-color: inherit;
  color: white;
  font-size: 18px;
}
.btn {
  width: 120px;
  border-radius: 30px;
  margin: 10px;
  display: block;
}

.link {
  color: #17466c;
  cursor: pointer;
}

#pass-messge {
  color: green;
  text-align: center;
}
#error-message {
  color: red;
  text-align: center;
}
/*
  responsive
*/
@media screen and (max-width: 812px) {
  #container {
    width: 90%;
    flex-direction: column;
  }

  #btn-group {
    width: 100%;
  }
  .login-input {
    width: 80%;
  }
  #logo {
    width: 100%;
  }
}
</style>
