import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout'
import Index from '@/components/pages/Index'
import AboutUs from '@/components/pages/AboutUs'
import Artist from '@/components/pages/Artist'
import Multimedia from '@/components/pages/Multimedia'
import Schedule from '@/components/pages/Schedule'
import Contact from '@/components/pages/Contact'
import Shop from '@/components/pages/Shop'
import Product from '@/components/pages/Product'
import Login from '@/components/pages/Login'
import Logout from '@/components/pages/Logout'
import Cart from '@/components/pages/Cart'
import ShippingInfo from '@/components/pages/ShippingInfo'
import CheckOut from '@/components/pages/CheckOut'
import PurchaseTransfer from '@/components/pages/PurchaseTransfer'
import CheckOutDone from '@/components/pages/CheckOutDone'
import CreateNewAccount from '@/components/pages/CreateNewAccount'
import VerifyAccount from '@/components/pages/VerifyAccount'
import UpdateAccount from '@/components/pages/UpdateAccount'
import ResetPassword from '@/components/pages/ResetPassword'
import PrivacyPolicy from '@/components/pages/PrivacyPolicy'
import Test from '@/components/pages/Test'

Vue.use(Router)

export default new Router({
    routes: [
        // {
        //     path: '/test',
        //     component: Test
        // },
        {
            path: '/',
            component: Layout,
            children: [
                {
                    path: '/',
                    name: 'Index',
                    redirect: '/about-us',
                    // meta: { 
                    //     background: true
                    // },
                    // component: Index
                },
                {
                    path: '/menu',
                    name: 'Menu',
                    meta: { themeDark: true }
                },
                {
                    path: '/about-us',
                    name: 'AboutUs',
                    meta: { 
                        title: 'About Us',
                        themeDark: false,
                        background: true
                    },
                    component: AboutUs
                },
                {
                    path: '/artist',
                    name: 'Artist',
                    meta: { 
                        title: 'Artist', 
                        // themeDark: false,
                        background: false,
                    },
                    component: Artist
                },
                {
                    path: '/multimedia',
                    name: 'Multimedia',
                    meta: { 
                        title: 'Multimedia', 
                        themeDark: false,
                        background: true
                    },
                    component: Multimedia
                },
                {
                    path: '/schedule',
                    name: 'Schedule',
                    meta: { 
                        title: 'Schedule', 
                        themeDark: false,
                        background: true
                    },
                    component: Schedule
                },
                {
                    path: '/contact',
                    name: 'Contact',
                    meta: { 
                        title: 'Contact', 
                        themeDark: false,
                        background: true
                    },
                    component: Contact
                },
                {
                    path: '/shop',
                    name: 'Shop',
                    meta: { 
                        title: 'Shop', 
                        themeDark: false,
                        background: true
                    },
                    component: Shop
                },
                {
                    path: '/shop/product/:productId',
                    name: 'Product',
                    meta: { 
                        title: 'Product', 
                        themeDark: false,
                        background: true
                    },
                    component: Product
                },
                {
                    path: '/login',
                    name: 'Login',
                    meta: { 
                        title: 'Login', 
                        themeDark: false,
                        background: true
                    },
                    component: Login
                },
                {
                    path: '/logout',
                    name: 'Logout',
                    meta: { 
                        title: 'Logout', 
                        themeDark: false,
                        background: true
                    },
                    component: Logout
                },
                {
                    path: '/cart',
                    name: 'Cart',
                    meta: { 
                        title: 'Cart', 
                        themeDark: false,
                        background: true
                    },
                    component: Cart
                },
                {
                    path: '/shipping-info',
                    name: 'ShippingInfo',
                    meta: { 
                        title: 'Shipping Information', 
                        themeDark: false,
                        background: true
                    },
                    component: ShippingInfo
                },
                {
                    path: '/checkout',
                    name: 'CheckOut',
                    meta: { 
                        title: 'Purchasing Methods', 
                        themeDark: false,
                        background: true
                    },
                    component: CheckOut
                },
                {
                    path: '/purchse/transfer',
                    name: 'PurchaseTransfer',
                    meta: { 
                        title: 'Purchase Transfer', 
                        themeDark: false,
                        background: true
                    },
                    component: PurchaseTransfer
                },
                {
                    path: '/checkout/done',
                    name: 'CheckOutDone',
                    meta: { 
                        title: 'Completed Order', 
                        themeDark: false,
                        background: true
                    },
                    component: CheckOutDone
                },
                {
                    path: '/account/new',
                    name: 'CreateNewAccount',
                    meta: { 
                        title: 'Sign Up', 
                        themeDark: false,
                        background: true
                    },
                    component: CreateNewAccount
                },
                {
                    path: '/account/verify',
                    name: 'VerifyAccount',
                    meta: { 
                        title: 'Account Verification', 
                        themeDark: false,
                        background: true
                    },
                    component: VerifyAccount
                },
                {
                    path: '/account/update',
                    name: 'UpdateAccount',
                    meta: { 
                        title: 'Profile', 
                        themeDark: false,
                        background: true
                    },
                    component: UpdateAccount
                },
                {
                    path: '/account/reset-password',
                    name: 'ResetPassword',
                    meta: { 
                        title: 'Reset Password', 
                        themeDark: false,
                        background: true
                    },
                    component: ResetPassword
                },
                {
                    path: '/account/privacy-policy',
                    name: 'PrivacyPolicy',
                    meta: { 
                        title: 'Privacy Policy', 
                        themeDark: false,
                        background: true
                    },
                    component: PrivacyPolicy
                },
            ]
        }
    ]
})



// WEBPACK FOOTER //
// ./src/router/index.js