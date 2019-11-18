<template>
  <v-card class="elevation-12">
    <v-card-title class="headline">
        {{ title }}
    </v-card-title>
    <v-card-text>
      <section>
        <p v-if='username'>Hi {{ username }}.</p>
        <p v-else>You are logged out.</p>
      </section>
    </v-card-text>
    <v-card-actions>
      <v-btn
        v-if='!username'
        color="primary"
        block
        v-on:click='federatedSignIn'
      >
        Sign in.
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { Auth, Hub } from 'aws-amplify'

export default {
  layout: 'centered',

  asyncData(ctx) {
    console.log(ctx)
    return {
      title: ctx.env.title
    }
  },

  computed: {
    username() {
      return this.$store.state.login.username
    }
  },
  fetch({ redirect }) {
    Hub.listen("auth", ({ payload: { event, data } }) => {
      if ('signIn' === event) {
          console.log('[Hub] auth signIn')
          console.log(data);
          setTimeout(function() {
            redirect('/');
          }.bind(this), 3000);
      }
    });
  },
  mounted(){
    const vm = this;
    return Auth.currentAuthenticatedUser()
      .then(user => {
        console.log(`[auth] logged in as ${user.username}`);
        vm.$data.username = user.username
        vm.$router.push('/')
      })
      .catch(err => {
        console.log('[auth] authentication failed');
        console.log(err)
      });
  },
  methods: {
    federatedSignIn() {
      Auth.federatedSignIn();
    }
  }
}
</script>
