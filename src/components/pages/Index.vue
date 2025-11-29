<template>
    <div>
        <TextE1 
            ref="text1"
            text="Nguyễn Trương Quang Minh" 
            style="color: #fff; font-size:30px"
        />

        <br/>

        <TextE1 
            ref="text2"
            text="Một chiều lang thang đi interet" 
            style="color: #fff"
        />

        <br>

        <button @click="()=> ($refs.text1.toggle(), $refs.text2.toggle())">toggle</button>
    </div>
</template>

<script>
import TextE1 from '@/components/text/e_1';

export default {
    components: {
        TextE1
    },

    mounted() {
    },
}
</script>



// WEBPACK FOOTER //
// src/components/pages/Index.vue