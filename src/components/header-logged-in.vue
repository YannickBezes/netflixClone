<template>
  <div :class="windowTop > 0 ? 'headerActive' : 'header'">
    <div class="items">
      <div class="left">
        <div class="logo">
          <img src="https://i.ibb.co/pj8vz72/netflix-Logo.png" alt="">
        </div>
        <div class="routers">
          <router-link tag="a" active-class="navActive" to="/browse" exact>Home</router-link>
          <router-link tag="a" active-class="navActive" to="/browse/series" exact>TV Shows</router-link>
          <router-link tag="a" active-class="navActive" to="/browse/movies" exact>Movies</router-link>
          <router-link tag="a" active-class="navActive" to="/browse/new-popular" exact>New & Popular</router-link>
          <router-link tag="a" active-class="navActive" to="/browse/list" exact>My List</router-link>
        </div>
      </div>
      <div class="right">
        <div v-click-outside="onClickOutside" id="search" :class="searchClick ? 'searchActive' : 'search' ">
          <i @click="searchClick = !searchClick" class="fas fa-search"></i>
          <input
            id="searchInput"
            ref="searchInput"
            v-if="searchClick"
            v-model="searchValue"
            type="text"
            placeholder="Titles, people, genres"
          >
        </div>
        <i style="font-size:20px;" class="fas fa-bell"></i>
        <div class="profile" @mouseenter="profileHover = true">
          <div class="profile-box">
            <img src="https://i.ibb.co/P4Gtz8S/0ddccae723d85a703b798a5e682c23c1.png" alt="">
            <i style="font-size:13px ; margin-left:5px" class="fas fa-caret-down"></i>
          </div>
          <div v-if="profileHover" @mouseleave="profileHover = false" class="profile-settings-frame">
            <div class="profile-settings">
              <div class="email"><p>{{ $store.state.userEmail }}</p></div>
              <p @click="logout">Sign Out of Netflix</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--    <div class="items2">-->
    <!--      <div class="popupMenu" v-if="browseShow" @mouseleave="browseMenu('menuleave')" :style="popupMenu">-->
    <!--        <div class="icon"><i style="color:white" class="fas fa-sort-up"></i></div>-->
    <!--        <div class="item">-->
    <!--          <router-link tag="p" active-class="navActiveR" to="/browse" exact>Home</router-link>-->
    <!--        </div>-->
    <!--        <div class="item">-->
    <!--          <router-link tag="p" active-class="navActiveR" to="/browse/series" exact>TV Shows</router-link>-->
    <!--        </div>-->
    <!--        <div class="item">-->
    <!--          <router-link tag="p" active-class="navActiveR" to="/browse/movies" exact>Movies</router-link>-->
    <!--        </div>-->
    <!--        <div class="item">-->
    <!--          <router-link tag="p" active-class="navActiveR" to="/browse/new-popular" exact>New & Popular</router-link>-->
    <!--        </div>-->
    <!--        <div class="item">-->
    <!--          <router-link tag="p" active-class="navActiveR" to="/browse/list" exact>My List</router-link>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <div class="left">-->
    <!--        <div class="logo"><img src="../assets/img/netflixLogo.png" alt="" srcset=""></div>-->
    <!--        <div @click="browseClick" style="display:flex; justify-content:flex-start; color:white; "-->
    <!--             @mouseover="gozatMenu('over')" class="responsive-menu">-->
    <!--          <a style="margin-left:10px">Göz at</a><i style="font-size:12px; margin-left:-9px"-->
    <!--                                                   class="fas fa-sort-down"></i>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <div class="right">-->
    <!--        <div class="searchMobile">-->
    <!--          <i @click="searchClick = !searchClick" class="fas fa-search"></i>-->
    <!--          <div v-if="searchClick ? true : false" id="search-m" style="transition:0.3s"-->
    <!--               :class="searchClick ? 'searchActive' : 'search' ">-->
    <!--            <i @click="searchClick = !searchClick" class="fas fa-search"></i>-->
    <!--            <input id="searchInput" ref="searchInput" v-model="searchValue" type="text"-->
    <!--                   placeholder="İçerik , kişi , tür">-->
    <!--          </div>-->
    <!--        </div>-->

    <!--        <div id="search" :class="searchClick ? 'searchActive' : 'search' ">-->
    <!--          <i @click="searchClick = !searchClick" class="fas fa-search"></i>-->
    <!--          <input id="searchInput" ref="searchInput" autocomplete="off" v-if="searchClick ? true : false"-->
    <!--                 v-model="searchValue" type="text" placeholder="İçerik , kişi , tür">-->
    <!--        </div>-->
    <!--        <i id="bildirimicon" style="font-size:20px;" class="fas fa-bell"></i>-->
    <!--        <div class="profile">-->
    <!--          <div class="profile-box" @click="profileHover = !profileHover">-->
    <!--            <img src="https://i.ibb.co/P4Gtz8S/0ddccae723d85a703b798a5e682c23c1.png" alt="">-->
    <!--            <i style="font-size:13px ; margin-left:5px" class="fas fa-caret-down"></i>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--        <div id="mobilsettings" v-if="profileHover" class="profile-settings-frame-m">-->
    <!--          <div class="profile-settings-m">-->
    <!--            <div class="email"><p>{{ $store.state.userEmail }}</p></div>-->
    <!--            <p @click="logout">Netflix Oturumunu Kapat</p>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </div>-->
  </div>
</template>

<script>
import clickOutside from '../directives/v-click-outside';

export default {
  name: 'header-logged-in',
  directives: {
    clickOutside
  },
  data() {
    return {
      windowTop: 0,
      searchClick: false,
      searchValue: '',
      popupMenu: 'display:none',
      browseShow: false,
      profileHover: false
    };
  },
  mounted() {
    window.addEventListener('scroll', () => {
      this.windowTop = window.scrollY;
    });
  },
  watch: {
    'searchValue'() {
      this.$store.state.searchValue = this.searchValue;
      if (this.searchValue.length === 1 && this.searchClick === true) {
        this.$router.push({ name: 'search' });
      } else if (this.searchValue.length === 0) {
        this.$router.go(-1);
      }
    },
    'searchClick'(value) {
      this.searchClick = value;
      if (this.searchClick === false && this.searchValue.length >= 1 && this.$store.state.popup === false) {
        this.searchValue = '';
        this.$router.go(-1);
      }
    }
  },
  methods: {
    onClickOutside() {
      if (this.searchClick) {
        this.searchClick = false;
      }
    },
    browseMenu(value) {
      if (value === 'over') {
        this.popupMenu = 'display:flex; transition:0.3s';
      } else if (value === 'menuleave') {
        this.popupMenu = 'display:none; transition:0.3s';
      }
    },
    browseClick() {
      this.browseShow = !this.browseShow;
    },
    logout() {
      this.$store.state.token = '';
      this.$store.state.userEmail = '';
      this.$store.state.userLocalID = '';
      localStorage.removeItem('token');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('localId');
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>


.email {
  border-bottom: 1px solid #999999;
}

.profile-settings-frame-m {
  width: 100%;
  height: 100px;
  position: absolute;
  margin-top: 70px;
  margin-right: 7px;
  padding: 0px;
}

.profile-settings-m {
  position: absolute;
  right: 0;
  width: 180px;
  height: auto;
  background: #000101;
  border: 1px solid #262727;
}


.profile-settings-frame {
  position: absolute;
  margin-top: 10px;
  margin-left: -120px;
}

.profile-settings p {
  width: 100%;
  text-align: center;
  font-size: 10px;
  font-family: FreeSans;
}

.profile-settings-m p {
  width: 100%;
  text-align: center;
  font-size: 10px;
  font-family: FreeSans;
}

.profile-settings p:hover {
  cursor: pointer;
}


.profile-settings {
  position: absolute;
  width: 160px;
  height: auto;
  background: #000101;
  border: 1px solid #262727;
}


.responsive-menu:hover {
  cursor: pointer;
}


.popupMenu {
  position: absolute;
  top: 50px;
  left: 50px;
  z-index: 5;
  width: 200px;
  height: 250px;
  flex-direction: column;
  align-items: center;
}

.icon {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  border-bottom: 2px solid white;
}

.icon i {
  margin-bottom: -10px;
}

.items2 a:hover {
  color: white;
}


.popupMenu .item {
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.9);
  width: 100%;
  height: 40px;
  font-family: FreeSans;
  font-weight: 600;
  color: #999999;
  font-size: 12px;
  transition: 1s;
}

.item:hover {
  transition: 1s;
  cursor: pointer;
  background: rgba(29, 29, 29, 0.9);
}

.item i {
  color: white;
}


.profile-box i {
  transition: 0.3s;
}

.profile-box:hover i {
  transition: 0.3s;
  transform: rotateX(180deg);
}

.profile-box:hover {
  cursor: pointer;
}

.right i:hover {
  cursor: pointer;
}


#search input {
  margin-left: -17px;
  width: 160px;
  background: transparent;
  border: 0px;
  outline: 0;
  color: white;
}

#search input::placeholder {
  color: #999999;
}

.searchActive {
  padding-left: 6px;
  margin-right: 5px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  animation: searchInput 0.5s ease-out;
  animation-fill-mode: forwards;
  height: 30px;
  background: black;
  border: 1px solid white;
  transition: 0.3s;
}


@keyframes searchInput {
  from {
    width: 0;
  }
  to {
    width: 200px;
  }
}

@media (max-width: 500px) {
  @keyframes searchInput {
    from {
      width: 0;
    }
    to {
      width: 120px;
    }
  }
}

.searchMobile {
  display: none;
}

@media (max-width: 375px) {

  .searchMobile {
    display: flex;
  }

  #search {
    display: none;
  }

  #search-m input {
    margin-left: -17px;
    width: 160px;
    background: transparent;
    border: 0;
    outline: 0;
    color: white;
  }

  #search-m input::placeholder {
    color: #999999;
  }

  .searchActive {
    position: fixed;
    padding-left: 6px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    animation: searchInput 0.5s ease-out;
    animation-fill-mode: forwards;
    height: 30px;
    background: black;
    border: 1px solid white;
    transition: 0.3s;
    margin-top: 30px;
    margin-left: -160px;
  }


  @keyframes searchInput {
    from {
      opacity: 0;
      width: 0;
    }
    to {
      opacity: 1;
      width: 230px;
    }
  }
}


.search {
  transition: 0.3s;
}


.profile-box {
  margin-left: 17px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
}

.profile-box img {
  border-radius: 0.17vw;
  width: 100%;
}

.routers {
  margin-left: 30px;
  display: flex;
  height: 100%;
  align-items: center;
}

.logo img {
  width: 89%;
  margin-left: 2px;
}


.header {
  transition: 0.5s;
  width: 100%;
  height: 68px;
  top: 0;
  left: 0;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
}

.headerActive {
  top: 0;
  left: 0;
  transition: 0.5s;
  width: 100%;
  height: 68px;
  position: fixed;
  display: flex;
  background: #101010;
  justify-content: center;
  align-items: center;
}

.items {

  display: flex;
  justify-content: center;
  align-items: center;
  width: 94%;
  height: 100%;
}

.left {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 70%;
  height: 100%;
}

.right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 30%;
  height: 100%;
  color: white;
}

.right i {
  font-size: 17px;
  margin-right: 25px;
}

.right p {
  color: white;
  font-family: 'Circular Std Book';
  font-size: 13.3px;
  margin-right: 20px;
  font-weight: 400;
  opacity: 0.9;
  transition: 0.5s;
  text-decoration: none;
}


a {
  margin-bottom: 4px;
  color: white;
  font-family: 'Circular Std Book';
  font-size: 13.3px;
  margin-right: 18px;
  font-weight: 400;
  opacity: 0.9;
  transition: 0.5s;
  text-decoration: none;
}


a:hover {
  cursor: pointer;
  color: #b0b0b0;
  transition: 0.5s;
}

.navActive {
  transition: 0.5s;
  font-weight: 600;
  color: #ffffff;
}

.navActiveR {
  transition: 0.5s;
  color: #ffffff;

}

.items2 {

  display: none;
  justify-content: center;
  align-items: center;
  width: 94%;
  height: 100%;
}


@media (max-width: 895px) {
  .items {
    display: none;
  }

  .items2 {
    display: flex;
  }
}


</style>
