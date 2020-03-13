<template>
    <div id="navBar">
        <nav class="__nav-wrapper navbar-expand-lg bg-gray-900">
            <div class="__nav-content container">
                <div class="__nav-logo">
                    <!-- <a href="https://www.creative-tim.com/learning-lab/tailwindcss-starter-project#/presentation">Tailwind Starter Kit</a> -->
                    <div class="mb-2 sm:mb-0 flex flex-row
                    ">
                        <div class="h-10 w-10 self-center mr-2">
                            <img class="h-10 w-10 self-center" src="https://csscomps.com/images/csscomps.png" />
                        </div>
                        <div>
                            <a href="/home" class="text-2xl no-underline text-grey-darkest hover:text-blue-dark font-sans font-bold">LogoText</a><br>
                            <span class="text-xs text-grey-dark">Beautiful New Tagline</span>
                        </div>
                    </div>

                    <button type="button"  @click="toggleNavbar()">
                        <i class="text-white fas fa-bars"></i>
                    </button>
                </div>
                <div class="__nav-toggle-content" :class="{'hidden': !showMenu, 'block': showMenu}">
                    <!----------------------------------------------------__nav-toggle-content left  -->
                    <ul class="mr-auto">
                        <li class="__nav-item">
                            <nuxt-link to="/admin/login" class="__nav-link">
                                <fa-icon :icon="faFileAlt" class="lg:text-gray-300 text-gray-500 text-lg leading-lg mr-2"></fa-icon> Docs
                                <!-- <span class="lg:hidden inline-block ml-2">Docs</span> -->
                            </nuxt-link>
                        
                        </li>
                    </ul>
                    <!----------------------------------------------------__nav-toggle-content right  -->
                    <ul class="lg:ml-auto">
                        <li class="__nav-item">
                            <nuxt-link to="/admin/login" class="__nav-link">
                                <fa-icon :icon="faCheckCircle" class="lg:text-gray-300 text-gray-500 text-lg leading-lg"></fa-icon>
                                <span class="lg:hidden inline-block ml-2">Share</span>
                            </nuxt-link>
                        </li>                        
                        <li class="__nav-item">
                            <div @click="open = false" class="ml-3 relative" x-data="{ open: false }">
                            <div>
                                <button @click="open = !open" class="max-w-xs flex items-center text-sm rounded-full text-white focus:outline-none focus:shadow-solid">
                                <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                </button>
                            </div>
                            <div x-show="open" x-transition:enter="transition ease-out duration-100" x-transition:enter-start="transform opacity-0 scale-95" x-transition:enter-end="transform opacity-100 scale-100" x-transition:leave="transition ease-in duration-75" x-transition:leave-start="transform opacity-100 scale-100" x-transition:leave-end="transform opacity-0 scale-95" class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
                                <div class="py-1 rounded-md bg-white shadow-xs">
                                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
                                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
                                <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
                                </div>
                            </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <!-- <div class="relative flex w-full sm:w-7/12 md:w-5/12 px-4 flex-wrap items-stretch lg:ml-auto">
            <div class="flex">
                <span class="font-normal leading-snug flex text-center white-space-no-wrap border border-solid border-orange-600 rounded-full text-sm bg-orange-100 items-center rounded-r-none pl-2 py-1 text-orange-800 border-r-0 placeholder-orange-300">
                    <i class="fas fa-search"></i>
                </span>
            </div>
            <input type="text" class="px-2 py-1 h-8 border border-solid  border-orange-600 rounded-full text-sm leading-snug text-orange-700 bg-orange-100 shadow-none outline-none focus:outline-none w-full font-normal rounded-l-none flex-1 border-l-0 placeholder-orange-300" placeholder="Search orange" />
        </div> -->
    </div>
</template>

<script>
    import { faFileAlt, faCheckCircle } from '@fortawesome/free-solid-svg-icons'

    export default {
        name:'',
        data () {
            return {
                showMenu: false,
                open: true
            };
        },
        props:[''],
        computed: {
            faFacebookSquare() { return faFacebookSquare },
            faFileAlt() { return faFileAlt },
            faCheckCircle() { return faCheckCircle }
        },
        methods: {
            toggleNavbar: function(){
                this.showMenu = !this.showMenu;
            }
        },
        components: {},
    }

</script>
<style scoped>
#navBar .__nav-wrapper {
    @apply top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3;
}
#navBar .__nav-content {
    @apply px-4 mx-auto flex flex-wrap items-center justify-between;
}

#navBar .__nav-logo {
    @apply w-full relative flex justify-between;
}
#navBar .__nav-logo a {
    @apply text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-white;
}
#navBar .__nav-logo Button {
    @apply cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block outline-none
}
#navBar .__nav-logo Button:focus {
    @apply outline-none
}
#navBar .__nav-toggle-content {
    @apply  flex-grow items-center bg-white
}
#navBar .__nav-toggle-content ul {
    @apply  flex flex-col list-none 
}

#navBar .__nav-item {
    @apply flex items-center
}
#navBar .__nav-item .__nav-link {
    @apply text-gray-800 px-3 py-4 flex items-center text-xs uppercase font-bold
}


@screen sm {
    
}
@screen md {
    
}
@screen lg {
    #navBar .__nav-logo {
        @apply w-auto static block justify-start
    }
    #navBar .__nav-logo Button {
        @apply hidden
    }
    #navBar .__nav-toggle-content {
        @apply flex bg-transparent shadow-none
    }
    #navBar .__nav-toggle-content ul {
        @apply  flex-row
    }
    #navBar .__nav-item .__nav-link {
        @apply text-white py-2
    }
    #navBar .__nav-item .__nav-link:hover {
        @apply text-gray-300
    }
}
</style>