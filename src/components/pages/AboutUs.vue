<template>
    <div class="about-us">
        <p>{{ ee('Artist Training & Management') }}</p>
        <!-- <p>{{ ee('A member of VTQ Entertainment Group') }}</p> -->
        <p>{{ ee('The Entertainment company established by famous singer SON TUNG M-TP') }}</p>
        
    
        <p>||</p>
        <p>||</p>
        <p>||</p>
        <p :style="{ fontSize: '15px' }">Link facebook</p>
        
        <p class="socials">
            <a href="https://www.facebook.com/quyetchien1309" target="_blank"><i class="fab fa-facebook-square"></i></a>
            <!-- <a href="https://www.instagram.com/mtptalent/" target="_blank"><i class="fab fa-instagram-square"></i></a> -->
            <!-- <span><i class="fab fa-youtube-square"></i></span> -->
        </p>

        <div class="footer">
            <p><strong>Công ty cổ phần VTQ</strong>. GCNĐKDN số 0314678406 do Sở KH & ĐT TP.HCM cấp ngày 14/10/2017.</p>
            <p>Địa chỉ: <strong>Tầng 7, Cao ốc Đại Minh Convention, 77 Hoàng Văn Thái, Phường Tân Phú, Quận 7, Thành phố Hồ Chí Minh</strong></p>
            <p>Điện thoại: <strong>028 5410 2202</strong></p>
            <p>Email: <strong>mtp@mtptalent.com</strong></p>
            <p><a href='http://online.gov.vn/Home/WebDetails/76152' target="_blank"><img alt='' width="150" title='' src='static/logoSaleNoti.png' /></a></p>
        </div>
    </div>
</template>

<script>
import ee from '@/inc/lang';

export default {
    data() {
        return {
            ee
        };
    }
}
</script>

<style scoped>
.about-us {
    font-size: 20px;
    color: #333;
    font-family: SFUDin;
    margin-top: 100px;
}

.footer {
    border-top: 1px dashed #ccc;
    margin-top: 20px;
    padding-top: 20px;
    font-size: 12px;
    line-height: 1;
}

.socials a {
    color: #333;
    font-size: 30px;
}

p {
    text-transform: uppercase;
}

@media screen and (max-width: 1200px) {
    .about-us {
        font-size: 18px;
    }
}

@media screen and (max-width: 800px) {
    .about-us {
        font-size: 15px;
        text-align: center;
        padding-top: 100px;
    }
}
</style>


// WEBPACK FOOTER //
// src/components/pages/AboutUs.vue