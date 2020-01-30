<template>
    <div class="loginForm min-h-screen bg-gray-200">
        <div class="login-container">
            <div class="login-layout w-full lg:w-1/2 md:w-3/4 h-full">
                <!-- form start -->
                <form>
                    <div class="p-4">
                        <!-- logo start -->
                        <header class="login-header">
                            <div class="logo text-center">
                                <img src="/icon.png" alt="" class="w-8 inline">
                                <h1 class="text-2xl inline"><span class=" font-bold ">JSD </span>廠商後台管理中心</h1>                                
                            </div>                            
                        </header> <!-- logo end -->

                        <!-------------------------------- container start -->
                        <div class="login-content">
                            <div class="login-content-wrap">
                                <!-------------------------------- input email start -->
                                <div class="mb-2">
                                    <!-------------------------------- input email label start -->
                                    <div class="item-label">
                                        <div class="item-label-num">1</div>
                                        <h2 class="text-sm">輸入電子郵件信箱...</h2>
                                    </div> <!-- input email label end -->
                                    <!-------------------------------- input email content start -->
                                    <div class="item-input">
                                        <input 
                                            type="text"
                                            placeholder="Enter Email..."
                                            v-model.trim="formData.email"
                                            >
                                        <p >{{ emailMsg }}</p>
                                    </div><!-- input email content end --> 
                                </div><!--input email end -->
                                <!-------------------------------- input password start -->
                                <div class="mb-2">
                                    <!-------------------------------- input password label start -->
                                    <div class="item-label">
                                        <div class="item-label-num">2</div>
                                        <h2 class="text-sm">輸入密碼...</h2>
                                    </div>
                                    <!-- input password label end -->
                                    <!-------------------------------- input password content start -->
                                    <div class="item-input">
                                        <input 
                                            type="password"
                                            placeholder="Enter Password..."
                                            v-model.trim="formData.password"
                                            >
                                        <p>{{ passwordMsg }}</p>
                                    </div>
                                    <!-- input password content end -->
                                </div>
                                <!-------------------------------- input captcha start -->
                                <div class="mb-2">
                                    <!-------------------------------- input captcha label start -->
                                    <div class="item-label">
                                        <div class="item-label-num">3</div>
                                        <h2 class="text-sm">輸入驗證碼...</h2> 
                                    </div>
                                    <!-- input captcha label end -->

                                    <div class="flex">
                                        <!-------------------------------- input captcha content start -->
                                        <div class="w-1/2 px-2"> 
                                            <div class="item-input">
                                                <input 
                                                    type="text" 
                                                    placeholder="Enter Captcha Code..."
                                                    v-model.trim="formData.captcha"
                                                >
                                            <p>{{ captchaMsg }}</p>
                                            </div>
                                        </div>
                                        <!-- input captcha content end -->
                                        <!-------------------------------- input captcha image start -->
                                        <div class="w-1/3 px-2 pl-10">
                                            <img :src="captchaImg" alt="" title="點擊刷新">
                                            <span class="text-xs text-yellow-700 underline"><a href="javascript:void(0);"  @click="captchaImg=captchaImg+'/?mt='+Math.random()">看不清楚!換一組</a></span>
                                        </div>
                                        <!-- input captcha image end -->
                                    </div>                                    
                                </div>
                                <!-- input captcha end -->
                                
                                <div>
                                    <!-------------------------------- submit button start -->
                                    <button 
                                        type="submit" 
                                        class="bg-blue-300 text-white w-full rounded-full px-2 py-2 mb-2 text-lg hover:bg-blue-500 transition-slow"
                                        @click.prevent="handleSubmit"
                                        >登入
                                        </button><!-- submit button end -->
                                    <!-------------------------------- forget password start -->    
                                    <div class="flex items-center justify-end mb-4">
                                        <svg class="mr-2" width="20px" height="20px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                            <title>Mask</title>
                                            <desc>Created with Sketch.</desc>
                                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                            <g transform="translate(-386.000000, -863.000000)" fill="#548BC5" fill-rule="nonzero">
                                                <g transform="translate(262.000000, 186.000000)">
                                                <g transform="translate(49.000000, 602.000000)">
                                                    <g transform="translate(75.000000, 75.000000)">
                                                    <path d="M10,20 C4.4771525,20 0,15.5228475 0,10 C0,4.4771525 4.4771525,0 10,0 C15.5228475,0 20,4.4771525 20,10 C20,15.5228475 15.5228475,20 10,20 Z M10,18 C14.418278,18 18,14.418278 18,10 C18,5.581722 14.418278,2 10,2 C5.581722,2 2,5.581722 2,10 C2,14.418278 5.581722,18 10,18 Z M8.58578644,6.58578644 C8.19526215,6.97631073 7.56209717,6.97631073 7.17157288,6.58578644 C6.78104858,6.19526215 6.78104858,5.56209717 7.17157288,5.17157288 C8.73367004,3.60947571 11.26633,3.60947571 12.8284271,5.17157288 C14.3905243,6.73367004 14.3905243,9.26632996 12.8279866,10.8288674 L10.7066662,12.9475468 C10.3158988,13.3378278 9.6827339,13.3374334 9.29245293,12.946666 C8.90217195,12.5558985 8.90256633,11.9227337 9.29333378,11.5324527 L11.4142136,9.41421356 C12.1952621,8.63316498 12.1952621,7.36683502 11.4142136,6.58578644 C10.633165,5.80473785 9.36683502,5.80473785 8.58578644,6.58578644 Z M10,16 C9.44771525,16 9,15.5522847 9,15 C9,14.4477153 9.44771525,14 10,14 C10.5522847,14 11,14.4477153 11,15 C11,15.5522847 10.5522847,16 10,16 Z"></path>
                                                    </g>
                                                </g>
                                                </g>
                                            </g>
                                            </g>
                                        </svg>
                                        <div class="text-xs">
                                            <span class="font-bold">忘記密碼?</span>
                                            <span class="text-gray-darke">Don't hesitate to <a href="#" class="text-gray-darker underline">contact support</a>!</span>
                                        </div>
                                    </div>
                                    <!-- forget password end -->
                                </div>
                            </div>
                        </div>
                    </div>
                </form> 
            </div>
        </div>        
    </div>    
</template>

<script>
    import notify from '@/plugins/mixins/admin/notify'
    import AsyncValidator from 'async-validator'
    import { Notification } from 'element-ui'

    export default {
        layout: 'empty',
        name: 'login',
        middleware: 'admin_IsLogin',
        mixins:[notify],
        data () {
            return {
                config: {
                    afterSavePushTo: ''
                },
                formData: {
                    email: '',
                    password: '',
                    captcha: ''
                },
                formRules: {
                    email: [
                        { required: true, message: '尚未輸入信箱號'},
                        { pattern: /^([-_A-Za-z0-9\.]+)@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/, message: '信箱格式有錯'}
                    ],
                    password: [
                        { required: true, message: '尚未輸入密碼' }
                    ],
                    captcha: [
                        { required: true, message: '尚未輸入驗證碼' }
                    ],
                },
                emailMsg: '',
                passwordMsg: '',
                captchaMsg: '',
                captchaImg: '/api/common/captcha'
            }
        },
        created () {
            this.capchaReset()
        },
        methods: {
            resetForm(){                
                this.formData = {}
            },
            validateData(){
                const validateRuler = new Promise((resolve, reject) => {
                    const validator = new AsyncValidator(this.formRules)
                    validator.validate(this.formData, { firstFields: true }, (errors, fields) => {
                        resolve(errors)
                    })
                })                
                return validateRuler
            },
            handleSubmit () {                
                this.validateData().then(errors => {                    
                    if(errors) {
                        errors.forEach(error => {
                            setTimeout(() => {
                                Notification({
                                    title: error.field,
                                    message: error.message,
                                    type: 'warning',
                                    customClass: 'bg-yellow-200'
                                })
                            }, 500)                           
                        })
                        return
                    }
                    this.login()
                })
            },
            async login() {                
                try {
                    const checkCapcha = await this.$axios.$post(`${process.env.BASE_URL}/api/common/captcha`, this.formData)
                    if(checkCapcha.isMatch) {
                        const res = await this.$store.dispatch('auth/login', this.formData)

                        if(res.resCode === 116200) {
                            //Set Manager into IndexPage
                            if(res.role_id.title === '網站管理員') this.config.afterSavePushTo = 'managers'
                            if(res.role_id.title === '廠商') this.config.afterSavePushTo = 'factory_Brands'
                            if(res.role_id.title === '經銷商') this.config.afterSavePushTo = 'shop_Orders'
                            
                            return await this.notifyFunc(res.resCode)
                        }
                        //Email or Password ERROR
                        this.resetForm()
                        this.capchaReset()
                        //Server ERROR
                        return await this.notifyFunc(res.resCode)
                    }
                    //Captch ERROR
                    this.capchaReset()
                    Notification({
                        title: "Captcaha code is incorrect",
                        message: "驗證碼錯誤!!",
                        type: 'warning',
                        customClass: 'bg-yellow-200'
                    })
                }
                catch (err) {
                    //Browser ERROR
                    this.$message({                        
                        message: '瀏覽器不明錯誤,請重新操作!!',
                        type: 'error',
                        customClass: 'bg-red-200'
                    })
                    console.log(err.message)
                } 
            },
            async capchaReset() {
                this.formData.captcha = ''
                this.captchaImg = this.captchaImg+'/?mt=' + Math.random()
            }
        },
    }

</script>

<style scoped>
.bg-image {
    /* background-image: url('/images/example/04.jpg'); */
    background-repeat: no-repeat;
    background-size: cover;
    filter: blur(2px);
    -ms-filter: blur(2px);
    -webkit-filter: blur(2px);
    -moz-filter: blur(2px);
}
.login-container {
    @apply mx-16; 
    @apply flex;
    @apply justify-center;
    @apply items-center;
}
.login-layout{
    @apply mt-8;
    @apply bg-white;
    @apply rounded-lg;
    @apply shadow-2xl
}
.login-header{
    @apply pb-4;
    @apply border-b-2;
    @apply border-teal-400
}
.login-content {    
    @apply flex;
    @apply mx-auto
}    
.login-content-wrap{ 
    @apply w-full;
    @apply px-10;
    @apply pt-8;
    @apply border-b;
    @apply border-solid;
    @apply border-gray-300
}
.item-label{ 
    @apply flex;
    @apply items-center;
    @apply mb-2
}
.item-label-num {
    @apply border-2;
    @apply border-blue-700;
    @apply py-0;
    @apply px-1;
    @apply rounded-full;
    @apply font-bold;
    @apply mr-2;
    @apply text-blue-700
}
.item-input{
    @apply w-full;
    @apply px-2
} 
.item-input input {
    @apply w-full;
    @apply text-sm;
    @apply bg-gray-300;
    @apply text-gray-700;
    @apply rounded-full;
    @apply px-3;
    @apply py-3
}
.item-input p {
    @apply text-red-600;
    @apply text-right;
    @apply text-xs;
    @apply pr-4;
}
</style>