<template>
    <div class="logout">
    </div>
</template>

<script>
import $ from 'jquery';
import ee from '@/inc/lang';
import AuthenModel from '@/models/authen';

export default {
    data() {
        return {
            ee,
        }
    },

    computed: {
        userId() {
            return this.$store.state.userId;
        }
    },

    async mounted() {
        if (this.userId) {
            var { status } = await AuthenModel.logout().catch(e=> {});
            if (status == 200) {
                this.$store.state.userId =
                    this.$store.state.user = null;
            }
        }

        this.$router.push({ name: 'Index' });
    },

    methods: {

    }
}
</script>

<style scoped>

</style>


// WEBPACK FOOTER //
// src/components/pages/Logout.vue