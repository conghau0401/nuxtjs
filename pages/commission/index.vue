<template>
  <v-container>
    <v-row no-gutters>
      <v-col>
        <v-card class="pa-2" outlined tile>Carrier</v-card>
      </v-col>
      <v-col order="12">
        <v-card class="pa-2" outlined tile>Commission</v-card>
      </v-col>
      <v-col order="1">
        <v-card class="pa-2" outlined tile>Kabu</v-card>
      </v-col>
    </v-row>
    <v-row no-gutters v-for="(item, i) in commissions" :key="i">
      <v-col>
        <v-card class="pa-2" outlined tile>{{item.carrier}}</v-card>
      </v-col>
      <v-col order="12">
        <v-card class="pa-2" outlined tile>{{item.commission}}</v-card>
      </v-col>
      <v-col order="1">
        <v-card class="pa-2" outlined tile>{{item.kabu}}</v-card>
      </v-col>
    </v-row>
    <v-row>
        <v-dialog v-model="dialog" max-width="600px">
          <template v-slot:activator="{ on }">
            <v-btn class="mx-3 mt-5" v-on="on" dark color="blue">
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Register New carrier dialog</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <form>
                  <v-text-field
                    v-model="carrier"
                    :error-messages="carrierErrors"
                    label="Carrier*"
                    required
                    @input="$v.carrier.$touch()"
                    @blur="$v.carrier.$touch()"
                  ></v-text-field>
                  <v-text-field
                    v-model="commission"
                    :error-messages="commissionErrors"
                    label="Commission*"
                    required
                    @input="$v.commission.$touch()"
                    @blur="$v.commission.$touch()"
                  ></v-text-field>
                  <v-text-field
                    v-model="kabu"
                    :error-messages="kabuErrors"
                    label="Kabu*"
                    required
                    @input="$v.kabu.$touch()"
                    @blur="$v.kabu.$touch()"
                  ></v-text-field>
                  <v-card-actions class="pr-0">
                    <v-spacer></v-spacer>
                    <v-btn class="mx-2" @click="clear" dark color="blue">clear</v-btn>
                    <v-btn class="ml-2" @click="submit" dark color="blue">Save</v-btn>
                  </v-card-actions>
                </form>
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>
    </v-row>
  </v-container>
</template>


<script>
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import axios from "axios";

export default {
  //form validate
  mixins: [validationMixin],

    validations: {
      carrier: { required },
      commission: { required },
      kabu: { required },
    },

    data: () => ({
      dialog: false,
      carrier: '',
      commission: '',
      kabu: '',
    }),

    computed: {
      carrierErrors () {
        const errors = []
        if (!this.$v.carrier.$dirty) return errors
        !this.$v.carrier.required && errors.push('Carrier is required.')
        return errors
      },
      commissionErrors () {
        const errors = []
        if (!this.$v.commission.$dirty) return errors
        !this.$v.commission.required && errors.push('Commission is required')
        return errors
      },
      kabuErrors () {
        const errors = []
        if (!this.$v.kabu.$dirty) return errors
        !this.$v.kabu.required && errors.push('Kabu is required')
        return errors
      },
    },

    methods: {
      submit () {
        this.$v.$touch()
      },
      clear () {
        this.$v.$reset()
        this.carrier = ''
        this.commission = ''
        this.kabu = ''
      },
    },

  // show element API
  // C1 --good
  asyncData({ params }) {
    return axios
      .get("http://5dccdf0485d1960014616347.mockapi.io/api/v1/commission")
      .then(res => {
        return { commissions: res.data };
      })
      .catch(err => {
        console.log(err);
      });
  }
};
// C2 --good
// export default {
//   async asyncData ({ params }) {
//     const { data } = await axios.get('http://5dccdf0485d1960014616347.mockapi.io/api/v1/commission')
//     return { commissions: data }
//   }
// }
// C3 --good
// export default {
//   data () {
//     return {
//       commissions: []
//     }
//   },
//   mounted() {
//     axios.get('http://5dccdf0485d1960014616347.mockapi.io/api/v1/commission')
//     .then( res => {
//       console.log(res)
//       this.commissions = res.data
//       return {commissions: res.data}
//     })
//   }
// }
</script>


