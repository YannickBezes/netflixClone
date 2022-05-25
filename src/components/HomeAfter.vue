<template>
  <div class="overlay">
    <header-logged-out/>
    <div class="login-button">
      <button @click="login" class="login">Sign in</button>
    </div>
    <div class="frame">
      <div class="content">
        <h1>Unlimited movies, TV shows, and more.</h1>
        <p>Watch anywhere. Cancel anytime.</p>
        <p>Ready to watch? Enter your email to create or restart your membership.</p>
        <div class="inputDiv">
          <input type="text" v-model="email" placeholder="Email address"/>
          <button @click="clickButton">Get Started<i class="bi bi-chevron-right"></i></button>
        </div>
        <div class="errorBox" v-if="errorBox">
          Please enter a valid email address
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headerLoggedOut from './header-logged-out';

export default {
  data() {
    return {
      email: null,
      errorBox: false
    };
  },
  components: { headerLoggedOut },
  methods: {
    clickButton() {
      if (this.email == null) {
        this.errorBox = true;
      } else {
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (this.email.match(validRegex)) {
          this.$store.state.emailEmail = this.email;
          this.$router.push('/login');
        } else {
          this.errorBox = true;
        }
      }
    },
    login() {
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.errorBox {
  width: 455px;
  height: 30px;
  background: rgba(0, 0, 0, 0.5);
  margin-left: 48px;
  border-bottom-right-radius: 3px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  font-family: FreeSans, sans-serif;
  align-items: center;
}

.inputDiv i {
  font-size: 20px;
  margin-left: 7px;
}

.login-button {
  position: absolute;
  right: 0;
  z-index: 1;
  padding: 20px;
}

.login:hover {
  cursor: pointer;
}

.login {
  width: 113px;
  height: 33px;
  border-radius: 3px;
  border: 0;
  outline: 0;
  color: white;
  background: #e50914;
  font-family: FreeSans, sans-serif;
  font-weight: 600;
  font-size: 16px;
}

.inputDiv button {
  height: 70px;
  border: 0;
  outline: 0;
  background-color: #e30914;
  color: white;
  font-size: 30px;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  font-family: Arial, Helvetica, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
}

.inputDiv button:hover {
  cursor: pointer;
  background-color: #f40612;
}

.inputDiv input {
  width: 450px;
  height: 70px;
  border: 0;
  outline: 0;
  text-indent: 10px;
}

.inputDiv {
  margin-top: 25px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content p:nth-of-type(2) {
  margin-top: -18px;
  font-size: 17px;
}

.content p {
  margin-top: -18px;
  font-size: 24px;
}

.content {
  font-family: sans-serif;
  text-align: center;
  width: 750px;
  height: 500px;
  color: white;
  font-size: 28px;
}


.overlay {
  background-size: cover;
  background: url("https://i.ibb.co/ynf52h8/zgeTuV.jpg") no-repeat center;
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.frame {
  position: fixed;
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.75);
}

@media (max-width: 748px) {
  .content {
    width: 90%;
  }

  .errorBox {
    width: 100%;
    margin-left: 0;
  }
}
</style>
