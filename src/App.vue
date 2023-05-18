<template>
    <div id="app">
        <div
            :class="[
                $style.appContainer,
                { dark: darkMode },
                { light: !darkMode },
            ]"
        >
            <div :class="$style.headerContainer">
                <Header />
            </div>

            <div :class="$style.viewContainer">
                <router-view />
            </div>
            <div :class="$style.footerContainer">
                <Footer />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { RouterView } from "vue-router";
import Header from "@/components/Header.vue";
import Footer from "./components/Footer.vue";

@Component({
    components: {
        Header,
        Footer,
        // HelloWorld,
    },
})
export default class AppView extends Vue {
    darkMode: boolean = false;

    mounted() {
        this.checkDarkModeUpdated();
    }

    @Watch("$store.state.darkMode")
    checkDarkModeUpdated() {
        this.darkMode = this.$store.getters.getDarkMode;

        if (this.darkMode) {
            document.body.classList.add("dark");
            document.body.classList.remove("light");
        } else {
            document.body.classList.add("light");
            document.body.classList.remove("dark");
        }
    }
}
</script>

<style lang="scss" module>
.appContainer {
    width: 100%;
    height: auto;
}
</style>

<style lang="scss">
@import "@/assets/theme.scss";

* {
    box-sizing: border-box;
    font-family: "Noto Sans KR", sans-serif;
}

html,
body {
    width: 100%;
    height: auto;

    margin: 0;
}
</style>
