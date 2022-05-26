<template>
  <div id="footer" class="mainFooter">
    <div class="frame">
      <div class="icons">
        <i class="fab fa-facebook-f"></i>
        <i class="fab fa-instagram"></i>
        <i class="fab fa-twitter"></i>
        <i class="fab fa-youtube"></i>
      </div>
      <div class="links">
        <div class="row">
          <label>Audio and Subtitles</label>
          <label>Media Center</label>
          <label>Security</label>
          <label>Contact us</label>
        </div>
        <div class="row">
          <label>Audio Description</label>
          <label>Investor Relations</label>
          <label>Legal Provisions</label>
        </div>
        <div class="row">
          <label>Help center</label>
          <label>Job opportunities</label>
          <label>Cookie Preferences</label>
        </div>
        <div class="row">
          <label>Gift Cards</label>
          <label>Terms of Use</label>
          <label>Corporate Information</label>
        </div>
      </div>
      <div class="service-code"><p>Service Code</p></div>
      <div class="footer">© 2022 Netflix Clone - Vue Js</div>
    </div>
    <div class="frame2">
      <div class="icons">
        <i class="fab fa-facebook-f"></i>
        <i class="fab fa-instagram"></i>
        <i class="fab fa-twitter"></i>
        <i class="fab fa-youtube"></i>
      </div>
      <div class="links2">
        <div class="row">
          <label>Audio and Subtitles</label>
          <label>Help center</label>
          <label>Media Center</label>
          <label>Job opportunities</label>
          <label>Security</label>
          <label>Cookie Preferences</label>
          <label>Contact us</label>
        </div>
        <div class="row">
          <label>Audio Description</label>
          <label>Gift Cards</label>
          <label>Investor Relations</label>
          <label>Terms of Use</label>
          <label>Legal Provisions</label>
          <label>Corporate Information</label>
        </div>
      </div>
      <div class="service-code"><p>Service Code</p></div>
      <div class="footer">© 2022 Netflix Clone - Vue Js</div>
    </div>
  </div>
</template>

<style scoped>
.mainFooter {
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

.frame {
  display: flex;
  flex-direction: column;
  width: 890px;
  height: 250px;
  color: #808080;
  padding-left: 20px;
  padding-right: 20px;
}

.frame2 {
  display: none;
  flex-direction: column;
  width: 890px;
  height: 350px;
  color: #808080;
  padding-left: 20px;
  padding-right: 20px;
}

.links2 {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  height: 46%;
}

.links2 .row:nth-child(2) {
  margin-right: 80px;
}

@media (max-width: 580px) {
  .frame {
    display: none;
  }

  .frame2 {
    display: flex;
  }
}

.frame2 .service-code {
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
}

.footer {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  font-size: 10.2px;
  height: 10%;

}

.service-code {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: 24%;
}

.service-code p {
  font-size: 12px;
  padding: 6px;
  border: 1px solid #808080;;
}

.service-code p:hover {
  color: white;
  cursor: pointer;
}

.links {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  height: 46%;
}

.icons {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 20%;
  margin-left: 9px;
  margin-bottom: 4px;
}

.icons i {
  font-size: 20px;
  margin-right: 30px;
  color: white;
}

.row {
  display: flex;
  flex-direction: column;
}

.row label {
  font-size: 12px;
  margin-bottom: 15px;
}

.row label:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>
