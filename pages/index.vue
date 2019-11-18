<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <v-card>
        <v-card-title class="headline">
          hello {{ username }}.
        </v-card-title>
        <v-card-text>
          <p v-if="dev">Development mode is {{ dev }}</p>
          <p></p>
          <nuxt-link to="/auth">auth</nuxt-link>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  computed: {
    username() {
      return this.$store.state.login.username
    },
    dev() {
      return this.isDev
    },
    email() {
      return this.$store.state.login.email
    }
  },
}
</script>
