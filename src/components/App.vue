<template>
  <div id="app">
    <div id="particles-js" class="animated fadeIn"></div>
    <section class="hero is-fullheight has-text-centered" v-show="animation.ready">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-spaced is-size-2 animated fadeInLeft">
            Vladimir Avgustov
          </h1>
          <h2 class="subtitle is-size-4 animated fadeInRight">
            Ruby on Rails | Full Stack Web Developer
          </h2>
          <div class="social is-size-2 animated fadeInLeft">
            <a id="github" title="GitHub" href="https://github.com/vavgustov" target="_blank">
              <i class="fa fa-github"></i>
            </a>
            <a id="linkedin" title="LinkedIn" href="https://www.linkedin.com/in/vavgustov" target="_blank">
              <i class="fa fa-linkedin"></i>
            </a>
            <a id="email" title="Email" href="mailto:vavgustov@yandex.ru">
              <i class="fa fa-envelope"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import 'particles.js'

  const processAnimation = (component) => {
    if (!component.animation.ready) {
      let delay = -component.animation.delay
      component.animation.order.forEach(selectors => {
        delay = delay + component.animation.delay
        selectors.forEach(selector => {
          component.$el.querySelector(selector).style['animation-delay'] = delay / 1000 + 's'
        })
      })
    }
    component.animation.ready = true
  }

  export default {
    name: 'app',

    data() {
      return {
        animation: {
          order: [
            ['.title'],
            ['.subtitle'],
            ['.social']
          ],
          delay: 500,
          ready: false
        }
      }
    },

    mounted() {
      particlesJS.load('particles-js', 'static/particles.json')

      setTimeout(() => {
        processAnimation(this)
      }, this.animation.delay)

    }
  }
</script>

<style lang="scss">
  $fa-font-path : '~font-awesome/fonts';
  $bg-color: #282c37;

  @import "~bulma";
  @import "~animate.css/animate";
  @import "~font-awesome/scss/font-awesome";

  html {
    background: $bg-color;
  }

  .hero {
    a {
      color: $white;
      margin: 0.5rem;

      &:hover {
        color: $turquoise;
      }
    }

    .container {
      min-height: 220px;
    }
  }

  .title,
  .subtitle {
    color: $white;
  }

  .animated {
    animation-duration: 0.4s;

    &.fadeIn {
      animation-duration: 8s;
    }
  }

  #particles-js {
    position: absolute;
    height: 100%;
    width: 100%;

    canvas {
      opacity: 0.5;
    }
  }
</style>
