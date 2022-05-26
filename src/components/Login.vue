<template>
  <div class="overlay">
    <header-logged-out />
    <div class="frame">
      <div class="login-box">
        <h1>Sign In</h1>
        <div v-if="errorDiv" class="errorDiv">
          <div v-if="loginError"><strong>Incorrect password.</strong><br> Please try again.</div>
        </div>
        <transition name="fade" appear>
          <div v-if="successDiv" class="successDiv">Registration successful</div>
        </transition>
        <div class="input-container" :class="{ 'error': emailError }">
          <input type="text" v-model="user.email" placeholder="Email or phone number">
          <span class="error" v-if="emailError">Please enter a valid email or phone number.</span>
        </div>
        <div class="input-container" :class="{ 'error': passwordError }">
          <input type="password" v-model="user.password" placeholder="Password">
          <span class="error" v-if="passwordError">Your password must contain between 4 and 60 characters.</span>
        </div>
        <button @click.prevent="onSubmit">Sign In</button>
        <div class="register">
          <p>New to Netflix?
            <router-link to="/" exact>Sign up now.</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headerLoggedOut from './header-logged-out';
import Helper from '../services/helper';

export default {
  components: { headerLoggedOut },
  data() {
    return {
      user: {
        email: null,
        password: null
      },
      errorDiv: false,
      loginError: false,
      emailError: false,
      passwordError: false,
      successDiv: false
    };
  },
  methods: {
    onSubmit() {
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA2Ofw_Hu-qjWjmR9Y_7Q7FRo5PSTirCNA',
        {
          method: 'POST',
          body: JSON.stringify({ email: this.user.email, password: this.user.password, returnSecureToken: true })
        })
        .then(res => {
          if (res.ok) return res.json();
        })
        .then(data => {
          if (data.registered === true) {
            this.$store.state.token = data.idToken;
            this.$store.state.userEmail = data.email;
            this.$store.state.userLocalID = data.localId;
            localStorage.setItem('token', this.$store.state.token);
            localStorage.setItem('userEmail', this.$store.state.userEmail);
            localStorage.setItem('localId', this.$store.state.userLocalID);
            this.$router.push('/browse');
          }
        })
        .catch(() => {
          this.errorDiv = true;
          this.loginError = true;
        });
    }
  },
  created() {
    if (this.$store.state.startEmail !== null) {
      this.user.email = this.$store.state.startEmail;
    }
  },
  watch: {
    'user.email'() {
      this.emailError = !Helper.emailIsValid(this.user.email);
    },
    'user.password'() {
      this.passwordError = (this.user.password == null || this.user.password.length < 6);
    }
  }
};
</script>

<style scoped>
.input-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  max-width: 300px;
}

.input-container input {
  width: 300px;
  height: 42px;
  background: #333333;
  outline: none;
  border-radius: 5px;
  color: white;
  text-indent: 20px;
  border: none;
  border-bottom: 2px solid;
  border-bottom-color: transparent;
}

.input-container.error input {
  border-bottom-color: #e87c03;
}

.input-container span {
  margin-top: 5px;
  margin-left: 5px;
  font-size: 13px;
  color: #e87c03;
}

input:focus {
  background: #454545;
}

.login-box input::placeholder {
  color: #8c8c8c;
  font-family: FreeSans,sans-serif;
  font-size: 15px;
}

.successDiv {
  width: 300px;
  height: auto;
  padding: 10px 0 10px 0;
  background: #95f319;
  border-radius: 5px;
  margin-bottom: 10px;
  font-family: FreeSans,sans-serif;
  font-size: 13px;
  text-align: center;
  color: rgb(0, 0, 0)
}

.errorDiv {
  width: 300px;
  height: auto;
  padding: 10px 0 10px 0;
  background: #e87c03;
  border-radius: 5px;
  margin-bottom: 10px;
  font-family: FreeSans,sans-serif;
  font-size: 13px;
  text-align: center;
  color: white
}

.register a {
  color: white;
}

.register a:hover {
  cursor: pointer;
  text-decoration: underline;
}

.register p {
  color: #8c8c8c;
}

.register {
  margin-top: 10px;
}

.header img {
  width: 80%;
  margin-top: 22px;
  margin-left: 48px;
}

.frame {
  position: fixed;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.6);
}

.overlay {
  background-size: cover;
  background: url('https://i.ibb.co/ynf52h8/zgeTuV.jpg') no-repeat center;
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.login-box h1 {
  color: white;
  font-size: 29px;
  width: 300px;
  margin-top: 55px;
}

.login-box button {
  margin-top: 25px;
  width: 300px;
  height: 45px;
  background: #e50914;
  border: 0;
  outline: 0;
  color: white;
  font-size: 15px;
  font-weight: 600;
  border-radius: 5px;
}

.login-box button:hover {
  cursor: pointer;
}

.login-box {
  width: 423px;
  height: auto;
  background: rgba(0, 0, 0, 0.75);
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 50px;
}

@media (max-width: 425px) {
  .login-box {
    width: 90%;
    height: auto;
    padding-bottom: 50px;
  }

  .register p {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
